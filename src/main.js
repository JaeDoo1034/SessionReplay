import { SessionRecorder } from "./recorder.js";
import { SessionReplayer } from "./replayer.js";
import { analyzeBehavior } from "./behavior-analyzer.js";

const statusEl = document.getElementById("status");
const replayStatusEl = document.getElementById("replay-status");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const downloadBtn = document.getElementById("download-btn");

const replayFileInput = document.getElementById("replay-file");
const replayPlayBtn = document.getElementById("replay-play-btn");
const replayStopBtn = document.getElementById("replay-stop-btn");
const replaySpeedSelect = document.getElementById("replay-speed");
const replayFrame = document.getElementById("replay-frame");
const replayControlsEl = replayPlayBtn?.closest(".controls") || null;
const replayMutationToggleBtn = ensureReplayMutationToggleButton(replayControlsEl);

const analyzeBtn = document.getElementById("analyze-btn");
const llmAnalyzeBtn = document.getElementById("llm-analyze-btn");
const copyPromptBtn = document.getElementById("copy-prompt-btn");
const analysisStatusEl = document.getElementById("analysis-status");
const llmAnalysisStatusEl = document.getElementById("llm-analysis-status");

const formEl = document.getElementById("sample-form");
const addItemBtn = document.getElementById("add-item-btn");
const itemList = document.getElementById("item-list");
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

const recorder = new SessionRecorder({
  maskInputValue: false,
  mousemoveSampleMs: 20,
  shouldIgnoreNode: isInternalNode
});

const replayer = new SessionReplayer({
  iframe: replayFrame,
  stageEl: replayFrame?.parentElement,
  applyMutationEvents: false,
  onStatus: setReplayStatus
});

let lastPayload = null;
let loadedPayload = null;
let lastAnalysisPrompt = "";
let lastSummary = null;

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

activateTab("settings");
syncReplayMutationButton();
setReplayStatus("Replay idle (Mutation OFF)");

startBtn.addEventListener("click", () => {
  recorder.start();
  lastPayload = null;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  downloadBtn.disabled = true;

  setStatus("Recording started. 상호작용 후 Stop 버튼을 누르세요.");
});

stopBtn.addEventListener("click", () => {
  recorder.stop();
  lastPayload = recorder.getPayload();
  loadedPayload = lastPayload;
  resetAnalysis();

  startBtn.disabled = false;
  stopBtn.disabled = true;
  downloadBtn.disabled = false;

  try {
    replayer.load(lastPayload);
    replayPlayBtn.disabled = false;
    replayStopBtn.disabled = false;
  } catch (error) {
    setReplayStatus(`replay load 실패: ${error.message}`);
  }

  setStatus(
    [
      "Recording stopped.",
      `eventCount=${lastPayload.eventCount}`,
      "Download JSON으로 결과를 확인하세요."
    ].join("\n")
  );
});

downloadBtn.addEventListener("click", () => {
  if (!lastPayload) {
    setStatus("다운로드할 데이터가 없습니다.");
    return;
  }

  const blob = new Blob([JSON.stringify(lastPayload, null, 2)], {
    type: "application/json"
  });

  const now = new Date();
  const fileName = `session-recording-${formatDate(now)}.json`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);

  setStatus(`JSON downloaded: ${fileName}`);
});

replayFileInput.addEventListener("change", async () => {
  const file = replayFileInput.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    loadedPayload = payload;
    resetAnalysis();
    replayer.load(payload);
    replayPlayBtn.disabled = false;
    replayStopBtn.disabled = false;
  } catch (error) {
    setReplayStatus(`파일 로드 실패: ${error.message}`);
  }
});

replayPlayBtn.addEventListener("click", () => {
  const payload = loadedPayload || lastPayload;
  if (!payload) {
    setReplayStatus("재생할 payload가 없습니다. 녹화 후 Stop 하거나 JSON 파일을 로드하세요.");
    return;
  }

  try {
    replayer.load(payload);
    replayer.play({
      speed: Number(replaySpeedSelect.value || 1)
    });
  } catch (error) {
    setReplayStatus(`재생 실패: ${error.message}`);
  }
});

replayStopBtn.addEventListener("click", () => {
  replayer.stop();
});

if (replayMutationToggleBtn) {
  replayMutationToggleBtn.addEventListener("click", () => {
    const enabled = replayer.setApplyMutationEvents(!replayer.applyMutationEvents);
    syncReplayMutationButton();
    setReplayStatus(`Mutation apply is now ${enabled ? "ON" : "OFF"}.`);
  });
}

