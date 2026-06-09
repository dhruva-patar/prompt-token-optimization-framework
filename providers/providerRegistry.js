export const providerRegistry = {
  chatgpt: {
    id: "chatgpt",
    label: "ChatGPT",
    type: "subscription",
    requiresApiKey: false,
    supportsLocal: false,
    connectionMode: "handoff",
    executionMode: "manual",
    executable: false,
    status: "active",
    handoff: {
      mode: "copy_or_open",
      url: "https://chatgpt.com"
    },
    models: [
      {
        id: "gpt-4o",
        label: "GPT-4o"
      },
      {
        id: "gpt-4o-mini",
        label: "GPT-4o mini"
      }
    ]
  },

  claude: {
  id: "claude",
  label: "Claude",
  type: "subscription",
  requiresApiKey: false,
  supportsLocal: false,
  connectionMode: "handoff",
  executionMode: "manual",
  executable: false,
  status: "active",
  handoff: {
    mode: "copy_or_open",
    url: "https://claude.ai"
  },
  models: [
    {
      id: "claude-sonnet",
      label: "Claude Sonnet"
    },
    {
      id: "claude-opus",
      label: "Claude Opus"
    }
  ]
},

  perplexity: {
    id: "perplexity",
    label: "Perplexity",
    type: "subscription",
    requiresApiKey: false,
    supportsLocal: false,
    connectionMode: "handoff",
    executionMode: "manual",
    executable: false,
    status: "active",
    handoff: {
      mode: "copy_or_open",
      url: "https://www.perplexity.ai"
    },
    models: [
      {
        id: "default",
        label: "Default"
      }
    ]
  },

  ollama: {
    id: "ollama",
    label: "Ollama",
    type: "local",
    requiresApiKey: false,
    supportsLocal: true,
    connectionMode: "local",
    executionMode: "local_optional",
    executable: true,
    status: "experimental",
    handoff: {
      mode: "local"
    },
    models: [
      {
        id: "qwen2.5:0.5b",
        label: "Qwen 2.5 0.5B"
      }
    ]
  },
};

export function listProviderMetadata() {
  return Object.values(providerRegistry);
}

export function getProviderMetadata(providerId) {
  return providerRegistry[providerId] || null;
}