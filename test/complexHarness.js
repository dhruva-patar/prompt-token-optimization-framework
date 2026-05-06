import { optimizePrompt } from "../core/optimizer.js";

const complexTests = [
  {
    id: "complex-001",
    label: "Informational + Comparative + Decision",
    input:
      "What is a REST API? Compare it with WebSockets. Suggest one for a customer support chat function.",
    expectedType: "Informational",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "complex-002",
    label: "Comparative + Decision",
    input:
      "Compare React vs Vue and recommend one for building a SaaS dashboard with a small frontend team.",
    expectedType: "Comparative",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "complex-003",
    label: "Strategic + Technical",
    input:
      "Plan a go-to-market strategy for an AI productivity tool and include implementation steps for the launch website.",
    expectedType: "Strategic",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "complex-004",
    label: "Analytical + Decision",
    input:
      "Analyze churn trends and recommend which customer segment we should prioritize for retention campaigns.",
    expectedType: "Analytical",
    expectedComplex: true,
    shouldClarify: true,
    shortPrompt: false,
  },
  {
    id: "complex-005",
    label: "Creative + Strategic",
    input:
      "Write onboarding copy for a fintech app and align it with a retention strategy for users who fail KYC verification.",
    expectedType: "Creative",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "complex-006",
    label: "Technical + Comparative + Decision",
    input:
      "Explain how JWT authentication works, compare it with session-based auth, and recommend one for a startup MVP.",
    expectedType: "Informational",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: false,
  },

  // Short complex prompts
  {
    id: "complex-007",
    label: "Short Comparative + Decision",
    input: "React vs Vue, recommend one.",
    expectedType: "Comparative",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: true,
  },
  {
    id: "complex-008",
    label: "Short Informational + Comparative",
    input: "REST API vs WebSockets?",
    expectedType: "Comparative",
    expectedComplex: false,
    shouldClarify: false,
    shortPrompt: true,
  },
  {
    id: "complex-009",
    label: "Short Strategic + Technical",
    input: "Plan MVP and build roadmap.",
    expectedType: "Strategic",
    expectedComplex: true,
    shouldClarify: false,
    shortPrompt: true,
  },
];

let passed = 0;
let failed = 0;

console.log("\nPTOF Complex Harness");
console.log("====================\n");

complexTests.forEach((test) => {
  const result = optimizePrompt(test.input);

  const typePass = result.type === test.expectedType;
  const complexPass = result.complex === test.expectedComplex;
  const clarifyPass = test.shouldClarify
    ? Boolean(result.clarify)
    : !result.clarify;
  const shortPromptPass = result.shortPrompt === test.shortPrompt;

  const passedTest =
    typePass && complexPass && clarifyPass && shortPromptPass;

  if (passedTest) {
    passed += 1;
    console.log(`✅ PASS: ${test.id} — ${test.label}`);
  } else {
    failed += 1;
    console.log(`❌ FAIL: ${test.id} — ${test.label}`);
    console.log("Input:", test.input);
    console.log("Expected type:", test.expectedType);
    console.log("Actual type:", result.type);
    console.log("Expected complex:", test.expectedComplex);
    console.log("Actual complex:", result.complex);
    console.log("Expected clarify:", test.shouldClarify);
    console.log("Actual clarify:", result.clarify || "none");
    console.log("Expected shortPrompt:", test.shortPrompt);
    console.log("Actual shortPrompt:", result.shortPrompt);
    console.log("Compressed:", result.compressedPrompt);
  }

  console.log("-----------------------------------");
});

console.log("\nSummary");
console.log("=======");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${complexTests.length}`);

if (failed > 0) {
  process.exitCode = 1;
}