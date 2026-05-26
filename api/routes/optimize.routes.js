import express from "express";
import { optimizeController } from "../controllers/optimize.controller.js";
import { validatePromptRequest } from "../middleware/validatePromptRequest.js";

const router = express.Router();

router.post("/", validatePromptRequest, optimizeController);

export default router;