import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,

  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    defaultModel: process.env.OPENAI_DEFAULT_MODEL || "gpt-4.1-mini",
  },

  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
    defaultModel: process.env.OLLAMA_DEFAULT_MODEL || "llama3.1",
  },
};