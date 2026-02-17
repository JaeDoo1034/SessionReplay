import { SessionRecorder } from "./recorder.js";
import { SessionReplayer } from "./replayer.js";

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

const formEl = document.getElementById("sample-form");
const addItemBtn = document.getElementById("add-item-btn");
const itemList = document.getElementById("item-list");
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

const recorder = new SessionRecorder({
  maskInputValue: false,
  mousemoveSampleMs: 16
});

const replayer = new SessionReplayer({
  iframe: replayFrame,
  onStatus: setReplayStatus
});

let lastPayload = null;

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

activateTab("settings");

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

  startBtn.disabled = false;
  stopBtn.disabled = true;
  downloadBtn.disabled = false;

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
    replayer.load(payload);
    replayPlayBtn.disabled = false;
    replayStopBtn.disabled = false;
  } catch (error) {
    setReplayStatus(`파일 로드 실패: ${error.message}`);
  }
});

replayPlayBtn.addEventListener("click", () => {
  try {
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
