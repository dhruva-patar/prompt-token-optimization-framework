# Example: Strategic

## Example 1 — Market entry strategy

Raw input:
Plan a go-to-market strategy for a SaaS product targeting small businesses in Europe with limited marketing budget.

Pipeline output:
Plan a go-to-market strategy for a SaaS product. target: small businesses in Europe, basis: limited marketing budget. Use max 3 sections.

Type:
Strategic

Why it works:
- "plan" → strategic signal
- Target + constraint preserved
- Output constrained to high-level structure

---

## Example 2 — Growth strategy

Raw input:
Develop a growth strategy for a mobile app experiencing declining retention and increasing churn rates.

Pipeline output:
Develop a growth strategy for a mobile app. basis: declining retention and increasing churn rates. Use max 3 sections.

Type:
Strategic

Why it works:
- Strategy intent preserved
- Problem context retained
- Avoids execution-level detail

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
Plan GTM strategy for SaaS

Pipeline output:
Plan GTM strategy for SaaS. Use max 3 sections.

Type:
Strategic

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Short prompt detected
- Strategic classification retained
- Minimal transformation
