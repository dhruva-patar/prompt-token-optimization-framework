import { classificationSignals } from "./classifySignals.js";

export function calculateClassificationScores(text) {
  const lower = (text || "").toLowerCase();

  const scores = {
    Informational: 0,
    Decision: 0,
    Comparative: 0,
    Creative: 0,
    Strategic: 0,
    Technical: 0,
    Analytical: 0,
  };

  classificationSignals.forEach(({ type, pattern, weight }) => {
    pattern.lastIndex = 0;
    const matches = lower.match(pattern);

    if (matches) {
      scores[type] += matches.length * weight;
    }
  });

  return scores;
}

export function getHighestScoringType(scores) {
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (!ranked.length || ranked[0][1] === 0) {
    return "Informational";
  }

  return ranked[0][0];
}
