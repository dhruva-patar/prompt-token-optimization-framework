function normalizeWhitespace(text) {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const REPEATED_INTENT_PATTERNS = [
  {
    intent: "explain",
    pattern: /\bexplain\s+(.+?)\s+and\s+explain\s+/gi,
    replacement: "explain $1 and ",
  },
  {
    intent: "compare",
    pattern: /\bcompare\s+(.+?)\s+and\s+compare\s+/gi,
    replacement: "compare $1 and ",
  },
  {
    intent: "recommend",
    pattern: /\brecommend\s+(.+?)\s+and\s+recommend\s+/gi,
    replacement: "recommend $1 and ",
  },
  {
    intent: "analyze",
    pattern: /\banaly[sz]e\s+(.+?)\s+and\s+analy[sz]e\s+/gi,
    replacement: "analyze $1 and ",
  },
  {
    intent: "identify",
    pattern: /\bidentify\s+(.+?)\s+and\s+identify\s+/gi,
    replacement: "identify $1 and ",
  },
  {
    intent: "suggest",
    pattern: /\bsuggest\s+(.+?)\s+and\s+suggest\s+/gi,
    replacement: "suggest $1 and ",
  },
];

function removeDuplicateAdjacentWords(text) {
  return text.replace(/\b(\w+)\s+\1\b/gi, "$1");
}

function reduceRepeatedIntentVerbs(text) {
  let result = text;

  REPEATED_INTENT_PATTERNS.forEach(({ pattern, replacement }) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}



function removeDuplicateSentences(text) {
  if (/^[A-Z /]+:/m.test(text)) {
    return text;
  }

  const sentenceParts = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const seen = new Set();
  const uniqueSentences = [];

  sentenceParts.forEach((sentence) => {
    const normalized = sentence.toLowerCase().replace(/[^\w\s]/g, "").trim();

    if (!seen.has(normalized)) {
      seen.add(normalized);
      uniqueSentences.push(sentence);
    }
  });

  return uniqueSentences.join(" ");
}

export function reduceDuplicates(text) {
  if (!text || typeof text !== "string") return "";

  let result = text;

  result = normalizeWhitespace(result);
  result = removeDuplicateAdjacentWords(result);
  result = reduceRepeatedIntentVerbs(result);
  result = removeDuplicateSentences(result);
  result = normalizeWhitespace(result);

  return result;
}

export function detectDuplicateSignals(text) {
  if (!text || typeof text !== "string") {
    return [];
  }

  const signals = [];

  if (/\b(\w+)\s+\1\b/i.test(text)) {
    signals.push("Duplicate adjacent word detected.");
  }

  REPEATED_INTENT_PATTERNS.forEach(({ intent, pattern }) => {
    pattern.lastIndex = 0;
    if (pattern.test(text)) {
      signals.push(`Repeated intent detected: ${intent}.`);
    }
  });

  const sentenceParts = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const normalizedSentences = sentenceParts.map((sentence) =>
    sentence.toLowerCase().replace(/[^\w\s]/g, "").trim()
  );

  const uniqueSentenceCount = new Set(normalizedSentences).size;

  if (sentenceParts.length > uniqueSentenceCount) {
    signals.push("Duplicate sentence detected.");
  }

  return signals;
}
