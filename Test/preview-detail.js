import { join } from 'node:path';
import { tmpdir } from 'node:os';
// Isolated, clearly labeled sample sessions; never use the configured production DB.
process.env.DATABASE_URL = '';
process.env.SESSION_REPLAY_DB_PATH ||= join(tmpdir(), 'session-replay-detail-preview.sqlite');
process.env.PORT ||= '4174';
await import('./seed-detail-preview.js');
await import('../src/server.js');
