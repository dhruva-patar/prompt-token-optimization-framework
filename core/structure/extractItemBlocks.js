function cleanText(text) {
  return (text || "")
    .replace(/\s+/g, " ")
    .replace(/^[-–—]\s*/, "")
    .trim();
}

function hasRepeatedBlockPattern(text) {
  if (!text || typeof text !== "string") return false;

  const itemStartMarkers =
    text.match(/\s+-\s+(?=user\s+(?:wants|needs)|part\s+\d+:)/gi) || [];

  const valueMarkers = text.match(/\bValue\s*:/gi) || [];

  return itemStartMarkers.length >= 2 || valueMarkers.length >= 2;
}

function splitIntoItemChunks(text) {
  return text
    .split(/\s+-\s+(?=(?:user\s+(?:wants|needs)|part\s+\d+:))/i)
    .map(cleanText)
    .filter(Boolean);
}

function splitValues(chunk) {
  const valueParts = chunk.split(/\s+-\s+Value\s*:/i);

  const item = cleanText(valueParts[0]);

  const values = valueParts
    .slice(1)
    .map(cleanText)
    .map((value) => value.replace(/^Value\s*:\s*/i, "").trim())
    .filter(Boolean);

  return {
    item,
    values,
  };
}

export function extractItemBlocks(text) {
  if (!hasRepeatedBlockPattern(text)) {
    return {
      itemBlocks: [],
      textWithoutItemBlocks: text || "",
      detected: false,
    };
  }

  const chunks = splitIntoItemChunks(text);

  const intro =
    chunks.length &&
    !/^(user\s+(?:needs|wants)|part\s+\d+:)/i.test(chunks[0])
      ? chunks.shift()
      : "";

  const itemBlocks = chunks
    .map(splitValues)
    .filter((block) => block.item);

  return {
    itemBlocks,
    textWithoutItemBlocks: intro,
    detected: itemBlocks.length > 0,
  };
}

export function formatItemBlocks(itemBlocks) {
  if (!itemBlocks.length) return "";

  return itemBlocks
    .map((block, index) => {
      const values = block.values.length
        ? `\n   Value / Notes:\n${block.values.map((value) => `   - ${value}`).join("\n")}`
        : "";

      return `${index + 1}. ${block.item}${values}`;
    })
    .join("\n\n");
}
