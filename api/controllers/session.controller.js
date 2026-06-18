import {
  archiveSessionInDb,
  getSessionByIdFromDb,
  listActiveSessionsFromDb,
  restoreSessionInDb,
  softDeleteSessionInDb,
} from "../../sessions/repositories/session.repository.js";
import { sendSuccess } from "../utils/sendResponse.js";

function serializeSession(session) {
  if (!session) return null;

  return {
    id: session.id,
    userId: session.userId,
    providerId: session.providerId,
    providerLabel: session.providerLabel,
    modelId: session.modelId,
    title: session.title,
    status: session.status,
    lastActivityAt: session.lastActivityAt,
    archivedAt: session.archivedAt,
    deletedAt: session.deletedAt,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}

function serializeSessionDetail(session) {
  if (!session) return null;

  return {
    ...serializeSession(session),
    messages: session.messages || [],
    optimizationRuns: session.optimizationRuns || [],
    providerRuns: session.providerRuns || [],
  };
}

export async function listSessionsController(req, res) {
  const sessions = await listActiveSessionsFromDb();

  return sendSuccess(res, req, {
    sessions: sessions.map(serializeSession),
  });
}

export async function getSessionController(req, res) {
  const { sessionId } = req.params;

  const session = await getSessionByIdFromDb(sessionId);

  if (!session) {
    return res.status(404).json({
      success: false,
      error: {
        code: "SESSION_NOT_FOUND",
        message: "Session not found.",
      },
    });
  }

  return sendSuccess(res, req, {
    session: serializeSessionDetail(session),
  });
}

export async function archiveSessionController(req, res) {
  const { sessionId } = req.params;

  const existingSession = await getSessionByIdFromDb(sessionId);

  if (!existingSession) {
    return res.status(404).json({
      success: false,
      error: {
        code: "SESSION_NOT_FOUND",
        message: "Session not found.",
      },
    });
  }

  const session = await archiveSessionInDb(sessionId);

  return sendSuccess(res, req, {
    session: serializeSession(session),
  });
}

export async function restoreSessionController(req, res) {
  const { sessionId } = req.params;

  const existingSession = await getSessionByIdFromDb(sessionId);

  if (!existingSession) {
    return res.status(404).json({
      success: false,
      error: {
        code: "SESSION_NOT_FOUND",
        message: "Session not found.",
      },
    });
  }

  const session = await restoreSessionInDb(sessionId);

  return sendSuccess(res, req, {
    session: serializeSession(session),
  });
}

export async function softDeleteSessionController(req, res) {
  const { sessionId } = req.params;

  const existingSession = await getSessionByIdFromDb(sessionId);

  if (!existingSession) {
    return res.status(404).json({
      success: false,
      error: {
        code: "SESSION_NOT_FOUND",
        message: "Session not found.",
      },
    });
  }

  const session = await softDeleteSessionInDb(sessionId);

  return sendSuccess(res, req, {
    session: serializeSession(session),
  });
}