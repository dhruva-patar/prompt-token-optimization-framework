# PTOF Pipeline — Explained

This document explains how the Prompt Token Optimization Framework (PTOF) processes prompts.

The goal of PTOF is simple:

> Reduce unnecessary tokens while preserving intent, logic, and output expectations before sending a prompt to an LLM.

---

## What PTOF Is and Is Not

PTOF is:

- deterministic
- rule-based
- predictable
- token-efficient

PTOF is not:

- an AI prompt rewriter
- a semantic guess engine
- a generative system

---

## High-Level Flow

```text
Prompt → Pre-check → Classify → Strip → Logic Gate → Format → Output
```

---

## 1. Pre-check: Token Threshold

If the prompt is very short:

```text
< 15 tokens
```

PTOF:

- skips classification
- skips stripping
- skips complexity checks
- assigns Informational type
- directly applies output format

Why?

Short prompts usually do not benefit from optimization.

---

## 2. Classification

PTOF assigns a single primary type:

| Type | Example |
|---|---|
| Informational | explain X |
| Decision | should I choose X |
| Comparative | compare X vs Y |
| Creative | write a story |
| Strategic | plan a roadmap |
| Technical | how to implement X |
| Analytical | analyze data |

If unclear, PTOF defaults to Informational.

---

## 3. Analytical Data Check

Analytical prompts require data.

If missing:

```text
CLARIFY: Please share the data, file, or metrics to analyse.
```

No optimization is performed until data is provided.

---

## 4. Strip Filler

PTOF removes conversational noise:

- please
- could you
- I was wondering
- can you help me

PTOF preserves:

- conditions, such as if/then
- constraints
- quantities
- urgency
- trade-offs

If stripping removes clarity, PTOF asks for clarification instead of guessing.

---

## 5. Logic Gate

The logic gate runs only when the prompt is complex.

It detects:

- trade-offs
- conditionals
- ranking requests
- conflicting goals

Rules:

- do not resolve trade-offs automatically
- preserve condition structure
- allow ranking but include trade-offs
- do not force a single answer for open-ended prompts

---

## 6. Adaptive Output Format

If the user specifies a format, PTOF follows it.

Otherwise, PTOF applies defaults:

| Type | Output Limit |
|---|---|
| Informational | max 7 bullets |
| Decision | max 3 options + 1 trade-off line each |
| Comparative | 2-column, max 5 rows |
| Creative | 2 variants |
| Strategic | max 3 sections |
| Technical | numbered steps only |
| Analytical | max 3 findings + 1 impact line each |

If `complex = TRUE`:

- blend the top 2 relevant formats
- still enforce output limits

---

## 7. Output

PTOF returns:

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
<question if needed>

ASSUMED:
<only if assumption made>
```

If nothing was assumed or missing, PTOF prints nothing extra.

---

## Compression Rules

Core rule:

```text
Fewer tokens > elegant phrasing
```

But:

- if meaning is lost, do not compress
- if the prompt is already optimal, return as-is

---

## Design Philosophy

PTOF is designed as a preprocessing layer, not a replacement for LLM reasoning.

It improves:

- clarity
- structure
- predictability
- token efficiency

before inference happens.

---

## Summary

PTOF ensures:

```text
clean input → controlled output → better LLM performance
```