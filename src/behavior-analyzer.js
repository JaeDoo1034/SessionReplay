export function analyzeBehavior(payload) {
  const events = Array.isArray(payload?.events) ? payload.events : [];
  const interactionEvents = events.filter((event) => event.type === "event");
  const mutationEvents = events.filter((event) => event.type === "mutation");

  const byEventType = countBy(interactionEvents, (event) => event.data?.eventType || "unknown");
  const durationMs = Math.max(0, ...events.map((event) => Number(event.timeOffsetMs) || 0));

  const clicks = interactionEvents.filter((event) => event.data?.eventType === "click");
  const mouseMoves = interactionEvents.filter((event) => event.data?.eventType === "mousemove");
  const inputs = interactionEvents.filter((event) => event.data?.eventType === "input" || event.data?.eventType === "change");
  const scrolls = interactionEvents.filter((event) => event.data?.eventType === "scroll");
  const submits = interactionEvents.filter((event) => event.data?.eventType === "submit");

  const maxScrollTop = maxOf(scrolls, (event) => Number(event.data?.scrollTop) || 0);
  const uniqueTargets = new Set(interactionEvents.map((event) => event.data?.target).filter(Boolean)).size;

  const inputTargets = countBy(inputs, (event) => event.data?.target || "unknown");
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
