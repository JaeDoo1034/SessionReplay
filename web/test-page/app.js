const productCategories = [
  { id: "checking", icon: "입", label: "입출금", description: "월급, 생활비, 자동이체 관리" },
  { id: "deposit", icon: "예", label: "예금", description: "목돈을 안정적으로 운용" },
  { id: "savings", icon: "적", label: "적금", description: "목표 금액을 꾸준히 달성" },
  { id: "loan", icon: "대", label: "대출", description: "신용, 전월세, 주택 자금" },
  { id: "subscription", icon: "청", label: "청약상품", description: "내 집 마련 준비" },
  { id: "fund", icon: "펀", label: "펀드", description: "전문가가 운용하는 투자" },
  { id: "isa", icon: "I", label: "ISA", description: "절세형 통합 투자 계좌" },
  { id: "irp", icon: "연", label: "IRP", description: "퇴직연금과 세액공제" }
];

const products = {
  checking: [
    { id: "checking-main", name: "ON 주거래 통장", summary: "급여 이체와 생활비 관리를 한 계좌에서", rate: "수수료 0원", tags: ["급여", "생활비", "ATM"] },
    { id: "checking-pocket", name: "포켓 생활비 통장", summary: "식비, 교통비, 쇼핑비를 목적별로 분리", rate: "쪼개기", tags: ["예산", "자동분류", "알림"] },
    { id: "checking-global", name: "글로벌 입출금 통장", summary: "외화 결제와 환전을 자주 쓰는 고객용", rate: "환율 우대", tags: ["외화", "여행", "카드"] }
  ],
  deposit: [
    { id: "deposit-plus", name: "ON 플러스 정기예금", summary: "목돈을 안정적으로 굴리고 싶은 고객에게 적합", rate: "연 3.85%", tags: ["목돈", "비대면", "만기알림"] },
    { id: "deposit-ladder", name: "만기 분산 예금", summary: "만기를 나눠 금리와 유동성을 함께 관리", rate: "연 3.60%", tags: ["분산", "자동재예치", "안정형"] },
    { id: "deposit-green", name: "ESG 안심 예금", summary: "친환경 프로젝트와 연계된 안정형 예금", rate: "연 3.45%", tags: ["ESG", "안정", "우대"] }
  ],
  savings: [
    { id: "savings-youth", name: "청년 성장 적금", summary: "목표 금액 달성 시 리워드를 더하는 적금", rate: "연 5.20%", tags: ["청년", "목표", "리워드"] },
    { id: "savings-daily", name: "매일 모으기 적금", summary: "소액 자동 저축으로 소비 후 잔돈을 모음", rate: "연 4.10%", tags: ["소액", "자동저축", "습관"] },
    { id: "savings-family", name: "가족 여행 적금", summary: "가족 공동 목표를 함께 채우는 적금", rate: "연 4.40%", tags: ["공동목표", "여행", "초대"] }
  ],
  loan: [
    { id: "loan-credit", name: "ON 직장인 신용대출", summary: "서류 없이 예상 한도와 금리를 바로 확인", rate: "최저 4.91%", tags: ["비대면", "한도조회", "직장인"] },
    { id: "loan-rent", name: "전월세 보증금 대출", summary: "계약서 촬영으로 필요한 자금을 빠르게 준비", rate: "최저 3.98%", tags: ["전월세", "보증금", "간편심사"] },
    { id: "loan-home", name: "주택담보대출 갈아타기", summary: "기존 대출 조건과 비교해 절감액을 계산", rate: "비교하기", tags: ["주담대", "갈아타기", "절감"] }
  ],
  subscription: [
    { id: "subscription-home", name: "주택청약종합저축", summary: "내 집 마련 준비를 위한 기본 청약 상품", rate: "청약 기본", tags: ["청약", "주택", "장기"] },
    { id: "subscription-youth", name: "청년 우대 청약저축", summary: "조건 충족 시 우대 혜택을 더하는 청약 상품", rate: "우대형", tags: ["청년", "우대", "소득공제"] },
    { id: "subscription-guide", name: "청약 점수 관리", summary: "가점과 납입 회차를 한 화면에서 관리", rate: "관리", tags: ["가점", "납입", "알림"] }
  ],
  fund: [
    { id: "fund-global", name: "글로벌 성장주 펀드", summary: "장기 성장 산업에 분산 투자하는 펀드", rate: "위험 4", tags: ["글로벌", "성장", "분산"] },
    { id: "fund-income", name: "월지급 인컴 펀드", summary: "배당과 채권 수익을 월 단위로 관리", rate: "위험 3", tags: ["배당", "채권", "월지급"] },
    { id: "fund-ai", name: "AI 테마 셀렉트 펀드", summary: "AI 반도체와 소프트웨어 테마에 투자", rate: "위험 5", tags: ["AI", "테마", "고위험"] }
  ],
  isa: [
    { id: "isa-basic", name: "ON 중개형 ISA", summary: "예금, 펀드, ETF를 한 계좌에서 절세 운용", rate: "절세", tags: ["ISA", "ETF", "절세"] },
    { id: "isa-model", name: "모델 포트폴리오 ISA", summary: "투자 성향에 맞춘 자산 배분을 제안", rate: "추천형", tags: ["포트폴리오", "성향", "리밸런싱"] },
    { id: "isa-safe", name: "안정형 ISA 예금랩", summary: "예금 중심으로 절세 혜택을 챙기는 상품", rate: "안정형", tags: ["예금", "절세", "저위험"] }
  ],
  irp: [
    { id: "irp-core", name: "ON 퇴직연금 IRP", summary: "세액공제와 노후 준비를 함께 관리", rate: "세액공제", tags: ["IRP", "연금", "절세"] },
    { id: "irp-etf", name: "ETF IRP 포트폴리오", summary: "장기 투자용 ETF를 연금 계좌에서 운용", rate: "장기투자", tags: ["ETF", "연금", "리밸런싱"] },
    { id: "irp-safe", name: "원리금보장 IRP", summary: "원리금보장 상품 중심의 보수적 운용", rate: "안정형", tags: ["보장", "안정", "퇴직금"] }
  ]
};

