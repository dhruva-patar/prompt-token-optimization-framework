import { prisma } from "../../db/prismaClient.js";

function mapProviderRecord(provider) {
  return {
    id: provider.id,
    label: provider.label,
    type: provider.type,
    connectionMode: provider.connectionMode,
    executionMode: provider.executionMode,
    executable: provider.executable,
    requiresAuth: provider.requiresAuth,
    requiresApiKey: provider.requiresApiKey,
    supportsLocal: provider.supportsLocal,
    status: provider.status,
    handoffUrl: provider.handoffUrl,
    models: provider.models.map((model) => ({
      id: model.modelId,
      label: model.label,
      status: model.status,
    })),
  };
}

export async function listProvidersFromDb() {
  const providers = await prisma.provider.findMany({
    include: {
      models: {
        orderBy: {
          label: "asc",
        },
      },
    },
    orderBy: {
      label: "asc",
    },
  });

  return providers.map(mapProviderRecord);
}

export async function getProviderByIdFromDb(providerId) {
  if (!providerId) return null;

  const provider = await prisma.provider.findUnique({
    where: {
      id: providerId,
    },
    include: {
      models: {
        orderBy: {
          label: "asc",
        },
      },
    },
  });

  return provider ? mapProviderRecord(provider) : null;
}