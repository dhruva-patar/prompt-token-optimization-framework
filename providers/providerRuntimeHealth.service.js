import { env } from "../config/env.js";

async function checkOllamaRuntimeHealth(provider) {
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
        runtimeMessage: `${provider.label} returned status ${response.status}`,
        availableModels: [],
      };
    }

    const data = await response.json();

    return {
      runtimeStatus: "active",
      runtimeMessage: `${provider.label} is running locally.`,
      availableModels: Array.isArray(data.models)
        ? data.models.map((model) => model.name)
        : [],
    };
  } catch (error) {
    return {
      runtimeStatus: "offline",
      runtimeMessage:
        error?.name === "AbortError"
          ? `${provider.label} health check timed out.`
          : `${provider.label} is not reachable.`,
      availableModels: [],
    };
  }
}

const runtimeHealthCheckers = {
  local: checkOllamaRuntimeHealth,
};

export async function enrichProviderRuntimeHealth(provider) {
  const checker = runtimeHealthCheckers[provider.connectionMode];

  if (!checker) {
    return {
      ...provider,
      runtimeStatus: provider.runtimeStatus || "unknown",
    };
  }

  const runtimeHealth = await checker(provider);

  return {
    ...provider,
    runtimeStatus: runtimeHealth.runtimeStatus,
    runtimeMessage: runtimeHealth.runtimeMessage,
    availableModels: runtimeHealth.availableModels,
  };
}