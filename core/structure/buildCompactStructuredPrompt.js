function compactList(items) {
  return items.map((item) => item.trim()).filter(Boolean).join("; ");
}

export function buildCompactStructuredPrompt({
  task,
  references = [],
  constraints = [],
  outputRequests = [],
  itemBlocks = "",
}) {
  const parts = [];

  if (task) {
    parts.push(`TASK: ${task}`);
  }

  if (references.length) {
    parts.push(`REFERENCES: ${compactList(references)}`);
  }

  if (constraints.length) {
    parts.push(`CONSTRAINTS: ${compactList(constraints)}`);
  }

  if (outputRequests.length) {
    parts.push(`OUTPUT REQUEST: ${compactList(outputRequests)}`);
  }

  if (itemBlocks) {
    const compactItems = itemBlocks
      .replace(/\n{2,}/g, " | ")
      .replace(/\n\s+/g, " ")
      .replace(/[ \t]+/g, " ")
      .trim();

    parts.push(`ITEMS / NOTES: ${compactItems}`);
  }

  return parts.join("\n").trim();
}
