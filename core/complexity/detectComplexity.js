import { hasConstraintTension } from "./constraintTension.js";

export function detectComplexity(text) {
  const signals = [
    /\bcompare|vs|trade-off|tradeoff\b/i,
    /\bif\b.+\bthen\b/i,
    /\bchoose|decide|rank|prioritize\b/i,
    /\bbut|however|whereas\b/i,
  ];

  const patternComplexity =
    signals.filter((pattern) => pattern.test(text)).length >= 2;

  const constraintTension = hasConstraintTension(text);

  return patternComplexity || constraintTension;
}
