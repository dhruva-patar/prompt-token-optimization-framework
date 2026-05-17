import { RESPONSE_MODE_MAP } from "./responseModeMap.js";

export function getResponseModeInstruction(responseMode = "default") {
  const mode = RESPONSE_MODE_MAP[responseMode] || RESPONSE_MODE_MAP.default;

  return {
    key: mode.key,
    displayName: mode.displayName,
    category: mode.category,
    instruction: mode.instruction || "",
  };
}
