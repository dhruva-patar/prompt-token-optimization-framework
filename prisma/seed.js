import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { listProviderMetadata } from "../providers/providerRegistry.js";

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const handoffUrls = {
  chatgpt: "https://chatgpt.com",
  claude: "https://claude.ai",
  perplexity: "https://www.perplexity.ai",
};

function getExecutionMode(provider) {
  if (provider.id === "ollama") return "executable";
  if (provider.connectionMode === "handoff") return "handoff";
  return "manual";
}

function getProviderType(provider) {
  if (provider.type) return provider.type;
  if (provider.supportsLocal) return "local";
  return "subscription";
}

async function seedProviders() {
  const providers = listProviderMetadata();

  for (const provider of providers) {
    const executionMode = getExecutionMode(provider);
    const executable = executionMode === "executable";

    await prisma.provider.upsert({
      where: {
        id: provider.id,
      },
      update: {
        label: provider.label,
        type: getProviderType(provider),
        connectionMode: provider.connectionMode || "manual",
        executionMode,
        executable,
        requiresAuth: provider.requiresAuth ?? false,
        requiresApiKey: provider.requiresApiKey ?? false,
        supportsLocal: provider.supportsLocal ?? false,
        status: provider.status || "active",
        handoffUrl: handoffUrls[provider.id] || null,
      },
      create: {
        id: provider.id,
        label: provider.label,
        type: getProviderType(provider),
        connectionMode: provider.connectionMode || "manual",
        executionMode,
        executable,
        requiresAuth: provider.requiresAuth ?? false,
        requiresApiKey: provider.requiresApiKey ?? false,
        supportsLocal: provider.supportsLocal ?? false,
        status: provider.status || "active",
        handoffUrl: handoffUrls[provider.id] || null,
      },
    });

    for (const model of provider.models || []) {
      await prisma.providerModel.upsert({
        where: {
          providerId_modelId: {
            providerId: provider.id,
            modelId: model.id,
          },
        },
        update: {
          label: model.label,
          status: model.status || "active",
        },
        create: {
          providerId: provider.id,
          modelId: model.id,
          label: model.label,
          status: model.status || "active",
        },
      });
    }
  }

  console.log(`Seeded ${providers.length} providers.`);
}

async function main() {
  await seedProviders();
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });