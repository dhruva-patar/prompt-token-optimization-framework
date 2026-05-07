const REDUNDANT_CONTEXT_PATTERNS = [
  {
    label: "Beginner context repeated",
    pattern: /\b(beginner|non-technical person|first-time user).{0,40}\b(no experience|not technical|new user)\b/i,
  },
  {
    label: "Recommendation intent repeated",
    pattern: /\b(recommend|suggest).{0,60}\b(best option|which one to choose|best choice)\b/i,
  },
  {
    label: "Explanation intent repeated",
    pattern: /\b(explain|describe).{0,60}\b(why|reason|because)\b/i,
  },
  {
    label: "No rewrite constraint repeated",
    pattern: /\b(without rewriting|do not rewrite).{0,60}\b(entire|whole|complete)\b/i,
  },
];

export function detectRedundancySignals(text) {
  if (!text || typeof text !== "string") {
    return [];
  }

  const signals = [];

  REDUNDANT_CONTEXT_PATTERNS.forEach(({ label, pattern }) => {
    if (pattern.test(text)) {
      signals.push(label);
    }
  });

  return signals;
}

export function hasRedundancySignals(text) {
  return detectRedundancySignals(text).length > 0;
}