const events = [
  {
    id: "event-salary",
    title: "급여이체 고객 최대 2만P",
    period: "2026.06.01 - 2026.07.31",
    summary: "첫 급여이체와 자동이체 등록을 완료하면 포인트를 적립합니다.",
    bullets: ["급여 입금 1회 이상", "공과금 자동이체 1건 등록", "조건 달성 다음 달 15일 포인트 지급"]
  },
  {
    id: "event-travel",
    title: "여름 환전 90% 우대",
    period: "2026.06.20 - 2026.08.31",
    summary: "달러, 엔화, 유로 환전 시 우대율과 여행 보험 쿠폰을 제공합니다.",
    bullets: ["앱에서 환전 신청", "공항 수령 또는 지점 수령 선택", "여행 카드 결제 시 추가 캐시백"]
  },
  {
    id: "event-invest",
    title: "첫 펀드 가입 리워드",
    period: "2026.06.10 - 2026.07.15",
    summary: "펀드 첫 가입 고객에게 투자 성향 분석과 포인트 혜택을 제공합니다.",
    bullets: ["투자성향 분석 완료", "펀드 10만원 이상 가입", "위험등급 확인 후 가입 필요"]
  }
];

const spending = [
  { label: "식비·카페", amount: "642,800원", percent: 76 },
  { label: "쇼핑", amount: "418,300원", percent: 58 },
  { label: "교통·차량", amount: "284,100원", percent: 42 },
  { label: "구독·콘텐츠", amount: "92,400원", percent: 24 }
];

let currentScreen = "home";
let currentCategory = "deposit";
let currentProduct = null;
let recentViewed = ["deposit-plus", "loan-credit", "savings-youth"];
let sessionStatusText = "Ready";
let latestSavedSessionCount = 0;
const activityFeed = [];
const bankActionLog = [];

