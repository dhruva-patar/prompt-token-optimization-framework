import { extractReferences } from "./extractReferences.js";
import { extractConstraints } from "./detectConstraintSignals.js";
import { extractOutputRequests } from "./detectOutputRequest.js";
import { buildStructuredPrompt } from "./buildStructuredPrompt.js";
import { buildCompactStructuredPrompt } from "./buildCompactStructuredPrompt.js";
import {
  extractItemBlocks,
  formatItemBlocks,
} from "./extractItemBlocks.js";
import { isWithinStructureBudget } from "./structureBudget.js";

function shouldStructurePrompt(text) {
  if (!text || typeof text !== "string") return false;

  const charCount = text.length;
  const hasUrl = /https?:\/\/[^\s]+/i.test(text);
  const hasLineBreaks = /\n/.test(text);
  const hasLongPrompt = charCount >= 280;
  const hasMessySpacing = /\s{3,}/.test(text);
  const hasRepeatedBlocks =
    ((text.match(/\s+-\s+/g) || []).length >= 3) ||
    ((text.match(/\bValue\s*:/gi) || []).length >= 2);

  return hasUrl || hasLineBreaks || hasLongPrompt || hasMessySpacing || hasRepeatedBlocks;
}

function cleanText(text) {
  return (text || "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function runLongPromptStructurer(text) {
  if (!shouldStructurePrompt(text)) {
    return {
      structuredText: text,
      structureNotes: [],
      applied: false,
      structureMode: "none",
      budget: null,
    };
  }

  const { references, textWithoutReferences } = extractReferences(text);

  const {
    itemBlocks,
    textWithoutItemBlocks,
    detected: detectedItemBlocks,
  } = extractItemBlocks(textWithoutReferences);

  const itemBlockText = formatItemBlocks(itemBlocks);

  const { constraints, textWithoutConstraints } =
    extractConstraints(textWithoutItemBlocks);

  const { outputRequests, textWithoutOutputRequests } =
    extractOutputRequests(textWithoutConstraints);

  const remainingText = cleanText(textWithoutOutputRequests);

  const structurePayload = {
    task: remainingText || textWithoutItemBlocks || textWithoutReferences || text,
    references,
    constraints,
    outputRequests,
    itemBlocks: itemBlockText,
  };

  const balancedStructuredText = buildStructuredPrompt(structurePayload);
  const budget = isWithinStructureBudget(text, balancedStructuredText);

  const structuredText = budget.withinBudget
    ? balancedStructuredText
    : buildCompactStructuredPrompt(structurePayload);

  const structureMode = budget.withinBudget ? "balanced" : "compact";

  const structureNotes = [];

  if (references.length) {
    structureNotes.push(`Structured ${references.length} reference link(s).`);
  }

  if (detectedItemBlocks) {
    structureNotes.push(`Structured ${itemBlocks.length} item block(s).`);
  }

  if (constraints.length) {
    structureNotes.push(`Extracted ${constraints.length} constraint signal(s).`);
  }

  if (outputRequests.length) {
    structureNotes.push(`Extracted ${outputRequests.length} output request(s).`);
  }

  if (!budget.withinBudget) {
    structureNotes.push(
      `Used compact structure because balanced structure increased tokens by ${budget.increasePercent}%.`
    );
  }

  if (!structureNotes.length) {
    structureNotes.push("Applied long prompt structural normalization.");
  }

  return {
    structuredText: structuredText || text,
    structureNotes,
    applied: true,
    structureMode,
    budget,
  };
}
