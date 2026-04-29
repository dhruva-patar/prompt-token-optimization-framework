# Example: Strategic

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Product/go-to-market strategy

**Raw input:**
```
I need a strategy for launching a B2B SaaS product to enterprise customers when we have no existing customer base or brand recognition
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 26 tokens → proceed |
| Classification | "strategy for", "plan" → **Strategic** (confidence: 0.95) |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "I need a" |
| Logic gate | Skipped |
| Format | Max 3 sections |

**Pipeline output:**
```
COMPRESSED PROMPT: Strategy for launching B2B SaaS to enterprise with no existing customer base or brand?
TYPE: Strategic
```

**Sample response (3 sections):**

**1. Establish proof-of-concept credibility**
No enterprise buyer purchases from an unknown vendor without evidence. Recruit 2–3 design partners willing to pilot for free or reduced cost in exchange for co-development input and a case study. Focus on a narrow vertical where your product solves a clearly documented pain. One credible case study in a recognised company is worth more than ten general testimonials.

**2. Build a distribution wedge**
Cold outbound at enterprise scale is expensive and slow. Instead, identify where your target buyers already gather — industry conferences, Slack communities, LinkedIn groups, analyst reports — and position there. Invest in one channel deeply rather than spreading thin. Partnerships with consultancies or systems integrators who already have enterprise relationships can compress the trust-building timeline significantly.

**3. Structure deals to reduce buyer risk**
Enterprise procurement moves slowly when risk is high. Offer time-boxed pilots (30–90 days) with defined success criteria agreed upfront. Include a mutual exit clause. Price the pilot to be budget-friendly enough for a department head to approve without a full procurement cycle. Conversion from pilot to contract is your primary KPI in year one — not new logos.

---

## Example 2 — Research/publication strategy

**Raw input:**
```
What's the best strategy for getting academic research published and noticed in the AI field as an independent researcher without institutional affiliation?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 27 tokens → proceed |
| Classification | "strategy", "best" → **Strategic** with Decision secondary |
| Complexity flag | 2 signals → `flag_complex = TRUE` |
| Strip | Removed: "What's the" |
| Logic gate | Tension preserved — no single answer forced |
| Format | Strategic + Decision blend, 3 sections |

**Pipeline output:**
```
COMPRESSED PROMPT: Strategy for independent AI researcher to publish and gain visibility without institutional affiliation?
TYPE: Strategic (complex)
```

**Sample response (3 sections):**

**1. Establish credibility through open channels first**
Without an institutional name, the work itself must speak loudly. Post preprints to arXiv immediately — this timestamps your contribution and makes it citable before peer review. Pair every paper with a GitHub repository. Reviewers and readers will check; an empty or absent repo signals incomplete work. Build a public record of releases, each building on the last.

**2. Target the right venues strategically**
Top-tier venues (NeurIPS, ICML, ICLR) favour institutional submissions partly due to review network effects. Independent researchers have better success at: (a) workshop tracks at major conferences — lower barrier, high visibility to the right audience; (b) mid-tier but respected venues like EMNLP, COLING, or ACL Findings; (c) journals like TACL or TMLR which use rolling review rather than competitive cycles. TMLR in particular was designed with accessibility and rigour in mind and is a strong first target.

**3. Build public presence alongside publication**
Visibility in AI does not come from papers alone. A well-written Twitter/X thread explaining your paper on release day routinely reaches more people than the paper itself. Write one accessible article per paper (Towards Data Science or your own Substack). Engage with others' work publicly — thoughtful comments on papers and threads build recognition within the community. The goal is to be known as a contributor before you're known as an author.

---

## Example 3 — Concise personal strategy

**Raw input:**
```
Plan for learning machine learning from scratch in 6 months while working full time
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 16 tokens → proceed |
| Classification | "plan", "strategy" → **Strategic** (confidence: 0.92) |
| Strip | Nothing meaningful to remove |
| Format | Max 3 sections |

**Pipeline output:**
```
COMPRESSED PROMPT: 6-month ML learning plan while working full time?
TYPE: Strategic
ASSUMED: Starting from programming basics, not complete beginner to computers
```

**Sample response (3 sections):**

**1. Months 1–2 — Foundations**
Prioritise Python fluency and maths fundamentals in parallel. Work through fast.ai's Practical Deep Learning (top-down, gets you running models immediately) alongside 3Blue1Brown's Essence of Linear Algebra and Calculus series (bottom-up intuition). Limit to 1 hour per weekday and 3 hours per weekend — consistency beats intensity over 6 months. Do not attempt to cover everything; cover the core deeply.

**2. Months 3–4 — Applied practice**
Transition from tutorials to building. Complete 3–4 Kaggle competitions (start with Getting Started tracks). Rebuild at least one paper from scratch — choose something foundational like a basic CNN or logistic regression. Start a public GitHub repository from day one. Applied work reveals gaps that reading cannot.

**3. Months 5–6 — Specialise and produce**
Pick one domain that intersects with your existing work or interests (NLP, computer vision, tabular data) and go deeper. Build one project that solves a real problem you actually have. Write one article explaining something you learned. The article forces synthesis; the project proves applied understanding. Both are more valuable to a future employer or collaborator than any certificate.
