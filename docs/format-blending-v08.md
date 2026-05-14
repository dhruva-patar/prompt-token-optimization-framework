# PTOF v0.8 — Format Blending + Structure Cleanup

## Goal

Bring PTOF closer to the original base algorithm by implementing:

```text
IF flag_complex = TRUE
  → blend top 2 format types, still apply caps
```

## Files Added

```text
core/formatting/getDefaultFormat.js
core/formatting/blendFormats.js
```

## File Updated

```text
core/structure/extractItemBlocks.js
```

## Integration

In `core/optimizer.js`, add:

```js
import { blendFormats } from "./formatting/blendFormats.js";
```

Remove the local `getDefaultFormat()` function from `optimizer.js`.

Then replace:

```js
const formatRule = getDefaultFormat(type);
```

with:

```js
const formatRule = blendFormats(type, typeSignals, complex);
```

## Expected Behavior

For simple prompts:

```text
Comparative → Use 2-column comparison, max 5 rows.
```

For complex mixed prompts:

```text
Comparative → Use 2-column comparison, max 5 rows.
Also preserve decision intent: Give max 3 options with 1 trade-off line each.
```

## Success Criteria

Run:

```bash
npm run benchmark
node cli/ptof-cli.js optimize "Compare GPT and Claude and recommend one."
```

Expected:
- benchmark passes
- complex prompts get blended format rule
- simple prompts keep single format rule