const screenTitle = document.getElementById("screen-title");
const productCategoriesEl = document.getElementById("product-categories");
const productListTitle = document.getElementById("product-list-title");
const productListEl = document.getElementById("product-list");
const recentProductList = document.getElementById("recent-product-list");
const eventListEl = document.getElementById("event-list");
const eventTitle = document.getElementById("event-title");
const eventDetailCard = document.getElementById("event-detail-card");
const spendingBars = document.getElementById("spending-bars");
const productDialog = document.getElementById("product-dialog");
const dialogProductTitle = document.getElementById("dialog-product-title");
const dialogProductDescription = document.getElementById("dialog-product-description");
const dialogProductTags = document.getElementById("dialog-product-tags");
const cardSheet = document.getElementById("card-sheet");
const sessionPopoverToggle = document.getElementById("session-popover-toggle");
const sessionPopover = document.getElementById("session-popover");
const sessionPopoverClose = document.getElementById("session-popover-close");
const sessionStatus = document.getElementById("session-status");
const sessionStarted = document.getElementById("session-started");
const sessionId = document.getElementById("session-id");
const sessionQueue = document.getElementById("session-queue");
const sessionSaved = document.getElementById("session-saved");
const sessionStart = document.getElementById("session-start");
const sessionStop = document.getElementById("session-stop");
const sessionFlush = document.getElementById("session-flush");
const eventSelectDefault = document.getElementById("event-select-default");
const eventOptions = Array.from(document.querySelectorAll("[data-event-option]"));
const activityFeedEl = document.getElementById("activity-feed");
const bankActionLogEl = document.getElementById("bank-action-log");

document.addEventListener("click", (event) => {
  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) {
    showScreen(screenButton.dataset.screen);
    logBankAction("Screen opened", screenButton.textContent.trim() || screenButton.dataset.screen);
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    openProductCategory(categoryButton.dataset.category);
    return;
  }

  const productButton = event.target.closest("[data-product-id]");
  if (productButton) {
    openProductDetail(productButton.dataset.productId);
    return;
  }

  const quickAction = event.target.closest("[data-action]");
  if (quickAction) {
    logBankAction("Quick action", quickAction.textContent.trim());
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-flow-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(form);
  const filledFields = Array.from(formData.entries())
    .filter(([, value]) => String(value || "").trim())
    .map(([key]) => key);
  logBankAction("Form submitted", `${form.dataset.flowForm} · ${filledFields.join(", ") || "empty"}`);
});

document.getElementById("notice-button").addEventListener("click", () => {
  showScreen("support");
  logBankAction("Notice opened", "읽지 않은 알림 3개");
});

document.getElementById("account-detail").addEventListener("click", () => {
  logBankAction("Account detail opened", "ON 주거래 통장 12,486,320원");
});

document.getElementById("open-card-sheet").addEventListener("click", (event) => {
  event.stopPropagation();
  showScreen("cards");
  logBankAction("Card sheet opened", "ON 체크카드");
});

document.getElementById("clear-recent").addEventListener("click", () => {
  recentViewed = [];
  renderRecentProducts();
  logBankAction("Recent products cleared", "최근 본 상품 비움");
});

document.getElementById("use-points").addEventListener("click", () => {
  logBankAction("Benefit points opened", "48,730P");
});

document.getElementById("toggle-spending").addEventListener("click", () => {
  spendingBars.classList.toggle("expanded");
  logBankAction("Spending detail toggled", spendingBars.classList.contains("expanded") ? "상세 ON" : "상세 OFF");
});

document.getElementById("favorite-product").addEventListener("click", () => {
  if (!currentProduct) {
    return;
  }
  logBankAction("Product favorited", currentProduct.name);
});

document.getElementById("apply-product").addEventListener("click", () => {
  if (!currentProduct) {
    return;
  }
  logBankAction("Product apply clicked", currentProduct.name);
});

sessionPopoverToggle.addEventListener("click", () => {
  openSessionPopover();
});

sessionPopoverClose.addEventListener("click", () => {
  closeSessionPopover();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sessionPopover.hidden) {
    closeSessionPopover();
  }
});

