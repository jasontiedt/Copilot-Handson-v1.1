# Module 07 — Automation: MCP, PR Review & Issues 🔴

**Time:** 2 hours · **Difficulty:** Advanced · **Surfaces:** Agent + MCP + GitHub.com + Actions

## What you'll learn

- What an **MCP server** is and how to configure it in `.vscode/mcp.json`
- Compose tools across servers (filesystem, SQLite, GitHub) from agent mode
- Wire a **GitHub Actions** workflow that posts an automated review summary on every PR
- Triage GitHub Issues with `/issue-triage` and `/issue-to-spec`, then hand off to the Copilot coding agent

## Setup

> You **do not** need to create your own repo from scratch. **Fork this repository** to your GitHub account. Everything Module 07 needs is already inside.

One-time setup:

```bash
# Fork via the GitHub UI, or with the CLI:
gh repo fork --remote --clone
cd Copilot-VBD-v1.0          # your fork's clone

# Seed the four practice issues into your fork:
bash scripts/seed-issues.sh       # macOS / Linux / Git Bash
# or:
pwsh scripts/seed-issues.ps1      # Windows PowerShell

# Seed the SQLite database used by the MCP demos:
mkdir -p scratch
sqlite3 scratch/grocery.db < scripts/seed-grocery-db.sql
```

You'll also need **Docker** running (for the GitHub MCP server) or the native GitHub MCP binary on `PATH`.

What ships in this repo (already wired up — no copy/paste needed):

- [`.vscode/mcp.json`](../../.vscode/mcp.json) — github + filesystem (`./scratch/`) + SQLite (`./scratch/grocery.db`)
- [`scripts/seed-grocery-db.sql`](../../scripts/seed-grocery-db.sql) — 100 fake `sales` rows
- [`scripts/seed-issues.sh`](../../scripts/seed-issues.sh) / [`.ps1`](../../scripts/seed-issues.ps1) — opens issues from [`seed-issues/`](../../seed-issues)
- [`.github/workflows/copilot-review.yml`](../../.github/workflows/copilot-review.yml) — automated PR review summary
- [`seed-issues/`](../../seed-issues) — four pre-written issues spanning quality levels

---

## Part A — MCP Servers

### Exercise 1 — Discover what you have (15 min) 🟡

**Try this**

1. Reload VS Code. Open the **MCP** view. Confirm all three servers connect.
2. Switch chat to **Agent**. Run `/mcp-tool-discovery`.
3. Build a cheat sheet: one read-only and one write tool per server.

**Checkpoint** — written tool inventory.

### Exercise 2 — Multi-tool read-only query (20 min) 🟡

**Try this**

1. Seed `scratch/grocery.db` via the SQLite MCP (use `scripts/seed-grocery-db.sql`).
2. Ask the agent: *"Find the top 5 SKUs by units sold this week, then look up each in the product catalog (filesystem MCP can read `sample-app-*/`), and produce a Markdown report."*
3. Approve each tool call.

**Checkpoint** — agent ran ≥ 3 distinct tools across ≥ 2 servers; report matches the seeded data.

### Exercise 3 — Write workflow with explicit approval (15 min) 🔴

**Try this**

1. In your fork, pick **issue #1** (`01-low-stock-alert.md`) — the well-formed one.
2. Ask the agent: *"Triage issue #1 using `/issue-triage`, then **draft** (do not post) a comment proposing labels and a Definition of Done."*
3. Approve only the **fetch** tool calls. Reject any **create comment** call. Edit the draft, then approve posting.

**Checkpoint** — comment exists on the issue; you rejected ≥ 1 tool call along the way.

---

## Part B — PR Review Automation

### Exercise 4 — Drive a PR review from VS Code (15 min) 🟡

**Try this**

1. In your fork, create a small PR. The easiest way: branch from `main`, make a 3–5 file change in `sample-app-frontend/` (e.g., add a stretch test from M03 you skipped), push, `gh pr create --fill`.
2. Agent mode → `/pr-review-automation` with the PR URL.
3. Manually post 2–3 of the proposed inline comments.

