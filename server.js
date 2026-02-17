import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { analyzeBehavior } from "./src/behavior-analyzer.js";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn("[warn] OPENAI_API_KEY is missing. /api/llm-analyze will fail until you set it.");
}

const llm = new ChatOpenAI({
  apiKey,
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  temperature: 0.1
});

const LLMGraphState = Annotation.Root({
  summary: Annotation(),
  prompt: Annotation(),
  llmOutput: Annotation(),
  result: Annotation(),
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
    const response = await llm.invoke(state.prompt);
    const content = normalizeLLMContent(response.content);
    return {
      llmOutput: content
    };
  })
  .addNode("parse_output", async (state) => {
    return {
      result: parseLLMJson(state.llmOutput)
    };
  })
  .addNode("summarize_customer_ko", async (state) => {
    const summaryPrompt = buildCustomerSummaryPrompt(state.result, state.summary);
    const response = await llm.invoke(summaryPrompt);
    const raw = normalizeLLMContent(response.content);
    return {
      customerSummaryRaw: raw,
      customerSummaryKo: sanitizeSingleLine(raw)
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

app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname));

app.post("/api/llm-analyze", async (req, res) => {
  try {
    const hasSummary = req.body && typeof req.body.summary === "object";
    const hasPayload = req.body && typeof req.body.payload === "object";

    let summary = req.body.summary;
    let prompt = req.body.prompt;

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

    const result = await llmGraph.invoke({ summary, prompt });

    return res.json({
      ok: true,
      result: result.result,
      raw: result.llmOutput,
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

function buildPromptFromSummary(summary) {
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
    "당신은 UX 행동 분석 결과를 고객 유형으로 요약하는 분석가다.",
    "아래 1차 LLM 분석 결과와 세션 요약을 바탕으로, 고객 유형을 한국어 한 문단으로 요약하라.",
    "조건:",
    "- 2~3문장",
    "- 고객 유형명 1개를 첫 문장에 명시",
    "- 근거가 되는 행동 특징 2~3개 포함",
    "- 제품팀이 이해하기 쉬운 한국어",
    "- 마크다운/코드블록/번호 목록 없이 평문만 출력",
    "1차 분석 결과:",
    JSON.stringify(analysisResult ?? {}, null, 2),
    "세션 요약:",
    JSON.stringify(sessionSummary ?? {}, null, 2)
  ].join("\n");
}

function sanitizeSingleLine(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
