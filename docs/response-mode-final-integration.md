# PTOF Response Mode Presets — Final Integration

## Core

Add:

```text
core/responseModes/responseModeMap.js
core/responseModes/getResponseModeInstruction.js
core/responseModes/applyResponseMode.js
```

In `core/optimizer.js`:

```js
import { applyResponseMode } from "./responseModes/applyResponseMode.js";
```

Update signature:

```js
export function optimizePrompt(userPrompt, options = {}) {
  const responseModeOption = options.responseMode || "default";
```

After `baseCompressedPrompt`, apply:

```js
const responseModeResult = applyResponseMode(
  baseCompressedPrompt,
  responseModeOption
);
```

Return:

```js
compressedPrompt: responseModeResult.prompt,
responseMode: responseModeResult.responseMode,
```

Add note when applied:

```js
...(responseModeResult.applied
  ? [`Applied response mode: ${responseModeResult.responseMode.displayName}`]
  : []),
```

## CLI

In `cli/commands/cli-optimize.js`, parse:

```js
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const responseMode = modeArg ? modeArg.replace("--mode=", "") : "default";
```

Call:

```js
const result = optimizePrompt(prompt, { responseMode });
```

Print:

```js
console.log("SELECTED MODE:");
console.log(result.responseMode.displayName);
```

## Benchmark

Add:

```text
test/benchmarkCases/responseModeCases.js
test/evaluators/responseModeAccuracy.js
```

In `test/benchmarkSuite.js`, import:

```js
import responseModeCases from "./benchmarkCases/responseModeCases.js";
import evaluateResponseModeAccuracy from "./evaluators/responseModeAccuracy.js";
```

Add `...responseModeCases` to `allBenchmarks`.

When running optimizer:

```js
rawResult = optimizePrompt(testCase.input, testCase.options || {});
```

Add evaluator:

```js
responseModeAccuracy: evaluateResponseModeAccuracy(result, testCase.expected),
```

Add to status list and report.

## Demo UI

In `demo-ui/src/App.jsx`:

```js
import { RESPONSE_MODE_OPTIONS } from "../../core/responseModes/responseModeMap.js";
```

Add state:

```js
const [responseMode, setResponseMode] = useState("default");
```

Call optimizer:

```js
const result = optimizePrompt(input, { responseMode });
```

Add dropdown:

```jsx
<label className="field-label">Response mode</label>
<select
  className="preset-select"
  value={responseMode}
  onChange={(event) => setResponseMode(event.target.value)}
>
  {RESPONSE_MODE_OPTIONS.map((mode) => (
    <option key={mode.key} value={mode.key}>
      {mode.displayName}
    </option>
  ))}
</select>
```

CSS:

```css
.preset-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d0d7de;
  background: #fff;
  font-size: 14px;
}

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
```
