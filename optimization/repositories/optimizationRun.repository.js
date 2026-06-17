import { prisma } from "../../db/prismaClient.js";

export async function createOptimizationRunInDb({
  sessionId,
  messageId = null,

  originalPrompt,
  optimizedPrompt = null,
  finalPrompt = null,

  promptType = null,
  complexity = null,
  formatRule = null,

  tokenBefore = null,
  tokenAfter = null,
  tokensSaved = null,
  reductionPercent = null,

  presetId = null,
  providerId = null,
  modelId = null,

  notes = [],
  metadata = {},
} = {}) {
  if (!sessionId) {
    throw new Error("sessionId is required to create an optimization run.");
  }

  if (!originalPrompt) {
    throw new Error("originalPrompt is required to create an optimization run.");
  }

  return prisma.optimizationRun.create({
    data: {
      sessionId,
      messageId,

      originalPrompt,
      optimizedPrompt,
      finalPrompt,

      promptType,
      complexity,
      formatRule,

      tokenBefore,
      tokenAfter,
      tokensSaved,
      reductionPercent,

      presetId,
      providerId,
      modelId,

      notes,
      metadata,
    },
  });
}

export async function listOptimizationRunsBySessionIdFromDb(sessionId) {
  if (!sessionId) return [];

  return prisma.optimizationRun.findMany({
    where: {
      sessionId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getOptimizationRunByIdFromDb(optimizationRunId) {
  if (!optimizationRunId) return null;

  return prisma.optimizationRun.findUnique({
    where: {
      id: optimizationRunId,
    },
  });
}