**Checkpoint** — comments cite file:line and are tagged `[blocking]`/`[nit]`.

### Exercise 5 — Repo-level review hints for GitHub.com Copilot (15 min) 🟡

**Try this**

1. Confirm `.github/copilot-instructions.md` is on `main` of your fork.
2. Request a review from **Copilot** (the bot) on the PR from Exercise 4. Note its style.
3. Tighten ONE rule in `copilot-instructions.md`. New PR. Diff the styles.

**Checkpoint** — you can show one comment whose form (`[blocking]` prefix, citation style) was clearly shaped by repo instructions.

### Exercise 6 — Path-scoped review focus (10 min) 🔴

**Try this**

1. Add `.github/instructions/api-review.instructions.md` (`applyTo: "**/api/**"`) — security-leaning.
2. Add `.github/instructions/test-review.instructions.md` (`applyTo: "**/tests/**,**/*Test*.{java,cs}"`) — test-style.
3. Two PRs, one touching each. Compare reviews.

**Checkpoint** — distinctly different vocabularies and checks per PR.

### Exercise 7 — Copilot-review GitHub Action (15 min) 🔴

**Try this**

1. Review [`.github/workflows/copilot-review.yml`](../../.github/workflows/copilot-review.yml). It is already in your fork — no copy/paste needed.
2. Enable Actions on your fork if prompted (Settings → Actions → *Allow all actions and reusable workflows*).
3. Open a small PR (or reuse the Exercise 4 PR). Confirm a "Copilot Review Summary" comment appears within a minute.

**Checkpoint** — comment follows the prompt's section structure.

---

## Part C — Issue & Work-Item Automation

### Exercise 8 — Triage a backlog (15 min) 🟡

**Setup:** Your fork already has four seeded issues spanning three quality levels (well-formed, vague, likely-duplicate, capstone-feature). See [`seed-issues/README.md`](../../seed-issues/README.md).

**Try this**

1. Agent mode → `/issue-triage` per issue URL for issues #1, #2, and #3.
2. Edit each proposed comment for tone. Post it. Apply labels.

**Checkpoint** — each issue has labels + Definition of Done in a single comment. You overrode ≥ 1 Copilot suggestion.

### Exercise 9 — Issue → spec → tasks (15 min) 🟡

**Try this**

1. Run `/issue-to-spec` on **issue #2** (`02-cart-subtotal-flicker.md`) — the deliberately vague one.
2. Post the spec back as a "Spec (proposed)" comment. Tag yourself (or a partner) as the requester.

**Checkpoint** — spec has Given/When/Then acceptance criteria, an out-of-scope list, a task breakdown.

### Exercise 10 — Hand off to the Copilot coding agent (20 min) 🔴

**Try this**

1. Pick the smallest task (XS) from Exercise 9.
2. Assign it to **Copilot** on GitHub.com.
3. Monitor the draft PR. Comment when it drifts.
4. When the PR opens, run your Exercise 7 review on it.

**Checkpoint** — a merged or near-merge PR. Documented ≥ 1 nudge you had to give.

---

## Stretch 🔴

- "Approve-if-trivial" — if the diff is only docs/test/typo, the Action comments `[no blocking issues found]` and skips the long review.
- Author `.github/prompts/weekly-pricing-report.prompt.md` (`mode: agent`) that runs SQLite + filesystem MCPs to produce a Slack-ready report.
- ADO Boards parity — pick a real work item, run `/issue-triage`-style triage, paste output into ADO; list parity gaps.

## Debrief

1. What was the highest-leverage MCP tool?
2. Where did the agent's plan differ from how a human would have done it?
3. What guardrails would you require before letting an MCP agent run unattended in a Publix repo?
4. What's the right mix of human review vs Copilot review vs CI checks?

## Hints

[hints/HINTS.md](hints/HINTS.md)
