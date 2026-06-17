import { createSessionInDb } from "../../sessions/repositories/session.repository.js";
import { createMessageInDb } from "../../messages/repositories/message.repository.js";
import {
  createOptimizationRunInDb,
  listOptimizationRunsBySessionIdFromDb,
} from "./optimizationRun.repository.js";

const session = await createSessionInDb({
  providerId: "ptof",
  providerLabel: "PTOF",
  title: "Optimization repository smoke test",
});

const userMessage = await createMessageInDb({
  sessionId: session.id,
  role: "user",
  content: "Explain PTOF in one sentence.",
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

  providerId: "ptof",
  modelId: null,

  notes: ["Short prompt — heavy optimization bypassed"],
  metadata: {
    smokeTest: true,
  },
});

const runs = await listOptimizationRunsBySessionIdFromDb(session.id);

console.log("Session:", session.id);
console.log("User message:", userMessage);
console.log("Optimization run:", optimizationRun);
console.log("Optimization runs:", runs);