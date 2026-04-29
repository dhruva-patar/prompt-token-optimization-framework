# Example: Informational

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Basic concept explanation

**Raw input:**
```
Could you please explain to me what transformer attention actually does in a language model?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 17 tokens → proceed |
| Classification | "explain", "what" → **Informational** (confidence: 0.97) |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "Could you please", "to me", "actually" |
| Logic gate | Skipped (flag_complex = FALSE) |
| Format | Max 7 bullets |

**Pipeline output:**
```
COMPRESSED PROMPT: What does transformer attention do in a language model?
TYPE: Informational
```

**Sample response (formatted output):**
- Attention lets each token "look at" every other token in the sequence
- A query, key, and value vector is computed per token
- Dot products between queries and keys produce attention scores
- Scores are softmax-normalised into weights (0–1)
- Each token's output is a weighted sum of all value vectors
- Multi-head attention runs this process in parallel across multiple subspaces
- Result: context-aware token representations used by downstream layers

---

## Example 2 — Short prompt bypass

**Raw input:**
```
what is overfitting
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 3 tokens → **bypass Steps 1–3** |
| Format | Informational default (max 7 bullets) |

**Pipeline output:**
```
COMPRESSED PROMPT: What is overfitting?
TYPE: Informational
NOTE: Short prompt — Steps 1–3 bypassed
```

**Sample response (formatted output):**
- Overfitting occurs when a model learns training data too precisely, including its noise
- The model performs well on training data but poorly on unseen data
- Caused by excessive model complexity relative to training data size
- Common signs: very low training loss, high validation loss
- Mitigations include regularisation (L1/L2), dropout, and early stopping
- Cross-validation helps detect overfitting during development
- More training data is the most reliable long-term fix

---

## Example 3 — Filler-heavy prompt

**Raw input:**
```
I was wondering if you could help me understand why neural networks need activation functions at all — like what would happen if you just didn't use them?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 35 tokens → proceed |
| Classification | "why", "understand" → **Informational** (confidence: 0.95) |
| Strip | Removed: "I was wondering if you could help me", "like" |
| Preserved | Conditional: "what would happen if" |

**Pipeline output:**
```
COMPRESSED PROMPT: Why do neural networks need activation functions? What happens without them?
TYPE: Informational
```

**Sample response (formatted output):**
- Without activation functions, each layer performs only a linear transformation
- Stacking linear layers is mathematically equivalent to a single linear layer
- The network loses its ability to approximate non-linear functions
- Activation functions introduce non-linearity, enabling complex decision boundaries
- Common activations: ReLU, sigmoid, tanh, GELU
- ReLU is preferred in deep networks for sparsity and gradient stability
- Universal approximation theorem requires non-linearity to hold
