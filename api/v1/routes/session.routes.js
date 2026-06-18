import express from "express";
import {
  getSessionController,
  listSessionsController,
} from "../../controllers/session.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(listSessionsController));
router.get("/:sessionId", asyncHandler(getSessionController));

export default router;