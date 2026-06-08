import { runOllamaProvider } from "./local/ollama/ollama.adapter.js";
import { runOpenAIProvider } from "./cloud/openai/openai.adapter.js";

import { providerRegistry, listProviderMetadata } from "./providerRegistry.js";
import { createProviderError } from "./providerContract.js";

const executableProviders = {
  openai: runOpenAIProvider, // future API execution scaffold
  ollama: runOllamaProvider,
};

const handoffProviders = {
  chatgpt: {
    providerId: "chatgpt",
    label: "ChatGPT",
    handoffUrl: "https://chatgpt.com",
    handoffMode: "copy_or_open",
  },
  claude: {
    providerId: "claude",
    label: "Claude",
    handoffUrl: "https://claude.ai",
    handoffMode: "copy_or_open",
  },
  perplexity: {
    providerId: "perplexity",
    label: "Perplexity",
    handoffUrl: "https://www.perplexity.ai",
    handoffMode: "copy_or_open",
  },
};

export async function runProvider({
  provider,
  prompt,
  model,
  raw = null,
} = {}) {
  const selectedProvider = executableProviders[provider];

  if (!selectedProvider) {
    throw new Error(`Unsupported executable provider: ${provider}`);
  }

  return selectedProvider({
    prompt,
    model,
    raw,
  });
}

export function prepareProviderHandoff({
  providerId = "chatgpt",
  modelId,
  finalPrompt,
} = {}) {
  const normalizedProviderId = providerId?.toLowerCase();
  const selectedProvider = handoffProviders[normalizedProviderId];

  if (!selectedProvider) {
    throw new Error(`Unsupported handoff provider: ${normalizedProviderId}`);
  }

  if (!finalPrompt || typeof finalPrompt !== "string") {
    throw new Error("Final prompt is required for provider handoff");
  }

  return {
    success: true,
    providerId: selectedProvider.providerId,
    modelId,
    providerLabel: selectedProvider.label,
    executionMode: "manual",
    handoffMode: selectedProvider.handoffMode,
    handoffUrl: selectedProvider.handoffUrl,
    finalPrompt,
    message: `Prompt prepared for ${selectedProvider.label}. Copy it or open ${selectedProvider.label} to continue.`,
  };
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

  const selectedProvider = executableProviders[normalizedProviderId];

  if (!selectedProvider) {
    return createProviderError({
      providerId: normalizedProviderId,
      modelId,
      message: `Unsupported executable provider: ${normalizedProviderId}`,
      code: "UNSUPPORTED_EXECUTABLE_PROVIDER",
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