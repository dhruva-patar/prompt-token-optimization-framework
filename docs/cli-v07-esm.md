# PTOF CLI v0.7 — ESM Cleanup

## Goal

Make the JavaScript runtime consistent.

The core PTOF engine already uses ES module syntax:

```js
import ...
export ...
```

So the CLI should also use ES modules.

## package.json

Add:

```json
"type": "module"
```

Also add the PTOF command script:

```json
"ptof": "node cli/ptof-cli.js"
```

## Commands

```bash
node cli/ptof-cli.js benchmark
node cli/ptof-cli.js optimize "Compare GPT and Claude for code review and recommend one."
node cli/ptof-cli.js explain "Debug this React layout issue on mobile."
```

Or through npm:

```bash
npm run ptof -- benchmark
npm run ptof -- optimize "your prompt here"
npm run ptof -- explain "your prompt here"
```

## Expected Result

The previous Node warning should disappear:

```text
MODULE_TYPELESS_PACKAGE_JSON
```

## Important

After adding `"type": "module"`, CommonJS `require()` should not be used in active JS files.

Use:

```js
import ...
```

instead.
