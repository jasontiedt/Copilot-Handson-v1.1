# Hints — Module 10 (Azure DevOps MCP)

Open these only when stuck. Each section nudges progressively.

## Setup

- The MCP **Output** channel is the source of truth. If `azure-devops` shows `disconnected`, 95% of the time it's: (a) wrong org slug, (b) expired PAT, (c) PAT missing **Work Items** *write* or **Code** *read & write*.
- The org slug is the bit after `dev.azure.com/` — not the full URL.
- Never paste your PAT into a file. The `${input:ado_pat}` prompt is your friend; VS Code caches it per session only.
- If `npx -y @azure-devops/mcp` fails to resolve, check the official server's repo for the correct package name and update `args` — the exercise text is intentionally tool-agnostic.

## Tool discovery

- The MCP server name (`azure-devops`) is what you reference in `#` picker / agent commands — not the package name.
- If the agent insists on calling REST URLs directly, you forgot to add the server to `.vscode/mcp.json` *or* you have it in the user-level config and a stale workspace override.

## WIQL

- WIQL is SQL-ish but not SQL. Common gotcha: use `[System.AssignedTo] = @Me` (with brackets and `@Me`), not `= 'me'`.
- For "unassigned": `[System.AssignedTo] = ''` works in most ADO orgs. Some require `[System.AssignedTo] EVER NULL` — try both.

## Triage prompt

- Mirror the structure of `.github/prompts/issue-triage.prompt.md`. Keep the **output contract** (a single Markdown comment with sections) identical so reviewers can scan GitHub and ADO triage output the same way.
- Always end the prompt with: *"Do not call any write tool until the user explicitly approves the draft."* The default ADO MCP server is happy to comment without asking.

## PR review

- ADO PR comments are **threaded** — each `[blocking]`/`[nit]` should be one thread anchored to a file + line, not one big top-level comment.
- The diff endpoint can be large. Tell the agent to fetch only the files in the PR's iteration (`$top`/file filter) before reasoning, or it will hit token limits.
- For path-scoped instructions to take effect, the `.github/instructions/*.instructions.md` files must be present on the **branch under review**, not just on `main`. ADO uses the PR source branch for Copilot context.

## Boards / sprint

- Iteration paths are hierarchical: `<Project>\<Team>\Sprint N`. If the agent can't find iteration items, it's almost always pointing at the project root instead of the team path.
- "Blocked" detection is heuristic — agree on **one** convention (tag `blocked` vs. comment keyword) before running Exercise 9, or the agent will mix both.

## Hand-off to Copilot

- Tasks the agent does well on: < 200 LOC, single layer, existing test pattern. Bugs that need a repro test are ideal — Module 04's TDD muscles transfer directly.
- Tasks it does poorly on: cross-cutting refactors, naming/design debates, performance "make it faster" asks. Break those down by hand first, then hand off the smallest piece.
- If the agent attempts `--force` or wants to complete the PR (`autoComplete: true`), **reject every time**. Those are not reversible in ADO without admin help.

## Secrets / safety

- A PAT in a `git diff` is treated as a credential leak — ADO will revoke it within minutes. If you accidentally paste one, revoke it in Org Settings → PATs immediately and mint a new one.
- The MCP filesystem server (from Module 08) is scoped to `./scratch/`. Keep ADO PATs and any exported work-item data **out** of that folder if you ever plan to share the workspace.
