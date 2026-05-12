# Example: Decision

## Example 1 — Constraint-heavy

Raw input:
Help me decide whether to invest in index funds or actively managed portfolios based on moderate risk and long-term wealth growth.

Pipeline output:
Decide whether to invest in index funds or actively managed portfolios. basis: moderate risk and long-term wealth growth. Give max 3 options with 1 trade-off line each.

Type:
Decision

Why it works:
- Filler removed
- Constraints preserved
- Decision structure enforced

---

## Example 2 — Recommendation style

Raw input:
Can you recommend the best cloud provider for a startup with limited budget and high scalability requirements?

Pipeline output:
Recommend the best cloud provider for a startup. basis: limited budget and high scalability requirements. Give max 3 options with 1 trade-off line each.

Type:
Decision

Why it works:
- "recommend" → decision signal
- Constraints preserved
- Output structured

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
Should I learn React or Vue?

Pipeline output:
Should I learn React or Vue? Give max 3 options with 1 trade-off line each.

Type:
Decision

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Short prompt detected
- Decision intent preserved
- No stripping applied
