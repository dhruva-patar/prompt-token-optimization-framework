import { normalizeProviderResponse } from "../../shared/provider.interface.js";

export async function runOllamaProvider({
  prompt,
  model = "llama3.1",
  raw = null,
} = {}) {
  const start = Date.now();

  if (!prompt) {
    throw new Error("Optimized prompt is required for Ollama provider");
  }

  // Placeholder only.
  // Real Ollama local integration will be added later.
  const output = "";

  return normalizeProviderResponse({
    provider: "ollama",
    model,
    output,
    usage: {},
    latencyMs: Date.now() - start,
    raw,
  });
}