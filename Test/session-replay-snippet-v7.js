(() => {
  const PANEL_ID = "__sr_snippet_panel__";
  const REPLAY_MODAL_ID = "__sr_snippet_replay_modal__";
  const STYLE_ID = "__sr_snippet_style__";
  const DEFAULT_BLOCK_SELECTORS = [
    ".rr-block",
    ".rr-mask",
    ".clarity-mask",
    "[data-clarity-mask='true']",
    "[data-rr-block='true']",
    "[data-sr-block='true']",
    "[data-private='true']",
    "[data-sensitive='true']"
  ];
  const DEFAULT_MASK_TEXT_SELECTORS = [
    ".rr-mask",
    ".clarity-mask",
    "[data-rr-mask='true']",
    "[data-clarity-mask='true']",
    "[data-sr-mask='true']"
  ];
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
  let runtimeConfig = cloneConfig(DEFAULT_CONFIG);

  function bootstrap() {
    injectStyle();

    ui = createPanel();
    recorder = new SessionRecorder({
      maskInputValue: runtimeConfig.privacy.maskAllInputs,
      maskTextSelectors: runtimeConfig.privacy.maskTextSelectors,
      mousemoveSampleMs: runtimeConfig.limits.mousemoveSampleMs,
      maxEvents: runtimeConfig.limits.maxEvents,
      maxMutationHtmlBytes: runtimeConfig.limits.maxMutationHtmlBytes,
      scrollDebounceMs: runtimeConfig.limits.scrollDebounceMs,
      inputDebounceMs: runtimeConfig.limits.inputDebounceMs,
      shouldIgnoreNode: shouldIgnoreNodeForRecording
    });
    replayer = new SessionReplayer({
      modalId: REPLAY_MODAL_ID,
      shouldIgnoreNode: isInternalNode,
      onStatus: setReplayStatus,
      executePageScripts: runtimeConfig.replay.scriptMode === "on"
    });

    bindUI();

    window.SessionReplaySnippet = {
      version: "7.0.0-snippet",
      start,
      stop,
      getPayload: () => lastPayload,
      download,
      analyze,
      copyPrompt,
      analyzeWithServer,
      loadPayload,
      playReplay,
      configure,
      getConfig,
      setReplayMutationMode: (enabled) => replayer.setApplyMutationEvents(Boolean(enabled)),
      setReplayScriptMode: (enabled) => {
        const mode = enabled ? "on" : "off";
        configure({ replay: { scriptMode: mode } });
        return replayer.executePageScripts;
      },
      stopReplay: () => replayer.stop(),
      openReplay: () => replayer.open(),
      closeReplay: () => replayer.close(),
      destroy,
      help
    };

    applyConfigToUI();
    setStatus(`Snippet loaded. Start to record. maskAllInputs=${runtimeConfig.privacy.maskAllInputs ? "ON" : "OFF"}`);
    setAnalysisStatus("Behavior analysis idle");
    setReplayStatus(`Replay idle (${getReplayModeText()})`);

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
    ui.toggleScriptBtn.textContent = replayer.executePageScripts ? "Scripts ON" : "Scripts OFF";

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
      setReplayStatus(`Replay mode updated (${getReplayModeText()}).`);
    });

    ui.toggleScriptBtn.addEventListener("click", () => {
      const nextEnabled = !replayer.executePageScripts;
      configure({ replay: { scriptMode: nextEnabled ? "on" : "off" } });
      setReplayStatus([
        `Replay mode updated (${getReplayModeText()}).`,
        nextEnabled ? "Warning: scripts ON can execute untrusted code inside replay iframe." : ""
      ].filter(Boolean).join(" "));
    });

    ui.fileInput.addEventListener("change", async () => {
      const file = ui.fileInput.files && ui.fileInput.files[0];
      if (!file) {
        ui.fileNameLabel.textContent = "Selected file: (none)";
        return;
      }

      ui.fileNameLabel.textContent = `Selected file: ${file.name}`;

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
      configure: "Update runtime config: privacy/replay/limits",
      getConfig: "Get current runtime config",
      setReplayMutationMode: "Enable/disable mutation event application during replay",
      setReplayScriptMode: "Enable/disable script execution in replay iframe",
      stopReplay: "Stop replay",
      openReplay: "Open replay modal",
      closeReplay: "Close replay modal",
      destroy: "Remove snippet UI and cleanup"
    };
  }

  function configure(nextConfig = {}) {
    runtimeConfig = mergeConfig(runtimeConfig, sanitizeConfigInput(nextConfig));
    if (recorder && typeof recorder.applyConfig === "function") {
      recorder.applyConfig(runtimeConfig);
    }
    if (replayer && typeof replayer.applyConfig === "function") {
      replayer.applyConfig(runtimeConfig);
    }
    applyConfigToUI();
    return getConfig();
  }

  function getConfig() {
    return cloneConfig(runtimeConfig);
  }

  function applyConfigToUI() {
    if (!ui || !replayer) {
      return;
    }
    if (ui.toggleScriptBtn) {
      ui.toggleScriptBtn.textContent = replayer.executePageScripts ? "Scripts ON" : "Scripts OFF";
    }
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

  function shouldIgnoreNodeForRecording(node) {
    if (isInternalNode(node)) {
      return true;
    }
    return isBlockedNode(node, runtimeConfig.privacy.blockSelectors);
  }

  function getReplayModeText() {
    return `Mutation ${replayer && replayer.applyMutationEvents ? "ON" : "OFF"}, Scripts ${replayer && replayer.executePageScripts ? "ON" : "OFF"}`;
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
      #${PANEL_ID} .sr-file-name {
        margin: -4px 0 6px;
        color: #93c5fd;
        font-size: 11px;
        line-height: 1.3;
      }
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
      <div data-id="file-name" class="sr-file-name">Selected file: (none)</div>
      <div class="sr-row">
        <select data-id="speed">
          <option value="0.5">0.5x</option>
          <option value="1" selected>1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
        </select>
        <button data-id="toggle-mutation" class="ghost">Mutation OFF</button>
        <button data-id="toggle-script" class="ghost">Scripts OFF</button>
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
      fileNameLabel: panel.querySelector("[data-id='file-name']"),
      replaySpeed: panel.querySelector("[data-id='speed']"),
      toggleMutationBtn: panel.querySelector("[data-id='toggle-mutation']"),
      toggleScriptBtn: panel.querySelector("[data-id='toggle-script']"),
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
      this.shouldMaskInputValue = options.maskInputValue !== false;
      this.mousemoveSampleMs = Number(options.mousemoveSampleMs) || 20;
      this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);
      this.navigationEventsToRecord =
        options.navigationEvents || ["hashchange", "popstate", "beforeunload", "pagehide", "pageshow", "visibilitychange"];
      this.maxEvents = Math.max(1000, Number(options.maxEvents) || 20000);
      this.maxMutationHtmlBytes = Math.max(2000, Number(options.maxMutationHtmlBytes) || 120000);
      this.scrollDebounceMs = Math.max(0, Number(options.scrollDebounceMs) || 120);
      this.inputDebounceMs = Math.max(0, Number(options.inputDebounceMs) || 120);
      this.maskTextSelectors = Array.isArray(options.maskTextSelectors) ? options.maskTextSelectors : [];

      this.isRecording = false;
      this.startedAt = 0;
      this.events = [];
      this.sequence = 0;
      this.lastMousemoveAt = 0;
      this.lastByEventType = {
        input: 0,
        change: 0,
        scroll: 0
      };
      this.currentIntentSeq = 0;
      this.droppedEventCount = 0;
      this.redactionStats = {
        maskedInputEvents: 0,
        maskedMutationValues: 0,
        redactedSerializedNodes: 0,
        blockedNodeEvents: 0,
        blockedMutations: 0,
        truncatedMutationHtml: 0
      };
      this.mutationObserver = null;
      this.boundEventHandlers = [];
      this.boundNavigationHandlers = [];
      this.originalPushState = null;
      this.originalReplaceState = null;
      this.historyPatched = false;
    }

    applyConfig(config) {
      const safe = config || {};
      const privacy = safe.privacy || {};
      const limits = safe.limits || {};
      this.shouldMaskInputValue = privacy.maskAllInputs !== false;
      this.maskTextSelectors = Array.isArray(privacy.maskTextSelectors) ? privacy.maskTextSelectors : [];
      this.maxEvents = Math.max(1000, Number(limits.maxEvents) || this.maxEvents);
      this.maxMutationHtmlBytes = Math.max(2000, Number(limits.maxMutationHtmlBytes) || this.maxMutationHtmlBytes);
      this.mousemoveSampleMs = Math.max(1, Number(limits.mousemoveSampleMs) || this.mousemoveSampleMs);
      this.scrollDebounceMs = Math.max(0, Number(limits.scrollDebounceMs) || this.scrollDebounceMs);
      this.inputDebounceMs = Math.max(0, Number(limits.inputDebounceMs) || this.inputDebounceMs);
      return {
        maskAllInputs: this.shouldMaskInputValue,
        maxEvents: this.maxEvents,
        maxMutationHtmlBytes: this.maxMutationHtmlBytes
      };
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
      this.lastByEventType = { input: 0, change: 0, scroll: 0 };
      this.currentIntentSeq = 0;
      this.droppedEventCount = 0;
      this.redactionStats = {
        maskedInputEvents: 0,
        maskedMutationValues: 0,
        redactedSerializedNodes: 0,
        blockedNodeEvents: 0,
        blockedMutations: 0,
        truncatedMutationHtml: 0
      };

      this.record("snapshot", {
        reason: "initial",
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        iframeSummary: getIframeSummary(this.shouldIgnoreNode),
        html: getSnapshotHtmlForRecording({
          maskAllInputs: this.shouldMaskInputValue,
          maskTextSelectors: this.maskTextSelectors,
          blockSelectors: runtimeConfig.privacy.blockSelectors
        })
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
        action: "recording_stopped",
        droppedEventCount: this.droppedEventCount,
        redactionStats: { ...this.redactionStats }
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
        recordingConfig: {
          privacy: {
            maskAllInputs: this.shouldMaskInputValue,
            blockSelectors: [...runtimeConfig.privacy.blockSelectors],
            maskTextSelectors: [...this.maskTextSelectors]
          },
          replay: {
            scriptMode: runtimeConfig.replay.scriptMode
          },
          limits: {
            maxEvents: this.maxEvents,
            maxMutationHtmlBytes: this.maxMutationHtmlBytes,
            mousemoveSampleMs: this.mousemoveSampleMs,
            scrollDebounceMs: this.scrollDebounceMs,
            inputDebounceMs: this.inputDebounceMs
          }
        },
        droppedEventCount: this.droppedEventCount,
        redactionStats: { ...this.redactionStats },
        eventCount: this.events.length,
        events: this.events
      };
    }

    record(type, data) {
      if (!this.isRecording && type !== "meta") {
        return;
      }

      if (type !== "meta" && this.events.length >= this.maxEvents) {
        this.droppedEventCount += 1;
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
            this.redactionStats.blockedMutations += 1;
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

          const oldValue = getMutationOldValue(mutation, {
            maskAllInputs: this.shouldMaskInputValue,
            maskTextSelectors: this.maskTextSelectors,
            blockSelectors: runtimeConfig.privacy.blockSelectors
          });
          const newValue = getMutationNewValue(mutation, {
            maskAllInputs: this.shouldMaskInputValue,
            maskTextSelectors: this.maskTextSelectors,
            blockSelectors: runtimeConfig.privacy.blockSelectors
          });
          if (oldValue === "[redacted]" || newValue === "[redacted]") {
            this.redactionStats.maskedMutationValues += 1;
          }

          this.record("mutation", {
            eventType: `mutation_${mutation.type}`,
            mutationType: mutation.type,
            intentSeq: this.currentIntentSeq,
            target: getNodePath(mutation.target),
            attributeName: mutation.attributeName,
            oldValue,
            newValue,
            targetInnerHTML: this.getSafeMutationInnerHTML(mutation),
            addedNodes: Array.from(mutation.addedNodes).map((node) => serializeNodeWithPolicy(node, {
              maskAllInputs: this.shouldMaskInputValue,
              maskTextSelectors: this.maskTextSelectors,
              blockSelectors: runtimeConfig.privacy.blockSelectors
            }, this.redactionStats)),
            removedNodes: Array.from(mutation.removedNodes).map((node) => serializeNodeWithPolicy(node, {
              maskAllInputs: this.shouldMaskInputValue,
              maskTextSelectors: this.maskTextSelectors,
              blockSelectors: runtimeConfig.privacy.blockSelectors
            }, this.redactionStats))
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
            this.redactionStats.blockedNodeEvents += 1;
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
            this.recordIntentMarker("click", event.target);

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
            if (this.shouldDebounce(eventName, this.inputDebounceMs)) {
              return;
            }
            const masked = getInputValue(event.target, this.shouldMaskInputValue);
            if (masked !== null && masked !== getInputValue(event.target, false)) {
              this.redactionStats.maskedInputEvents += 1;
            }
            this.record("event", {
              ...common,
              value: masked
            });
            this.recordIntentMarker(eventName, event.target);
            return;
          }

          if (eventName === "scroll") {
            if (this.shouldDebounce("scroll", this.scrollDebounceMs)) {
              return;
            }
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
            this.recordIntentMarker("submit", event.target);
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

    shouldDebounce(eventName, debounceMs) {
      if (!debounceMs) {
        return false;
      }
      const now = performance.now();
      const last = Number(this.lastByEventType[eventName] || 0);
      if (now - last < debounceMs) {
        return true;
      }
      this.lastByEventType[eventName] = now;
      return false;
    }

    recordIntentMarker(intentType, target) {
      this.currentIntentSeq += 1;
      this.record("event", {
        eventType: "intent_marker",
        intentType,
        intentSeq: this.currentIntentSeq,
        target: getNodePath(target)
      });
    }

    getSafeMutationInnerHTML(mutation) {
      const hasInnerHtml = mutation && mutation.type === "childList" && mutation.target instanceof Element;
      if (!hasInnerHtml) {
        return null;
      }

      const html = String(mutation.target.innerHTML || "");
      if (html.length > this.maxMutationHtmlBytes) {
        this.redactionStats.truncatedMutationHtml += 1;
        return null;
      }
      return html;
    }
  }

  class SessionReplayer {
    constructor(options = {}) {
      this.modalId = options.modalId;
      this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);
      this.onStatus = options.onStatus || (() => {});
      this.applyMutationEvents = Boolean(options.applyMutationEvents);
      this.executePageScripts = Boolean(options.executePageScripts);
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
      this.updateIframeSandbox();

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

    applyConfig(config) {
      const replayConfig = config && config.replay ? config.replay : {};
      const scriptMode = replayConfig.scriptMode === "on";
      this.setExecutePageScripts(scriptMode);
      return {
        scriptMode: this.executePageScripts ? "on" : "off"
      };
    }

    setExecutePageScripts(enabled) {
      this.executePageScripts = Boolean(enabled);
      this.updateIframeSandbox();
      return this.executePageScripts;
    }

    updateIframeSandbox() {
      if (!this.iframe) {
        return;
      }
      const tokens = ["allow-same-origin", "allow-forms", "allow-modals", "allow-popups"];
      if (this.executePageScripts) {
        tokens.push("allow-scripts");
      }
      this.iframe.setAttribute("sandbox", tokens.join(" "));
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

      this.speed = Math.max(0.1, Number(options.speed || 1));
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
      const timeline = this.buildReplayTimeline(replayEvents);
      if (!replayEvents.length) {
        this.onStatus("No replayable events found.");
        this.isPlaying = false;
        return;
      }

      this.renderSnapshot(snapshot.data.html, snapshot.data.url, snapshot.data.iframeSummary, () => {
        this.onStatus(`Replay started. speed=${this.speed}x, scripts=${this.executePageScripts ? "ON" : "OFF"}`);
        this.runTimeline(timeline);
      });
    }

    buildReplayTimeline(events) {
      return [...events].sort((a, b) => {
        const at = Number(a && a.timeOffsetMs) || 0;
        const bt = Number(b && b.timeOffsetMs) || 0;
        if (at !== bt) {
          return at - bt;
        }
        const ai = Number(a && a.id) || 0;
        const bi = Number(b && b.id) || 0;
        return ai - bi;
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
        const continueStep = () => {
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
        this.applyEvent(current, continueStep);
      };

      step();
    }

    renderSnapshot(rawHtml, baseUrl, iframeSummary = [], onReady) {
      if (!this.iframe) {
        throw new Error("iframe is required");
      }

      this.updateIframeSandbox();
      const sanitized = sanitizeDocumentHtml(rawHtml, baseUrl || window.location.href, {
        allowScripts: this.executePageScripts
      });
      this.iframe.onload = () => {
        const doc = this.iframe && this.iframe.contentDocument;
        if (doc) {
          restoreIframeSources(doc, iframeSummary, baseUrl || window.location.href);
        }
        if (typeof onReady === "function") {
          onReady();
        }
        this.iframe.onload = null;
      };
      this.iframe.srcdoc = sanitized;
    }

    applyEvent(event, done = () => {}) {
      const doc = this.iframe && this.iframe.contentDocument;
      if (!doc) {
        done();
        return;
      }

      if (event.type === "mutation") {
        if (!this.applyMutationEvents) {
          done();
          return;
        }
        applyMutation(doc, event.data, {
          allowScripts: this.executePageScripts
        });
        done();
        return;
      }

      if (event.type === "event") {
        const eventType = event.data && event.data.eventType;
        if (eventType === "intent_marker") {
          done();
          return;
        }
        applyInteractionEvent(doc, event.data);
      }
      done();
    }
  }

  function applyMutation(doc, data, options = {}) {
    if (!data) {
      return;
    }

    const target = queryPath(doc, data.target);
    if (!target) {
      return;
    }

    if (data.mutationType === "childList") {
      if (!shouldApplyChildListMutation(target, data)) {
        return;
      }

      const patched = applyChildListMutationPatch(doc, target, data, options);
      if (patched) {
        return;
      }

      if (typeof data.targetInnerHTML === "string") {
        target.innerHTML = sanitizeFragmentHtml(data.targetInnerHTML, options);
      }
      return;
    }

    if (data.mutationType === "attributes") {
      if (!data.attributeName) {
        return;
      }

      if (isBlockedReplayAttribute(data.attributeName, data.newValue, options)) {
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

  function isBlockedReplayAttribute(attributeName, value, options = {}) {
    const name = String(attributeName || "").toLowerCase();
    if (!name) {
      return false;
    }

    if (!options.allowScripts && name.startsWith("on")) {
      return true;
    }

    if (!options.allowScripts && isJavascriptUrlAttribute(name, String(value || "").trim())) {
      return true;
    }

    return false;
  }

  function shouldApplyChildListMutation(target, data) {
    if (!(target instanceof Element)) {
      return false;
    }

    const tag = String(target.tagName || "").toLowerCase();
    if (tag === "html" || tag === "body") {
      return false;
    }

    const html = String(data && data.targetInnerHTML || "");
    const addedCount = Array.isArray(data && data.addedNodes) ? data.addedNodes.length : 0;
    const removedCount = Array.isArray(data && data.removedNodes) ? data.removedNodes.length : 0;
    return Boolean(html || addedCount || removedCount);
  }

  function applyChildListMutationPatch(doc, target, data, options = {}) {
    if (!(target instanceof Element)) {
      return false;
    }

    const removedNodes = Array.isArray(data && data.removedNodes) ? data.removedNodes : [];
    const addedNodes = Array.isArray(data && data.addedNodes) ? data.addedNodes : [];
    let changed = false;

    removedNodes.forEach((nodeDesc) => {
      if (removeSerializedNode(doc, target, nodeDesc)) {
        changed = true;
      }
    });
    addedNodes.forEach((nodeDesc) => {
      if (appendSerializedNode(target, nodeDesc, options)) {
        changed = true;
      }
    });

    return changed;
  }

  function removeSerializedNode(doc, target, nodeDesc) {
    if (!nodeDesc || !(target instanceof Element)) {
      return false;
    }

    if (nodeDesc.nodeType === "element" && nodeDesc.path) {
      const candidate = queryPath(doc, nodeDesc.path);
      if (candidate && candidate.parentNode === target) {
        candidate.remove();
        return true;
      }
    }

    if (nodeDesc.nodeType === "text") {
      const text = String(nodeDesc.textContent || "");
      const textNode = Array.from(target.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent === text);
      if (textNode) {
        textNode.remove();
        return true;
      }
    }

    return false;
  }

  function appendSerializedNode(target, nodeDesc, options = {}) {
    if (!nodeDesc || !(target instanceof Element)) {
      return false;
    }

    if (nodeDesc.nodeType === "text") {
      target.appendChild(document.createTextNode(String(nodeDesc.textContent || "")));
      return true;
    }

    if (nodeDesc.nodeType === "element" && typeof nodeDesc.outerHTML === "string") {
      const template = document.createElement("template");
      template.innerHTML = sanitizeFragmentHtml(nodeDesc.outerHTML, options);
      const nodes = Array.from(template.content.childNodes);
      if (!nodes.length) {
        return false;
      }

      const fragment = document.createDocumentFragment();
      nodes.forEach((node) => fragment.appendChild(node));
      target.appendChild(fragment);
      return true;
    }

    return false;
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
      dispatchInputLikeEvent(doc, target, data.eventType);
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
      replayNativeClick(doc, target, data);
    }
  }

  function dispatchInputLikeEvent(doc, target, eventType) {
    const win = doc && doc.defaultView;
    if (!win || typeof win.Event !== "function") {
      return;
    }

    try {
      target.dispatchEvent(new win.Event(eventType, { bubbles: true, cancelable: true }));
    } catch {
      // no-op
    }
  }

  function replayNativeClick(doc, target, data) {
    const win = doc && doc.defaultView;
    if (!win || !(target instanceof win.Element)) {
      return;
    }

    const mapped = mapPointerPosition(doc, data);
    const x = mapped ? mapped.x : Number(data && data.x) || 0;
    const y = mapped ? mapped.y : Number(data && data.y) || 0;
    const button = Number(data && data.button) || 0;

    try {
      if (typeof target.focus === "function") {
        target.focus({ preventScroll: true });
      }
    } catch {
      // no-op
    }

    const anchor = target.closest ? target.closest("a[href]") : null;
    const blockDefaultNavigation = anchor instanceof win.HTMLAnchorElement;
    const preventDefault = (event) => {
      event.preventDefault();
    };

    if (blockDefaultNavigation) {
      anchor.addEventListener("click", preventDefault, { capture: true, once: true });
    }

    dispatchPointerMouseSequence(win, target, { x, y, button });
  }

  function dispatchPointerMouseSequence(win, target, coords) {
    const baseMouseInit = {
      bubbles: true,
      cancelable: true,
      composed: true,
      view: win,
      clientX: coords.x,
      clientY: coords.y,
      button: coords.button
    };

    if (typeof win.PointerEvent === "function") {
      target.dispatchEvent(new win.PointerEvent("pointerdown", {
        ...baseMouseInit,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
        buttons: 1
      }));
    }

    if (typeof win.MouseEvent === "function") {
      target.dispatchEvent(new win.MouseEvent("mousedown", {
        ...baseMouseInit,
        buttons: 1
      }));
    }

    if (typeof win.PointerEvent === "function") {
      target.dispatchEvent(new win.PointerEvent("pointerup", {
        ...baseMouseInit,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
        buttons: 0
      }));
    }

    if (typeof win.MouseEvent === "function") {
      target.dispatchEvent(new win.MouseEvent("mouseup", {
        ...baseMouseInit,
        buttons: 0
      }));
      target.dispatchEvent(new win.MouseEvent("click", {
        ...baseMouseInit,
        detail: 1,
        buttons: 0
      }));
      return;
    }

    if (typeof target.click === "function") {
      target.click();
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

  function sanitizeDocumentHtml(rawHtml, baseUrl, options = {}) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(String(rawHtml || ""), "text/html");
    ensureBaseHref(parsed, baseUrl);
    sanitizeDomTree(parsed, options);
    return parsed.documentElement.outerHTML;
  }

  function sanitizeFragmentHtml(rawHtml, options = {}) {
    const template = document.createElement("template");
    template.innerHTML = String(rawHtml || "");
    sanitizeDomTree(template.content, options);
    return template.innerHTML;
  }

  function sanitizeDomTree(root, options = {}) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    const allowScripts = Boolean(options.allowScripts);
    const maskAllInputs = Boolean(options.maskAllInputs);
    const maskTextSelectors = Array.isArray(options.maskTextSelectors) ? options.maskTextSelectors : [];
    const blockSelectors = Array.isArray(options.blockSelectors) ? options.blockSelectors : [];

    root.querySelectorAll("[autofocus]").forEach((node) => node.removeAttribute("autofocus"));
    root.querySelectorAll(`#${PANEL_ID}, #${REPLAY_MODAL_ID}, #${STYLE_ID}`).forEach((node) => node.remove());

    if (blockSelectors.length) {
      root.querySelectorAll(blockSelectors.join(", ")).forEach((node) => {
        if (!(node instanceof Element)) {
          return;
        }
        node.setAttribute("data-sr-blocked", "1");
        node.textContent = "[blocked]";
      });
    }

    if (maskAllInputs) {
      maskSensitiveInputs(root);
    }

    if (maskTextSelectors.length) {
      root.querySelectorAll(maskTextSelectors.join(", ")).forEach((node) => {
        if (!(node instanceof Element)) {
          return;
        }
        redactElementText(node);
      });
    }

    if (!allowScripts) {
      root.querySelectorAll("script").forEach((node) => node.remove());
      root.querySelectorAll("*").forEach((node) => {
        if (!node.attributes || !node.attributes.length) {
          return;
        }
        Array.from(node.attributes).forEach((attribute) => {
          const name = String(attribute.name || "").toLowerCase();
          const value = String(attribute.value || "").trim();
          if (name.startsWith("on")) {
            node.removeAttribute(attribute.name);
            return;
          }
          if (isJavascriptUrlAttribute(name, value)) {
            node.removeAttribute(attribute.name);
          }
        });
      });
    }
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

  function getSnapshotHtmlForRecording(options = {}) {
    const cloned = document.documentElement.cloneNode(true);
    if (!(cloned instanceof Element)) {
      return document.documentElement.outerHTML;
    }

    sanitizeDomTree(cloned, {
      allowScripts: false,
      maskAllInputs: Boolean(options.maskAllInputs),
      maskTextSelectors: Array.isArray(options.maskTextSelectors) ? options.maskTextSelectors : [],
      blockSelectors: Array.isArray(options.blockSelectors) ? options.blockSelectors : []
    });
    return cloned.outerHTML;
  }

  function getIframeSummary(shouldIgnoreNode = () => false) {
    const frames = Array.from(document.querySelectorAll("iframe"));
    return frames
      .filter((frame) => !shouldIgnoreNode(frame))
      .map((frame) => {
        const src = frame.getAttribute("src") || null;
        const currentSrc = normalizeRecordedIframeSrc(frame.currentSrc || frame.src || src);
        return {
          path: getNodePath(frame),
          src,
          currentSrc,
          isCrossOrigin: isCrossOriginUrl(currentSrc)
        };
      });
  }

  function restoreIframeSources(doc, iframeSummary, baseUrl) {
    if (!doc || !Array.isArray(iframeSummary) || !iframeSummary.length) {
      return;
    }

    iframeSummary.forEach((item) => {
      if (!item || !item.path) {
        return;
      }

      const target = queryPath(doc, item.path);
      if (!(target instanceof Element) || String(target.tagName || "").toLowerCase() !== "iframe") {
        return;
      }

      const desiredSrc = normalizeRecordedIframeSrc(item.currentSrc || item.src);
      if (!desiredSrc) {
        return;
      }

      const currentSrc = normalizeRecordedIframeSrc(target.getAttribute("src") || target.src);
      if (currentSrc !== desiredSrc) {
        target.setAttribute("src", desiredSrc);
      }

      if (item.isCrossOrigin) {
        installThirdPartyFramePlaceholder(target, desiredSrc, baseUrl);
      }
    });
  }

  function installThirdPartyFramePlaceholder(iframe, desiredSrc, baseUrl) {
    let settled = false;
    const finish = () => {
      settled = true;
    };
    iframe.addEventListener("load", finish, { once: true });
    iframe.addEventListener("error", () => {
      if (settled) {
        return;
      }
      settled = true;
      renderThirdPartyFramePlaceholder(iframe, desiredSrc, baseUrl);
    }, { once: true });

    setTimeout(() => {
      if (settled) {
        return;
      }
      const currentSrc = normalizeRecordedIframeSrc(iframe.getAttribute("src") || iframe.src);
      const unresolved = !currentSrc || currentSrc === "about:blank";
      if (unresolved) {
        renderThirdPartyFramePlaceholder(iframe, desiredSrc, baseUrl);
      }
    }, 1800);
  }

  function renderThirdPartyFramePlaceholder(iframe, desiredSrc, baseUrl) {
    if (!(iframe instanceof Element)) {
      return;
    }

    const text = [
      "3rd-party frame could not be restored.",
      `src: ${desiredSrc || "(unknown)"}`,
      "Reason: cross-origin/ad-blocker/network policy."
    ].join("\\n");
    iframe.removeAttribute("src");
    iframe.setAttribute("srcdoc", [
      "<!doctype html><html><body style=\"margin:0;font:12px/1.4 sans-serif;background:#f8fafc;color:#334155;display:flex;align-items:center;justify-content:center;\">",
      `<pre style=\"white-space:pre-wrap;padding:12px;margin:0;max-width:100%;\">${escapeHtml(text)}</pre>`,
      "</body></html>"
    ].join(""));
    iframe.setAttribute("title", `Third-party frame placeholder (${baseUrl || ""})`);
  }

  function normalizeRecordedIframeSrc(value) {
    if (!value) {
      return null;
    }
    const src = String(value).trim();
    if (!src || /^javascript:/i.test(src)) {
      return null;
    }
    return src;
  }

  function isCrossOriginUrl(url) {
    if (!url) {
      return false;
    }
    try {
      const resolved = new URL(String(url), window.location.href);
      return resolved.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  function getMutationOldValue(mutation, policy = {}) {
    if (!mutation) {
      return null;
    }
    if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.attributeName) {
      if (shouldRedactNode(mutation.target, policy)) {
        return "[redacted]";
      }
      return mutation.oldValue;
    }
    if (mutation.type === "characterData") {
      if (shouldRedactNode(mutation.target, policy)) {
        return "[redacted]";
      }
      return mutation.oldValue;
    }
    return mutation.oldValue;
  }

  function getMutationNewValue(mutation, policy = {}) {
    if (!mutation) {
      return null;
    }

    if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.attributeName) {
      if (shouldRedactNode(mutation.target, policy)) {
        return "[redacted]";
      }
      return mutation.target.getAttribute(mutation.attributeName);
    }

    if (mutation.type === "characterData") {
      if (shouldRedactNode(mutation.target, policy)) {
        return "[redacted]";
      }
      return mutation.target.textContent;
    }

    return null;
  }

  function serializeNodeWithPolicy(node, policy = {}, redactionStats = null) {
    if (!node) {
      return null;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      if (shouldRedactNode(node, policy)) {
        if (redactionStats) {
          redactionStats.redactedSerializedNodes += 1;
        }
        return {
          nodeType: "text",
          textContent: "[redacted]"
        };
      }
      return {
        nodeType: "text",
        textContent: node.textContent
      };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (shouldRedactNode(node, policy)) {
        if (redactionStats) {
          redactionStats.redactedSerializedNodes += 1;
        }
        return {
          nodeType: "element",
          tagName: node.tagName,
          path: getNodePath(node),
          outerHTML: "<div data-sr-redacted=\"true\">[redacted]</div>"
        };
      }
      const rawOuterHtml = String(node.outerHTML || "");
      if (rawOuterHtml.length > runtimeConfig.limits.maxMutationHtmlBytes) {
        if (redactionStats) {
          redactionStats.truncatedMutationHtml += 1;
        }
        return {
          nodeType: "element",
          tagName: node.tagName,
          path: getNodePath(node),
          outerHTML: "<div data-sr-truncated=\"true\">[truncated]</div>"
        };
      }
      return {
        nodeType: "element",
        tagName: node.tagName,
        path: getNodePath(node),
        outerHTML: rawOuterHtml
      };
    }

    return {
      nodeType: `other:${node.nodeType}`,
      value: String(node)
    };
  }

  function serializeNode(node) {
    return serializeNodeWithPolicy(node);
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
      if (target instanceof HTMLInputElement) {
        const type = String(target.type || "").toLowerCase();
        if (["checkbox", "radio", "button", "submit", "reset", "file"].includes(type)) {
          return target.value;
        }
      }
      return "*".repeat(String(target.value || "").length);
    }

    return target.value;
  }

  function isBlockedNode(node, selectors = []) {
    if (!node || !Array.isArray(selectors) || !selectors.length) {
      return false;
    }

    const element = node instanceof Element ? node : node.parentElement;
    if (!(element instanceof Element)) {
      return false;
    }

    return selectors.some((selector) => {
      if (!selector) {
        return false;
      }
      try {
        return Boolean(element.closest(selector));
      } catch {
        return false;
      }
    });
  }

  function isMaskTextNode(node, selectors = []) {
    return isBlockedNode(node, selectors);
  }

  function shouldRedactNode(node, policy = {}) {
    const blockSelectors = Array.isArray(policy.blockSelectors) ? policy.blockSelectors : [];
    const maskTextSelectors = Array.isArray(policy.maskTextSelectors) ? policy.maskTextSelectors : [];
    const maskAllInputs = Boolean(policy.maskAllInputs);

    if (isBlockedNode(node, blockSelectors)) {
      return true;
    }
    if (isMaskTextNode(node, maskTextSelectors)) {
      return true;
    }

    if (!maskAllInputs) {
      return false;
    }

    const element = node instanceof Element ? node : node && node.parentElement;
    if (!(element instanceof Element)) {
      return false;
    }

    const field = element.closest("input, textarea, select");
    if (!(field instanceof Element)) {
      return false;
    }

    if (field instanceof HTMLInputElement) {
      const type = String(field.type || "").toLowerCase();
      return !["checkbox", "radio", "button", "submit", "reset", "file"].includes(type);
    }

    return true;
  }

  function maskSensitiveInputs(root) {
    const fields = Array.from(root.querySelectorAll("input, textarea, select"));
    fields.forEach((field) => {
      if (field instanceof HTMLInputElement) {
        const type = String(field.type || "").toLowerCase();
        if (["checkbox", "radio", "button", "submit", "reset", "file"].includes(type)) {
          return;
        }
        field.value = "*".repeat(String(field.value || "").length);
        return;
      }

      if (field instanceof HTMLTextAreaElement) {
        field.value = "*".repeat(String(field.value || "").length);
        return;
      }

      if (field instanceof HTMLSelectElement) {
        field.selectedIndex = -1;
      }
    });
  }

  function redactElementText(el) {
    if (!(el instanceof Element)) {
      return;
    }

    const doc = el.ownerDocument || document;
    const nodeFilter = doc.defaultView && doc.defaultView.NodeFilter
      ? doc.defaultView.NodeFilter
      : (typeof NodeFilter !== "undefined" ? NodeFilter : { SHOW_TEXT: 4 });
    const walker = doc.createTreeWalker(el, nodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    textNodes.forEach((textNode) => {
      const raw = String(textNode.textContent || "");
      if (!raw.trim()) {
        return;
      }
      textNode.textContent = "[redacted]";
    });
  }

  function isJavascriptUrlAttribute(name, value) {
    if (!name || !value) {
      return false;
    }
    if (!["href", "src", "xlink:href", "formaction", "action"].includes(name)) {
      return false;
    }
    return /^javascript:/i.test(String(value).trim());
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  function cloneConfig(config) {
    return JSON.parse(JSON.stringify(config || DEFAULT_CONFIG));
  }

  function sanitizeConfigInput(input = {}) {
    const privacy = input && input.privacy ? input.privacy : {};
    const replay = input && input.replay ? input.replay : {};
    const limits = input && input.limits ? input.limits : {};

    return {
      privacy: {
        maskAllInputs: privacy.maskAllInputs !== undefined ? Boolean(privacy.maskAllInputs) : undefined,
        blockSelectors: Array.isArray(privacy.blockSelectors) ? privacy.blockSelectors.filter(Boolean).map(String) : undefined,
        maskTextSelectors: Array.isArray(privacy.maskTextSelectors) ? privacy.maskTextSelectors.filter(Boolean).map(String) : undefined
      },
      replay: {
        scriptMode: replay.scriptMode === "on" || replay.scriptMode === "off"
          ? replay.scriptMode
          : (replay.scriptMode !== undefined ? (Boolean(replay.scriptMode) ? "on" : "off") : undefined)
      },
      limits: {
        maxEvents: Number.isFinite(Number(limits.maxEvents)) ? Number(limits.maxEvents) : undefined,
        maxMutationHtmlBytes: Number.isFinite(Number(limits.maxMutationHtmlBytes)) ? Number(limits.maxMutationHtmlBytes) : undefined,
        mousemoveSampleMs: Number.isFinite(Number(limits.mousemoveSampleMs)) ? Number(limits.mousemoveSampleMs) : undefined,
        scrollDebounceMs: Number.isFinite(Number(limits.scrollDebounceMs)) ? Number(limits.scrollDebounceMs) : undefined,
        inputDebounceMs: Number.isFinite(Number(limits.inputDebounceMs)) ? Number(limits.inputDebounceMs) : undefined
      }
    };
  }

  function mergeConfig(baseConfig, partialConfig) {
    const base = cloneConfig(baseConfig || DEFAULT_CONFIG);
    const next = partialConfig || {};

    if (next.privacy) {
      if (next.privacy.maskAllInputs !== undefined) {
        base.privacy.maskAllInputs = Boolean(next.privacy.maskAllInputs);
      }
      if (Array.isArray(next.privacy.blockSelectors)) {
        base.privacy.blockSelectors = [...next.privacy.blockSelectors];
      }
      if (Array.isArray(next.privacy.maskTextSelectors)) {
        base.privacy.maskTextSelectors = [...next.privacy.maskTextSelectors];
      }
    }

    if (next.replay && next.replay.scriptMode !== undefined) {
      base.replay.scriptMode = next.replay.scriptMode === "on" ? "on" : "off";
    }

    if (next.limits) {
      if (next.limits.maxEvents !== undefined) {
        base.limits.maxEvents = Math.max(1000, Math.floor(Number(next.limits.maxEvents) || base.limits.maxEvents));
      }
      if (next.limits.maxMutationHtmlBytes !== undefined) {
        base.limits.maxMutationHtmlBytes = Math.max(2000, Math.floor(Number(next.limits.maxMutationHtmlBytes) || base.limits.maxMutationHtmlBytes));
      }
      if (next.limits.mousemoveSampleMs !== undefined) {
        base.limits.mousemoveSampleMs = Math.max(1, Math.floor(Number(next.limits.mousemoveSampleMs) || base.limits.mousemoveSampleMs));
      }
      if (next.limits.scrollDebounceMs !== undefined) {
        base.limits.scrollDebounceMs = Math.max(0, Math.floor(Number(next.limits.scrollDebounceMs) || base.limits.scrollDebounceMs));
      }
      if (next.limits.inputDebounceMs !== undefined) {
        base.limits.inputDebounceMs = Math.max(0, Math.floor(Number(next.limits.inputDebounceMs) || base.limits.inputDebounceMs));
      }
    }

    return base;
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
