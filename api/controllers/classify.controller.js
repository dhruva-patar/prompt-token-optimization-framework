import { classifyPrompt } from "../../core/classification/classifyPrompt.js";
import { detectTypeSignals } from "../../core/classification/detectTypeSignals.js";
import { sendSuccess } from "../utils/sendResponse.js";

export function classifyController(req, res, next) {
  try {
    const { prompt } = req.body;

    const type = classifyPrompt(prompt);
    const typeSignals = detectTypeSignals(prompt);

    return sendSuccess(res, {
      type,
      signals: typeSignals,
    });
  } catch (error) {
    next(error);
  }
}