(function sessionReplayDeploySdkFactory(global) {
  "use strict";

  var currentScript = document.currentScript;
  var DEFAULT_CONTROL_INTERVAL_MS = 3000;
  var handledCommands = {};
  var heartbeatTimer = 0;
  var heartbeatInFlight = false;
  var baseReadyPromise = null;

  var config = {
    projectId: readData("projectId", "external-demo"),
    userId: readData("userId", ""),
    endpointBase: normalizeBase(readData("endpointBase", getScriptOrigin())),
    baseSdkSrc: readData("baseSdkSrc", ""),
    clientId: readData("clientId", ""),
    sessionName: readData("sessionName", ""),
    controlIntervalMs: Math.max(1000, Number(readData("controlIntervalMs", DEFAULT_CONTROL_INTERVAL_MS)) || DEFAULT_CONTROL_INTERVAL_MS),
    autoStartRecording: readData("autoStartRecording", "false") === "true",
    maskAllInputs: readData("maskAllInputs", "true") !== "false",
    enabledEvents: readData("enabledEvents", "click,input,change,submit,scroll,navigation,dialog,mutation")
  };

  if (!config.clientId) {
    config.clientId = loadClientId(config.projectId);
  }
  if (!config.baseSdkSrc) {
    config.baseSdkSrc = config.endpointBase + "/sdk/session-replay-sdk.js";
  }

  var api = {
    version: "1.0.0-deploy-sdk",
    startControl: startControl,
    stopControl: stopControl,
    heartbeat: sendHeartbeat,
    getClientId: function getClientId() {
      return config.clientId;
    },
    getConfig: function getConfig() {
      return clone(config);
    }
  };

  global.SessionReplayDeploySDK = api;
  startControl();

  function startControl() {
    loadBaseSdk().then(function onBaseReady(base) {
      configureBase(base);
      if (config.autoStartRecording && !base.isRecording()) {
        base.start();
      }
      sendHeartbeat();
      global.clearInterval(heartbeatTimer);
      heartbeatTimer = global.setInterval(sendHeartbeat, config.controlIntervalMs);
    }).catch(function onControlStartFailed(error) {
      warn("control start failed", error);
    });
    return api;
  }

  function stopControl() {
    global.clearInterval(heartbeatTimer);
    heartbeatTimer = 0;
    return api;
  }

  function sendHeartbeat() {
    if (heartbeatInFlight) {
      return Promise.resolve({ ok: false, skipped: true });
    }

    heartbeatInFlight = true;
    return loadBaseSdk()
      .then(function onBaseReady(base) {
        return postJson("/api/sdk-control/clients/heartbeat", buildClientMeta(base));
      })
      .then(function onHeartbeat(response) {
        var commands = Array.isArray(response.commands) ? response.commands : [];
        return runCommands(commands).then(function done() {
          return response;
        });
      })
      .catch(function onHeartbeatFailed(error) {
        warn("heartbeat failed", error);
        return { ok: false, error: String(error && error.message || error) };
      })
      .then(function finish(result) {
        heartbeatInFlight = false;
        return result;
      });
  }

  function runCommands(commands) {
    var chain = Promise.resolve();
    commands.forEach(function eachCommand(command) {
      chain = chain.then(function runNext() {
        return runCommand(command);
      });
    });
    return chain;
  }

  function runCommand(command) {
    if (!command || !command.id || handledCommands[command.id]) {
      return Promise.resolve();
    }
    handledCommands[command.id] = true;

    return loadBaseSdk()
      .then(function onBaseReady(base) {
        return executeCommand(base, command);
      })
      .then(function onCommandComplete() {
        return acknowledge(command.id, "completed", "");
      })
      .catch(function onCommandFailed(error) {
        return acknowledge(command.id, "failed", String(error && error.message || error));
      });
  }

  function executeCommand(base, command) {
    var action = String(command.action || "");
    var payload = command.payload && typeof command.payload === "object" ? command.payload : {};
    var sessionName = String(command.sessionName || payload.sessionName || config.sessionName || "").trim();

    if (action === "configure") {
      base.configure(payload.config || payload);
      return Promise.resolve();
    }

    if (sessionName) {
      base.configure({ sessionName: sessionName });
    }

    if (action === "start") {
      base.start();
      return Promise.resolve();
    }

    if (action === "pause" || action === "stop") {
      return Promise.resolve(base.pause());
    }

    if (action === "save") {
      return Promise.resolve(base.save({ sessionName: sessionName }));
    }

    return Promise.reject(new Error("unsupported command action"));
  }

  function acknowledge(commandId, status, error) {
    return postJson("/api/sdk-control/commands/" + encodeURIComponent(commandId) + "/ack", {
      clientId: config.clientId,
      status: status,
      error: error || ""
    });
  }

  function loadBaseSdk() {
    if (global.SessionReplaySDK) {
      return Promise.resolve(global.SessionReplaySDK);
    }
    if (baseReadyPromise) {
      return baseReadyPromise;
    }

    baseReadyPromise = new Promise(function load(resolve, reject) {
      var script = document.createElement("script");
      script.src = config.baseSdkSrc;
      script.async = true;
      script.dataset.projectId = config.projectId;
      script.dataset.userId = config.userId;
      script.dataset.endpointBase = config.endpointBase;
      script.dataset.autoStart = "false";
      script.dataset.sessionName = config.sessionName;
      script.dataset.maskAllInputs = config.maskAllInputs ? "true" : "false";
      script.dataset.enabledEvents = config.enabledEvents;
      script.onload = function onLoad() {
        if (!global.SessionReplaySDK) {
          reject(new Error("SessionReplaySDK was not loaded"));
          return;
        }
        resolve(global.SessionReplaySDK);
      };
      script.onerror = function onError() {
        reject(new Error("failed to load base session replay SDK"));
      };
      document.head.appendChild(script);
    });

    return baseReadyPromise;
  }

  function configureBase(base) {
    base.configure({
      projectId: config.projectId,
      userId: config.userId,
      endpointBase: config.endpointBase,
      sessionName: config.sessionName,
      maskAllInputs: config.maskAllInputs,
      enabledEvents: parseEnabledEvents(config.enabledEvents)
    });
  }

  function buildClientMeta(base) {
    return {
      clientId: config.clientId,
      projectId: config.projectId,
      userId: config.userId,
      pageUrl: location.href,
      origin: location.origin,
      userAgent: navigator.userAgent,
      sdkVersion: api.version + " / " + String(base.version || "base-unknown"),
      recordingState: typeof base.getRecordingState === "function" ? base.getRecordingState() : "unknown",
      sessionId: typeof base.getSessionId === "function" ? base.getSessionId() : ""
    };
  }

  function postJson(pathname, body) {
    return fetch(config.endpointBase + pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body || {}),
      keepalive: true
    }).then(function parse(response) {
      return response.text().then(function parseText(text) {
        var json = parseJson(text);
        if (!response.ok) {
          throw new Error((json && json.error) || text || ("HTTP " + response.status));
        }
        return json || {};
      });
    });
  }

  function loadClientId(projectId) {
    var key = "sessionReplayDeployClientId:" + projectId;
    try {
      var existing = global.localStorage && global.localStorage.getItem(key);
      if (existing) {
        return existing;
      }
      var created = createId();
      global.localStorage.setItem(key, created);
      return created;
    } catch (_error) {
      return createId();
    }
  }

  function createId() {
    if (global.crypto && typeof global.crypto.randomUUID === "function") {
      return global.crypto.randomUUID();
    }
    return "sr_client_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
  }

  function getScriptOrigin() {
    try {
      return currentScript && currentScript.src ? new URL(currentScript.src, location.href).origin : location.origin;
    } catch (_error) {
      return location.origin;
    }
  }

  function normalizeBase(value) {
    return String(value || "").replace(/\/$/, "");
  }

  function readData(name, fallback) {
    if (!currentScript || !currentScript.dataset) {
      return fallback;
    }
    return currentScript.dataset[name] === undefined ? fallback : currentScript.dataset[name];
  }

  function parseJson(text) {
    if (!text) {
      return null;
    }
    try {
      return JSON.parse(text);
    } catch (_error) {
      return null;
    }
  }

  function parseEnabledEvents(value) {
    var output = {
      click: false,
      input: false,
      change: false,
      submit: false,
      scroll: false,
      navigation: false,
      dialog: false,
      mutation: false,
      mousemove: false
    };
    String(value || "")
      .split(",")
      .map(function trim(item) {
        return item.trim();
      })
      .filter(Boolean)
      .forEach(function enable(name) {
        output[name] = true;
      });
    return output;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function warn(message, error) {
    if (global.console && typeof global.console.warn === "function") {
      global.console.warn("[SessionReplayDeploySDK]", message, error || "");
    }
  }
})(window);
