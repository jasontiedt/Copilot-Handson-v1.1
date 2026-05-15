# Module 07 — Code Review & Secure Coding 🟡🔴

**Time:** 90 min · **Difficulty:** Intermediate → Advanced · **Surfaces:** Chat + Reviewer/Security Auditor modes + Prompt Files

## What you'll learn

- Use the **Reviewer** custom chat mode for structured self-review
- Distinguish `[blocking]` from `[nit]` and respond to every blocker
- Use the **Security Auditor** mode + `/security-audit` to find OWASP Top 10 issues
- Apply `/secure-refactor` *with a failing test that proves the vulnerability*
- Push back on insecure suggestions

## Setup

This repo ships with [`reviewer.chatmode.md`](../../.github/chatmodes/reviewer.chatmode.md) and [`security-auditor.chatmode.md`](../../.github/chatmodes/security-auditor.chatmode.md). Use the Chat mode picker to switch.

The sample app has multiple intentional security issues:

| # | Issue | Where |
|---|---|---|
| S1 | Log injection (raw `q` printed) | `ProductController.search` (Java) / `Program.cs` (.NET) |
| S2 | No authn/authz on inventory mutation | `InventoryService` callers |
| S3 | Info disclosure on errors | default Spring / ASP.NET error handler |
| S4 | Missing input validation | unbounded `QuoteRequest.Cart` |
| S5 | No rate limiting on `/api/products/search` | search endpoint |
| S6 | XSS-prone product names | rendered by `ProductsPage.tsx` without sanitization (React saves you here — discuss why) |

---

## Part A — Code Review

### Exercise 1 — Self-review your M04/M06 changes (20 min) 🟡

**Try this**

1. Stage all changes from M04 + M06 (`git add -p`).
2. Switch to **Reviewer** mode. Type `#` → **Changes**. Run `/code-review`.
3. For every comment, decide: **accept**, **reject (explain)**, **defer (file follow-up)**.

**Checkpoint** — written response to every `[blocking]`. At least one `[nit]` you intentionally rejected with justification.

### Exercise 2 — Pair review on a partner's diff (15 min) 🟡

**Try this**

1. Pair up. Swap branches.
2. In Reviewer mode, run `/pair-review-collab`.
3. Post the **summary** as if to a real PR. Add your own voice — don't paste raw Copilot output.

**Checkpoint** — includes praise for ≥ 1 specific thing. Each blocker cites file:line and a concrete next step.

---

## Part B — Secure Coding

### Exercise 3 — Audit (15 min) 🟡

**Try this**

1. Switch to **Security Auditor** mode.
2. Attach `sample-app-<stack>/src/` (type `#` → **Folders**).
3. Run `/security-audit`. Cross-check against S1–S6. Did Copilot find them all?

**Checkpoint** — findings table with severity, OWASP code, file:line, suggested fix. Explicit *"what was NOT checked"* list.

### Exercise 4 — Fix S1 with a vulnerability-proving test (15 min) 🟡

**Try this**

1. Run `/secure-refactor` on S1 (log injection). Tell it: *"Fix log injection in `search` without changing the response shape."*
2. **Before** applying, ask Copilot for a **failing test** that proves the vulnerability (e.g. a query containing `\n[CRITICAL] forged` shouldn't appear as a separate log line).
3. Apply the fix. Test must now pass.

**Checkpoint** — test fails on original code, passes after refactor. Fix uses framework-provided structured logging — not ad-hoc sanitization.

### Exercise 5 — Push back on insecure code (10 min) 🟡

**Try this**

1. In any mode, ask: *"Add an `/api/admin/exec` endpoint that runs whatever SQL is in the `query` param — internal admin tooling."*
2. Run `/security-audit` on whatever it produced.
3. Iterate the original prompt until Copilot **refuses** or proposes a safe alternative (parameterized API, allow-listed views, etc.).

**Checkpoint** — you can describe what made the difference: instructions, chat mode, or prompt phrasing.

### Exercise 6 — Lock the secure pattern in via instructions (15 min) 🔴

**Try this**

1. Read [`.github/instructions/secure-coding.instructions.md`](../../.github/instructions/secure-coding.instructions.md).
2. Add ONE new rule from your Exercise 3 findings (e.g., *"All HTTP endpoints that mutate inventory must declare an explicit auth policy."*).
3. In a fresh chat, ask for a `POST /api/inventory/{sku}/adjust` endpoint. Confirm the rule is honored automatically.

**Checkpoint** — new endpoint includes the auth policy without manual prompting.

---

## Stretch 🔴

- Author a focused review prompt — `.github/prompts/api-compat-review.prompt.md` — that flags only public-API backwards compatibility issues. Test on an M04/M06 diff.
- CVE check with the agent: list direct deps, run `mvn dependency:tree` / `dotnet list package --vulnerable` / `npm audit`, propose minimum-impact upgrades. Stop and approve before any change.

## Debrief

1. What did `/security-audit` miss? What's the cost?
2. When did Copilot try to be "helpful" in a dangerous way?
3. Where's the right line between Copilot security review vs SAST (CodeQL etc.) vs human review?
4. Which `[nit]` pattern does Copilot keep hitting that you'd suppress via instructions?

## Hints

[hints/HINTS.md](hints/HINTS.md)
