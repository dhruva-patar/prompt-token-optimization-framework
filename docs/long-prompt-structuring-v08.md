# PTOF v0.8 — Long Prompt Structuring

## Goal

Improve PTOF’s usefulness for long, messy real-world prompts by organizing them into deterministic sections.

This is not semantic rewriting.

It is structural normalization.

## Files Added

```text
core/structure/
 ├── extractReferences.js
 ├── detectConstraintSignals.js
 ├── detectOutputRequest.js
 ├── buildStructuredPrompt.js
 └── longPromptStructurer.js
```

## Target Output Structure

```text
TASK:
...

REFERENCE MATERIAL:
- link
- link

CONSTRAINTS:
- ...

OUTPUT REQUEST:
- ...
```

## Integration

In `core/optimizer.js`, add:

```js
import { runLongPromptStructurer } from "./structure/longPromptStructurer.js";
```

Then replace:

```js
const pipelineResult = runCompressionPipeline(compressBasic(cleanStripped));
const compressedCore = pipelineResult.compressedText;
```

with:

```js
const structureResult = runLongPromptStructurer(cleanStripped);

const pipelineResult = runCompressionPipeline(
  compressBasic(structureResult.structuredText)
);

const compressedCore = pipelineResult.compressedText;
```

Then update notes:

```js
notes: [
  ...(shortPrompt ? ["Short prompt — Steps 1–3 bypassed"] : []),
  ...structureResult.structureNotes,
  ...pipelineResult.compressionNotes,
],
```

## Success Criteria

After integration:

```bash
npm run benchmark
node cli/ptof-cli.js optimize "your long messy prompt here"
```

Expected:
- benchmark should still pass
- long prompts with links should become structured
- critical terms should be preserved
- no semantic rewriting should occur

## Important Constraint

Do not aggressively summarize.

Do not paraphrase.

Do not remove domain-specific language.

This layer should only reorganize prompt structure.
