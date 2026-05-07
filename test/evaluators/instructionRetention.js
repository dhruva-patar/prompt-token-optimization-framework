function includesIgnoreCase(text, term) {
  return text.toLowerCase().includes(term.toLowerCase());
}

function normalizeIntent(intent) {
  const map = {
    decide: ["decide", "choose", "should"],
    compare: ["compare", "comparison"],
    recommend: ["recommend", "suggest"],
    analyze: ["analyze", "analyse", "evaluate", "assess"],
    explain: ["explain", "why", "describe"],
    debug: ["debug", "fix", "troubleshoot"],
  };

  return map[intent.toLowerCase()] || [intent.toLowerCase()];
}

function evaluateInstructionRetention(result, expected) {
  const optimized = result.optimized || "";

  const missingTerms = (expected.criticalTerms || []).filter(
    (term) => !includesIgnoreCase(optimized, term)
  );

  const missingIntents = (expected.requiredIntents || []).filter((intent) => {
    const acceptableMatches = normalizeIntent(intent);
    return !acceptableMatches.some((match) => includesIgnoreCase(optimized, match));
  });

  const notes = [];

  if (missingTerms.length) {
    notes.push("One or more critical terms were removed.");
  }

  if (missingIntents.length) {
    notes.push("One or more required intents were removed.");
  }

  let status = "PASS";

  if (missingTerms.length || missingIntents.length) {
    status = "WARN";
  }

  if (missingTerms.length >= 2 || missingIntents.length >= 2) {
    status = "FAIL";
  }

  return {
    status,
    missingTerms,
    missingIntents,
    notes,
  };
}

module.exports = evaluateInstructionRetention;
