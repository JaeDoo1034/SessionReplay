# Supabase Session Replay Storage

## Why this is needed

Vercel serverless functions do not share a durable local SQLite file across all invocations. A mobile device can successfully call the recording APIs, but the viewer may read from a different function instance or an empty `/tmp` database.

For shared mobile and desktop testing, replay sessions should be stored in an external database. This project now supports Supabase Postgres when `DATABASE_URL` is set.

## Runtime Behavior

```mermaid
flowchart LR
  A[Test UI / SDK] -->|start, batch, end| B[Express API on Vercel]
  B --> C{DATABASE_URL exists?}
  C -->|yes| D[Supabase Postgres]
  C -->|no| E[Local SQLite]
  F[Viewer] -->|list, payload, delete| B
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

## Test Checklist

1. Deploy after setting `DATABASE_URL`.
2. Open `/test-ui` on a phone.
3. Start recording.
4. Interact with the UI.
5. Stop and save.
6. Open `/viewer` on desktop.
7. Confirm the saved mobile session appears in the left session list.
