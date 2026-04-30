# Contributing to PTOF

Thank you for your interest in contributing to the Prompt Token Optimization Framework.  
PTOF is an open research project and all contributions — big or small — are welcome.

**Author and maintainer:** Dhruva Patar  
**Repository:** https://github.com/dhruva-patar/prompt-token-optimization-framework

---

## Ways to contribute

### 1. Submit new prompt examples
The most valuable contribution right now is real-world prompt examples that demonstrate
the pipeline running across diverse inputs. Good examples are:
- Drawn from real tasks (not synthetic or trivial)
- Clearly formatted following the template in `/examples/informational.md`
- Covering edge cases the existing examples don't address (ambiguity, mixed signals, very long prompts)

### 2. Report issues or edge cases
If you run the pipeline on a prompt and the output is wrong, inconsistent, or unexpected —
open an issue. Label it with the relevant type tag (see below). Include:
- The raw input prompt
- What the pipeline produced
- What you expected it to produce
- Why you think the output is incorrect

### 3. Suggest pipeline improvements
If you have a proposed change to the algorithm logic itself, open an issue first before
submitting a PR. Pipeline changes affect all downstream behaviour and need discussion
before implementation.

### 4. Improve documentation
Typos, unclear wording, missing explanations, broken links — all fair game.
For small fixes, a PR directly is fine.

### 5. Benchmark contributions
We are building a benchmark dataset of 100+ prompts to quantitatively evaluate PTOF.
If you would like to contribute labelled prompts to the benchmark set, open an issue
tagged `benchmark` and we will coordinate.

---

## Issue labels

Use these labels when opening issues:

| Label | Use for |
|-------|---------|
| `bug` | Pipeline produces incorrect or unexpected output |
| `example` | Submitting or requesting a new example |
| `benchmark` | Benchmark dataset contributions or methodology |
| `enhancement` | Proposed improvement to pipeline logic |
| `documentation` | README, docs, or comment improvements |
| `good first issue` | Suitable for first-time contributors |
| `discussion` | Open questions about design decisions |

---

## Submitting a pull request

1. Fork the repository
2. Create a branch: `git checkout -b your-branch-name`
3. Make your changes
4. Commit with a clear message: `git commit -m "add: comparative example for API design"`
5. Push to your fork: `git push origin your-branch-name`
6. Open a pull request against `main`

**PR title format:**
- `add: [what you added]`
- `fix: [what you fixed]`
- `docs: [what you documented]`
- `refactor: [what you changed without adding features]`

---

## Example contribution template

If you are adding a new example file or example within an existing file, follow this structure:

```markdown
## Example N — [short description]

**Raw input:**
[the original prompt, unmodified]

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | N tokens → proceed / bypass |
| Classification | "[signal word]" → **Type** (confidence: 0.XX) |
| Complexity flag | [Single signal / 2 signals] → flag_complex = TRUE/FALSE |
| Strip | Removed: "[what was removed]" / Preserved: "[what was kept]" |
| Logic gate | Skipped / [what it did] |
| Format | [format rule applied] |

**Pipeline output:**
[the COMPRESSED PROMPT and TYPE line, plus any ASSUMED/CLARIFY lines]

**Sample response (formatted output):**
[a realistic model response formatted according to PTOF output rules]
```

---

## Code of conduct

This project follows a simple standard: be direct, be constructive, and be respectful.
Feedback on the work is always welcome. Personal criticism of contributors is not.

---

## Questions?

Open a GitHub issue tagged `discussion` or reach out via the repository contact page.
