import { runOpenAIProvider } from "./cloud/openai/openai.adapter.js";
import { runOllamaProvider } from "./local/ollama/ollama.adapter.js";

import { providerRegistry, listProviderMetadata } from "./providerRegistry.js";

const providers = {
  openai: runOpenAIProvider,
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

export function listProviders() {
  return Object.keys(providerRegistry);
}

export function listProvidersDetailed() {
  return listProviderMetadata();
}