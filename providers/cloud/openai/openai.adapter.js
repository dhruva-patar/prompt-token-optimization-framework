import { normalizeProviderResponse } from "../../shared/provider.interface.js";

export async function runOpenAIProvider({
  prompt,
  model = "gpt-4.1-mini",
  raw = null,
} = {}) {
  const start = Date.now();

  if (!prompt) {
    throw new Error("Optimized prompt is required for OpenAI provider");
  }

  // Placeholder only.
  // Real OpenAI API integration will be added later.
  const output = "";

  return normalizeProviderResponse({
    provider: "openai",
    model,
    output,
    usage: {},
    latencyMs: Date.now() - start,
    raw,
  });
}