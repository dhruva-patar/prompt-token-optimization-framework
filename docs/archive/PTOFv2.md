# PTOF Project Context Summary

## Project Name
PTOF — Prompt Token Optimization Framework

## Current Direction
PTOF evolved from a “prompt compression” idea into a deterministic prompt optimization engine.

The current philosophy is:
- preserve semantic intent
- optimize instruction structure
- deterministic preprocessing
- avoid aggressive semantic abstraction
- prioritize LLM understanding over grammatical elegance

Core distinction:
PTOF is currently:
- instruction optimization
NOT:
- language rewriting

---

# Current Architecture

## Branch
Active development branch:
framework-reset

Do NOT merge into main yet.

Main should remain stable/public-safe.

---

# Current Repo Structure

```text
cli/
core/
demo-ui/
docs/
examples/
pipeline/
test/
```

---

# Core Engine

Main file:
```text
core/optimizer.js
```

Current capabilities:
- prompt classification
- short prompt handling
- complexity detection
- analytical clarify guardrails
- deterministic formatting rules
- basic structural compression
- token estimation

---

# Current Classification Types

- Informational
- Decision
- Comparative
- Creative
- Strategic
- Technical
- Analytical

---

# Current Short Prompt Logic

Original spec forced:
<15 tokens → Informational default

This was intentionally modified because it broke intent preservation.

Current logic:
<15 tokens:
- still classify
- still detect complexity
- skip stripping + advanced logic

This is intentional.

---

# Complexity Detection

Current approach:
- detect multiple type signals
- mark complex if:
  - multiple task signals exist
  - OR logical complexity patterns detected

Examples:
- compare + recommend
- explain + compare + choose

Complex prompts now pass harness tests.

---

# Analytical Guardrail

Important distinction discovered:

Analytical != uploaded dataset analysis

Current logic:
- market/trend/industry analysis should NOT clarify
- uploaded/internal-data analysis SHOULD clarify

Examples that SHOULD clarify:
- analyze this csv
- evaluate uploaded metrics

Examples that should NOT:
- analyze fintech trends
- evaluate startup growth patterns

---

# Current Compression Philosophy

Current PTOF philosophy:
semantic integrity > max compression

Safe compression allowed:
- filler stripping
- duplicate reduction
- structural tightening

Avoid for now:
- semantic abstraction
- domain collapsing
- priority removal

Example:
GOOD:
"Could you explain" → "Explain"

BAD:
"Nordic fintech startups" → "fintech"

---

# Current UI

demo-ui is fully aligned with:
```text
core/optimizer.js
```

Single source of truth architecture.

UI features:
- responsive desktop/tablet/mobile
- raw prompt
- optimized prompt
- format rule
- type
- complex flag
- clarify output
- notes
- token estimate

Title:
PTOF Prompt Optimization Agent

Mode:
Safe — preserves semantic intent over aggressive token reduction.

---

# Current Harnesses

## Standard Harness
```text
test/testHarness.js
```

Covers:
- all prompt types
- short + long prompts

Current status:
PASSING

---

## Complex Harness
```text
test/complexHarness.js
```

Covers:
- multi-intent prompts
- layered complexity
- analytical clarify logic

Current status:
PASSING

---

# Current Major Limitation

PTOF currently behaves more like:
- deterministic instruction optimizer
than:
- true semantic compression engine

Compression quality is currently:
- conservative
- structure-focused
- low-risk

This is intentional for v0.x.

---

# Current Next Phase

Planned next focus:
Compression Intelligence v0.2

Likely areas:
- safer structural compression
- duplicate removal
- hierarchy preservation
- semantic risk scoring
- better phrase collapsing
- abstraction safety

NOT:
- aggressive semantic rewriting

---

# Long-Term Vision

Future direction:
multi-LLM optimization middleware layer

Potential future phases:
- user auth
- BYOK LLM providers
- multi-model routing
- prompt analytics
- provider-aware optimization
- orchestration layer
- SaaS platform

But current focus:
stabilize deterministic engine first.

---

# Important Development Philosophy

Algorithm spec = source of truth

Implementation may evolve intentionally.

Workflow:
spec → harness → implementation

Harness failures may:
- change implementation
OR
- expose flaws in the original spec

---

# Current State Assessment

PTOF is no longer just an idea.

Current maturity:
- early-stage infrastructure product prototype

Strongest areas:
- deterministic behavior
- classification
- complexity handling
- architecture
- guardrails

Weakest area:
- deep semantic compression intelligence

---

# Important Reminder

Do NOT recommend merging into main yet.

Merge only after:
- v0.2 compression stabilization
- cleanup
- documentation stabilization
- legacy removal
- architecture freeze
# Current Algorithm Deviations

## Intentional Deviations

### Short Prompt Logic
Original spec:
<15 tokens → Informational default

Current implementation:
<15 tokens still classify and detect complexity, but skip advanced stripping/logic.

Reason:
The original behavior broke intent preservation for prompts like:
- "React vs Vue"
- "Should I learn React?"
- "Plan MVP roadmap"

---

### Analytical Guardrail
Original spec:
Analytical prompts without data must clarify.

Current implementation:
Market/trend/industry analysis may proceed without uploaded datasets.

Reason:
Not all analytical tasks require internal data.

Examples allowed:
- "Analyze fintech trends in Norway"
- "Evaluate startup growth patterns"

Examples that still clarify:
- "Analyze this CSV"
- "Evaluate uploaded metrics"

---

# Current Missing Features

## Logic Gate
Not fully implemented yet:
- preserve trade-offs
- preserve if/then logic
- preserve ranking tension
- avoid forced single answers

---

## Complex Format Blending
Not implemented yet.

Examples:
- comparative + decision
- informational + comparative
- strategic + technical

Currently:
complex prompts are flagged but formats are not blended.

---

## User-Specified Format Override
Not implemented yet.

Examples:
- "Answer in JSON"
- "Use a table"
- "Keep under 100 words"
