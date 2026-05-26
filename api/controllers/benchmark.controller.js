import { runBenchmarkSuite } from "../../benchmark/runBenchmarkSuite.js";

export function benchmarkController(req, res, next) {
  try {
    const { includeCases = false } = req.body || {};

    const result = runBenchmarkSuite({ includeCases });

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
}