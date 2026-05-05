import sys
import re


def estimate_tokens(text: str) -> int:
    if not text or not text.strip():
        return 0
    return round(len(text.strip().split()) * 1.3)


def classify_prompt(prompt: str) -> str:
    text = (prompt or "").lower()

    if re.search(r"\b(analyze|analyse|evaluate|assess)\b", text):
        return "Analytical"

    if re.search(r"\b(best|recommend|should i|decide|choose)\b", text):
        return "Decision"

    if re.search(r"\b(compare|vs|versus|difference)\b", text):
        return "Comparative"

    if re.search(r"\b(write|create|generate)\b", text):
        return "Creative"

    if re.search(r"\b(plan|strategy|roadmap)\b", text):
        return "Strategic"

    if re.search(r"\b(how to|steps|implement|build|debug|code|fix|setup|set up)\b", text):
        return "Technical"

    if re.search(r"\b(explain|what is|why|meaning)\b", text):
        return "Informational"

    return "Informational"


def has_analysis_data(prompt: str) -> bool:
    text = (prompt or "").lower()

    data_signals = [
        "data",
        "dataset",
        "file",
        "metrics",
        "numbers",
        "csv",
        "spreadsheet",
        "report",
        "table",
        "results",
        "%",
        "revenue",
        "conversion",
        "retention",
        "churn rate",
        "sessions",
        "transactions",
    ]

    return any(signal in text for signal in data_signals)


def strip_filler(prompt: str) -> str:
    text = prompt.strip()

    filler_patterns = [
        r"\bplease\b",
        r"\bcould you\b",
        r"\bcan you help me\b",
        r"\bcan you\b",
        r"\bi want to know\b",
        r"\bi was wondering\b",
    ]

    for pattern in filler_patterns:
        text = re.sub(pattern, "", text, flags=re.IGNORECASE)

    return re.sub(r"\s+", " ", text).strip()


def detect_complexity(prompt: str) -> bool:
    patterns = [
        r"\b(compare|vs|versus|trade-off|tradeoff|trade-offs)\b",
        r"\bif\b.+\bthen\b",
        r"\b(choose|decide|rank|prioritize)\b",
        r"\b(but|however|whereas)\b",
    ]

    matches = sum(1 for pattern in patterns if re.search(pattern, prompt, re.IGNORECASE))
    return matches >= 2


def get_default_format(task_type: str) -> str:
    formats = {
        "Informational": "Use max 7 bullets.",
        "Decision": "Give max 3 options with 1 trade-off line each.",
        "Comparative": "Use 2-column comparison, max 5 rows.",
        "Creative": "Give 2 variants only.",
        "Strategic": "Use max 3 sections.",
        "Technical": "Use numbered steps only.",
        "Analytical": "Give max 3 findings with 1 impact line each.",
    }

    return formats.get(task_type, formats["Informational"])


def optimize_prompt(user_prompt: str) -> dict:
    token_count = estimate_tokens(user_prompt)
    short_prompt = token_count < 15

    task_type = classify_prompt(user_prompt)

    # Analytical guardrail always runs, even for short prompts.
    if task_type == "Analytical" and not has_analysis_data(user_prompt):
        return {
            "compressed_prompt": "",
            "type": task_type,
            "complex": False,
            "notes": [],
            "clarify": "Please share the data, file, or metrics to analyse.",
            "short_prompt": short_prompt,
            "token_count": token_count,
        }

    stripped = user_prompt.strip() if short_prompt else strip_filler(user_prompt)
    complex_prompt = False if short_prompt else detect_complexity(stripped)

    clean_stripped = re.sub(r"[?.!]+$", "", stripped).strip()
    format_rule = get_default_format(task_type)

    compressed_prompt = f"{clean_stripped}. {format_rule}"

    notes = []
    if short_prompt:
        notes.append("Short prompt — Steps 2–3 bypassed")

    return {
        "compressed_prompt": compressed_prompt,
        "type": task_type,
        "complex": complex_prompt,
        "notes": notes,
        "clarify": "",
        "short_prompt": short_prompt,
        "token_count": token_count,
    }


def main() -> None:
    if len(sys.argv) < 2:
        print('Usage: python ptof.py "your prompt here"')
        sys.exit(1)

    user_prompt = " ".join(sys.argv[1:])
    result = optimize_prompt(user_prompt)

    if result["clarify"]:
        print(f"CLARIFY: {result['clarify']}")
        return

    print("COMPRESSED PROMPT:")
    print(result["compressed_prompt"])
    print("")
    print("TYPE:")
    print(f"{result['type']}{' complex' if result['complex'] else ''}")

    if result["notes"]:
        print("")
        print("NOTE:")
        for note in result["notes"]:
            print(note)


if __name__ == "__main__":
    main()
