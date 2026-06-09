export function prepareChatGPTHandoff({
  finalPrompt,
  modelId = "gpt-4o",
} = {}) {
  if (!finalPrompt || typeof finalPrompt !== "string") {
    throw new Error("Final prompt is required for ChatGPT handoff");
  }

  return {
    success: true,
    providerId: "chatgpt",
    modelId,
    executionMode: "manual",
    handoffMode: "copy_or_open",
    handoffUrl: "https://chatgpt.com",
    finalPrompt,
    message:
      "Prompt prepared for ChatGPT. Copy it or open ChatGPT to continue.",
  };
}