import { parseHTML } from "linkedom";
import { analyzeBehavior } from "./behavior-analyzer.js";

export function pagePath(value) {
  try { const url = new URL(value, "http://replay.local"); return url.pathname + url.search + url.hash; }
  catch { return ""; }
}

export function validateCriteria(input) {
  if (!input || !["all", "current"].includes(input.scope)) throw new Error("분석 범위를 선택하세요.");
  if (input.scope === "current" && !input.sessionId) throw new Error("현재 세션을 선택하세요.");
  if (input.mode === "session") {
    if (input.scope !== "current") throw new Error("세션 행동 분석은 현재 세션만 대상으로 합니다.");
    return { mode: "session", scope: "current", sessionId: String(input.sessionId), conditions: [] };
  }
  const rawConditions = input.conditions ?? [input];
  if (!Array.isArray(rawConditions) || !rawConditions.length || rawConditions.length > 30) throw new Error("분석할 화면을 1~30개 선택하세요.");
  const conditions = rawConditions.map(item => {
    if (!item || typeof item.pagePath !== "string" || !item.pagePath) throw new Error("분석할 화면을 선택하세요.");
    const rawButtons = item.buttons ?? (item.button ? [item.button] : []);
    if (!Array.isArray(rawButtons) || rawButtons.length > 50) throw new Error("화면당 버튼은 최대 50개까지 선택할 수 있습니다.");
    const buttons = rawButtons.map(button => {
      const selectors = Array.isArray(button?.selectors) ? button.selectors : [];
      if (!selectors.length || selectors.length > 100 || selectors.some(s => typeof s !== "string" || !s || s.length > 1500)) throw new Error("버튼 조건이 올바르지 않습니다.");
      return { label: String(button.label || "").slice(0, 200), selectors: [...new Set(selectors)] };
    });
    return { pagePath: item.pagePath.slice(0, 2000), screenName: String(item.screenName || "").slice(0, 200), screenLabel: String(item.screenLabel || "").slice(0, 200), buttons };
  });
  return { mode: "detail", scope: input.scope, sessionId: String(input.sessionId || ""), match: "any", conditions };

}

// Screen context is evaluated BEFORE a click's subsequent view_state event.
// A click that opens another screen belongs to the screen it originated from.
export function matchSession(payload, criteria) {
  const events = payload?.events || [];
  if (criteria.mode === "session") return events.filter(event => ["snapshot", "event"].includes(event.type)).map(event => ({
    timeOffsetMs: event.timeOffsetMs, type: event.type,
    data: { eventType: event.data?.eventType, target: event.data?.target, screenName: event.data?.screenName }
  }));
  const conditions = criteria.conditions || [{ ...criteria, buttons: criteria.button ? [criteria.button] : [] }];
  const screenMatches = condition => currentPage === condition.pagePath && (!condition.screenName || screen === condition.screenName);

  let currentPage = pagePath(payload?.page?.href || payload?.pageUrl || payload?.session?.pageUrl || "");
  let screen = "";
  let doc = null;
  const matches = [];
  for (const event of events) {
    const data = event.data || {};
    if (event.type === "snapshot") {
      currentPage = pagePath(data.url || currentPage);
      doc = parseHTML(data.html || "<html></html>").document;
      screen = doc.querySelector(".screen.active[data-view], [data-view][aria-hidden='false']")?.getAttribute("data-view") || "";
      if (conditions.some(condition => !condition.buttons.length && screenMatches(condition))) {
        matches.push({ timeOffsetMs: event.timeOffsetMs, type: event.type, data: { url: data.url, screenName: screen, pagePath: currentPage } });
      }
    }
    if (event.type !== "event") continue;
    if (["history_pushstate", "history_replacestate", "popstate", "hashchange", "pageshow"].includes(data.eventType) && data.href) {
      currentPage = pagePath(data.href);
      screen = "";
    }
    if (data.eventType === "view_state") screen = data.screenName || "";
    if (!conditions.some(condition => screenMatches(condition) && (!condition.buttons.length ||
      (data.eventType === "click" && condition.buttons.some(button => targetMatches(doc, data.target, button.selectors)))))) continue;
    matches.push({ timeOffsetMs: event.timeOffsetMs, type: event.type, data: {
      eventType: data.eventType, target: data.target, screenName: screen, pagePath: currentPage
    } });
  }
  return matches;
}

