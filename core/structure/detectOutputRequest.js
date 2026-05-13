const OUTPUT_REQUEST_PATTERNS = [
  /\bgive me\b/i,
  /\bcreate\b/i,
  /\bdraft\b/i,
  /\bwrite\b/i,
  /\bgenerate\b/i,
  /\bmake\b/i,
  /\bformat\b/i,
  /\btable\b/i,
  /\bbullets?\b/i,
  /\btitle\b/i,
  /\bsummary\b/i,
  /\bproposal\b/i,
  /\bcontent\b/i,
  /\bmarketing banner\b/i,
  /\bbrainstorm\b/i,
];

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function extractOutputRequests(text) {
  if (!text || typeof text !== "string") {
    return {
      outputRequests: [],
      textWithoutOutputRequests: "",
    };
  }

  const sentences = splitIntoSentences(text);
  const outputRequests = [];
  const remaining = [];

  sentences.forEach((sentence) => {
    const isOutputRequest = OUTPUT_REQUEST_PATTERNS.some((pattern) =>
      pattern.test(sentence)
    );

    if (isOutputRequest) {
      outputRequests.push(sentence);
    } else {
      remaining.push(sentence);
    }
  });

  return {
    outputRequests,
    textWithoutOutputRequests: remaining.join(" ").trim(),
  };
}
