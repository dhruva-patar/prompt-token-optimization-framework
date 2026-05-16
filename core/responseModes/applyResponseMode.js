import { getResponseModeInstruction } from "./getResponseModeInstruction.js";

export function applyResponseMode(prompt, responseMode = "default") {
  const mode = getResponseModeInstruction(responseMode);

  if (!mode.instruction) {
    return {
      prompt,
      responseMode: mode,
      applied: false,
    };
  }

  return {
    prompt: `${prompt}\n\nRESPONSE MODE:\n- ${mode.instruction}`,
    responseMode: mode,
    applied: true,
  };
}
