import express from "express";
import { presetController } from "../../controllers/preset.controller.js";

const router = express.Router();

router.get("/", presetController);

export default router;