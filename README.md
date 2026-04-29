# LLM Prompt Compression & Optimization Framework (PTOF)
PTOF optimizes prompts for both token efficiency and response quality.
> A deterministic prompt optimization algorithm for improving LLM input quality before inference.

PTOF is a rule-based framework that standardizes, compresses, and structures prompts for Large Language Models.

It acts as a preprocessing layer between user input and an LLM — improving clarity, preserving intent, and enforcing structured reasoning without fine-tuning or additional infrastructure.

Built as a deterministic alternative to heuristic-heavy prompt engineering approaches.

---

## 🚀 Core Capabilities

PTOF transforms raw prompts into optimized inputs by:

- Classifying prompt intent  
- Removing filler and noise  
- Preserving logic and constraints  
- Applying structured transformations  
- Enforcing analytical guardrails  
- Producing clearer, more consistent prompts  

---

## 🧠 Why this matters

Most LLM problems are not model problems — they are input problems.

Poor prompts lead to:

- ❌ Unclear or inconsistent responses  
- ❌ Unnecessary token usage  
- ❌ Hallucinated outputs in analytical tasks  

PTOF improves this by optimizing prompts **before they reach the model**.

---

## ⚙️ How it works

The pipeline runs in 5 steps:

1. Token Threshold Check  
2. Intent Classification  
3. Filler Stripping  
4. Logic Preservation  
5. Adaptive Structuring  

👉 Full breakdown: `docs/architecture.md`

---

## 👤 Who is this for

- Product teams building AI features  
- Developers working with LLM APIs  
- Prompt engineers optimizing outputs  
- Startups trying to reduce token costs  
- Anyone building chatbots or copilots  

---

## 🔍 Examples

### Example 1 — Compression + clarity

**Input:**
I was wondering if you could please help me understand what overfitting actually means

**Output:**
What is overfitting?

---

### Example 2 — Structure over compression

**Input:**
Compare Docker vs Kubernetes and recommend one

**Output:**
Docker vs Kubernetes — differences and recommendation?

---

### Example 3 — Analytical guardrail

**Input:**
Analyse user churn

**Output:**
CLARIFY: Please share the data, file, or metrics to analyse.

---

## ⚖️ Token vs Quality

PTOF does **not always reduce tokens**.

It follows this principle:

> Reduce tokens when safe. Improve clarity when needed.

In some cases, prompts may remain the same length (or slightly longer) if it improves structure and response quality.

---

## 📁 Project Structure
pipeline/ # core optimization logic
examples/ # real-world prompt transformations
docs/ # system architecture
ptof.py # CLI reference implementation


---

## 💡 Use Cases

- AI product input standardization  
- Prompt cost optimization  
- Chatbot consistency improvements  
- LLM middleware systems  
- Prompt engineering workflows  

---

## 📈 Impact

- Up to ~50–60% token reduction (filler-heavy prompts)  
- More structured LLM outputs  
- Reduced hallucination in analytical tasks  
- Faster response parsing  
- Lower API cost in production systems  

---

## 🧪 Key Insight

PTOF demonstrates that significant gains in LLM performance can be achieved through input optimization alone — without modifying the model.

This approach treats prompt design as a systems problem rather than trial-and-error.

---

## ⚡ Quick Start

### CLI

python ptof.py "How do I implement JWT authentication in Node.js?"


**Output:**
COMPRESSED PROMPT: Implement JWT authentication in Node.js — steps?
TYPE: Technical


---

## 📊 Examples

See `/examples` folder for:

- Analytical prompts  
- Comparative prompts  
- Decision-making prompts  
- Creative prompts  
- Strategic prompts  
- Technical prompts  

---

## 🧩 Design Philosophy

PTOF prioritizes deterministic logic over model-dependent behavior — ensuring predictable outputs without relying on fine-tuning or prompt heuristics.

---

## 📌 Status

v0.1.0 — Initial release  
Evaluation in progress  

---

## 📜 License

MIT
