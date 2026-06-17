import { optimizePrompt } from "../../core/optimizer.js";
import { runProvider, prepareProviderHandoff } from "../../providers/providerRunner.js";
import { sendSuccess } from "../utils/sendResponse.js";
import { setExecutionContext } from "../utils/setExecutionContext.js";
import { classifyProviderError } from "../../providers/providerErrorClassifier.js";
import { createChatTurnLogInDb } from "../../sessions/services/chatLog.service.js";

export function prepareHandoffController(req, res) {
  try {
    const {
      providerId = "chatgpt",
      modelId,
      finalPrompt,
    } = req.body || {};

    const handoff = prepareProviderHandoff({
      providerId,
      modelId,
      finalPrompt,
    });

    return res.status(200).json({
      success: true,
      data: handoff,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: "PROVIDER_HANDOFF_FAILED",
        message: error.message || "Provider handoff failed.",
      },
    });
  }
}

export async function runProviderController(req, res) {
  const {
    provider,
    model,
    prompt,
    options = {},
    persist = false,
    sessionId = null,
  } = req.body;

  if (!provider) {
    return res.status(400).json({
      success: false,
      error: {
        code: "MISSING_EXECUTABLE_PROVIDER",
        message: "Provider is required for executable provider runs.",
      },
    });
  }

  const optimizationResult = optimizePrompt(prompt, options);

  if (optimizationResult.clarify) {
    setExecutionContext(req, {
      provider,
      executionStatus: "skipped",
      providerStatus: "clarification_required",
    });

    return sendSuccess(res, req, {
      optimization: optimizationResult,
      provider: {
        status: "skipped",
        reason: "clarification_required",
      },
    });
  }

  try {
    const providerResult = await runProvider({
      provider,
      model,
      prompt:
        optimizationResult.finalPrompt ||
        optimizationResult.compressedPrompt,
      raw: {
        optimization: optimizationResult,
      },
    });

    let dbLog = null;
    let persistenceWarning = null;

    if (persist) {
      try {
        dbLog = await createChatTurnLogInDb({
          sessionId,

          providerId: provider,
          providerLabel: provider,
          modelId: model,
          title: prompt.slice(0, 48),

          userContent: prompt,
          assistantContent:
            providerResult?.responseText ||
            providerResult?.output ||
            providerResult?.content ||
            null,

          optimization: {
            originalPrompt: prompt,
            optimizedPrompt: optimizationResult.compressedPrompt,
            finalPrompt: optimizationResult.finalPrompt,
            promptType: optimizationResult.type,
            complexity: optimizationResult.complex,
            formatRule: optimizationResult.formatRule,

            tokenBefore:
              optimizationResult.optimizationMetrics?.beforeTokens,
            tokenAfter:
              optimizationResult.optimizationMetrics?.afterTokens,
            tokensSaved:
              optimizationResult.optimizationMetrics?.tokensSaved,
            reductionPercent:
              optimizationResult.optimizationMetrics?.reductionPercent,

            presetId: null,
            notes: optimizationResult.notes || [],
            metadata: {
              source: "providers_run",
              shortPrompt: optimizationResult.shortPrompt || false,
              tokenCount: optimizationResult.tokenCount,
              responseMode: optimizationResult.responseMode || null,
            },
          },

          providerRun: {
            status: providerResult?.success === false ? "failed" : "success",
            responseText:
              providerResult?.responseText ||
              providerResult?.output ||
              providerResult?.content ||
              null,
            errorCode: providerResult?.error?.code || null,
            errorMessage:
              providerResult?.error?.message ||
              providerResult?.error ||
              null,

            latencyMs: providerResult?.latencyMs || null,
            inputTokens: providerResult?.usage?.inputTokens || null,
            outputTokens: providerResult?.usage?.outputTokens || null,
            totalTokens: providerResult?.usage?.totalTokens || null,

            raw: providerResult?.raw || null,
          },
        });
      } catch (error) {
        persistenceWarning = error.message;
      }
    }

    setExecutionContext(req, {
      provider,
      executionStatus: "success",
      providerStatus: "active",
    });

    return sendSuccess(res, req, {
      optimization: optimizationResult,
      provider: {
        status: "success",
        result: providerResult,
      },
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
  } catch (error) {
    const providerStatus = classifyProviderError(error);

    let dbLog = null;
    let persistenceWarning = null;

    if (persist) {
      try {
        dbLog = await createChatTurnLogInDb({
          sessionId,

          providerId: provider,
          providerLabel: provider,
          modelId: model,
          title: prompt.slice(0, 48),

          userContent: prompt,
          assistantContent: `Provider execution failed.${
            error.message ? `\nReason: ${error.message}` : ""
          }`,

          optimization: {
            originalPrompt: prompt,
            optimizedPrompt: optimizationResult.compressedPrompt,
            finalPrompt: optimizationResult.finalPrompt,
            promptType: optimizationResult.type,
            complexity: optimizationResult.complex,
            formatRule: optimizationResult.formatRule,

            tokenBefore:
              optimizationResult.optimizationMetrics?.beforeTokens,
            tokenAfter:
              optimizationResult.optimizationMetrics?.afterTokens,
            tokensSaved:
              optimizationResult.optimizationMetrics?.tokensSaved,
            reductionPercent:
              optimizationResult.optimizationMetrics?.reductionPercent,

            presetId: null,
            notes: optimizationResult.notes || [],
            metadata: {
              source: "providers_run",
              shortPrompt: optimizationResult.shortPrompt || false,
              tokenCount: optimizationResult.tokenCount,
              responseMode: optimizationResult.responseMode || null,
            },
          },

          providerRun: {
            status: "failed",
            responseText: null,
            errorCode: providerStatus,
            errorMessage: error.message || "Provider execution failed.",
            raw: {
              message: error.message,
              providerStatus,
            },
          },
        });
      } catch (persistenceError) {
        persistenceWarning = persistenceError.message;
      }
    }

    setExecutionContext(req, {
      provider,
      executionStatus: "failed",
      providerStatus,
    });

    return sendSuccess(res, req, {
      optimization: optimizationResult,
      provider: {
        status: "failed",
        providerStatus,
        error: error.message,
      },
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
}