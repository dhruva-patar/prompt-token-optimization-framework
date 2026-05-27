import PTOFClient from "./client.js";

const client = new PTOFClient({
    baseUrl: "http://127.0.0.1:3000/v1",

});

async function run() {
  try {
    const optimizeResult =
      await client.optimize(
        "Compare GPT and Claude for code review"
      );

    console.log("\n=== OPTIMIZE ===");
    console.log(
      JSON.stringify(optimizeResult, null, 2)
    );

    const classifyResult =
      await client.classify(
        "Compare GPT and Claude for code review"
      );

    console.log("\n=== CLASSIFY ===");
    console.log(
      JSON.stringify(classifyResult, null, 2)
    );

    const benchmarkResult =
      await client.benchmark(false);

    console.log("\n=== BENCHMARK ===");
    console.log(
      JSON.stringify(benchmarkResult, null, 2)
    );
  } catch (error) {
    console.error(error);
  }
}

run();