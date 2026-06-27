import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { analyzeBehavior } from "./behavior-analyzer.js";
import { createReplayStore } from "./replay-db.js";
import { createPostgresReplayStore } from "./replay-postgres-db.js";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn("[warn] OPENAI_API_KEY is missing. /api/llm-analyze will fail until you set it.");
}

const llm = apiKey
  ? new ChatOpenAI({
      apiKey,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.1
    })
  : null;

const LLMGraphState = Annotation.Root({
  summary: Annotation(),
  prompt: Annotation(),
  llmOutput: Annotation(),
  result: Annotation(),
  customerResultKo: Annotation(),
  customerSummaryKo: Annotation(),
  customerSummaryRaw: Annotation()
});

const llmGraph = new StateGraph(LLMGraphState)
  .addNode("build_prompt", async (state) => {
    const summary = state.summary || {};
    const prompt = state.prompt || buildPromptFromSummary(summary);
    return {
      summary,
      prompt
    };
  })
  .addNode("call_model", async (state) => {
    if (!llm) {
      throw new Error("OPENAI_API_KEY is required for /api/llm-analyze");
    }
    const response = await llm.invoke(state.prompt);
    const content = normalizeLLMContent(response.content);
    return {
      llmOutput: content
    };
  })
  .addNode("parse_output", async (state) => {
    return {
      result: normalizePrimaryResult(parseLLMJson(state.llmOutput))
    };
  })
  .addNode("summarize_customer_ko", async (state) => {
    const summaryPrompt = buildCustomerSummaryPrompt(state.result, state.summary);
    const response = await llm.invoke(summaryPrompt);
    const raw = normalizeLLMContent(response.content);
    const parsed = normalizeCustomerResultKo(parseLLMJson(raw), state.result);

    const summaryText =
      parsed && typeof parsed.session_summary_ko === "string"
        ? parsed.session_summary_ko
        : sanitizeSingleLine(raw);

    return {
      customerSummaryRaw: raw,
      customerResultKo: parsed,
      customerSummaryKo: summaryText
    };
  })
  .addEdge("__start__", "build_prompt")
  .addEdge("build_prompt", "call_model")
  .addEdge("call_model", "parse_output")
  .addEdge("parse_output", "summarize_customer_ko")
  .addEdge("summarize_customer_ko", "__end__")
  .compile();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const replayStore = createReplayDataStore();

app.use(express.json({ limit: "25mb" }));

app.get("/", (_req, res) => {
  res.redirect("/test-ui");
});

app.get("/test-ui", (_req, res) => {
  res.sendFile(path.join(projectRoot, "web", "test-page", "index.html"));
});

app.get("/viewer", (_req, res) => {
  res.sendFile(path.join(projectRoot, "web", "replay-viewer", "index.html"));
});

app.get("/sdk/:file", (req, res) => {
  sendProjectFile(res, ["sdk", req.params.file]);
});

app.get("/src/:file", (req, res) => {
  const allowedBrowserModules = new Set(["behavior-analyzer.js", "replayer.js"]);
  if (!allowedBrowserModules.has(req.params.file)) {
    return res.status(404).send("Not found");
  }
  return sendProjectFile(res, ["src", req.params.file]);
});

app.get("/web/:section/:file", (req, res) => {
  const allowedSections = new Set(["test-page", "replay-viewer"]);
  if (!allowedSections.has(req.params.section)) {
    return res.status(404).send("Not found");
  }
  return sendProjectFile(res, ["web", req.params.section, req.params.file]);
});

app.post("/api/replay/sessions/start", async (req, res) => {
  try {
    const session = await replayStore.insertSession(req.body || {});
    return res.json({ ok: true, session });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message || "session start failed" });
  }
});

app.post("/api/replay/events/batch", async (req, res) => {
  try {
    const result = await replayStore.insertEvents(req.body || {});
    return res.json({ ok: true, ...result });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message || "event batch insert failed" });
  }
});

app.post("/api/replay/sessions/end", async (req, res) => {
  try {
    const session = await replayStore.endSession(req.body?.sessionId, req.body || {});
    return res.json({ ok: true, session });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message || "session end failed" });
  }
});

app.get("/api/replay/sessions", async (req, res) => {
  try {
    const sessions = await replayStore.listSessions(req.query.limit);
    return res.json({ ok: true, sessions });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "session list failed" });
  }
});

app.get("/api/replay/sessions/:sessionId", async (req, res) => {
  try {
    const session = await replayStore.getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ ok: false, error: "session was not found" });
    }
    return res.json({ ok: true, session });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "session read failed" });
  }
});

