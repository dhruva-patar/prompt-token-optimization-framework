import express from "express";
import { optimizeController } from "../../controllers/optimize.controller.js";
import { validatePromptRequest } from "../../middleware/validatePromptRequest.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", validatePromptRequest, asyncHandler(optimizeController));

export default router;