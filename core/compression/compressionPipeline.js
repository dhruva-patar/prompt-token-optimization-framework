import { reduceDuplicates, detectDuplicateSignals } from "./duplicateReducer.js";
import { detectRedundancySignals } from "./redundancyDetector.js";

export function runCompressionPipeline(text) {
  if (!text || typeof text !== "string") {
    return {
      compressedText: "",
      compressionNotes: [],
    };
  }

  const duplicateSignals = detectDuplicateSignals(text);
  const redundancySignals = detectRedundancySignals(text);

  let compressedText = text;

  compressedText = reduceDuplicates(compressedText);

  const compressionNotes = [
    ...duplicateSignals,
    ...redundancySignals.map((signal) => `Possible redundant context detected: ${signal}.`),
  ];

  return {
    compressedText,
    compressionNotes,
  };
}
