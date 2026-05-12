const command = process.argv[2];

function printHelp() {
  console.log("");
  console.log("PTOF CLI");
  console.log("");
  console.log("Usage:");
  console.log('  node cli/ptof-cli.js optimize "your prompt here"');
  console.log('  node cli/ptof-cli.js explain "your prompt here"');
  console.log("  node cli/ptof-cli.js benchmark");
  console.log("");
  console.log("NPM:");
  console.log('  npm run ptof -- optimize "your prompt here"');
  console.log('  npm run ptof -- explain "your prompt here"');
  console.log("  npm run ptof -- benchmark");
  console.log("");
  console.log("Commands:");
  console.log("  optimize   Optimize a prompt and print the full PTOF output");
  console.log("  explain    Print only the deterministic explanation output");
  console.log("  benchmark  Run the PTOF benchmark suite");
  console.log("");
}

async function run() {
  switch (command) {
    case "optimize":
      await import("./commands/cli-optimize.js");
      break;

    case "explain":
      await import("./commands/cli-explain.js");
      break;

    case "benchmark":
      await import("./commands/cli-benchmark.js");
      break;

    case undefined:
    case "help":
    case "--help":
    case "-h":
      printHelp();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      printHelp();
      process.exitCode = 1;
  }
}

run();
