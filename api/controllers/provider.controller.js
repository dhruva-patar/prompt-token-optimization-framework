import { optimizePrompt } from "../../core/optimizer.js";
import { runProvider } from "../../providers/providerRunner.js";
import { sendSuccess } from "../utils/sendResponse.js";

export async function runProviderController(req, res) {
  const {
    provider = "openai",
    model,
    prompt,
    options = {},
  } = req.body;

  const optimizationResult = optimizePrompt(prompt, options);

  if (optimizationResult.clarify) {
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

    return sendSuccess(res, req, {
      optimization: optimizationResult,
      provider: {
        status: "success",
        result: providerResult,
      },
    });
  } catch (error) {
    return sendSuccess(res, req, {
      optimization: optimizationResult,
      provider: {
        status: "failed",
        error: error.message,
      },
    });
  }
}