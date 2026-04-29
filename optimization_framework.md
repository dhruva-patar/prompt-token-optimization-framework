START
INPUT: user_prompt

-------------------------------------------------
PRE-CHECK — TOKEN THRESHOLD
-------------------------------------------------
IF token_count(user_prompt) < 15
  → skip Steps 1, 2, 3
  → go directly to STEP 4 using Informational default
  → flag: "short_prompt = TRUE"

-------------------------------------------------
STEP 1 — CLASSIFY (cheap, fast)
-------------------------------------------------
Match prompt to ONE primary type using strongest signal:

  "explain / what is / why"         → Informational
  "best / recommend / should I"     → Decision
  "compare / vs / difference"       → Comparative
  "write / create / generate"       → Creative
  "plan / strategy / roadmap"       → Strategic
  "how to / steps / implement"      → Technical
  "analyse / evaluate / assess"     → Analytical

IF no clear signal → Informational (default)

IF keyword match confidence > 0.9
  → flag_complex = FALSE          // confidence bypass
  → skip flag_complex evaluation
ELSE IF 2+ signals equally strong
  → flag_complex = TRUE

-------------------------------------------------
STEP 1B — ANALYTICAL DATA CHECK
-------------------------------------------------
IF task_type == "Analytical"
  AND no data / file / metrics present in prompt
    → STOP
    → PRINT "CLARIFY: Please share the data, file, or metrics to analyse."
    → do not proceed until data is provided

-------------------------------------------------
STEP 2 — STRIP (reduce input tokens)
-------------------------------------------------
Remove: "please", "could you", "I want to know",
        "I was wondering", "can you help me"

Preserve: negations, conditionals, quantities,
          urgency markers, scope limiters

IF TASK unclear after stripping
  → skip to STEP 5, ask before compressing

-------------------------------------------------
STEP 3 — LOGIC GATE (only if needed)
-------------------------------------------------
IF flag_complex = FALSE
  → skip this step entirely

ELSE run:
  IF trade-offs present → preserve tension, do not resolve
  IF conditionals present (IF X → Y) → keep exact structure
  IF ranking requested → allow it + add one-line trade-off note
  IF open-ended → do not force single answer

-------------------------------------------------
STEP 4 — ADAPTIVE OUTPUT FORMAT
-------------------------------------------------
IF user specified format → follow it, skip defaults

Defaults (hard caps to control output tokens):
  Informational  → max 7 bullets
  Decision       → max 3 options + 1 trade-off line each
  Comparative    → 2-column max, max 5 rows
  Creative       → 2 variants only
  Strategic      → max 3 sections
  Technical      → numbered steps, no elaboration unless asked
  Analytical     → max 3 findings + 1 impact line each

IF flag_complex = TRUE
  → blend top 2 format types, still apply caps

-------------------------------------------------
STEP 5 — OUTPUT (minimal structure)
-------------------------------------------------
PRINT "COMPRESSED PROMPT:" → rewritten prompt

PRINT "TYPE:" → single label (+ "complex" if flagged)

IF short_prompt = TRUE → PRINT "NOTE: Short prompt — Steps 1-3 bypassed"
IF assumption was made → PRINT "ASSUMED: <what>"
IF critical info missing → PRINT "CLARIFY: <max 1 question>"
IF nothing assumed, nothing missing → print nothing

-------------------------------------------------
COMPRESSION RULE
-------------------------------------------------
  Fewer tokens > elegant phrasing
  IF meaning lost → do not compress that element
  IF prompt is already optimal → return as-is, no rewrite

END
