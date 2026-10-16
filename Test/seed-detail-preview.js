import fs from 'node:fs';
import { parseHTML } from 'linkedom';
import { createReplayStore } from '../src/replay-db.js';
const databasePath = process.env.SESSION_REPLAY_DB_PATH;
if (!databasePath) throw new Error('SESSION_REPLAY_DB_PATH is required: use a separate preview database.');
const store = createReplayStore(databasePath);
const html = fs.readFileSync(new URL('../web/test-page/index.html', import.meta.url), 'utf8');
const { document } = parseHTML(html);
// Use the real test UI snapshot; demo events are deliberately labeled.
const snapshot = { type: 'snapshot', timeOffsetMs: 0, data: { url: 'http://localhost:4174/test-ui', html: document.toString(), viewport: { width: 1440, height: 1000 } } };
const ev = (timeOffsetMs, eventType, data) => ({ type: 'event', timeOffsetMs, data: { eventType, ...data } });
for (const [i, name] of ['[샘플] 상품몰 예적금 상담', '[샘플] 상품 비교 고객', '[샘플] 홈에서 이체'].entries()) {
  const id = `detail-preview-${i}`;
  if (store.getSession(id)) continue;
  const events = [snapshot, ev(500, 'view_state', { screenName: 'home', title: '홈', activeSelector: '.screen[data-view="home"]' }),
    ev(1500, 'click', { target: 'button[data-screen="products"]' }), ev(1600, 'view_state', { screenName: 'products', title: '상품몰', activeSelector: '.screen[data-view="products"]' }),
    ev(3500, 'click', { target: 'button[data-action="deposit-consult"]' }), ev(5000, 'scroll', { target: 'document', scrollTop: 300 }),
    ev(6500, 'view_state', { screenName: 'transfer', title: '이체', activeSelector: '.screen[data-view="transfer"]' }),
    ev(8000, 'input', { target: '#transfer-amount', value: '10000' }), ev(9500, 'submit', { target: '#transfer-form' })];
  if (i === 1) events.splice(4, 1);
  if (i === 2) events.splice(2, 4);
  store.insertEvents({ sessionId: id, sessionName: name, projectId: 'detail-preview', pageUrl: 'http://localhost:4174/test-ui', startedAt: 1791986400000 - i * 60000,
    events: events.map((event, sequence) => ({ ...event, sequence: sequence + 1 })) });
  store.endSession(id, { endedAt: 1791986410000 - i * 60000 });
}
console.log('Preview sessions ready in separate database.');
