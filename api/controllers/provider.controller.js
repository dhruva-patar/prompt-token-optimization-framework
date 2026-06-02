import { optimizePrompt } from "../../core/optimizer.js";
import { runProvider } from "../../providers/providerRunner.js";
import { sendSuccess } from "../utils/sendResponse.js";
import { setExecutionContext } from "../utils/setExecutionContext.js";
import { classifyProviderError } from "../../providers/providerErrorClassifier.js";

export async function runProviderController(req, res) {
  const {
    provider = "openai",
    model,
    prompt,
    options = {},
  } = req.body;

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
    });
  } catch (error) {
    const providerStatus = classifyProviderError(error);

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
    });
  }
}