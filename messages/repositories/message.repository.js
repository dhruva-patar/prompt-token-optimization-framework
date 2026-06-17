import { prisma } from "../../db/prismaClient.js";

export async function createMessageInDb({
  sessionId,
  role,
  content = null,
} = {}) {
  if (!sessionId) {
    throw new Error("sessionId is required to create a message.");
  }

  if (!role) {
    throw new Error("role is required to create a message.");
  }

  const message = await prisma.message.create({
    data: {
      sessionId,
      role,
      content,
    },
  });

  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      lastActivityAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return message;
}

export async function listMessagesBySessionIdFromDb(sessionId) {
  if (!sessionId) return [];

  return prisma.message.findMany({
    where: {
      sessionId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}