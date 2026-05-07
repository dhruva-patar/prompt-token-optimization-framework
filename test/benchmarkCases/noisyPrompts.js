const noisyPrompts = [
  {
    name: "Noisy founder strategy prompt",
    input:
      "I need help figuring out the best best best direction for PTOF because I keep changing direction and I want you to explain the trade-offs and explain why one route makes more sense and recommend what I should do next because honestly I feel stuck between making this a SaaS product, keeping it open source, or turning it into middleware for AI tooling.",
    expected: {
      type: "Decision",
      complex: true,
      shouldClarify: false,
      criticalTerms: [
        "PTOF",
        "SaaS",
        "open source",
        "middleware",
        "AI tooling"
      ],
      requiredIntents: [
        "explain",
        "recommend"
      ]
    }
  },

  {
    name: "Contradictory enterprise requirements",
    input:
      "Create a very detailed but also extremely short executive summary for leadership. Include all important technical details but avoid technical language. Keep it under 3 bullets while also covering risks, architecture decisions, implementation timelines, and stakeholder concerns.",
    expected: {
      type: "Creative",
      complex: true,
      shouldClarify: false,
      criticalTerms: [
        "executive summary",
        "technical details",
        "implementation timelines",
        "stakeholder concerns"
      ],
      requiredIntents: [
        "create"
      ]
    }
  },

  {
    name: "Emotional debugging prompt",
    input:
      "Okay I genuinely need help because this React layout is driving me insane and I have tried everything and now the tablet mode is completely broken and mobile is somehow even worse. Please explain what is likely happening and give me steps because I am clearly missing something obvious.",
    expected: {
      type: "Technical",
      complex: true,
      shouldClarify: false,
      criticalTerms: [
        "React",
        "tablet",
        "mobile"
      ],
      requiredIntents: [
        "explain"
      ]
    }
  },

  {
    name: "Slack style PM prompt",
    input:
      "Need quick thoughts on onboarding dropoff. Users reaching setup but not activation. Think issue maybe too much cognitive load?? Need compare vs common SaaS onboarding patterns + suggest fixes before next sprint.",
    expected: {
      type: "Comparative",
      complex: true,
      shouldClarify: false,
      criticalTerms: [
        "onboarding",
        "activation",
        "cognitive load",
        "SaaS"
      ],
      requiredIntents: [
        "compare",
        "suggest"
      ]
    }
  },

  {
    name: "Overloaded AI workflow prompt",
    input:
      "Compare GPT, Claude, and Gemini for long-context enterprise analysis workflows, recommend the best option for architecture reviews, explain the trade-offs for cost and reasoning depth, create an implementation roadmap, suggest benchmark metrics, and identify the biggest risk if the organization scales usage too quickly.",
    expected: {
      type: "Comparative",
      complex: true,
      shouldClarify: false,
      criticalTerms: [
        "GPT",
        "Claude",
        "Gemini",
        "enterprise analysis",
        "architecture reviews",
        "benchmark metrics"
      ],
      requiredIntents: [
        "compare",
        "recommend",
        "explain",
        "create",
        "suggest",
        "identify"
      ]
    }
  }
];

module.exports = noisyPrompts;
