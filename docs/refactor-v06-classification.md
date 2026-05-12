# PTOF v0.6 — Classification Refactor

## Goal

Move classification logic out of `core/optimizer.js` without changing behavior.

This is a structure refactor, not an intelligence upgrade.

## Files Added

```text
core/classification/classifySignals.js
core/classification/detectTypeSignals.js
core/classification/confidenceScoring.js
core/classification/classifyPrompt.js
```

## Integration

In `core/optimizer.js`, add:

```js
import { classifyPrompt } from "./classification/classifyPrompt.js";
import { detectTypeSignals } from "./classification/detectTypeSignals.js";
```

Then remove the old local functions:

```js
function detectTypeSignals(text) { ... }
export function classifyPrompt(text) { ... }
```

Do not change the rest of the optimizer flow.

## Success Criteria

After integration, run:

```bash
npm run benchmark
```

Expected result:

```text
PASS: 16
WARN: 0
FAIL: 0
```

## Important Constraint

Do not refactor complexity or clarification yet.

Refactor one subsystem at a time so regression sources remain easy to isolate.
