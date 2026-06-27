import pg from "pg";

const { Pool } = pg;

export function createPostgresReplayStore(connectionString) {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for the Postgres replay store");
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    max: Math.max(1, toInteger(process.env.DATABASE_POOL_MAX, 3)),
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000
  });

  const readyPromise = ensureSchema(pool);

  async function ready() {
    await readyPromise;
  }

  async function insertSession(meta = {}) {
    await ready();
    const id = toText(meta.sessionId || meta.id, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const viewport = meta.viewport || {};
    await pool.query(
      `
        INSERT INTO replay_sessions (
          id, project_id, user_id, page_url, user_agent,
          viewport_width, viewport_height, started_at, ended_at, status,
          recording_config_json, redaction_stats_json, dropped_event_count
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULL, $9, $10::jsonb, $11::jsonb, $12)
        ON CONFLICT(id) DO UPDATE SET
          project_id = EXCLUDED.project_id,
          user_id = EXCLUDED.user_id,
          page_url = EXCLUDED.page_url,
          user_agent = EXCLUDED.user_agent,
          viewport_width = EXCLUDED.viewport_width,
          viewport_height = EXCLUDED.viewport_height,
          started_at = EXCLUDED.started_at,
          status = EXCLUDED.status,
          recording_config_json = EXCLUDED.recording_config_json,
          redaction_stats_json = EXCLUDED.redaction_stats_json,
          dropped_event_count = EXCLUDED.dropped_event_count
      `,
      [
        id,
        toText(meta.projectId, "default"),
        toNullableText(meta.userId),
        toNullableText(meta.pageUrl || meta.href),
        toNullableText(meta.userAgent),
        toNullableInteger(viewport.width),
        toNullableInteger(viewport.height),
        toInteger(meta.startedAt, Date.now()),
        toText(meta.status, "recording"),
        toJson(meta.recordingConfig),
        toJson(meta.redactionStats),
        toInteger(meta.droppedEventCount, 0)
      ]
    );

    return getSession(id);
  }

  async function ensureSession(meta = {}) {
    const id = toText(meta.sessionId || meta.id, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const existing = await getSession(id);
    if (existing) {
      return existing;
    }

    return insertSession(meta);
  }

  async function insertEvents(batch = {}) {
    await ready();
    const sessionId = toText(batch.sessionId, "");
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    if (!Array.isArray(batch.events)) {
      throw new Error("events must be an array");
    }

    const session = await ensureSession({
      sessionId,
      projectId: batch.projectId,
      userId: batch.userId,
      pageUrl: batch.pageUrl,
      userAgent: batch.userAgent,
      viewport: batch.viewport,
      startedAt: batch.startedAt,
      recordingConfig: batch.recordingConfig,
      redactionStats: batch.redactionStats,
      droppedEventCount: batch.droppedEventCount
    });

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const [index, event] of batch.events.entries()) {
        const sequence = toInteger(event.sequence ?? event.id, index + 1);
        const offset = toNumber(event.timeOffsetMs, 0);
        const eventTime = Math.round(session.startedAt + offset);
        const eventType = String(event.type || event.data?.eventType || "unknown");

        await client.query(
          `
            INSERT INTO replay_events (
              session_id, event_type, event_time, sequence, payload_json, created_at
            ) VALUES ($1, $2, $3, $4, $5::jsonb, $6)
          `,
          [sessionId, eventType, eventTime, sequence, JSON.stringify(event), Date.now()]
        );
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    return {
      inserted: batch.events.length,
      session: await getSession(sessionId)
    };
  }

  async function endSession(sessionId, meta = {}) {
    await ready();
    const id = toText(sessionId, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const result = await pool.query(
      `
        UPDATE replay_sessions
        SET ended_at = $1,
            status = $2,
            redaction_stats_json = COALESCE($3::jsonb, redaction_stats_json),
            dropped_event_count = COALESCE($4, dropped_event_count)
        WHERE id = $5
        RETURNING *
      `,
      [
        toInteger(meta.endedAt, Date.now()),
        toText(meta.status, "ended"),
        meta.redactionStats ? JSON.stringify(meta.redactionStats) : null,
        meta.droppedEventCount === undefined ? null : toInteger(meta.droppedEventCount, 0),
        id
      ]
    );

    if (!result.rows[0]) {
      throw new Error("session was not found");
    }
    return normalizeSession(result.rows[0]);
  }

  async function listSessions(limit = 50) {
    await ready();
    const result = await pool.query(
      `
        SELECT
          s.*,
          COUNT(e.id)::integer AS event_count,
          MIN(e.event_time) AS first_event_at,
          MAX(e.event_time) AS last_event_at
        FROM replay_sessions s
        LEFT JOIN replay_events e ON e.session_id = s.id
        GROUP BY s.id
        ORDER BY s.started_at DESC
        LIMIT $1
      `,
      [Math.min(Math.max(toInteger(limit, 50), 1), 200)]
    );

    return result.rows.map(normalizeSession);
  }

  async function getSession(id) {
    await ready();
    const result = await pool.query("SELECT * FROM replay_sessions WHERE id = $1", [id]);
    return result.rows[0] ? normalizeSession(result.rows[0]) : null;
  }

  async function getEvents(sessionId) {
    await ready();
    const result = await pool.query(
      `
        SELECT * FROM replay_events
        WHERE session_id = $1
        ORDER BY sequence ASC, id ASC
      `,
      [sessionId]
    );

    return result.rows.map((row) => ({
      id: Number(row.id),
      sessionId: row.session_id,
      eventType: row.event_type,
      eventTime: toInteger(row.event_time, 0),
      sequence: toInteger(row.sequence, 0),
      createdAt: toInteger(row.created_at, 0),
      payload: parseJson(row.payload_json, null)
    }));
  }

  async function getPayload(sessionId) {
    const session = await getSession(sessionId);
    if (!session) {
      return null;
    }

    const events = (await getEvents(sessionId)).map((event) => event.payload).filter(Boolean);
    return {
      version: 1,
      createdAt: new Date(session.startedAt).toISOString(),
      page: {
        href: session.pageUrl,
        userAgent: session.userAgent
      },
      recordingConfig: session.recordingConfig || {},
      droppedEventCount: session.droppedEventCount || 0,
      redactionStats: session.redactionStats || {},
      eventCount: events.length,
      events
    };
  }

  async function deleteSession(sessionId) {
    await ready();
    const id = toText(sessionId, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const result = await pool.query("DELETE FROM replay_sessions WHERE id = $1 RETURNING id", [id]);
    return Boolean(result.rows[0]);
  }

  async function deleteAllSessions() {
    await ready();
    const before = await pool.query("SELECT COUNT(*)::integer AS count FROM replay_sessions");
    const count = Number(before.rows[0]?.count) || 0;
    await pool.query("DELETE FROM replay_sessions");
    return count;
  }

  return {
    type: "postgres",
    insertSession,
    insertEvents,
    endSession,
    listSessions,
    getSession,
    getEvents,
    getPayload,
    deleteSession,
    deleteAllSessions
  };
}

async function ensureSchema(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS replay_sessions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT,
      page_url TEXT,
      user_agent TEXT,
      viewport_width INTEGER,
      viewport_height INTEGER,
      started_at BIGINT NOT NULL,
      ended_at BIGINT,
      status TEXT NOT NULL,
      recording_config_json JSONB,
      redaction_stats_json JSONB,
      dropped_event_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS replay_events (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT NOT NULL REFERENCES replay_sessions(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL,
      event_time BIGINT NOT NULL,
      sequence INTEGER NOT NULL,
      payload_json JSONB NOT NULL,
      created_at BIGINT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_replay_events_session_sequence
    ON replay_events(session_id, sequence);

    CREATE INDEX IF NOT EXISTS idx_replay_sessions_started_at
    ON replay_sessions(started_at DESC);

    ALTER TABLE replay_sessions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE replay_events ENABLE ROW LEVEL SECURITY;
  `);
}

function normalizeSession(row) {
  return {
    id: row.id,
    projectId: row.project_id,
    userId: row.user_id,
    pageUrl: row.page_url,
    userAgent: row.user_agent,
    viewport: {
      width: row.viewport_width,
      height: row.viewport_height
    },
    startedAt: toInteger(row.started_at, 0),
    endedAt: row.ended_at === null || row.ended_at === undefined ? null : toInteger(row.ended_at, 0),
    status: row.status,
    recordingConfig: parseJson(row.recording_config_json, null),
    redactionStats: parseJson(row.redaction_stats_json, null),
    droppedEventCount: toInteger(row.dropped_event_count, 0),
    eventCount: row.event_count === undefined ? undefined : toInteger(row.event_count, 0),
    firstEventAt: row.first_event_at === null || row.first_event_at === undefined ? null : toInteger(row.first_event_at, 0),
    lastEventAt: row.last_event_at === null || row.last_event_at === undefined ? null : toInteger(row.last_event_at, 0)
  };
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }
  if (typeof value === "object") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function toJson(value) {
  return value === undefined ? null : JSON.stringify(value);
}

function toText(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function toNullableText(value) {
  const text = toText(value, "");
  return text || null;
}

function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function toInteger(value, fallback = 0) {
  return Math.round(toNumber(value, fallback));
}

function toNullableInteger(value) {
  const num = Number(value);
  return Number.isFinite(num) ? Math.round(num) : null;
}
