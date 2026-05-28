export const providerRegistry = {
  openai: {
    id: "openai",
    label: "OpenAI",
    type: "cloud",
    requiresApiKey: true,
    supportsLocal: false,
    status: "active",
  },

  ollama: {
    id: "ollama",
    label: "Ollama",
    type: "local",
    requiresApiKey: false,
    supportsLocal: true,
    status: "active",
  },
};

export function listProviderMetadata() {
  return Object.values(providerRegistry);
}

export function getProviderMetadata(providerId) {
  return providerRegistry[providerId] || null;
}