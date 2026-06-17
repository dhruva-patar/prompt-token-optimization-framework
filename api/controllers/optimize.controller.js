import { optimizePrompt } from "../../core/optimizer.js";
import { sendSuccess } from "../utils/sendResponse.js";
import { createChatTurnLogInDb } from "../../sessions/services/chatLog.service.js";

export async function optimizeController(req, res) {
  const {
    prompt,
    responseMode,
    presetId,
    persist = false,
    sessionId = null,
  } = req.body;

  const result = optimizePrompt(prompt, {
    responseMode,
    presetId,
  });

  let dbLog = null;
  let persistenceWarning = null;

  if (persist) {
    try {
      dbLog = await createChatTurnLogInDb({
        sessionId,

        providerId: "ptof",
        providerLabel: "PTOF",
        modelId: null,
        title: prompt.slice(0, 48),

        userContent: prompt,
        assistantContent:
          result.finalPrompt ||
          result.compressedPrompt ||
          null,

        optimization: {
          originalPrompt: prompt,
          optimizedPrompt: result.compressedPrompt,
          finalPrompt: result.finalPrompt,

          promptType: result.type,
          complexity: result.complex,
          formatRule: result.formatRule,

          tokenBefore: result.optimizationMetrics?.beforeTokens,
          tokenAfter: result.optimizationMetrics?.afterTokens,
          tokensSaved: result.optimizationMetrics?.tokensSaved,
          reductionPercent: result.optimizationMetrics?.reductionPercent,

          presetId: null,
          providerId: "ptof",
          modelId: null,

          notes: result.notes || [],
          metadata: {
            source: "optimize",
            responseMode: result.responseMode || null,
            presetApplied: result.presetApplied || null,
            shortPrompt: result.shortPrompt || false,
            tokenCount: result.tokenCount,
          },
        },

        providerRun: null,
      });
    } catch (error) {
      persistenceWarning = error.message;
    }
  }

  return sendSuccess(res, req, {
    ...result,
    persistence: persist
      ? {
          status: dbLog ? "saved" : "failed",
          sessionId: dbLog?.session?.id || sessionId || null,
          warning: persistenceWarning,
        }
      : {
          status: "skipped",
        },
  });
}