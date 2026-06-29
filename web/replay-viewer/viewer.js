import { SessionReplayer } from "/src/replayer.js";
import { analyzeBehavior } from "/src/behavior-analyzer.js";

const viewerLayout = document.querySelector(".viewer-layout");
const sessionDrawerToggle = document.getElementById("session-drawer-toggle");
const sessionDrawerClose = document.getElementById("session-drawer-close");
const sessionDrawerBackdrop = document.getElementById("session-drawer-backdrop");
const sessionList = document.getElementById("session-list");
const refreshButton = document.getElementById("refresh-sessions");
const deleteAllSessionsButton = document.getElementById("delete-all-sessions");
const selectedTitle = document.getElementById("selected-title");
const selectedMeta = document.getElementById("selected-meta");
const selectedBadges = document.getElementById("selected-badges");
const statusLine = document.getElementById("viewer-status");
const replayFrame = document.getElementById("replay-frame");
const speedSelect = document.getElementById("speed-select");
const mutationToggle = document.getElementById("mutation-toggle");
const playButton = document.getElementById("play-replay");
const stopButton = document.getElementById("stop-replay");
const localAnalyzeButton = document.getElementById("local-analyze");
const llmAnalyzeButton = document.getElementById("llm-analyze");
const insightTitle = document.getElementById("insight-title");
const insightSummary = document.getElementById("insight-summary");
const insightPrimary = document.getElementById("insight-primary");
const insightConfidence = document.getElementById("insight-confidence");
const metricGrid = document.getElementById("metric-grid");
const customerRanking = document.getElementById("customer-ranking");
const insightEvidence = document.getElementById("insight-evidence");
const insightRecommendations = document.getElementById("insight-recommendations");
const detailTabs = Array.from(document.querySelectorAll(".detail-tab"));
const detailPanel = document.querySelector(".session-detail-panel");
const detailContent = document.getElementById("detail-content");
const llmPromptDialog = document.getElementById("llm-prompt-dialog");
const llmPromptForm = document.getElementById("llm-prompt-form");
const llmPromptClose = document.getElementById("llm-prompt-close");
const llmPromptSkip = document.getElementById("llm-prompt-skip");
const llmAnalysisInstructions = document.getElementById("llm-analysis-instructions");

let selectedSessionId = "";
let loadedPayload = null;
let lastBehaviorAnalysis = null;
let currentDetailTab = "timeline";
let heatmapOverlay = null;
let loadedSessionCount = 0;
let loadedSessions = [];

const replayer = new SessionReplayer({
  iframe: replayFrame,
  stageEl: replayFrame.parentElement,
  applyMutationEvents: false,
  executePageScripts: false,
  onStatus: setStatus
});

ensureHeatmapOverlay();

sessionDrawerToggle.addEventListener("click", () => {
  setSessionDrawerOpen(!viewerLayout.classList.contains("session-drawer-open"));
});
sessionDrawerClose.addEventListener("click", () => setSessionDrawerOpen(false));
sessionDrawerBackdrop.addEventListener("click", () => setSessionDrawerOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && viewerLayout.classList.contains("session-drawer-open")) {
    setSessionDrawerOpen(false);
  }
});
refreshButton.addEventListener("click", loadSessions);
deleteAllSessionsButton.addEventListener("click", deleteAllSessions);

mutationToggle.addEventListener("click", () => {
  const enabled = replayer.setApplyMutationEvents(!replayer.applyMutationEvents);
  mutationToggle.textContent = enabled ? "Mutation ON" : "Mutation OFF";
  setStatus(`Mutation apply is now ${enabled ? "ON" : "OFF"}.`);
});

playButton.addEventListener("click", () => {
  if (!loadedPayload) {
    setStatus("재생할 payload가 없습니다.");
    return;
  }
  try {
    replayer.load(loadedPayload);
    replayer.play({ speed: Number(speedSelect.value || 1) });
    stopButton.disabled = false;
  } catch (error) {
    setStatus(`Replay failed: ${error.message}`);
  }
});

