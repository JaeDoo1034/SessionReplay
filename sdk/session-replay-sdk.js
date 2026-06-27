(function sessionReplaySdkFactory(global) {
  "use strict";

  var currentScript = document.currentScript;
  var DEFAULT_ENABLED_EVENTS = {
    click: true,
    input: true,
    change: true,
    submit: true,
    scroll: true,
    navigation: true,
    mutation: true,
    mousemove: false
  };
  var defaults = {
    projectId: readData("projectId", "demo-project"),
    userId: readData("userId", ""),
    endpointBase: readData("endpointBase", ""),
    collectIntervalMs: Number(readData("collectIntervalMs", 5000)) || 5000,
    maxBatchSize: Number(readData("maxBatchSize", 80)) || 80,
    maxEvents: Number(readData("maxEvents", 20000)) || 20000,
    maskAllInputs: readData("maskAllInputs", "true") !== "false",
    enabledEvents: parseEnabledEvents(readData("enabledEvents", "click,input,change,submit,scroll,navigation,mutation")),
    blockSelectors: [".sr-block", "[data-sr-block='true']", "[data-private='true']", "[data-sensitive='true']"],
    maskTextSelectors: [".sr-mask", "[data-sr-mask='true']", "[data-clarity-mask='true']", "[data-rr-mask='true']"]
  };

  var config = merge({}, defaults);
  var state = {
    sessionId: "",
    startedAt: 0,
    isRecording: false,
    hasEnded: false,
    queue: [],
    sequence: 0,
    flushTimer: 0,
    mutationObserver: null,
    listeners: [],
    originalPushState: null,
    originalReplaceState: null,
    historyPatched: false,
    droppedEventCount: 0,
    redactionStats: {
      maskedInputEvents: 0,
      maskedMutationValues: 0,
      redactedSerializedNodes: 0,
      blockedNodeEvents: 0,
      blockedMutations: 0,
      truncatedMutationHtml: 0
    },
    lastByType: {
      scroll: 0,
      input: 0,
      mousemove: 0
    }
  };

  var api = {
    version: "1.0.0-sdk",
    init: init,
    start: start,
    pause: pause,
    save: save,
    stop: stop,
    flush: flush,
    configure: configure,
    track: track,
    setEnabledEvents: function setEnabledEvents(events) {
      return configure({ enabledEvents: events }).enabledEvents;
    },
    getEnabledEvents: function getEnabledEvents() {
      return clone(config.enabledEvents);
    },
    getConfig: function getConfig() {
      return clone(config);
    },
    getSessionId: function getSessionId() {
      return state.sessionId;
    },
    isRecording: function isRecording() {
      return state.isRecording;
    },
    getRecordingState: function getRecordingState() {
      if (state.isRecording) {
        return "recording";
      }
      if (state.sessionId && !state.hasEnded) {
        return "stopped";
      }
      if (state.sessionId && state.hasEnded) {
        return "saved";
      }
      return "ready";
    },
    getStartedAt: function getStartedAt() {
      return state.startedAt;
    },
    getQueueSize: function getQueueSize() {
      return state.queue.length;
    }
  };

  global.SessionReplaySDK = api;

  if (readData("autoStart", "false") === "true") {
    init();
  }

  function init(options) {
    configure(options || {});
    if (!state.isRecording) {
      start();
    }
    return api;
  }

  function configure(options) {
    if (!options) {
      return clone(config);
    }
    config = merge(config, options);
    config.collectIntervalMs = Math.max(1000, Number(config.collectIntervalMs) || defaults.collectIntervalMs);
    config.maxBatchSize = Math.max(1, Number(config.maxBatchSize) || defaults.maxBatchSize);
    config.maxEvents = Math.max(1000, Number(config.maxEvents) || defaults.maxEvents);
    config.blockSelectors = toSelectorArray(config.blockSelectors, defaults.blockSelectors);
    config.maskTextSelectors = toSelectorArray(config.maskTextSelectors, defaults.maskTextSelectors);
    config.maskAllInputs = config.maskAllInputs !== false;
    config.enabledEvents = normalizeEnabledEvents(config.enabledEvents);
    if (state.isRecording) {
      syncMutationObserver();
    }
    return clone(config);
  }

  function start() {
    if (state.isRecording) {
      return state.sessionId;
    }

    if (!state.sessionId || state.hasEnded) {
      state.sessionId = createId();
      state.startedAt = Date.now();
      state.isRecording = true;
      state.hasEnded = false;
      state.queue = [];
      state.sequence = 0;
      state.droppedEventCount = 0;
      resetRedactionStats();
      postJson("/api/replay/sessions/start", buildSessionMeta()).catch(noop);
      record("snapshot", {
        reason: "initial",
        url: location.href,
        viewport: getViewport(),
        iframeSummary: getIframeSummary(),
        html: getSnapshotHtml()
      });
    }

    state.isRecording = true;
    state.hasEnded = false;
    record("meta", { action: "recording_started" });

    attachListeners();
    if (isEventEnabled("navigation")) {
      patchHistory();
    }
    syncMutationObserver();
    state.flushTimer = global.setInterval(function onFlushTimer() {
      flush().catch(noop);
    }, config.collectIntervalMs);

    return state.sessionId;
  }

  function pause() {
    if (!state.isRecording) {
      return Promise.resolve();
    }

    detachListeners();
    unpatchHistory();
    detachMutationObserver();
    global.clearInterval(state.flushTimer);
    state.flushTimer = 0;
    state.isRecording = false;

    record("meta", {
      action: "recording_stopped_without_save",
      redactionStats: clone(state.redactionStats),
      droppedEventCount: state.droppedEventCount
    });

    return flushAll();
  }

  function save() {
    var pausePromise = state.isRecording ? pause() : Promise.resolve();

    if (!state.sessionId) {
      return pausePromise.then(function noSession() {
        return { ok: true, skipped: true };
      });
    }

    return pausePromise.then(function afterPause() {
      record("meta", {
        action: "recording_saved",
        redactionStats: clone(state.redactionStats),
        droppedEventCount: state.droppedEventCount
      });
      return flushAll();
    }).then(function afterFlush() {
      return postJson("/api/replay/sessions/end", {
        sessionId: state.sessionId,
        endedAt: Date.now(),
        status: "ended",
        redactionStats: state.redactionStats,
        droppedEventCount: state.droppedEventCount
      }).then(function markEnded(response) {
        state.hasEnded = true;
        return response;
      });
    });
  }

  function stop() {
    return save();
  }

  function flush() {
    if (!state.sessionId || !state.queue.length) {
      return Promise.resolve({ inserted: 0 });
    }

    var events = state.queue.splice(0, config.maxBatchSize);
    return postJson("/api/replay/events/batch", {
      sessionId: state.sessionId,
      projectId: config.projectId,
      userId: config.userId,
      pageUrl: location.href,
      userAgent: navigator.userAgent,
      viewport: getViewport(),
      startedAt: state.startedAt,
      recordingConfig: {
        privacy: {
          maskAllInputs: config.maskAllInputs,
          blockSelectors: config.blockSelectors,
          maskTextSelectors: config.maskTextSelectors
        },
        limits: {
          maxEvents: config.maxEvents,
          maxBatchSize: config.maxBatchSize,
          collectIntervalMs: config.collectIntervalMs
        },
        enabledEvents: config.enabledEvents
      },
      redactionStats: state.redactionStats,
      droppedEventCount: state.droppedEventCount,
      events: events
    }).catch(function onFlushFailed(error) {
      state.queue = events.concat(state.queue).slice(0, config.maxEvents);
      throw error;
    });
  }

  function flushAll() {
    if (!state.sessionId || !state.queue.length) {
      return Promise.resolve({ inserted: 0 });
    }

    return flush().then(function flushNext(result) {
      if (state.queue.length) {
        return flushAll().then(function mergeResult(next) {
          return {
            inserted: Number(result.inserted || 0) + Number(next.inserted || 0)
          };
        });
      }
      return result;
    });
  }

  function track(eventType, data) {
    record("event", merge({
      eventType: String(eventType || "custom")
    }, data || {}));
    return api;
  }

  function record(type, data) {
    if (!state.isRecording && type !== "meta") {
      return;
    }

    if (type === "mutation" && !isEventEnabled("mutation")) {
      return;
    }

    if (type === "event" && data && data.eventType && !isReplayEventEnabled(data.eventType)) {
      return;
    }

    if (state.queue.length >= config.maxEvents) {
      state.droppedEventCount += 1;
      return;
    }

    var now = Date.now();
    state.queue.push({
      id: ++state.sequence,
      type: type,
      at: now,
      timeOffsetMs: now - state.startedAt,
      data: data || {}
    });

    if (state.queue.length >= config.maxBatchSize) {
      flush().catch(noop);
    }
  }

  function attachListeners() {
    add(document, "click", handleClick, true);
    add(document, "input", handleInputLike, true);
    add(document, "change", handleInputLike, true);
    add(document, "submit", handleSubmit, true);
    add(document, "scroll", handleScroll, true);
    add(document, "mousemove", handleMouseMove, true);
    add(global, "hashchange", handleNavigation, true);
    add(global, "popstate", handleNavigation, true);
    add(document, "visibilitychange", handleNavigation, true);
    add(global, "pagehide", handlePageHide, true);
  }

  function detachListeners() {
    state.listeners.forEach(function removeListener(item) {
      item.target.removeEventListener(item.type, item.handler, item.options);
    });
    state.listeners = [];
  }

  function add(target, type, handler, capture) {
    var options = { capture: Boolean(capture), passive: type === "scroll" };
    target.addEventListener(type, handler, options);
    state.listeners.push({ target: target, type: type, handler: handler, options: options });
  }

  function handleClick(event) {
    if (!isEventEnabled("click")) {
      return;
    }

    if (shouldSkipNode(event.target)) {
      state.redactionStats.blockedNodeEvents += 1;
      return;
    }

    record("event", {
      eventType: "click",
      target: getNodePath(event.target),
      x: event.clientX,
      y: event.clientY,
      viewportWidth: global.innerWidth,
      viewportHeight: global.innerHeight,
      button: event.button,
      text: getMaskedText(event.target)
    });

    var anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (anchor && isEventEnabled("navigation")) {
      record("event", {
        eventType: "navigation_intent",
        target: getNodePath(anchor),
        href: anchor.href,
        pathname: anchor.pathname,
        hash: anchor.hash,
        sameOrigin: anchor.origin === location.origin
      });
    }
  }

  function handleInputLike(event) {
    if (!isEventEnabled(event.type)) {
      return;
    }

    if (shouldDebounce(event.type, 120)) {
      return;
    }
    if (shouldSkipNode(event.target)) {
      state.redactionStats.blockedNodeEvents += 1;
      return;
    }

    var raw = getInputValue(event.target, false);
    var masked = getInputValue(event.target, config.maskAllInputs);
    if (raw !== masked) {
      state.redactionStats.maskedInputEvents += 1;
    }

    record("event", {
      eventType: event.type,
      target: getNodePath(event.target),
      value: masked
    });
  }

  function handleSubmit(event) {
    if (!isEventEnabled("submit")) {
      return;
    }

    record("event", {
      eventType: "submit",
      target: getNodePath(event.target),
      prevented: event.defaultPrevented
    });
  }

  function handleScroll(event) {
    if (!isEventEnabled("scroll")) {
      return;
    }

    if (shouldDebounce("scroll", 120)) {
      return;
    }

    var target = event.target === document ? document.scrollingElement : event.target;
    record("event", {
      eventType: "scroll",
      target: getNodePath(target),
      scrollTop: target && "scrollTop" in target ? target.scrollTop : global.scrollY,
      scrollLeft: target && "scrollLeft" in target ? target.scrollLeft : global.scrollX
    });
  }

  function handleMouseMove(event) {
    if (!isEventEnabled("mousemove")) {
      return;
    }

    if (shouldDebounce("mousemove", 80)) {
      return;
    }

    if (shouldSkipNode(event.target)) {
      state.redactionStats.blockedNodeEvents += 1;
      return;
    }

    record("event", {
      eventType: "mousemove",
      target: getNodePath(event.target),
      x: event.clientX,
      y: event.clientY,
      viewportWidth: global.innerWidth,
      viewportHeight: global.innerHeight
    });
  }

  function handleNavigation(event) {
    if (!isEventEnabled("navigation")) {
      return;
    }

    record("event", {
      eventType: event.type,
      href: location.href,
      pathname: location.pathname + location.search,
      hash: location.hash,
      visibilityState: document.visibilityState
    });
  }

  function handlePageHide() {
    if (isEventEnabled("navigation")) {
      record("event", {
        eventType: "pagehide",
        href: location.href,
        pathname: location.pathname + location.search,
        hash: location.hash,
        visibilityState: document.visibilityState
      });
    }

    var batch = state.queue.splice(0);
    if (batch.length && navigator.sendBeacon) {
      var payload = JSON.stringify({
        sessionId: state.sessionId,
        projectId: config.projectId,
        userId: config.userId,
        pageUrl: location.href,
        userAgent: navigator.userAgent,
        viewport: getViewport(),
        startedAt: state.startedAt,
        redactionStats: state.redactionStats,
        droppedEventCount: state.droppedEventCount,
        events: batch
      });
      navigator.sendBeacon(resolveEndpoint("/api/replay/events/batch"), new Blob([payload], { type: "application/json" }));
    }

    if (navigator.sendBeacon && state.sessionId) {
      navigator.sendBeacon(resolveEndpoint("/api/replay/sessions/end"), new Blob([JSON.stringify({
        sessionId: state.sessionId,
        endedAt: Date.now(),
        status: "ended",
        redactionStats: state.redactionStats,
        droppedEventCount: state.droppedEventCount
      })], { type: "application/json" }));
    }
  }

  function patchHistory() {
    if (state.historyPatched) {
      return;
    }

    state.originalPushState = history.pushState;
    state.originalReplaceState = history.replaceState;

    history.pushState = function patchedPushState(data, title, url) {
      var result = state.originalPushState.apply(history, arguments);
      if (isEventEnabled("navigation")) {
        record("event", {
          eventType: "history_pushstate",
          href: location.href,
          targetUrl: url ? new URL(url, location.href).href : location.href,
          state: safeJson(data)
        });
      }
      return result;
    };

    history.replaceState = function patchedReplaceState(data, title, url) {
      var result = state.originalReplaceState.apply(history, arguments);
      if (isEventEnabled("navigation")) {
        record("event", {
          eventType: "history_replacestate",
          href: location.href,
          targetUrl: url ? new URL(url, location.href).href : location.href,
          state: safeJson(data)
        });
      }
      return result;
    };

    state.historyPatched = true;
  }

  function unpatchHistory() {
    if (!state.historyPatched) {
      return;
    }
    history.pushState = state.originalPushState;
    history.replaceState = state.originalReplaceState;
    state.originalPushState = null;
    state.originalReplaceState = null;
    state.historyPatched = false;
  }

  function attachMutationObserver() {
    if (!isEventEnabled("mutation") || !global.MutationObserver || state.mutationObserver) {
      return;
    }

    state.mutationObserver = new MutationObserver(function onMutations(mutations) {
      mutations.forEach(function eachMutation(mutation) {
        if (shouldSkipNode(mutation.target)) {
          state.redactionStats.blockedMutations += 1;
          return;
        }

        record("mutation", {
          eventType: "mutation_" + mutation.type,
          mutationType: mutation.type,
          target: getNodePath(mutation.target),
          attributeName: mutation.attributeName,
          oldValue: redactIfSensitive(mutation.oldValue, mutation.target),
          newValue: getMutationNewValue(mutation),
          targetInnerHTML: getSafeInnerHTML(mutation.target),
          addedNodes: Array.prototype.slice.call(mutation.addedNodes || []).map(serializeNode),
          removedNodes: Array.prototype.slice.call(mutation.removedNodes || []).map(serializeNode)
        });
      });
    });

    state.mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  }

  function detachMutationObserver() {
    if (state.mutationObserver) {
      state.mutationObserver.disconnect();
      state.mutationObserver = null;
    }
  }

  function syncMutationObserver() {
    if (isEventEnabled("mutation")) {
      attachMutationObserver();
    } else {
      detachMutationObserver();
    }
  }

  function getSnapshotHtml() {
    var cloneNode = document.documentElement.cloneNode(true);
    sanitizeTree(cloneNode);
    return "<!doctype html>\n" + cloneNode.outerHTML;
  }

  function sanitizeTree(root) {
    Array.prototype.slice.call(root.querySelectorAll("script")).forEach(function removeScript(script) {
      script.remove();
    });

    Array.prototype.slice.call(root.querySelectorAll(config.blockSelectors.join(","))).forEach(function removeBlocked(node) {
      node.setAttribute("data-sr-redacted", "blocked");
      node.textContent = "";
    });

    Array.prototype.slice.call(root.querySelectorAll("input, textarea")).forEach(function maskInput(input) {
      if (config.maskAllInputs) {
        input.setAttribute("value", maskValue(input.value));
        input.textContent = "";
      }
    });

    Array.prototype.slice.call(root.querySelectorAll(config.maskTextSelectors.join(","))).forEach(function maskText(node) {
      node.textContent = maskValue(node.textContent || "");
    });
  }

  function serializeNode(node) {
    if (!node) {
      return null;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return {
        nodeType: "text",
        textContent: redactIfSensitive(node.textContent, node)
      };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (shouldSkipNode(node)) {
        state.redactionStats.redactedSerializedNodes += 1;
        return {
          nodeType: "element",
          path: getNodePath(node),
          tagName: node.tagName.toLowerCase(),
          outerHTML: "[redacted]"
        };
      }

      var cloneNode = node.cloneNode(true);
      sanitizeTree(cloneNode);
      return {
        nodeType: "element",
        path: getNodePath(node),
        tagName: node.tagName.toLowerCase(),
        outerHTML: cloneNode.outerHTML
      };
    }

    return {
      nodeType: "other"
    };
  }

  function getSafeInnerHTML(target) {
    if (!target || target.nodeType !== Node.ELEMENT_NODE || shouldSkipNode(target)) {
      return null;
    }

    var html = String(target.innerHTML || "");
    if (html.length > 120000) {
      state.redactionStats.truncatedMutationHtml += 1;
      return null;
    }
    return html;
  }

  function getMutationNewValue(mutation) {
    if (mutation.type === "attributes" && mutation.target && mutation.attributeName) {
      return redactIfSensitive(mutation.target.getAttribute(mutation.attributeName), mutation.target);
    }
    if (mutation.type === "characterData") {
      return redactIfSensitive(mutation.target.textContent, mutation.target);
    }
    return null;
  }

  function redactIfSensitive(value, node) {
    if (isSensitiveNode(node)) {
      state.redactionStats.maskedMutationValues += 1;
      return "[redacted]";
    }
    return value;
  }

  function shouldSkipNode(node) {
    var el = node && node.nodeType === Node.ELEMENT_NODE ? node : node && node.parentElement;
    return Boolean(el && matchesAny(el, config.blockSelectors));
  }

  function isSensitiveNode(node) {
    var el = node && node.nodeType === Node.ELEMENT_NODE ? node : node && node.parentElement;
    return Boolean(el && matchesAny(el, config.maskTextSelectors));
  }

  function matchesAny(el, selectors) {
    return selectors.some(function eachSelector(selector) {
      try {
        return el.matches(selector) || Boolean(el.closest(selector));
      } catch (_error) {
        return false;
      }
    });
  }

  function getInputValue(target, masked) {
    if (!target || !("value" in target)) {
      return "";
    }
    return masked ? maskValue(target.value) : target.value;
  }

  function getMaskedText(target) {
    if (!target || !target.textContent) {
      return "";
    }
    return isSensitiveNode(target) ? "[redacted]" : String(target.textContent).trim().slice(0, 80);
  }

  function maskValue(value) {
    var text = String(value || "");
    return text ? "*".repeat(Math.min(text.length, 12)) : "";
  }

  function getNodePath(node) {
    if (!node || node === document) {
      return "document";
    }
    if (node === document.documentElement) {
      return "html";
    }
    if (node === document.body) {
      return "html > body";
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return getNodePath(node.parentElement);
    }
    if (node.id) {
      return "#" + cssEscape(node.id);
    }

    var parts = [];
    var current = node;
    while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.documentElement) {
      var name = current.tagName.toLowerCase();
      var parent = current.parentElement;
      if (parent) {
        var sameTag = Array.prototype.filter.call(parent.children, function filterChild(child) {
          return child.tagName === current.tagName;
        });
        if (sameTag.length > 1) {
          name += ":nth-of-type(" + (sameTag.indexOf(current) + 1) + ")";
        }
      }
      parts.unshift(name);
      current = parent;
    }
    return "html > " + parts.join(" > ");
  }

  function getIframeSummary() {
    return Array.prototype.slice.call(document.querySelectorAll("iframe")).map(function summarize(frame) {
      return {
        path: getNodePath(frame),
        src: frame.getAttribute("src") || "",
        title: frame.getAttribute("title") || ""
      };
    });
  }

  function getViewport() {
    return {
      width: global.innerWidth,
      height: global.innerHeight
    };
  }

  function buildSessionMeta() {
    return {
      sessionId: state.sessionId,
      projectId: config.projectId,
      userId: config.userId,
      pageUrl: location.href,
      userAgent: navigator.userAgent,
      viewport: getViewport(),
      startedAt: state.startedAt,
      status: "recording",
      recordingConfig: {
        privacy: {
          maskAllInputs: config.maskAllInputs,
          blockSelectors: config.blockSelectors,
          maskTextSelectors: config.maskTextSelectors
        },
        enabledEvents: config.enabledEvents
      }
    };
  }

  function postJson(pathname, body) {
    return fetch(resolveEndpoint(pathname), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      keepalive: JSON.stringify(body).length < 60000
    }).then(function parseResponse(response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.json();
    });
  }

  function resolveEndpoint(pathname) {
    return String(config.endpointBase || "").replace(/\/$/, "") + pathname;
  }

  function shouldDebounce(type, ms) {
    var now = Date.now();
    if (now - (state.lastByType[type] || 0) < ms) {
      return true;
    }
    state.lastByType[type] = now;
    return false;
  }

  function createId() {
    if (global.crypto && typeof global.crypto.randomUUID === "function") {
      return global.crypto.randomUUID();
    }
    return "sr_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
  }

  function safeJson(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (_error) {
      return null;
    }
  }

  function readData(name, fallback) {
    if (!currentScript || !currentScript.dataset) {
      return fallback;
    }
    return currentScript.dataset[name] === undefined ? fallback : currentScript.dataset[name];
  }

  function merge(base, next) {
    var output = clone(base);
    Object.keys(next || {}).forEach(function assign(key) {
      output[key] = next[key];
    });
    return output;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function toSelectorArray(value, fallback) {
    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }
    if (typeof value === "string") {
      return value.split(",").map(function trim(item) {
        return item.trim();
      }).filter(Boolean);
    }
    return fallback.slice();
  }

  function parseEnabledEvents(value) {
    if (!value) {
      return clone(DEFAULT_ENABLED_EVENTS);
    }
    return normalizeEnabledEvents(String(value).split(","));
  }

  function normalizeEnabledEvents(value) {
    var normalized = clone(DEFAULT_ENABLED_EVENTS);
    if (Array.isArray(value)) {
      Object.keys(normalized).forEach(function disableAll(key) {
        normalized[key] = false;
      });
      value.forEach(function enableEvent(name) {
        var key = String(name || "").trim();
        if (key && Object.prototype.hasOwnProperty.call(normalized, key)) {
          normalized[key] = true;
        }
      });
      return normalized;
    }

    if (value && typeof value === "object") {
      Object.keys(normalized).forEach(function assignEvent(key) {
        if (value[key] !== undefined) {
          normalized[key] = Boolean(value[key]);
        }
      });
    }
    return normalized;
  }

  function isEventEnabled(name) {
    return Boolean(config.enabledEvents && config.enabledEvents[name]);
  }

  function isReplayEventEnabled(eventType) {
    if (["view_state", "navigation_intent", "hashchange", "popstate", "visibilitychange", "pagehide", "history_pushstate", "history_replacestate"].indexOf(eventType) >= 0) {
      return isEventEnabled("navigation");
    }
    return isEventEnabled(eventType);
  }

  function cssEscape(value) {
    if (global.CSS && typeof global.CSS.escape === "function") {
      return global.CSS.escape(value);
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function resetRedactionStats() {
    Object.keys(state.redactionStats).forEach(function reset(key) {
      state.redactionStats[key] = 0;
    });
  }

  function noop() {}
})(window);
