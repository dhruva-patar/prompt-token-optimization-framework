import { createSessionInDb, updateSessionActivityInDb } from "../repositories/session.repository.js";
import { createMessageInDb } from "../../messages/repositories/message.repository.js";
import { createOptimizationRunInDb } from "../../optimization/repositories/optimizationRun.repository.js";
import { createProviderRunInDb } from "../../providers/repositories/providerRun.repository.js";

export async function createChatTurnLogInDb({
  sessionId = null,

  providerId = "ptof",
  providerLabel = "PTOF",
  modelId = null,
  title = "New session",

  userContent,
  assistantContent = null,

  optimization,
  providerRun = null,
} = {}) {
  if (!userContent) {
    throw new Error("userContent is required to create a chat turn log.");
  }

  if (!optimization) {
    throw new Error("optimization is required to create a chat turn log.");
  }

  let session;

  if (sessionId) {
    session = await updateSessionActivityInDb(sessionId);
  } else {
    session = await createSessionInDb({
      providerId,
      providerLabel,
      modelId,
      title,
    });
  }

  const userMessage = await createMessageInDb({
    sessionId: session.id,
    role: "user",
    content: userContent,
  });

  const optimizationRun = await createOptimizationRunInDb({
    sessionId: session.id,
    messageId: userMessage.id,

    originalPrompt: optimization.originalPrompt,
    optimizedPrompt: optimization.optimizedPrompt,
    finalPrompt: optimization.finalPrompt,

    promptType: optimization.promptType,
    complexity: optimization.complexity,
    formatRule: optimization.formatRule,

    tokenBefore: optimization.tokenBefore,
    tokenAfter: optimization.tokenAfter,
    tokensSaved: optimization.tokensSaved,
    reductionPercent: optimization.reductionPercent,

    presetId: optimization.presetId,
    providerId,
    modelId,

    notes: optimization.notes || [],
    metadata: optimization.metadata || {},
  });

  const assistantMessage = await createMessageInDb({
    sessionId: session.id,
    role: "assistant",
    content: assistantContent,
  });

  let providerRunRecord = null;

  if (providerRun) {
    providerRunRecord = await createProviderRunInDb({
      sessionId: session.id,
      messageId: assistantMessage.id,
      optimizationRunId: optimizationRun.id,

      providerId,
      modelId,

      status: providerRun.status || "success",
      responseText: providerRun.responseText || assistantContent,
      errorCode: providerRun.errorCode || null,
      errorMessage: providerRun.errorMessage || null,

      latencyMs: providerRun.latencyMs || null,
      inputTokens: providerRun.inputTokens || null,
      outputTokens: providerRun.outputTokens || null,
      totalTokens: providerRun.totalTokens || null,

      raw: providerRun.raw || null,
    });
  }

  return {
    session,
    userMessage,
    optimizationRun,
    assistantMessage,
    providerRun: providerRunRecord,
  };
}