stopButton.addEventListener("click", () => {
  replayer.stop();
});

detailTabs.forEach((button) => {
  button.addEventListener("click", () => {
    currentDetailTab = button.dataset.detailTab;
    renderDetailTab();
  });
});

localAnalyzeButton.addEventListener("click", () => {
  if (!loadedPayload) {
    setInsightMessage("세션을 먼저 선택하세요.");
    return;
  }
  runLocalAnalysis();
});

llmAnalyzeButton.addEventListener("click", () => {
  if (!loadedPayload) {
    setInsightMessage("세션을 먼저 선택하세요.");
    return;
  }

  if (!lastBehaviorAnalysis) {
    runLocalAnalysis();
  }

  llmPromptDialog.showModal();
});

llmPromptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runLlmAnalysis(llmAnalysisInstructions.value);
});

llmPromptClose.addEventListener("click", () => {
  llmPromptDialog.close();
});

llmPromptSkip.addEventListener("click", () => {
  llmAnalysisInstructions.value = "";
  runLlmAnalysis("");
});

async function runLlmAnalysis(analysisInstructions = "") {
  if (!loadedPayload || !lastBehaviorAnalysis) {
    setInsightMessage("세션을 먼저 선택하세요.");
    return;
  }

  llmPromptDialog.close();
  llmAnalyzeButton.disabled = true;
  setInsightMessage("LLM이 고객 행동 유형을 분석하는 중...");

  try {
    const response = await fetch("/api/llm-analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary: lastBehaviorAnalysis.summary,
        prompt: lastBehaviorAnalysis.prompt,
        analysisInstructions
      })
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "LLM 분석 API 호출 실패");
    }

    renderLlmInsight(json);
    setStatus("LLM 고객 행동 유형 분석을 완료했습니다.");
  } catch (error) {
    setInsightMessage(`LLM 분석 실패: ${error.message}`);
  } finally {
    llmAnalyzeButton.disabled = !loadedPayload;
  }
}

loadSessions();

async function loadSessions() {
  setStatus("세션 목록을 불러오는 중...");
  sessionList.innerHTML = "";

  try {
    const response = await fetch("/api/replay/sessions?limit=100");
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "세션 목록 조회 실패");
    }

    loadedSessions = Array.isArray(json.sessions) ? json.sessions : [];
    loadedSessionCount = loadedSessions.length;
    deleteAllSessionsButton.disabled = loadedSessionCount === 0;

    if (!loadedSessions.length) {
      sessionList.innerHTML = `<div class="session-item"><strong>저장된 세션 없음</strong><span>/web/test-page/index.html에서 먼저 상호작용을 만들어보세요.</span></div>`;
      resetSelectedSession();
      setStatus("저장된 세션이 없습니다.");
      return;
    }

    loadedSessions.forEach((session) => {
      const item = document.createElement("article");
      item.className = "session-item";
      item.dataset.sessionId = session.id;
      const displayName = getSessionDisplayName(session);
      const durationLabel = formatDuration((session.lastEventAt || session.endedAt || session.startedAt) - session.startedAt);
      item.innerHTML = `
        <button type="button" class="session-select">
          <strong>${escapeHtml(displayName)}</strong>
          <span>${new Date(session.startedAt).toLocaleString()}</span>
          <span>${escapeHtml(session.projectId)} · ${escapeHtml(shortSessionId(session.id))}</span>
          <span>${escapeHtml(session.pageUrl || "")}</span>
          <div class="session-badges">
            <b>${session.eventCount || 0} events</b>
            <b>${durationLabel}</b>
            <b>${escapeHtml(session.status || "unknown")}</b>
          </div>
        </button>
        <button type="button" class="session-delete" aria-label="Delete session ${escapeHtml(session.id)}">삭제</button>
      `;

      item.querySelector(".session-select").addEventListener("click", () => selectSession(session));
      item.querySelector(".session-delete").addEventListener("click", () => deleteSession(session));
      sessionList.appendChild(item);
    });

    setStatus(`세션 ${json.sessions.length}개를 불러왔습니다.`);
  } catch (error) {
    loadedSessions = [];
    loadedSessionCount = 0;
    deleteAllSessionsButton.disabled = true;
    setStatus(`세션 목록 조회 실패: ${error.message}`);
  }
}

