import { prisma } from "../../db/prismaClient.js";

export async function createProviderRunInDb({
  sessionId,
  messageId = null,
  optimizationRunId = null,

  providerId,
  modelId = null,

  status = "success",
  responseText = null,
  errorCode = null,
  errorMessage = null,

  latencyMs = null,
  inputTokens = null,
  outputTokens = null,
  totalTokens = null,

  raw = null,
} = {}) {
  if (!sessionId) {
    throw new Error("sessionId is required to create a provider run.");
  }

  if (!providerId) {
    throw new Error("providerId is required to create a provider run.");
  }

  return prisma.providerRun.create({
    data: {
      sessionId,
      messageId,
      optimizationRunId,

      providerId,
      modelId,

      status,
      responseText,
      errorCode,
      errorMessage,

      latencyMs,
      inputTokens,
      outputTokens,
      totalTokens,

      raw,
    },
  });
}

export async function listProviderRunsBySessionIdFromDb(sessionId) {
  if (!sessionId) return [];

  return prisma.providerRun.findMany({
    where: {
      sessionId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getProviderRunByIdFromDb(providerRunId) {
  if (!providerRunId) return null;

  return prisma.providerRun.findUnique({
    where: {
      id: providerRunId,
    },
  });
}