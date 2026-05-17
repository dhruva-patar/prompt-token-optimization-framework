const STRUCTURE_TOKEN_BUDGET_RATIO = 1.15;

export function estimateStructureTokens(text) {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.3);
}

export function isWithinStructureBudget(originalText, structuredText) {
  const originalTokens = estimateStructureTokens(originalText);
  const structuredTokens = estimateStructureTokens(structuredText);

  if (originalTokens === 0) {
    return {
      withinBudget: true,
      originalTokens,
      structuredTokens,
      increasePercent: 0,
      budgetRatio: STRUCTURE_TOKEN_BUDGET_RATIO,
    };
  }

  const increasePercent = Math.round(
    ((structuredTokens - originalTokens) / originalTokens) * 100
  );

  return {
    withinBudget: structuredTokens <= originalTokens * STRUCTURE_TOKEN_BUDGET_RATIO,
    originalTokens,
    structuredTokens,
    increasePercent,
    budgetRatio: STRUCTURE_TOKEN_BUDGET_RATIO,
  };
}
