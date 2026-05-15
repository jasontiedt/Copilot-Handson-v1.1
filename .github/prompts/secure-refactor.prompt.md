---
mode: agent
description: Refactor the selected code to apply secure-coding patterns without changing behavior.
---

# Secure Refactor

Refactor the selected code to remove a specific class of vulnerability while preserving behavior.

## Inputs (ask if missing)
- The vulnerability class to address (e.g., SQL injection, path traversal, weak crypto).
- Any framework constraints (Spring Security version, ASP.NET Core auth scheme, etc.).

## Procedure
1. Restate the vulnerability and the **secure pattern** you will apply, with one authoritative reference (OWASP / framework docs).
2. Show a **before/after diff** limited to the necessary changes.
3. Note any **behavioral risk** the change could introduce (perf, error semantics, API shape).
4. Propose **tests** that would fail on the vulnerable version and pass on the refactored version.
5. List **follow-ups** out of scope for this change.

## Rules
- Use parameterized queries, framework-provided escaping, allow-lists, and well-vetted crypto primitives.
- Never roll your own crypto. Never disable certificate validation.
- If the secure pattern requires a new dependency, justify it and prefer first-party / standard-library options.
