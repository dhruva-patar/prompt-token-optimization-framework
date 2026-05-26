export function validatePromptRequest(req, res, next) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required",
    });
  }

  if (typeof prompt !== "string") {
    return res.status(400).json({
      success: false,
      error: "Prompt must be a string",
    });
  }

  if (!prompt.trim()) {
    return res.status(400).json({
      success: false,
      error: "Prompt cannot be empty",
    });
  }

  if (prompt.length > 10000) {
    return res.status(400).json({
      success: false,
      error: "Prompt exceeds maximum length",
    });
  }

  next();
}