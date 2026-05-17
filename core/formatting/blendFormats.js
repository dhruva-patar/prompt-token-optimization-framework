import { getDefaultFormat } from "./getDefaultFormat.js";

function uniqueTypes(typeSignals = []) {
  return [...new Set(typeSignals.map((signal) => signal.type).filter(Boolean))];
}

export function blendFormats(primaryType, typeSignals = [], complex = false) {
  if (!complex) {
    return getDefaultFormat(primaryType);
  }

  const types = uniqueTypes(typeSignals);
  const secondaryType = types.find((type) => type !== primaryType);

  if (!secondaryType) {
    return getDefaultFormat(primaryType);
  }

  const primaryFormat = getDefaultFormat(primaryType);
  const secondaryFormat = getDefaultFormat(secondaryType);

  return `${primaryFormat} Also preserve ${secondaryType.toLowerCase()} intent: ${secondaryFormat}`;
}
