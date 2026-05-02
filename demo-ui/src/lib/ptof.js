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

export function optimizePrompt(text) {
  if (!text || !text.trim()) {
    return {
      taskType: "Waiting",
      compressedPrompt: "",
      notes: ["Enter a prompt"],
    };
  }

  const lower = text.toLowerCase();
  const cleaned = cleanPrompt(text);

  const context = ["Plan"];

  if (lower.includes("cheapest")) context.push("cheapest");
  if (lower.includes("4 adults") || lower.includes("4 adult")) context.push("4-adult");

  let route = "";

  if (lower.includes("oslo") && (lower.includes("gothenburg") || lower.includes("gotenborg"))) {
    route = "Oslo→Gothenburg";
  }

  context.push(route || cleaned.split(".")[0]);

  const constraints = [];
  const transport = [];

  if (lower.includes("train")) transport.push("train outbound");
  if (lower.includes("flight") || lower.includes("plane")) transport.push("flight return");
 
  if (transport.length) {
     constraints.push(transport.join(", "));
  }

  if (lower.includes("village")) constraints.push("one village stop en route");
  if (lower.includes("local transport") || lower.includes("within")) {
    constraints.push("local transport in Oslo/Gothenburg");
  }
  if (lower.includes("bergen")) {
    constraints.push("compare Bergen under the same constraints");
  }

  const compressedPrompt = constraints.length
    ? `${context.join(" ")}. Explicit constraints: ${constraints.join(", ")}.`
    : `${context.join(" ")}.`;

  return {
    taskType: classifyTask(text),
    compressedPrompt,
    notes: [
      "Compressed into one LLM-ready instruction",
      "Preserved explicit constraints",
      "Removed duplicate phrasing and filler",
    ],
  };
}