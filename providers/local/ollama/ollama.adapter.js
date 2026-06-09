import { normalizeProviderResponse } from "../../shared/provider.interface.js";
import { env } from "../../../config/env.js";

export async function runOllamaProvider({
  prompt,
  model = env.ollama.defaultModel,
  raw = null,
} = {}) {
  const start = Date.now();

  if (!prompt) {
    throw new Error("Optimized prompt is required for Ollama provider");
  }

  const baseUrl = env.ollama.baseUrl || "http://127.0.0.1:11434";

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Ollama request failed with status ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();

  const output = data.response || "";

  return normalizeProviderResponse({
    provider: "ollama",
    model,
    output,
    usage: {
      inputTokens: data.prompt_eval_count ?? null,
      outputTokens: data.eval_count ?? null,
      totalTokens:
        typeof data.prompt_eval_count === "number" &&
        typeof data.eval_count === "number"
          ? data.prompt_eval_count + data.eval_count
          : null,
    },
    latencyMs: Date.now() - start,
    raw: raw ? data : null,
  });
}