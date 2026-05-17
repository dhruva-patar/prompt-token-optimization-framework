export function extractReferences(text) {
  if (!text || typeof text !== "string") {
    return {
      references: [],
      textWithoutReferences: "",
    };
  }

  const urlPattern = /https?:\/\/[^\s]+/g;
  const references = text.match(urlPattern) || [];

  const textWithoutReferences = text
    .replace(urlPattern, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return {
    references,
    textWithoutReferences,
  };
}
