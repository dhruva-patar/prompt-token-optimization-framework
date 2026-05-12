import { runCompressionPipeline } from "./compression/compressionPipeline.js";
import { classifyPrompt } from "./classification/classifyPrompt.js";
import { detectTypeSignals } from "./classification/detectTypeSignals.js";
import { detectComplexity } from "./complexity/detectComplexity.js";
import { needsClarification } from "./clarification/needsClarification.js";


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