async function selectSession(session) {
  selectedSessionId = session.id;
  loadedPayload = null;
  lastBehaviorAnalysis = null;
  playButton.disabled = true;
  stopButton.disabled = true;
  localAnalyzeButton.disabled = true;
  llmAnalyzeButton.disabled = true;

  document.querySelectorAll(".session-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.sessionId === selectedSessionId);
  });

  selectedTitle.textContent = getSessionDisplayName(session);
  selectedMeta.textContent = `${shortSessionId(session.id)} · ${session.pageUrl || "unknown page"} · ${session.eventCount || 0} events`;
  renderSelectedBadges(session, null);
  setStatus("payload를 불러오는 중...");

  try {
    const response = await fetch(`/api/replay/sessions/${encodeURIComponent(session.id)}/payload`);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "payload 조회 실패");
    }

    loadedPayload = json.payload;
    replayer.load(loadedPayload);
    replayer.preview(() => {
      syncHeatmapOverlay();
    });
    playButton.disabled = false;
    stopButton.disabled = false;
    localAnalyzeButton.disabled = false;
    llmAnalyzeButton.disabled = false;
    runLocalAnalysis();
    renderSelectedBadges(session, loadedPayload);
    setSessionDrawerOpen(false);
    setStatus(`Payload loaded. events=${loadedPayload.eventCount}`);
  } catch (error) {
    setStatus(`Payload load failed: ${error.message}`);
  }
}

function setSessionDrawerOpen(open) {
  viewerLayout.classList.toggle("session-drawer-open", open);
  viewerLayout.classList.toggle("session-drawer-closed", !open);
  sessionDrawerToggle.setAttribute("aria-expanded", open ? "true" : "false");
  sessionDrawerBackdrop.hidden = !open;
}

async function deleteSession(session) {
  const ok = window.confirm(`이 세션을 삭제할까요?\n\n${getSessionDisplayName(session)}\n${session.id}`);
  if (!ok) {
    return;
  }

  setStatus("세션 삭제 중...");

  try {
    const response = await fetch(`/api/replay/sessions/${encodeURIComponent(session.id)}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "세션 삭제 실패");
    }

    if (selectedSessionId === session.id) {
      resetSelectedSession();
      replayer.stop();
    }

    setStatus("세션을 삭제했습니다.");
    await loadSessions();
  } catch (error) {
    setStatus(`세션 삭제 실패: ${error.message}`);
  }
}

async function deleteAllSessions() {
  if (!loadedSessionCount) {
    setStatus("삭제할 세션이 없습니다.");
    return;
  }

  const ok = window.confirm(`저장된 세션 ${loadedSessionCount}개를 모두 삭제할까요?\n\n이 작업은 되돌릴 수 없습니다.`);
  if (!ok) {
    return;
  }

  setStatus("전체 세션 삭제 중...");
  deleteAllSessionsButton.disabled = true;

  try {
    const json = await requestDeleteAllSessions();

    resetSelectedSession();
    replayer.stop();
    setStatus(`전체 세션을 삭제했습니다. deleted=${json.deletedCount || 0}`);
    await loadSessions();
  } catch (error) {
    setStatus(`전체 세션 삭제 실패: ${error.message}`);
    deleteAllSessionsButton.disabled = loadedSessionCount === 0;
  }
}

async function requestDeleteAllSessions() {
  const primary = await fetchJson("/api/replay/sessions/delete-all", { method: "POST" });
  if (primary.ok) {
    return primary.json;
  }

  const fallback = await fetchJson("/api/replay/sessions", { method: "DELETE" });
  if (fallback.ok) {
    return fallback.json;
  }

  const individual = await deleteLoadedSessionsOneByOne();
  if (individual.deletedCount > 0) {
    return individual;
  }

  throw new Error(primary.error || fallback.error || individual.error || "전체 세션 삭제 실패");
}

async function deleteLoadedSessionsOneByOne() {
  let deletedCount = 0;
  let lastError = "";

  for (const session of loadedSessions) {
    const sessionId = session && session.id;
    if (!sessionId) {
      continue;
    }

    const result = await fetchJson(`/api/replay/sessions/${encodeURIComponent(sessionId)}`, {
      method: "DELETE"
    });
    if (result.ok) {
      deletedCount += 1;
    } else {
      lastError = result.error;
    }
  }

  return {
    ok: deletedCount > 0,
    deleted: deletedCount > 0,
    deletedCount,
    error: lastError
  };
}

async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { raw: text };
    }

    return {
      ok: response.ok,
      status: response.status,
      json,
      error: json.error || `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      json: {},
      error: error.message || "request failed"
    };
  }
}

