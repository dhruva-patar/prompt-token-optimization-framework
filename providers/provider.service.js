import { listProviderMetadata } from "./providerRegistry.js";
import { listProvidersFromDb } from "./repositories/provider.repository.js";

function normalizeProvider(provider) {
  return {
    id: provider.id,
    label: provider.label,
    type: provider.type,
    registryStatus: provider.registryStatus || provider.status || "active",
    runtimeStatus: provider.runtimeStatus || "unknown",
    models: provider.models || [],
    connectionMode: provider.connectionMode || "manual",
    executionMode: provider.executionMode || "manual",
    executable: provider.executable || false,
    requiresApiKey: provider.requiresApiKey || false,
    requiresAuth: provider.requiresAuth || false,
    supportsLocal: provider.supportsLocal || false,
    handoffUrl: provider.handoffUrl || null,
  };
}

export async function listProviderMetadataFromSource() {
  try {
    const providersFromDb = await listProvidersFromDb();

    if (providersFromDb.length > 0) {
      return providersFromDb.map(normalizeProvider);
    }
  } catch (error) {
    console.warn(
      "Provider DB lookup failed. Falling back to provider registry.",
      error.message
    );
  }

  return listProviderMetadata().map(normalizeProvider);
}