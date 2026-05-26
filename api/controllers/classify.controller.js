import { classifyPrompt } from "../../core/classification/classifyPrompt.js";
import { detectTypeSignals } from "../../core/classification/detectTypeSignals.js";
import { sendSuccess } from "../utils/sendResponse.js";

  export async function classifyController(req, res) {
    const { prompt } = req.body;

    const type = classifyPrompt(prompt);
    const typeSignals = detectTypeSignals(prompt);

    return sendSuccess(res, 
    req,
    {
      type,
      signals: typeSignals,
    });
  } 