app.get("/api/replay/sessions/:sessionId/events", async (req, res) => {
  try {
    const session = await replayStore.getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ ok: false, error: "session was not found" });
    }
    return res.json({ ok: true, events: await replayStore.getEvents(req.params.sessionId) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "event read failed" });
  }
});

app.get("/api/replay/sessions/:sessionId/payload", async (req, res) => {
  try {
    const payload = await replayStore.getPayload(req.params.sessionId);
    if (!payload) {
      return res.status(404).json({ ok: false, error: "session was not found" });
    }
    return res.json({ ok: true, payload });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "payload read failed" });
  }
});

app.post("/api/replay/sessions/delete-all", (_req, res) => {
  deleteAllReplaySessions(res);
});

app.delete("/api/replay/sessions/:sessionId", async (req, res) => {
  try {
    const deleted = await replayStore.deleteSession(req.params.sessionId);
    if (!deleted) {
      return res.status(404).json({ ok: false, error: "session was not found" });
    }
    return res.json({ ok: true, deleted: true, sessionId: req.params.sessionId });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "session delete failed" });
  }
});

app.delete("/api/replay/sessions", (_req, res) => {
  deleteAllReplaySessions(res);
});

async function deleteAllReplaySessions(res) {
  try {
    const deletedCount = await replayStore.deleteAllSessions();
    return res.json({ ok: true, deleted: true, deletedCount });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || "all sessions delete failed" });
  }
}

app.post("/api/llm-analyze", async (req, res) => {
  try {
    const hasSummary = req.body && typeof req.body.summary === "object";
    const hasPayload = req.body && typeof req.body.payload === "object";

    let summary = req.body.summary;
    let prompt = req.body.prompt;
    const analysisInstructions = sanitizeAnalysisInstructions(req.body.analysisInstructions);

    if (!hasSummary && hasPayload) {
      const local = analyzeBehavior(req.body.payload);
      summary = local.summary;
      prompt = local.prompt;
    }

    if (!summary || typeof summary !== "object") {
      return res.status(400).json({
        error: "summary 또는 payload를 요청 본문에 포함해야 합니다."
      });
    }

    const result = await llmGraph.invoke({
      summary,
      prompt: applyAnalysisInstructions(prompt || buildPromptFromSummary(summary), analysisInstructions)
    });

    return res.json({
      ok: true,
      analysisInstructions,
      result: result.result,
      raw: result.llmOutput,
      customerResultKo: result.customerResultKo,
      customerSummaryKo: result.customerSummaryKo,
      customerSummaryRaw: result.customerSummaryRaw
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "LLM analysis failed"
    });
  }
});

const port = Number(process.env.PORT || 4173);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function getReplayDatabasePath() {
  if (process.env.SESSION_REPLAY_DB_PATH) {
    return process.env.SESSION_REPLAY_DB_PATH;
  }

  if (process.env.VERCEL) {
    return path.join("/tmp", "session-replay.sqlite");
  }

  return path.join(projectRoot, "data", "session-replay.sqlite");
}

function createReplayDataStore() {
  if (process.env.DATABASE_URL) {
    console.log("[replay-store] using Postgres database from DATABASE_URL");
    return createPostgresReplayStore(process.env.DATABASE_URL);
  }

  const databasePath = getReplayDatabasePath();
  console.log(`[replay-store] using SQLite database at ${databasePath}`);
  return createReplayStore(databasePath);
}

function sendProjectFile(res, parts) {
  const filePath = path.resolve(projectRoot, ...parts);
  if (!filePath.startsWith(projectRoot + path.sep)) {
    return res.status(403).send("Forbidden");
  }
  return res.sendFile(filePath);
}

function buildPromptFromSummary(summary) {
  return [
    "You are a UX behavior analyst.",
    "Define a precise customer type from this session. Do not choose only from predefined categories.",
    "Create a concise customer type name that best describes this user's behavior pattern.",
    "Then explain what kind of customer this is, why this type fits, and what signals support it.",
    "Output valid JSON only (no markdown fences).",
    "Schema:",
    '{"customer_type_name":"...","customer_type_description":"...","secondary_traits":["..."],"confidence":0-1,"why_this_type":["..."],"evidence":["..."]}',
    "Session summary:",
    JSON.stringify(summary, null, 2)
  ].join("\n");
}