sessionFlush.addEventListener("click", async () => {
  const sdk = window.SessionReplaySDK;
  if (!sdk || typeof sdk.save !== "function") {
    sessionStatusText = "SDK unavailable";
    refreshSessionPanel();
    return;
  }

  sessionStatusText = "Saving";
  refreshSessionPanel();

  try {
    await sdk.save();
    sessionStatusText = "Saved";
    logActivity("Session saved", sdk.getSessionId ? sdk.getSessionId() : "");
    await refreshSavedSessions();
  } catch (error) {
    sessionStatusText = "Save failed";
    logActivity("Save failed", error.message || "Unknown error");
  } finally {
    refreshSessionPanel();
  }
});

eventOptions.forEach((input) => {
  input.addEventListener("change", () => {
    applyEventSelection();
    logActivity("Event filter changed", getSelectedEventNames().join(", "));
    refreshSessionPanel();
  });
});

eventSelectDefault.addEventListener("click", () => {
  const defaultEvents = ["click", "input", "change", "submit", "scroll", "navigation", "dialog", "mutation"];
  eventOptions.forEach((input) => {
    input.checked = defaultEvents.includes(input.dataset.eventOption);
  });
  applyEventSelection();
  logActivity("Event filter reset", defaultEvents.join(", "));
  refreshSessionPanel();
});

sessionStart.addEventListener("click", () => {
  startRecording();
});

sessionStop.addEventListener("click", () => {
  stopRecording();
});

function startRecording() {
  const sdk = window.SessionReplaySDK;
  if (!sdk || typeof sdk.start !== "function") {
    sessionStatusText = "SDK unavailable";
    refreshSessionPanel();
    return;
  }

  applyEventSelection();
  sdk.start();
  sessionStatusText = "Recording";
  logActivity("Recording started", `${sdk.getSessionId ? sdk.getSessionId() : ""} · ${getSelectedEventNames().join(", ")}`);
  refreshSessionPanel();
}

async function stopRecording() {
  const sdk = window.SessionReplaySDK;
  if (!sdk || typeof sdk.pause !== "function") {
    sessionStatusText = "SDK unavailable";
    refreshSessionPanel();
    return;
  }

  sessionStatusText = "Stopping";
  refreshSessionPanel();

  try {
    await sdk.pause();
    sessionStatusText = "Stopped";
    logActivity("Recording stopped", "Save를 누르면 viewer에서 종료된 세션으로 볼 수 있습니다.");
  } catch (error) {
    sessionStatusText = "Stop failed";
    logActivity("Stop failed", error.message || "Unknown error");
  } finally {
    refreshSessionPanel();
  }
}

renderProductCategories();
renderEvents();
renderSpending();
applyEventSelection();
showScreen("home");
logActivity("Page opened", "Ready. Start를 누르면 그 순간부터 기록됩니다.");
logBankAction("Home opened", "ON 주거래 통장");
refreshSessionPanel();
refreshSavedSessions();
window.setInterval(refreshSessionPanel, 1200);

function showScreen(screenName) {
  currentScreen = screenName;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.view === screenName);
  });

  document.querySelectorAll("[data-screen]").forEach((button) => {
    const selected = button.dataset.screen === screenName;
    button.classList.toggle("active", selected);
  });

  const titles = {
    home: "김온유님의 금융 홈",
    accounts: "전체 계좌",
    transfer: "빠른 이체",
    products: "상품몰",
    "product-list": `${getCategoryLabel(currentCategory)} 상품`,
    benefits: "혜택몰",
    "event-detail": "이벤트 안내",
    assets: "자산·소비",
    cards: "카드",
    exchange: "환전",
    support: "고객센터"
  };
  screenTitle.textContent = titles[screenName] || "ON Bank";
  trackViewState(screenName);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function trackViewState(screenName) {
  const sdk = window.SessionReplaySDK;
  if (!sdk || typeof sdk.track !== "function" || (typeof sdk.isRecording === "function" && !sdk.isRecording())) {
    return;
  }

  sdk.track("view_state", {
    screenName,
    title: screenTitle.textContent,
    activeSelector: `.screen[data-view="${screenName}"]`,
    scrollTop: window.scrollY
  });
}

function openProductCategory(categoryId) {
  currentCategory = categoryId;
  productListTitle.textContent = `${getCategoryLabel(categoryId)} 상품`;
  renderProductList();
  renderRecentProducts();
  showScreen("product-list");
  logBankAction("Product category opened", getCategoryLabel(categoryId));
}

