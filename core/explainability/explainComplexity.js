export function explainComplexity(text, typeSignals = [], complex = false) {
  const lower = (text || "").toLowerCase();
  const reasons = [];

  const uniqueTypes = [...new Set(typeSignals.map((signal) => signal.type))];

  if (uniqueTypes.length > 1) {
    reasons.push(`Multiple intent families detected: ${uniqueTypes.join(", ")}.`);
  }

  const complexitySignals = [
    ["comparison or trade-off", /\b(compare|vs|versus|trade-off|tradeoff|trade-offs)\b/i],
    ["conditional logic", /\bif\b.+\bthen\b/i],
    ["decision or prioritization", /\b(choose|decide|rank|prioritize)\b/i],
    ["contrast language", /\b(but|however|whereas)\b/i],
  ];

  complexitySignals.forEach(([label, pattern]) => {
    if (pattern.test(lower)) {
      reasons.push(`Detected complexity signal: ${label}.`);
    }
  });

  const expansiveConstraints = [
    "detailed",
    "comprehensive",
    "complete",
    "all",
    "full",
    "thorough",
    "in-depth",
  ];

  const restrictiveConstraints = [
    "short",
    "brief",
    "concise",
    "under",
    "max",
    "maximum",
    "only",
    "limited",
  ];

  const hasExpansive = expansiveConstraints.some((word) => lower.includes(word));
  const hasRestrictive = restrictiveConstraints.some((word) => lower.includes(word));

  if (hasExpansive && hasRestrictive) {
    reasons.push("Detected constraint tension between expansive and restrictive instructions.");
  }

  if (!complex && !reasons.length) {
    reasons.push("No multi-intent or constraint-tension signals detected.");
  }

  return reasons;
}
