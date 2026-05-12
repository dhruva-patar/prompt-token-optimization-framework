# PTOF CLI v0.7

## Goal

Create a clean command-based CLI for local developer usage.

This replaces the earlier prototype CLI behavior with a small command router.

## Structure

```text
cli/
 ├── ptof-cli.js
 └── commands/
      ├── cli-optimize.js
      ├── cli-benchmark.js
      └── cli-explain.js
```

## Commands

### Optimize

```bash
node cli/ptof-cli.js optimize "Compare GPT and Claude for code review and recommend one."
```

Prints:
- compressed prompt
- type
- complexity
- format rule
- notes
- explanation

---

### Explain

```bash
node cli/ptof-cli.js explain "Debug this React layout issue on mobile."
```

Prints only the deterministic explanation object.

---

### Benchmark

```bash
node cli/ptof-cli.js benchmark
```

Runs:

```bash
node test/benchmarkSuite.js
```

## Optional package.json scripts

Add:

```json
{
  "scripts": {
    "ptof": "node cli/ptof-cli.js",
    "benchmark": "node test/benchmarkSuite.js"
  }
}
```

Then use:

```bash
npm run ptof -- optimize "your prompt here"
npm run ptof -- explain "your prompt here"
npm run ptof -- benchmark
```

## Important

This CLI is intentionally simple.

No Commander.js.
No yargs.
No config system.

The goal is clarity, not flexibility.
