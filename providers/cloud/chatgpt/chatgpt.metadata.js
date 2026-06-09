export const chatgptProvider = {
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
    url: "https://chatgpt.com",
  },
  models: [
    {
      id: "gpt-4o",
      label: "GPT-4o",
    },
    {
      id: "gpt-4o-mini",
      label: "GPT-4o mini",
    },
  ],
};