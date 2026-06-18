import { prisma } from "../../db/prismaClient.js";

export async function createSessionInDb({
  userId = null,
  providerId,
  providerLabel = null,
  modelId = null,
  title = "New session",
} = {}) {
  if (!providerId) {
    throw new Error("providerId is required to create a session.");
  }

  return prisma.session.create({
    data: {
      userId,
      providerId,
      providerLabel,
      modelId,
      title,
      status: 0,
      lastActivityAt: new Date(),
    },
  });
}

export async function getSessionByIdFromDb(sessionId) {
  if (!sessionId) return null;

  return prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      optimizationRuns: {
        orderBy: {
          createdAt: "asc",
        },
      },
      providerRuns: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

export async function listActiveSessionsFromDb({ userId = null } = {}) {
  return prisma.session.findMany({
    where: {
      status: 0,
      ...(userId ? { userId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function listSessionsGroupedByProviderFromDb({
  userId = null,
} = {}) {
  const sessions = await listActiveSessionsFromDb({ userId });

  return sessions.reduce((groups, session) => {
    if (!groups[session.providerId]) {
      groups[session.providerId] = [];
    }

    groups[session.providerId].push(session);
    return groups;
  }, {});
}

export async function updateSessionActivityInDb(sessionId) {
  if (!sessionId) return null;

  const now = new Date();

  return prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      lastActivityAt: now,
      updatedAt: now,
    },
  });
}

export async function archiveSessionInDb(sessionId) {
  if (!sessionId) return null;

  const now = new Date();

  return prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      status: 1,
      archivedAt: now,
      updatedAt: now,
    },
  });
}

export async function restoreSessionInDb(sessionId) {
  if (!sessionId) return null;

  const now = new Date();

  return prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      status: 0,
      archivedAt: null,
      deletedAt: null,
      updatedAt: now,
    },
  });
}

export async function softDeleteSessionInDb(sessionId) {
  if (!sessionId) return null;

  const now = new Date();

  return prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      status: 2,
      deletedAt: now,
      updatedAt: now,
    },
  });
}

export async function archiveInactiveSessionsInDb(days = 90) {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const now = new Date();

  return prisma.session.updateMany({
    where: {
      status: 0,
      lastActivityAt: {
        lt: cutoff,
      },
    },
    data: {
      status: 1,
      archivedAt: now,
      updatedAt: now,
    },
  });
}