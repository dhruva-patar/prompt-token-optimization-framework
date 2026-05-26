import express from "express";
import { benchmarkController } from "../../controllers/benchmark.controller.js";

const router = express.Router();

router.post("/", benchmarkController);

export default router;