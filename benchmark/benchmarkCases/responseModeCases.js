const responseModeCases = [
  {
    name: "Response mode challenge decision prompt",
    input: "Should we build this?",
    options: {
      responseMode: "challenge_my_views",
    },
    expected: {
      type: "Decision",
      complex: false,
      shouldClarify: false,
      responseMode: "challenge_my_views",
      criticalTerms: ["Should", "build"],
      requiredIntents: ["decide"],
    },
  },
  {
    name: "Response mode simplify explanation prompt",
    input: "Explain platform engineering to a non technical stakeholder.",
    options: {
      responseMode: "simplify_all",
    },
    expected: {
      type: "Informational",
      complex: false,
      shouldClarify: false,
      responseMode: "simplify_all",
      criticalTerms: ["platform engineering", "non technical stakeholder"],
      requiredIntents: ["explain"],
    },
  },
  {
    name: "Response mode action plan prompt",
    input: "Create a plan to improve the demo UI before launch.",
    options: {
      responseMode: "action_plan",
    },
    expected: {
      type: "Creative",
      complex: true,
      shouldClarify: false,
      responseMode: "action_plan",
      criticalTerms: ["demo UI", "launch"],
      requiredIntents: ["create"],
    },
  },
];

export default responseModeCases;
