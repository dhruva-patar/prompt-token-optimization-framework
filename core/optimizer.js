import { runCompressionPipeline } from "./compression/compressionPipeline.js";
import { classifyPrompt } from "./classification/classifyPrompt.js";
import { detectTypeSignals } from "./classification/detectTypeSignals.js";
import { detectComplexity } from "./complexity/detectComplexity.js";
import { needsClarification } from "./clarification/needsClarification.js";
import { runLongPromptStructurer } from "./structure/longPromptStructurer.js";
import { blendFormats } from "./formatting/blendFormats.js";
import { applyResponseMode } from "./responseModes/applyResponseMode.js";
import { getPresetById } from "../presets/presetRegistry.js";


function estimateTokens(text) {
  if (!text || !text.trim()) return 0;
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

function stripFiller(text) {
  return text
    .replace(/\b(please|could you|can you help me|can you|i want to know|i was wondering)\b/gi, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function compressBasic(text) {
  return text
    .replace(/\bwhat is\b/gi, "Explain")
    .replace(/\band list out\b/gi, "List")
    .replace(/\blist out\b/gi, "List")
    .replace(/\bfor my startup\b/gi, "for the startup")
    .replace(/\bcompare it with\b/gi, "vs")
    .replace(/\bsuggest one for\b/gi, "Recommend one for")
    .replace(/\ba customer support chat function\b/gi, "customer support chat")
    .replace(/[ \t]+/g, " ")
    .replace(/\bso on and so forth\b/gi, "")
    .replace(/\btell me about about\b/gi, "Tell me about")
    .replace(/\band list out\b/gi, "List")
    .trim();
}

export function optimizePrompt(userPrompt, options = {}) {
  const responseModeOption = options.responseMode || "default";

  const preset = options.presetId
  ? getPresetById(options.presetId)
  : null;

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
      optimizationMetrics: {
        beforeTokens: 0,
        afterTokens: 0,
        tokensSaved: 0,
        reductionPercent: 0,
      },
      responseMode: {
        key: "default",
        displayName: "Default",
        instruction: "",
      },
    };
  }

  const tokenCount = estimateTokens(userPrompt);
  const shortPrompt = tokenCount < 15;

  const type = classifyPrompt(userPrompt);
  const stripped = shortPrompt ? userPrompt.trim() : stripFiller(userPrompt);

  const typeSignals = detectTypeSignals(userPrompt);
  const uniqueTypes = [...new Set(typeSignals.map((signal) => signal.type))];

  const complex = uniqueTypes.length > 1 || detectComplexity(stripped);
  const formatRule = blendFormats(type, typeSignals, complex);

  if (needsClarification(userPrompt, type)) {
    return {
      compressedPrompt: "",
      type,
      complex,
      notes: [],
      clarify: "Please share the missing input so I can analyze it accurately.",
      shortPrompt,
      tokenCount,
      optimizationMetrics: {
        beforeTokens: tokenCount,
        afterTokens: 0,
        tokensSaved: 0,
        reductionPercent: 0,
      },
      formatRule: blendFormats(type, typeSignals, complex),
    };
  }

  const cleanStripped = stripped
    .replace(/[?.!]+$/, "")
    .replace(/([.!?])(?=[A-Z])/g, "$1 ");

  const structureResult = shortPrompt
    ? { structuredText: cleanStripped, structureNotes: [] }
    : runLongPromptStructurer(cleanStripped);
  
  const pipelineResult = runCompressionPipeline(
    compressBasic(structureResult.structuredText)
  );

  const compressedCore = pipelineResult.compressedText;
  const baseCompressedPrompt = `${compressedCore}.`;

  const responseModeResult = applyResponseMode(
    baseCompressedPrompt,
    responseModeOption
  );

  const presetInstruction = preset?.macroCode || preset?.hiddenInstruction || "";

  const finalPromptWithPreset = presetInstruction
    ? `${responseModeResult.finalPrompt}\n\n${presetInstruction}`
    : responseModeResult.finalPrompt;

  const beforeTokens = tokenCount;
  //const afterTokens = estimateTokens(responseModeResult.finalPrompt);
  const afterTokens = estimateTokens(finalPromptWithPreset);

  const tokensSaved = Math.max(beforeTokens - afterTokens, 0);

  const reductionPercent =
    beforeTokens > 0
      ? Math.round((tokensSaved / beforeTokens) * 100)
      : 0;

  return {
    compressedPrompt: baseCompressedPrompt,
    finalPrompt: finalPromptWithPreset,
    presetApplied: preset
      ? {
          id: preset.id,
          displayName: preset.displayName,
          providerType: preset.providerType,
        }
      : null,
    responseEnhancementBlock: responseModeResult.enhancementBlock,
    type,
    complex,
    notes: [
      ...(shortPrompt ? ["Short prompt — heavy optimization bypassed"] : []),
      ...structureResult.structureNotes,
      ...pipelineResult.compressionNotes,
      ...(responseModeResult.applied
        ? [`Applied response mode: ${responseModeResult.responseMode.displayName}`]
        : []),
    ],
    clarify: "",
    shortPrompt,
    tokenCount,
    optimizationMetrics: {
      beforeTokens,
      afterTokens,
      tokensSaved,
      reductionPercent,
    },
    formatRule,
    responseMode: responseModeResult.responseMode,
  };
}

export { estimateTokens };
export default optimizePrompt;
