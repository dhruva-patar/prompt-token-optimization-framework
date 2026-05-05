import { optimizePrompt } from "../core/optimizer.js";

const input = process.argv.slice(2).join(" ");

if (!input) {
  console.log("Usage: node cli/ptof-cli.js \"your prompt here\"");
  process.exit(1);
}

const result = optimizePrompt(input);

if (result.clarify) {
  console.log(`CLARIFY: ${result.clarify}`);
  process.exit(0);
}

console.log("COMPRESSED PROMPT:");
console.log(result.compressedPrompt);
console.log("");
console.log("TYPE:");
console.log(`${result.type}${result.complex ? " complex" : ""}`);

if (result.notes.length) {
  console.log("");
  console.log("NOTE:");
  result.notes.forEach((note) => console.log(note));
}