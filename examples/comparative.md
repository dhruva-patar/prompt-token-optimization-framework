# Example: Comparative

## Example 1 — Database comparison

Raw input:
Compare PostgreSQL vs MongoDB for scalability, performance, and cost in high-traffic applications.

Pipeline output:
Compare PostgreSQL vs MongoDB for scalability, performance, and cost in high-traffic applications. Use 2-column comparison, max 5 rows.

Type:
Comparative

Why it works:
- "compare" → comparative signal
- Constraints preserved
- Structured output enforced

---

## Example 2 — API comparison

Raw input:
What is the difference between REST and GraphQL APIs in terms of flexibility and performance?

Pipeline output:
Compare REST vs GraphQL APIs for flexibility and performance. Use 2-column comparison, max 5 rows.

Type:
Comparative

Why it works:
- "difference" → comparative classification
- Scope preserved
- Output bounded

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
React vs Vue

Pipeline output:
Compare React vs Vue. Use 2-column comparison, max 5 rows.

Type:
Comparative

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Short prompt detected
- Comparative intent retained
- Minimal transformation
