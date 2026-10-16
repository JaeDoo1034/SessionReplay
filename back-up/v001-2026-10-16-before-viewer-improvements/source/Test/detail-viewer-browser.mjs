import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1512, height: 1100 } });
const liveLlm = process.env.RUN_LIVE_LLM === '1' || process.argv.includes('--live');
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
const screenshotDir = process.env.SCREENSHOT_DIR || '/tmp/session-replay-detail-shots';
await fs.mkdir(screenshotDir, { recursive: true });
try {
  await page.goto(`${base}/viewer`);
  await page.getByRole('switch', { name: '상세 분석' }).waitFor();
  await page.getByRole('button', { name: '일시정지', exact: true }).waitFor();
  await page.screenshot({ path: `${screenshotDir}/default.png`, fullPage: true });
  await page.getByRole('switch', { name: '상세 분석' }).check();
  await page.getByRole('combobox', { name: '기록된 화면' }).selectOption({ label: '상품몰 · 0:01' });
  await page.getByRole('button', { name: '화면으로 이동', exact: true }).click();
  await page.getByRole('button', { name: '이 화면 선택', exact: true }).click();
  await page.getByRole('button', { name: '화면에서 버튼 선택', exact: true }).click();
  await page.frameLocator('#replay-frame').getByRole('button', { name: '예적금상담', exact: true }).click();
  await page.getByText('선택한 버튼의 실제 기록 예시 · 현재 세션').waitFor();
  await page.screenshot({ path: `${screenshotDir}/criteria.png`, fullPage: true });
  await page.getByRole('button', { name: '실제 로그 확인', exact: true }).click();
  await page.getByText('로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.').waitFor({ timeout: 30000 });
  const previewText = await page.locator('.analysis-log-preview').innerText();
  assert.match(previewText, /3개 중 1개 세션/);
  assert.match(previewText, /deposit-consult/);
  await page.screenshot({ path: `${screenshotDir}/workflow-logs.png`, fullPage: false });
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  await page.getByRole('button', { name: '현재 선택한 세션', exact: true }).click();
  await page.getByRole('button', { name: '실제 로그 확인', exact: true }).click();
  await page.getByText('로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.').waitFor({ timeout: 30000 });
  assert.match(await page.locator('.analysis-log-preview').innerText(), /1개 중 1개 세션/);
  await page.getByRole('button', { name: '닫기', exact: true }).click();
  // Verify real LLM roundtrip only when explicitly enabled for this test.
  if (liveLlm) {
    await page.getByRole('button', { name: '전체 세션', exact: true }).click();
    await page.getByRole('button', { name: '분석 실행 ↗', exact: true }).click();
    await page.getByText('LLM 분석 완료 · 좌측 분석 메뉴에 결과를 반영했습니다.').waitFor({ timeout: 120000 });
    await page.screenshot({ path: `${screenshotDir}/workflow-complete.png`, fullPage: false });
    await page.getByRole('button', { name: '분석 결과 보기', exact: true }).click();
    assert.match(await page.locator('#cohort-result').innerText(), /3개 중 1개 세션/);
    await page.screenshot({ path: `${screenshotDir}/result.png`, fullPage: true });
  } else {
    await page.route('**/api/llm-analyze', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: '검증용 LLM 오류' }) }));
    await page.getByRole('button', { name: '분석 실행 ↗', exact: true }).click();
    await page.locator('.analysis-events').getByText('검증용 LLM 오류').waitFor();
    assert.match(await page.locator('.analysis-node.failed').innerText(), /LLM 분석/);
  }
  // Mobile layout should fit the viewport and keep the toggle accessible.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: '닫기', exact: true }).count().then(async count => { if (count) await page.getByRole('button', { name: '닫기', exact: true }).click(); });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await page.screenshot({ path: `${screenshotDir}/mobile.png`, fullPage: true });
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, liveLlm, screenshots: screenshotDir }));
} catch (error) {
  await page.screenshot({ path: `${screenshotDir}/failure.png`, fullPage: true });
  console.error('Browser test failed:', error.message);
  throw error;
} finally { await browser.close(); }