function sanitizeAnalysisInstructions(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

function applyAnalysisInstructions(prompt, analysisInstructions) {
  if (!analysisInstructions) {
    return prompt;
  }

  return [
    prompt,
    "",
    "Additional analysis instructions from the analyst:",
    analysisInstructions,
    "",
    "Apply these instructions as analysis criteria, but do not ignore the telemetry evidence."
  ].join("\n");
}

function normalizeLLMContent(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }
        if (item && typeof item.text === "string") {
          return item.text;
        }
        return "";
      })
      .join("\n");
  }

  return String(content || "");
}

function parseLLMJson(raw) {
  const text = String(raw || "").trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : text;

  try {
    return JSON.parse(candidate);
  } catch {
    return {
      parse_error: true,
      message: "LLM output was not valid JSON",
      raw: text
    };
  }
}

function buildCustomerSummaryPrompt(analysisResult, sessionSummary) {
  return [
    "You are a UX behavior analyst.",
    "",
    "Task:",
    "1) First, interpret the previously generated customer type in natural Korean.",
    "2) Then, define what kind of customer this is in Korean, based on the telemetry.",
    "3) Then, output the final structured JSON only (Korean values) using the schema below.",
    "",
    "Important:",
    "- The final answer MUST be valid JSON only (no markdown, no extra text).",
    "- Put steps (1) and (2) inside JSON fields so the output remains JSON-only.",
    "- Do NOT focus on recommendations. Focus on defining the customer type.",
    "- You may use the local metric candidates as evidence, but create your own customer type name if needed.",
    "",
    "Schema (JSON-only):",
    "{",
    '  "previous_result_ko": {',
    '    "customer_type_name": "...",',
    '    "customer_type_description": "...",',
    '    "secondary_traits": ["..."],',
    '    "confidence": 0-1,',
    '    "why_this_type": ["..."],',
    '    "evidence": ["..."]',
    "  },",
    '  "session_summary_ko": "...",',
    '  "final_result_ko": {',
    '    "customer_type_name": "...",',
    '    "customer_type_description": "...",',
    '    "secondary_traits": ["..."],',
    '    "confidence": 0-1,',
    '    "why_this_type": ["..."],',
    '    "evidence": ["..."]',
    "  }",
    "}",
    "",
    "Inputs:",
    "- previous_result (the model's earlier output, in English JSON)",
    "- session_summary (raw telemetry JSON)",
    "",
    "previous_result:",
    JSON.stringify(analysisResult ?? {}, null, 2),
    "",
    "session_summary:",
    JSON.stringify(sessionSummary ?? {}, null, 2)
  ].join("\n");
}

function sanitizeSingleLine(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePrimaryResult(value) {
  const source = value && typeof value === "object" ? value : {};
  const legacyPrimary = toText(source.primary_type, "");
  const legacySecondary = toTextArray(source.secondary_types, 2);
  const legacyRecommendations = toTextArray(source.recommendations, 5);

  return {
    customer_type_name: toText(source.customer_type_name, legacyPrimary || "unknown"),
    customer_type_description: toText(source.customer_type_description, legacyPrimary || "고객 유형을 정의하지 못했습니다."),
    secondary_traits: toTextArray(source.secondary_traits, 3).length
      ? toTextArray(source.secondary_traits, 3)
      : legacySecondary,
    confidence: toConfidence(source.confidence),
    why_this_type: toTextArray(source.why_this_type, 5).length
      ? toTextArray(source.why_this_type, 5)
      : legacyRecommendations,
    evidence: toTextArray(source.evidence, 5)
  };
}

function normalizeCustomerResultKo(value, fallbackPrimaryResult) {
  const source = value && typeof value === "object" ? value : {};
  const fallback = normalizePrimaryResult(fallbackPrimaryResult);

  const previous = source.previous_result_ko && typeof source.previous_result_ko === "object"
    ? source.previous_result_ko
    : fallback;
  const finalResult = source.final_result_ko && typeof source.final_result_ko === "object"
    ? source.final_result_ko
    : previous;

  return {
    previous_result_ko: normalizePrimaryResult(previous),
    session_summary_ko: toText(source.session_summary_ko, "세션 요약을 생성하지 못했습니다."),
    final_result_ko: normalizePrimaryResult(finalResult)
  };
}

function toText(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function toTextArray(value, limit = 5) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean)
    .slice(0, limit);
}

function toConfidence(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return 0;
  }
  if (num < 0) {
    return 0;
  }
  if (num > 1) {
    return 1;
  }
  return Number(num.toFixed(3));
}
