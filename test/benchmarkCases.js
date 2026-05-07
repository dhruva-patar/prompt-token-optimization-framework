const benchmarkCases = [
  {
    name: "Strategic comparison prompt",
    input:
      "Compare Nordic fintech startups and recommend which market has the strongest B2B opportunity for AI infrastructure tools.",
    expected: {
      type: "Strategic",
      complex: true,
      shouldClarify: false,
      criticalTerms: ["Nordic", "fintech", "startups", "B2B", "AI infrastructure"],
      requiredIntents: ["compare", "recommend"],
    },
  },
  {
    name: "Uploaded data analysis prompt",
    input: "Analyze this CSV and explain which product metrics changed the most.",
    expected: {
      type: "Analytical",
      complex: true,
      shouldClarify: true,
      criticalTerms: ["CSV", "product metrics"],
      requiredIntents: ["analyze", "explain"],
    },
  },
  {
    name: "Market analysis prompt",
    input:
      "Analyze fintech growth trends in Europe and explain where a new B2B SaaS product could fit.",
    expected: {
      type: "Analytical",
      complex: true,
      shouldClarify: false,
      criticalTerms: ["fintech", "growth trends", "Europe", "B2B SaaS"],
      requiredIntents: ["analyze", "explain"],
    },
  },
  {
    name: "Technical debugging prompt",
    input:
      "Debug this React component and explain why the layout breaks on tablet and mobile screens.",
    expected: {
      type: "Technical",
      complex: true,
      shouldClarify: true,
      criticalTerms: ["React", "layout", "tablet", "mobile"],
      requiredIntents: ["debug", "explain"],
    },
  },
  {
    name: "Short decision prompt",
    input: "Should I merge this branch?",
    expected: {
      type: "Decision",
      complex: false,
      shouldClarify: false,
      criticalTerms: ["merge", "branch"],
      requiredIntents: ["decide"],
    },
  },
];

module.exports = benchmarkCases;
