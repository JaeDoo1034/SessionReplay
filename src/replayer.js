export class SessionReplayer {
  constructor(options = {}) {
    this.iframe = options.iframe;
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

    this.stageEl = options.stageEl || this.iframe?.parentElement || null;
    this.canvasEl = null;
    this.handleWindowResize = () => this.updateViewportScale();

    this.mountStage();
  }

  mountStage() {
    if (!this.iframe) {
      return;
    }

    if (this.iframe.hasAttribute("sandbox")) {
      this.iframe.removeAttribute("sandbox");
    }

    if (this.stageEl) {
      this.stageEl.style.overflow = this.stageEl.style.overflow || "auto";
      this.stageEl.style.display = this.stageEl.style.display || "flex";
      this.stageEl.style.justifyContent = this.stageEl.style.justifyContent || "center";
      this.stageEl.style.alignItems = this.stageEl.style.alignItems || "flex-start";
      this.stageEl.style.padding = this.stageEl.style.padding || "12px";
      this.stageEl.style.background = this.stageEl.style.background || "#f8fafc";
    }

    const existingCanvas = this.iframe.closest(".sr-replay-canvas");
    if (existingCanvas) {
      this.canvasEl = existingCanvas;
    } else {
      const canvas = document.createElement("div");
      canvas.className = "sr-replay-canvas";
      canvas.style.position = "relative";
      canvas.style.background = "#fff";
      canvas.style.boxShadow = "0 0 0 1px #d1d5db";
      canvas.style.transformOrigin = "top left";

      const parent = this.stageEl || this.iframe.parentElement;
      if (parent) {
        parent.insertBefore(canvas, this.iframe);
        canvas.appendChild(this.iframe);
        this.canvasEl = canvas;
      }
    }

    this.iframe.style.display = "block";
    this.iframe.style.border = "0";
    this.iframe.style.background = "#fff";

    window.addEventListener("resize", this.handleWindowResize);
  }

  destroy() {
    this.stop();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  hasPayload() {
    return Boolean(this.payload && Array.isArray(this.payload.events));
  }

  setApplyMutationEvents(enabled) {
    this.applyMutationEvents = Boolean(enabled);
    return this.applyMutationEvents;
  }

  load(payload) {
    if (!payload || !Array.isArray(payload.events)) {
      throw new Error("invalid payload format");
    }

    this.payload = payload;
    this.currentIndex = 0;
    this.onStatus(`Replay loaded. events=${payload.events.length}`);
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

    this.setViewport(snapshot.data.viewport);

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

  setViewport(viewport) {
    const width = Number(viewport && viewport.width);
    const height = Number(viewport && viewport.height);

    if (width > 0 && height > 0) {
      this.viewport = { width, height };
    }

    this.updateViewportScale();
  }

  updateViewportScale() {
    if (!this.iframe || !this.canvasEl || !this.stageEl) {
      return;
    }

    const viewportWidth = Math.max(1, Number(this.viewport.width) || 1);
    const viewportHeight = Math.max(1, Number(this.viewport.height) || 1);
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
      this.updateViewportScale();
      if (typeof onReady === "function") {
        onReady();
      }
      this.iframe.onload = null;
    };
    this.iframe.srcdoc = sanitized;
  }

  applyEvent(event) {
    if (!this.iframe) {
      return;
    }

    const doc = this.iframe.contentDocument;
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
    target.textContent = data.newValue ?? "";
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
    anchor.addEventListener("click", preventDefault, {
      capture: true,
      once: true
    });
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
  if (!doc || typeof data?.x !== "number" || typeof data?.y !== "number") {
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

  setTimeout(() => {
    ripple.remove();
  }, 260);
}

function showMouseMovePath(doc, data) {
  if (!doc || typeof data?.x !== "number" || typeof data?.y !== "number") {
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

    setTimeout(() => {
      segment.remove();
    }, 240);
  }

  pointer.style.left = `${x}px`;
  pointer.style.top = `${y}px`;
  pointer.style.opacity = "1";

  layer.dataset.lastX = String(x);
  layer.dataset.lastY = String(y);
}

function mapPointerPosition(doc, data) {
  const replayWidth = doc.documentElement?.clientWidth || doc.defaultView?.innerWidth;
  const replayHeight = doc.documentElement?.clientHeight || doc.defaultView?.innerHeight;
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
    isElementNode(target, doc) &&
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
    return {
      x: data.x,
      y: data.y
    };
  }

  return {
    x: (data.x / recordedWidth) * replayWidth,
    y: (data.y / recordedHeight) * replayHeight
  };
}

function shouldUseTargetRelativeMapping(target, data, viewportWidth, viewportHeight) {
  const tag = target.tagName?.toLowerCase();
  if (tag === "html" || tag === "body") {
    return false;
  }

  if (!viewportWidth || !viewportHeight) {
    return true;
  }

  const targetWidth = Number(data.targetWidth);
  const targetHeight = Number(data.targetHeight);
  const isNearFullWidth = targetWidth >= viewportWidth * 0.92;
  const isNearFullHeight = targetHeight >= viewportHeight * 0.92;

  return !(isNearFullWidth || isNearFullHeight);
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

function isElementNode(node, doc) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  const win = doc?.defaultView;
  if (!win || typeof win.Element !== "function") {
    return true;
  }

  return node instanceof win.Element;
}
