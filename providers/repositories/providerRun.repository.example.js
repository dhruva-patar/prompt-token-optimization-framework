import { createSessionInDb } from "../../sessions/repositories/session.repository.js";
import { createMessageInDb } from "../../messages/repositories/message.repository.js";
import { createOptimizationRunInDb } from "../../optimization/repositories/optimizationRun.repository.js";
import {
  createProviderRunInDb,
  listProviderRunsBySessionIdFromDb,
} from "./providerRun.repository.js";

const session = await createSessionInDb({
  providerId: "ollama",
  providerLabel: "Ollama",
  modelId: "qwen2.5:0.5b",
  title: "Provider run repository smoke test",
});

const userMessage = await createMessageInDb({
  sessionId: session.id,
  role: "user",
  content: "Explain PTOF in one sentence.",
});

const assistantMessage = await createMessageInDb({
  sessionId: session.id,
  role: "assistant",
  content: "PTOF optimizes prompts while preserving user intent.",
});

const optimizationRun = await createOptimizationRunInDb({
  sessionId: session.id,
  messageId: userMessage.id,

  originalPrompt: "Explain PTOF in one sentence.",
  optimizedPrompt: "Explain PTOF in one sentence.",
  finalPrompt: "Explain PTOF in one sentence.",

  promptType: "Informational",
  complexity: false,
  formatRule: "Use max 7 bullets.",

  tokenBefore: 7,
  tokenAfter: 7,
  tokensSaved: 0,
  reductionPercent: 0,

  providerId: "ollama",
  modelId: "qwen2.5:0.5b",

  notes: ["Short prompt — heavy optimization bypassed"],
  metadata: {
    smokeTest: true,
  },
});

const providerRun = await createProviderRunInDb({
  sessionId: session.id,
  messageId: assistantMessage.id,
  optimizationRunId: optimizationRun.id,

  providerId: "ollama",
  modelId: "qwen2.5:0.5b",

  status: "success",
  responseText: "PTOF optimizes prompts while preserving user intent.",

  latencyMs: 750,
  inputTokens: 45,
  outputTokens: 41,
  totalTokens: 86,

  raw: {
    smokeTest: true,
    provider: "ollama",
  },
});

const runs = await listProviderRunsBySessionIdFromDb(session.id);

console.log("Session:", session.id);
console.log("Provider run:", providerRun);
console.log("Provider runs:", runs);