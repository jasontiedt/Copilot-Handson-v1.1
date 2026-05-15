# Module 10 — Azure DevOps MCP: Work Items, PRs & Boards 🔴

**Time:** 75 minutes · **Difficulty:** Advanced · **Surfaces:** Agent + MCP + Azure DevOps

> Module 08 was the **GitHub** automation loop. This is the same loop for **Azure DevOps**: work items, pull requests, and boards driven from Copilot agent mode via the ADO MCP server.

## What you'll learn

- Connect to ADO from agent mode with one MCP server entry and one PAT.
- Triage **work items** with a reusable `/ado-triage` prompt.
- Run a PR review against an ADO PR with threaded `[blocking]` / `[nit]` comments.
- Produce a stand-up summary from the current iteration.

## Setup (≈5 minutes)

You need three things:

1. An **ADO org** you can write to (free personal org works — <https://dev.azure.com>).
2. A **project** in that org. Any existing project is fine; the lab does not assume a specific name or repo.
3. A **PAT** with the simplest scope that works: **Full access** (or *Custom defined* → Work Items, Code, Pull Request Threads — all r/w). Set expiry to 7 days.

> No repo import required. The MCP server reads/writes work items and PRs across your project; you don't need to mirror this repo into ADO.

### Add the ADO MCP server to `.vscode/mcp.json`

Open [`.vscode/mcp.json`](../../.vscode/mcp.json) and **add** these entries — don't remove the existing ones from Module 08:

```jsonc
// inside "inputs": [ ... ]
{
  "id": "ado_pat",
  "type": "promptString",
  "description": "Azure DevOps PAT (full access, 7-day expiry)",
  "password": true
},
{
  "id": "ado_org",
  "type": "promptString",
  "description": "Azure DevOps org slug (the part after dev.azure.com/)"
}

// inside "servers": { ... }
"azure-devops": {
  "command": "npx",
  "args": ["-y", "@azure-devops/mcp", "${input:ado_org}"],
  "env": { "AZURE_DEVOPS_PAT": "${input:ado_pat}" }
}
```

Reload VS Code. On first use, VS Code prompts once for the org slug and once for the PAT — nothing is written to disk.

---

## Exercise 1 — Connect and inventory (10 min) 🟡

**Try this**

1. Open the MCP view. `azure-devops` should show **connected** (after the PAT prompt).
2. Agent mode: *"List the `azure-devops` MCP tools, grouped by work items / repos / pull requests / boards. Mark each read-only or write."*

**Checkpoint** — written inventory covering all four areas.

---

## Exercise 2 — Seed three work items (5 min) 🟢

**Try this**

In agent mode:

> *Create three work items in project `<your-project>`: a **Bug** titled "Cart subtotal flickers"; a **User Story** titled "Weekly ad preview"; a **Task** titled "Add aria-label to PriceBadge". Use project defaults for Area Path and Iteration Path. Body for each = one sentence is fine.*

Approve each create call.

**Checkpoint** — three work items visible on **Boards → Work Items**.

> Why so few? You only need enough to feel each exercise. Add more later if you want.

---

## Exercise 3 — Triage with `/ado-triage` (15 min) 🟡

**Try this**

1. Create `.github/prompts/ado-triage.prompt.md` (`mode: agent`). The prompt should: fetch the work item by ID, propose **tags**, **Acceptance Criteria** (Given/When/Then), and a **draft comment** — and **must not post** until approved.
2. Run `/ado-triage` on the Bug from Exercise 2.
3. Edit the draft, then approve posting.

**Checkpoint** — the Bug has one posted comment with Given/When/Then.

---

## Exercise 4 — PR review against ADO (20 min) 🔴

**Try this**

1. Pick any branch in any ADO repo you have access to (or push a tiny `feature/aria-label` branch from this workspace to one).
2. Open a PR in ADO targeting `main`. Link the Task work item from Exercise 2 in the description.
3. Agent mode: *"Review this PR using the rubric in `.github/copilot-instructions.md`. Propose 3 threaded comments, each citing file + line, tagged `[blocking]` or `[nit]`. Do not post yet."*
4. Post **two**; reject the rest with one line of feedback.

**Checkpoint** — two threaded comments on the PR; each cites file + line.

---

## Exercise 5 — Sprint stand-up summary (10 min) 🟡

**Try this**

In agent mode:

> *Summarize the current iteration for project `<your-project>`. Group by state. For each Active item include assignee and age in days. Save as `scratch/standup.md`.*

**Checkpoint** — `scratch/standup.md` contains counts by state and the top 3 oldest active items.

---

## Stretch 🔴

- **Duplicate detection** — extend `/ado-triage` to run a WIQL query for similar titles in the last 60 days and propose a `Related` link rather than auto-close.
- **Pipeline gate** — fetch the latest pipeline run for the PR's branch in Exercise 4 and refuse to recommend approval if the build is red.
- **Cross-provider prompt** — author one `/triage` prompt that accepts `provider: github | ado` and dispatches accordingly. Useful for teams migrating between platforms.

## Debrief

1. Which prompts from Module 08 worked unchanged on ADO? Which needed rewriting?
2. Where does ADO push you toward *more* explicit approval than GitHub?
3. If your org uses both, where do you draw the boundary between them for Copilot automation?

## Hints

[hints/HINTS.md](hints/HINTS.md)
