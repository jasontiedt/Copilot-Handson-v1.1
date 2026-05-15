# Module 08 — Automation: MCP, PR Review & Issues 🔴

**Time:** 90 minutes · **Difficulty:** Advanced · **Surfaces:** Agent + MCP + GitHub.com + Actions

## What you'll learn

- Configure the **GitHub MCP server** in `.vscode/mcp.json` (already in repo — just supply a PAT)
- Triage real GitHub issues from agent mode with `/issue-triage` and `/issue-to-spec`
- Drive a PR review from VS Code; let a **GitHub Action** post a review summary on every PR
- Hand off a small task to the **Copilot coding agent** on GitHub.com

## Setup (≈3 minutes)

Two commands, one paste:

```bash
gh repo fork --remote --clone        # fork this repo if you haven't
cd Copilot-Handson-v1.1              # your fork's clone
bash scripts/seed-issues.sh          # Windows PowerShell: pwsh scripts/seed-issues.ps1
```

Then reload VS Code. The first time you use `#mcp` or `/issue-triage`, VS Code prompts for a **GitHub PAT** (scope: `repo`). Paste it once; it's cached per session, never written to disk.

What's already wired up — **no copy/paste needed**:

- [`.vscode/mcp.json`](../../.vscode/mcp.json) — GitHub MCP via `npx` (no Docker required)
- [`.github/workflows/copilot-review.yml`](../../.github/workflows/copilot-review.yml) — PR review summary Action
- [`seed-issues/`](../../seed-issues) — four practice issues opened into your fork by the seed script

> **Optional servers** — the same `mcp.json` also wires up filesystem + SQLite servers for the Stretch goals. They run on `npx` too. Skip them unless you do the stretch.

---

## Part A — MCP from agent mode

### Exercise 1 — Connect and inventory (10 min) 🟡

**Try this**

1. Open the **MCP** view in the Activity Bar. The `github` server should show **connected** (it will prompt for the PAT on first use).
2. In agent mode, ask: *"List the tools exposed by the `github` MCP server. Mark each read-only or write."*

**Checkpoint** — you have a written tool list and saw the PAT prompt exactly once.

### Exercise 2 — Triage an issue (15 min) 🟡

**Try this**

1. Agent mode → `/issue-triage` on **issue #1** (`01-low-stock-alert.md` — the well-formed one).
2. Approve the **fetch** call. **Reject** any create-comment call. Edit the draft. Re-approve to post.

**Checkpoint** — issue #1 has a posted triage comment; you rejected at least one tool call along the way.

---

## Part B — PR review

### Exercise 3 — Drive a PR review from VS Code (15 min) 🟡

**Try this**

1. Branch from `main`, make a 3-line change in `sample-app-frontend/PriceBadge.tsx` (e.g., tighten an aria-label), push, `gh pr create --fill`.
2. Agent mode → `/pr-review-automation` with the PR URL.
3. Post 2–3 of the proposed inline comments.

**Checkpoint** — comments cite `file:line` and use `[blocking]`/`[nit]` tags.

### Exercise 4 — Repo-level review rules (10 min) 🟡

**Try this**

1. On the PR from Ex 3, request a review from **Copilot** (the bot, on GitHub.com).
2. Tighten ONE rule in [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md). Push a new commit. Request another Copilot review.
3. Compare the two reviews.

**Checkpoint** — point at one comment whose phrasing was clearly shaped by the tightened rule.

### Exercise 5 — Copilot-review GitHub Action (10 min) 🔴

**Try this**

1. In your fork, enable Actions if prompted (Settings → Actions → *Allow all*).
2. Push any small commit to the PR from Ex 3. A "Copilot Review Summary" comment should appear within a minute.

**Checkpoint** — the bot comment follows the prompt's section structure.

---

## Part C — Issue → coding agent

### Exercise 6 — Issue to spec (10 min) 🟡

**Try this**

- Agent mode → `/issue-to-spec` on **issue #2** (`02-cart-subtotal-flicker.md` — the deliberately vague one). Post the result back as a "Spec (proposed)" comment.

**Checkpoint** — spec has Given/When/Then acceptance criteria and an explicit out-of-scope list.

### Exercise 7 — Hand off to the Copilot coding agent (20 min) 🔴

**Try this**

1. Pick the smallest task from Exercise 6's spec.
2. On GitHub.com, assign the issue to **Copilot**.
3. Watch the draft PR open. Comment once if it drifts. When it's green, run the Ex 3 review prompt on it.

**Checkpoint** — a near-merge draft PR opened by Copilot. Document one nudge you had to give.

---

## Stretch 🔴

- **Path-scoped review** — add `.github/instructions/api-review.instructions.md` (`applyTo: "**/api/**"`) and `test-review.instructions.md` (`applyTo: "**/*Test*.{java,cs}"`). Two PRs; compare review vocabularies.
- **Filesystem + SQLite MCPs** — run `mkdir -p scratch && sqlite3 scratch/grocery.db < scripts/seed-grocery-db.sql`. Ask the agent for a Markdown report joining SQLite sales data with the product catalog (filesystem).
- **Approve-if-trivial** — extend the review Action to skip the long review on docs-only diffs.
- **ADO parity** — if your org uses Azure DevOps, do [Module 10](../10-ado-mcp/README.md).

## Debrief

1. Which MCP tool gave the biggest leverage? Which felt risky?
2. What's the right mix of human review vs Copilot-bot review vs CI checks?
3. What guardrails would you require before letting an MCP agent run unattended in a team repo?

## Hints

[hints/HINTS.md](hints/HINTS.md)