analyzeBtn.addEventListener("click", () => {
  if (!loadedPayload) {
    setAnalysisStatus("분석할 payload가 없습니다. 녹화 후 Stop 하거나 Replay JSON을 먼저 로드하세요.");
    return;
  }

  try {
    const result = analyzeBehavior(loadedPayload);
    lastAnalysisPrompt = result.prompt;
    lastSummary = result.summary;
    copyPromptBtn.disabled = false;
    setAnalysisStatus(
      [
        "Behavior Analysis Result",
        JSON.stringify(result.summary, null, 2),
        "",
        "LLM Prompt Preview (first 400 chars)",
        result.prompt.slice(0, 400) + (result.prompt.length > 400 ? "..." : "")
      ].join("\n")
    );
  } catch (error) {
    setAnalysisStatus(`분석 실패: ${error.message}`);
  }
});

llmAnalyzeBtn.addEventListener("click", async () => {
  if (!loadedPayload) {
    setLLMAnalysisStatus("분석할 payload가 없습니다. 녹화 후 Stop 하거나 Replay JSON을 먼저 로드하세요.");
    return;
  }

  try {
    if (!lastSummary || !lastAnalysisPrompt) {
      const local = analyzeBehavior(loadedPayload);
      lastSummary = local.summary;
      lastAnalysisPrompt = local.prompt;
      copyPromptBtn.disabled = false;
    }

    setLLMAnalysisStatus("LLM 분석 요청 중...");

    const response = await fetch("/api/llm-analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary: lastSummary,
        prompt: lastAnalysisPrompt
      })
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "LLM 분석 API 호출 실패");
    }

    setLLMAnalysisStatus(
      [
        "LLM Analysis Result",
        `고객 유형 요약(KR): ${json.customerSummaryKo || "요약 없음"}`,
        "",
        "Korean Structured Result",
        JSON.stringify(json.customerResultKo || {}, null, 2),
        "",
        "Previous Chain Result",
        JSON.stringify(json.result || {}, null, 2),
        "",
        "Raw Model Output",
        json.raw
      ].join("\n")
    );
  } catch (error) {
    setLLMAnalysisStatus(`LLM 분석 실패: ${error.message}`);
  }
});

copyPromptBtn.addEventListener("click", async () => {
  if (!lastAnalysisPrompt) {
    setAnalysisStatus("복사할 프롬프트가 없습니다. 먼저 Analyze Behavior를 실행하세요.");
    return;
  }

  try {
    await navigator.clipboard.writeText(lastAnalysisPrompt);
    setAnalysisStatus("LLM 프롬프트를 클립보드에 복사했습니다.");
  } catch (error) {
    setAnalysisStatus(`클립보드 복사 실패: ${error.message}`);
  }
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  setStatus("폼 submit 이벤트가 발생했습니다.");
});

addItemBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `appended at ${new Date().toLocaleTimeString()}`;
  itemList.appendChild(li);
});

function setStatus(message) {
  statusEl.textContent = message;
}

function setReplayStatus(message) {
  replayStatusEl.textContent = message;
}

function setAnalysisStatus(message) {
  analysisStatusEl.textContent = message;
}

function setLLMAnalysisStatus(message) {
  llmAnalysisStatusEl.textContent = message;
}

function formatDate(date) {
  const p = (n) => String(n).padStart(2, "0");
  return [
    date.getFullYear(),
    p(date.getMonth() + 1),
    p(date.getDate()),
    "-",
    p(date.getHours()),
    p(date.getMinutes()),
    p(date.getSeconds())
  ].join("");
}

function activateTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  tabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tabName;
  });
}

function resetAnalysis() {
  lastAnalysisPrompt = "";
  lastSummary = null;
  copyPromptBtn.disabled = true;
  setAnalysisStatus("Behavior analysis idle");
  setLLMAnalysisStatus("LLM analysis idle");
}

function isInternalNode(node) {
  if (!node) {
    return false;
  }

  const el = node instanceof Element ? node : node.parentElement;
  if (!el) {
    return false;
  }

  return Boolean(el.closest("#panel-demo"));
}

function ensureReplayMutationToggleButton(container) {
  if (!container) {
    return null;
  }

  const existing = document.getElementById("replay-mutation-toggle-btn");
  if (existing) {
    return existing;
  }

  const btn = document.createElement("button");
  btn.id = "replay-mutation-toggle-btn";
  btn.type = "button";
  btn.className = "secondary";
  btn.textContent = "Mutation OFF";

  container.insertBefore(btn, replayPlayBtn);
  return btn;
}

function syncReplayMutationButton() {
  if (!replayMutationToggleBtn) {
    return;
  }

  const enabled = Boolean(replayer.applyMutationEvents);
  replayMutationToggleBtn.textContent = enabled ? "Mutation ON" : "Mutation OFF";
}
