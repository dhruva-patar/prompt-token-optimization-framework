import sys
import re

ACRONYMS = {
    "ai": "AI",
    "api": "API",
    "apis": "APIs",
    "llm": "LLM",
    "llms": "LLMs",
    "nlp": "NLP",
    "jwt": "JWT",
    "rest": "REST",
    "graphql": "GraphQL",
    "kubernetes": "Kubernetes",
    "docker": "Docker",
    "python": "Python",
    "node.js": "Node.js",
    "saas": "SaaS",
    "pytorch": "PyTorch",
    "tensorflow": "TensorFlow",
    "redis": "Redis",
}

FILLER_PHRASES = [
    "i was wondering if you could please",
    "i was wondering if you could",
    "can you please",
    "could you please",
    "can you",
    "could you",
    "please",
    "help me understand",
    "explain to me",
    "i want to know",
    "i was wondering",
    "actually",
]


def word_count(prompt: str) -> int:
    return len(prompt.split())


def normalize_terms(text: str) -> str:
    words = text.split()
    normalized = []

    for word in words:
        clean = word.strip(".,?!:;")
        punctuation = word[len(clean):] if len(clean) < len(word) else ""

        replacement = ACRONYMS.get(clean.lower(), clean)
        normalized.append(replacement + punctuation)

    return " ".join(normalized)


def classify_prompt(prompt: str) -> str:
    text = prompt.lower()

    if any(word in text for word in ["analyse", "analyze", "evaluate", "assess"]):
        return "Analytical"

    if any(word in text for word in ["how do i", "how to", "steps", "implement", "fix", "setup", "set up"]):
        return "Technical"

    if any(word in text for word in ["compare", " vs ", " versus ", "difference"]):
        return "Comparative"

    if any(word in text for word in ["best", "recommend", "should i"]):
        return "Decision"

    if any(word in text for word in ["strategy", "roadmap", "plan"]):
        return "Strategic"

    if any(word in text for word in ["write", "create", "generate"]):
        return "Creative"

    if any(word in text for word in ["explain", "what is", "why", "meaning"]):
        return "Informational"

    return "Informational"


def has_analysis_data(prompt: str) -> bool:
    text = prompt.lower()

    data_signals = [
        "%", "accuracy", "f1", "precision", "recall",
        "conversion", "retention", "drop-off", "dropoff",
        "revenue", "cost", "latency", "ms", "nps",
        "users", "sessions", "transactions", "metrics",
        "csv", "file", "data", "results"
    ]

    return any(signal in text for signal in data_signals)


def strip_filler(prompt: str) -> str:
    text = prompt.lower().strip()

    for phrase in FILLER_PHRASES:
        text = text.replace(phrase, "")

    text = " ".join(text.split())
    return text


def compress_prompt(prompt: str, task_type: str) -> str:
    text = strip_filler(prompt).rstrip("?!.").strip()

    # Informational rewrites
    if task_type == "Informational":
        if text.startswith("explain what ") and text.endswith(" is"):
            topic = text.removeprefix("explain what ").removesuffix(" is").strip()
            text = f"what is {topic}"

        elif text.startswith("what ") and text.endswith(" is"):
            topic = text.removeprefix("what ").removesuffix(" is").strip()
            text = f"what is {topic}"

        elif text.startswith("what ") and text.endswith(" means"):
            topic = text.removeprefix("what ").removesuffix(" means").strip()
            text = f"what is {topic}"

        elif text.endswith(" meaning"):
            topic = text.removesuffix(" meaning").strip()
            text = f"what is {topic}"

        elif "what do you mean by" in text:
            topic = text.replace("what do you mean by", "").strip()
            text = f"what is {topic}"

        elif text.startswith("explain what") and text.endswith("means"):
            topic = text.replace("explain what", "", 1).removesuffix("means").strip()
            text = f"what is {topic}"

        elif text.startswith("what") and text.endswith("are"):
            topic = text.removeprefix("what").removesuffix("are").strip()
            text = f"what are {topic}"

        elif text.startswith("explain why"):
            text = text.replace("explain ", "", 1).strip()

        elif text.startswith("explain"):
            topic = text.replace("explain", "", 1).strip()
            text = f"what is {topic}"

    # Technical rewrites
    elif task_type == "Technical":
        if text.startswith("steps to"):
            text = text.replace("steps to", "", 1).strip()
            text = f"{text} — steps"

        elif text.startswith("how do i"):
            text = text.replace("how do i", "", 1).strip()
        elif text.startswith("how to"):
            text = text.replace("how to", "", 1).strip()

        text = text.rstrip("?!.")
        if not text.endswith("steps"):
            text = f"{text} — steps"

    # Comparative rewrites
    elif task_type == "Comparative":
        text = text.replace("what is the difference between", "").strip()
        text = text.replace("what's the difference between", "").strip()
        text = text.replace("difference between", "").strip()
        text = text.replace("compare ", "", 1).strip() if text.startswith("compare ") else text

        has_recommendation = "recommend" in text

        if has_recommendation:
            text = (
                text.replace("and recommend one", "")
                    .replace("recommend one", "")
                    .replace("and recommend which to use", "")
                    .replace("recommend which to use", "")
                    .strip()
            )

        if " and " in text:
            text = text.replace(" and ", " vs ")

        if has_recommendation:
            text = f"{text} — differences and recommendation"

        elif " vs " in text:
            text = f"{text} — key differences"

        elif not text.startswith("compare"):
            text = f"compare {text}"

    # Strategic priority fix
    elif task_type == "Strategic":
        if text.startswith("create a strategy"):
            text = text.replace("create a", "", 1).strip()

    text = normalize_terms(text)

    if text:
        text = text[0].upper() + text[1:]

    if text and text[-1] not in ".?!":
        text += "?"

    return text


def main():
    if len(sys.argv) < 2:
        print('Usage: python ptof.py "your prompt here"')
        return

    user_prompt = " ".join(sys.argv[1:])
    task_type = classify_prompt(user_prompt)

    # Analytical guardrail should run before short-prompt bypass
    if task_type == "Analytical" and not has_analysis_data(user_prompt):
        print("CLARIFY: Please share the data, file, or metrics to analyse.")
        return

    # Short prompt bypass, but still classify correctly
    if word_count(user_prompt) < 5:
        clean_prompt = normalize_terms(user_prompt.lower())
        clean_prompt = clean_prompt[0].upper() + clean_prompt[1:] if clean_prompt else clean_prompt
        print(f"COMPRESSED PROMPT: {clean_prompt}")
        print(f"TYPE: {task_type}")
        print("NOTE: Short prompt — no optimization applied")
        return

    compressed_prompt = compress_prompt(user_prompt, task_type)

    print(f"COMPRESSED PROMPT: {compressed_prompt}")
    print(f"TYPE: {task_type}")


if __name__ == "__main__":
    main()