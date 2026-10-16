import {
  SessionRecorder,
  DEFAULT_BLOCK_SELECTORS,
  DEFAULT_MASK_TEXT_SELECTORS
} from "./recorder.js";
import { SessionReplayer } from "./replayer.js";
import { analyzeBehavior } from "./behavior-analyzer.js";

const DEFAULT_CONFIG = {
  privacy: {
    maskAllInputs: true,
    blockSelectors: [...DEFAULT_BLOCK_SELECTORS],
    maskTextSelectors: [...DEFAULT_MASK_TEXT_SELECTORS]
  },
  replay: {
    scriptMode: "off"
  },
  limits: {
    maxEvents: 20000,
    maxMutationHtmlBytes: 120000,
    mousemoveSampleMs: 20,
    scrollDebounceMs: 120,
    inputDebounceMs: 120
  }
};

let runtimeConfig = cloneConfig(DEFAULT_CONFIG);

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
const replayScriptToggleBtn = ensureReplayScriptToggleButton(replayControlsEl);
const replayFileNameLabel = ensureReplayFileNameLabel(replayFileInput);

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
  maskInputValue: runtimeConfig.privacy.maskAllInputs,
  blockSelectors: runtimeConfig.privacy.blockSelectors,
  maskTextSelectors: runtimeConfig.privacy.maskTextSelectors,
  mousemoveSampleMs: runtimeConfig.limits.mousemoveSampleMs,
  maxEvents: runtimeConfig.limits.maxEvents,
  maxMutationHtmlBytes: runtimeConfig.limits.maxMutationHtmlBytes,
  scrollDebounceMs: runtimeConfig.limits.scrollDebounceMs,
  inputDebounceMs: runtimeConfig.limits.inputDebounceMs,
  shouldIgnoreNode: isInternalNode
});

const replayer = new SessionReplayer({
  iframe: replayFrame,
  stageEl: replayFrame?.parentElement,
  applyMutationEvents: false,
  executePageScripts: runtimeConfig.replay.scriptMode === "on",
  onStatus: setReplayStatus
});

let lastPayload = null;
let loadedPayload = null;
let lastAnalysisPrompt = "";
let lastSummary = null;

