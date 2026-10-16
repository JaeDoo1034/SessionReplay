(function sdkControlPage() {
  "use strict";

  var projectInput = document.getElementById("projectIdInput");
  var sessionNameInput = document.getElementById("sessionNameInput");
  var refreshButton = document.getElementById("refreshButton");
  var clientList = document.getElementById("clientList");
  var activeCount = document.getElementById("activeCount");
  var recordingCount = document.getElementById("recordingCount");
  var lastUpdated = document.getElementById("lastUpdated");
  var embedSnippet = document.getElementById("embedSnippet");
  var clients = [];

  refreshButton.addEventListener("click", refreshClients);
  projectInput.addEventListener("input", function onProjectInput() {
    updateSnippet();
    renderClients();
  });
  sessionNameInput.addEventListener("input", renderClients);

  clientList.addEventListener("click", function onClientAction(event) {
    var button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }
    sendCommand(button.dataset.clientId, button.dataset.action);
  });

  updateSnippet();
  refreshClients();
  setInterval(refreshClients, 5000);

  function refreshClients() {
    refreshButton.disabled = true;
    fetch("/api/sdk-control/clients?limit=100")
      .then(parseJson)
      .then(function onLoaded(response) {
        clients = Array.isArray(response.clients) ? response.clients : [];
        renderClients();
      })
      .catch(function onError(error) {
        clientList.innerHTML = '<p class="empty-state">클라이언트 목록을 불러오지 못했습니다. ' + escapeHtml(error.message || "") + "</p>";
      })
      .finally(function done() {
        refreshButton.disabled = false;
      });
  }

  function renderClients() {
    var projectId = normalizeProjectId();
    var visible = clients.filter(function byProject(client) {
      return client.projectId === projectId;
    });
    var now = Date.now();

    activeCount.textContent = String(visible.filter(function isActive(client) {
      return now - Number(client.lastSeenAt || 0) < 15000;
    }).length);
    recordingCount.textContent = String(visible.filter(function isRecording(client) {
      return client.recordingState === "recording";
    }).length);
    lastUpdated.textContent = formatTime(now);

    if (!visible.length) {
      clientList.innerHTML = [
        '<div class="empty-state">',
        "<strong>아직 연결된 화면이 없습니다.</strong>",
        "<span>대상 사이트에 SDK 스니펫을 심고 페이지를 열면 이곳에 표시됩니다.</span>",
        "</div>"
      ].join("");
      return;
    }

    clientList.innerHTML = visible.map(renderClientCard).join("");
  }

  function renderClientCard(client) {
    var status = getStatus(client);
    var sessionName = sessionNameInput.value.trim();
    var safeName = escapeHtml(sessionName || "이름 없이 저장");
    return [
      '<article class="client-card">',
      '  <div class="client-main">',
      '    <div class="client-title-row">',
      '      <span class="state-dot ' + status.className + '"></span>',
      '      <strong>' + escapeHtml(status.label) + "</strong>",
      "    </div>",
      '    <a href="' + escapeHtml(client.pageUrl || "#") + '" target="_blank" rel="noreferrer">' + escapeHtml(client.pageUrl || "URL 없음") + "</a>",
      '    <dl class="client-meta">',
      "      <div><dt>Client</dt><dd>" + escapeHtml(shortId(client.clientId)) + "</dd></div>",
      "      <div><dt>User</dt><dd>" + escapeHtml(client.userId || "-") + "</dd></div>",
      "      <div><dt>Session</dt><dd>" + escapeHtml(shortId(client.sessionId || "-")) + "</dd></div>",
      "      <div><dt>Last seen</dt><dd>" + escapeHtml(formatRelative(client.lastSeenAt)) + "</dd></div>",
      "    </dl>",
      "  </div>",
      '  <div class="client-actions" aria-label="' + escapeHtml(client.clientId) + ' 제어">',
      '    <button type="button" data-action="start" data-client-id="' + escapeHtml(client.clientId) + '">녹화 시작</button>',
      '    <button type="button" data-action="stop" data-client-id="' + escapeHtml(client.clientId) + '">중지</button>',
      '    <button type="button" data-action="save" data-client-id="' + escapeHtml(client.clientId) + '">저장</button>',
      '    <span>저장 이름: ' + safeName + "</span>",
      "  </div>",
      "</article>"
    ].join("");
  }

  function sendCommand(clientId, action) {
    var body = {
      projectId: normalizeProjectId(),
      clientId: clientId,
      action: action,
      sessionName: sessionNameInput.value.trim()
    };

    fetch("/api/sdk-control/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(parseJson)
      .then(function onCreated() {
        refreshClients();
      })
      .catch(function onError(error) {
        alert("명령 전송 실패: " + (error.message || error));
      });
  }

  function updateSnippet() {
    var origin = location.origin;
    var projectId = normalizeProjectId();
    embedSnippet.textContent = [
      '<script',
      '  src="' + origin + '/sdk/session-replay-deploy-sdk.js"',
      '  data-project-id="' + projectId + '"',
      '  data-user-id="tester-001"',
      '  data-endpoint-base="' + origin + '">',
      "</script>"
    ].join("\n");
  }

  function normalizeProjectId() {
    return projectInput.value.trim() || "external-demo";
  }

  function parseJson(response) {
    return response.text().then(function parse(text) {
      var json = text ? JSON.parse(text) : {};
      if (!response.ok) {
        throw new Error(json.error || text || "HTTP " + response.status);
      }
      return json;
    });
  }

  function getStatus(client) {
    if (client.recordingState === "recording") {
      return { label: "녹화 중", className: "is-recording" };
    }
    if (client.recordingState === "saved") {
      return { label: "저장 완료", className: "is-saved" };
    }
    if (client.recordingState === "stopped") {
      return { label: "중지됨", className: "is-stopped" };
    }
    return { label: "대기 중", className: "is-ready" };
  }

  function formatTime(value) {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(value));
  }

  function formatRelative(value) {
    var diff = Math.max(0, Date.now() - Number(value || 0));
    if (diff < 10000) {
      return "방금 전";
    }
    if (diff < 60000) {
      return Math.round(diff / 1000) + "초 전";
    }
    if (diff < 3600000) {
      return Math.round(diff / 60000) + "분 전";
    }
    return formatTime(value);
  }

  function shortId(value) {
    var text = String(value || "");
    if (text.length <= 14) {
      return text;
    }
    return text.slice(0, 8) + "..." + text.slice(-4);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
