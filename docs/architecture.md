# PTOF Architecture

PTOF is built as a deterministic preprocessing framework for optimizing prompts before they are sent to an LLM.

It does not generate answers.  
It prepares better inputs.

---

## Core Architecture

```text
User Prompt
   ↓
Pre-check
   ↓
Classification
   ↓
Analytical Data Check
   ↓
Filler Stripping
   ↓
Logic Gate
   ↓
Adaptive Output Format
   ↓
Compressed Prompt + Metadata
```

---

## 1. Pre-check

The pre-check evaluates prompt length before applying deeper processing.

If the prompt has fewer than 15 estimated tokens:

```text
short_prompt = TRUE
```

PTOF skips:

- classification
- stripping
- complexity checks

It then applies the default Informational output format.

---

## 2. Classification

PTOF assigns one primary task type using deterministic keyword signals.

Supported types:

- Informational
- Decision
- Comparative
- Creative
- Strategic
- Technical
- Analytical

If no clear signal is found, PTOF defaults to Informational.

---

## 3. Analytical Data Check

Analytical prompts require supporting data.

If the prompt asks for analysis but does not include data, metrics, files, tables, reports, or datasets, PTOF stops and returns a clarification request.

```text
CLARIFY: Please share the data, file, or metrics to analyse.
```

---

## 4. Filler Stripping

PTOF removes low-value conversational phrases such as:

- please
- could you
- can you help me
- I want to know
- I was wondering

It preserves meaning-sensitive elements:

- quantities
- negations
- conditionals
- urgency
- scope
- trade-offs

---

## 5. Logic Gate

The logic gate only runs when the prompt is complex.

Complexity signals include:

- multiple strong task types
- trade-offs
- ranking requests
- conditionals
- conflicting goals

When complexity is detected, PTOF preserves structure instead of over-compressing.

---

## 6. Adaptive Output Format

PTOF adds output constraints based on task type.

| Type | Output Format |
|---|---|
| Informational | Max 7 bullets |
| Decision | Max 3 options + 1 trade-off line each |
| Comparative | 2-column comparison, max 5 rows |
| Creative | 2 variants only |
| Strategic | Max 3 sections |
| Technical | Numbered steps only |
| Analytical | Max 3 findings + 1 impact line each |

If the user already specifies a format, PTOF should respect it instead of applying defaults.

---

## 7. Output Contract

The optimizer returns:

```text
COMPRESSED PROMPT:
<optimized prompt>

TYPE:
<task type>
```

Optional fields:

```text
NOTE:
Short prompt — Steps 1–3 bypassed

CLARIFY:
<question if critical info is missing>

ASSUMED:
<assumption made by optimizer>
```

---

## Design Principles

PTOF prioritizes:

- deterministic behavior
- token efficiency
- meaning preservation
- predictable formatting
- explainable decisions

It should avoid:

- semantic guessing
- unnecessary rewriting
- over-compression
- hidden assumptions

---

## Repository Structure

```text
core/
  optimizer.js

cli/
  ptof-cli.js

pipeline/
  prompt-pipeline.md

docs/
  architecture.md
  pipeline-explained.md

demo-ui/
  src/lib/ptof.js
```

---

## Current Status

The architecture reset focuses on the deterministic core and CLI.

---

## Future Direction

1. Align optimizer.js with pipeline spec
2. Connect UI to core optimizer
3. Add test cases
4. Add complex prompt testing
