# PTOF Explainability Layer v0.4

## Goal

Make PTOF decisions auditable.

The optimizer should not only return an optimized prompt. It should explain why it classified, clarified, marked complexity, or compressed the prompt.

## Files

```text
core/explainability/explainClassification.js
core/explainability/explainComplexity.js
core/explainability/explainClarification.js
core/explainability/buildExplanation.js
```

## Integration

In `core/optimizer.js`, add:

```js
import { buildExplanation } from "./explainability/buildExplanation.js";
```

Before returning from `optimizePrompt`, create:

```js
const explanation = buildExplanation({
  originalPrompt: userPrompt,
  optimizedPrompt: compressedPrompt,
  type,
  typeSignals,
  complex,
  shouldClarify: false,
  compressionNotes: pipelineResult.compressionNotes,
});
```

Then include it in the return object:

```js
explanation,
```

For clarification returns, create:

```js
const clarificationText = "Please share the missing input so I can analyze it accurately.";

const explanation = buildExplanation({
  originalPrompt: userPrompt,
  optimizedPrompt: "",
  type,
  typeSignals,
  complex,
  shouldClarify: true,
  compressionNotes: [],
});
```

Then return:

```js
clarify: clarificationText,
explanation,
```

## Why This Matters

PTOF is deterministic. Explainability makes that advantage visible.

Instead of saying:

```text
Type: Technical
```

PTOF can explain:

```text
Detected Technical signal: debug.
Detected Technical signal: React.
Detected complexity signal: contrast language.
No missing input dependency detected.
```

## Success Criteria

- benchmark still passes
- explanation object appears in optimizer output
- no LLM evaluation
- no embeddings
- no black-box scoring
- explanations are deterministic
