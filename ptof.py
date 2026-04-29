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
    text = prompt.lower().strip()

    # remove filler phrases
    for phrase in FILLER_PHRASES:
        text = text.replace(phrase, "")

    text = " ".join(text.split())

    # fix common patterns
    if "what" in text and "is" in text:
        # ensure "what is X" structure
        parts = text.split("what")
        if len(parts) > 1:
            text = "what is " + parts[1].replace("is", "").strip()

    # capitalize first letter
    text = text.strip()
    if text:
        text = text[0].upper() + text[1:]

    # ensure question mark
    if text and text[-1] not in "?":
        text += "?"

    return text

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

def main():
    if len(sys.argv) < 2:
        print('Usage: python ptof.py "your prompt here"')
        return

    user_prompt = " ".join(sys.argv[1:])

    word_count = len(user_prompt.split())

    if word_count < 5:
        clean_prompt = user_prompt.lower().capitalize()

        # fix common acronyms
        acronyms = ["ai", "api", "llm", "nlp"]
        for a in acronyms:
            clean_prompt = clean_prompt.replace(a, a.upper())

        print(f"COMPRESSED PROMPT: {clean_prompt}")
        print("TYPE: Informational")
        print("NOTE: Short prompt — no optimization applied")
        return 

    task_type = classify_prompt(user_prompt)

    if task_type == "Analytical" and not has_analysis_data(user_prompt):
        print("CLARIFY: Please share the data, file, or metrics to analyse.")
        return

    compressed_prompt = compress_prompt(user_prompt)

    print(f"COMPRESSED PROMPT: {compressed_prompt}")
    print(f"TYPE: {task_type}")


if __name__ == "__main__":
    main()