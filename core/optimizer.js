function estimateTokens(text) {
  if (!text || !text.trim()) return 0;
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

function stripFiller(text) {
  return text
    .replace(/\b(please|could you|can you help me|can you|i want to know|i was wondering)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyPrompt(text) {
  const lower = text.toLowerCase();

  if (/\b(analyze|analyse|evaluate|assess)\b/.test(lower)) return "Analytical";
  if (/\b(best|recommend|should i|decide|choose)\b/.test(lower)) return "Decision";
  if (/\b(compare|vs|difference)\b/.test(lower)) return "Comparative";
  if (/\b(write|create|generate)\b/.test(lower)) return "Creative";
  if (/\b(plan|strategy|roadmap)\b/.test(lower)) return "Strategic";
  if (/\b(how to|steps|implement|build|debug|code)\b/.test(lower)) return "Technical";
  if (/\b(explain|what is|why)\b/.test(lower)) return "Informational";

  return "Informational";
}

function getDefaultFormat(type) {
  const formats = {
    Informational: "Use max 7 bullets.",
    Decision: "Give max 3 options with 1 trade-off line each.",
    Comparative: "Use 2-column comparison, max 5 rows.",
    Creative: "Give 2 variants only.",
    Strategic: "Use max 3 sections.",
    Technical: "Use numbered steps only.",
    Analytical: "Give max 3 findings with 1 impact line each.",
  };

  return formats[type] || formats.Informational;
}

function hasAnalyticalData(text) {
  return /\b(data|dataset|file|metrics|numbers|csv|spreadsheet|report|table)\b/i.test(text);
}

function detectComplexity(text) {
  const signals = [
    /\bcompare|vs|trade-off|tradeoff\b/i,
    /\bif\b.+\bthen\b/i,
    /\bchoose|decide|rank|prioritize\b/i,
    /\bbut|however|whereas\b/i,
  ];

  return signals.filter((pattern) => pattern.test(text)).length >= 2;
}

export function optimizePrompt(userPrompt) {
  const tokenCount = estimateTokens(userPrompt);
  const shortPrompt = tokenCount < 15;

  let type = shortPrompt ? "Informational" : classifyPrompt(userPrompt);

  if (type === "Analytical" && !hasAnalyticalData(userPrompt)) {
    return {
      compressedPrompt: "",
      type,
      complex: false,
      notes: [],
      clarify: "Please share the data, file, or metrics to analyse.",
      shortPrompt,
      tokenCount,
    };
  }

  const stripped = shortPrompt ? userPrompt.trim() : stripFiller(userPrompt);
  const complex = shortPrompt ? false : detectComplexity(stripped);
  const formatRule = getDefaultFormat(type);

  const compressedPrompt = `${stripped}. ${formatRule}`;

  return {
    compressedPrompt,
    type,
    complex,
    notes: shortPrompt ? ["Short prompt — Steps 1–3 bypassed"] : [],
    clarify: "",
    shortPrompt,
    tokenCount,
  };
}

export { estimateTokens, classifyPrompt };