# Example: Creative

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Copywriting

**Raw input:**
```
Can you write me a tagline for an AI productivity app called FocusFlow that helps people manage their tasks and stay focused?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 26 tokens → proceed |
| Classification | "write me" → **Creative** (confidence: 0.95) |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "Can you", "me" |
| Logic gate | Skipped |
| Format | 2 variants only |

**Pipeline output:**
```
COMPRESSED PROMPT: Write a tagline for FocusFlow — AI productivity app for task management and focus.
TYPE: Creative
```

**Sample response (2 variants):**

**Variant A — Functional, direct:**
*"Your tasks, handled. Your focus, protected."*

**Variant B — Aspirational, emotional:**
*"Stop managing your day. Start owning it."*

---

## Example 2 — Long-form creative writing

**Raw input:**
```
I want you to generate a short story opening — something atmospheric and tense, set in a near-future city where AI surveillance is everywhere
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 28 tokens → proceed |
| Classification | "generate", "story" → **Creative** (confidence: 0.96) |
| Strip | Removed: "I want you to", "something" |
| Format | 2 variants only |

**Pipeline output:**
```
COMPRESSED PROMPT: Write an atmospheric, tense short story opening set in a near-future city with pervasive AI surveillance.
TYPE: Creative
```

**Sample response (2 variants):**

**Variant A — Close third-person, ground-level:**

The corner camera rotated two degrees as Mira crossed the street.
She'd learned to count them — the small adjustments, the tracking
micro-movements the city pretended not to make. Forty-one on this
block alone. Forty-one witnesses who never blinked, never forgot,
never filed a report unless the system decided you were worth one.

She kept her eyes ahead and walked like someone with nothing to hide.
That was the performance now. The daily audition.

**Variant B — Second-person, immersive:**

You don't notice when the city starts watching you. That's the point.
It happened in increments — a camera on every corner, a sensor in
every lamp post, an algorithm learning your pace, your posture,
the particular way you hesitate before a crossing. By the time
most people realised, they'd already been indexed, scored, filed.

You realised three years ago. You've been careful ever since.
It hasn't helped.

---

## Example 3 — Professional copy

**Raw input:**
```
Write a short bio for a researcher who studies LLM prompt efficiency
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 14 tokens → proceed |
| Classification | "write" → **Creative** (confidence: 0.94) |
| Strip | Removed: none — already lean |
| Format | 2 variants only |

**Pipeline output:**
```
COMPRESSED PROMPT: Write a short professional bio for an LLM prompt efficiency researcher.
TYPE: Creative
CLARIFY: Should the bio be first-person or third-person?
```

**Sample response (2 variants):**

**Variant A — Third-person, formal:**

Dhruva Patar is a researcher specialising in prompt engineering and
LLM input optimisation. His work focuses on deterministic preprocessing
frameworks that improve response consistency and reduce token overhead
without model fine-tuning. He is the author of the Prompt Token
Optimisation Framework (PTOF), an open-source methodology for
rule-based prompt classification and compression.

**Variant B — First-person, approachable:**

I work on making LLMs more predictable — not by changing the models,
but by improving what goes into them. My research focuses on
lightweight, rule-based preprocessing frameworks that classify,
compress, and reformat prompts before inference. My goal is better
outputs with less noise, at zero infrastructure cost.
