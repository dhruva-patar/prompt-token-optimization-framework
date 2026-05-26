import { optimizePrompt } from "../../core/optimizer.js";
import { sendSuccess } from "../utils/sendResponse.js";

export async function optimizeController(req, res) {
  const { prompt, options } = req.body;

  const result = optimizePrompt(prompt, options || {});

  return sendSuccess(res, req, result);
}