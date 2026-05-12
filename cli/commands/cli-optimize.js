import { optimizePrompt } from "../../core/optimizer.js";

const prompt = process.argv.slice(3).join(" ");

if (!prompt) {
  console.log("");
  console.log("Missing prompt.");
  console.log('Usage: node cli/ptof-cli.js optimize "your prompt here"');
  console.log("");
  process.exit(1);
}

const result = optimizePrompt(prompt);

console.log("");
console.log("========================");
console.log("PTOF Optimize");
console.log("========================");

if (result.clarify) {
  console.log("");
  console.log("CLARIFY:");
  console.log(result.clarify);

  if (result.explanation) {
    console.log("");
    console.log("EXPLANATION:");
    console.log(JSON.stringify(result.explanation, null, 2));
  }

  process.exit(0);
}

console.log("");
console.log("COMPRESSED PROMPT:");
console.log(result.compressedPrompt);

console.log("");
console.log("TYPE:");
console.log(`${result.type}${result.complex ? " complex" : ""}`);

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

if (result.explanation) {
  console.log("");
  console.log("EXPLANATION:");
  console.log(JSON.stringify(result.explanation, null, 2));
}

console.log("");
