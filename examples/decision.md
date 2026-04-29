# Example: Decision

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Tool/framework selection

**Raw input:**
```
I need to decide whether I should use PyTorch or TensorFlow for a new computer vision project. What do you recommend?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 26 tokens → proceed |
| Classification | "decide", "recommend", "should" → **Decision** (confidence: 0.96) |
| Complexity flag | Single dominant signal → `flag_complex = FALSE` |
| Strip | Removed: "I need to", "What do you" |
| Logic gate | Skipped |
| Format | Max 3 options + 1 trade-off line each |

**Pipeline output:**
```
COMPRESSED PROMPT: PyTorch vs TensorFlow for a new computer vision project — which to use?
TYPE: Decision
```

**Sample response (formatted output):**

**Option 1 — PyTorch**
Dominant choice in research and CV; excellent ecosystem (torchvision, timm, detectron2); dynamic graphs aid debugging.
*Trade-off: Production deployment is more manual than TensorFlow's TF Serving.*

**Option 2 — TensorFlow / Keras**
Strong production tooling (TF Serving, TFLite, TF.js); Keras API lowers barrier for rapid prototyping.
*Trade-off: Research community has largely shifted to PyTorch; fewer cutting-edge CV model implementations.*

**Option 3 — JAX**
Best performance on TPUs; functional paradigm enables clean gradient computation; growing CV adoption.
*Trade-off: Steeper learning curve; smaller community and fewer pre-built CV tools.*

---

## Example 2 — Career or strategic decision

**Raw input:**
```
Should I pursue a PhD in machine learning or go straight into industry after my master's?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 21 tokens → proceed |
| Classification | "should" → **Decision** (confidence: 0.93) |
| Strip | Removed: none (all content load-bearing) |
| Format | Max 3 options + 1 trade-off line each |

**Pipeline output:**
```
COMPRESSED PROMPT: PhD in ML vs industry after master's — which path?
TYPE: Decision
CLARIFY: What is your goal — research contributions, startup, large tech company, or open?
```

**Sample response (formatted output):**

**Option 1 — PhD**
Necessary for research roles at top labs (DeepMind, Anthropic, OpenAI); develops deep expertise and publication record.
*Trade-off: 4–6 years, lower income during program, and academic job market is competitive.*

**Option 2 — Industry (large company)**
Faster compensation, real-world scale, structured mentorship at companies like Google, Meta, or Microsoft.
*Trade-off: Research depth is narrower; switching to frontier research later is harder without publications.*

**Option 3 — Industry (startup)**
Broadest ownership, fastest career growth, direct product impact; master's is often sufficient.
*Trade-off: High variance outcome; limited mentorship structure in early-stage companies.*

---

## Example 3 — Binary decision with hidden complexity

**Raw input:**
```
Best way to store user session data — Redis or a database?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 12 tokens → proceed |
| Classification | "best", "or" → **Decision** with Comparative secondary signal |
| Complexity flag | 2 signals → `flag_complex = TRUE` |
| Logic gate | Trade-offs preserved; no forced single answer |
| Format | Blend Decision + Comparative caps |

**Pipeline output:**
```
COMPRESSED PROMPT: Redis vs database for user session storage — which is better?
TYPE: Decision (complex)
ASSUMED: Web application context, standard session size (<1KB)
```

**Sample response (formatted output):**

**Option 1 — Redis**
In-memory speed (sub-millisecond reads); built-in TTL for session expiry; horizontally scalable.
*Trade-off: Additional infrastructure to manage; data is lost on crash without persistence config.*

**Option 2 — Relational database (PostgreSQL/MySQL)**
No extra infrastructure; sessions durable by default; easier auditing and joining with user records.
*Trade-off: Higher latency per read; can become a bottleneck under high concurrent session load.*

**Option 3 — Hybrid (DB-backed Redis)**
Redis as primary session store with DB as persistence layer; best of both.
*Trade-off: Most complex setup; only justified at significant scale (10K+ concurrent sessions).*
