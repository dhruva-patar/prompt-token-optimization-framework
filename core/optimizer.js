import { runCompressionPipeline } from "./compression/compressionPipeline.js";
import { classifyPrompt } from "./classification/classifyPrompt.js";
import { detectTypeSignals } from "./classification/detectTypeSignals.js";
import { detectComplexity } from "./complexity/detectComplexity.js";
import { needsClarification } from "./clarification/needsClarification.js";
import { runLongPromptStructurer } from "./structure/longPromptStructurer.js";
import { blendFormats } from "./formatting/blendFormats.js";

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

function compressBasic(text) {
  return text
    .replace(/\bwhat is\b/gi, "Explain")
    .replace(/\bcompare it with\b/gi, "vs")
    .replace(/\bsuggest one for\b/gi, "Recommend one for")
    .replace(/\ba customer support chat function\b/gi, "customer support chat")
    .replace(/[ \t]+/g, " ")
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

  const formatRule = blendFormats(type, typeSignals, complex);

  const cleanStripped = stripped.replace(/[?.!]+$/, "");
  const structureResult = runLongPromptStructurer(cleanStripped);

  const pipelineResult = runCompressionPipeline(
    compressBasic(structureResult.structuredText)
  );

  const compressedCore = pipelineResult.compressedText;  


  const compressedPrompt = `${compressedCore}.`; 
  

  return {
    compressedPrompt,
    type,
    complex,
    notes: [
      ...(shortPrompt ? ["Short prompt — Steps 1–3 bypassed"] : []),
      ...structureResult.structureNotes,
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