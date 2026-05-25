import express from "express";
import { classifyController } from "../controllers/classify.controller.js";

const router = express.Router();

router.post("/", classifyController);

export default router;