---
mode: agent
description: Automate a structured PR review using repo conventions and the GitHub MCP server.
---

# PR Review Automation

Review a pull request end-to-end.

## Inputs (ask if missing)
- PR URL or `owner/repo#number`
- Any reviewer focus (e.g., "security only", "API contract", "performance")

## Procedure
1. Use the GitHub MCP tools (or `gh` CLI) to fetch the PR metadata, diff, linked issues, and CI status.
2. Load `.github/copilot-instructions.md` and any matching `.instructions.md` files for the changed paths.
3. Produce a review using the sections in `code-review.prompt.md` plus:
   - **CI signal summary** (which checks failed and the relevant log line).
   - **Linked issue alignment** — does the diff actually solve the linked issue?
   - **Risk rating** — Low / Medium / High with one-sentence justification.
4. Draft inline review comments as a JSON array: `[{path, line, body}]`.
5. Stop and ask before posting anything to GitHub.

## Rules
- Quote diff lines verbatim when commenting; never paraphrase a change being criticized.
- Distinguish blocking from non-blocking with a `[blocking]` / `[nit]` prefix on each comment.
- If you would request changes, write the summary comment in a respectful, action-oriented tone.
