export const semanticPreservationCases = [
  {
    name: "Multi-intent preservation with secondary directive",

    input:
      "Challenge my assumptions about building an AI startup and list industries in Europe suitable for the startup.",

    options: {
      responseMode: "challenge_my_views",
    },

    expected: {
      type: "Informational",
      complex: false,
      clarify: false,
      terms: ["AI startup", "industries", "Europe"],
      intents: ["challenge", "list"],
      responseMode: "challenge_my_views",
    },
  },
];