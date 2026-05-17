export default function evaluateResponseModeAccuracy(result, expected) {
  if (!expected.responseMode) {
    return {
      status: "PASS",
      expected: null,
      actual: result.raw?.responseMode?.key || null,
      hasInstruction: false,
    };
  }

  const actual = result.raw?.responseMode?.key;

  const finalPrompt =
    result.raw?.finalPrompt ||
    result.optimized ||
    "";

  const hasInstruction =
    typeof finalPrompt === "string" &&
    finalPrompt.includes("RESPONSE CONTRACT:");

  const status =
    actual === expected.responseMode && hasInstruction ? "PASS" : "FAIL";

  return {
    status,
    expected: expected.responseMode,
    actual,
    hasInstruction,
  };
}
