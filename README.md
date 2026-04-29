# LLM Prompt Compression Agent (PTOF)

A deterministic prompt optimization framework that improves LLM response quality, reduces token usage, and enforces structured reasoning — without fine-tuning or additional infrastructure.

---

## 🚀 What it does

PTOF acts as a preprocessing layer between user input and an LLM:

* Classifies prompt intent
* Removes filler and noise
* Preserves logic and constraints
* Applies structured output formats
* Produces optimized prompts for better responses

---

## 🧠 Why this matters

Most LLM problems are not model problems — they are input problems.

PTOF helps solve:

* ❌ Token waste → ✅ Lower cost
* ❌ Unstructured prompts → ✅ Clear intent
* ❌ Inconsistent responses → ✅ Standardized outputs
* ❌ Hallucination risk → ✅ Analytical safety checks

---

## ⚙️ How it works

The pipeline runs in 5 steps:

1. Token Threshold Check
2. Intent Classification
3. Filler Stripping
4. Logic Gate (for complex prompts)
5. Adaptive Output Formatting

👉 Full breakdown: `docs/architecture.md`

---

## 👤 Who is this for

- Product teams building AI features
- Developers working with LLM APIs
- Prompt engineers optimizing outputs
- Startups trying to reduce token costs
- Anyone building chatbots or copilots

---

## 🔍 Before vs After

**Before (33 tokens):**
Can you please help me understand what the difference between supervised and unsupervised learning is?

**After (14 tokens):**
Supervised vs unsupervised learning — key differences?

**Result:**
~58% fewer tokens + clearer intent + better output quality

---

## 📁 Project Structure

pipeline/ → core optimization logic
examples/ → real-world prompt transformations
docs/ → system architecture

---

## 💡 Use Cases

* AI product input standardization
* Prompt cost optimization
* Chatbot consistency improvements
* LLM middleware systems
* Prompt engineering workflows

---

## 📈 Impact

- Up to ~50–60% token reduction
- More structured LLM outputs
- Reduced hallucination in analytical tasks
- Faster response parsing for downstream systems

---

## ⚡ Quick Start

### Step 1 — Setup

1. Open: `pipeline/optimization_framework.md`
2. Copy the content
3. Paste it into your system prompt

---

### Step 2 — Use it

Send any normal prompt:

```
Can you please explain what overfitting is?
```

---

### Step 3 — Output

The pipeline transforms it into:

```
What is overfitting?
```

---

### Result

* Reduced tokens
* Clearer intent
* More structured LLM responses


---

## 📊 Examples

See `/examples` folder for:

* Analytical prompts (data-driven)
* Comparative prompts
* Decision-making prompts
* Creative prompts
* Strategic prompts
* Technical prompts

---

## 📌 Status

v0.1.0 — Initial release
Evaluation benchmarks in progress

---

## 📜 License

MIT