function resetSelectedSession() {
  selectedSessionId = "";
  loadedPayload = null;
  lastBehaviorAnalysis = null;
  playButton.disabled = true;
  stopButton.disabled = true;
  localAnalyzeButton.disabled = true;
  llmAnalyzeButton.disabled = true;
  selectedTitle.textContent = "세션을 선택하세요";
  selectedMeta.textContent = "왼쪽 목록에서 수집된 세션을 선택하면 payload를 로드합니다.";
  selectedBadges.innerHTML = "";
  if (detailContent) {
    detailContent.textContent = "세션을 선택하면 주요 이벤트와 지표가 표시됩니다.";
  }
  hideHeatmapOverlay();
  resetInsight();
}

function runLocalAnalysis() {
  try {
    lastBehaviorAnalysis = analyzeBehavior(loadedPayload);
    const summary = lastBehaviorAnalysis.summary;
    insightTitle.textContent = "로컬 행동 요약";
    insightSummary.textContent = [
      `총 ${summary.totalEvents}개 이벤트`,
      `${summary.durationSec}초`,
      `판단 근거: ${summary.customerType.reasonCodes.map(formatReasonCode).join(", ")}`
    ].join(" · ");
    insightPrimary.textContent = summary.customerType.primaryLabelKo || summary.customerType.primaryType || "neutral";
    insightConfidence.textContent = `${Math.round((summary.customerType.confidence || 0) * 100)}%`;
    renderMetrics(summary.metrics || {});
    renderCustomerTypeDefinition({
      name: "LLM 분석 전",
      description: "아래 로컬 지표는 참고용입니다. Analyze with LLM을 누르면 LLM이 고정 범주가 아닌 세션 맞춤 고객 유형을 직접 정의합니다.",
      traits: (summary.customerType?.candidates || []).slice(0, 3).map((item) => `${item.labelKo} ${Math.round(item.score * 100)}%`)
    });
    renderList(insightEvidence, [
      `로컬 참고 후보: ${(summary.customerType?.candidates || []).slice(0, 3).map((item) => `${item.labelKo} ${Math.round(item.score * 100)}%`).join(", ")}`,
      `상호작용 이벤트 ${summary.interactionEvents}개, DOM 변경 ${summary.mutationEvents}개`,
      `고유 타겟 ${summary.uniqueTargets}개, 최대 스크롤 ${summary.maxScrollTop}px`,
      `완료 버튼 제출 ${summary.submits}회, 빠른 반복 클릭 ${summary.rapidClickBursts}회, 같은 위치 반복 클릭 ${summary.repeatedClickTargets}개`
    ]);
    renderList(insightRecommendations, buildLocalCustomerDefinition(summary));
  } catch (error) {
    lastBehaviorAnalysis = null;
    setInsightMessage(`로컬 분석 실패: ${error.message}`);
  }
}

