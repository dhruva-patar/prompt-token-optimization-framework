import { getResponseModeInstruction } from "./getResponseModeInstruction.js";

export function applyResponseMode(prompt, responseMode = "default") {
  const mode = getResponseModeInstruction(responseMode);

  const contractInstruction = mode.communityMacro || mode.instruction;

  if (!contractInstruction){
    return {
      finalPrompt: prompt,
      responseMode: mode,
      applied: false,
      enhancementBlock: "",
    };
  }

  const enhancementBlock = `\n@${contractInstruction}`;

  return {
    finalPrompt: `${prompt}\n\n${enhancementBlock}`,
    responseMode: mode,
    applied: true,
    enhancementBlock,
  };
}
