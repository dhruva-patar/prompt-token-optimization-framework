export function hasConstraintTension(text) {
  const lower = (text || "").toLowerCase();

  const expansiveConstraints = [
    "detailed",
    "comprehensive",
    "complete",
    "all",
    "full",
    "thorough",
    "in-depth",
  ];

  const restrictiveConstraints = [
    "short",
    "brief",
    "concise",
    "under",
    "max",
    "maximum",
    "only",
    "limited",
  ];

  const hasExpansive = expansiveConstraints.some((word) =>
    lower.includes(word)
  );

  const hasRestrictive = restrictiveConstraints.some((word) =>
    lower.includes(word)
  );

  return hasExpansive && hasRestrictive;
}
