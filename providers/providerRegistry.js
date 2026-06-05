export const providerRegistry = {
  openai: {
    id: "openai",
    label: "OpenAI",
    type: "cloud",
    requiresApiKey: true,
    supportsLocal: false,
    connectionMode: "oauth",
    status: "active",
  },

  claude: {
    id: "claude",
    label: "Claude",
    type: "cloud",
    requiresApiKey: true,
    supportsLocal: false,
    connectionMode: "oauth",
    status: "active",
  },

  ollama: {
    id: "ollama",
    label: "Ollama",
    type: "local",
    requiresApiKey: false,
    supportsLocal: true,
    connectionMode: "local",
    status: "active",
  },
};

export function listProviderMetadata() {
  return Object.values(providerRegistry);
}

export function getProviderMetadata(providerId) {
  return providerRegistry[providerId] || null;
}