# PTOF v0.8 — Extract Item Blocks Fix

## What This Fixes

The previous splitter used capturing groups inside `String.split()`.

In JavaScript, captured groups are included in split results. This caused duplicate phantom items such as:

```text
user wants
wants
user wants to...
```

## What Changed

The splitter now uses non-capturing groups:

```js
(?:wants|needs)
```

instead of capturing groups:

```js
(wants|needs)
```

## Replace

```text
core/structure/extractItemBlocks.js
```

with the file in this package.

## Then Run

```bash
npm run benchmark
node cli/ptof-cli.js optimize "your long prompt here"
```
