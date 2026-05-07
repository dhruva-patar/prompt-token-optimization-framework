const HIGH_VALUE_PATTERNS = {
  geographic: /\b(Nordic|Europe|European|Norway|Oslo|India|US|USA|UK|EMEA|APAC)\b/i,
  numeric: /\b\d+[%x]?\b/i,
  dataSource: /\b(CSV|uploaded|dataset|metrics|spreadsheet|file)\b/i,
  businessDomain: /\b(fintech|SaaS|B2B|startup|startups|e-commerce|market|industry)\b/i,
};

function includesIgnoreCase(text, term) {
  return text.toLowerCase().includes(term.toLowerCase());
}

function detectRemovedPattern(original, optimized, pattern, label) {
  return pattern.test(original) && !pattern.test(optimized)
    ? `${label} specificity appears to have been removed.`
    : null;
}

function evaluateSemanticRisk(result, expected) {
  const original = result.original || "";
  const optimized = result.optimized || "";
  const reasons = [];

  Object.entries(HIGH_VALUE_PATTERNS).forEach(([label, pattern]) => {
    const reason = detectRemovedPattern(original, optimized, pattern, label);
    if (reason) reasons.push(reason);
  });

  (expected.criticalTerms || []).forEach((term) => {
    if (includesIgnoreCase(original, term) && !includesIgnoreCase(optimized, term)) {
      reasons.push(`Critical term removed: "${term}".`);
    }
  });

  const originalWordCount = original.trim().split(/\s+/).filter(Boolean).length;
  const optimizedWordCount = optimized.trim().split(/\s+/).filter(Boolean).length;

  if (optimizedWordCount < originalWordCount * 0.45 && originalWordCount > 8) {
    reasons.push("Optimized prompt may be over-compressed.");
  }

  let risk = "LOW";

  if (reasons.length >= 1) {
    risk = "MEDIUM";
  }

  if (reasons.length >= 3) {
    risk = "HIGH";
  }

  return {
    risk,
    reasons,
  };
}

module.exports = evaluateSemanticRisk;
