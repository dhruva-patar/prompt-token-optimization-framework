# PTOF v0.8 — Structure Token Budget

## Goal

Allow long prompt structuring without uncontrolled token growth.

## Rule

Balanced structure is used only if it stays within a relative token budget.

```js
STRUCTURE_TOKEN_BUDGET_RATIO = 1.15
```

This means the structured prompt can be up to 15% larger than the original prompt.

If it exceeds that, PTOF falls back to compact structure.

## Why Relative Percentage

A fixed token limit such as `+100 tokens` is too arbitrary.

Relative budget scales better:

```text
100-token prompt  → max +15 tokens
1000-token prompt → max +150 tokens
```

## Modes

### Balanced

Readable sections with spacing.

### Compact

Preserves structure but reduces spacing.

## Why This Aligns With PTOF

The base algorithm says:

```text
Fewer tokens > elegant phrasing
IF meaning lost → do not compress that element
```

This guardrail preserves that principle while still allowing useful structure when it improves downstream LLM performance.

## Files Added / Updated

```text
core/structure/structureBudget.js
core/structure/buildCompactStructuredPrompt.js
core/structure/longPromptStructurer.js
```

## Test

```bash
npm run benchmark
node cli/ptof-cli.js optimize "your long messy prompt"
```
