# PTOF Response Mode Presets

## Goal

Add a single-select response behavior layer without creating combinatorial output chaos.

This is not multi-select.

It is one mode per optimization.

## Why

Users often know what kind of response they want, but not the right prompt language.

PTOF translates user-friendly display names into deterministic hidden instructions.

## Architecture

```text
User-facing label
↓
Deterministic hidden instruction
↓
Optimized prompt
```

## Files

```text
core/responseModes/responseModeMap.js
core/responseModes/getResponseModeInstruction.js
core/responseModes/applyResponseMode.js
```

## Optimizer Usage

```js
optimizePrompt(prompt, {
  responseMode: "challenge_my_views"
});
```

## CLI Usage

```bash
node cli/ptof-cli.js optimize "Should we build this?" --mode=challenge_my_views
```

## Demo UI

Import options:

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

Dropdown:

```jsx
<select value={responseMode} onChange={(event) => setResponseMode(event.target.value)}>
  {RESPONSE_MODE_OPTIONS.map((mode) => (
    <option key={mode.key} value={mode.key}>
      {mode.displayName}
    </option>
  ))}
</select>
```

## MVP Rule

Only one response mode can be selected.

No combinations yet.
