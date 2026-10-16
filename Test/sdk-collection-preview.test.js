import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';

function setup() {
  const { document, window } = parseHTML('<html><body><section><button id="join"><span>가입하기</span></button><button class="sr-mask">비밀 텍스트</button><button class="sr-block">제외</button></section></body></html>');
  window.innerWidth = 1280; window.innerHeight = 800;
  const sdkWindow = { document, innerWidth: 1280, innerHeight: 800 };
  let requests = 0;
  vm.runInNewContext(fs.readFileSync(new URL('../sdk/session-replay-sdk.js', import.meta.url), 'utf8'), {
    window: sdkWindow, document, Node: { ELEMENT_NODE: 1 },
    fetch: () => { requests++; throw new Error('Preview must never send a request'); }
  });
  return { api: sdkWindow.SessionReplaySDK, document, requestCount: () => requests };
}

test('SDK preview uses collection fields without recording or sending events', () => {
  const { api, document, requestCount } = setup();
  const before = api.getQueueSize();
  const result = api.previewCollection({ eventType: 'click', target: document.querySelector('#join') });
  assert.equal(result.collectible, true);
  assert.equal(result.log.type, 'event');
  assert.equal(result.log.data.target, '#join');
  assert.equal(result.log.data.text, '가입하기');
  assert.equal(result.log.data.eventType, 'click');
  assert.equal(result.log.data.viewportWidth, 1280);
  assert.match(result.log.at, /수집 시각/);
  assert.match(result.log.data.x, /클릭 시/);
  assert.equal(api.getQueueSize(), before);
  assert.equal(api.isRecording(), false);
  assert.equal(requestCount(), 0);
});

test('SDK preview honors masking, blocking and disabled event policy', () => {
  const { api, document } = setup();
  assert.equal(api.previewCollection({ target: document.querySelector('.sr-mask') }).log.data.text, '[redacted]');
  assert.equal(api.previewCollection({ target: document.querySelector('.sr-block') }).collectible, false);
  api.configure({ enabledEvents: { click: false } });
  assert.equal(api.previewCollection({ target: document.querySelector('#join') }).collectible, false);
});

test('SDK preview preserves track payload and resolves another document correctly', () => {
  const { api } = setup();
  const { document } = parseHTML('<html><body><div><button>다른 문서</button></div></body></html>');
  const preview = api.previewCollection({ eventType: 'click', target: document.querySelector('button') });
  assert.equal(preview.log.data.target, 'html > body > div > button');
  const view = api.previewCollection({ eventType: 'view_state', data: { screenName: 'products', activeSelector: '.screen[data-view="products"]' } });
  assert.equal(view.log.data.eventType, 'view_state');
  assert.equal(view.log.data.screenName, 'products');
  assert.equal(view.log.data.activeSelector, '.screen[data-view="products"]');
});
