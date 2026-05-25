import { runBenchmarkSuite } from "../../benchmark/runBenchmarkSuite.js";

export function benchmarkController(req, res) {
  try {
    const { includeCases = false } = req.body || {};

    const result = runBenchmarkSuite({ includeCases });

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}