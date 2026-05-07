# Example — Noisy Founder Prompt

## Raw Prompt

```text
I need help figuring out the best best best direction for PTOF because I keep changing direction and I want you to explain the trade-offs and explain why one route makes more sense and recommend what I should do next because honestly I feel stuck between making this a SaaS product, keeping it open source, or turning it into middleware for AI tooling.
```

---

## PTOF Classification

```json
{
  "type": "Decision",
  "complex": true,
  "shouldClarify": false
}
```

---

## Optimized Prompt

```text
I need help figuring out the best direction for PTOF. Explain the trade-offs and why one route makes more sense, then recommend what I should do next. I feel stuck between making this a SaaS product, keeping it open source, or turning it into middleware for AI tooling.
```

---

## Compression Notes

- Removed repeated wording: "best best best"
- Reduced repeated intent phrase: "explain"
- Preserved core decision structure

---

## Explainability Output

```json
{
  "classification": [
    "Detected Decision signal: recommend.",
    "Detected Decision signal: best.",
    "Detected Decision signal: choose."
  ],
  "complexity": [
    "Multiple intent families detected: Decision, Comparative.",
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

This prompt contains:
- emotional filler
- repeated intent verbs
- multiple competing goals

PTOF preserves the core decision-making structure while reducing redundancy and maintaining deterministic classification.
