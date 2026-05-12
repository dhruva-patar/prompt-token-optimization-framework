# PTOF Benchmarking v0.1

## Purpose

This benchmark layer checks whether PTOF improves prompts safely.

It does not only measure token reduction.

It evaluates:

- token efficiency
- instruction retention
- semantic risk
- complexity detection
- clarification accuracy

## Why This Exists

PTOF is a deterministic prompt optimization engine.

It is not an AI paraphraser.

The goal is to preserve semantic intent while making prompts clearer, safer, and more efficient before inference.

## Files Added

```text
test/benchmarkCases.js
test/benchmarkSuite.js
test/evaluators/instructionRetention.js
test/evaluators/semanticRisk.js
test/evaluators/tokenEfficiency.js
test/evaluators/complexityAccuracy.js
test/evaluators/clarifyAccuracy.js
```

## How To Run

From the project root:

```bash
node test/benchmarkSuite.js
```

Optional package script:

```json
{
  "scripts": {
    "benchmark": "node test/benchmarkSuite.js"
  }
}
```

Then run:

```bash
npm run benchmark
```

## Benchmark Output

The benchmark prints one report per case.

Example:

```text
========================
PTOF Benchmark Case
========================
Case: Strategic comparison prompt
Expected Type: Strategic
Actual Type: Strategic

Original Tokens: 18
Optimized Tokens: 14
Reduction: 22%

Instruction Retention: PASS
Semantic Risk: LOW
Complexity Detection: PASS
Clarification Logic: PASS

Result: PASS
```

## Current Evaluation Model

This version uses deterministic heuristics only.

No LLM grading.
No embeddings.
No vector similarity.

This protects PTOF’s core advantage:

> Explainable optimization instead of black-box rewriting.

## Success Criteria

The benchmark system is working when:

- all benchmark cases run
- each case prints PASS / WARN / FAIL
- token reduction is visible
- semantic risk is visible
- clarification logic is checked
- complexity detection is checked
- failures are understandable

## Current Limitation

Semantic risk is heuristic-based.

It can detect obvious risk, such as removed domain terms or removed geographic constraints, but it does not deeply understand meaning yet.

That is intentional for v0.1.

## Next Version

Possible v0.2 improvements:

- semantic risk scoring
- stronger constraint detection
- duplicate instruction detection
- hierarchy preservation checks
- stricter abstraction safety
- benchmark JSON output
- CI integration
