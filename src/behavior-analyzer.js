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
  const meaningfulSubmits = submits.filter((event) => !String(event.data?.target || "").includes("dialog"));
  const actionClicks = clicks.filter((event) => /가입하기|이체 확인|이벤트 참여|예상 금액 보기|검색|신청|확인/.test(String(event.data?.text || "")));
  const navigationIntents = interactionEvents.filter((event) => event.data?.eventType === "navigation_intent");
  const viewStates = interactionEvents.filter((event) => event.data?.eventType === "view_state");
  const journeyContext = getJourneyContext({ events, interactionEvents, clicks, submits, viewStates });

  const maxScrollTop = maxOf(scrolls, (event) => Number(event.data?.scrollTop) || 0);
  const uniqueTargets = new Set(interactionEvents.map((event) => event.data?.target).filter(Boolean)).size;
  const clickTargets = countBy(clicks, (event) => event.data?.target || "unknown");
  const repeatedClickTargets = Object.values(clickTargets).filter((count) => count >= 3).length;

  const inputTargets = countBy(inputs, (event) => event.data?.target || "unknown");
  const topInputTargets = Object.entries(inputTargets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([target, count]) => ({ target, count }));

  const totalMouseDistance = computeMouseDistance(mouseMoves);
  const rapidClickBursts = countRapidClickBursts(clicks, 1400, 3);
  const scrollDepthScore = clampScore(maxScrollTop / 1800);
  const durationScore = clampScore(durationMs / 90000);
  const clickScore = clampScore(clicks.length / 18);
  const targetDiversityScore = clampScore(uniqueTargets / 12);
  const mutationScore = clampScore(mutationEvents.length / 28);
  const formScore = clampScore(inputs.length / 8);
  const completionScore = meaningfulSubmits.length > 0 || actionClicks.length > 0 ? 1 : 0;
  const navigationScore = clampScore(navigationIntents.length / 3);
  const frictionClickScore = clampScore((rapidClickBursts * 0.45) + (repeatedClickTargets * 0.25));
  const rawBounceRiskScore = ((durationMs < 12000 ? 1 : 0) * 0.48) + ((interactionEvents.length < 8 ? 1 : 0) * 0.34) + ((maxScrollTop < 250 ? 1 : 0) * 0.18);

  const metrics = {
    engagementScore: score((durationScore * 0.28) + (clickScore * 0.24) + (scrollDepthScore * 0.22) + (targetDiversityScore * 0.18) + (mutationScore * 0.08)),
    explorationScore: score((scrollDepthScore * 0.34) + (targetDiversityScore * 0.3) + (clickScore * 0.2) + (navigationScore * 0.16)),
    goalIntentScore: score((formScore * 0.34) + (completionScore * 0.28) + (navigationScore * 0.14) + (clickScore * 0.14) + (mutationScore * 0.1)),
    purchaseIntentScore: score((formScore * 0.34) + (completionScore * 0.28) + (navigationScore * 0.14) + (clickScore * 0.14) + (mutationScore * 0.1)),
    frictionScore: score((frictionClickScore * 0.44) + ((inputs.length >= 8 && completionScore === 0 ? 1 : 0) * 0.24) + ((durationMs > 60000 && completionScore === 0 ? 1 : 0) * 0.16) + (repeatedClickTargets > 0 ? 0.16 : 0)),
    formIntentScore: score((formScore * 0.72) + (completionScore * 0.28)),
    conversionScore: score((completionScore * 0.76) + (formScore * 0.24)),
    bounceRiskScore: score(rawBounceRiskScore * (completionScore ? 0.25 : 1))
  };

  const customerType = classifyCustomer(metrics, {
    durationMs,
    submits: meaningfulSubmits.length + actionClicks.length,
    inputs: inputs.length,
    rapidClickBursts,
    journeyContext
  });

  const behaviorSignals = {
    shortBounce: durationMs < 12000 && interactionEvents.length < 8,
    heavyExploration: maxScrollTop > 500 && mouseMoves.length > 30,
    formIntent: inputs.length >= 4,
    completion: completionScore > 0,
    hesitation: inputs.length >= 8 && completionScore === 0,
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
    repeatedClickTargets,
    navigationIntents: navigationIntents.length,
    journeyContext,
    topInputTargets,
    submits: submits.length,
    meaningfulSubmits: meaningfulSubmits.length,
    actionClicks: actionClicks.length,
    labels,
    behaviorSignals,
    metrics,
    customerType
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
    "Define a precise Korean customer type from this session. Do not choose only from predefined categories.",
    "Avoid abstract labels such as '목적 행동 완료형 고객' or 'goal-directed user'. Name the actual goal shown in the session, such as 이체 완료 고객, 금융상품 가입 검토 고객, 환전 준비 고객, 혜택 이벤트 확인 고객, 카드 사용내역 확인 고객, or 고객센터 문제 해결 고객.",
    "Use marketer-friendly Korean wording. Avoid developer terms unless they are in evidence fields.",
    "Interpret goal intent according to the financial app screen context. For example, transfer form completion is transaction execution intent, not purchase intent.",
    "Use the quantitative metrics, journeyContext, and customerType candidates as strong evidence, but override them if the raw event summary suggests a better interpretation.",
    "Output valid JSON only (no markdown fences).",
    "Schema:",
    '{"customer_type_name":"구체적인 한국어 고객 유형명","customer_type_description":"마케터가 이해할 수 있는 한국어 설명","secondary_traits":["한국어 보조 특성"],"confidence":0-1,"why_this_type":["한국어 판단 이유"],"evidence":["한국어 근거"]}',
    "Session summary:",
    JSON.stringify(summary, null, 2)
  ].join("\n");
}

