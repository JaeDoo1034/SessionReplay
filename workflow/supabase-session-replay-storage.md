# Supabase Session Replay Storage

## Why this is needed

Vercel serverless functions do not share a durable local SQLite file across all invocations. A mobile device can successfully call the recording APIs, but the viewer may read from a different function instance or an empty `/tmp` database.

For shared mobile and desktop testing, replay sessions should be stored in an external database. This project now supports Supabase Postgres when `DATABASE_URL` is set.

Current production URL:

- `https://session-replay-poc.vercel.app/test-ui`
- `https://session-replay-poc.vercel.app/viewer`

## Runtime Behavior

```mermaid
flowchart LR
  A[Test UI / SDK] -->|start, batch, end| B[Express API on Vercel]
  B --> C{DATABASE_URL exists?}
  C -->|yes| P[src/replay-postgres-db.js]
  P --> R{Transient DB error?}
  R -->|yes| W[wait and retry<br/>max 3 attempts]
  W --> P
  R -->|no| D[Supabase Postgres]
  C -->|no| E[Local SQLite]
  F[Viewer] -->|list, payload, delete| B

  classDef retry fill:#dcfce7,stroke:#16a34a,color:#14532d;
  class P,R,W retry;
```

## Production Save Flow

```mermaid
sequenceDiagram
  participant UI as test_ui
  participant SDK as SessionReplaySDK
  participant API as Express API
  participant Store as Postgres Replay Store
  participant DB as Supabase Postgres
  participant Viewer as viewer

  UI->>SDK: Start
  SDK->>API: POST /api/replay/sessions/start
  API->>Store: insertSession()
  Store->>DB: insert replay_sessions

  UI->>SDK: User actions
  SDK->>API: POST /api/replay/events/batch
  API->>Store: insertEvents()
  Store->>DB: insert replay_events

  UI->>SDK: Stop
  SDK->>API: flush remaining events
  API->>Store: insertEvents()

  UI->>SDK: Save
  SDK->>API: POST /api/replay/sessions/end
  API->>Store: endSession()
  Store->>DB: update replay_sessions.status = ended

  Viewer->>API: GET /api/replay/sessions
  API->>Store: listSessions()
  Store->>DB: select sessions
  DB-->>Viewer: saved session is visible
```

## Supabase Connection

Use the Supabase dashboard connection string:

1. Open the Supabase project dashboard.
2. Go to `Connect`.
3. Choose the Shared Pooler connection string.
4. For Vercel/serverless, prefer Transaction mode on port `6543`.
5. Copy the full connection string and set it as `DATABASE_URL` in Vercel.

Do not expose this value in browser code. It belongs only in the server environment.

## Vercel Environment Variables

Required for persistent replay storage:

```bash
DATABASE_URL=postgresql://...
DATABASE_SSL=true
DATABASE_POOL_MAX=3
```

Optional LLM analysis:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

## Schema

The server creates the schema automatically on first connection, but the same SQL can be run manually in the Supabase SQL editor if needed.

```sql
create table if not exists replay_sessions (
  id text primary key,
  project_id text not null,
  user_id text,
  page_url text,
  user_agent text,
  viewport_width integer,
  viewport_height integer,
  started_at bigint not null,
  ended_at bigint,
  status text not null,
  recording_config_json jsonb,
  redaction_stats_json jsonb,
  dropped_event_count integer default 0
);

create table if not exists replay_events (
  id bigserial primary key,
  session_id text not null references replay_sessions(id) on delete cascade,
  event_type text not null,
  event_time bigint not null,
  sequence integer not null,
  payload_json jsonb not null,
  created_at bigint not null
);

create index if not exists idx_replay_events_session_sequence
on replay_events(session_id, sequence);

create index if not exists idx_replay_sessions_started_at
on replay_sessions(started_at desc);

alter table replay_sessions enable row level security;
alter table replay_events enable row level security;
```

## DB Timeout Lesson

Observed issue:

```text
Stop failed
Save failed
GET /api/replay/sessions?limit=1 -> 500
Connection terminated due to connection timeout
```

Root cause:

- Vercel Production function could not reliably connect to Supabase Postgres.
- The original server code did not retry transient pooler/connection errors.
- The SDK only showed generic HTTP status errors, which made the real DB cause harder to see.

Fix:

- Re-applied Vercel Production DB env values:
  - `DATABASE_URL`
  - `DATABASE_SSL`
  - `DATABASE_POOL_MAX`
- Redeployed Vercel Production so functions could read the new values.
- Added retry handling in `src/replay-postgres-db.js`.
- Improved SDK error parsing in `sdk/session-replay-sdk.js`.

Detailed lesson learned:

- `history/lession learned/stop-save-failed-db-timeout.md`

## Timeout Diagnosis Flow

```mermaid
flowchart TD
  Symptom[Stop failed / Save failed] --> CheckAPI[Check production API<br/>GET /api/replay/sessions?limit=1]
  CheckAPI --> APIResult{API result}
  APIResult -->|200 OK| CheckPayload[Check selected session payload]
  APIResult -->|500 DB timeout| CheckLocalDB[Check local .env DATABASE_URL<br/>select now]

  CheckLocalDB --> LocalResult{Local DB works?}
  LocalResult -->|no| FixSupabase[Fix Supabase connection string or DB status]
  LocalResult -->|yes| CheckVercelEnv[Check Vercel Production env]

  CheckVercelEnv --> ReapplyEnv[Re-apply DATABASE_URL / SSL / POOL_MAX]
  ReapplyEnv --> Redeploy[Vercel production redeploy]
  Redeploy --> VerifyFlow[Verify start -> batch -> end -> payload]

  VerifyFlow --> Stable{Still intermittent?}
  Stable -->|yes| RetryLogic[Check retry logic and pooler status]
  Stable -->|no| Done[Resolved]
```

## Retry Policy in Current Source

`src/replay-postgres-db.js` treats the following as transient DB errors:

- message contains `connection terminated`
- message contains `timeout`
- message contains `terminating connection`
- code is `ETIMEDOUT`
- code is `ECONNRESET`
- code is `ECONNREFUSED`
- code is `53300`

Retry behavior:

```mermaid
flowchart LR
  Query[DB query or transaction] --> Run[Run operation]
  Run --> Result{Success?}
  Result -->|yes| OK[Return result]
  Result -->|no| Transient{Transient error?}
  Transient -->|no| Throw[Throw original error]
  Transient -->|yes| Attempt{attempt < 3?}
  Attempt -->|yes| Wait[Wait 250ms * attempt]
  Wait --> Run
  Attempt -->|no| Throw
```

## Test Checklist

1. Deploy after setting `DATABASE_URL`.
2. Open `/test-ui` on a phone.
3. Start recording.
4. Interact with the UI.
5. Stop and save.
6. Open `/viewer` on desktop.
7. Confirm the saved mobile session appears in the left session list.
8. Confirm `GET /api/replay/sessions?limit=1` returns `200`.
9. Confirm `GET /api/replay/sessions/:id/payload` returns the saved events.
