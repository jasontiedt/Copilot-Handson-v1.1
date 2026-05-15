---
mode: agent
description: Add high-signal inline comments to the selected code without restating the obvious.
---

# Inline Comments

Add inline comments to the selected code.

## Rules
- Comment **why**, not **what**. The code already says what.
- Flag invariants, gotchas, performance considerations, and references to specs/tickets.
- Mark non-obvious thread-safety or ordering assumptions.
- Use `// TODO:`, `// FIXME:`, `// SAFETY:`, `// PERF:` markers consistently.
- Delete or rewrite any comment that merely repeats the next line of code.
- Keep comments under 100 chars per line.
