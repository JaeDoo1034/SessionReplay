const DEFAULT_EVENTS = ["click", "mousemove", "input", "change", "submit", "scroll"];
const DEFAULT_NAVIGATION_EVENTS = [
  "hashchange",
  "popstate",
  "beforeunload",
  "pagehide",
  "pageshow",
  "visibilitychange"
];

export const DEFAULT_BLOCK_SELECTORS = [
  ".rr-block",
  ".rr-mask",
  ".clarity-mask",
  "[data-clarity-mask='true']",
  "[data-rr-block='true']",
  "[data-sr-block='true']",
  "[data-private='true']",
  "[data-sensitive='true']"
];

export const DEFAULT_MASK_TEXT_SELECTORS = [
  ".rr-mask",
  ".clarity-mask",
  "[data-rr-mask='true']",
  "[data-clarity-mask='true']",
  "[data-sr-mask='true']"
];

export class SessionRecorder {
  constructor(options = {}) {
    this.root = options.root || document;
    this.eventsToRecord = options.events || DEFAULT_EVENTS;
    this.navigationEventsToRecord = options.navigationEvents || DEFAULT_NAVIGATION_EVENTS;
    this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);

    this.policy = {
      maskAllInputs: options.maskInputValue !== false,
      blockSelectors: toSelectorList(options.blockSelectors, DEFAULT_BLOCK_SELECTORS),
      maskTextSelectors: toSelectorList(options.maskTextSelectors, DEFAULT_MASK_TEXT_SELECTORS)
    };

    this.limits = {
      mousemoveSampleMs: Math.max(1, Number(options.mousemoveSampleMs) || 20),
      scrollDebounceMs: Math.max(0, Number(options.scrollDebounceMs) || 120),
      inputDebounceMs: Math.max(0, Number(options.inputDebounceMs) || 120),
      maxEvents: Math.max(1000, Number(options.maxEvents) || 20000),
      maxMutationHtmlBytes: Math.max(2000, Number(options.maxMutationHtmlBytes) || 120000)
    };

    this.isRecording = false;
    this.startedAt = 0;
    this.events = [];
    this.sequence = 0;
    this.lastMousemoveAt = 0;
    this.lastByEventType = { input: 0, change: 0, scroll: 0 };
    this.currentIntentSeq = 0;

    this.droppedEventCount = 0;
    this.redactionStats = createRedactionStats();

