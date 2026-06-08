import { optimizePrompt } from "../../core/optimizer.js";
import { sendSuccess } from "../utils/sendResponse.js";

export async function optimizeController(req, res) {
  const { prompt, responseMode, presetId } = req.body;

  const result = optimizePrompt(prompt, {
    responseMode,
    presetId,
  });

  return sendSuccess(res, req, result);
}