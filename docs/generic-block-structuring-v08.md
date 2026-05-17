# PTOF v0.8 — Generic Block Structuring

## Goal

Support long prompts that contain repeated note-like blocks without adding domain-specific logic.

This replaces product-specific pattern handling with generic block extraction.

## Why

A product-specific layer such as:

```text
problemStatementStructurer
```

would move PTOF away from its original algorithm.

Instead, PTOF should detect generic repeated structures such as:

```text
- item
- Value: ...
- item
- Value: ...
```

and preserve them under:

```text
ITEMS / NOTES
```

## Files Added / Updated

```text
core/structure/extractItemBlocks.js
core/structure/buildStructuredPrompt.js
core/structure/longPromptStructurer.js
```

## Target Output

```text
TASK:
...

CONSTRAINTS:
...

OUTPUT REQUEST:
...

ITEMS / NOTES:
1. item text
   Value / Notes:
   - value text

2. item text
   Value / Notes:
   - value text
```

## Important Constraint

This layer does not interpret the items.

It does not group them.

It does not summarize them.

It only restructures repeated blocks so the downstream LLM can process them more reliably.