function classifyCustomer(metrics, context) {
  const goalIntentScore = metrics.goalIntentScore ?? metrics.purchaseIntentScore;
  const contextCandidate = getContextCandidate(metrics, context, goalIntentScore);
  const candidates = [
    contextCandidate,
    getGoalDirectedCandidate(metrics, context, goalIntentScore),
    {
      type: "comparison_explorer",
      labelKo: "서비스 비교 탐색 고객",
      score: score((metrics.explorationScore * 0.48) + (metrics.engagementScore * 0.28) + ((1 - metrics.conversionScore) * 0.14) + (goalIntentScore * 0.1))
    },
    {
      type: "hesitant_form_user",
      labelKo: "입력 후 망설이는 고객",
      score: score((metrics.formIntentScore * 0.42) + ((1 - metrics.conversionScore) * 0.26) + (metrics.frictionScore * 0.2) + (metrics.engagementScore * 0.12))
    },
    {
      type: "frustrated_user",
      labelKo: "마찰을 겪는 고객",
      score: score((metrics.frictionScore * 0.58) + (metrics.engagementScore * 0.18) + ((context.rapidClickBursts > 0 ? 1 : 0) * 0.24))
    },
    {
      type: "low_engagement_bouncer",
      labelKo: "저관여 이탈 위험 고객",
      score: score((metrics.bounceRiskScore * 0.62) + ((1 - metrics.engagementScore) * 0.28) + ((1 - goalIntentScore) * 0.1))
    }
  ].filter(Boolean).sort((a, b) => b.score - a.score);
  const uniqueCandidates = dedupeCandidates(candidates);

  const primary = uniqueCandidates[0] || { type: "neutral", labelKo: "중립 고객", score: 0 };

  return {
    primaryType: primary.type,
    primaryLabelKo: primary.labelKo,
    confidence: score(primary.score),
    candidates: uniqueCandidates.slice(0, 5),
    reasonCodes: buildReasonCodes(metrics, context)
  };
}

