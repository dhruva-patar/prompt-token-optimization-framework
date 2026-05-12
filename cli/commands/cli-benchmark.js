import { spawnSync } from "child_process";
import path from "path";

console.log("");
console.log("========================");
console.log("PTOF Benchmark");
console.log("========================");
console.log("");

const benchmarkPath = path.join(process.cwd(), "test", "benchmarkSuite.js");

const result = spawnSync(process.execPath, [benchmarkPath], {
  stdio: "inherit",
});

if (result.error) {
  console.error("");
  console.error("Failed to run benchmark suite.");
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
