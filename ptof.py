import sys

FILLER_PHRASES = [
    "can you please",
    "could you please",
    "could you",
    "please",
    "help me understand",
    "explain to me",
    "i want to know",
    "i was wondering",
]


def classify_prompt(prompt: str) -> str:
    text = prompt.lower()

    if any(word in text for word in ["analyse", "analyze", "evaluate", "assess"]):
        return "Analytical"
    if any(word in text for word in ["compare", " vs ", "difference"]):
        return "Comparative"
    if any(word in text for word in ["best", "recommend", "should i"]):
        return "Decision"
    if any(word in text for word in ["write", "create", "generate"]):
        return "Creative"
    if any(word in text for word in ["plan", "strategy", "roadmap"]):
        return "Strategic"
    if any(word in text for word in ["how to", "steps", "implement"]):
        return "Technical"
    if any(word in text for word in ["explain", "what is", "why"]):
        return "Informational"

    return "Informational"


def compress_prompt(prompt: str) -> str:
    compressed = prompt.strip()

    for phrase in FILLER_PHRASES:
        compressed = compressed.replace(phrase, "")
        compressed = compressed.replace(phrase.capitalize(), "")

    compressed = " ".join(compressed.split())

    if compressed and compressed[-1] not in ".?!":
        compressed += "?"

    compressed = compressed[0].upper() + compressed[1:] if compressed else prompt

    return compressed


def main():
    if len(sys.argv) < 2:
        print('Usage: python ptof.py "your prompt here"')
        return

    user_prompt = " ".join(sys.argv[1:])
    task_type = classify_prompt(user_prompt)
    compressed_prompt = compress_prompt(user_prompt)

    print(f"COMPRESSED PROMPT: {compressed_prompt}")
    print(f"TYPE: {task_type}")


if __name__ == "__main__":
    main()