function dedupeCandidates(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = candidate.labelKo || candidate.type;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildReasonCodes(metrics, context) {
  const reasons = [];
  const goalIntentScore = metrics.goalIntentScore ?? metrics.purchaseIntentScore;
  if (goalIntentScore >= 0.65) {
    reasons.push("goal_intent_high");
  }
  if (metrics.explorationScore >= 0.65) {
    reasons.push("exploration_high");
  }
  if (metrics.frictionScore >= 0.55) {
    reasons.push("friction_detected");
  }
  if (metrics.bounceRiskScore >= 0.6) {
    reasons.push("bounce_risk_high");
  }
  if (context.submits > 0) {
    reasons.push("goal_completed");
  } else if (context.inputs > 0) {
    reasons.push("form_started_without_submit");
  }
  if (context.journeyContext?.isTransferFlow) {
    reasons.push("transfer_flow");
  }
  if (context.journeyContext?.isProductFlow) {
    reasons.push("product_flow");
  }
  if (context.journeyContext?.isExchangeFlow) {
    reasons.push("exchange_flow");
  }
  if (context.journeyContext?.isSupportFlow) {
    reasons.push("support_flow");
  }
  if (context.journeyContext?.isBenefitFlow) {
    reasons.push("benefit_flow");
  }
  if (context.journeyContext?.isCardFlow) {
    reasons.push("card_flow");
  }
  if (context.journeyContext?.isAssetFlow) {
    reasons.push("asset_flow");
  }
  return reasons.length ? reasons : ["neutral_behavior"];
}

function getContextCandidate(metrics, context, goalIntentScore) {
  const journey = context.journeyContext || {};
  const completionBoost = context.submits > 0 ? 1 : 0;

  if (journey.isTransferFlow) {
    return {
      type: completionBoost ? "transaction_executor" : "transaction_intent_user",
      labelKo: completionBoost ? "이체 완료 고객" : "이체 준비 고객",
      score: score((goalIntentScore * 0.34) + (metrics.conversionScore * 0.28) + (metrics.formIntentScore * 0.22) + (metrics.engagementScore * 0.08) + (completionBoost * 0.08))
    };
  }

  if (journey.isExchangeFlow) {
    return {
      type: completionBoost ? "exchange_execution_user" : "exchange_planning_user",
      labelKo: completionBoost ? "환전 신청 완료 고객" : "환전 준비 고객",
      score: score((goalIntentScore * 0.36) + (metrics.formIntentScore * 0.24) + (metrics.conversionScore * 0.22) + (metrics.engagementScore * 0.1) + (completionBoost * 0.08))
    };
  }

  if (journey.isSupportFlow) {
    return {
      type: "support_seeking_user",
      labelKo: "고객센터 문제 해결 고객",
      score: score((metrics.explorationScore * 0.28) + (goalIntentScore * 0.24) + (metrics.formIntentScore * 0.22) + (metrics.engagementScore * 0.16) + (completionBoost * 0.1))
    };
  }

  if (journey.isProductFlow) {
    return {
      type: completionBoost ? "product_application_intent_user" : "product_consideration_user",
      labelKo: completionBoost ? "상품 가입 버튼 클릭 고객" : "상품 비교 검토 고객",
      score: score((goalIntentScore * 0.38) + (metrics.explorationScore * 0.22) + (metrics.engagementScore * 0.18) + (metrics.conversionScore * 0.14) + (completionBoost * 0.08))
    };
  }

  if (journey.isBenefitFlow) {
    return {
      type: completionBoost ? "benefit_participation_user" : "benefit_event_checking_user",
      labelKo: completionBoost ? "이벤트 참여 고객" : "혜택 이벤트 확인 고객",
      score: score((goalIntentScore * 0.34) + (metrics.explorationScore * 0.26) + (metrics.engagementScore * 0.18) + (metrics.conversionScore * 0.14) + (completionBoost * 0.08))
    };
  }

  if (journey.isCardFlow) {
    return {
      type: "card_usage_checking_user",
      labelKo: "카드 사용내역 확인 고객",
      score: score((metrics.explorationScore * 0.3) + (goalIntentScore * 0.26) + (metrics.engagementScore * 0.24) + (metrics.conversionScore * 0.12) + (completionBoost * 0.08))
    };
  }

  if (journey.isAssetFlow) {
    return {
      type: "spending_insight_checking_user",
      labelKo: "자산·소비 점검 고객",
      score: score((metrics.explorationScore * 0.34) + (metrics.engagementScore * 0.28) + (goalIntentScore * 0.2) + (metrics.conversionScore * 0.1) + (completionBoost * 0.08))
    };
  }

  return null;
}

function getGoalDirectedCandidate(metrics, context, goalIntentScore) {
  const completed = context.submits > 0;
  return {
    type: "goal_directed_completer",
    labelKo: getConcreteCustomerLabel(context, completed),
    score: score((goalIntentScore * 0.42) + (metrics.conversionScore * 0.28) + (metrics.engagementScore * 0.18) + ((completed ? 1 : 0) * 0.12))
  };
}

function getConcreteCustomerLabel(context, completed) {
  const journey = context.journeyContext || {};
  if (journey.isTransferFlow) {
    return completed ? "이체 완료 고객" : "이체 진행 의도 고객";
  }
  if (journey.isExchangeFlow) {
    return completed ? "환전 신청 완료 고객" : "환전 준비 고객";
  }
  if (journey.isSupportFlow) {
    return completed ? "고객 문의 접수 고객" : "고객센터 문제 해결 고객";
  }
  if (journey.isProductFlow) {
    return completed ? "상품 가입 버튼 클릭 고객" : "금융상품 비교 검토 고객";
  }
  if (journey.isBenefitFlow) {
    return completed ? "이벤트 참여 고객" : "혜택 이벤트 확인 고객";
  }
  if (journey.isCardFlow) {
    return "카드 사용내역 확인 고객";
  }
  if (journey.isAssetFlow) {
    return "자산·소비 점검 고객";
  }
  return completed ? "서비스 실행 고객" : "서비스 이용 의도 고객";
}

function getJourneyContext({ events, interactionEvents, clicks, submits, viewStates }) {
  const screens = viewStates
    .map((event) => String(event.data?.screenName || "").trim())
    .filter(Boolean);
  const lastScreen = screens[screens.length - 1] || inferScreenFromEvents({ events, interactionEvents, clicks, submits });
  const screenCounts = countBy(screens, (screen) => screen);
  const clickTexts = clicks
    .map((event) => String(event.data?.text || "").trim())
    .filter(Boolean)
    .slice(-12);
  const submitTargets = submits.map((event) => event.data?.target || "").filter(Boolean);
  const screenText = [lastScreen, ...screens, ...clickTexts, ...submitTargets].join(" ").toLowerCase();

  return {
    screens,
    lastScreen,
    screenCounts,
    clickTexts,
    submitTargets,
    isTransferFlow: /transfer|이체|송금/.test(screenText),
    isProductFlow: /products|product-list|상품|예금|적금|대출|펀드|isa|irp|청약/.test(screenText),
    isExchangeFlow: /exchange|환전|usd|jpy|eur/.test(screenText),
    isSupportFlow: /support|고객센터|상담|faq|문의/.test(screenText),
    isBenefitFlow: /benefits|event-detail|혜택|이벤트|포인트/.test(screenText),
    isCardFlow: /cards|카드|결제|실적/.test(screenText),
    isAssetFlow: /assets|자산|소비|지출/.test(screenText)
  };
}

function inferScreenFromEvents({ events, interactionEvents, clicks, submits }) {
  const text = [
    ...interactionEvents.map((event) => event.data?.target || ""),
    ...clicks.map((event) => event.data?.text || ""),
    ...submits.map((event) => event.data?.target || ""),
    events?.[0]?.data?.url || ""
  ].join(" ").toLowerCase();

  if (/transfer|이체|송금/.test(text)) {
    return "transfer";
  }
  if (/exchange|환전/.test(text)) {
    return "exchange";
  }
  if (/support|고객센터|상담|faq|문의/.test(text)) {
    return "support";
  }
  if (/benefits|event-detail|혜택|이벤트|포인트/.test(text)) {
    return "benefits";
  }
  if (/cards|카드|결제|실적/.test(text)) {
    return "cards";
  }
  if (/assets|자산|소비|지출/.test(text)) {
    return "assets";
  }
  if (/product|상품|예금|적금|대출|펀드|isa|irp|청약/.test(text)) {
    return "products";
  }
  return "";
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

function score(value) {
  return Number(clampScore(value).toFixed(2));
}

function clampScore(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return 0;
  }
  return Math.max(0, Math.min(1, num));
}