    this.mutationObserver = null;
    this.boundEventHandlers = [];
    this.boundNavigationHandlers = [];
    this.originalPushState = null;
    this.originalReplaceState = null;
    this.historyPatched = false;
  }

  applyConfig(config = {}) {
    const privacy = config.privacy || {};
    const limits = config.limits || {};

    if (privacy.maskAllInputs !== undefined) {
      this.policy.maskAllInputs = privacy.maskAllInputs !== false;
    }
    if (privacy.blockSelectors !== undefined) {
      this.policy.blockSelectors = toSelectorList(privacy.blockSelectors, this.policy.blockSelectors);
    }
    if (privacy.maskTextSelectors !== undefined) {
      this.policy.maskTextSelectors = toSelectorList(privacy.maskTextSelectors, this.policy.maskTextSelectors);
    }

    if (limits.mousemoveSampleMs !== undefined) {
      this.limits.mousemoveSampleMs = Math.max(1, Number(limits.mousemoveSampleMs) || this.limits.mousemoveSampleMs);
    }
    if (limits.scrollDebounceMs !== undefined) {
      this.limits.scrollDebounceMs = Math.max(0, Number(limits.scrollDebounceMs) || this.limits.scrollDebounceMs);
    }
    if (limits.inputDebounceMs !== undefined) {
      this.limits.inputDebounceMs = Math.max(0, Number(limits.inputDebounceMs) || this.limits.inputDebounceMs);
    }
    if (limits.maxEvents !== undefined) {
      this.limits.maxEvents = Math.max(1000, Number(limits.maxEvents) || this.limits.maxEvents);
    }
    if (limits.maxMutationHtmlBytes !== undefined) {
      this.limits.maxMutationHtmlBytes = Math.max(2000, Number(limits.maxMutationHtmlBytes) || this.limits.maxMutationHtmlBytes);
    }

    return {
      privacy: { ...this.policy, blockSelectors: [...this.policy.blockSelectors], maskTextSelectors: [...this.policy.maskTextSelectors] },
      limits: { ...this.limits }
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
    this.redactionStats = createRedactionStats();

    this.record("snapshot", {
      reason: "initial",
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      iframeSummary: getIframeSummary(this.shouldIgnoreNode),
      html: getSnapshotHtmlForRecording(this.policy)
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
          maskAllInputs: this.policy.maskAllInputs,
          blockSelectors: [...this.policy.blockSelectors],
          maskTextSelectors: [...this.policy.maskTextSelectors]
        },
        limits: { ...this.limits }
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

    if (type !== "meta" && this.events.length >= this.limits.maxEvents) {
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

  shouldDebounce(eventType, debounceMs) {
    if (!debounceMs) {
      return false;
    }

    const now = performance.now();
    const last = Number(this.lastByEventType[eventType] || 0);
    if (now - last < debounceMs) {
      return true;
    }

    this.lastByEventType[eventType] = now;
    return false;
  }

  recordIntentMarker(intentType, targetNode) {
    this.currentIntentSeq += 1;
    this.record("event", {
      eventType: "intent_marker",
      intentType,
      intentSeq: this.currentIntentSeq,
      target: getNodePath(targetNode)
    });
  }

  getSafeMutationInnerHTML(mutation) {
    if (!mutation || mutation.type !== "childList" || !(mutation.target instanceof Element)) {
      return null;
    }

    const target = mutation.target;
    if (isSensitiveNode(target, this.policy)) {
      this.redactionStats.maskedMutationValues += 1;
      return "[redacted]";
    }

    const rawHtml = String(target.innerHTML || "");
    if (utf8ByteLength(rawHtml) > this.limits.maxMutationHtmlBytes) {
      this.redactionStats.truncatedMutationHtml += 1;
      return null;
    }

    return sanitizeFragmentHtml(rawHtml, {
      allowScripts: false,
      policy: this.policy,
      maskText: true,
      removeBlocked: false
    });
  }

  attachMutationObserver() {
    this.mutationObserver = new MutationObserver((mutationRecords) => {
      mutationRecords.forEach((mutation) => {
        if (this.shouldIgnoreNode(mutation.target) || isSensitiveNode(mutation.target, this.policy)) {
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

        const oldValue = getMutationOldValue(mutation, this.policy);
        const newValue = getMutationNewValue(mutation, this.policy);
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
          addedNodes: Array.from(mutation.addedNodes || []).map((node) =>
            serializeNodeWithPolicy(node, this.policy, this.redactionStats, this.limits.maxMutationHtmlBytes)
          ),
          removedNodes: Array.from(mutation.removedNodes || []).map((node) =>
            serializeNodeWithPolicy(node, this.policy, this.redactionStats, this.limits.maxMutationHtmlBytes)
          )
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
        if (this.shouldIgnoreNode(event.target) || isSensitiveNode(event.target, this.policy)) {
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
          if (now - this.lastMousemoveAt < this.limits.mousemoveSampleMs) {
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
          if (this.shouldDebounce(eventName, this.limits.inputDebounceMs)) {
            return;
          }

          const rawValue = getInputValue(event.target, false, this.policy);
          const maskedValue = getInputValue(event.target, this.policy.maskAllInputs, this.policy);
          if (rawValue !== maskedValue) {
            this.redactionStats.maskedInputEvents += 1;
          }

          this.record("event", {
            ...common,
            value: maskedValue
          });
          this.recordIntentMarker(eventName, event.target);
          return;
        }

        if (eventName === "scroll") {
          if (this.shouldDebounce("scroll", this.limits.scrollDebounceMs)) {
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
}

function createRedactionStats() {
  return {
    maskedInputEvents: 0,
    maskedMutationValues: 0,
    redactedSerializedNodes: 0,
    blockedNodeEvents: 0,
    blockedMutations: 0,
    truncatedMutationHtml: 0
  };
}

function toSelectorList(value, fallback) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim());
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return Array.isArray(fallback) ? [...fallback] : [];
}

function getSnapshotHtmlForRecording(policy) {
  const cloned = document.documentElement.cloneNode(true);
  if (!(cloned instanceof Element)) {
    return document.documentElement.outerHTML;
  }

  sanitizeDomTree(cloned, {
    allowScripts: false,
    policy,
    maskText: true,
    removeBlocked: true
  });

  return cloned.outerHTML;
}

function getMutationOldValue(mutation, policy) {
  if (!mutation) {
    return null;
  }

  if (mutation.type === "attributes") {
    if (isSensitiveNode(mutation.target, policy)) {
      return "[redacted]";
    }
    return mutation.oldValue;
  }

  if (mutation.type === "characterData") {
    if (isSensitiveNode(mutation.target, policy)) {
      return "[redacted]";
    }
    return mutation.oldValue;
  }

  return null;
}

function getMutationNewValue(mutation, policy) {
  if (!mutation) {
    return null;
  }

  if (mutation.type === "attributes" && mutation.target instanceof Element && mutation.attributeName) {
    if (isSensitiveNode(mutation.target, policy)) {
      return "[redacted]";
    }
    return mutation.target.getAttribute(mutation.attributeName);
  }

  if (mutation.type === "characterData") {
    if (isSensitiveNode(mutation.target, policy)) {
      return "[redacted]";
    }
    return mutation.target.textContent;
  }

  return null;
}

function serializeNodeWithPolicy(node, policy, redactionStats, maxMutationHtmlBytes) {
  if (!node) {
    return null;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const shouldRedact = isSensitiveNode(node, policy);
    if (shouldRedact) {
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
    const shouldRedact = isSensitiveNode(node, policy);
    if (shouldRedact) {
      if (redactionStats) {
        redactionStats.redactedSerializedNodes += 1;
      }
      return {
        nodeType: "element",
        tagName: node.tagName,
        path: getNodePath(node),
        outerHTML: "[redacted]"
      };
    }

    const sanitizedOuterHtml = sanitizeFragmentHtml(node.outerHTML, {
      allowScripts: false,
      policy,
      maskText: true,
      removeBlocked: false
    });

    if (utf8ByteLength(sanitizedOuterHtml) > maxMutationHtmlBytes) {
      if (redactionStats) {
        redactionStats.truncatedMutationHtml += 1;
      }
      return {
        nodeType: "element",
        tagName: node.tagName,
        path: getNodePath(node),
        outerHTML: null
      };
    }

    return {
      nodeType: "element",
      tagName: node.tagName,
      path: getNodePath(node),
      outerHTML: sanitizedOuterHtml
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

function getInputValue(target, maskInputValue, policy) {
  const isValid =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;

  if (!isValid) {
    return null;
  }

  if (target instanceof HTMLSelectElement) {
    return target.value;
  }

  const shouldMask = Boolean(maskInputValue) || isSensitiveInput(target, policy);
  if (shouldMask) {
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

function getIframeSummary(shouldIgnoreNode) {
  return Array.from(document.querySelectorAll("iframe"))
    .filter((iframe) => !(typeof shouldIgnoreNode === "function" && shouldIgnoreNode(iframe)))
    .map((iframe) => ({
      target: getNodePath(iframe),
      src: normalizeRecordedIframeSrc(iframe.getAttribute("src") || ""),
      currentSrc: normalizeRecordedIframeSrc(iframe.currentSrc || iframe.src || ""),
      title: iframe.getAttribute("title") || "",
      sameOrigin: isSameOriginUrl(iframe.currentSrc || iframe.src || iframe.getAttribute("src") || "")
    }));
}

function normalizeRecordedIframeSrc(url) {
  const text = String(url || "").trim();
  if (!text || text === "about:blank") {
    return "";
  }

  try {
    return new URL(text, window.location.href).href;
  } catch {
    return text;
  }
}

function isSameOriginUrl(url) {
  const normalized = normalizeRecordedIframeSrc(url);
  if (!normalized) {
    return true;
  }

  try {
    return new URL(normalized, window.location.href).origin === window.location.origin;
  } catch {
    return false;
  }
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
  const policy = options.policy || {
    maskAllInputs: true,
    blockSelectors: DEFAULT_BLOCK_SELECTORS,
    maskTextSelectors: DEFAULT_MASK_TEXT_SELECTORS
  };
  const maskText = Boolean(options.maskText);
  const removeBlocked = options.removeBlocked !== false;

  root.querySelectorAll("[autofocus]").forEach((node) => node.removeAttribute("autofocus"));

  if (removeBlocked) {
    removeBlockedNodes(root, policy);
  }

  maskSensitiveInputs(root, policy);
  if (maskText) {
    maskSensitiveText(root, policy);
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

        if (name.startsWith("on") || isJavascriptUrlAttribute(name, value)) {
          node.removeAttribute(attribute.name);
        }
      });
    });
  }
}

function removeBlockedNodes(root, policy) {
  const selectors = toSelectorList(policy && policy.blockSelectors, []);
  if (!selectors.length) {
    return;
  }

  const query = selectors.join(", ");
  try {
    root.querySelectorAll(query).forEach((node) => node.remove());
  } catch {
    // no-op
  }
}

function maskSensitiveInputs(root, policy) {
  const fields = Array.from(root.querySelectorAll("input, textarea, select"));
  fields.forEach((field) => {
    if (field instanceof HTMLSelectElement) {
      if (isSensitiveNode(field, policy)) {
        field.selectedIndex = -1;
      }
      return;
    }

    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
        return;
      }

      const shouldMask = Boolean(policy && policy.maskAllInputs) || isSensitiveInput(field, policy);
      if (shouldMask) {
        field.value = "*".repeat(String(field.value || "").length);
      }
    }
  });
}

function maskSensitiveText(root, policy) {
  const selectors = toSelectorList(policy && policy.maskTextSelectors, []);
  if (!selectors.length) {
    return;
  }

  const query = selectors.join(", ");
  let nodes = [];
  try {
    nodes = Array.from(root.querySelectorAll(query));
  } catch {
    return;
  }

  nodes.forEach((node) => {
    const doc = node.ownerDocument || document;
    const view = doc.defaultView || window;
    const nodeFilter = view.NodeFilter || NodeFilter;
    const walker = doc.createTreeWalker(node, nodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
      if (String(textNode.textContent || "").trim()) {
        textNode.textContent = "[redacted]";
      }
    });
  });
}

function isSensitiveNode(node, policy) {
  if (!node) {
    return false;
  }

  const element = node instanceof Element ? node : node.parentElement;
  if (!element) {
    return false;
  }

  const selectors = toSelectorList(policy && policy.blockSelectors, []);
  if (!selectors.length) {
    return false;
  }

  try {
    return Boolean(element.closest(selectors.join(", ")));
  } catch {
    return false;
  }
}

function isSensitiveInput(target, policy) {
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return false;
  }

  if (isSensitiveNode(target, policy)) {
    return true;
  }

  if (target instanceof HTMLInputElement) {
    const inputType = String(target.type || "").toLowerCase();
    if (["password", "email", "tel"].includes(inputType)) {
      return true;
    }
  }

  const name = String(target.name || "").toLowerCase();
  const id = String(target.id || "").toLowerCase();
  return /password|passwd|token|secret|otp|ssn/.test(`${name} ${id}`);
}

function isJavascriptUrlAttribute(name, value) {
  if (!name || !value) {
    return false;
  }

  if (!["href", "src", "xlink:href", "formaction", "action"].includes(name)) {
    return false;
  }

  return /^javascript:/i.test(value);
}

function utf8ByteLength(value) {
  const text = String(value || "");
  try {
    return new TextEncoder().encode(text).length;
  } catch {
    return text.length;
  }
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