function renderLlmInsight(json) {
  const korean = json.customerResultKo?.final_result_ko || json.customerResultKo?.previous_result_ko;
  const english = json.result || {};
  const result = korean || english;

  insightTitle.textContent = "LLM이 정의한 고객 유형";
  insightSummary.textContent = json.customerSummaryKo || result.customer_type_description || "LLM이 세션 행동을 기반으로 고객 유형을 정의했습니다.";
  insightPrimary.textContent = result.customer_type_name || result.primary_type || "unknown";
  insightConfidence.textContent = typeof result.confidence === "number"
    ? `${Math.round(result.confidence * 100)}%`
    : "-";
  renderCustomerTypeDefinition({
    name: result.customer_type_name || result.primary_type || "unknown",
    description: result.customer_type_description || json.customerSummaryKo || "",
    traits: result.secondary_traits || result.secondary_types || []
  });
  renderList(insightRecommendations, result.why_this_type || [result.customer_type_description].filter(Boolean));
  renderList(insightEvidence, result.evidence || []);
}

function buildLocalCustomerDefinition(summary) {
  const items = [];
  if (summary.behaviorSignals.shortBounce) {
    items.push("짧은 시간 안에 소수 행동만 수행한 고객입니다.");
  }
  if (summary.behaviorSignals.formIntent && !summary.behaviorSignals.completion) {
    items.push("입력 의도는 있으나 전환 완료 전 멈춘 고객입니다.");
  }
  if (summary.behaviorSignals.frustration) {
    items.push("반복 클릭 또는 빠른 클릭 burst로 마찰 신호가 감지된 고객입니다.");
  }
  if (!items.length) {
    items.push("로컬 지표만으로는 강한 이상 신호가 없는 고객입니다.");
  }
  return items;
}

function resetInsight() {
  insightTitle.textContent = "고객 행동 유형 분석";
  insightSummary.textContent = "세션을 선택하면 행동 요약을 만들고, LLM으로 고객 유형을 해석할 수 있습니다.";
  insightPrimary.textContent = "-";
  insightConfidence.textContent = "-";
  renderMetrics({});
  renderCustomerTypeDefinition(null);
  renderList(insightEvidence, []);
  renderList(insightRecommendations, []);
}

function setInsightMessage(message) {
  insightSummary.textContent = message;
}

function renderList(target, items) {
  target.innerHTML = "";
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) {
    const li = document.createElement("li");
    li.textContent = "-";
    target.appendChild(li);
    return;
  }

  values.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = String(item);
    target.appendChild(li);
  });
}

function renderMetrics(metrics) {
  const labels = [
    ["engagementScore", "관심도"],
    ["explorationScore", "탐색 적극성"],
    ["goalIntentScore", "이체·가입 등 실행 의지"],
    ["frictionScore", "불편 신호"],
    ["formIntentScore", "입력 진행도"],
    ["conversionScore", "완료 가능성"]
  ];

  metricGrid.innerHTML = "";

  labels.forEach(([key, label]) => {
    const value = Number(metrics[key] || 0);
    const item = document.createElement("div");
    item.className = "metric-pill";
    item.innerHTML = `
      <b>${label}</b>
      <em>${Math.round(value * 100)}%</em>
      <div class="metric-bar"><span style="width:${Math.round(value * 100)}%"></span></div>
    `;
    metricGrid.appendChild(item);
  });
}

function renderSelectedBadges(session, payload) {
  const events = Array.isArray(payload?.events) ? payload.events : [];
  const clicks = events.filter((event) => event.type === "event" && event.data?.eventType === "click").length;
  const submits = events.filter((event) => event.type === "event" && event.data?.eventType === "submit").length;
  const mutations = events.filter((event) => event.type === "mutation").length;
  const durationMs = Math.max(0, ...events.map((event) => Number(event.timeOffsetMs) || 0));
  const badges = [
    ["체류 시간", durationMs ? formatDuration(durationMs) : "-"],
    ["기록 이벤트", payload?.eventCount ?? session?.eventCount ?? "-"],
    ["클릭", clicks],
    ["제출", submits],
    ["화면 변화", mutations],
    ["상태", formatSessionStatus(session?.status)]
  ];

  selectedBadges.innerHTML = badges.map(([label, value]) => `
    <span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>
  `).join("");
}

