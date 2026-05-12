export const classificationSignals = [
  {
    type: "Informational",
    pattern: /\b(explain|what is|why)\b/g,
    weight: 1,
  },
  {
    type: "Decision",
    pattern: /\b(best|recommend|should i|decide|choose|suggest one|which)\b/g,
    weight: 2,
  },
  {
    type: "Comparative",
    pattern: /\b(compare|vs|versus|difference|trade-offs?)\b/g,
    weight: 2,
  },
  {
    type: "Creative",
    pattern: /\b(write|create|generate)\b/g,
    weight: 2,
  },
  {
    type: "Strategic",
    pattern: /\b(plan|strategy|roadmap|go-to-market|gtm)\b/g,
    weight: 2,
  },
  {
    type: "Technical",
    pattern: /\b(how to|implement|build|debug|code|react|css)\b/g,
    weight: 2,
  },
  {
    type: "Analytical",
    pattern: /\b(analyze|analyse|evaluate|assess|metrics|data)\b/g,
    weight: 2,
  },
];

export const signalDetectionPatterns = [
  ["Informational", /\b(explain|what is|why)\b/],
  ["Decision", /\b(best|recommend|should i|decide|choose|suggest one|which)\b/],
  ["Comparative", /\b(compare|vs|versus|difference|trade-offs?)\b/],
  ["Creative", /\b(write|create|generate)\b/],
  ["Strategic", /\b(plan|strategy|roadmap|go-to-market|gtm)\b/],
  ["Technical", /\b(how to|implement|build|debug|code|react|css)\b/],
  ["Analytical", /\b(analyze|analyse|evaluate|assess|metrics|data)\b/],
];
