import fs from "fs";
import path from "path";
import { DatabaseSync } from "node:sqlite";

export function createReplayStore(databasePath) {
  const resolvedPath = path.resolve(databasePath);
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

  const db = new DatabaseSync(resolvedPath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS replay_sessions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT,
      page_url TEXT,
      user_agent TEXT,
      viewport_width INTEGER,
      viewport_height INTEGER,
      started_at INTEGER NOT NULL,
      ended_at INTEGER,
      status TEXT NOT NULL,
      recording_config_json TEXT,
      redaction_stats_json TEXT,
      dropped_event_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS replay_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      event_time INTEGER NOT NULL,
      sequence INTEGER NOT NULL,
      payload_json TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (session_id) REFERENCES replay_sessions(id)
    );

    CREATE INDEX IF NOT EXISTS idx_replay_events_session_sequence
    ON replay_events(session_id, sequence);

    CREATE INDEX IF NOT EXISTS idx_replay_sessions_started_at
    ON replay_sessions(started_at DESC);
  `);

  const statements = {
    getSession: db.prepare("SELECT * FROM replay_sessions WHERE id = ?"),
    insertSession: db.prepare(`
      INSERT INTO replay_sessions (
        id, project_id, user_id, page_url, user_agent,
        viewport_width, viewport_height, started_at, ended_at, status,
        recording_config_json, redaction_stats_json, dropped_event_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        project_id = excluded.project_id,
        user_id = excluded.user_id,
        page_url = excluded.page_url,
        user_agent = excluded.user_agent,
        viewport_width = excluded.viewport_width,
        viewport_height = excluded.viewport_height,
        started_at = excluded.started_at,
        status = excluded.status,
        recording_config_json = excluded.recording_config_json,
        redaction_stats_json = excluded.redaction_stats_json,
        dropped_event_count = excluded.dropped_event_count
    `),
    updateSessionEnd: db.prepare(`
      UPDATE replay_sessions
      SET ended_at = ?, status = ?, redaction_stats_json = COALESCE(?, redaction_stats_json),
          dropped_event_count = COALESCE(?, dropped_event_count)
      WHERE id = ?
    `),
    insertEvent: db.prepare(`
      INSERT INTO replay_events (
        session_id, event_type, event_time, sequence, payload_json, created_at
      )
      SELECT ?, ?, ?, ?, ?, ?
      WHERE NOT EXISTS (
        SELECT 1 FROM replay_events
        WHERE session_id = ? AND sequence = ?
      )
    `),
    listSessions: db.prepare(`
      SELECT
        s.*,
        COUNT(e.id) AS event_count,
        MIN(e.event_time) AS first_event_at,
        MAX(e.event_time) AS last_event_at
      FROM replay_sessions s
      LEFT JOIN replay_events e ON e.session_id = s.id
      GROUP BY s.id
      ORDER BY s.started_at DESC
      LIMIT ?
    `),
    listEvents: db.prepare(`
      SELECT * FROM replay_events
      WHERE session_id = ?
      ORDER BY sequence ASC, id ASC
    `),
    countSessions: db.prepare("SELECT COUNT(*) AS count FROM replay_sessions"),
    deleteAllEvents: db.prepare("DELETE FROM replay_events"),
    deleteAllSessions: db.prepare("DELETE FROM replay_sessions"),
    deleteEvents: db.prepare("DELETE FROM replay_events WHERE session_id = ?"),
    deleteSession: db.prepare("DELETE FROM replay_sessions WHERE id = ?")
  };

  function insertEventsTransaction(sessionId, startedAt, events) {
    let insertedCount = 0;
    db.exec("BEGIN");
    try {
      events.forEach((event, index) => {
        const sequence = toInteger(event.sequence ?? event.id, index + 1);
        const offset = toNumber(event.timeOffsetMs, 0);
        const eventTime = Math.round(startedAt + offset);
        const eventType = String(event.type || event.data?.eventType || "unknown");

        const result = statements.insertEvent.run(
          sessionId,
          eventType,
          eventTime,
          sequence,
          JSON.stringify(event),
          Date.now(),
          sessionId,
          sequence
        );
        insertedCount += Number(result?.changes || 0);
      });
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
    return insertedCount;
  }

  function ensureSession(meta = {}) {
    const id = toText(meta.sessionId || meta.id, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const viewport = meta.viewport || {};
    const existing = statements.getSession.get(id);
    if (existing) {
      return normalizeSession(existing);
    }

    const startedAt = toInteger(meta.startedAt, Date.now());
    statements.insertSession.run(
      id,
      toText(meta.projectId, "default"),
      toNullableText(meta.userId),
      toNullableText(meta.pageUrl || meta.href),
      toNullableText(meta.userAgent),
      toNullableInteger(viewport.width),
      toNullableInteger(viewport.height),
      startedAt,
      null,
      toText(meta.status, "recording"),
      toJson(meta.recordingConfig),
      toJson(meta.redactionStats),
      toInteger(meta.droppedEventCount, 0)
    );

    return normalizeSession(statements.getSession.get(id));
  }

  function insertSession(meta = {}) {
    const id = toText(meta.sessionId || meta.id, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const viewport = meta.viewport || {};
    statements.insertSession.run(
      id,
      toText(meta.projectId, "default"),
      toNullableText(meta.userId),
      toNullableText(meta.pageUrl || meta.href),
      toNullableText(meta.userAgent),
      toNullableInteger(viewport.width),
      toNullableInteger(viewport.height),
      toInteger(meta.startedAt, Date.now()),
      null,
      toText(meta.status, "recording"),
      toJson(meta.recordingConfig),
      toJson(meta.redactionStats),
      toInteger(meta.droppedEventCount, 0)
    );

    return normalizeSession(statements.getSession.get(id));
  }

  function insertEvents(batch = {}) {
    const sessionId = toText(batch.sessionId, "");
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    if (!Array.isArray(batch.events)) {
      throw new Error("events must be an array");
    }

    const session = ensureSession({
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

    const inserted = insertEventsTransaction(sessionId, session.startedAt, batch.events);

    return {
      inserted,
      session: normalizeSession(statements.getSession.get(sessionId))
    };
  }

  function endSession(sessionId, meta = {}) {
    const id = toText(sessionId, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    statements.updateSessionEnd.run(
      toInteger(meta.endedAt, Date.now()),
      toText(meta.status, "ended"),
      meta.redactionStats ? JSON.stringify(meta.redactionStats) : null,
      meta.droppedEventCount === undefined ? null : toInteger(meta.droppedEventCount, 0),
      id
    );

    const session = statements.getSession.get(id);
    if (!session) {
      throw new Error("session was not found");
    }
    return normalizeSession(session);
  }

  function listSessions(limit = 50) {
    return statements.listSessions.all(Math.min(Math.max(toInteger(limit, 50), 1), 200)).map(normalizeSession);
  }

  function getSession(id) {
    const row = statements.getSession.get(id);
    return row ? normalizeSession(row) : null;
  }

  function getEvents(sessionId) {
    return statements.listEvents.all(sessionId).map((row) => ({
      id: row.id,
      sessionId: row.session_id,
      eventType: row.event_type,
      eventTime: row.event_time,
      sequence: row.sequence,
      createdAt: row.created_at,
      payload: parseJson(row.payload_json, null)
    }));
  }

  function getPayload(sessionId) {
    const session = getSession(sessionId);
    if (!session) {
      return null;
    }

    const events = getEvents(sessionId).map((event) => event.payload).filter(Boolean);
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

  function deleteSession(sessionId) {
    const id = toText(sessionId, "");
    if (!id) {
      throw new Error("sessionId is required");
    }

    const existing = statements.getSession.get(id);
    if (!existing) {
      return false;
    }

    db.exec("BEGIN");
    try {
      statements.deleteEvents.run(id);
      statements.deleteSession.run(id);
      db.exec("COMMIT");
      return true;
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  function deleteAllSessions() {
    const before = statements.countSessions.get();
    const count = Number(before && before.count) || 0;

    db.exec("BEGIN");
    try {
      statements.deleteAllEvents.run();
      statements.deleteAllSessions.run();
      db.exec("COMMIT");
      return count;
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  return {
    path: resolvedPath,
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
    startedAt: row.started_at,
    endedAt: row.ended_at,
    status: row.status,
    recordingConfig: parseJson(row.recording_config_json, null),
    redactionStats: parseJson(row.redaction_stats_json, null),
    droppedEventCount: row.dropped_event_count,
    eventCount: row.event_count === undefined ? undefined : row.event_count,
    firstEventAt: row.first_event_at,
    lastEventAt: row.last_event_at
  };
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
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
