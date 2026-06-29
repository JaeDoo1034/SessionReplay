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
      session_name TEXT,
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
      last_seen_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS replay_control_commands (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      client_id TEXT,
      action TEXT NOT NULL,
      session_name TEXT,
      payload_json TEXT,
      status TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      delivered_at INTEGER,
      completed_at INTEGER,
      error TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_replay_sdk_clients_project_seen
    ON replay_sdk_clients(project_id, last_seen_at DESC);

    CREATE INDEX IF NOT EXISTS idx_replay_control_commands_pending
    ON replay_control_commands(project_id, client_id, status, created_at ASC);
  `);
  ensureReplaySessionColumns(db);

  const statements = {
    getSession: db.prepare("SELECT * FROM replay_sessions WHERE id = ?"),
    insertSession: db.prepare(`
      INSERT INTO replay_sessions (
        id, project_id, user_id, session_name, page_url, user_agent,
        viewport_width, viewport_height, started_at, ended_at, status,
        recording_config_json, redaction_stats_json, dropped_event_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        project_id = excluded.project_id,
        user_id = excluded.user_id,
        session_name = COALESCE(excluded.session_name, replay_sessions.session_name),
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
      SET ended_at = ?, status = ?, session_name = COALESCE(?, session_name),
          redaction_stats_json = COALESCE(?, redaction_stats_json),
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
    deleteSession: db.prepare("DELETE FROM replay_sessions WHERE id = ?"),
    upsertSdkClient: db.prepare(`
      INSERT INTO replay_sdk_clients (
        client_id, project_id, user_id, page_url, origin, user_agent,
        sdk_version, recording_state, session_id, last_seen_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(client_id) DO UPDATE SET
        project_id = excluded.project_id,
        user_id = excluded.user_id,
        page_url = excluded.page_url,
        origin = excluded.origin,
        user_agent = excluded.user_agent,
        sdk_version = excluded.sdk_version,
        recording_state = excluded.recording_state,
        session_id = excluded.session_id,
        last_seen_at = excluded.last_seen_at,
        updated_at = excluded.updated_at
    `),
    getSdkClient: db.prepare("SELECT * FROM replay_sdk_clients WHERE client_id = ?"),
    listSdkClients: db.prepare(`
      SELECT * FROM replay_sdk_clients
      ORDER BY last_seen_at DESC
      LIMIT ?
    `),
    insertControlCommand: db.prepare(`
      INSERT INTO replay_control_commands (
        id, project_id, client_id, action, session_name, payload_json,
        status, created_at, delivered_at, completed_at, error
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),
    listPendingControlCommands: db.prepare(`
      SELECT * FROM replay_control_commands
      WHERE project_id = ?
        AND status = 'pending'
        AND (client_id IS NULL OR client_id = ?)
      ORDER BY created_at ASC
      LIMIT ?
    `),
    updateControlCommandDelivered: db.prepare(`
      UPDATE replay_control_commands
      SET delivered_at = COALESCE(delivered_at, ?)
      WHERE id = ?
    `),
    updateControlCommandAck: db.prepare(`
      UPDATE replay_control_commands
      SET status = ?, completed_at = ?, delivered_at = COALESCE(delivered_at, ?), error = ?
      WHERE id = ?
    `),
    getControlCommand: db.prepare("SELECT * FROM replay_control_commands WHERE id = ?")
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
      toNullableText(meta.sessionName || meta.session_name),
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
      toNullableText(meta.sessionName || meta.session_name),
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
      sessionName: batch.sessionName || batch.session_name,
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
      toNullableText(meta.sessionName || meta.session_name),
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

  function upsertSdkClient(meta = {}) {
    const clientId = toText(meta.clientId || meta.client_id, "");
    if (!clientId) {
      throw new Error("clientId is required");
    }

    const now = Date.now();
    statements.upsertSdkClient.run(
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
    );

    return normalizeSdkClient(statements.getSdkClient.get(clientId));
  }

  function listSdkClients(limit = 100) {
    return statements.listSdkClients
      .all(Math.min(Math.max(toInteger(limit, 100), 1), 300))
      .map(normalizeSdkClient);
  }

  function createControlCommand(command = {}) {
    const action = normalizeControlAction(command.action);
    const id = toText(command.id, createControlCommandId());
    const now = Date.now();

    statements.insertControlCommand.run(
      id,
      toText(command.projectId || command.project_id, "default"),
      toNullableText(command.clientId || command.client_id),
      action,
      toNullableText(command.sessionName || command.session_name),
      toJson(command.payload || {}),
      "pending",
      now,
      null,
      null,
      null
    );

    return normalizeControlCommand(statements.getControlCommand.get(id));
  }

  function listPendingControlCommands(query = {}) {
    const projectId = toText(query.projectId || query.project_id, "default");
    const clientId = toText(query.clientId || query.client_id, "");
    if (!clientId) {
      throw new Error("clientId is required");
    }

    const rows = statements.listPendingControlCommands
      .all(projectId, clientId, Math.min(Math.max(toInteger(query.limit, 20), 1), 50));
    const now = Date.now();
    rows.forEach((row) => {
      statements.updateControlCommandDelivered.run(now, row.id);
    });
    return rows.map(normalizeControlCommand);
  }

  function acknowledgeControlCommand(commandId, meta = {}) {
    const id = toText(commandId || meta.commandId || meta.command_id, "");
    if (!id) {
      throw new Error("commandId is required");
    }

    const status = normalizeCommandStatus(meta.status || "completed");
    const now = Date.now();
    statements.updateControlCommandAck.run(
      status,
      now,
      now,
      toNullableText(meta.error),
      id
    );

    const command = statements.getControlCommand.get(id);
    if (!command) {
      throw new Error("command was not found");
    }
    return normalizeControlCommand(command);
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
    deleteAllSessions,
    upsertSdkClient,
    listSdkClients,
    createControlCommand,
    listPendingControlCommands,
    acknowledgeControlCommand
  };
}

function ensureReplaySessionColumns(db) {
  const columns = db.prepare("PRAGMA table_info(replay_sessions)").all();
  const names = new Set(columns.map((column) => column.name));
  if (!names.has("session_name")) {
    db.exec("ALTER TABLE replay_sessions ADD COLUMN session_name TEXT");
  }
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
    lastSeenAt: row.last_seen_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
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
    createdAt: row.created_at,
    deliveredAt: row.delivered_at,
    completedAt: row.completed_at,
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
