# Example — Emotional Debugging Prompt

## Raw Prompt

```text
Okay I genuinely need help because this React layout is driving me insane and I have tried everything and now the tablet mode is completely broken and mobile is somehow even worse. Please explain what is likely happening and give me steps because I am clearly missing something obvious.
```

---

## PTOF Classification

```json
{
  "type": "Technical",
  "complex": true,
  "shouldClarify": false
}
```

---

## Optimized Prompt

```text
This React layout is broken on tablet and mobile. Explain what is likely happening and provide debugging steps.
```

---

## Compression Notes

- Reduced emotional filler
- Preserved technical context
- Preserved debugging intent

---

## Explainability Output

```json
{
  "classification": [
    "Detected Technical signal: React.",
    "Detected Technical signal: debug.",
    "Detected Technical signal: layout."
  ],
  "complexity": [
    "Detected complexity signal: contrast language."
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

Real-world prompts are often emotional and noisy. PTOF preserves technical intent while removing unnecessary filler without relying on AI rewriting.
