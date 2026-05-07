const evaluateTypeAccuracy = require("./evaluators/typeAccuracy");

const benchmarkCases = require("./benchmarkCases");

const noisyPrompts = require("./benchmarkCases/noisyPrompts");
const allBenchmarks = [
  ...benchmarkCases,
  ...noisyPrompts
];

const fs = require("fs");
const path = require("path");

const evaluateInstructionRetention = require("./evaluators/instructionRetention");
const evaluateSemanticRisk = require("./evaluators/semanticRisk");
const evaluateTokenEfficiency = require("./evaluators/tokenEfficiency");
const evaluateComplexityAccuracy = require("./evaluators/complexityAccuracy");
const evaluateClarifyAccuracy = require("./evaluators/clarifyAccuracy");

const optimizerModule = require("../core/optimizer");

const optimizePrompt =
  optimizerModule.optimizePrompt ||
  optimizerModule.optimize ||
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
    evaluations.instructionRetention.status,
    evaluations.tokenEfficiency.status,
    evaluations.complexityAccuracy.status,
    evaluations.clarifyAccuracy.status,
    evaluations.typeAccuracy.status,
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
  console.log("");
  console.log(`Result: ${overallStatus}`);
  console.log(`Type Accuracy: ${evaluations.typeAccuracy.status}`);
}

function runBenchmarkSuite() {
  let pass = 0;
  let warn = 0;
  let fail = 0;

  const results = [];

  allBenchmarks.forEach((testCase) => {
    let rawResult;

    try {
      rawResult = optimizePrompt(testCase.input);
    } catch (error) {
      console.error(`\nFAILED TO RUN OPTIMIZER FOR CASE: ${testCase.name}`);
      console.error(error);
      fail += 1;
      return;
    }

    const result = normalizeResult(rawResult, testCase.input);

    const evaluations = {
      instructionRetention: evaluateInstructionRetention(result, testCase.expected),
      semanticRisk: evaluateSemanticRisk(result, testCase.expected),
      tokenEfficiency: evaluateTokenEfficiency(result.original, result.optimized),
      complexityAccuracy: evaluateComplexityAccuracy(result, testCase.expected),
      clarifyAccuracy: evaluateClarifyAccuracy(result, testCase.expected),
      typeAccuracy: evaluateTypeAccuracy(result, testCase.expected),
    };

    const overallStatus = getOverallStatus(evaluations);

    results.push({
    case: testCase.name,
    expectedType: testCase.expected.type,
    actualType: result.type,
    status: overallStatus,
    semanticRisk: evaluations.semanticRisk.risk,
    tokenReduction: evaluations.tokenEfficiency.reductionPercent,
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

  const resultsDir = path.join(__dirname, "results");

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