function renderDetailTab() {
  if (!detailContent || !detailPanel) {
    hideHeatmapOverlay();
    return;
  }

  detailTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.detailTab === currentDetailTab);
  });
  detailPanel.classList.toggle("heatmap-open", currentDetailTab === "heatmap");

  if (!loadedPayload) {
    detailContent.textContent = "세션을 선택하면 주요 이벤트와 지표가 표시됩니다.";
    hideHeatmapOverlay();
    return;
  }

  if (currentDetailTab === "timeline") {
    hideHeatmapOverlay();
    renderTimelineTab();
    return;
  }
  if (currentDetailTab === "events") {
    hideHeatmapOverlay();
    renderEventsTab();
    return;
  }
  if (currentDetailTab === "heatmap") {
    renderHeatmapTab();
    syncHeatmapOverlay();
    return;
  }
  hideHeatmapOverlay();
  renderMetricsTab();
}

function renderTimelineTab() {
  const keyEvents = loadedPayload.events
    .filter((event) => event.type === "event" || event.type === "snapshot" || event.type === "meta")
    .slice(0, 12);

  detailContent.innerHTML = `
    <ol class="timeline-list">
      ${keyEvents.map((event) => `
        <li>
          <span>${formatDuration(event.timeOffsetMs || 0)}</span>
          <strong>${escapeHtml(formatEventType(event.data?.eventType || event.type))}</strong>
          <em>${escapeHtml(event.data?.target || event.data?.reason || "")}</em>
        </li>
      `).join("")}
    </ol>
  `;
}

function renderEventsTab() {
  const counts = lastBehaviorAnalysis?.summary?.byEventType || {};
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  detailContent.innerHTML = `
    <div class="event-count-grid">
      ${rows.length ? rows.map(([type, count]) => `
        <div><strong>${escapeHtml(formatEventType(type))}</strong><span>${count}</span></div>
      `).join("") : "<div><strong>이벤트 없음</strong><span>0</span></div>"}
    </div>
  `;
}

function renderMetricsTab() {
  const summary = lastBehaviorAnalysis?.summary;
  if (!summary) {
    detailContent.textContent = "분석 지표가 없습니다.";
    return;
  }

  detailContent.innerHTML = `
    <div class="metric-summary-grid">
      <div><span>방문한 화면 요소</span><strong>${summary.uniqueTargets}</strong></div>
      <div><span>가장 깊게 본 위치</span><strong>${summary.maxScrollTop}px</strong></div>
      <div><span>빠른 반복 클릭</span><strong>${summary.rapidClickBursts}</strong></div>
      <div><span>판단 근거</span><strong>${escapeHtml(summary.customerType.reasonCodes.map(formatReasonCode).join(", "))}</strong></div>
    </div>
  `;
}

