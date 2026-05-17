
# PTOF Large Benchmark Suite

## Purpose

This suite contains large prompts intended for stress testing.

The goals are:
- validate long prompt structuring
- test semantic retention
- verify token budget guardrails
- stress-test runtime stability
- evaluate structural normalization

## File

```text
test/benchmarkCases/largePrompts.js
```

## Important

Do NOT include these prompts in the normal benchmark suite.

Use them separately.

## Suggested Script

Add to package.json:

```json
"benchmark:large": "node test/largeBenchmarkSuite.js"
```
