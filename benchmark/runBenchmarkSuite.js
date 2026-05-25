import benchmarkCases from "./benchmarkCases.js";
import noisyPrompts from "./benchmarkCases/noisyPrompts.js";
import responseModeCases from "./benchmarkCases/responseModeCases.js";
import { semanticPreservationCases } from "./benchmarkCases/semanticPreservationCases.js";

import optimizerModule, { optimizePrompt as namedOptimizePrompt } from "../core/optimizer.js";

import evaluateInstructionRetention from "./evaluators/instructionRetention.js";
import evaluateSemanticRisk from "./evaluators/semanticRisk.js";
import evaluateTokenEfficiency from "./evaluators/tokenEfficiency.js";
import evaluateComplexityAccuracy from "./evaluators/complexityAccuracy.js";
import evaluateClarifyAccuracy from "./evaluators/clarifyAccuracy.js";
import evaluateTypeAccuracy from "./evaluators/typeAccuracy.js";
import evaluateResponseModeAccuracy from "./evaluators/responseModeAccuracy.js";

const allBenchmarks = [
  ...benchmarkCases,
  ...noisyPrompts,
  ...semanticPreservationCases,
  ...responseModeCases,
];

const optimizePrompt =
  namedOptimizePrompt ||
  optimizerModule.optimizePrompt ||
  optimizerModule.default ||
  optimizerModule;

function normalizeResult(rawResult, input) {
  const result = rawResult || {};

  return {
    original: input,
    optimized:
      result.compressedPrompt ||
      result.optimizedPrompt ||
      result.optimized ||
      result.output ||
      result.prompt ||
      input,
    type:
      result.type ||
      result.classification ||
      result.promptType ||
      "Unknown",
    complex:
      result.complex ??
      result.isComplex ??
      result.complexity?.isComplex ??
      false,
    shouldClarify:
      result.shouldClarify !== undefined
        ? Boolean(result.shouldClarify)
        : result.needsClarification !== undefined
          ? Boolean(result.needsClarification)
          : Boolean(result.clarify || result.clarification),
    raw: result,
  };
}

function getOverallStatus(evaluations) {
  const statuses = [
    evaluations.typeAccuracy.status,
    evaluations.instructionRetention.status,
    evaluations.tokenEfficiency.status,
    evaluations.complexityAccuracy.status,
    evaluations.clarifyAccuracy.status,
    evaluations.responseModeAccuracy.status,
  ];

  if (evaluations.semanticRisk.risk === "HIGH") return "FAIL";
  if (statuses.includes("FAIL")) return "FAIL";
  if (statuses.includes("WARN") || evaluations.semanticRisk.risk === "MEDIUM") return "WARN";
  return "PASS";
}

export function runBenchmarkSuite({ includeCases = false } = {}) {
  let pass = 0;
  let warn = 0;
  let fail = 0;

  const cases = [];

  for (const testCase of allBenchmarks) {
    let rawResult;

    try {
      rawResult = optimizePrompt(testCase.input, testCase.options || {});
    } catch (error) {
      fail += 1;

      cases.push({
        case: testCase.name,
        status: "FAIL",
        error: error.message,
      });

      continue;
    }

    const result = normalizeResult(rawResult, testCase.input);

    const evaluations = {
      typeAccuracy: evaluateTypeAccuracy(result, testCase.expected),
      instructionRetention: evaluateInstructionRetention(result, testCase.expected),
      semanticRisk: evaluateSemanticRisk(result, testCase.expected),
      tokenEfficiency: evaluateTokenEfficiency(
        result.original,
        result.optimized,
        testCase.expected
      ),
      complexityAccuracy: evaluateComplexityAccuracy(result, testCase.expected),
      clarifyAccuracy: evaluateClarifyAccuracy(result, testCase.expected),
      responseModeAccuracy: evaluateResponseModeAccuracy(result, testCase.expected),
    };

    const status = getOverallStatus(evaluations);

    if (status === "PASS") pass += 1;
    if (status === "WARN") warn += 1;
    if (status === "FAIL") fail += 1;

    if (includeCases) {
      cases.push({
        case: testCase.name,
        expectedType: testCase.expected.type,
        actualType: result.type,
        status,
        semanticRisk: evaluations.semanticRisk.risk,
        tokenReduction: evaluations.tokenEfficiency.reductionPercent,
      });
    }
  }

  return {
    summary: {
      pass,
      warn,
      fail,
      total: pass + warn + fail,
    },
    cases: includeCases ? cases : undefined,
  };
}