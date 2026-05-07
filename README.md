# PTOF — Prompt Token Optimization Framework

> Deterministic prompt preprocessing infrastructure for Large Language Models.

PTOF is a rule-based optimization framework that classifies, structures, validates, and compresses prompts before inference.

Unlike AI-powered prompt rewriting tools, PTOF focuses on:
- deterministic behavior
- explainable transformations
- semantic safety
- structural optimization
- benchmark validation

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
- non-deterministic behavior

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

---

## Complexity Detection

Detects:
- multi-intent prompts
- trade-off analysis
- contradictory constraints
- conditional logic
- overloaded workflows

---

## Clarification Validation

Identifies when prompts genuinely require additional input before inference.

Examples:
- uploaded datasets
- referenced files
- missing code artifacts

---

## Structural Compression

PTOF performs safe structural compression such as:
- duplicate reduction
- repeated intent cleanup
- redundancy detection

WITHOUT:
- synonym swapping
- semantic rewriting
- AI hallucination risk

---

## Explainability Layer

Every classification and optimization step can be explained deterministically.

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

---

## Benchmark Infrastructure

PTOF includes:
- deterministic benchmark suites
- noisy real-world prompts
- semantic safety evaluation
- type accuracy validation
- clarification validation
- benchmark result persistence

---

# Example Pipeline

```text
Raw Prompt
↓
Classification
↓
Complexity Detection
↓
Clarification Check
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

- prompt preprocessing middleware
- enterprise AI workflows
- benchmarkable prompt pipelines
- safe prompt normalization
- LLM infrastructure tooling
- structured AI orchestration systems

---

# Example Outputs

See:

```text
docs/examples/
```

Included examples:
- noisy founder prompts
- emotional debugging prompts
- overloaded AI workflows

---

# Philosophy

PTOF intentionally avoids:
- LLM-based optimization
- embeddings
- vector similarity
- probabilistic rewriting
- black-box transformations

The framework prioritizes:
- explainability
- reproducibility
- auditability
- semantic preservation

---

# Current Status

Current version includes:
- deterministic optimization pipeline
- structural compression v0.2
- noisy benchmark suite v0.3
- explainability layer v0.4
- public examples v0.5

---

# Roadmap

## v0.6
- CLI polish
- benchmark reporting improvements
- benchmark diffing

## v0.7
- architecture diagrams
- provider-aware optimization
- expanded benchmark datasets

## v0.8
- UI integration improvements
- optimization visualization
- benchmark dashboards

## v1.0
- public release
- stable benchmark suite
- provider-aware preprocessing

---

# Project Structure

```text
core/
 ├── compression/
 ├── explainability/
 └── optimizer.js

docs/
 └── examples/

test/
 ├── benchmarkCases/
 ├── evaluators/
 └── results/
```

---

# License

MIT
