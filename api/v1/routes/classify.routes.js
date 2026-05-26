import express from "express";
import { classifyController } from "../../controllers/classify.controller.js";
import { validatePromptRequest } from "../../middleware/validatePromptRequest.js";

const router = express.Router();

router.post("/", validatePromptRequest, classifyController);

export default router;