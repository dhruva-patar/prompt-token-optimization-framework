import { optimizePrompt } from "../../core/optimizer.js";

export function optimizeController(req, res) {
  const { prompt, options } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required",
    });
  }

  try {
    const result = optimizePrompt(prompt, options || {});

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}