import express from "express";
import { optimizeController } from "../controllers/optimize.controller.js";

const router = express.Router();

router.post("/", optimizeController);

export default router;