import { runCompressionPipeline } from "./compression/compressionPipeline.js";

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

function detectTypeSignals(text) {
  const lower = (text || "").toLowerCase();

  const signals = [];

  const patterns = [
    ["Informational", /\b(explain|what is|why)\b/],
    ["Decision", /\b(best|recommend|should i|decide|choose|suggest one|which)\b/],
    ["Comparative", /\b(compare|vs|versus|difference)\b/],
    ["Creative", /\b(write|create|generate)\b/],
    ["Strategic", /\b(plan|strategy|roadmap|go-to-market|gtm)\b/],
    ["Technical", /\b(how to|steps|implement|build|debug|code)\b/],
    ["Analytical", /\b(analyze|analyse|evaluate|assess)\b/],
  ];

  patterns.forEach(([type, pattern]) => {
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

export function classifyPrompt(text) {
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

  const scores = {
    Informational: 0,
    Decision: 0,
    Comparative: 0,
    Creative: 0,
    Strategic: 0,
    Technical: 0,
    Analytical: 0,
  };

  const scoringRules = [
    ["Informational", /\b(explain|what is|why)\b/g, 1],
    ["Decision", /\b(best|recommend|should i|decide|choose|suggest one|which)\b/g, 2],
    ["Comparative", /\b(compare|vs|versus|difference|trade-offs?)\b/g, 2],
    ["Creative", /\b(write|create|generate)\b/g, 2],
    ["Strategic", /\b(plan|strategy|roadmap|go-to-market|gtm)\b/g, 2],
    //["Technical", /\b(how to|steps|implement|build|debug|code|react|layout|css|mobile|tablet)\b/g, 2],
    ["Technical", /\b(how to|implement|build|debug|code|react|css)\b/g, 2],
    ["Analytical", /\b(analyze|analyse|evaluate|assess|metrics|data)\b/g, 2],
  ];

  scoringRules.forEach(([type, pattern, weight]) => {
    const matches = lower.match(pattern);
    if (matches) {
      scores[type] += matches.length * weight;
    }
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (ranked[0][1] === 0) return "Informational";

  return ranked[0][0];
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

function needsClarification(text, type) {
  const lower = text.toLowerCase();

  const uploadedOrMissingInputSignals =
    /\b(this|uploaded|attached|file|csv|spreadsheet|dataset|metrics|component)\b/i.test(lower);

  const marketResearchSignals =
    /\b(trends|industry|market|country|sector|growth|consumer|startup|economy)\b/i.test(lower);

  if (marketResearchSignals) {
    return false;
  }

  if (type === "Analytical" && uploadedOrMissingInputSignals) {
    return true;
  }

  if (
    type === "Technical" &&
    /\b(this|uploaded|attached)\b/i.test(lower) &&
    /\b(component|code|file)\b/i.test(lower)
  ) {
    return true;
  }

  return false;
}

function hasConstraintTension(text) {
  const lower = text.toLowerCase();

  const expansiveConstraints = [
    "detailed",
    "comprehensive",
    "complete",
    "all",
    "full",
    "thorough",
    "in-depth"
  ];

  const restrictiveConstraints = [
    "short",
    "brief",
    "concise",
    "under",
    "max",
    "maximum",
    "only",
    "limited"
  ];

  const hasExpansive = expansiveConstraints.some((word) =>
    lower.includes(word)
  );

  const hasRestrictive = restrictiveConstraints.some((word) =>
    lower.includes(word)
  );

  return hasExpansive && hasRestrictive;
}

function detectComplexity(text) {
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

function compressBasic(text) {
  return text
    .replace(/\bwhat is\b/gi, "Explain")
    .replace(/\bcompare it with\b/gi, "vs")
    .replace(/\bsuggest one for\b/gi, "Recommend one for")
    .replace(/\ba customer support chat function\b/gi, "customer support chat")
    .replace(/\s+/g, " ")
    .trim();
}

export function optimizePrompt(userPrompt) {
  if (!userPrompt || !userPrompt.trim()) {
    return {
      compressedPrompt: "",
      formatRule: "",
      type: "Waiting",
      complex: false,
      notes: ["Enter a prompt"],
      clarify: "",
      shortPrompt: false,
      tokenCount: 0,
    };
  }

  const tokenCount = estimateTokens(userPrompt);
  const shortPrompt = tokenCount < 15;

  let type = classifyPrompt(userPrompt); 
  
  const stripped = shortPrompt ? userPrompt.trim() : stripFiller(userPrompt);
  
  const typeSignals = detectTypeSignals(userPrompt);
  const uniqueTypes = [...new Set(typeSignals.map((signal) => signal.type))];
  
  const complex = uniqueTypes.length > 1 || detectComplexity(stripped);

  if (needsClarification(userPrompt, type)) {
    return {
      compressedPrompt: "",
      type,
      complex,
      notes: [],
      clarify: "Please share the missing input so I can analyze it accurately.",
      shortPrompt,
      tokenCount,
    };
  }

  const formatRule = getDefaultFormat(type);

  const cleanStripped = stripped.replace(/[?.!]+$/, "");
  //const compressedCore = compressBasic(cleanStripped);
  
  const pipelineResult = runCompressionPipeline(compressBasic(cleanStripped));
  const compressedCore = pipelineResult.compressedText;
  
  const compressedPrompt = `${compressedCore}.`; 
  

  return {
    compressedPrompt,
    type,
    complex,
    notes: [
      ...(shortPrompt ? ["Short prompt — Steps 1–3 bypassed"] : []),
      ...pipelineResult.compressionNotes,
    ],
    clarify: "",
    shortPrompt,
    tokenCount,
    formatRule,
  };
}

export { estimateTokens};
export default optimizePrompt;