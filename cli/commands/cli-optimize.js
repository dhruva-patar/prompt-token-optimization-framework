import { optimizePrompt } from "../../core/optimizer.js";

const args = process.argv.slice(3);

const modeArg = args.find((arg) => arg.startsWith("--mode="));
const responseMode = modeArg ? modeArg.replace("--mode=", "") : "default";

const prompt = args
  .filter((arg) => !arg.startsWith("--mode="))
  .join(" ");

if (!prompt) {
  console.log("");
  console.log("Missing prompt.");
  console.log('Usage: node cli/ptof-cli.js optimize "your prompt here" --mode=challenge_my_views');
  console.log("");
  process.exit(1);
}

const result = optimizePrompt(prompt, { responseMode });

console.log("");
console.log("========================");
console.log("PTOF Optimize");
console.log("========================");

if (result.clarify) {
  console.log("");
  console.log("CLARIFY:");
  console.log(result.clarify);
  process.exit(0);
}

console.log("");
console.log("CORE COMPRESSED PROMPT:");
console.log(result.compressedPrompt);

console.log("");
console.log("FINAL LLM-READY PROMPT:");
console.log(result.finalPrompt || result.compressedPrompt);

console.log("");
console.log("TYPE:");
console.log(`${result.type}${result.complex ? " complex" : ""}`);

if (result.responseMode?.displayName) {
  console.log("");
  console.log("SELECTED MODE:");
  console.log(result.responseMode.displayName);
}

if (result.formatRule) {
  console.log("");
  console.log("FORMAT RULE:");
  console.log(result.formatRule);
}

if (result.notes && result.notes.length) {
  console.log("");
  console.log("NOTES:");
  result.notes.forEach((note) => console.log(`- ${note}`));
}

console.log("");