function renderProductCategories() {
  productCategoriesEl.innerHTML = "";

  productCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = category.id;
    button.innerHTML = `
      <b>${escapeHtml(category.icon)}</b>
      <strong>${escapeHtml(category.label)}</strong>
      <span>${escapeHtml(category.description)}</span>
    `;
    productCategoriesEl.appendChild(button);
  });
}

function renderProductList() {
  const list = products[currentCategory] || [];
  productListEl.innerHTML = "";

  list.forEach((product) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "product-card";
    button.dataset.productId = product.id;
    button.innerHTML = `
      <div>
        <span>${escapeHtml(getCategoryLabel(currentCategory))}</span>
        <strong>${escapeHtml(product.name)}</strong>
        <small>${escapeHtml(product.summary)}</small>
      </div>
      <em class="rate-pill">${escapeHtml(product.rate)}</em>
    `;
    productListEl.appendChild(button);
  });
}

function renderRecentProducts() {
  recentProductList.innerHTML = "";
  const recentProducts = recentViewed.map(findProductById).filter(Boolean);

  if (!recentProducts.length) {
    const empty = document.createElement("button");
    empty.type = "button";
    empty.innerHTML = "<strong>최근 본 상품 없음</strong><span>상품을 선택하면 이곳에 표시됩니다.</span>";
    recentProductList.appendChild(empty);
    return;
  }

  recentProducts.forEach((product) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.productId = product.id;
    button.innerHTML = `
      <strong>${escapeHtml(product.name)}</strong>
      <span>${escapeHtml(product.rate)} · ${escapeHtml(product.summary)}</span>
    `;
    recentProductList.appendChild(button);
  });
}

function openProductDetail(productId) {
  const product = findProductById(productId);
  if (!product) {
    return;
  }

  currentProduct = product;
  recentViewed = [product.id, ...recentViewed.filter((id) => id !== product.id)].slice(0, 5);
  renderRecentProducts();

  dialogProductTitle.textContent = product.name;
  dialogProductDescription.textContent = product.summary;
  dialogProductTags.innerHTML = product.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  productDialog.showModal();
  logBankAction("Product detail opened", product.name);
}

function renderEvents() {
  eventListEl.innerHTML = "";

  events.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "event-card";
    button.innerHTML = `
      <div>
        <span>${escapeHtml(item.period)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.summary)}</small>
      </div>
      <em>상세보기</em>
    `;
    button.addEventListener("click", () => openEventDetail(item.id));
    eventListEl.appendChild(button);
  });
}

function openEventDetail(eventId) {
  const item = events.find((eventItem) => eventItem.id === eventId);
  if (!item) {
    return;
  }

  eventTitle.textContent = item.title;
  eventDetailCard.innerHTML = `
    <div class="event-banner">
      <span>${escapeHtml(item.period)}</span>
      <strong>${escapeHtml(item.title)}</strong>
    </div>
    <p>${escapeHtml(item.summary)}</p>
    <ul>
      ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
    </ul>
    <button type="button" id="join-event">이벤트 참여</button>
  `;
  eventDetailCard.querySelector("#join-event").addEventListener("click", () => {
    logBankAction("Event joined", item.title);
  });

  showScreen("event-detail");
  logBankAction("Event detail opened", item.title);
}

function renderSpending() {
  spendingBars.innerHTML = "";

  spending.forEach((item) => {
    const row = document.createElement("div");
    row.className = "spending-item";
    row.innerHTML = `
      <div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.amount)}</span></div>
      <div class="spending-track"><span style="width:${item.percent}%"></span></div>
    `;
    spendingBars.appendChild(row);
  });
}

function findProductById(productId) {
  return Object.values(products).flat().find((product) => product.id === productId);
}

function getCategoryLabel(categoryId) {
  return productCategories.find((category) => category.id === categoryId)?.label || "금융";
}

function openSessionPopover() {
  const nextOpen = sessionPopover.hidden;
  sessionPopover.hidden = !nextOpen;
  sessionPopoverToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
  if (nextOpen) {
    refreshSessionPanel();
    refreshSavedSessions();
  }
}

