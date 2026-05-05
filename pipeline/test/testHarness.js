import { optimizePrompt } from "../core/optimizer.js";

const testCases = [
  // -------------------------
  // Informational
  // -------------------------
  {
    id: "info-001",
    type: "Informational",
    input: "Could you please explain what transformer attention does in a language model?",
    expectedType: "Informational",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "info-002",
    type: "Informational",
    input: "what is overfitting",
    expectedType: "Informational",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Decision
  // -------------------------
  {
    id: "decision-001",
    type: "Decision",
    input:
      "Help me decide whether to invest in index funds or actively managed portfolios based on moderate risk and long-term wealth growth.",
    expectedType: "Decision",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "decision-002",
    type: "Decision",
    input: "Should I learn React or Vue?",
    expectedType: "Decision",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Comparative
  // -------------------------
  {
    id: "comparative-001",
    type: "Comparative",
    input:
      "Compare PostgreSQL vs MongoDB for scalability, performance, and cost in high-traffic applications.",
    expectedType: "Comparative",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "comparative-002",
    type: "Comparative",
    input: "React vs Vue",
    expectedType: "Comparative",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Creative
  // -------------------------
  {
    id: "creative-001",
    type: "Creative",
    input:
      "Write a short story about a robot learning human emotions in a futuristic society where humans are extinct.",
    expectedType: "Creative",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "creative-002",
    type: "Creative",
    input: "Write product tagline",
    expectedType: "Creative",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Strategic
  // -------------------------
  {
    id: "strategic-001",
    type: "Strategic",
    input:
      "Plan a go-to-market strategy for a SaaS product targeting small businesses in Europe with limited marketing budget.",
    expectedType: "Strategic",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "strategic-002",
    type: "Strategic",
    input: "Plan GTM strategy for SaaS",
    expectedType: "Strategic",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Technical
  // -------------------------
  {
    id: "technical-001",
    type: "Technical",
    input:
      "How to implement JWT authentication in Node.js with refresh tokens and secure session handling?",
    expectedType: "Technical",
    shouldClarify: false,
    shortPrompt: false,
  },
  {
    id: "technical-002",
    type: "Technical",
    input: "How to build REST API?",
    expectedType: "Technical",
    shouldClarify: false,
    shortPrompt: true,
  },

  // -------------------------
  // Analytical
  // -------------------------
  {
    id: "analytical-001",
    type: "Analytical",
    input:
      "Analyze customer churn trends and identify key drivers across segments.",
    expectedType: "Analytical",
    shouldClarify: true,
    shortPrompt: false,
  },
  {
    id: "analytical-002",
    type: "Analytical",
    input: "Analyze churn data",
    expectedType: "Analytical",
    shouldClarify: true,
    shortPrompt: true,
  },
];

let passed = 0;
let failed = 0;

console.log("\nPTOF Test Harness");
console.log("=================\n");

testCases.forEach((test) => {
  const result = optimizePrompt(test.input);

  const typePass = result.type === test.expectedType;
  const clarifyPass = test.shouldClarify
    ? Boolean(result.clarify)
    : !result.clarify;

  const shortPromptPass = result.shortPrompt === test.shortPrompt;

  const passedTest = typePass && clarifyPass && shortPromptPass;

  if (passedTest) {
    passed += 1;
    console.log(`✅ PASS: ${test.id} (${test.type})`);
  } else {
    failed += 1;
    console.log(`❌ FAIL: ${test.id} (${test.type})`);
    console.log("Input:", test.input);
    console.log("Expected type:", test.expectedType);
    console.log("Actual type:", result.type);
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
console.log(`Total: ${testCases.length}`);

if (failed > 0) {
  process.exitCode = 1;
}