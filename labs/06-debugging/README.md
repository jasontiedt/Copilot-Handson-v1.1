# Module 06 — Debugging Across the Stack 🟡

**Time:** 75 min (full track) · 25 min (Chat-only track) · **Difficulty:** Intermediate · **Surfaces:** Chat + Terminal + Debugger + Browser DevTools

## What you'll learn

- Convert a vague bug report into a deterministic failing test
- Use `/debug-triage` to generate a hypothesis tree before fixing
- Drive the VS Code debugger (breakpoints, watch, step) with Chat in the debug context
- Trace a bug across the **frontend → backend** boundary

## Choose your track

| Track | When to use it | Prereqs |
|---|---|---|
| **A. Chat-only** (Exercise 0) | You don't have the app running, you're on a restricted machine, or you just want a 20-minute walk-through. | None — just open files in this repo. |
| **B. Full-stack** (Exercises 1–5) | You have `sample-app-java` *or* `sample-app-dotnet` building and `sample-app-frontend` running on `localhost:5173`. | See [PREREQUISITES.md](../../PREREQUISITES.md). |

> New to the module? Do **Exercise 0** first either way — it's the fastest way to see how Chat reasons about a bug from code alone.

## Scenario

A real bug report from the store ops team:

> *"The cart total looks wrong sometimes when we have a BOGO promo. The Cart preview page shows a subtotal that occasionally drops by a dollar after refresh. Customers near the deli counter say they're seeing the same thing on the shelf-edge tablet."*

You'll triage, reproduce in the frontend, isolate to the backend, fix, and verify end-to-end.

---

## Exercise 0 — Debug with Chat only, no localhost (20 min) 🟢

**Goal:** Find the BOGO bug using only Chat + source files. No server, no browser, no debugger required.

Pick **one** language and use those file paths below:

- **Java:** [sample-app-java/src/main/java/com/example/grocery/pricing/PricingEngine.java](../../sample-app-java/src/main/java/com/example/grocery/pricing/PricingEngine.java) and [WeeklyAd.java](../../sample-app-java/src/main/java/com/example/grocery/pricing/WeeklyAd.java)
- **.NET:** [sample-app-dotnet/src/Publix.Grocery.Api/Pricing/PricingEngine.cs](../../sample-app-dotnet/src/Publix.Grocery.Api/Pricing/PricingEngine.cs) and [WeeklyAd.cs](../../sample-app-dotnet/src/Publix.Grocery.Api/Pricing/WeeklyAd.cs)

**Try this**

1. Open Chat. Run `/debug-triage`.
2. Attach both files for your language with `#` → **Files**. Paste the bug report (the quote above) as the symptom.
3. When Chat proposes hypotheses, ask it to **rank by likelihood** and to point at the exact lines it suspects in `apply` / `Apply`.
4. Without running anything, ask Chat:

    > *"Trace `apply` for a BOGO item with `qty = 1`, `qty = 2`, and `qty = 3`. Show the value of `paid` (or the equivalent expression) at each step and the returned subtotal. Is the result correct for `qty = 1`?"*

5. Have Chat propose a **table of expected vs. actual** for `qty` from 1 to 5. Confirm the off-by-one at `qty = 1` (a single BOGO item should still cost 1× unit price, not 0).
6. Ask Chat to write a **single failing unit test** that pins the bug at `qty = 1`, in the test framework already used by this repo (JUnit 5 + AssertJ for Java, xUnit + FluentAssertions for .NET — see [.github/copilot-instructions.md](../../.github/copilot-instructions.md)).
7. Ask Chat to propose the **minimum fix** to `apply` / `Apply` and explain *why* in one sentence.

**Checkpoint** — without running the app, you can state:

- The exact line that's wrong.
- The input that triggers it (`qty = 1` for a `Bogo` ad).
- The correct expression (`(qty + 1) / 2` paid units, or equivalent `Math.ceil(qty / 2.0)`).
- A test that would have caught it.

> Want to validate? Drop the test into `tests/` (`.NET`) or `src/test/java/...` (Java) and run it — but that's optional for this track.

---

## Full-stack track

The exercises below assume you have the backend and frontend running locally. If you only want the Chat-driven walk-through, you're done after Exercise 0.

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

1. Open `http://localhost:5173`. Click **Cart preview → Get quote** a few times. If the page doesn't load, see [PREREQUISITES.md](../../PREREQUISITES.md) — or fall back to Exercise 0 above.
2. With Browser DevTools open (F12 → **Network** tab), inspect the `/api/pricing/quote` response. Compare the body to the displayed subtotal.
3. In Chat, attach [CartPage.tsx](../../sample-app-frontend/src/pages/CartPage.tsx) (type `#` → **Files**) and ask: *"Is there any client-side transformation between the response and the rendered subtotal that could cause drift?"*

**Checkpoint** — you've ruled the frontend out (or in). Document the answer in one sentence.

---

## Exercise 3 — Reproduce deterministically in the backend (20 min) 🟡

**Goal:** Convert "sometimes wrong" into a test that fails reliably.

**Try this**

1. Pick the **race condition** hypothesis.
2. Ask Copilot to write a test that exercises `InventoryService.adjust` / `Adjust` from multiple threads/tasks and asserts a non-negative invariant. Attach [InventoryService.java](../../sample-app-java/src/main/java/com/example/grocery/inventory/InventoryService.java) **or** [InventoryService.cs](../../sample-app-dotnet/src/Publix.Grocery.Api/Inventory/InventoryService.cs) so Chat sees the real signature.
3. Run it repeatedly (`mvn test` or `dotnet test`). If it doesn't fail ≥ 1 in 10 runs, ask Copilot to *increase contention* (more threads, smaller initial stock, longer loops).

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
