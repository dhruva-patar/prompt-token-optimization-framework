# Demo UI Response Mode Integration

## Add Import

In `demo-ui/src/App.jsx`:

```js
import { RESPONSE_MODE_OPTIONS } from "../../core/responseModes/responseModeMap.js";
```

## Add State

```js
const [responseMode, setResponseMode] = useState("default");
```

## Update Optimize Call

Replace:

```js
const result = optimizePrompt(input);
```

with:

```js
const result = optimizePrompt(input, { responseMode });
```

## Add Dropdown

Place near the prompt input or action button:

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

## Optional CSS

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
