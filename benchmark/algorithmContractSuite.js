import { optimizePrompt } from "../core/optimizer.js";

const cases = [
  {
    name: "Short prompt keeps lightweight handling",
    input: "What is PTOF?",
    assert: (result) =>
      result.shortPrompt === true &&
      result.notes.includes("Short prompt — heavy optimization bypassed"),
  },
  {
    name: "Decision prompt classified correctly",
    input: "Should we use OpenAI or Claude for this workflow?",
    assert: (result) => result.type === "Decision",
  },
  {
    name: "Analytical prompt without data asks clarification",
    input: "Analyze this and give me findings",
    assert: (result) => Boolean(result.clarify),
  },
  {
    name: "Comparative prompt classified correctly",
    input: "Compare GPT and Claude for code review",
    assert: (result) => result.type === "Comparative",
  },
  {
    name: "Creative prompt classified correctly",
    input: "Write a LinkedIn post about prompt optimization",
    assert: (result) => result.type === "Creative",
  },
  {
    name: "Complex multi-intent prompt is flagged complex",
    input:
      "Compare OpenAI and Claude, recommend one, and give implementation steps for a startup",
    assert: (result) => result.complex === true,
  },
  {
    name: "Already concise prompt remains usable",
    input: "Compare OpenAI vs Claude.",
    assert: (result) =>
      result.compressedPrompt &&
      result.compressedPrompt.toLowerCase().includes("openai") &&
      result.compressedPrompt.toLowerCase().includes("claude"),
  },
];

let pass = 0;
let fail = 0;

for (const testCase of cases) {
  const result = optimizePrompt(testCase.input);
  const passed = testCase.assert(result);

  if (passed) {
    pass += 1;
    console.log(`PASS: ${testCase.name}`);
  } else {
    fail += 1;
    console.log(`FAIL: ${testCase.name}`);
    console.log(result);
  }
}

console.log("\n========================");
console.log("PTOF Algorithm Contract Summary");
console.log("========================");
console.log(`PASS: ${pass}`);
console.log(`FAIL: ${fail}`);

if (fail > 0) {
  process.exitCode = 1;
}