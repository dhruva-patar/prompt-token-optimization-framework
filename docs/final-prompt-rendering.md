# PTOF Final Prompt Rendering

## Goal

Separate core compression from the final LLM-ready prompt.

## New Contract

```js
{
  compressedPrompt,
  finalPrompt,
  responseEnhancementBlock,
  responseMode
}
```

## Difference

### compressedPrompt

The core PTOF optimized prompt.

### finalPrompt

The actual prompt that should be sent to the LLM.

It includes the selected response mode as a deterministic response contract.

## Example

```text
CORE COMPRESSED PROMPT:
Should we build this.

FINAL LLM-READY PROMPT:
Should we build this.

RESPONSE CONTRACT:
- Challenge assumptions and identify weaknesses.
```

## Why

This improves:
- transparency
- inspectability
- benchmarkability
- user trust
- downstream LLM prompt readiness
