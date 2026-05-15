---
mode: agent
description: Generate or update API/class/method documentation in the project's house style.
---

# Documentation Generator

Generate or update documentation for the selected symbol or file.

## Output rules

- **Java:** Javadoc on public types and methods. Include `@param`, `@return`, `@throws`, and `@since`.
- **.NET (C#):** XML doc comments (`<summary>`, `<param>`, `<returns>`, `<exception>`, `<example>`).
- **READMEs:** H1 title, one-paragraph purpose, "Quick start", "Configuration", "Examples", "Troubleshooting", "Contributing".
- **ADRs:** use the MADR format — Context, Decision, Status, Consequences.

## Constraints
- Describe **behavior and contracts**, not implementation.
- Document side effects, threading model, idempotency, and error semantics explicitly.
- Use complete sentences, present tense, second person where natural.
- Include at least one **runnable example** for each public API.
- Never document private members unless asked.
