# PTOF Providers

Provider adapters connect PTOF to LLM inference systems.

## Rule

Providers consume optimized PTOF prompts.
Providers must not modify core optimization logic.

## Planned Providers

### Cloud
- OpenAI
- Claude
- Gemini
- DeepSeek

### Local
- Ollama

## Future Direction

- provider routing
- fallback orchestration
- latency-aware routing
- cost-aware routing
- local/private inference