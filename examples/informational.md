# Example: Informational

## Example 1 — Detailed explanation

Raw input:
Could you please explain to me what transformer attention actually does in a language model and why it is important?

Pipeline output:
Explain what transformer attention does in a language model and why it is important. Use max 7 bullets.

Type:
Informational

Why it works:
- Filler removed ("Could you please", "to me", "actually")
- Strong informational signal ("explain")
- Output bounded to avoid verbosity

---

## Example 2 — Filler-heavy + conditional

Raw input:
I was wondering if you could help me understand why neural networks need activation functions and what would happen if we didn't use them at all?

Pipeline output:
Explain why neural networks need activation functions and what happens if they are not used. Use max 7 bullets.

Type:
Informational

Why it works:
- Filler removed
- Conditional preserved
- Informational intent retained

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
what is overfitting

Pipeline output:
What is overfitting? Use max 7 bullets.

Type:
Informational

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Short prompt detected
- Classification still applied
- No stripping needed
