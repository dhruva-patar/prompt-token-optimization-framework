import {
  calculateClassificationScores,
  getHighestScoringType,
} from "./confidenceScoring.js";

function detectPrimaryIntentOverride(text) {
  const lower = (text || "").toLowerCase();

  const startsWithCompare = /^\s*(compare|vs|versus)\b/i.test(lower);
  const startsWithDecision = /^\s*(should i|decide|choose|recommend)\b/i.test(lower);
  const startsWithCreate = /^\s*(create|write|generate)\b/i.test(lower);
  const startsWithAnalyze = /^\s*(analyze|analyse|evaluate|assess)\b/i.test(lower);
  const startsWithDebug = /^\s*(debug|fix|troubleshoot)\b/i.test(lower);

  if (startsWithCompare) return "Comparative";
  if (startsWithDecision) return "Decision";
  if (startsWithCreate) return "Creative";
  if (startsWithAnalyze) return "Analytical";
  if (startsWithDebug) return "Technical";

  const hasDebugContext =
    /\b(debug|fix|troubleshoot|broken|issue|problem)\b/i.test(lower) &&
    /\b(react|code|component|layout|css|mobile|tablet)\b/i.test(lower);

  if (hasDebugContext) return "Technical";

  return null;
}

export function classifyPrompt(text) {
  const overrideType = detectPrimaryIntentOverride(text);

  if (overrideType) {
    return overrideType;
  }

  const scores = calculateClassificationScores(text);

  return getHighestScoringType(scores);
}
