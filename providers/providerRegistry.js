export const providerRegistry = {
  openai: {
    id: "chatgpt",
    label: "ChatGPT",
    type: "cloud",
    requiresApiKey: true,
    supportsLocal: false,
    connectionMode: "oauth",
    status: "active",
    models: [
      { id: "gpt-4o-mini", label: "GPT-4o mini", isDefault: true },
      { id: "gpt-4o", label: "GPT-4o", isDefault: false },
    ],
  },

  claude: {
    id: "claude",
    label: "Claude",
    type: "cloud",
    requiresApiKey: true,
    supportsLocal: false,
    connectionMode: "oauth",
    status: "active",
    models: [
      { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", isDefault: true },
      { id: "claude-3-haiku", label: "Claude 3 Haiku", isDefault: false },
    ],
  },

  ollama: {
    id: "ollama",
    label: "Ollama",
    type: "local",
    requiresApiKey: false,
    supportsLocal: true,
    connectionMode: "local",
    status: "active",
    models: [
      { id: "llama3.1", label: "Llama 3.1", isDefault: true },
    ],
  },
};

export function listProviderMetadata() {
  return Object.values(providerRegistry);
}

export function getProviderMetadata(providerId) {
  return providerRegistry[providerId] || null;
}