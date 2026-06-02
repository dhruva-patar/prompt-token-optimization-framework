import { listProviderMetadata } from "./providerRegistry.js";

export function getProviderHealth() {
  return listProviderMetadata().map((provider) => {
    return {
      id: provider.id,
      label: provider.label,
      type: provider.type,

      registryStatus: provider.status || "unknown",
      runtimeStatus: "unknown",

      requiresApiKey: provider.requiresApiKey,
      supportsLocal: provider.supportsLocal,
    };
  });
}