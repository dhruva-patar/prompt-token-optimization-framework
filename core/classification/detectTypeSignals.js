import { signalDetectionPatterns } from "./classifySignals.js";

export function detectTypeSignals(text) {
  const lower = (text || "").toLowerCase();
  const signals = [];

  signalDetectionPatterns.forEach(([type, pattern]) => {
    const match = lower.match(pattern);

    if (match) {
      signals.push({
        type,
        index: match.index,
      });
    }
  });

  return signals.sort((a, b) => a.index - b.index);
}
