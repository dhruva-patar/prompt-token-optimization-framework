import { runOpenAIProvider } from "./cloud/openai/openai.adapter.js";
import { runOllamaProvider } from "./local/ollama/ollama.adapter.js";

import { providerRegistry, listProviderMetadata } from "./providerRegistry.js";
import { createProviderError } from "./providerContract.js";

const providers = {
  openai: runOpenAIProvider,
  chatgpt: runOpenAIProvider,
  ollama: runOllamaProvider,
};

export async function runProvider({
  provider = "openai",
  prompt,
  model,
  raw = null,
} = {}) {
  const selectedProvider = providers[provider];

  if (!selectedProvider) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  return selectedProvider({
    prompt,
    model,
    raw,
  });
}

export async function executeProviderPrompt({
  providerId,
  modelId,
  finalPrompt,
  raw = null,
} = {}) {
  const normalizedProviderId = providerId?.toLowerCase();

  if (!normalizedProviderId) {
    return createProviderError({
      providerId: null,
      modelId,
      message: "Missing providerId.",
      code: "MISSING_PROVIDER_ID",
    });
  }

  if (!finalPrompt || typeof finalPrompt !== "string") {
    return createProviderError({
      providerId: normalizedProviderId,
      modelId,
      message: "Missing finalPrompt.",
      code: "MISSING_FINAL_PROMPT",
    });
  }

  const selectedProvider = providers[normalizedProviderId];

  if (!selectedProvider) {
    return createProviderError({
      providerId: normalizedProviderId,
      modelId,
      message: `Unsupported provider: ${normalizedProviderId}`,
      code: "UNSUPPORTED_PROVIDER",
    });
  }

  try {
    return await runProvider({
      provider: normalizedProviderId,
      prompt: finalPrompt,
      model: modelId,
      raw,
    });
  } catch (error) {
    return createProviderError({
      providerId: normalizedProviderId,
      modelId,
      message: error.message || "Provider execution failed.",
      code: "PROVIDER_EXECUTION_FAILED",
    });
  }
}

export function listProviders() {
  return Object.keys(providerRegistry);
}

export function listProvidersDetailed() {
  return listProviderMetadata();
}