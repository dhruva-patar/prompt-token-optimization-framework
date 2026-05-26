import { optimizePrompt } from "../../core/optimizer.js";
import { sendSuccess } from "../utils/sendResponse.js";

export function optimizeController(req, res, next) {
  try {
    const { prompt, options } = req.body;

    const result = optimizePrompt(prompt, options || {});

    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}