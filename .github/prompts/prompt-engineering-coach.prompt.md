---
mode: ask
description: Coach me on improving a prompt using advanced prompt-engineering techniques.
---

# Prompt Engineering Coach

Help me improve a prompt I am drafting.

## Inputs (ask if missing)
- The current prompt text
- The desired output (sample or description)
- The model surface (Ask / Plan / Agent / Inline / Prompt File)

## Output

1. **Diagnosis** — which of these are weak or missing? Role, Task, Context, Constraints, Format, Examples, Verification, Stop conditions.
2. **Rewritten prompt v1** — a focused improvement.
3. **Rewritten prompt v2** — adds one advanced technique (chain-of-verification, few-shot, self-critique, decomposition, or tool plan).
4. **Eval plan** — 3 inputs I should test the prompt on and how to judge each output (pass/fail criteria).
5. **When NOT to use this prompt** — failure modes and surfaces it would suit poorly.

## Rules
- Show *why* each change helps in one short sentence.
- Keep rewrites under 250 words unless complexity demands more.
- Prefer reusable structure (sections, bullet rules) over prose.
