import { classifyPrompt } from "../../core/classification/classifyPrompt.js";
import { detectTypeSignals } from "../../core/classification/detectTypeSignals.js";

export function classifyController(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required",
    });
  }

  try {
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
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}