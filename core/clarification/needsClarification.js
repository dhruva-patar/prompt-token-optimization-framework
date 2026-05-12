export function needsClarification(text, type) {
  const lower = (text || "").toLowerCase();

  const referencesMissingInput =
    /\b(this|uploaded|attached)\b/i.test(lower);

  const referencesFileOrData =
    /\b(file|csv|spreadsheet|dataset|metrics)\b/i.test(lower);

  const referencesCodeArtifact =
    /\b(component|code|file)\b/i.test(lower);

  const marketResearchSignals =
    /\b(trends|industry|market|country|sector|growth|consumer|startup|economy)\b/i.test(lower);

  if (marketResearchSignals) {
    return false;
  }

  if (type === "Analytical" && referencesMissingInput && referencesFileOrData) {
    return true;
  }

  if (type === "Technical" && referencesMissingInput && referencesCodeArtifact) {
    return true;
  }

  return false;
}
