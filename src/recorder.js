const DEFAULT_EVENTS = ["click", "mousemove", "input", "change", "submit", "scroll"];

export class SessionRecorder {
  constructor(options = {}) {
    this.root = options.root || document;
    this.eventsToRecord = options.events || DEFAULT_EVENTS;
    this.shouldMaskInputValue = options.maskInputValue ?? false;
    this.mousemoveSampleMs = options.mousemoveSampleMs ?? 40;

    this.isRecording = false;
    this.startedAt = 0;
    this.events = [];
    this.sequence = 0;

    this.mutationObserver = null;
    this.boundEventHandlers = [];
    this.lastMousemoveAt = 0;
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
      html: document.documentElement.outerHTML
    });

    this.attachMutationObserver();
    this.attachEventListeners();
  }

  stop() {
    if (!this.isRecording) {
      return;
    }

    this.detachMutationObserver();
    this.detachEventListeners();

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
          const target = event.target;
          const value = getInputValue(target, this.shouldMaskInputValue);
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
            scrollTop: target?.scrollTop ?? window.scrollY,
            scrollLeft: target?.scrollLeft ?? window.scrollX
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

      this.boundEventHandlers.push({
        target,
        eventName,
        handler
      });
    });
  }

  detachEventListeners() {
    this.boundEventHandlers.forEach(({ target, eventName, handler }) => {
      target.removeEventListener(eventName, handler, true);
    });

    this.boundEventHandlers = [];
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
  if (!target || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
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
