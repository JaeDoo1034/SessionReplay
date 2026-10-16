import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { matchSession, analyzeCohort, validateCriteria } from '../src/cohort-analysis.js';
import { createReplayStore } from '../src/replay-db.js';
const snapshot = { type: 'snapshot', timeOffsetMs: 0, data: { url: 'https://bank.test/test-ui', html: '<html><body><section class="screen active" data-view="home"><button id="join"><span id="icon">가입하기</span></button></section></body></html>' } };
const event = (ms, eventType, extra) => ({ type: 'event', timeOffsetMs: ms, data: { eventType, ...extra } });
const payload = { events: [snapshot, event(100, 'click', { target: '#icon' }), event(110, 'view_state', { screenName: 'products' }), event(200, 'click', { target: '#join' })] };
const criteria = { scope: 'all', pagePath: '/test-ui', screenName: 'home', button: { selectors: ['#join'] } };
test('button child click is included only on the originating screen', () => {
  assert.deepEqual(matchSession(payload, criteria).map(e => e.timeOffsetMs), [100]);
  assert.deepEqual(matchSession(payload, { ...criteria, screenName: 'products' }).map(e => e.timeOffsetMs), [200]);
});
test('same button on a different URL is excluded; screen-only condition is supported', () => {
  assert.equal(matchSession(payload, { ...criteria, pagePath: '/other' }).length, 0);
  assert.equal(matchSession(payload, { ...criteria, button: null }).length, 2);
  assert.equal(matchSession({ events: [snapshot] }, { ...criteria, button: null }).length, 1);
});
test('navigation intents do not change the page before actual navigation', () => {
  const p = { events: [snapshot, event(20, 'navigation_intent', { href: 'https://bank.test/other' }), event(30, 'click', { target: '#join' }), event(40, 'history_pushstate', { href: 'https://bank.test/other' }), event(50, 'click', { target: '#join' })] };
  assert.deepEqual(matchSession(p, criteria).map(e => e.timeOffsetMs), [30]);
});
test('all scope scans beyond 200 sessions and metrics retain fractions', async () => {
  const sessions = Array.from({ length: 205 }, (_, i) => ({ id: String(i) }));
  const store = { listSessions: async (limit, offset) => sessions.slice(offset, offset + limit), getPayload: async () => payload };
  const result = await analyzeCohort(store, criteria);
  assert.equal(result.summary.scannedSessions, 205);
  assert.equal(result.summary.matchedSessions, 205);
  assert.equal(result.summary.matchedEvents, 205);
  assert.equal(result.logs.length, 50);
  assert.equal(result.summary.perSessionSample.length, 30);
  assert.ok(result.summary.metrics.engagementScore > 0 && result.summary.metrics.engagementScore < 1);
  assert.equal(result.summary.clicks, 410);
});
test('current scope reads only the selected session and empty matches are valid', async () => {
  const store = { getSession: async id => ({ id }), getPayload: async () => payload, listSessions: () => { throw new Error('must not list'); } };
  const result = await analyzeCohort(store, { ...criteria, scope: 'current', sessionId: 'a' });
  assert.equal(result.summary.scannedSessions, 1);
  assert.equal(result.sessions[0].id, 'a');
  const empty = await analyzeCohort(store, { ...criteria, scope: 'current', sessionId: 'a', pagePath: '/absent' });
  assert.equal(empty.summary.matchedSessions, 0);
  assert.deepEqual(empty.summary.metrics, {});
});
test('SQLite pagination uses a stable order and supports offset', () => {
  const store = createReplayStore(join(mkdtempSync(join(tmpdir(), 'replay-cohort-test-')), 'test.sqlite'));
  store.insertSession({ sessionId: 'a', startedAt: 100 });
  store.insertSession({ sessionId: 'b', startedAt: 100 });
  assert.equal(store.listSessions(1, 0)[0].id, 'b');
  assert.equal(store.listSessions(1, 1)[0].id, 'a');
});
test('invalid criteria fail before scanning', () => {
  assert.throws(() => validateCriteria({ scope: 'all' }), /화면/);
  assert.throws(() => validateCriteria({ scope: 'current', pagePath: '/test-ui' }), /세션/);
  assert.throws(() => validateCriteria({ scope: 'all', pagePath: '/test-ui', button: { selectors: [] } }), /버튼/);
});

test('multiple screen/button conditions use OR without crossing screen contexts or double counting', () => {
  const multi = validateCriteria({ scope: 'all', conditions: [
    { pagePath: '/test-ui', screenName: 'home', buttons: [{ label: 'join', selectors: ['#join'] }, { label: 'icon', selectors: ['#icon'] }] },
    { pagePath: '/test-ui', screenName: 'products', buttons: [{ label: 'other', selectors: ['#other'] }] }
  ] });
  assert.deepEqual(matchSession(payload, multi).map(e => e.timeOffsetMs), [100]);
  multi.conditions[1].buttons.push({ label: 'join', selectors: ['#join'] });
  assert.deepEqual(matchSession(payload, multi).map(e => e.timeOffsetMs), [100, 200]);
});
test('mixed screen-only visits and button conditions are supported', () => {
  const multi = validateCriteria({ scope: 'all', conditions: [
    { pagePath: '/test-ui', screenName: 'home', buttons: [] },
    { pagePath: '/test-ui', screenName: 'products', buttons: [{ selectors: ['#join'] }] }
  ] });
  assert.deepEqual(matchSession(payload, multi).map(e => e.timeOffsetMs), [0, 100, 200]);
});
test('single-session mode needs no screen selection and never includes another session', async () => {
  const single = validateCriteria({ mode: 'session', scope: 'current', sessionId: 'one' });
  const store = { getSession: async id => ({ id }), getPayload: async () => payload, listSessions: () => { throw new Error('must not scan all'); } };
  const result = await analyzeCohort(store, single);
  assert.equal(result.summary.matchedSessions, 1);
  assert.equal(result.summary.matchedEvents, 4);
  assert.equal(result.sessions[0].id, 'one');
  assert.throws(() => validateCriteria({ mode: 'session', scope: 'all' }), /현재 세션/);
});
test('empty or oversized multi-selection cannot fall back to unfiltered analysis', () => {
  assert.throws(() => validateCriteria({ scope: 'all', conditions: [] }), /화면/);
  assert.throws(() => validateCriteria({ scope: 'all', conditions: Array(31).fill({ pagePath: '/' }) }), /화면/);
  assert.throws(() => validateCriteria({ scope: 'all', conditions: [{ pagePath: '/', buttons: [{ selectors: [] }] }] }), /버튼/);
});
