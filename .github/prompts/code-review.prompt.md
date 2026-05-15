---
mode: ask
description: Perform a structured code review of the current change set or selection.
---

# Code Review

Review the supplied diff, file, or selection as a senior reviewer would.

## Output format (use these exact sections)

### Summary
One paragraph: what changed and why it appears to have changed.

### Blocking issues
Bugs, security flaws, data-loss risks, breaking API changes. Each item: file:line, problem, recommended fix.

### Non-blocking suggestions
Readability, naming, structure, tests, performance hints.

### Test coverage
Which new branches lack tests? Propose specific test cases (one line each).

### Questions for the author
Up to 5 clarifying questions you'd leave on the PR.

## Rules
- Cite file paths and line numbers from the diff.
- Do not rewrite the code in full; show focused snippets only.
- Distinguish **opinion** from **defect** explicitly.
- If the diff is too large or context is missing, say so and ask for the specific files you need.
