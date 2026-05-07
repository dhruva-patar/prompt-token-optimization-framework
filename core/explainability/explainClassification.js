export function explainClassification(text, type) {
  const lower = (text || "").toLowerCase();
  const reasons = [];

  const signalMap = {
    Informational: [
      ["explain", /\bexplain\b/i],
      ["what is", /\bwhat is\b/i],
      ["why", /\bwhy\b/i],
    ],
    Decision: [
      ["best", /\bbest\b/i],
      ["recommend", /\brecommend\b/i],
      ["should I", /\bshould i\b/i],
      ["decide", /\bdecide\b/i],
      ["choose", /\bchoose\b/i],
      ["which", /\bwhich\b/i],
    ],
    Comparative: [
      ["compare", /\bcompare\b/i],
      ["vs / versus", /\b(vs|versus)\b/i],
      ["difference", /\bdifference\b/i],
      ["trade-off", /\btrade-offs?\b/i],
    ],
    Creative: [
      ["write", /\bwrite\b/i],
      ["create", /\bcreate\b/i],
      ["generate", /\bgenerate\b/i],
    ],
    Strategic: [
      ["plan", /\bplan\b/i],
      ["strategy", /\bstrategy\b/i],
      ["roadmap", /\broadmap\b/i],
      ["go-to-market / GTM", /\b(go-to-market|gtm)\b/i],
    ],
    Technical: [
      ["debug", /\bdebug\b/i],
      ["fix", /\bfix\b/i],
      ["troubleshoot", /\btroubleshoot\b/i],
      ["code", /\bcode\b/i],
      ["React", /\breact\b/i],
      ["CSS", /\bcss\b/i],
    ],
    Analytical: [
      ["analyze / analyse", /\banaly[sz]e\b/i],
      ["evaluate", /\bevaluate\b/i],
      ["assess", /\bassess\b/i],
      ["metrics / data", /\b(metrics|data)\b/i],
    ],
  };

  const signals = signalMap[type] || [];

  signals.forEach(([label, pattern]) => {
    if (pattern.test(lower)) {
      reasons.push(`Detected ${type} signal: ${label}.`);
    }
  });

  if (!reasons.length && type === "Informational") {
    reasons.push("Defaulted to Informational because no stronger task signal was detected.");
  }

  return reasons;
}
