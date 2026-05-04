export function estimateTokens(text) {
  if (!text || !text.trim()) return 0;
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

export function classifyTask(text) {
  const lower = (text || "").toLowerCase();

  if (lower.includes("compare")) return "Comparative";
  if (lower.includes("analyze")) return "Analytical";
  if (lower.includes("decide") || lower.includes("choose")) return "Decision";
  if (lower.includes("strategy") || lower.includes("plan")) return "Strategic";
  if (lower.includes("code") || lower.includes("debug")) return "Technical";
  if (lower.includes("write") || lower.includes("create")) return "Creative";
  if (lower.includes("plan")) return "Planning";

  return "Informational";
}

function cleanPrompt(text) {
  return text
    .replace(/\b(hey|hi|hello|please|can you|could you|just|maybe|also|i want to|i need to)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compressPrimary(primary) {
  return primary
    .replace(/\b(help me|suggest|i want to|explain how to)\b/gi, "")
    //.replace(/\b(a|the)\b/gi, "")
    .replace(/\b(step-by-step|structured|best way to)\b/gi, "")
    .replace(/\b(that|which|who)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPrimaryClause(text) {
  const cleaned = cleanPrompt(text);

  const clauses = cleaned
    .split(/[.!?]/)
    .map((c) => c.trim())
    .filter(Boolean);

  return clauses.find((c) =>
    /\b(plan|create|write|design|build|analyze|help|explain)\b/i.test(c)
  ) || clauses[0];
}

function extractContext(text) {
  const cleaned = cleanPrompt(text);

  const contextMatch = cleaned.match(/for\s+(.+?)(?=\.|,|$)/i);

  return contextMatch ? contextMatch[1].trim() : "";
}

function extractTarget(text) {
  const fromToMatch = text.match(
    /from\s+([\p{L}\s]+?)\s+to\s+([\p{L}\s]+?)(?=\s+(and|with|via|by|in|return|also|compare|include|for|$)|[.,!?])/iu
  );

  if (fromToMatch) {
    const source = capitalize(fromToMatch[1].trim());
    const target = capitalize(fromToMatch[2].trim());
    return `${source}→${target}`;
  }

  const forMatch = text.match(/for\s+(.+?)(?=\.|,|$)/i);
  if (forMatch) return forMatch[1].trim();

  return "";
}

function extractSecondarySignals(text) {
  const cleaned = cleanPrompt(text);

  const phrases = cleaned
    .split(/,|and/)
    .map((p) => p.trim())
    .filter((p) => p.length > 10);

  return phrases.slice(0, 2); // keep top 1–2 signals
}

function capitalize(value) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function extractAction(text) {
  const actionPriority = ["plan", "create", "write", "design", "build", "analyze", "compare"];

  const lower = text.toLowerCase();

  const action = actionPriority.find((word) =>
    new RegExp(`\\b${word}\\b`, "i").test(lower)
  );

  return action ? capitalize(action) : "Do";
}

function dedupeConstraints(constraints) {
  return [...new Set(constraints)].filter((constraint, _, list) => {
    return !list.some(
      (other) =>
        other !== constraint &&
        other.includes(constraint) &&
        other.length > constraint.length
    );
  });
}

function extractEntities(text) {
  return extractTarget(text);
}

function compressConstraint(value) {
  return value
    .replace(/\b(focusing on)\b/gi, "focus:")
    .replace(/\b(targeting)\b/gi, "target:")
    .replace(/\b(using)\b/gi, "using:")
    .replace(/\b(without)\b/gi, "avoid:")
    .replace(/\b(with)\b/gi, "with:")
    .replace(/\s+/g, " ")
    .trim();
}

function extractConstraints(text) {
  const lower = text.toLowerCase();
  const constraints = [];

  const phrasePatterns = [
    /\bwith\s+(.+?)(?=\.|,|$)/gi,
    /\bwithout\s+(.+?)(?=\.|,|$)/gi,
    /\busing\s+(.+?)(?=\.|,|$)/gi,
    /\bfocusing on\s+(.+?)(?=\.|,|$)/gi,
    /\btargeting\s+(.+?)(?=\.|,|$)/gi,
  ];

  phrasePatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern);

    for (const match of matches) {
      constraints.push(compressConstraint(match[0].trim()));
    }
  });

  const qualitySignals = [
    "cheap",
    "cheapest",
    "fast",
    "faster",
    "simple",
    "concise",
    "detailed",
    "secure",
    "scalable",
    "moderate risk",
    "low friction",
    "mobile-first",
    "beginner-friendly",
    "step by step",
    "no code",
  ];

  qualitySignals.forEach((signal) => {
    if (lower.includes(signal)) constraints.push(signal);
  });

  return dedupeConstraints(constraints);
}

function extractExtensions(text) {
  const extensions = [];

  // Comparison (keep this)
  const comparisonMatch = text.match(
    /compare\s+(.+?)(?=\s+(and|also|then|plus)|\.|,|$)/i
  );

  if (comparisonMatch) {
    extensions.push(`compare ${comparisonMatch[1].trim()}`);
  }

  // Generic "instruction tail" extraction
  const tailMatches = text.match(
    /\b(explain|suggest|recommend|provide)\b\s+(.+?)(?=\.|,|$)/gi
  );

  if (tailMatches) {
    tailMatches.forEach((match) => {
      const cleaned = match.trim().toLowerCase();

      // avoid duplicating comparison
      if (!cleaned.includes("compare")) {
        extensions.push(cleaned);
      }
    });
  }

  return [...new Set(extensions)];
}

export function optimizePrompt(text) {
  if (!text || !text.trim()) {
    return {
      taskType: "Waiting",
      compressedPrompt: "",
      notes: ["Enter a prompt"],
    };
  }

  const cleaned = cleanPrompt(text);

  const primary = extractPrimaryClause(text);
  //const action = extractAction(cleaned);
  const entity = extractEntities(text);
  const contextInfo = extractContext(text);
  const constraints = extractConstraints(text);
  const extensions = extractExtensions(text);
  //const secondary = extractSecondarySignals(text);


  const parts = [];

  const primaryText = capitalize(compressPrimary(primary));
  /*const fallbackContext = primary
    .replace(/\b(help me|suggest|i want to|explain how to)\b/gi, "")
    .replace(/\b(step-by-step|structured|best way to)\b/gi, "")
    .trim();

  if (!entity && !contextInfo && fallbackContext.length > primaryText.length) {
    parts.push(fallbackContext);
  }*/

  parts.push(primaryText);
  


  const combinedContext = [entity, contextInfo]
    .filter(Boolean)
    .filter((val, index, arr) => {
      return !arr.some(
        (other, otherIndex) =>
          otherIndex !== index &&
          other.toLowerCase().includes(val.toLowerCase())
      );
    });

  combinedContext.forEach((context) => {
    if (!primaryText.toLowerCase().includes(context.toLowerCase())) {
      if (context.includes("→")) {
        parts.push(context);
      } else {
        parts.push(`for ${context}`);
      }
    }
  });  

  const base = parts.join(" ");

  const constraintText = constraints.length
    ? `Explicit constraints: ${constraints.join(", ")}`
    : "";
  
  const extensionText = extensions.length
  ? `Include: ${extensions.join(", ")}`
  : "";  

  const compressedPrompt = [base, constraintText, extensionText]
    .filter(Boolean)
    .join(". ");

  return {
    taskType: classifyTask(text),
    compressedPrompt,
    notes: [
      "Compressed into one LLM-ready instruction",
      "Preserved primary intent and context",
      "Removed duplication and filler",
    ],
  };
}