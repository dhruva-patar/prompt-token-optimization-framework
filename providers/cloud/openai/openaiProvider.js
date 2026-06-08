import {
  createProviderSuccess,
  createProviderError
} from "../../providerContract.js";

export async function executePrompt({ modelId, finalPrompt }) {
  const providerId = "openai";
  const startTime = Date.now();

  try {
    if (!process.env.OPENAI_API_KEY) {
      return createProviderError({
        providerId,
        modelId,
        message: "Missing OPENAI_API_KEY environment variable.",
        code: "MISSING_API_KEY",
        latencyMs: Date.now() - startTime
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelId || process.env.OPENAI_DEFAULT_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: finalPrompt
          }
        ],
        temperature: 0.2
      })
    });

    const raw = await response.json();

    if (!response.ok) {
      return createProviderError({
        providerId,
        modelId,
        message: raw?.error?.message || "OpenAI request failed.",
        code: raw?.error?.code || "OPENAI_ERROR",
        latencyMs: Date.now() - startTime,
        raw
      });
    }

    const responseText =
      raw?.choices?.[0]?.message?.content?.trim() || "";

    return createProviderSuccess({
      providerId,
      modelId,
      responseText,
      latencyMs: Date.now() - startTime,
      usage: {
        inputTokens: raw?.usage?.prompt_tokens ?? null,
        outputTokens: raw?.usage?.completion_tokens ?? null,
        totalTokens: raw?.usage?.total_tokens ?? null
      },
      raw
    });
  } catch (error) {
    return createProviderError({
      providerId,
      modelId,
      message: error.message || "OpenAI execution failed.",
      code: "OPENAI_EXECUTION_FAILED",
      latencyMs: Date.now() - startTime
    });
  }
}