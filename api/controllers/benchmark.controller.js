import { runBenchmarkSuite } from "../../benchmark/runBenchmarkSuite.js";
import { sendSuccess } from "../utils/sendResponse.js";

export async function benchmarkController(req, res) {
    const { includeCases = false } = req.body || {};

    const result = runBenchmarkSuite({ includeCases });

    return sendSuccess(res, req, result);
  } 