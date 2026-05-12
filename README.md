# PTOF — Prompt Token Optimization Framework

> Deterministic prompt preprocessing middleware for Large Language Model workflows.

PTOF is a rule-based optimization framework that classifies, structures, validates, and compresses prompts before inference.

Unlike AI-powered prompt rewriting tools, PTOF focuses on:
- deterministic behavior
- explainable transformations
- semantic safety
- structural optimization
- benchmark validation
- reproducible outputs

---

# Why PTOF Exists

Most prompt tooling today behaves like a black box:

```text
input → AI rewrite → output
```

This creates problems:
- unpredictable transformations
- semantic drift
- inconsistent outputs
- impossible benchmarking
- difficult debugging
- non-deterministic behavior
- unreliable enterprise workflows

PTOF takes a different approach:

```text
input
→ classify
→ detect complexity
→ detect clarification dependency
→ structurally compress
→ validate safety
→ explain reasoning
→ benchmark deterministically
```

The framework acts as a preprocessing layer between user input and an LLM.

Instead of replacing prompts with probabilistic rewrites, PTOF focuses on deterministic preprocessing infrastructure.

---

# Core Philosophy

PTOF intentionally avoids:
- LLM-based optimization
- embeddings
- vector similarity
- probabilistic rewriting
- black-box transformations
- semantic hallucination risk

The framework prioritizes:
- explainability
- reproducibility
- auditability
- semantic preservation
- deterministic behavior
- infrastructure-level reliability

This makes PTOF more suitable for:
- enterprise workflows
- middleware systems
- benchmarkable pipelines
- prompt orchestration systems
- controlled AI environments

---

# Core Features

## Deterministic Classification

PTOF classifies prompts into task families such as:
- Comparative
- Technical
- Analytical
- Decision
- Creative
- Strategic
- Informational

Example:

```text
Compare GPT and Claude for enterprise architecture reviews.
```

Detected as:

```text
Comparative
```

---

## Complexity Detection

PTOF detects:
- multi-intent prompts
- trade-off analysis
- contradictory constraints
- overloaded workflows
- conditional reasoning
- mixed task families

Example:

```text
Compare GPT and Claude, recommend one, explain trade-offs, and create a migration plan.
```

Detected as:

```text
Comparative complex
```

---

## Clarification Validation

PTOF identifies when prompts genuinely require additional information before inference.

Examples:
- uploaded datasets
- missing code artifacts
- referenced files
- unavailable screenshots
- undefined inputs

Example:

```text
Analyze this uploaded CSV and explain the drop in retention.
```

Detected as:

```text
Clarification required
```

---

## Structural Compression

PTOF performs deterministic structural cleanup such as:
- duplicate removal
- repeated intent cleanup
- redundancy detection
- filler reduction
- repeated phrase normalization

WITHOUT:
- semantic rewriting
- synonym substitution
- AI-generated paraphrasing

This preserves semantic intent while reducing prompt noise.

---

## Explainability Layer

Every optimization decision can be explained deterministically.

Example:

```json
{
  "classification": [
    "Detected Comparative signal: compare.",
    "Detected Decision signal: recommend."
  ],
  "complexity": [
    "Multiple intent families detected.",
    "Detected comparison or trade-off signal."
  ]
}
```

This allows PTOF to function as:
- an optimization engine
- a debugging tool
- a prompt analysis system
- a benchmarkable preprocessing layer

---

# Benchmark Infrastructure

PTOF includes a deterministic benchmark system designed to evaluate:
- type accuracy
- semantic safety
- instruction retention
- clarification accuracy
- complexity detection
- token efficiency

Benchmark suite includes:
- short prompts
- noisy prompts
- emotional prompts
- contradictory prompts
- overloaded enterprise prompts
- multi-intent prompts
- real-world workflow prompts

Current benchmark status:

```text
PASS: 16
WARN: 0
FAIL: 0
```

---

# Example Pipeline

```text
Raw Prompt
↓
Classification
↓
Complexity Detection
↓
Clarification Validation
↓
Structural Compression
↓
Semantic Validation
↓
Explainability Output
↓
Optimized Prompt
```

---

# Example Use Cases

PTOF can function as:
- prompt preprocessing middleware
- enterprise AI infrastructure
- prompt normalization layer
- benchmarkable optimization pipeline
- AI orchestration utility
- structured AI workflow engine
- safe prompt preprocessing system

Potential integrations:
- enterprise copilots
- LLM routing systems
- prompt gateways
- benchmark tooling
- provider-aware optimization
- AI workflow orchestration systems

---

# CLI Usage

## Optimize Prompt

```bash
npm run ptof -- optimize "Compare GPT and Claude for code review and recommend one."
```

Example output:

```text
COMPRESSED PROMPT:
Compare GPT and Claude for code review and recommend one.

TYPE:
Comparative complex

FORMAT RULE:
Use 2-column comparison, max 5 rows.
```

---

## Explain Optimization

```bash
npm run ptof -- explain "Debug this React layout issue on mobile."
```

Outputs deterministic reasoning layers.

---

## Run Benchmarks

```bash
npm run benchmark
```

or:

```bash
node cli/ptof-cli.js benchmark
```

---

# Demo UI

PTOF includes a React + Vite demo UI for:
- prompt testing
- optimization visualization
- classification inspection
- token comparison
- explainability inspection

Run locally:

```bash
cd demo-ui
npm install
npm run dev
```

The UI currently demonstrates:
- deterministic optimization
- classification logic
- complexity detection
- prompt comparison
- benchmark-ready outputs

---

# Current Scope

PTOF currently focuses on:
- deterministic preprocessing
- structural cleanup
- classification
- semantic-safe optimization
- explainable transformations

Current optimization intentionally avoids:
- aggressive semantic rewriting
- probabilistic restructuring
- AI-generated paraphrasing

This is an intentional architectural decision.

---

# Planned v0.8 Features

Upcoming structural optimization layer:
- long prompt structuring
- reference extraction
- output intent restructuring
- constraint extraction
- deterministic prompt organization

Example future transformation:

Before:

```text
messy prompt + links + scattered instructions
```

After:

```text
TASK:
...

REFERENCE MATERIAL:
- link
- link

CONSTRAINTS:
...
```

WITHOUT changing semantic meaning.

---

# Roadmap

## v0.8
- long prompt structuring
- reference extraction
- output intent restructuring
- optimization visualization improvements

## v0.9
- integration benchmark layer
- provider-aware optimization
- expanded benchmark datasets
- prompt pipeline visualization

## v1.0
- SaaS architecture
- provider abstraction layer
- API middleware support
- benchmark dashboards
- orchestration APIs
- public release

---

# Project Structure

```text
core/
 ├── classification/
 ├── clarification/
 ├── compression/
 ├── complexity/
 ├── explainability/
 ├── formatting/
 ├── structure/
 └── optimizer.js

cli/
 ├── ptof-cli.js
 └── commands/

demo-ui/

test/
 ├── benchmarkCases/
 ├── evaluators/
 └── results/

docs/
```

---

# Technical Direction

PTOF is evolving toward:

```text
Deterministic preprocessing middleware for LLM systems.
```

Long-term goals include:
- provider-aware preprocessing
- prompt routing intelligence
- middleware orchestration
- benchmark-driven optimization
- enterprise-safe preprocessing layers

The project intentionally prioritizes:
- correctness before intelligence
- determinism before creativity
- explainability before automation

---

# License

MI
