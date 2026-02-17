export class SessionReplayer {
  constructor(options = {}) {
    this.iframe = options.iframe;
    this.onStatus = options.onStatus || (() => {});

    this.payload = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentIndex = 0;
    this.speed = 1;
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

    const replayEvents = this.payload.events.filter((event) => event.type === "mutation" || event.type === "event");
    if (!replayEvents.length) {
      this.onStatus("No replayable events found.");
      this.isPlaying = false;
      return;
    }

    this.renderSnapshot(snapshot.data.html, () => {
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

  renderSnapshot(rawHtml, onReady) {
    if (!this.iframe) {
      throw new Error("iframe is required");
    }

    const sanitized = sanitizeDocumentHtml(rawHtml);
    this.iframe.onload = () => {
      if (typeof onReady === "function") {
        onReady();
      }
      this.iframe.onload = null;
    };
    this.iframe.srcdoc = sanitized;
  }

  applyEvent(event) {
    const doc = this.iframe.contentDocument;
    if (!doc) {
      return;
    }

    if (event.type === "mutation") {
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
  }, 250);
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
  pointer.style.transform = "translate(-50%, -50%) scale(1)";

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
    ripple.style.transform = "translate(-50%, -50%) scale(2.7)";
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
    segment.style.background = "rgba(239, 68, 68, 0.45)";
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
  pointer.style.transform = "translate(-50%, -50%) scale(1)";

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
  if (isNearFullWidth || isNearFullHeight) {
    return false;
  }

  return true;
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
  pointer.style.transform = "translate(-50%, -50%) scale(0.9)";
  pointer.style.opacity = "0";
  pointer.style.transition = "opacity 120ms ease, transform 120ms ease";

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

function sanitizeDocumentHtml(rawHtml) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(String(rawHtml || ""), "text/html");
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

  root.querySelectorAll("script").forEach((node) => node.remove());

  root
    .querySelectorAll("link[rel='preload'], link[rel='modulepreload'], link[rel='prefetch']")
    .forEach((node) => node.remove());

  root.querySelectorAll("[autofocus]").forEach((node) => node.removeAttribute("autofocus"));

  root.querySelectorAll("*").forEach((node) => {
    Array.from(node.attributes || []).forEach((attr) => {
      const name = String(attr.name || "").toLowerCase();
      const value = String(attr.value || "").trim().toLowerCase();

      if (name.startsWith("on")) {
        node.removeAttribute(attr.name);
        return;
      }

      const isSrcLike = name === "src" || name === "href" || name === "xlink:href";
      if (isSrcLike && value.startsWith("javascript:")) {
        node.removeAttribute(attr.name);
      }
    });
  });
}
