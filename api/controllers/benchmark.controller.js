import { runBenchmarkSuite } from "../../benchmark/runBenchmarkSuite.js";
import { sendSuccess } from "../utils/sendResponse.js";

export function benchmarkController(req, res, next) {
  try {
    const { includeCases = false } = req.body || {};

    const result = runBenchmarkSuite({ includeCases });

    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}