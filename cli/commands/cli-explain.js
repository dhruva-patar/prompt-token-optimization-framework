import { optimizePrompt } from "../../core/optimizer.js";

const prompt = process.argv.slice(3).join(" ");

if (!prompt) {
  console.log("");
  console.log("Missing prompt.");
  console.log('Usage: node cli/ptof-cli.js explain "your prompt here"');
  console.log("");
  process.exit(1);
}

const result = optimizePrompt(prompt);

console.log("");
console.log("========================");
console.log("PTOF Explain");
console.log("========================");

if (!result.explanation) {
  console.log("");
  console.log("No explanation object found.");
  console.log("Check that the explainability layer is integrated in core/optimizer.js.");
  console.log("");
  process.exit(1);
}

console.log("");
console.log(JSON.stringify(result.explanation, null, 2));
console.log("");
