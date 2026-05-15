# Module 06 — Debugging Across the Stack 🟡

**Time:** 75 min · **Difficulty:** Intermediate · **Surfaces:** Chat + Terminal + Debugger + Browser DevTools

## What you'll learn

- Convert a vague bug report into a deterministic failing test
- Use `/debug-triage` to generate a hypothesis tree before fixing
- Drive the VS Code debugger (breakpoints, watch, step) with Chat in the debug context
- Trace a bug across the **frontend → backend** boundary

## Scenario

A real bug report from the store ops team:

> *"The cart total looks wrong sometimes when we have a BOGO promo. The Cart preview page shows a subtotal that occasionally drops by a dollar after refresh. Customers near the deli counter say they're seeing the same thing on the shelf-edge tablet."*

You'll triage, reproduce in the frontend, isolate to the backend, fix, and verify end-to-end.

---

## Exercise 1 — Triage from symptoms (10 min) 🟡

**Try this**

1. Run `/debug-triage`. Paste the report above.
2. When it asks for a stack trace, say *"none — only the description"* and let it propose hypotheses anyway.
3. Note the top 3 candidates and the cheapest experiment for each.

**Checkpoint** — at least one hypothesis points at **concurrency in `InventoryService`**, one at **rounding / type**, and one at the **frontend caching/rendering** path.

---

## Exercise 2 — Reproduce in the frontend (10 min) 🟡

**Try this**

1. Open `http://localhost:5173`. Click **Cart preview → Get quote** a few times.
2. With Browser DevTools open, inspect the `/api/pricing/quote` response. Compare the body to the displayed subtotal.
3. In Chat, attach `CartPage.tsx` (type `#` → **Files**) and ask: *"Is there any client-side transformation between the response and the rendered subtotal that could cause drift?"*

**Checkpoint** — you've ruled the frontend out (or in). Document the answer in one sentence.

---

## Exercise 3 — Reproduce deterministically in the backend (20 min) 🟡

**Goal:** Convert "sometimes wrong" into a test that fails reliably.

**Try this**

1. Pick the **race condition** hypothesis.
2. Ask Copilot to write a test that exercises `InventoryService.adjust`/`Adjust` from multiple threads/tasks and asserts a non-negative invariant.
3. Run it repeatedly. If it doesn't fail ≥ 1 in 10 runs, ask Copilot to *increase contention* (more threads, smaller initial stock, longer loops).

**Checkpoint** — a test that fails with measurable frequency. You can explain *why* in one sentence (lost-update on read-modify-write).

---

## Exercise 4 — Use the debugger with Chat (15 min) 🟡

**Goal:** Look at live state instead of guessing.

**Try this**

1. Set a breakpoint inside `apply`/`Apply` for a `WeeklyAd.Bogo` line.
2. Run a unit test in debug mode. When stopped, open Chat and ask: *"What is the value of `qty` and `paid` here, and what would the correct value be for qty=1?"*
3. Chat sees variables / watches in the debug context — use it.

**Checkpoint** — you can describe the off-by-one in BOGO at `qty=1` from observed state, not from intuition.

---

## Exercise 5 — Fix and verify across the stack (15 min) 🟡

**Try this**

1. Use `/tdd-red-green-refactor` for the minimum fix that makes both the BOGO test and the concurrency test pass.
2. Run the full test suite from the integrated terminal. Use **Send to Chat** on any failure output.
3. Restart the backend. Click **Get quote** in the browser repeatedly. Confirm the subtotal is stable.

**Checkpoint** — all tests pass, run 5× back-to-back; the UI shows a stable subtotal.

---

## Stretch 🔴

- Replace `HashMap` / `Dictionary` with a thread-safe alternative. Justify the choice in a comment.
- Add an OpenTelemetry-style log around cart calculation including correlation id, line count, and total. Re-run with `LOG_LEVEL=debug`; use Chat to summarize the log.
- In `sample-app-frontend`, add an error-boundary that shows a graceful fallback when `/api/pricing/quote` returns 5xx.

## Debrief

1. Which hypothesis was right? Was it your top guess?
2. What did the debugger reveal that Chat alone could not?
3. How would you *prevent* this class of bug? Could it become an `.instructions.md` rule?

## Hints

[hints/HINTS.md](hints/HINTS.md)
