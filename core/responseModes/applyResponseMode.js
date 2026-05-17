import { getResponseModeInstruction } from "./getResponseModeInstruction.js";

export function applyResponseMode(prompt, responseMode = "default") {
  const mode = getResponseModeInstruction(responseMode);

  if (!mode.instruction) {
    return {
      finalPrompt: prompt,
      responseMode: mode,
      applied: false,
      enhancementBlock: "",
    };
  }

  const enhancementBlock = `RESPONSE CONTRACT:\n- ${mode.instruction}`;

  return {
    finalPrompt: `${prompt}\n\n${enhancementBlock}`,
    responseMode: mode,
    applied: true,
    enhancementBlock,
  };
}