function targetMatches(doc, target, selectors) {
  if (!target) return false;
  if (selectors.includes(target)) return true;
  if (!doc) return false;
  try {
    const clicked = doc.querySelector(target);
    if (!clicked) return false;
    return selectors.some(selector => {
      try { return [...doc.querySelectorAll(selector)].some(node => node === clicked || node.contains(clicked)); }
      catch { return false; }
    });
  } catch { return false; }
}

export async function analyzeCohort(store, criteria, onProgress = () => {}) {
  let sessions;
  if (criteria.scope === "current") {
    const session = await store.getSession(criteria.sessionId);
    if (!session) throw new Error("선택한 세션을 찾을 수 없습니다.");
    sessions = [session];
  } else {
    // Capture the candidate IDs before payload processing. Never limit analysis
    // to the viewer's first page of sessions.
    sessions = [];
    for (let offset = 0; ; offset += 200) {
      const batch = await store.listSessions(200, offset);
      sessions.push(...batch);
      if (batch.length < 200) break;
    }
    sessions = [...new Map(sessions.map(s => [s.id, s])).values()];
  }
  const matched = [];
  const logs = [];
  let matchCount = 0;
  for (let index = 0; index < sessions.length; index += 4) {
    const batch = await Promise.all(sessions.slice(index, index + 4).map(async session => {
      const payload = await store.getPayload(session.id);
      if (!payload) throw new Error(`세션 로그를 읽을 수 없습니다: ${session.id}`);
      return { session, payload, hits: matchSession(payload, criteria) };
    }));
    for (const { session, payload, hits } of batch) {
      if (!hits.length) continue;
      matchCount += hits.length;
      matched.push({ id: session.id, name: session.sessionName || session.name || session.id, summary: analyzeBehavior(payload).summary });
      logs.push(...hits.slice(0, Math.max(0, 50 - logs.length)).map(event => ({ sessionId: session.id, ...event })));
    }
    onProgress(Math.min(index + 4, sessions.length), sessions.length);
  }
  const mean = key => matched.length ? matched.reduce((sum, s) => sum + (Number(s.summary[key]) || 0), 0) / matched.length : 0;
  const total = key => matched.reduce((sum, s) => sum + (Number(s.summary[key]) || 0), 0);
  const metrics = Object.fromEntries(Object.keys(matched[0]?.summary.metrics || {}).map(key => [key,
    Math.round(matched.reduce((sum, s) => sum + s.summary.metrics[key], 0) / matched.length * 1000) / 1000]));
  const summary = {
    analysisUnit: criteria.mode === "session" ? "현재 선택한 1개 세션 전체의 행동." : "화면별 조건 중 하나라도 충족한 세션 전체의 행동. 세션 수는 고유 고객 수가 아님.",
    criteria, scannedSessions: sessions.length, matchedSessions: matched.length, matchedEvents: matchCount,
    metrics, averageDurationSec: Math.round(mean("durationSec")),
    totalEvents: total("totalEvents"), interactionEvents: total("interactionEvents"),
    clicks: matched.reduce((sum, s) => sum + (s.summary.byEventType.click || 0), 0),
    inputs: matched.reduce((sum, s) => sum + (s.summary.byEventType.input || 0) + (s.summary.byEventType.change || 0), 0), submits: total("submits"),
    perSessionSample: matched.slice(0, 30), sampleSize: Math.min(30, matched.length),
    samplingNote: matched.length > 30 ? "집계는 전체 일치 세션, 개별 요약 예시는 최신 30개 세션" : "모든 일치 세션 요약 포함"
  };
  return { criteria, summary, logs, sessions: matched.map(({ id, name }) => ({ id, name })) };
}