window.SessionReplayApp = {
  version: "7.0.0-src",
  start: () => startBtn.click(),
  stop: () => stopBtn.click(),
  play: () => replayPlayBtn.click(),
  stopReplay: () => replayStopBtn.click(),
  configure,
  getConfig,
  getPayload: () => lastPayload,
  loadPayload,
  setReplayMutationMode: (enabled) => {
    const next = replayer.setApplyMutationEvents(Boolean(enabled));
    syncReplayMutationButton();
    setReplayStatus(`Replay mode updated (${getReplayModeText()}).`);
    return next;
  },
  setReplayScriptMode: (enabled) => {
    configure({ replay: { scriptMode: enabled ? "on" : "off" } });
    return replayer.executePageScripts;
  }
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

activateTab("settings");
applyConfigToRuntime();
resetAnalysis();
syncReplayMutationButton();
syncReplayScriptButton();
setReplayStatus(`Replay idle (${getReplayModeText()})`);
setStatus(`Idle. maskAllInputs=${runtimeConfig.privacy.maskAllInputs ? "ON" : "OFF"}`);

startBtn.addEventListener("click", () => {
  recorder.start();
  lastPayload = null;

  startBtn.disabled = true;
  stopBtn.disabled = false;
  downloadBtn.disabled = true;

  setStatus("Recording started.");
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
    setReplayStatus(`Replay load failed: ${error.message}`);
  }

  setStatus([
    "Recording stopped.",
    `eventCount=${lastPayload.eventCount}`,
    `droppedEventCount=${lastPayload.droppedEventCount || 0}`
  ].join("\n"));
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
    replayFileNameLabel.textContent = "Selected file: (none)";
    return;
  }

  replayFileNameLabel.textContent = `Selected file: ${file.name}`;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    loadPayload(payload);
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

if (replayScriptToggleBtn) {
  replayScriptToggleBtn.addEventListener("click", () => {
    const nextEnabled = runtimeConfig.replay.scriptMode !== "on";
    configure({ replay: { scriptMode: nextEnabled ? "on" : "off" } });

    setReplayStatus([
      `Replay mode updated (${getReplayModeText()}).`,
      nextEnabled ? "Warning: scripts ON can execute untrusted code inside replay iframe." : ""
    ].filter(Boolean).join(" "));
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

function configure(nextConfig = {}) {
  const normalized = normalizeConfig(nextConfig);
  runtimeConfig = mergeConfig(runtimeConfig, normalized);
  applyConfigToRuntime();
  return getConfig();
}

function getConfig() {
  return cloneConfig(runtimeConfig);
}

function applyConfigToRuntime() {
  recorder.applyConfig(runtimeConfig);
  replayer.applyConfig(runtimeConfig);
  syncReplayScriptButton();
}

function loadPayload(payload) {
  if (!payload || !Array.isArray(payload.events)) {
    throw new Error("invalid payload format");
  }

  loadedPayload = payload;
  resetAnalysis();
  replayer.load(payload);
  return loadedPayload;
}

function normalizeConfig(value = {}) {
  const privacy = value.privacy || {};
  const replay = value.replay || {};
  const limits = value.limits || {};

  return {
    privacy: {
      maskAllInputs: privacy.maskAllInputs === undefined ? undefined : privacy.maskAllInputs !== false,
      blockSelectors: toSelectorArrayOrUndefined(privacy.blockSelectors),
      maskTextSelectors: toSelectorArrayOrUndefined(privacy.maskTextSelectors)
    },
    replay: {
      scriptMode: replay.scriptMode === "on" || replay.scriptMode === "off"
        ? replay.scriptMode
        : (replay.scriptMode !== undefined ? (Boolean(replay.scriptMode) ? "on" : "off") : undefined)
    },
    limits: {
      maxEvents: toFiniteNumberOrUndefined(limits.maxEvents),
      maxMutationHtmlBytes: toFiniteNumberOrUndefined(limits.maxMutationHtmlBytes),
      mousemoveSampleMs: toFiniteNumberOrUndefined(limits.mousemoveSampleMs),
      scrollDebounceMs: toFiniteNumberOrUndefined(limits.scrollDebounceMs),
      inputDebounceMs: toFiniteNumberOrUndefined(limits.inputDebounceMs)
    }
  };
}

function mergeConfig(base, next) {
  const merged = cloneConfig(base);

  if (next.privacy.maskAllInputs !== undefined) {
    merged.privacy.maskAllInputs = next.privacy.maskAllInputs;
  }
  if (next.privacy.blockSelectors !== undefined) {
    merged.privacy.blockSelectors = next.privacy.blockSelectors;
  }
  if (next.privacy.maskTextSelectors !== undefined) {
    merged.privacy.maskTextSelectors = next.privacy.maskTextSelectors;
  }

  if (next.replay.scriptMode !== undefined) {
    merged.replay.scriptMode = next.replay.scriptMode;
  }

  if (next.limits.maxEvents !== undefined) {
    merged.limits.maxEvents = Math.max(1000, Math.floor(next.limits.maxEvents));
  }
  if (next.limits.maxMutationHtmlBytes !== undefined) {
    merged.limits.maxMutationHtmlBytes = Math.max(2000, Math.floor(next.limits.maxMutationHtmlBytes));
  }
  if (next.limits.mousemoveSampleMs !== undefined) {
    merged.limits.mousemoveSampleMs = Math.max(1, Math.floor(next.limits.mousemoveSampleMs));
  }
  if (next.limits.scrollDebounceMs !== undefined) {
    merged.limits.scrollDebounceMs = Math.max(0, Math.floor(next.limits.scrollDebounceMs));
  }
  if (next.limits.inputDebounceMs !== undefined) {
    merged.limits.inputDebounceMs = Math.max(0, Math.floor(next.limits.inputDebounceMs));
  }

  return merged;
}

function toSelectorArrayOrUndefined(value) {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim());
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return undefined;
}

function toFiniteNumberOrUndefined(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function cloneConfig(config) {
  return {
    privacy: {
      maskAllInputs: config.privacy.maskAllInputs,
      blockSelectors: [...config.privacy.blockSelectors],
      maskTextSelectors: [...config.privacy.maskTextSelectors]
    },
    replay: {
      scriptMode: config.replay.scriptMode
    },
    limits: {
      maxEvents: config.limits.maxEvents,
      maxMutationHtmlBytes: config.limits.maxMutationHtmlBytes,
      mousemoveSampleMs: config.limits.mousemoveSampleMs,
      scrollDebounceMs: config.limits.scrollDebounceMs,
      inputDebounceMs: config.limits.inputDebounceMs
    }
  };
}

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

function ensureReplayScriptToggleButton(container) {
  if (!container) {
    return null;
  }

  const existing = document.getElementById("replay-script-toggle-btn");
  if (existing) {
    return existing;
  }

  const btn = document.createElement("button");
  btn.id = "replay-script-toggle-btn";
  btn.type = "button";
  btn.className = "secondary";
  btn.textContent = "Scripts OFF";

  container.insertBefore(btn, replayPlayBtn);
  return btn;
}

function ensureReplayFileNameLabel(fileInput) {
  if (!fileInput || !fileInput.parentElement) {
    return { textContent: "" };
  }

  const existing = document.getElementById("replay-file-name");
  if (existing) {
    return existing;
  }

  const label = document.createElement("div");
  label.id = "replay-file-name";
  label.style.marginTop = "6px";
  label.style.fontSize = "0.82rem";
  label.style.color = "#64748b";
  label.textContent = "Selected file: (none)";

  fileInput.parentElement.appendChild(label);
  return label;
}

function syncReplayMutationButton() {
  if (!replayMutationToggleBtn) {
    return;
  }

  const enabled = Boolean(replayer.applyMutationEvents);
  replayMutationToggleBtn.textContent = enabled ? "Mutation ON" : "Mutation OFF";
}

function syncReplayScriptButton() {
  if (!replayScriptToggleBtn) {
    return;
  }

  replayScriptToggleBtn.textContent = runtimeConfig.replay.scriptMode === "on" ? "Scripts ON" : "Scripts OFF";
}

function getReplayModeText() {
  return `Mutation ${replayer.applyMutationEvents ? "ON" : "OFF"}, Scripts ${runtimeConfig.replay.scriptMode === "on" ? "ON" : "OFF"}`;
}
