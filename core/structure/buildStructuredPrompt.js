function uniqueList(items) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function formatSection(title, content) {
  if (!content || (Array.isArray(content) && !content.length)) {
    return "";
  }

  if (Array.isArray(content)) {
    return `${title}:\n${content.map((item) => `- ${item}`).join("\n")}`;
  }

  return `${title}:\n${content}`;
}

export function buildStructuredPrompt({
  task,
  references = [],
  constraints = [],
  outputRequests = [],
  itemBlocks = "",
}) {
  const sections = [];

  if (task) {
    sections.push(formatSection("TASK", task));
  }

  const uniqueReferences = uniqueList(references);
  if (uniqueReferences.length) {
    sections.push(formatSection("REFERENCE MATERIAL", uniqueReferences));
  }

  const uniqueConstraints = uniqueList(constraints);
  if (uniqueConstraints.length) {
    sections.push(formatSection("CONSTRAINTS", uniqueConstraints));
  }

  const uniqueOutputRequests = uniqueList(outputRequests);
  if (uniqueOutputRequests.length) {
    sections.push(formatSection("OUTPUT REQUEST", uniqueOutputRequests));
  }

  if (itemBlocks) {
    sections.push(formatSection("ITEMS / NOTES", itemBlocks));
  }

  return sections.join("\n\n").trim();
}
