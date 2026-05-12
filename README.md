# PTOF — Prompt Token Optimization Framework

> Deterministic prompt preprocessing middleware for Large Language Model workflows.

PTOF is a rule-based optimization framework that classifies, structures, validates, and compresses prompts before inference.


Unlike AI-powered prompt rewriting tools, PTOF focuses on:
- deterministic behavior
- explainable transformations
- semantic safety
- structural optimization
- benchmark validation

# Current benchmark status

PASS: 16
WARN: 0
FAIL: 0

# CLI Usage

## Optimize

```bash
npm run ptof -- optimize "Compare GPT and Claude for code review and recommend one."
```

## Explain

```bash
npm run ptof -- explain "Debug this React layout issue on mobile."
```

## Benchmark

```bash
npm run benchmark
```

# Demo UI

```bash
cd demo-ui
npm install
npm run dev
```

# License

MIT
