export function estimateTokens(text) {
  if (!text || !text.trim()) return 0;
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

export function classifyTask(text) {
  const lower = (text || "").toLowerCase();

  // High intent (core task types first)
  if (/\b(build|implement|debug|code|develop)\b/.test(lower)) {
    return "Technical";
  }

  if (/\b(analyze|analysis|evaluate|investigate)\b/.test(lower)) {
    return "Analytical";
  }

  if (/\b(decide|choose|select|which)\b/.test(lower)) {
    return "Decision";
  }

  if (/\b(design|strategy|roadmap|go-to-market)\b/.test(lower)) {
    return "Strategic";
  }

  if (/\b(plan|planning|itinerary)\b/.test(lower)) {
    return "Planning";
  }

  if (/\b(write|create|copy|story|content)\b/.test(lower)) {
    return "Creative";
  }

  // Secondary modifiers (lower priority)
  if (/\b(compare|vs|versus)\b/.test(lower)) {
    return "Comparative";
  }

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
    .replace(/\b(help me|please|can you|could you|i want to|i need to)\b/gi, "")
    .replace(/\b(suggest|provide|explain how)\b/gi, "")
    .replace(/\b(step-by-step|structured|best way to)\b/gi, "")
    .replace(/\s+from the last\s+\d+\s+years/gi, "")
    .replace(/\s+focusing on\s+.+$/gi, "")
    .replace(/\s+targeting\s+.+$/gi, "")
    .replace(/\s+using\s+.+$/gi, "")
    .replace(/\s+including\s+.+$/gi, "")
    .replace(/\b(that|which|who)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCoreIntent(text) {
  const cleaned = cleanPrompt(text);

  const match = cleaned.match(
    /\b(analyze|decide|design|build|write|plan|explain|create)\b\s+(.+?)(?=,|\.| and | including | based on | focusing on | targeting | using | with | without | compare |$)/i
  );

  if (!match) {
    return compressPrimary(cleaned);
  }

  const action = capitalize(match[1]);
  //const object = match[2].trim();
  const object = match[2]
    .replace(/\s+from the last\s+\d+\s+years/gi, "")
    .replace(/\s+from\s+.+?\s+to\s+.+?(?=\s|$)/gi, "")
    //.replace(/\s+focusing on\s+.+$/gi, "")
    .replace(/\s+targeting\s+.+$/gi, "")
    .replace(/\s+using\s+.+$/gi, "")
    .replace(/\s+including\s+.+$/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return `${action} ${object}`;
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
  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1);
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
    .replace(/\bfrom the last\b/gi, "period:")
    .replace(/\b(including)\b/gi, "include:")
    .replace(/\b(based on)\b/gi, "basis:")
    //.replace(/\b(reduces?|improves?)\b/gi, "goal:")
    .replace(/\breduces?\b/gi, "goal: reduce")
    .replace(/\bimproves?\b/gi, "goal: improve") 
    .replace(/\s+/g, " ")
    .trim();
}

function extractConstraints(text) {
  const lower = text.toLowerCase();
  const constraints = [];

  const phrasePatterns = [
    ///(?<!compare\s)\bwith\s+(.+?)(?=\.|,|$)/gi,
    /\bwithout\s+(.+?)(?=\.|,|$)/gi,
    /\busing\s+(.+?)(?=\.|,|$)/gi,
    /\bfocusing on\s+(.+?)(?=\.|,|$)/gi,
    /\btargeting\s+(.+?)(?=\.|,|$)/gi,
    /\bfrom the last\s+(.+?)(?=\.|,|$)/gi,
    /\bincluding\s+(.+?)(?=\.|$)/gi,
    /\bbased on\s+(.+?)(?=\.|,|$)/gi,
    /\breduces?\s+(.+?)(?=\.|,|$)/gi,
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
  const coreIntent = extractCoreIntent(text);
  //const action = extractAction(cleaned);
  const entity = extractEntities(text);
  const contextInfo = extractContext(text);
  const constraints = extractConstraints(text);
  const rawExtensions = extractExtensions(text);
  //const extensions = extractExtensions(text);
  //const secondary = extractSecondarySignals(text);


  const parts = [];

  const primaryText = capitalize(coreIntent);
  //const primaryText = capitalize(compressPrimary(primary));

  const extensions = rawExtensions.filter((extension) => {
    const normalizedPrimary = primaryText.toLowerCase();
    const normalizedExtension = extension.toLowerCase();

    return (
      !normalizedPrimary.includes(normalizedExtension) &&
      !normalizedExtension.includes(normalizedPrimary)
    );
  });

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
    ? constraints.join(", ")
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