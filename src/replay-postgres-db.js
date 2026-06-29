import pg from "pg";

const { Pool } = pg;
const DB_RETRY_ATTEMPTS = 3;
const DB_RETRY_BASE_DELAY_MS = 250;

export function createPostgresReplayStore(connectionString) {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for the Postgres replay store");
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    max: Math.max(1, toInteger(process.env.DATABASE_POOL_MAX, 3)),
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: Math.max(10000, toInteger(process.env.DATABASE_CONNECTION_TIMEOUT_MS, 15000))
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
    await queryWithRetry(pool,
      `
        INSERT INTO replay_sessions (
          id, project_id, user_id, session_name, page_url, user_agent,
          viewport_width, viewport_height, started_at, ended_at, status,
          recording_config_json, redaction_stats_json, dropped_event_count
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL, $10, $11::jsonb, $12::jsonb, $13)
        ON CONFLICT(id) DO UPDATE SET
          project_id = EXCLUDED.project_id,
          user_id = EXCLUDED.user_id,
          session_name = COALESCE(EXCLUDED.session_name, replay_sessions.session_name),
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
        toNullableText(meta.sessionName || meta.session_name),
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
      sessionName: batch.sessionName || batch.session_name,
      pageUrl: batch.pageUrl,
      userAgent: batch.userAgent,
      viewport: batch.viewport,
      startedAt: batch.startedAt,
      recordingConfig: batch.recordingConfig,
      redactionStats: batch.redactionStats,
      droppedEventCount: batch.droppedEventCount
    });

    const inserted = await transactionWithRetry(pool, async (client) => {
      let insertedCount = 0;
      for (const [index, event] of batch.events.entries()) {
        const sequence = toInteger(event.sequence ?? event.id, index + 1);
        const offset = toNumber(event.timeOffsetMs, 0);
        const eventTime = Math.round(session.startedAt + offset);
        const eventType = String(event.type || event.data?.eventType || "unknown");

        const result = await client.query(
          `
            INSERT INTO replay_events (
              session_id, event_type, event_time, sequence, payload_json, created_at
            )
            SELECT $1, $2, $3, $4, $5::jsonb, $6
            WHERE NOT EXISTS (
              SELECT 1 FROM replay_events
              WHERE session_id = $1 AND sequence = $4
            )
          `,
          [sessionId, eventType, eventTime, sequence, JSON.stringify(event), Date.now()]
        );
        insertedCount += Number(result.rowCount || 0);
      }
      return insertedCount;
    });

    return {
      inserted,
      session: await getSession(sessionId)
    };
  }

  async function endSession(sessionId, meta = {}) {
    await ready();
    const id = toText(sessionId, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const result = await queryWithRetry(pool,
      `
        UPDATE replay_sessions
        SET ended_at = $1,
            status = $2,
            session_name = COALESCE($3, session_name),
            redaction_stats_json = COALESCE($4::jsonb, redaction_stats_json),
            dropped_event_count = COALESCE($5, dropped_event_count)
        WHERE id = $6
        RETURNING *
      `,
      [
        toInteger(meta.endedAt, Date.now()),
        toText(meta.status, "ended"),
        toNullableText(meta.sessionName || meta.session_name),
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
    const result = await queryWithRetry(pool,
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
    const result = await queryWithRetry(pool, "SELECT * FROM replay_sessions WHERE id = $1", [id]);
    return result.rows[0] ? normalizeSession(result.rows[0]) : null;
  }

  async function getEvents(sessionId) {
    await ready();
    const result = await queryWithRetry(pool,
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
      session: {
        id: session.id,
        name: session.sessionName,
        status: session.status,
        startedAt: session.startedAt,
        endedAt: session.endedAt
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

    const result = await queryWithRetry(pool, "DELETE FROM replay_sessions WHERE id = $1 RETURNING id", [id]);
    return Boolean(result.rows[0]);
  }

  async function deleteAllSessions() {
    await ready();
    const before = await queryWithRetry(pool, "SELECT COUNT(*)::integer AS count FROM replay_sessions");
    const count = Number(before.rows[0]?.count) || 0;
    await queryWithRetry(pool, "DELETE FROM replay_sessions");
    return count;
  }

  async function upsertSdkClient(meta = {}) {
    await ready();
    const clientId = toText(meta.clientId || meta.client_id, "");
    if (!clientId) {
      throw new Error("clientId is required");
    }

    const now = Date.now();
    const result = await queryWithRetry(pool,
      `
        INSERT INTO replay_sdk_clients (
          client_id, project_id, user_id, page_url, origin, user_agent,
          sdk_version, recording_state, session_id, last_seen_at, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT(client_id) DO UPDATE SET
          project_id = EXCLUDED.project_id,
          user_id = EXCLUDED.user_id,
          page_url = EXCLUDED.page_url,
          origin = EXCLUDED.origin,
          user_agent = EXCLUDED.user_agent,
          sdk_version = EXCLUDED.sdk_version,
          recording_state = EXCLUDED.recording_state,
          session_id = EXCLUDED.session_id,
          last_seen_at = EXCLUDED.last_seen_at,
          updated_at = EXCLUDED.updated_at
        RETURNING *
      `,
      [
        clientId,
        toText(meta.projectId || meta.project_id, "default"),
        toNullableText(meta.userId || meta.user_id),
        toNullableText(meta.pageUrl || meta.page_url || meta.href),
        toNullableText(meta.origin),
        toNullableText(meta.userAgent || meta.user_agent),
        toNullableText(meta.sdkVersion || meta.sdk_version),
        toNullableText(meta.recordingState || meta.recording_state),
        toNullableText(meta.sessionId || meta.session_id),
        toInteger(meta.lastSeenAt || meta.last_seen_at, now),
        toInteger(meta.createdAt || meta.created_at, now),
        now
      ]
    );

    return normalizeSdkClient(result.rows[0]);
  }

  async function listSdkClients(limit = 100) {
    await ready();
    const result = await queryWithRetry(pool,
      `
        SELECT * FROM replay_sdk_clients
        ORDER BY last_seen_at DESC
        LIMIT $1
      `,
      [Math.min(Math.max(toInteger(limit, 100), 1), 300)]
    );
    return result.rows.map(normalizeSdkClient);
  }

  async function createControlCommand(command = {}) {
    await ready();
    const action = normalizeControlAction(command.action);
    const id = toText(command.id, createControlCommandId());
    const now = Date.now();

    const result = await queryWithRetry(pool,
      `
        INSERT INTO replay_control_commands (
          id, project_id, client_id, action, session_name, payload_json,
          status, created_at, delivered_at, completed_at, error
        ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, 'pending', $7, NULL, NULL, NULL)
        RETURNING *
      `,
      [
        id,
        toText(command.projectId || command.project_id, "default"),
        toNullableText(command.clientId || command.client_id),
        action,
        toNullableText(command.sessionName || command.session_name),
        toJson(command.payload || {}),
        now
      ]
    );

    return normalizeControlCommand(result.rows[0]);
  }

  async function listPendingControlCommands(query = {}) {
    await ready();
    const projectId = toText(query.projectId || query.project_id, "default");
    const clientId = toText(query.clientId || query.client_id, "");
    if (!clientId) {
      throw new Error("clientId is required");
    }

    const result = await queryWithRetry(pool,
      `
        SELECT * FROM replay_control_commands
        WHERE project_id = $1
          AND status = 'pending'
          AND (client_id IS NULL OR client_id = $2)
        ORDER BY created_at ASC
        LIMIT $3
      `,
      [projectId, clientId, Math.min(Math.max(toInteger(query.limit, 20), 1), 50)]
    );

    const rows = result.rows;
    if (rows.length) {
      await queryWithRetry(pool,
        `
          UPDATE replay_control_commands
          SET delivered_at = COALESCE(delivered_at, $1)
          WHERE id = ANY($2::text[])
        `,
        [Date.now(), rows.map((row) => row.id)]
      );
    }

    return rows.map(normalizeControlCommand);
  }

  async function acknowledgeControlCommand(commandId, meta = {}) {
    await ready();
    const id = toText(commandId || meta.commandId || meta.command_id, "");
    if (!id) {
      throw new Error("commandId is required");
    }

    const now = Date.now();
    const result = await queryWithRetry(pool,
      `
        UPDATE replay_control_commands
        SET status = $1,
            completed_at = $2,
            delivered_at = COALESCE(delivered_at, $2),
            error = $3
        WHERE id = $4
        RETURNING *
      `,
      [
        normalizeCommandStatus(meta.status || "completed"),
        now,
        toNullableText(meta.error),
        id
      ]
    );

    if (!result.rows[0]) {
      throw new Error("command was not found");
    }
    return normalizeControlCommand(result.rows[0]);
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
    deleteAllSessions,
    upsertSdkClient,
    listSdkClients,
    createControlCommand,
    listPendingControlCommands,
    acknowledgeControlCommand
  };
}

async function ensureSchema(pool) {
  await queryWithRetry(pool, `
    CREATE TABLE IF NOT EXISTS replay_sessions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT,
      session_name TEXT,
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

    CREATE TABLE IF NOT EXISTS replay_sdk_clients (
      client_id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT,
      page_url TEXT,
      origin TEXT,
      user_agent TEXT,
      sdk_version TEXT,
      recording_state TEXT,
      session_id TEXT,
      last_seen_at BIGINT NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS replay_control_commands (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      client_id TEXT,
      action TEXT NOT NULL,
      session_name TEXT,
      payload_json JSONB,
      status TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      delivered_at BIGINT,
      completed_at BIGINT,
      error TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_replay_sdk_clients_project_seen
    ON replay_sdk_clients(project_id, last_seen_at DESC);

    CREATE INDEX IF NOT EXISTS idx_replay_control_commands_pending
    ON replay_control_commands(project_id, client_id, status, created_at ASC);

    ALTER TABLE replay_sessions
    ADD COLUMN IF NOT EXISTS session_name TEXT;

    ALTER TABLE replay_sessions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE replay_events ENABLE ROW LEVEL SECURITY;
    ALTER TABLE replay_sdk_clients ENABLE ROW LEVEL SECURITY;
    ALTER TABLE replay_control_commands ENABLE ROW LEVEL SECURITY;
  `);
}

async function queryWithRetry(pool, text, params) {
  return retryDatabaseOperation(() => pool.query(text, params));
}

async function transactionWithRetry(pool, callback) {
  return retryDatabaseOperation(async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch {
        // The connection may already be closed after a transient pooler error.
      }
      throw error;
    } finally {
      client.release();
    }
  });
}

async function retryDatabaseOperation(operation) {
  let lastError;
  for (let attempt = 1; attempt <= DB_RETRY_ATTEMPTS; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt >= DB_RETRY_ATTEMPTS || !isTransientDatabaseError(error)) {
        throw error;
      }
      await delay(DB_RETRY_BASE_DELAY_MS * attempt);
    }
  }
  throw lastError;
}

function isTransientDatabaseError(error) {
  const message = String(error?.message || "").toLowerCase();
  const code = String(error?.code || "");
  return (
    message.includes("connection terminated") ||
    message.includes("timeout") ||
    message.includes("terminating connection") ||
    code === "ETIMEDOUT" ||
    code === "ECONNRESET" ||
    code === "ECONNREFUSED" ||
    code === "53300"
  );
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizeSession(row) {
  return {
    id: row.id,
    projectId: row.project_id,
    userId: row.user_id,
    sessionName: row.session_name || "",
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

function normalizeSdkClient(row) {
  return {
    clientId: row.client_id,
    projectId: row.project_id,
    userId: row.user_id,
    pageUrl: row.page_url,
    origin: row.origin,
    userAgent: row.user_agent,
    sdkVersion: row.sdk_version,
    recordingState: row.recording_state,
    sessionId: row.session_id,
    lastSeenAt: toInteger(row.last_seen_at, 0),
    createdAt: toInteger(row.created_at, 0),
    updatedAt: toInteger(row.updated_at, 0)
  };
}

function normalizeControlCommand(row) {
  return {
    id: row.id,
    projectId: row.project_id,
    clientId: row.client_id,
    action: row.action,
    sessionName: row.session_name || "",
    payload: parseJson(row.payload_json, {}),
    status: row.status,
    createdAt: toInteger(row.created_at, 0),
    deliveredAt: row.delivered_at === null || row.delivered_at === undefined ? null : toInteger(row.delivered_at, 0),
    completedAt: row.completed_at === null || row.completed_at === undefined ? null : toInteger(row.completed_at, 0),
    error: row.error || ""
  };
}

function normalizeControlAction(action) {
  const value = toText(action, "");
  const allowed = new Set(["start", "pause", "stop", "save", "configure"]);
  if (!allowed.has(value)) {
    throw new Error("unsupported control action");
  }
  return value;
}

function normalizeCommandStatus(status) {
  const value = toText(status, "completed");
  const allowed = new Set(["completed", "failed", "ignored"]);
  return allowed.has(value) ? value : "completed";
}

function createControlCommandId() {
  return `cmd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
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
