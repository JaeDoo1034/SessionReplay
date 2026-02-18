const DEFAULT_EVENTS = ["click", "mousemove", "input", "change", "submit", "scroll"];
const DEFAULT_NAVIGATION_EVENTS = [
  "hashchange",
  "popstate",
  "beforeunload",
  "pagehide",
  "pageshow",
  "visibilitychange"
];

export class SessionRecorder {
  constructor(options = {}) {
    this.root = options.root || document;
    this.eventsToRecord = options.events || DEFAULT_EVENTS;
    this.shouldMaskInputValue = options.maskInputValue ?? false;
    this.mousemoveSampleMs = options.mousemoveSampleMs ?? 40;
    this.shouldIgnoreNode = options.shouldIgnoreNode || (() => false);
    this.navigationEventsToRecord = options.navigationEvents || DEFAULT_NAVIGATION_EVENTS;

    this.isRecording = false;
    this.startedAt = 0;
    this.events = [];
    this.sequence = 0;

    this.mutationObserver = null;
    this.boundEventHandlers = [];
    this.boundNavigationHandlers = [];
    this.lastMousemoveAt = 0;

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
      html: getSnapshotHtmlForRecording(this.shouldIgnoreNode)
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
          targetInnerHTML:
            mutation.type === "childList" && mutation.target instanceof Element
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
          const value = getInputValue(event.target, this.shouldMaskInputValue);
          this.record("event", {
            ...common,
            value
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

    const sameTagSiblings = Array.from(parent.children).filter(
      (child) => child.tagName === current.tagName
    );
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

function getSnapshotHtmlForRecording(shouldIgnoreNode) {
  const cloned = document.documentElement.cloneNode(true);
  if (!(cloned instanceof Element)) {
    return document.documentElement.outerHTML;
  }

  if (typeof shouldIgnoreNode === "function") {
    const nodes = Array.from(cloned.querySelectorAll("*"));
    nodes.forEach((node) => {
      if (shouldIgnoreNode(node)) {
        node.remove();
      }
    });
  }

  return cloned.outerHTML;
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
