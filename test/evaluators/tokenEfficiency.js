function estimateTokens(text) {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.3);
}

export default function evaluateTokenEfficiency(original, optimized) {
  const originalTokens = estimateTokens(original);
  const optimizedTokens = estimateTokens(optimized);

  const reductionPercent =
    originalTokens === 0
      ? 0
      : Math.round(((originalTokens - optimizedTokens) / originalTokens) * 100);

  let status = "PASS";

  if (reductionPercent < 1) {
    status = "NEUTRAL";
  }

  if (reductionPercent < -10) {
    status = "WARN";
  }

  return {
    originalTokens,
    optimizedTokens,
    reductionPercent,
    status,
  };
}
