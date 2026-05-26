import express from "express";
import { classifyController } from "../../controllers/classify.controller.js";
import { validatePromptRequest } from "../../middleware/validatePromptRequest.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";


const router = express.Router();

router.post("/", validatePromptRequest, asyncHandler(classifyController));

export default router;