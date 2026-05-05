# Example: Analytical

## Example 1 — Missing data

Raw input:
Analyze customer churn trends and identify key drivers across segments.

Pipeline output:
CLARIFY: Please share the data, file, or metrics to analyse.

Type:
Analytical

Why it works:
- Analytical intent detected
- No dataset present → stops execution
- Prevents hallucinated analysis

---

## Example 2 — Performance analysis

Raw input:
Evaluate sales performance across regions and identify patterns impacting revenue growth.

Pipeline output:
CLARIFY: Please share the data, file, or metrics to analyse.

Type:
Analytical

Why it works:
- "evaluate" → analytical signal
- Data required but missing
- Deterministic halt enforced

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
Analyze churn data

Pipeline output:
CLARIFY: Please share the data, file, or metrics to analyse.

Type:
Analytical

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Analytical intent retained
- Data missing → clarify
- Short prompt bypass does not override data requirement
