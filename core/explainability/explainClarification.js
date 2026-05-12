export function explainClarification(text, type, shouldClarify) {
  const lower = (text || "").toLowerCase();
  const reasons = [];

  const referencesMissingInput = /\b(this|uploaded|attached)\b/i.test(lower);
  const referencesFileOrData = /\b(file|csv|spreadsheet|dataset|metrics)\b/i.test(lower);
  const referencesCodeArtifact = /\b(component|code|file)\b/i.test(lower);
  const marketResearchSignals = /\b(trends|industry|market|country|sector|growth|consumer|startup|economy)\b/i.test(lower);

  if (marketResearchSignals) {
    reasons.push("Market or industry analysis detected; clarification is not required by default.");
  }

  if (type === "Analytical" && referencesMissingInput && referencesFileOrData) {
    reasons.push("Analytical prompt references missing uploaded/internal data.");
  }

  if (type === "Technical" && referencesMissingInput && referencesCodeArtifact) {
    reasons.push("Technical prompt references a missing code artifact.");
  }

  if (!shouldClarify && !reasons.length) {
    reasons.push("No missing input dependency detected.");
  }

  return reasons;
}
