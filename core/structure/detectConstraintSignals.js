const CONSTRAINT_PATTERNS = [
  /\bkeep it\b/i,
  /\bkeep this\b/i,
  /\bdo not\b/i,
  /\bdon't\b/i,
  /\bwithout\b/i,
  /\bavoid\b/i,
  /\bunder\s+\d+/i,
  /\bmax\s+\d+/i,
  /\bmaximum\s+\d+/i,
  /\bbrief\b/i,
  /\bconcise\b/i,
  /\bshort\b/i,
  /\bwait\b/i,
  /\blet me know\b/i,
];

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function extractConstraints(text) {
  if (!text || typeof text !== "string") {
    return {
      constraints: [],
      textWithoutConstraints: "",
    };
  }

  const sentences = splitIntoSentences(text);
  const constraints = [];
  const remaining = [];

  sentences.forEach((sentence) => {
    const isConstraint = CONSTRAINT_PATTERNS.some((pattern) =>
      pattern.test(sentence)
    );

    if (isConstraint) {
      constraints.push(sentence);
    } else {
      remaining.push(sentence);
    }
  });

  return {
    constraints,
    textWithoutConstraints: remaining.join(" ").trim(),
  };
}
