import { classifyPrompt } from "../../core/classification/classifyPrompt.js";
import { detectTypeSignals } from "../../core/classification/detectTypeSignals.js";

export function classifyController(req, res, next) {
  try {
    const { prompt } = req.body;

    const type = classifyPrompt(prompt);
    const typeSignals = detectTypeSignals(prompt);

    return res.json({
      success: true,
      result: {
        type,
        signals: typeSignals,
      },
    });
  } catch (error) {
    next(error);
  }
}