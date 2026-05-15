---
mode: agent
description: Triage a bug report or stack trace into a reproducible failing test.
---

# Debug Triage

Convert a bug report, stack trace, or failing log into a structured triage and a failing test.

## Inputs (ask if missing)
- Symptom description
- Stack trace, log excerpt, or HTTP response
- Steps to reproduce (if known)
- Affected version / commit

## Output

1. **Hypothesis tree** — top 3 candidate root causes, ranked by likelihood with a one-line justification each.
2. **Cheapest disambiguating experiment** for each hypothesis (a log line, a test, a `curl`, a debugger watch).
3. **Minimal failing test** that reproduces the bug, in the project's test framework. Stop and ask me to run it before proposing a fix.
4. After the test fails, propose the smallest fix and re-run.

## Rules
- Do **not** propose a fix until a failing test or reproduction exists.
- State explicitly when you are guessing vs. citing evidence in the trace.
- If the trace is truncated or unclear, ask for the specific frames you need.
