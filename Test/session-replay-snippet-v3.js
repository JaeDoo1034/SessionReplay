(() => {
  const PANEL_ID = "__sr_snippet_panel__";
  const REPLAY_MODAL_ID = "__sr_snippet_replay_modal__";
  const STYLE_ID = "__sr_snippet_style__";

  if (window.SessionReplaySnippet && typeof window.SessionReplaySnippet.destroy === "function") {
    window.SessionReplaySnippet.destroy();
  }

  let ui = null;
  let recorder = null;
  let replayer = null;

  let lastPayload = null;
  let loadedPayload = null;
  let lastAnalysisPrompt = "";
  let lastSummary = null;

  function bootstrap() {
    injectStyle();

    ui = createPanel();
    recorder = new SessionRecorder({
      maskInputValue: false,
      mousemoveSampleMs: 20,
      shouldIgnoreNode: isInternalNode
    });
    replayer = new SessionReplayer({
      modalId: REPLAY_MODAL_ID,
      shouldIgnoreNode: isInternalNode,
      onStatus: setReplayStatus
    });

    bindUI();

    window.SessionReplaySnippet = {
      version: "3.0.0-snippet",
      start,
      stop,
      getPayload: () => lastPayload,
      download,
      analyze,
      copyPrompt,
      analyzeWithServer,
      loadPayload,
      playReplay,
      setReplayMutationMode: (enabled) => replayer.setApplyMutationEvents(Boolean(enabled)),
      stopReplay: () => replayer.stop(),
      openReplay: () => replayer.open(),
      closeReplay: () => replayer.close(),
      destroy,
      help
    };

    setStatus("Snippet loaded. Start to record.");
    setAnalysisStatus("Behavior analysis idle");
    setReplayStatus("Replay idle (Mutation OFF)");

    console.log("[SessionReplaySnippet] Ready.");
    console.log("[SessionReplaySnippet] Use window.SessionReplaySnippet.help() for API usage.");
  }

  function bindUI() {
    ui.startBtn.addEventListener("click", start);
    ui.stopBtn.addEventListener("click", stop);
    ui.downloadBtn.addEventListener("click", download);
    ui.analyzeBtn.addEventListener("click", analyze);
    ui.copyPromptBtn.addEventListener("click", copyPrompt);
    ui.toggleMutationBtn.textContent = replayer.applyMutationEvents ? "Mutation ON" : "Mutation OFF";

    ui.openReplayBtn.addEventListener("click", () => {
      replayer.open();
    });

    ui.playReplayBtn.addEventListener("click", () => {
      playReplay(Number(ui.replaySpeed.value || 1));
    });

    ui.stopReplayBtn.addEventListener("click", () => {
      replayer.stop();
    });

    ui.toggleMutationBtn.addEventListener("click", () => {
      const enabled = replayer.setApplyMutationEvents(!replayer.applyMutationEvents);
      ui.toggleMutationBtn.textContent = enabled ? "Mutation ON" : "Mutation OFF";
      setReplayStatus(`Mutation apply is now ${enabled ? "ON" : "OFF"}.`);
    });

    ui.fileInput.addEventListener("change", async () => {
      const file = ui.fileInput.files && ui.fileInput.files[0];
      if (!file) {
        return;
      }

      try {
        const text = await file.text();
        const payload = JSON.parse(text);
        loadPayload(payload);
        setReplayStatus(`Loaded replay JSON: ${file.name}`);
      } catch (error) {
        setReplayStatus(`Load failed: ${error.message}`);
      }
    });

    ui.closeBtn.addEventListener("click", () => {
      destroy();
    });
  }

  function start() {
    recorder.start();
    lastPayload = null;
    ui.startBtn.disabled = true;
    ui.stopBtn.disabled = false;
    ui.downloadBtn.disabled = true;
    setStatus("Recording started.");
  }

  function stop() {
    recorder.stop();
    lastPayload = recorder.getPayload();
    loadedPayload = lastPayload;

    ui.startBtn.disabled = false;
    ui.stopBtn.disabled = true;
    ui.downloadBtn.disabled = false;

    setStatus(`Recording stopped. eventCount=${lastPayload.eventCount}`);
  }

  function download() {
    if (!lastPayload) {
      setStatus("No payload to download.");
      return;
    }

    const blob = new Blob([JSON.stringify(lastPayload, null, 2)], {
      type: "application/json"
    });
    const fileName = `session-recording-${timestampString(new Date())}.json`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);

    setStatus(`Downloaded: ${fileName}`);
  }

  function analyze() {
    const payload = loadedPayload || lastPayload;
    if (!payload) {
      setAnalysisStatus("No payload to analyze.");
      return null;
    }

    const result = analyzeBehavior(payload);
    lastSummary = result.summary;
    lastAnalysisPrompt = result.prompt;
    ui.copyPromptBtn.disabled = false;

    setAnalysisStatus([
      "Behavior Analysis",
      JSON.stringify(result.summary, null, 2),
      "",
      "Prompt preview",
      result.prompt.slice(0, 300) + (result.prompt.length > 300 ? "..." : "")
    ].join("\n"));

    return result;
  }

  async function copyPrompt() {
    if (!lastAnalysisPrompt) {
      setAnalysisStatus("Run analyze() first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(lastAnalysisPrompt);
      setAnalysisStatus("Prompt copied to clipboard.");
    } catch (error) {
      setAnalysisStatus(`Copy failed: ${error.message}`);
    }
  }

  async function analyzeWithServer(endpoint = "/api/llm-analyze") {
    const payload = loadedPayload || lastPayload;
    if (!payload) {
      throw new Error("No payload to analyze.");
    }

    if (!lastSummary || !lastAnalysisPrompt) {
      analyze();
    }

    setAnalysisStatus("Requesting LLM analysis...");

    const response = await fetch(endpoint, {
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
      throw new Error(json.error || "LLM analysis API failed");
    }

    setAnalysisStatus([
      "LLM Analysis",
      `Customer type summary (KR): ${json.customerSummaryKo || "(none)"}`,
      "",
      "Korean structured result",
      JSON.stringify(json.customerResultKo || {}, null, 2),
      "",
      "Previous chain result",
      JSON.stringify(json.result || {}, null, 2)
    ].join("\n"));

    return json;
  }

  function loadPayload(payload) {
    if (!payload || !Array.isArray(payload.events)) {
      throw new Error("Invalid payload format");
    }

    loadedPayload = payload;
    replayer.load(payload);
    return loadedPayload;
  }

  function playReplay(speed = 1) {
    const payload = loadedPayload || lastPayload;
    if (!payload) {
      throw new Error("No payload loaded");
    }

    if (!replayer.hasPayload()) {
      replayer.load(payload);
    }

    replayer.open();
    replayer.play({ speed });
  }

  function destroy() {
    recorder.stop();
    replayer.destroy();
    const panel = document.getElementById(PANEL_ID);
    if (panel) {
      panel.remove();
    }
    if (window.SessionReplaySnippet) {
      delete window.SessionReplaySnippet;
    }
  }

  function help() {
    return {
      start: "Start recording",
      stop: "Stop recording and store payload",
      getPayload: "Get last recorded payload object",
      download: "Download last payload as JSON",
      analyze: "Run local behavior analysis",
      copyPrompt: "Copy local LLM prompt to clipboard",
      analyzeWithServer: "POST summary/prompt to server endpoint and render customerResultKo (default /api/llm-analyze)",
      loadPayload: "Load payload object for replay",
      playReplay: "Open replay modal and play timeline",
      setReplayMutationMode: "Enable/disable mutation event application during replay",
      stopReplay: "Stop replay",
      openReplay: "Open replay modal",
      closeReplay: "Close replay modal",
      destroy: "Remove snippet UI and cleanup"
    };
  }

  function setStatus(message) {
    ui.status.textContent = String(message || "");
  }

  function setAnalysisStatus(message) {
    ui.analysis.textContent = String(message || "");
  }

  function setReplayStatus(message) {
    ui.replay.textContent = String(message || "");
  }

  function isInternalNode(node) {
    if (!node) {
      return false;
    }

    if (node instanceof Element) {
      return Boolean(node.closest(`#${PANEL_ID}, #${REPLAY_MODAL_ID}`));
    }

    if (node.parentElement) {
      return Boolean(node.parentElement.closest(`#${PANEL_ID}, #${REPLAY_MODAL_ID}`));
    }

    return false;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PANEL_ID} {
        position: fixed;
        right: 12px;
        bottom: 12px;
        width: 360px;
        max-height: 75vh;
        overflow: auto;
        z-index: 2147483647;
        background: #0b1220;
        color: #d6e2ff;
        border-radius: 12px;
        border: 1px solid #253249;
        box-shadow: 0 16px 30px rgba(0,0,0,0.35);
        font: 12px/1.35 -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
        padding: 10px;
      }
      #${PANEL_ID} h3 {
        margin: 0 0 8px;
        font-size: 13px;
      }
      #${PANEL_ID} .sr-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      #${PANEL_ID} button,
      #${PANEL_ID} select,
      #${PANEL_ID} input[type='file'] {
        font: inherit;
      }
      #${PANEL_ID} button {
        border: 0;
        border-radius: 8px;
        padding: 6px 8px;
        cursor: pointer;
        color: #fff;
        background: #0f766e;
      }
      #${PANEL_ID} button[disabled] {
        opacity: 0.45;
        cursor: not-allowed;
      }
      #${PANEL_ID} .danger { background: #be123c; }
      #${PANEL_ID} .secondary { background: #0ea5a4; }
      #${PANEL_ID} .ghost { background: #334155; }
      #${PANEL_ID} pre {
        margin: 0 0 8px;
        white-space: pre-wrap;
        word-break: break-word;
        background: #111a2e;
        border: 1px solid #2c3d58;
        border-radius: 8px;
        padding: 7px;
      }
      #${REPLAY_MODAL_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        background: rgba(2,6,23,0.78);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 14px;
      }
      #${REPLAY_MODAL_ID}.open { display: flex; }
      #${REPLAY_MODAL_ID} .sr-replay-card {
        width: min(1320px, 95vw);
        height: min(860px, 92vh);
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #cbd5e1;
        display: grid;
        grid-template-rows: auto 1fr;
      }
      #${REPLAY_MODAL_ID} .sr-replay-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 10px;
        background: #e2e8f0;
      }
      #${REPLAY_MODAL_ID} .sr-replay-stage {
        overflow: auto;
        background: #f8fafc;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      #${REPLAY_MODAL_ID} .sr-replay-canvas {
        position: relative;
        background: #fff;
        box-shadow: 0 0 0 1px #d1d5db;
        transform-origin: top left;
      }
      #${REPLAY_MODAL_ID} iframe {
        display: block;
        border: 0;
        background: white;
      }
    `;
    document.head.appendChild(style);
  }

  function createPanel() {
    const panel = document.createElement("div");
    panel.id = PANEL_ID;

    panel.innerHTML = `
      <h3>Session Replay Snippet</h3>
      <div class="sr-row">
        <button data-id="start">Start</button>
        <button data-id="stop" class="danger" disabled>Stop</button>
        <button data-id="download" class="secondary" disabled>Download</button>
      </div>
      <div class="sr-row">
        <button data-id="analyze">Analyze</button>
        <button data-id="copy-prompt" class="secondary" disabled>Copy Prompt</button>
      </div>
      <div class="sr-row">
        <input data-id="file" type="file" accept="application/json" />
      </div>
      <div class="sr-row">
        <select data-id="speed">
          <option value="0.5">0.5x</option>
          <option value="1" selected>1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
        </select>
        <button data-id="toggle-mutation" class="ghost">Mutation OFF</button>
        <button data-id="open-replay" class="ghost">Open Replay</button>
        <button data-id="play-replay" class="secondary">Play</button>
        <button data-id="stop-replay" class="danger">Stop</button>
      </div>
      <div class="sr-row">
        <button data-id="close" class="ghost">Close Snippet</button>
      </div>
      <pre data-id="status"></pre>
      <pre data-id="analysis"></pre>
      <pre data-id="replay"></pre>
    `;

    document.body.appendChild(panel);

    return {
      root: panel,
      startBtn: panel.querySelector("[data-id='start']"),
      stopBtn: panel.querySelector("[data-id='stop']"),
      downloadBtn: panel.querySelector("[data-id='download']"),
      analyzeBtn: panel.querySelector("[data-id='analyze']"),
      copyPromptBtn: panel.querySelector("[data-id='copy-prompt']"),
      fileInput: panel.querySelector("[data-id='file']"),
      replaySpeed: panel.querySelector("[data-id='speed']"),
      toggleMutationBtn: panel.querySelector("[data-id='toggle-mutation']"),
      openReplayBtn: panel.querySelector("[data-id='open-replay']"),
      playReplayBtn: panel.querySelector("[data-id='play-replay']"),
      stopReplayBtn: panel.querySelector("[data-id='stop-replay']"),
      closeBtn: panel.querySelector("[data-id='close']"),
      status: panel.querySelector("[data-id='status']"),
      analysis: panel.querySelector("[data-id='analysis']"),
      replay: panel.querySelector("[data-id='replay']")
    };
  }

  function timestampString(date) {
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

  class SessionRecorder {
    constructor(options = {}) {
      this.root = options.root || document;
      this.eventsToRecord = options.events || ["click", "mousemove", "input", "change", "submit", "scroll"];
      this.shouldMaskInputValue = options.maskInputValue || false;
      this.mousemoveSampleMs = options.mousemoveSampleMs || 20;
      this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);
      this.navigationEventsToRecord =
        options.navigationEvents || ["hashchange", "popstate", "beforeunload", "pagehide", "pageshow", "visibilitychange"];

      this.isRecording = false;
      this.startedAt = 0;
      this.events = [];
      this.sequence = 0;
      this.lastMousemoveAt = 0;
      this.mutationObserver = null;
      this.boundEventHandlers = [];
      this.boundNavigationHandlers = [];
      this.originalPushState = null;
      this.originalReplaceState = null;
      this.historyPatched = false;
    }

    start() {
      if (this.isRecording) {
        return;
      }

      this.isRecording = true;
      this.startedAt = performance.now();
      this.events = [];
      this.sequence = 0;
      this.lastMousemoveAt = 0;

      this.record("snapshot", {
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        html: getSnapshotHtmlForRecording()
      });

      this.attachMutationObserver();
      this.attachEventListeners();
      this.attachNavigationListeners();
      this.patchHistoryMethods();
    }

    stop() {
      if (!this.isRecording) {
        return;
      }

      this.detachMutationObserver();
      this.detachEventListeners();
      this.detachNavigationListeners();
      this.unpatchHistoryMethods();

      this.record("meta", {
        action: "recording_stopped"
      });

      this.isRecording = false;
    }

    getPayload() {
      return {
        version: 1,
        createdAt: new Date().toISOString(),
        page: {
          href: window.location.href,
          userAgent: navigator.userAgent
        },
        eventCount: this.events.length,
        events: this.events
      };
    }

    record(type, data) {
      if (!this.isRecording && type !== "meta") {
        return;
      }

      const now = performance.now();
      this.events.push({
        id: ++this.sequence,
        type,
        at: now,
        timeOffsetMs: Number((now - this.startedAt).toFixed(3)),
        data
      });
    }

    attachMutationObserver() {
      this.mutationObserver = new MutationObserver((mutationRecords) => {
        mutationRecords.forEach((mutation) => {
          if (this.shouldIgnoreNode(mutation.target)) {
            return;
          }

          if (mutation.type === "childList") {
            const added = Array.from(mutation.addedNodes || []);
            const removed = Array.from(mutation.removedNodes || []);
            const allInternal = [...added, ...removed].every((node) => this.shouldIgnoreNode(node));
            if (allInternal && this.shouldIgnoreNode(mutation.target)) {
              return;
            }
          }

          this.record("mutation", {
            mutationType: mutation.type,
            target: getNodePath(mutation.target),
            attributeName: mutation.attributeName,
            oldValue: mutation.oldValue,
            newValue: getMutationNewValue(mutation),
            targetInnerHTML: mutation.type === "childList" && mutation.target instanceof Element
              ? mutation.target.innerHTML
              : null,
            addedNodes: Array.from(mutation.addedNodes).map(serializeNode),
            removedNodes: Array.from(mutation.removedNodes).map(serializeNode)
          });
        });
      });

      this.mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true
      });
    }

    detachMutationObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    }

    attachEventListeners() {
      this.eventsToRecord.forEach((eventName) => {
        const handler = (event) => {
          if (this.shouldIgnoreNode(event.target)) {
            return;
          }

          const common = {
            eventType: event.type,
            target: getNodePath(event.target),
            currentTarget: getNodePath(event.currentTarget),
            isTrusted: event.isTrusted
          };

          if (eventName === "click") {
            const pointerMeta = getPointerMeta(event);
            this.record("event", {
              ...common,
              x: event.clientX,
              y: event.clientY,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
              ...pointerMeta,
              button: event.button
            });

            const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
            if (anchor && !this.shouldIgnoreNode(anchor)) {
              this.record("event", {
                eventType: "navigation_intent",
                target: getNodePath(anchor),
                href: anchor.href,
                pathname: anchor.pathname,
                hash: anchor.hash,
                targetBlank: anchor.target === "_blank",
                sameOrigin: anchor.origin === window.location.origin
              });
            }
            return;
          }

          if (eventName === "mousemove") {
            const now = performance.now();
            if (now - this.lastMousemoveAt < this.mousemoveSampleMs) {
              return;
            }

            this.lastMousemoveAt = now;
            const pointerMeta = getPointerMeta(event);
            this.record("event", {
              ...common,
              x: event.clientX,
              y: event.clientY,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
              ...pointerMeta
            });
            return;
          }

          if (eventName === "input" || eventName === "change") {
            this.record("event", {
              ...common,
              value: getInputValue(event.target, this.shouldMaskInputValue)
            });
            return;
          }

          if (eventName === "scroll") {
            const target = event.target === document ? document.scrollingElement : event.target;
            this.record("event", {
              ...common,
              scrollTop: target && "scrollTop" in target ? target.scrollTop : window.scrollY,
              scrollLeft: target && "scrollLeft" in target ? target.scrollLeft : window.scrollX
            });
            return;
          }

          if (eventName === "submit") {
            this.record("event", {
              ...common,
              prevented: event.defaultPrevented
            });
            return;
          }

          this.record("event", common);
        };

        const target = eventName === "scroll" ? document : this.root;
        target.addEventListener(eventName, handler, {
          capture: true,
          passive: eventName === "scroll" || eventName === "mousemove"
        });

        this.boundEventHandlers.push({ target, eventName, handler });
      });
    }

    detachEventListeners() {
      this.boundEventHandlers.forEach(({ target, eventName, handler }) => {
        target.removeEventListener(eventName, handler, true);
      });
      this.boundEventHandlers = [];
    }

    attachNavigationListeners() {
      this.navigationEventsToRecord.forEach((eventName) => {
        const target = eventName === "visibilitychange" ? document : window;
        const handler = (event) => {
          this.record("event", {
            eventType: eventName,
            href: window.location.href,
            pathname: window.location.pathname + window.location.search,
            hash: window.location.hash,
            visibilityState: document.visibilityState,
            persisted: typeof event.persisted === "boolean" ? event.persisted : undefined,
            state: eventName === "popstate" ? safeJson(event.state) : undefined
          });
        };

        target.addEventListener(eventName, handler, true);
        this.boundNavigationHandlers.push({ target, eventName, handler });
      });
    }

    detachNavigationListeners() {
      this.boundNavigationHandlers.forEach(({ target, eventName, handler }) => {
        target.removeEventListener(eventName, handler, true);
      });
      this.boundNavigationHandlers = [];
    }

    patchHistoryMethods() {
      if (this.historyPatched) {
        return;
      }

      this.originalPushState = window.history.pushState;
      this.originalReplaceState = window.history.replaceState;
      const recorder = this;

      window.history.pushState = function patchedPushState(state, title, url) {
        const result = recorder.originalPushState.apply(window.history, [state, title, url]);
        recorder.record("event", {
          eventType: "history_pushstate",
          href: window.location.href,
          targetUrl: resolveHistoryUrl(url),
          state: safeJson(state)
        });
        return result;
      };

      window.history.replaceState = function patchedReplaceState(state, title, url) {
        const result = recorder.originalReplaceState.apply(window.history, [state, title, url]);
        recorder.record("event", {
          eventType: "history_replacestate",
          href: window.location.href,
          targetUrl: resolveHistoryUrl(url),
          state: safeJson(state)
        });
        return result;
      };

      this.historyPatched = true;
    }

    unpatchHistoryMethods() {
      if (!this.historyPatched) {
        return;
      }

      if (this.originalPushState) {
        window.history.pushState = this.originalPushState;
      }
      if (this.originalReplaceState) {
        window.history.replaceState = this.originalReplaceState;
      }

      this.originalPushState = null;
      this.originalReplaceState = null;
      this.historyPatched = false;
    }
  }

  class SessionReplayer {
    constructor(options = {}) {
      this.modalId = options.modalId;
      this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);
      this.onStatus = options.onStatus || (() => {});
      this.applyMutationEvents = Boolean(options.applyMutationEvents);
      this.payload = null;
      this.isPlaying = false;
      this.timerId = null;
      this.currentIndex = 0;
      this.speed = 1;
      this.viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      this.modalEl = null;
      this.stageEl = null;
      this.canvasEl = null;
      this.iframe = null;
      this.handleWindowResize = () => this.updateViewportScale();
      this.mount();
    }

    mount() {
      const modal = document.createElement("div");
      modal.id = this.modalId;
      modal.innerHTML = `
        <div class="sr-replay-card">
          <div class="sr-replay-top">
            <strong>Replay Viewer</strong>
            <button data-id="close">Close</button>
          </div>
          <div class="sr-replay-stage">
            <div class="sr-replay-canvas">
              <iframe></iframe>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      this.modalEl = modal;
      this.stageEl = modal.querySelector(".sr-replay-stage");
      this.canvasEl = modal.querySelector(".sr-replay-canvas");
      this.iframe = modal.querySelector("iframe");

      const closeBtn = modal.querySelector("[data-id='close']");
      closeBtn.addEventListener("click", () => {
        this.close();
      });

      window.addEventListener("resize", this.handleWindowResize);
    }

    setApplyMutationEvents(enabled) {
      this.applyMutationEvents = Boolean(enabled);
      return this.applyMutationEvents;
    }

    hasPayload() {
      return Boolean(this.payload && Array.isArray(this.payload.events));
    }

    load(payload) {
      if (!payload || !Array.isArray(payload.events)) {
        throw new Error("invalid payload format");
      }
      this.payload = payload;
      this.currentIndex = 0;
      this.onStatus(`Replay loaded. events=${payload.events.length}`);
    }

    open() {
      if (this.modalEl) {
        this.modalEl.classList.add("open");
        this.updateViewportScale();
      }
    }

    close() {
      this.stop();
      if (this.modalEl) {
        this.modalEl.classList.remove("open");
      }
    }

    play(options = {}) {
      if (!this.payload) {
        throw new Error("payload is not loaded");
      }

      if (this.isPlaying) {
        return;
      }

      this.speed = Number(options.speed || 1);
      this.isPlaying = true;
      this.currentIndex = 0;

      const snapshot = this.payload.events.find((event) => event.type === "snapshot");
      if (!snapshot || !snapshot.data || !snapshot.data.html) {
        throw new Error("snapshot event is missing");
      }
      this.setViewport(snapshot.data && snapshot.data.viewport);

      const replayEvents = this.payload.events.filter((event) => {
        if (event.type === "event") {
          return true;
        }
        if (event.type === "mutation") {
          return this.applyMutationEvents;
        }
        return false;
      });
      if (!replayEvents.length) {
        this.onStatus("No replayable events found.");
        this.isPlaying = false;
        return;
      }

      this.renderSnapshot(snapshot.data.html, snapshot.data.url, () => {
        this.onStatus(`Replay started. speed=${this.speed}x`);
        this.runTimeline(replayEvents);
      });
    }

    stop() {
      this.isPlaying = false;
      this.currentIndex = 0;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.onStatus("Replay stopped.");
    }

    destroy() {
      this.stop();
      window.removeEventListener("resize", this.handleWindowResize);
      if (this.modalEl) {
        this.modalEl.remove();
        this.modalEl = null;
        this.stageEl = null;
        this.canvasEl = null;
        this.iframe = null;
      }
    }

    setViewport(viewport) {
      const width = Number(viewport && viewport.width);
      const height = Number(viewport && viewport.height);
      if (width > 0 && height > 0) {
        this.viewport = { width, height };
      }
      this.updateViewportScale();
    }

    updateViewportScale() {
      if (!this.stageEl || !this.canvasEl || !this.iframe) {
        return;
      }

      const viewportWidth = Math.max(1, Number(this.viewport && this.viewport.width) || 1);
      const viewportHeight = Math.max(1, Number(this.viewport && this.viewport.height) || 1);
      const stageWidth = this.stageEl.clientWidth || viewportWidth;
      const stageHeight = this.stageEl.clientHeight || viewportHeight;
      const scale = Math.min(stageWidth / viewportWidth, stageHeight / viewportHeight, 1);
      const scaledWidth = Math.max(1, Math.floor(viewportWidth * scale));
      const scaledHeight = Math.max(1, Math.floor(viewportHeight * scale));

      this.canvasEl.style.width = `${scaledWidth}px`;
      this.canvasEl.style.height = `${scaledHeight}px`;
      this.iframe.style.width = `${viewportWidth}px`;
      this.iframe.style.height = `${viewportHeight}px`;
      this.iframe.style.transformOrigin = "top left";
      this.iframe.style.transform = `scale(${scale})`;
    }

    runTimeline(events) {
      const step = () => {
        if (!this.isPlaying) {
          return;
        }

        if (this.currentIndex >= events.length) {
          this.isPlaying = false;
          this.timerId = null;
          this.onStatus("Replay completed.");
          return;
        }

        const current = events[this.currentIndex];
        this.applyEvent(current);

        const next = events[this.currentIndex + 1];
        this.currentIndex += 1;

        if (!next) {
          this.timerId = setTimeout(step, 0);
          return;
        }

        const gapMs = Math.max(0, next.timeOffsetMs - current.timeOffsetMs);
        const delay = Math.max(0, Math.floor(gapMs / this.speed));
        this.timerId = setTimeout(step, delay);
      };

      step();
    }

    renderSnapshot(rawHtml, baseUrl, onReady) {
      if (!this.iframe) {
        throw new Error("iframe is required");
      }

      const sanitized = sanitizeDocumentHtml(rawHtml, baseUrl || window.location.href);
      this.iframe.onload = () => {
        if (typeof onReady === "function") {
          onReady();
        }
        this.iframe.onload = null;
      };
      this.iframe.srcdoc = sanitized;
    }

    applyEvent(event) {
      const doc = this.iframe && this.iframe.contentDocument;
      if (!doc) {
        return;
      }

      if (event.type === "mutation") {
        if (!this.applyMutationEvents) {
          return;
        }
        applyMutation(doc, event.data);
        return;
      }

      if (event.type === "event") {
        applyInteractionEvent(doc, event.data);
      }
    }
  }

  function applyMutation(doc, data) {
    if (!data) {
      return;
    }

    const target = queryPath(doc, data.target);
    if (!target) {
      return;
    }

    if (data.mutationType === "childList") {
      if (typeof data.targetInnerHTML === "string") {
        target.innerHTML = sanitizeFragmentHtml(data.targetInnerHTML);
      }
      return;
    }

    if (data.mutationType === "attributes") {
      if (!data.attributeName) {
        return;
      }

      if (data.newValue === null || data.newValue === undefined) {
        target.removeAttribute(data.attributeName);
      } else {
        target.setAttribute(data.attributeName, data.newValue);
      }
      return;
    }

    if (data.mutationType === "characterData") {
      target.textContent = data.newValue || "";
    }
  }

  function applyInteractionEvent(doc, data) {
    if (!data || !data.eventType) {
      return;
    }

    if (data.eventType === "mousemove") {
      showMouseMovePath(doc, data);
      return;
    }

    const target = queryPath(doc, data.target);
    if (!target) {
      return;
    }

    if (data.eventType === "input" || data.eventType === "change") {
      if ("value" in target && data.value !== null && data.value !== undefined) {
        target.value = data.value;
      }
      return;
    }

    if (data.eventType === "scroll") {
      const top = Number(data.scrollTop || 0);
      const left = Number(data.scrollLeft || 0);

      if (target === doc.documentElement || target === doc.body) {
        doc.defaultView.scrollTo(left, top);
      } else if ("scrollTop" in target) {
        target.scrollTop = top;
        target.scrollLeft = left;
      }
      return;
    }

    if (data.eventType === "click") {
      showClickPoint(doc, data);
      markClicked(target);
    }
  }

  function markClicked(el) {
    el.style.outline = "2px solid #ef4444";
    setTimeout(() => {
      el.style.outline = "";
    }, 220);
  }

  function showClickPoint(doc, data) {
    if (!doc || typeof data.x !== "number" || typeof data.y !== "number") {
      return;
    }

    const mapped = mapPointerPosition(doc, data);
    if (!mapped) {
      return;
    }

    const layer = ensurePointerLayer(doc);
    const pointer = layer.querySelector("[data-role='pointer']");
    const ripple = doc.createElement("div");

    pointer.style.left = `${mapped.x}px`;
    pointer.style.top = `${mapped.y}px`;
    pointer.style.opacity = "1";

    ripple.style.position = "fixed";
    ripple.style.left = `${mapped.x}px`;
    ripple.style.top = `${mapped.y}px`;
    ripple.style.width = "12px";
    ripple.style.height = "12px";
    ripple.style.border = "2px solid rgba(239, 68, 68, 0.75)";
    ripple.style.borderRadius = "999px";
    ripple.style.transform = "translate(-50%, -50%) scale(1)";
    ripple.style.opacity = "0.9";
    ripple.style.transition = "transform 240ms ease, opacity 240ms ease";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "2147483647";

    layer.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "translate(-50%, -50%) scale(2.6)";
      ripple.style.opacity = "0";
    });
    setTimeout(() => ripple.remove(), 260);
  }

  function showMouseMovePath(doc, data) {
    if (!doc || typeof data.x !== "number" || typeof data.y !== "number") {
      return;
    }

    const mapped = mapPointerPosition(doc, data);
    if (!mapped) {
      return;
    }

    const layer = ensurePointerLayer(doc);
    const pointer = layer.querySelector("[data-role='pointer']");
    const x = mapped.x;
    const y = mapped.y;
    const prevX = Number(layer.dataset.lastX);
    const prevY = Number(layer.dataset.lastY);

    if (Number.isFinite(prevX) && Number.isFinite(prevY)) {
      const segment = doc.createElement("div");
      const dx = x - prevX;
      const dy = y - prevY;
      const length = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      segment.style.position = "fixed";
      segment.style.left = `${prevX}px`;
      segment.style.top = `${prevY}px`;
      segment.style.width = `${length}px`;
      segment.style.height = "2px";
      segment.style.transformOrigin = "0 0";
      segment.style.transform = `rotate(${angle}deg)`;
      segment.style.background = "rgba(239, 68, 68, 0.42)";
      segment.style.borderRadius = "999px";
      segment.style.pointerEvents = "none";
      segment.style.zIndex = "2147483646";
      segment.style.opacity = "1";
      segment.style.transition = "opacity 220ms linear";

      layer.appendChild(segment);
      requestAnimationFrame(() => {
        segment.style.opacity = "0";
      });
      setTimeout(() => segment.remove(), 240);
    }

    pointer.style.left = `${x}px`;
    pointer.style.top = `${y}px`;
    pointer.style.opacity = "1";

    layer.dataset.lastX = String(x);
    layer.dataset.lastY = String(y);
  }

  function mapPointerPosition(doc, data) {
    const replayWidth = doc.documentElement && doc.documentElement.clientWidth || doc.defaultView.innerWidth;
    const replayHeight = doc.documentElement && doc.documentElement.clientHeight || doc.defaultView.innerHeight;
    if (!replayWidth || !replayHeight) {
      return null;
    }

    const target = queryPath(doc, data.target);
    const hasTargetMeta =
      Number.isFinite(Number(data.targetOffsetX)) &&
      Number.isFinite(Number(data.targetOffsetY)) &&
      Number(data.targetWidth) > 0 &&
      Number(data.targetHeight) > 0;

    const recordedViewportWidth = Number(data.viewportWidth);
    const recordedViewportHeight = Number(data.viewportHeight);

    if (
      target instanceof Element &&
      hasTargetMeta &&
      shouldUseTargetRelativeMapping(target, data, recordedViewportWidth, recordedViewportHeight)
    ) {
      const rect = target.getBoundingClientRect();
      const xRatio = Number(data.targetOffsetX) / Number(data.targetWidth);
      const yRatio = Number(data.targetOffsetY) / Number(data.targetHeight);
      return {
        x: rect.left + rect.width * xRatio,
        y: rect.top + rect.height * yRatio
      };
    }

    const recordedWidth = Number(data.viewportWidth);
    const recordedHeight = Number(data.viewportHeight);
    if (!recordedWidth || !recordedHeight) {
      return { x: data.x, y: data.y };
    }

    return {
      x: (data.x / recordedWidth) * replayWidth,
      y: (data.y / recordedHeight) * replayHeight
    };
  }

  function shouldUseTargetRelativeMapping(target, data, viewportWidth, viewportHeight) {
    const tag = target.tagName && target.tagName.toLowerCase();
    if (tag === "html" || tag === "body") {
      return false;
    }

    if (!viewportWidth || !viewportHeight) {
      return true;
    }

    const targetWidth = Number(data.targetWidth);
    const targetHeight = Number(data.targetHeight);
    const nearFullWidth = targetWidth >= viewportWidth * 0.92;
    const nearFullHeight = targetHeight >= viewportHeight * 0.92;

    return !(nearFullWidth || nearFullHeight);
  }

  function ensurePointerLayer(doc) {
    let layer = doc.getElementById("__sr_pointer_layer__");
    if (layer) {
      return layer;
    }

    layer = doc.createElement("div");
    layer.id = "__sr_pointer_layer__";
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "2147483647";

    const pointer = doc.createElement("div");
    pointer.setAttribute("data-role", "pointer");
    pointer.style.position = "fixed";
    pointer.style.left = "0";
    pointer.style.top = "0";
    pointer.style.width = "10px";
    pointer.style.height = "10px";
    pointer.style.borderRadius = "999px";
    pointer.style.background = "#ef4444";
    pointer.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.18)";
    pointer.style.transform = "translate(-50%, -50%)";
    pointer.style.opacity = "0";
    pointer.style.transition = "opacity 120ms ease";

    layer.appendChild(pointer);
    doc.body.appendChild(layer);
    return layer;
  }

  function queryPath(doc, path) {
    if (!path || path === "document") {
      return doc.documentElement;
    }

    if (path === "non-element") {
      return null;
    }

    try {
      return doc.querySelector(path);
    } catch {
      return null;
    }
  }

  function sanitizeDocumentHtml(rawHtml, baseUrl) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(String(rawHtml || ""), "text/html");
    ensureBaseHref(parsed, baseUrl);
    sanitizeDomTree(parsed);
    return parsed.documentElement.outerHTML;
  }

  function sanitizeFragmentHtml(rawHtml) {
    const template = document.createElement("template");
    template.innerHTML = String(rawHtml || "");
    sanitizeDomTree(template.content);
    return template.innerHTML;
  }

  function sanitizeDomTree(root) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    root.querySelectorAll("[autofocus]").forEach((node) => node.removeAttribute("autofocus"));

    root.querySelectorAll(`#${PANEL_ID}, #${REPLAY_MODAL_ID}, #${STYLE_ID}`).forEach((node) => node.remove());
  }

  function ensureBaseHref(doc, baseUrl) {
    if (!doc || !doc.head || !baseUrl) {
      return;
    }

    let base = doc.querySelector("base");
    if (!base) {
      base = doc.createElement("base");
      doc.head.prepend(base);
    }
    base.setAttribute("href", String(baseUrl));
  }

  function getSnapshotHtmlForRecording() {
    const cloned = document.documentElement.cloneNode(true);
    if (!(cloned instanceof Element)) {
      return document.documentElement.outerHTML;
    }

    cloned.querySelectorAll(`#${PANEL_ID}, #${REPLAY_MODAL_ID}, #${STYLE_ID}`).forEach((node) => node.remove());
    return cloned.outerHTML;
  }

  function getMutationNewValue(mutation) {
    if (!mutation) {
      return null;
    }

    if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.attributeName) {
      return mutation.target.getAttribute(mutation.attributeName);
    }

    if (mutation.type === "characterData") {
      return mutation.target.textContent;
    }

    return null;
  }

  function serializeNode(node) {
    if (!node) {
      return null;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return {
        nodeType: "text",
        textContent: node.textContent
      };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      return {
        nodeType: "element",
        tagName: node.tagName,
        path: getNodePath(node),
        outerHTML: node.outerHTML
      };
    }

    return {
      nodeType: `other:${node.nodeType}`,
      value: String(node)
    };
  }

  function getNodePath(node) {
    if (!node || node === document || node === window) {
      return "document";
    }

    if (!(node instanceof Element)) {
      return "non-element";
    }

    if (node.id) {
      return `#${node.id}`;
    }

    const path = [];
    let current = node;

    while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
      const tag = current.tagName.toLowerCase();
      const parent = current.parentElement;
      if (!parent) {
        path.unshift(tag);
        break;
      }

      const sameTagSiblings = Array.from(parent.children).filter((child) => child.tagName === current.tagName);
      const index = sameTagSiblings.indexOf(current) + 1;
      path.unshift(`${tag}:nth-of-type(${index})`);
      current = parent;
    }

    return path.join(" > ");
  }

  function getInputValue(target, maskInputValue) {
    const isValid =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    if (!isValid) {
      return null;
    }

    if (maskInputValue && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return "*".repeat(String(target.value || "").length);
    }

    return target.value;
  }

  function getPointerMeta(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
      return null;
    }

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return null;
    }

    return {
      targetOffsetX: event.clientX - rect.left,
      targetOffsetY: event.clientY - rect.top,
      targetWidth: rect.width,
      targetHeight: rect.height
    };
  }

  function analyzeBehavior(payload) {
    const events = Array.isArray(payload && payload.events) ? payload.events : [];
    const interactionEvents = events.filter((event) => event.type === "event");
    const mutationEvents = events.filter((event) => event.type === "mutation");

    const byEventType = countBy(interactionEvents, (event) => event.data && event.data.eventType || "unknown");
    const durationMs = Math.max(0, ...events.map((event) => Number(event.timeOffsetMs) || 0));

    const clicks = interactionEvents.filter((event) => event.data && event.data.eventType === "click");
    const mouseMoves = interactionEvents.filter((event) => event.data && event.data.eventType === "mousemove");
    const inputs = interactionEvents.filter((event) => {
      const t = event.data && event.data.eventType;
      return t === "input" || t === "change";
    });
    const scrolls = interactionEvents.filter((event) => event.data && event.data.eventType === "scroll");
    const submits = interactionEvents.filter((event) => event.data && event.data.eventType === "submit");

    const maxScrollTop = maxOf(scrolls, (event) => Number(event.data && event.data.scrollTop) || 0);
    const uniqueTargets = new Set(
      interactionEvents
        .map((event) => event.data && event.data.target)
        .filter(Boolean)
    ).size;

    const inputTargets = countBy(inputs, (event) => event.data && event.data.target || "unknown");
    const topInputTargets = Object.entries(inputTargets)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([target, count]) => ({ target, count }));

    const totalMouseDistance = computeMouseDistance(mouseMoves);
    const rapidClickBursts = countRapidClickBursts(clicks, 1400, 3);

    const behaviorSignals = {
      shortBounce: durationMs < 12000 && interactionEvents.length < 8,
      heavyExploration: maxScrollTop > 500 && mouseMoves.length > 30,
      formIntent: inputs.length >= 4,
      completion: submits.length > 0,
      hesitation: inputs.length >= 8 && submits.length === 0,
      frustration: rapidClickBursts > 0
    };

    const labels = buildLabels(behaviorSignals);

    const summary = {
      totalEvents: events.length,
      interactionEvents: interactionEvents.length,
      mutationEvents: mutationEvents.length,
      durationMs,
      durationSec: round(durationMs / 1000),
      byEventType,
      uniqueTargets,
      maxScrollTop,
      totalMouseDistance: round(totalMouseDistance),
      rapidClickBursts,
      topInputTargets,
      submits: submits.length,
      labels,
      behaviorSignals
    };

    return {
      summary,
      prompt: buildLLMPrompt(summary)
    };
  }

  function buildLabels(signals) {
    const labels = [];

    if (signals.shortBounce) {
      labels.push("short_bounce");
    }
    if (signals.heavyExploration) {
      labels.push("exploration");
    }
    if (signals.formIntent && signals.completion) {
      labels.push("goal_completed");
    } else if (signals.formIntent && !signals.completion) {
      labels.push("goal_attempted_not_completed");
    }
    if (signals.hesitation) {
      labels.push("hesitation");
    }
    if (signals.frustration) {
      labels.push("frustration_signal");
    }

    if (!labels.length) {
      labels.push("neutral");
    }

    return labels;
  }

  function buildLLMPrompt(summary) {
    return [
      "You are a UX behavior analyst.",
      "Classify the user session into one primary behavior type and up to two secondary types.",
      "Then provide evidence-based reasoning and 3 actionable UX recommendations.",
      "Output JSON only.",
      "Schema:",
      '{"primary_type":"...","secondary_types":["..."],"confidence":0-1,"evidence":["..."],"recommendations":["..."]}',
      "Session summary:",
      JSON.stringify(summary, null, 2)
    ].join("\n");
  }

  function countBy(arr, selector) {
    const map = {};
    arr.forEach((item) => {
      const key = selector(item);
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }

  function maxOf(arr, selector) {
    let max = 0;
    arr.forEach((item) => {
      const value = selector(item);
      if (value > max) {
        max = value;
      }
    });
    return max;
  }

  function computeMouseDistance(mouseMoves) {
    if (mouseMoves.length < 2) {
      return 0;
    }

    let distance = 0;
    for (let i = 1; i < mouseMoves.length; i += 1) {
      const prev = mouseMoves[i - 1].data || {};
      const curr = mouseMoves[i].data || {};
      const dx = (Number(curr.x) || 0) - (Number(prev.x) || 0);
      const dy = (Number(curr.y) || 0) - (Number(prev.y) || 0);
      distance += Math.hypot(dx, dy);
    }

    return distance;
  }

  function countRapidClickBursts(clicks, windowMs, threshold) {
    if (clicks.length < threshold) {
      return 0;
    }

    let bursts = 0;
    let left = 0;

    for (let right = 0; right < clicks.length; right += 1) {
      const rightTs = Number(clicks[right].timeOffsetMs) || 0;
      while (left < right && rightTs - (Number(clicks[left].timeOffsetMs) || 0) > windowMs) {
        left += 1;
      }

      const count = right - left + 1;
      if (count >= threshold) {
        bursts += 1;
        left = right;
      }
    }

    return bursts;
  }

  function round(value) {
    return Number(Number(value).toFixed(2));
  }

  function resolveHistoryUrl(url) {
    if (url === null || url === undefined || url === "") {
      return window.location.href;
    }

    try {
      return new URL(String(url), window.location.href).href;
    } catch {
      return String(url);
    }
  }

  function safeJson(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      return null;
    }
  }

  bootstrap();
})();
