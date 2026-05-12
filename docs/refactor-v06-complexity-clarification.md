# PTOF v0.6 — Complexity + Clarification Refactor

## Goal

Move complexity and clarification logic out of `core/optimizer.js` without changing behavior.

This is a structural refactor only.

## Files Added

```text
core/complexity/constraintTension.js
core/complexity/detectComplexity.js
core/clarification/needsClarification.js
```

## Integration

In `core/optimizer.js`, add:

```js
import { detectComplexity } from "./complexity/detectComplexity.js";
import { needsClarification } from "./clarification/needsClarification.js";
```

Then remove the old local functions:

```js
function hasConstraintTension(text) { ... }
function detectComplexity(text) { ... }
function needsClarification(text, type) { ... }
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

Do not change detection behavior during this refactor.

If benchmark fails, restore the previous logic and compare line-by-line.
