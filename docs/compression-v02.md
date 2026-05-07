# PTOF Compression Intelligence v0.2

## Goal

Improve compression safely without turning PTOF into a static thesaurus or phrase-replacement tool.

This version focuses on structural compression only.

## What v0.2 Includes

- duplicate adjacent word reduction
- repeated intent verb reduction
- duplicate sentence removal
- redundancy signal detection
- compression notes

## What v0.2 Avoids

- synonym replacement
- static phrase dictionaries
- semantic rewriting
- aggressive abstraction
- LLM-based compression
- embeddings or vector similarity

## Philosophy

Compression should be pattern-based and explainable.

PTOF should not replace words simply because they are shorter.

Bad direction:

```text
application → app
fits → aligns
best one → best fit
```

That creates brittle static code and requires endless synonym combinations.

Better direction:

```text
Explain X and explain Y
```

becomes:

```text
Explain X and Y
```

This is structural, not semantic.

## Files

```text
core/compression/duplicateReducer.js
core/compression/redundancyDetector.js
core/compression/compressionPipeline.js
```

## Integration

In `core/optimizer.js`, import:

```js
import { runCompressionPipeline } from "./compression/compressionPipeline.js";
```

Then replace:

```js
const compressedCore = compressBasic(cleanStripped);
```

with:

```js
const pipelineResult = runCompressionPipeline(compressBasic(cleanStripped));
const compressedCore = pipelineResult.compressedText;
```

Then update notes:

```js
notes: [
  ...(shortPrompt ? ["Short prompt — Steps 1–3 bypassed"] : []),
  ...pipelineResult.compressionNotes,
],
```

## Expected Result

This may not create huge token reductions immediately.

That is okay.

The main goal is to improve compression safely and expose useful compression notes.

## Success Criteria

- benchmark still passes
- semantic risk remains LOW
- compression notes appear when duplicate or redundant patterns are detected
- no domain terms, constraints, numbers, or intent verbs are removed unsafely
