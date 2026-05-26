import { optimizePrompt } from "../../core/optimizer.js";

export function optimizeController(req, res, next) {
  try {
    const { prompt, options } = req.body;

    const result = optimizePrompt(prompt, options || {});

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
}