function closeSessionPopover() {
  sessionPopover.hidden = true;
  sessionPopoverToggle.setAttribute("aria-expanded", "false");
}

function getSelectedEventNames() {
  return eventOptions
    .filter((input) => input.checked)
    .map((input) => input.dataset.eventOption);
}

function getSelectedEventMap() {
  return eventOptions.reduce((acc, input) => {
    acc[input.dataset.eventOption] = input.checked;
    return acc;
  }, {});
}

function applyEventSelection() {
  const sdk = window.SessionReplaySDK;
  if (!sdk || typeof sdk.configure !== "function") {
    return;
  }

  sdk.configure({
    enabledEvents: getSelectedEventMap()
  });
}

function setEventOptionsDisabled(disabled) {
  eventOptions.forEach((input) => {
    input.disabled = disabled;
  });
  eventSelectDefault.disabled = disabled;
}

function logActivity(title, detail = "") {
  activityFeed.unshift({
    title,
    detail,
    time: new Date()
  });

  if (activityFeed.length > 8) {
    activityFeed.length = 8;
  }

  renderActivityFeed();
}

function renderActivityFeed() {
  activityFeedEl.innerHTML = "";

  activityFeed.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.detail)} · ${item.time.toLocaleTimeString()}</span>
    `;
    activityFeedEl.appendChild(li);
  });
}

function logBankAction(title, detail = "") {
  bankActionLog.unshift({
    title,
    detail,
    time: new Date()
  });

  if (bankActionLog.length > 9) {
    bankActionLog.length = 9;
  }

  renderBankActionLog();
}

function renderBankActionLog() {
  bankActionLogEl.innerHTML = "";

  bankActionLog.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.detail)} · ${item.time.toLocaleTimeString()}</span>
    `;
    bankActionLogEl.appendChild(li);
  });
}

function refreshSessionPanel() {
  const sdk = window.SessionReplaySDK;
  const currentSessionId = sdk && typeof sdk.getSessionId === "function" ? sdk.getSessionId() : "";
  const queueSize = sdk && typeof sdk.getQueueSize === "function" ? sdk.getQueueSize() : 0;
  const recordingState = sdk && typeof sdk.getRecordingState === "function"
    ? sdk.getRecordingState()
    : (sdk && typeof sdk.isRecording === "function" && sdk.isRecording() ? "recording" : (currentSessionId ? "stopped" : "ready"));
  const isRecording = recordingState === "recording";
  const startedAt = sdk && typeof sdk.getStartedAt === "function" ? sdk.getStartedAt() : 0;
  const statusLabels = {
    ready: "Ready",
    recording: "Recording",
    stopped: "Stopped",
    saved: "Saved"
  };
  const statusText = statusLabels[recordingState] || "Ready";

  sessionStatus.textContent = ["Recording", "Stopped", "Ready", "Saved"].includes(sessionStatusText)
    ? statusText
    : sessionStatusText;
  sessionStarted.textContent = startedAt ? new Date(startedAt).toLocaleTimeString() : "-";
  sessionId.textContent = currentSessionId || "-";
  sessionQueue.textContent = `${queueSize} events`;
  sessionSaved.textContent = `${latestSavedSessionCount} sessions`;
  sessionStart.disabled = Boolean(isRecording) || Boolean(currentSessionId && recordingState !== "saved");
  sessionStop.disabled = !isRecording;
  sessionFlush.disabled = !currentSessionId || isRecording || recordingState === "saved";
  setEventOptionsDisabled(Boolean(isRecording));

  sessionPopoverToggle.classList.toggle("is-recording", Boolean(isRecording));
  sessionPopoverToggle.classList.toggle("is-stopped", recordingState === "stopped");
  sessionPopoverToggle.classList.toggle("is-saved", recordingState === "saved");
  sessionPopoverToggle.innerHTML = `<span></span>${statusText}`;
}

async function refreshSavedSessions() {
  try {
    const response = await fetch("/api/replay/sessions?limit=20");
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Session API failed");
    }
    latestSavedSessionCount = Array.isArray(json.sessions) ? json.sessions.length : 0;
  } catch {
    latestSavedSessionCount = 0;
  }
  refreshSessionPanel();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
