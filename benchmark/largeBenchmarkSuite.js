import largePrompts from "./benchmarkCases/largePrompts.js";
import optimizePrompt from "../core/optimizer.js";

console.log("\n========================");
console.log("PTOF Large Benchmark");
console.log("========================\n");

largePrompts.forEach((benchmark) => {
  const result = optimizePrompt(benchmark.input);

  console.log("========================");
  console.log("Case:", benchmark.name);
  console.log("========================");

  const optimizedOutput =
    result.compressedPrompt ||
    result.optimizedPrompt ||
    result.optimized ||
    "";

  console.log("Expected Type:", benchmark.expected.type);
  console.log("Actual Type:", result.type);

  console.log(
    "Original Tokens:",
    benchmark.input.split(/\s+/).length
  );

  console.log(
    "Optimized Tokens:",
    optimizedOutput.split(/\s+/).filter(Boolean).length
  );

  console.log(
    "Structure Notes:",
    result.notes?.join(" | ") || "None"
  );

  console.log("\n");
});