import fs from "fs";
import path from "path";

import benchmarkCases from "./benchmarkCases.js";
import noisyPrompts from "./benchmarkCases/noisyPrompts.js";
//import longPromptStructuringCases from "./benchmarkCases/longPromptStructuring.js";
import responseModeCases from "./benchmarkCases/responseModeCases.js";

import evaluateInstructionRetention from "./evaluators/instructionRetention.js";
import evaluateSemanticRisk from "./evaluators/semanticRisk.js";
import evaluateTokenEfficiency from "./evaluators/tokenEfficiency.js";
import evaluateComplexityAccuracy from "./evaluators/complexityAccuracy.js";
import evaluateClarifyAccuracy from "./evaluators/clarifyAccuracy.js";
import evaluateTypeAccuracy from "./evaluators/typeAccuracy.js";

import optimizerModule, { optimizePrompt as namedOptimizePrompt } from "../core/optimizer.js";


import evaluateResponseModeAccuracy from "./evaluators/responseModeAccuracy.js";

const allBenchmarks = [
  ...benchmarkCases,
  ...noisyPrompts,
 // ...longPromptStructuringCases,
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

function printCaseReport(testCase, result, evaluations, overallStatus) {
  console.log("\n========================");
  console.log("PTOF Benchmark Case");
  console.log("========================");
  console.log(`Case: ${testCase.name}`);
  console.log(`Expected Type: ${testCase.expected.type}`);
  console.log(`Actual Type: ${result.type}`);
  console.log("");
  console.log(`Original Tokens: ${evaluations.tokenEfficiency.originalTokens}`);
  console.log(`Optimized Tokens: ${evaluations.tokenEfficiency.optimizedTokens}`);
  console.log(`Reduction: ${evaluations.tokenEfficiency.reductionPercent}%`);
  console.log("");
  console.log(`Instruction Retention: ${evaluations.instructionRetention.status}`);

  if (evaluations.instructionRetention.missingTerms.length) {
    console.log(`  Missing terms: ${evaluations.instructionRetention.missingTerms.join(", ")}`);
  }

  if (evaluations.instructionRetention.missingIntents.length) {
    console.log(`  Missing intents: ${evaluations.instructionRetention.missingIntents.join(", ")}`);
  }

  console.log(`Semantic Risk: ${evaluations.semanticRisk.risk}`);

  if (evaluations.semanticRisk.reasons.length) {
    evaluations.semanticRisk.reasons.forEach((reason) => console.log(`  - ${reason}`));
  }

  console.log(`Complexity Detection: ${evaluations.complexityAccuracy.status}`);
  console.log(`Clarification Logic: ${evaluations.clarifyAccuracy.status}`);
  console.log(`Type Accuracy: ${evaluations.typeAccuracy.status}`);
  console.log(`Response Mode Accuracy: ${evaluations.responseModeAccuracy.status}`);

  if (result.raw?.responseMode?.displayName) {
    console.log(`Selected Mode: ${result.raw.responseMode.displayName}`);
  }
  console.log("");
  console.log(`Result: ${overallStatus}`);
}

function runBenchmarkSuite() {
  let pass = 0;
  let warn = 0;
  let fail = 0;

  const results = [];

  allBenchmarks.forEach((testCase) => {
    let rawResult;

    try {
      rawResult = optimizePrompt(testCase.input, testCase.options || {});
    } catch (error) {
      console.error(`\nFAILED TO RUN OPTIMIZER FOR CASE: ${testCase.name}`);
      console.error(error);
      fail += 1;
      return;
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

    const overallStatus = getOverallStatus(evaluations);

    results.push({
      case: testCase.name,
      expectedType: testCase.expected.type,
      actualType: result.type,
      status: overallStatus,
      semanticRisk: evaluations.semanticRisk.risk,
      tokenReduction: evaluations.tokenEfficiency.reductionPercent,
      typeAccuracy: evaluations.typeAccuracy.status,
      instructionRetention: evaluations.instructionRetention.status,
      complexityAccuracy: evaluations.complexityAccuracy.status,
      clarifyAccuracy: evaluations.clarifyAccuracy.status,
    });

    if (overallStatus === "PASS") pass += 1;
    if (overallStatus === "WARN") warn += 1;
    if (overallStatus === "FAIL") fail += 1;

    printCaseReport(testCase, result, evaluations, overallStatus);
  });

  console.log("\n========================");
  console.log("PTOF Benchmark Summary");
  console.log("========================");
  console.log(`PASS: ${pass}`);
  console.log(`WARN: ${warn}`);
  console.log(`FAIL: ${fail}`);
  
  const resultsDir = path.join(process.cwd(), "test", "results");

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const resultsPath = path.join(resultsDir, `benchmark-${timestamp}.json`);

  fs.writeFileSync(
    resultsPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary: { pass, warn, fail },
        cases: results,
      },
      null,
      2
    )
  );

  console.log(`\nSaved benchmark results: ${resultsPath}`);

  if (fail > 0) {
    process.exitCode = 1;
  }
}

runBenchmarkSuite();
