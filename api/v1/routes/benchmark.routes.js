import express from "express";
import { benchmarkController } from "../../controllers/benchmark.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(benchmarkController));

export default router;