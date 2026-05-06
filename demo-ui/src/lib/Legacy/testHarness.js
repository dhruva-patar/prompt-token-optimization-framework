import { optimizePrompt, estimateTokens, classifyTask } from "./ptof.js";

const testCases = [
  {
    type: "Analytical",
    input:
      "Analyze customer churn data from the last 2 years, identify patterns, and suggest predictive features. Compare logistic regression with decision trees.",
  },
  {
    type: "Decision",
    input:
      "Help me decide whether to invest in index funds or actively managed portfolios based on moderate risk and long-term wealth growth.",
  },
  {
    type: "Strategic",
    input:
      "Design a go-to-market strategy for an AI productivity tool targeting remote teams, including positioning, messaging, and channel strategy.",
  },
  {
    type: "Technical",
    input:
      "Build a scalable authentication system using Node.js and JWT, including token refresh and security best practices.",
  },
  {
    type: "Creative",
    input:
      "Write engaging onboarding copy for a fintech app that reassures users during KYC failure and improves trust.",
  },
  {
    type: "Planning",
    input:
      "Plan a 4-day trip from Oslo to Stockholm focusing on scenic routes and cultural experiences.",
  },
  {
    type: "Informational",
    input:
      "Explain how prompt engineering improves LLM output quality and reduces hallucinations.",
  },
];

testCases.forEach(({ type, input }) => {
  const result = optimizePrompt(input);

  const before = estimateTokens(input);
  const after = estimateTokens(result.compressedPrompt);
  const reduction = before
    ? (((before - after) / before) * 100).toFixed(1)
    : 0;

  console.log("=================================");
  console.log("EXPECTED TYPE:", type);
  console.log("CLASSIFIED AS:", classifyTask(input));
  console.log("INPUT:", input);
  console.log("OUTPUT:", result.compressedPrompt);
  console.log("TOKENS:", `${before} → ${after}`);
  console.log("REDUCTION:", `${reduction}%`);
});