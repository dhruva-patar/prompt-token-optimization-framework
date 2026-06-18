import express from "express";
import {
  archiveSessionController,
  getSessionController,
  listSessionsController,
  restoreSessionController,
  softDeleteSessionController,
} from "../../controllers/session.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(listSessionsController));

router.post("/:sessionId/archive", asyncHandler(archiveSessionController));
router.post("/:sessionId/restore", asyncHandler(restoreSessionController));
router.post("/:sessionId/delete", asyncHandler(softDeleteSessionController));

router.get("/:sessionId", asyncHandler(getSessionController));

export default router;