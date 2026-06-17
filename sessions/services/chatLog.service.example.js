import { createChatTurnLogInDb } from "./chatLog.service.js";

const result = await createChatTurnLogInDb({
  providerId: "ollama",
  providerLabel: "Ollama",
  modelId: "qwen2.5:0.5b",
  title: "Chat log service smoke test",

  userContent: "Explain PTOF in one sentence.",
  assistantContent: "PTOF optimizes prompts while preserving user intent.",

  optimization: {
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
    notes: ["Short prompt — heavy optimization bypassed"],
    metadata: {
      smokeTest: true,
    },
  },

  providerRun: {
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
  },
});

console.log(JSON.stringify(result, null, 2));