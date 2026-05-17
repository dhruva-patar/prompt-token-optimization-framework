export function getDefaultFormat(type) {
  const formats = {
    Informational: "Use max 7 bullets.",
    Decision: "Give max 3 options with 1 trade-off line each.",
    Comparative: "Use 2-column comparison, max 5 rows.",
    Creative: "Give 2 variants only.",
    Strategic: "Use max 3 sections.",
    Technical: "Use numbered steps only.",
    Analytical: "Give max 3 findings with 1 impact line each.",
  };

  return formats[type] || formats.Informational;
}
