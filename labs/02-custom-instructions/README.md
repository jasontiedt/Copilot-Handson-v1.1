# Module 02 — Custom Instructions & Project Standards 🟡

**Time:** 75 min · **Difficulty:** Intermediate · **Surfaces:** Workspace customization + Chat

## What you'll learn

- **Prompts vs Instructions** — invoked vs always-on
- The layering: `copilot-instructions.md` → scoped `.instructions.md` (`applyTo`) → prompt files → ad-hoc chat
- When `AGENTS.md` enters the picture
- Apply advanced prompt-engineering patterns inside instructions (chain-of-verification, output contracts)

## Background — open these first

- [.github/copilot-instructions.md](../../.github/copilot-instructions.md) — repo-wide
- [.github/instructions/](../../.github/instructions) — scoped via `applyTo`
- [.github/prompts/](../../.github/prompts) — invoked via `/`
- [.github/chatmodes/](../../.github/chatmodes) — Reviewer / Security Auditor

---

## Exercise 1 — Prove instructions actually change output (15 min) 🟡

**Goal:** A/B compare with and without `copilot-instructions.md`.

**Try this**

1. Rename `.github/copilot-instructions.md` → `.copilot-instructions.md.bak`.
2. In a fresh chat: *"Add a `/api/inventory/low-stock` endpoint to my stack."* Capture the output.
3. Restore the file. Same prompt in a fresh chat.
4. Diff the two outputs.

**Checkpoint** — the "with instructions" version uses correct layering (`controller→service→repo` or `endpoint→service→repo`), returns DTOs not entities, includes tests, and follows naming rules. You can name three concrete differences.

---

## Exercise 2 — Add a Publix-specific rule (15 min) 🟡

**Goal:** Add a rule and watch Copilot adopt it without prompting.

**Try this**

1. Create `.github/instructions/observability.instructions.md` with `applyTo: "**/*.{java,cs}"`.
2. Add 3–5 rules: structured JSON logging, correlation-id propagation, no `printStackTrace`/`Console.WriteLine`, PII redaction, metric per public endpoint.
3. In a fresh chat, ask for a new `/api/inventory/low-stock` endpoint.

**Checkpoint** — the generated code includes structured logging and a metric without manual prompting.

---

## Exercise 3 — Scope precisely with `applyTo` (10 min) 🟡

**Goal:** Apply a strict rule only where it makes sense.

**Try this**

1. Create `.github/instructions/sql.instructions.md` with `applyTo: "**/*.sql,**/repository/**.{java,cs}"`.
2. Rule: "Never `SELECT *`. Always parameterize. Comment which indexed columns the query relies on."
3. Edit a repository file, then a controller file. Verify the rule fires in one and not the other.

**Checkpoint** — you can show the chat transcript with the rule enforced once and skipped once.

---

## Exercise 4 — Add a frontend-only rule (10 min) 🟡

**Goal:** Instructions aren't just for backend code.

**Try this**

1. Create `.github/instructions/frontend.instructions.md` with `applyTo: "sample-app-frontend/**/*.{ts,tsx}"`.
2. Rules: no `any`, must use the typed client in `src/api/client.ts`, accessibility — every interactive element needs an `aria-label` or visible label, error states must be rendered (not just `console.log`).
3. Ask Copilot: *"Add a new page that shows the cart subtotal trend over time."* Confirm it honors the rules.

**Checkpoint** — generated TSX uses the typed client and renders error state.

---

## Exercise 5 — Author `AGENTS.md` (15 min) 🔴

**Goal:** Guide agent-mode runs specifically (used heavily in M08 capstone).

**Try this**

1. Create `AGENTS.md` at the repo root.
2. Cover: which directories the agent may modify; required commands before "done" (`mvn test`, `dotnet test`, `npm test`); when to stop and ask; the PR description template.
3. Give an agent a small task ("add a `/healthz` endpoint with a test"). Observe whether it follows `AGENTS.md`.

**Checkpoint** — agent runs the test command before declaring done.

---

## Exercise 6 — Sharpen a prompt with verification (10 min) 🔴

**Goal:** Make a prompt self-check before answering. Carry this pattern into your team's prompts.

**Try this**

1. Open `.github/prompts/code-review.prompt.md`.
2. Just before "Output", add: *"List 3 verification questions about your draft (e.g., does every comment cite a line? did I confuse opinion with defect?). Answer each. Then revise."*
3. Run on a real diff from a sandbox branch. Compare to the un-verified baseline.

**Checkpoint** — the verified version has fewer hand-wavy comments and at least one visible self-correction.

---

## Debrief

1. Instructions vs prompts — when do you reach for each?
2. What is the right granularity for `applyTo`?
3. Which file from today would you commit to a real Publix repo *first*?

## Hints

[hints/HINTS.md](hints/HINTS.md)
