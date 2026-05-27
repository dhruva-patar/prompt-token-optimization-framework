import express from "express";
import { runProviderController } from "../../controllers/provider.controller.js";
import { validatePromptRequest } from "../../middleware/validatePromptRequest.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post("/run", validatePromptRequest, asyncHandler(runProviderController));

export default router;