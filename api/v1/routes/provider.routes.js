import express from "express";
import { runProviderController, prepareHandoffController } from "../../controllers/provider.controller.js";
import { validatePromptRequest } from "../../middleware/validatePromptRequest.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { providerHealthController } from "../../controllers/providerHealth.controller.js";

const router = express.Router();

router.post("/run", validatePromptRequest, asyncHandler(runProviderController));

router.get("/health", asyncHandler(providerHealthController));

router.post("/handoff", asyncHandler(prepareHandoffController));

export default router;