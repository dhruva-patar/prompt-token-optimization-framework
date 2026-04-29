# Example: Comparative

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Technology comparison

**Raw input:**
```
What is the difference between REST and GraphQL APIs?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 12 tokens → proceed |
| Classification | "difference" → **Comparative** (confidence: 0.98) |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "What is the" |
| Logic gate | Skipped |
| Format | 2-column max, max 5 rows |

**Pipeline output:**
```
COMPRESSED PROMPT: REST vs GraphQL APIs — key differences?
TYPE: Comparative
```

**Sample response (formatted output):**

| Dimension | REST | GraphQL |
|-----------|------|---------|
| Data fetching | Fixed endpoints return fixed shapes | Client specifies exact fields needed |
| Over/under-fetching | Common (multiple round trips or excess data) | Eliminated by design |
| Versioning | Requires v1/v2 endpoint management | Schema evolution without versioning |
| Tooling maturity | Very high — decades of ecosystem | High but younger; strong growth |
| Best fit | Simple CRUD, public APIs, caching-heavy | Complex UIs, mobile clients, rapid iteration |

---

## Example 2 — Concept comparison with complexity

**Raw input:**
```
Can you compare supervised vs unsupervised vs reinforcement learning? I want to understand the differences and when to use each.
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 24 tokens → proceed |
| Classification | "compare", "differences" → **Comparative**; "when to use" → Decision secondary |
| Complexity flag | 2 signals → `flag_complex = TRUE` |
| Strip | Removed: "Can you", "I want to understand" |
| Logic gate | Tension preserved — no forced single recommendation |
| Format | Comparative + Decision blend; still max 5 rows |

**Pipeline output:**
```
COMPRESSED PROMPT: Supervised vs unsupervised vs reinforcement learning — differences and when to use each?
TYPE: Comparative (complex)
```

**Sample response (formatted output):**

| Dimension | Supervised | Unsupervised | Reinforcement |
|-----------|-----------|--------------|---------------|
| Label requirement | Labelled data required | No labels needed | No labels; reward signal |
| Core task | Prediction/classification | Pattern discovery | Sequential decision-making |
| Example algorithms | Linear regression, SVM, CNNs | K-means, PCA, autoencoders | Q-learning, PPO, A3C |
| When to use | You have labelled data and a defined target | Exploring structure in unlabelled data | Agent must learn through interaction |
| Risk | Label quality bottleneck | Results harder to evaluate | Sample inefficiency, reward hacking |

---

## Example 3 — Concise head-to-head

**Raw input:**
```
Docker vs Kubernetes — what's the difference?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 8 tokens → proceed |
| Classification | "vs", "difference" → **Comparative** (confidence: 0.99) |
| Strip | Nothing to strip — already minimal |
| Format | 2-column, max 5 rows |

**Pipeline output:**
```
COMPRESSED PROMPT: Docker vs Kubernetes — key differences?
TYPE: Comparative
ASSUMED: Audience is a developer familiar with containers at a basic level
```

**Sample response (formatted output):**

| Dimension | Docker | Kubernetes |
|-----------|--------|------------|
| Purpose | Build and run individual containers | Orchestrate and manage many containers at scale |
| Scope | Single host by default | Multi-host cluster management |
| Abstraction level | Container runtime | Container orchestration platform |
| Learning curve | Low — fast to start | High — significant config and concepts |
| Typical use | Dev environments, single-service deployments | Production microservices at scale |
