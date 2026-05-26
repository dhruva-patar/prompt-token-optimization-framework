# PTOF Provider Architecture & Tomorrow Plan

# Provider Architecture

## Purpose

Providers connect PTOF middleware to LLM inference systems.

Examples:
- OpenAI
- Claude
- Gemini
- DeepSeek
- Ollama

---

# Core Rule

Providers consume PTOF outputs.

Providers must NEVER:
- modify optimization logic
- rewrite prompts
- bypass benchmark contracts
- alter deterministic preprocessing

Optimization remains exclusively inside:

```text
core/
```

---

# Architecture Flow

```text
Client
→ PTOF API
→ PTOF Core Optimization
→ Provider Adapter
→ LLM Provider
→ Structured Provider Response
```

---

# Provider Responsibilities

Providers may:
- send optimized prompts
- normalize provider responses
- capture latency
- capture token usage
- manage retries
- manage auth/API keys

Providers may NOT:
- compress prompts
- change formatting rules
- alter semantic structure
- introduce probabilistic optimization

---

# Planned Providers

## Cloud
- OpenAI
- Claude
- Gemini
- DeepSeek

## Local
- Ollama

---

# Future Direction

Potential future capabilities:
- provider routing
- fallback orchestration
- latency-aware routing
- cost-aware routing
- local/private inference support

---

# Important Philosophy

PTOF must remain:
- deterministic
- benchmarkable
- explainable

Provider integrations must not weaken these guarantees.

---

# Tomorrow Plan

## 1. SDK Scaffold

Goal:

```text
sdk/javascript/
sdk/python/
```

Define:
- SDK structure
- request flow
- response handling
- client abstraction

---

## 2. Python Client

Goal:
Convert Python from:

```text
second engine
```

into:

```text
API client
```

Important architecture transition.

---

## 3. Provider Adapters

AFTER SDK direction stabilizes.

Start with:
- OpenAI
- Ollama

ONLY after:
- provider contracts finalized
- SDK flow understood
- response shape stabilized
