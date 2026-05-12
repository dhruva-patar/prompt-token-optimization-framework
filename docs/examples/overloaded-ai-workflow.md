# Example — Overloaded AI Workflow Prompt

## Raw Prompt

```text
Compare GPT, Claude, and Gemini for long-context enterprise analysis workflows, recommend the best option for architecture reviews, explain the trade-offs for cost and reasoning depth, create an implementation roadmap, suggest benchmark metrics, and identify the biggest risk if the organization scales usage too quickly.
```

---

## PTOF Classification

```json
{
  "type": "Comparative",
  "complex": true,
  "shouldClarify": false
}
```

---

## Optimized Prompt

```text
Compare GPT, Claude, and Gemini for enterprise analysis workflows. Recommend the best option for architecture reviews, explain trade-offs for cost and reasoning depth, create an implementation roadmap, suggest benchmark metrics, and identify scaling risks.
```

---

## Compression Notes

- Reduced repeated workflow phrasing
- Preserved multi-intent structure
- Preserved all comparison targets

---

## Explainability Output

```json
{
  "classification": [
    "Detected Comparative signal: compare.",
    "Detected Decision signal: recommend.",
    "Detected Strategic signal: roadmap."
  ],
  "complexity": [
    "Multiple intent families detected: Comparative, Decision, Strategic.",
    "Detected complexity signal: comparison or trade-off."
  ],
  "clarification": [
    "No missing input dependency detected."
  ]
}
```

---

## Benchmark Result

```json
{
  "semanticRisk": "LOW",
  "instructionRetention": "PASS",
  "complexityAccuracy": "PASS",
  "typeAccuracy": "PASS"
}
```

---

## Why This Matters

This prompt combines:
- comparison
- recommendation
- roadmap generation
- risk analysis
- evaluation metrics

PTOF handles multi-intent prompts deterministically while preserving structural clarity.
