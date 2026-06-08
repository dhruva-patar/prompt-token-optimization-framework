import { optimizePrompt } from "../../core/optimizer.js";
import { runProvider, prepareProviderHandoff } from "../../providers/providerRunner.js";
import { sendSuccess } from "../utils/sendResponse.js";
import { setExecutionContext } from "../utils/setExecutionContext.js";
import { classifyProviderError } from "../../providers/providerErrorClassifier.js";

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