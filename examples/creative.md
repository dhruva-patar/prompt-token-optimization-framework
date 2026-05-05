# Example: Creative

## Example 1 — Story generation

Raw input:
Write a short story about a robot learning human emotions in a futuristic society where humans are extinct.

Pipeline output:
Write a short story about a robot learning human emotions in a futuristic society where humans are extinct. Give 2 variants only.

Type:
Creative

Why it works:
- "write" → creative classification
- Context preserved
- Output limited to avoid token explosion

---

## Example 2 — Branding content

Raw input:
Create a compelling brand tagline for a sustainable fashion startup targeting Gen Z consumers.

Pipeline output:
Create a brand tagline for a sustainable fashion startup targeting Gen Z consumers. Give 2 variants only.

Type:
Creative

Why it works:
- "create" → creative signal
- Target audience preserved
- Output constrained to variants

---

## Example 3 — Short prompt (<15 tokens)

Raw input:
Write product tagline

Pipeline output:
Write product tagline. Give 2 variants only.

Type:
Creative

Note:
Short prompt — Steps 2–3 bypassed

Why it works:
- Short prompt detected
- Creative intent retained
- Minimal transformation
