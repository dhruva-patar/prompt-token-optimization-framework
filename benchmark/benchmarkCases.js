const benchmarkCases = [
  {
    name: "Short decision branch merge",
    input: "Should I merge this branch before cleanup?",
    expected: {
      type: "Decision",
      complex: false,
      shouldClarify: false,
      complexityLevel: "single-type",
      criticalTerms: ["merge", "branch", "cleanup"],
      requiredIntents: ["decide"],
    },
  },
  {
    name: "Short technical debugging",
    input: "Debug this React layout issue on mobile.",
    expected: {
      type: "Technical",
      complex: false,
      shouldClarify: false,
      complexityLevel: "single-type",
      criticalTerms: ["React", "layout", "mobile"],
      requiredIntents: ["debug"],
    },
  },
  {
    name: "Short compare and recommend",
    input: "Compare Claude and GPT for code review and recommend one.",
    expected: {
      type: "Comparative",
      complex: true,
      shouldClarify: false,
      complexityLevel: "2-3-types",
      criticalTerms: ["Claude", "GPT", "code review"],
      requiredIntents: ["compare", "recommend"],
    },
  },
  {
    name: "Long single-type informational explanation",
    input:
      "Explain why an eco dishwasher cycle can take longer than a normal cycle even though it uses less energy. Keep the explanation practical for a non-technical person, avoid appliance jargon, and focus on what is happening with water temperature, soaking time, and electricity usage during the wash cycle.",
    expected: {
      type: "Informational",
      complex: false,
      shouldClarify: false,
      complexityLevel: "single-type",
      criticalTerms: ["eco dishwasher", "normal cycle", "less energy", "water temperature", "soaking time"],
      requiredIntents: ["explain"],
    },
  },
  {
    name: "Long analytical market explanation without clarification",
    input:
      "Analyze fintech growth trends in Europe and explain where a new B2B SaaS product could fit. Focus on compliance-heavy workflows, fragmented internal tools, and underserved mid-market companies. Do not ask for a dataset because this is market reasoning, not uploaded data analysis. Give practical opportunity areas and mention the trade-offs for entering each segment.",
    expected: {
      type: "Analytical",
      complex: true,
      shouldClarify: false,
      complexityLevel: "2-3-types",
      criticalTerms: ["fintech", "Europe", "B2B SaaS", "compliance-heavy workflows", "mid-market companies"],
      requiredIntents: ["analyze", "explain"],
    },
  },
  {
    name: "Long technical build and debug prompt",
    input:
      "Help me debug and improve a Vite React demo UI for a prompt optimization tool. The desktop layout works, but tablet and mobile break because the cards overflow and the raw prompt panel takes too much width. Explain the likely cause, suggest CSS changes, and give numbered implementation steps without rewriting the entire app.",
    expected: {
      type: "Technical",
      complex: true,
      shouldClarify: false,
      complexityLevel: "2-3-types",
      criticalTerms: ["Vite", "React", "demo UI", "tablet", "mobile", "CSS"],
      requiredIntents: ["debug", "explain", "suggest"],
    },
  },
  {
    name: "Long strategic comparative recommendation",
    input:
      "Compare three possible next steps for PTOF: improving compression intelligence, cleaning up the public repo, or building provider-aware optimization for GPT, Claude, and Gemini. Recommend the best next move for a solo builder who wants the project to look credible on GitHub before turning it into a SaaS product. Include trade-offs, risks, and a practical sequence.",
    expected: {
      type: "Comparative",
      complex: true,
      shouldClarify: false,
      complexityLevel: "4-6-types",
      criticalTerms: ["PTOF", "compression intelligence", "public repo", "provider-aware optimization", "GPT", "Claude", "Gemini", "GitHub", "SaaS"],
      requiredIntents: ["compare", "recommend"],
    },
  },
  {
    name: "Long product strategy plus roadmap plus metrics",
    input:
      "Create a product strategy for turning PTOF from a deterministic prompt optimizer into a lightweight middleware layer for LLM inference preprocessing. Explain the positioning, define the target users, compare developer-first and SaaS-first routes, propose a three-phase roadmap, and recommend metrics that prove the optimizer improves prompts without damaging semantic intent.",
    expected: {
      type: "Creative",
      complex: true,
      shouldClarify: false,
      complexityLevel: "4-6-types",
      criticalTerms: ["PTOF", "deterministic prompt optimizer", "middleware layer", "LLM inference preprocessing", "semantic intent"],
      requiredIntents: ["create", "explain", "compare", "recommend"],
    },
  },
  {
    name: "Long uploaded metrics analysis clarification",
    input:
      "Analyze this uploaded metrics file and tell me what changed after the latest release. Compare activation, retention, and conversion before and after the release, identify the biggest risk area, explain what may have caused the change, and recommend the first experiment we should run next. Do not guess if the file is missing.",
    expected: {
      type: "Analytical",
      complex: true,
      shouldClarify: true,
      complexityLevel: "4-6-types",
      criticalTerms: ["uploaded metrics file", "latest release", "activation", "retention", "conversion", "experiment"],
      requiredIntents: ["analyze", "compare", "explain", "recommend"],
    },
  },
  {
    name: "Long multi-intent design critique",
    input:
      "Review this onboarding screen for an enterprise SaaS product and explain what is unclear for a first-time user. Compare it with common onboarding patterns, identify where cognitive load is too high, suggest UX copy improvements, recommend layout changes for desktop and mobile, and give a prioritized action list that a designer and PM can use in the next sprint.",
    expected: {
      type: "Informational",
      complex: true,
      shouldClarify: false,
      complexityLevel: "4-6-types",
      criticalTerms: ["onboarding screen", "enterprise SaaS", "first-time user", "cognitive load", "UX copy", "desktop", "mobile"],
      requiredIntents: ["review", "explain", "compare", "suggest", "recommend"],
    },
  },
  {
    name: "Long decision plus comparative technical strategy",
    input:
      "Decide whether PTOF should add semantic drift scoring before improving compression rules. Compare the impact of each option on reliability, developer trust, benchmark quality, and public launch readiness. Explain the risks of doing them in the wrong order, recommend a decision, and give a step-by-step implementation plan that does not require embeddings or LLM-based evaluation.",
    expected: {
      type: "Decision",
      complex: true,
      shouldClarify: false,
      complexityLevel: "4-6-types",
      criticalTerms: ["PTOF", "semantic drift scoring", "compression rules", "developer trust", "benchmark quality", "embeddings", "LLM-based evaluation"],
      requiredIntents: ["decide", "compare", "explain", "recommend"],
    },
  },
];

export default benchmarkCases;
