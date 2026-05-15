---
mode: agent
description: Triage a GitHub issue: classify, label, estimate, and propose next steps.
---

# Issue Triage

Triage one or more GitHub issues.

## Inputs (ask if missing)
- Issue URL(s) or `owner/repo#number`
- Repo's labeling conventions if not in `.github/`

## Procedure
1. Fetch the issue, its comments, and any linked issues/PRs via the GitHub MCP server or `gh` CLI.
2. Classify: `bug` / `feature` / `chore` / `question` / `docs` / `security`.
3. Assess: severity, area/owner, rough size (XS/S/M/L/XL), reproducibility, missing info.
4. Propose:
   - Labels to add / remove
   - A title rewrite if the current one is unclear
   - A "Definition of Done" checklist
   - Suggested assignee or team based on `CODEOWNERS`
5. Output a **single Markdown comment** ready to post on the issue.
6. Stop and ask before posting or editing anything on GitHub.

## Rules
- Never close an issue automatically.
- If the issue lacks a reproduction, propose the exact questions to ask the reporter.