function renderHeatmapTab() {
  const clicks = getClickEvents();
  const rankedTargets = getRankedClickTargets(clicks);

  detailContent.innerHTML = `
    <div class="heatmap-layout">
      <aside class="heatmap-rank">
        <h3>가장 많은 클릭순</h3>
        <p>${rankedTargets.length}개 요소</p>
        <ol>
          ${rankedTargets.length ? rankedTargets.slice(0, 8).map((item, index) => `
            <li>
              <b>${index + 1}</b>
              <div>
                <strong>${escapeHtml(item.target)}</strong>
                <span>${item.count} 클릭 (${item.percent}%)</span>
              </div>
            </li>
          `).join("") : "<li><div><strong>클릭 데이터 없음</strong><span>세션에 click 이벤트가 없습니다.</span></div></li>"}
        </ol>
      </aside>
      <section class="heatmap-replay-guide">
        <div class="heatmap-toolbar">
          <div class="heatmap-device-toggle">
            <span>PC</span><span>태블릿</span><span>모바일</span>
          </div>
          <div class="heatmap-mode-toggle">
            <span>클릭</span><span>스크롤</span><span>영역</span>
          </div>
        </div>
        <div class="heatmap-replay-note">
          <strong>Replay 화면 위에 클릭 히트맵을 함께 표시합니다.</strong>
          <p>아래 세션 리플레이 영역을 그대로 사용하므로, Play를 누르면 실제 재생 화면과 heat spot을 같은 좌표계에서 확인할 수 있습니다.</p>
        </div>
        <div class="heatmap-legend">
          <span>가장 인기 있는 항목</span>
          <b></b>
          <span>가장 인기 없는 항목</span>
        </div>
      </section>
    </div>
  `;
}

function getClickEvents() {
  return loadedPayload.events
    .filter((event) => event.type === "event" && event.data?.eventType === "click")
    .filter((event) => Number.isFinite(Number(event.data?.x)) && Number.isFinite(Number(event.data?.y)));
}

