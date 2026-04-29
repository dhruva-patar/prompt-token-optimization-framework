# Example: Analytical

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

> **Important:** The Analytical type triggers a mandatory data check (Step 1B).  
> If no data, file, or metrics are present in the prompt, the pipeline halts and requests them.  
> All examples below include data to demonstrate valid pipeline execution.

---

## Example 1 — Model performance analysis

**Raw input:**
```
Analyse these model evaluation results and tell me what they mean:
- Model A: Accuracy 94.2%, F1 0.91, Precision 0.93, Recall 0.89, Inference time 42ms
- Model B: Accuracy 91.8%, F1 0.93, Precision 0.88, Recall 0.98, Inference time 18ms
- Model C: Accuracy 95.1%, F1 0.90, Precision 0.96, Recall 0.84, Inference time 87ms
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 68 tokens → proceed |
| Classification | "analyse", "results" → **Analytical** (confidence: 0.98) |
| Data check | Metrics present → proceed |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "tell me what they mean" |
| Format | Max 3 findings + 1 impact line each |

**Pipeline output:**
```
COMPRESSED PROMPT: Analyse model evaluation results — A, B, C across accuracy, F1, precision, recall, inference time.
TYPE: Analytical
```

**Sample response (3 findings):**

**Finding 1 — Model B is the strongest general-purpose choice**
Despite lowest accuracy (91.8%), Model B leads on F1 (0.93) and recall (0.98), and is 2.3× faster than Model A.
*Impact: In production systems where false negatives are costly (e.g. fraud detection, medical screening), Model B minimises misses at the lowest latency cost.*

**Finding 2 — Model C optimises for precision at the cost of recall and speed**
Model C has the highest accuracy (95.1%) and precision (0.96) but the lowest recall (0.84) and highest latency (87ms).
*Impact: Model C suits use cases where false positives are more harmful than false negatives (e.g. content moderation flagging for human review) and latency is not a constraint.*

**Finding 3 — The accuracy-F1 inversion signals class imbalance**
Model A and C show higher accuracy but lower F1 than Model B — a classic sign the test set has class imbalance.
*Impact: Accuracy should not be the primary selection metric here; F1 or the precision/recall split is more meaningful depending on the cost asymmetry of errors in your application.*

---

## Example 2 — Data check triggered (no data provided)

**Raw input:**
```
Analyse the performance of our recommendation engine
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 9 tokens → proceed |
| Classification | "analyse", "performance" → **Analytical** (confidence: 0.97) |
| Data check | **No data present → STOP** |

**Pipeline output:**
```
CLARIFY: Please share the data, file, or metrics to analyse.
```

*Pipeline halts here. No further steps executed until data is provided.*

---

## Example 3 — Survey or qualitative data analysis

**Raw input:**
```
Evaluate this user feedback data from our product survey and identify key patterns:
- 67% of users say onboarding is confusing
- 54% couldn't find the export function
- 82% rated core features positively
- 41% abandoned during the first session
- NPS score: 34
- Top complaint (38% of open responses): "too many steps to complete a task"
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 72 tokens → proceed |
| Classification | "evaluate", "identify" → **Analytical** (confidence: 0.96) |
| Data check | Survey metrics present → proceed |
| Strip | Removed: "and identify key patterns" (redundant — implied by Analytical type) |
| Format | Max 3 findings + 1 impact line each |

**Pipeline output:**
```
COMPRESSED PROMPT: Analyse product survey data — onboarding, feature discovery, retention, NPS, and qualitative feedback.
TYPE: Analytical
```

**Sample response (3 findings):**

**Finding 1 — Onboarding is the primary retention failure point**
67% cite confusing onboarding; 41% abandon in the first session. These two metrics directly correlate — first-session abandonment is the quantified cost of poor onboarding.
*Impact: Improving onboarding is the highest-leverage intervention available; even a 50% reduction in abandonment would materially improve retention and LTV.*

**Finding 2 — Navigation and information architecture are broken**
54% couldn't locate the export function despite 82% rating core features positively. Users value what the product does — they simply cannot find it.
*Impact: This is a discoverability problem, not a feature problem. IA restructuring or a search/command palette would likely improve NPS and reduce friction without any feature development.*

**Finding 3 — Task flow complexity is the dominant qualitative signal**
38% of open responses reference "too many steps" — the single largest theme in unstructured feedback. NPS of 34 is below industry average (typically 40–50 for SaaS) but not critically low.
*Impact: Task flow reduction (progressive disclosure, smart defaults, fewer required fields) should be the design priority for the next sprint cycle.*
