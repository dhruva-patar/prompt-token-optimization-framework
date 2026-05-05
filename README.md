# Prompt Token Optimization Framework (PTOF)

A deterministic preprocessing framework that optimizes prompts before sending them to an LLM.

PTOF is not a prompt generator.  
It is a prompt optimizer.

---

## 🚀 Why PTOF?

Most LLM issues are not model problems — they are input problems.

PTOF improves:

- clarity
- structure
- token efficiency
- predictability

before inference happens.

---

## 🧠 Core Idea

PTOF acts as a **preprocessing layer** between user input and an LLM.

```text
Raw Prompt → PTOF → Optimized Prompt → LLM
```

It ensures:

```text
clean input → controlled output → better results
```

---

## ⚙️ How It Works

PTOF follows a deterministic pipeline:

```text
Pre-check → Classify → Analytical Check → Strip → Logic Gate → Format → Output
```

### Key Steps

- **Pre-check**  
  Skips heavy processing for short prompts (<15 tokens)

- **Classification**  
  Assigns a single task type (Informational, Decision, etc.)

- **Analytical Check**  
  Stops execution if required data is missing

- **Strip**  
  Removes conversational filler

- **Logic Gate**  
  Preserves conditionals, trade-offs, and structure

- **Adaptive Format**  
  Adds strict output constraints

---

## 📦 Output Example

**Input**
```text
Can you please explain what prompt engineering is?
```

**Output**
```text
Explain what prompt engineering is. Use max 7 bullets.
```

**Type**
```text
Informational
```

---

## 🛠️ CLI Usage

Run directly from terminal:

```bash
node cli/ptof-cli.js "Explain OAuth"
```

Example output:

```text
COMPRESSED PROMPT:
Explain OAuth. Use max 7 bullets.

TYPE:
Informational
```

---

## 📁 Project Structure

```text
core/
  optimizer.js        # deterministic engine

cli/
  ptof-cli.js         # CLI interface

pipeline/
  prompt-pipeline.md  # source-of-truth spec

docs/
  architecture.md
  pipeline-explained.md

demo-ui/
  src/lib/ptof.js     # legacy prototype
```

---

## 🧭 Design Principles

PTOF prioritizes:

- deterministic behavior
- token efficiency
- meaning preservation
- bounded outputs
- explainability

PTOF avoids:

- semantic guessing
- over-engineering
- unnecessary rewriting

---

## 📌 Status

Current version:

- Core pipeline implemented
- CLI working
- Documentation aligned
- UI integration pending

---

## 🔮 Roadmap

- Full alignment with pipeline spec
- UI integration with core engine
- Test harness for all prompt types
- Complex prompt handling improvements
- Output optimization layer

---

## 🤝 Contributing

Contributions are welcome once the core framework stabilizes.

---

## 📄 License

MIT
