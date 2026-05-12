import { explainClassification } from "./explainClassification.js";
import { explainComplexity } from "./explainComplexity.js";
import { explainClarification } from "./explainClarification.js";

export function buildExplanation({
  originalPrompt,
  optimizedPrompt,
  type,
  typeSignals,
  complex,
  shouldClarify,
  compressionNotes = [],
}) {
  return {
    classification: explainClassification(originalPrompt, type),
    complexity: explainComplexity(originalPrompt, typeSignals, complex),
    clarification: explainClarification(originalPrompt, type, shouldClarify),
    compression: compressionNotes.length
      ? compressionNotes
      : ["No structural duplicate or redundancy compression applied."],
    summary: {
      type,
      complex,
      shouldClarify,
      changed: originalPrompt !== optimizedPrompt,
    },
  };
}
