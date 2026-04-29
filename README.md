# prompt-token-optimization-framework (PTOF)
A deterministic, rule-based prompt classification and compression framework for LLMs

A lightweight, deterministic framework that classifies, strips, and 
reformats LLM prompts before inference — improving output consistency 
and reducing token waste without any model fine-tuning.

## What it does

PTOF intercepts a user prompt and runs it through five stages:
1. **Token threshold check** — skips processing for very short prompts
2. **Intent classification** — maps prompt to one of 7 task types
3. **Filler stripping** — removes noise while preserving meaning
4. **Complexity gate** — handles ambiguous multi-signal prompts
5. **Adaptive formatting** — enforces per-type output structure caps

## Why it's different

Most prompt compression tools are neural models requiring 
fine-tuning or inference overhead. PPPL is a pure rule-based 
meta-prompt — it runs inside any LLM with zero setup.

## Quick start

Copy the contents of `prompt_pipeline.md` into your system prompt, 
then send any user message. The pipeline runs automatically.

## Examples

See the `/examples` folder for before/after demonstrations 
across all 7 prompt types.

## Citation

If you use this in research, please cite using the CITATION.cff file 
or the format below:

[Dhruva Patar] (2026). Prompt Token Optimization Framework (PTOF). 
GitHub. https://github.com/yourusername/prompt-token-optimization-framework

## Status

v0.1.0 — initial release. Evaluation benchmark in progress.

## License

MIT