function getRankedClickTargets(clicks) {
  const counts = new Map();
  clicks.forEach((event) => {
    const target = event.data?.target || "unknown";
    counts.set(target, (counts.get(target) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([target, count]) => ({
      target,
      count,
      percent: clicks.length ? Math.round((count / clicks.length) * 1000) / 10 : 0
    }))
    .sort((a, b) => b.count - a.count);
}

function getHeatmapViewport(clicks) {
  const snapshot = loadedPayload?.events?.find((event) => event.type === "snapshot" && event.data?.viewport);
  if (snapshot) {
    return {
      width: Math.max(1, Number(snapshot.data.viewport.width) || 1440),
      height: Math.max(1, Number(snapshot.data.viewport.height) || 900)
    };
  }

  const first = clicks.find((event) => event.data?.viewportWidth && event.data?.viewportHeight);
  return {
    width: Math.max(1, Number(first?.data?.viewportWidth) || 1440),
    height: Math.max(1, Number(first?.data?.viewportHeight) || 900)
  };
}

function ensureHeatmapOverlay() {
  if (!replayer.canvasEl) {
    return null;
  }

  const existing = replayer.canvasEl.querySelector(".replay-heatmap-overlay");
  if (existing) {
    heatmapOverlay = existing;
    return heatmapOverlay;
  }

  heatmapOverlay = document.createElement("div");
  heatmapOverlay.className = "replay-heatmap-overlay";
  heatmapOverlay.hidden = true;
  replayer.canvasEl.appendChild(heatmapOverlay);
  return heatmapOverlay;
}

function hideHeatmapOverlay() {
  const overlay = ensureHeatmapOverlay();
  if (!overlay) {
    return;
  }

  overlay.hidden = true;
  overlay.innerHTML = "";
}

function syncHeatmapOverlay() {
  const overlay = ensureHeatmapOverlay();
  if (!overlay) {
    return;
  }

  if (currentDetailTab !== "heatmap" || !loadedPayload) {
    hideHeatmapOverlay();
    return;
  }

  const clicks = getClickEvents();
  const viewport = getHeatmapViewport(clicks);
  const transform = replayFrame.style.transform || "scale(1)";

  overlay.hidden = false;
  overlay.innerHTML = "";
  overlay.style.width = `${viewport.width}px`;
  overlay.style.height = `${viewport.height}px`;
  overlay.style.transformOrigin = "top left";
  overlay.style.transform = transform;

  if (!clicks.length) {
    const empty = document.createElement("div");
    empty.className = "replay-heatmap-empty";
    empty.textContent = "클릭 데이터 없음";
    overlay.appendChild(empty);
    return;
  }

  clicks.forEach((event, index) => {
    overlay.appendChild(createReplayHeatDot(event, index, viewport));
  });
}

function createReplayHeatDot(event, index, viewport) {
  const x = Math.max(0, Math.min(viewport.width, Number(event.data.x) || 0));
  const y = Math.max(0, Math.min(viewport.height, Number(event.data.y) || 0));
  const size = Math.max(34, 74 - index * 3);
  const dot = document.createElement("span");
  dot.className = "heat-dot replay-heat-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.innerHTML = `<i>${index + 1}</i>`;
  return dot;
}

function renderCustomerTypeDefinition(definition) {
  customerRanking.innerHTML = "";
  if (!definition) {
    const card = document.createElement("div");
    card.className = "customer-type-card";
    card.innerHTML = "<strong>-</strong><p>LLM 분석 후 이 영역에 고객 유형 정의가 표시됩니다.</p>";
    customerRanking.appendChild(card);
    return;
  }

  const traits = Array.isArray(definition.traits) ? definition.traits.filter(Boolean) : [];
  const card = document.createElement("div");
  card.className = "customer-type-card";
  card.innerHTML = `
    <strong>${escapeHtml(definition.name || "-")}</strong>
    <p>${escapeHtml(definition.description || "고객 유형 설명이 아직 없습니다.")}</p>
    ${traits.length ? `<span>${traits.map((item) => escapeHtml(item)).join(" · ")}</span>` : ""}
  `;
  customerRanking.appendChild(card);
}

function getSessionDisplayName(session) {
  const name = String(session?.sessionName || "").trim();
  if (name) {
    return name;
  }
  return `세션 ${shortSessionId(session?.id || "")}`;
}

function shortSessionId(sessionId) {
  const value = String(sessionId || "");
  if (!value) {
    return "-";
  }
  return value.length > 13 ? `${value.slice(0, 8)}...${value.slice(-4)}` : value;
}

function formatDuration(ms) {
  const num = Math.max(0, Number(ms) || 0);
  if (num < 1000) {
    return `${Math.round(num)}ms`;
  }
  if (num < 60000) {
    return `${(num / 1000).toFixed(1)}s`;
  }
  return `${Math.floor(num / 60000)}m ${Math.round((num % 60000) / 1000)}s`;
}

function formatSessionStatus(status) {
  const map = {
    recording: "기록 중",
    ended: "저장 완료",
    stopped: "중지됨"
  };
  return map[status] || status || "-";
}

function formatEventType(type) {
  const map = {
    snapshot: "초기 화면 저장",
    meta: "기록 상태 변경",
    click: "클릭",
    input: "입력",
    change: "입력 변경",
    submit: "제출",
    scroll: "스크롤",
    view_state: "화면 이동",
    navigation_intent: "페이지 이동 시도",
    dialog_open: "팝업 열림",
    dialog_close: "팝업 닫힘",
    mousemove: "마우스 이동",
    mutation_childList: "화면 요소 변경",
    mutation_attributes: "화면 속성 변경",
    mutation_characterData: "화면 문구 변경"
  };
  return map[type] || type || "-";
}

function formatReasonCode(code) {
  const map = {
    goal_intent_high: "실행 의지 높음",
    exploration_high: "탐색 활동 많음",
    friction_detected: "불편 신호 있음",
    bounce_risk_high: "이탈 가능성 높음",
    goal_completed: "완료 행동 있음",
    form_started_without_submit: "입력 후 미완료",
    transfer_flow: "이체 화면 이용",
    product_flow: "상품 화면 이용",
    exchange_flow: "환전 화면 이용",
    support_flow: "고객센터 이용",
    benefit_flow: "혜택/이벤트 이용",
    card_flow: "카드 화면 이용",
    asset_flow: "자산·소비 화면 이용",
    neutral_behavior: "특이 신호 적음"
  };
  return map[code] || code || "-";
}

function setStatus(message) {
  statusLine.textContent = message;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
