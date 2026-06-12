import { getProviderHealth } from "../../providers/providerHealth.js";
import { sendSuccess } from "../utils/sendResponse.js";
import { env } from "../../config/env.js";

async function checkOllamaHealth() {
  const baseUrl = env.ollama?.baseUrl || "http://127.0.0.1:11434";

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 3000);

    const response = await fetch(`${baseUrl}/api/tags`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        runtimeStatus: "offline",
        runtimeMessage: `Ollama returned status ${response.status}`,
        availableModels: [],
      };
    }

    const data = await response.json();

    return {
      runtimeStatus: "active",
      runtimeMessage: "Ollama is running locally.",
      availableModels: Array.isArray(data.models)
        ? data.models.map((model) => model.name)
        : [],
    };
  } catch (error) {
    return {
      runtimeStatus: "offline",
      runtimeMessage:
        error?.name === "AbortError"
          ? "Ollama health check timed out."
          : "Ollama is not reachable.",
      availableModels: [],
    };
  }
}

export async function providerHealthController(req, res) {
  const health = getProviderHealth();

  const providers = await Promise.all(
    health.map(async (provider) => {
      if (provider.id !== "ollama") {
        return provider;
      }

      const ollamaHealth = await checkOllamaHealth();

      return {
        ...provider,
        runtimeStatus: ollamaHealth.runtimeStatus,
        runtimeMessage: ollamaHealth.runtimeMessage,
        availableModels: ollamaHealth.availableModels,
      };
    })
  );

  return sendSuccess(res, req, {
    providers,
  });
}