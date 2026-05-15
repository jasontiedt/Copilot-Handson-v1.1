# Module 03 — TDD Across the Stack 🟢🟡

**Time:** 90 min · **Difficulty:** Beginner → Intermediate · **Surfaces:** Chat + Inline + Edit + Terminal

## What you'll learn

- Drive a strict red-green-refactor loop with Copilot as the pair
- Use `/generate-unit-tests` + `/tdd-red-green-refactor` together
- Apply the same loop to **backend** (`PricingEngine`) **and** **frontend** (React `PriceBadge`)
- Catch bugs by writing tests *first* instead of guessing fixes

## Scenario

You inherit `PricingEngine` with one happy-path test and silent bugs. You also inherit a tiny `PriceBadge` React component that *almost* matches the in-store signage. You will grow both suites.

| Stack | Backend target | Backend test |
|---|---|---|
| Java | [`PricingEngine.java`](../../sample-app-java/src/main/java/com/publix/grocery/pricing/PricingEngine.java) | [`PricingEngineTest.java`](../../sample-app-java/src/test/java/com/publix/grocery/pricing/PricingEngineTest.java) |
| .NET | [`PricingEngine.cs`](../../sample-app-dotnet/src/Publix.Grocery.Api/Pricing/PricingEngine.cs) | [`PricingEngineTests.cs`](../../sample-app-dotnet/tests/Publix.Grocery.Tests/PricingEngineTests.cs) |
| Frontend | [`PriceBadge.tsx`](../../sample-app-frontend/src/components/PriceBadge.tsx) | [`PriceBadge.test.tsx`](../../sample-app-frontend/src/components/__tests__/PriceBadge.test.tsx) |

---

## Exercise 1 — Backend coverage-gap analysis (15 min) 🟢

**Goal:** Write down what's *not* tested before writing any test.

**Try this**

1. Open the target `PricingEngine` file. Type `#` → **Files** to attach it.
2. Run `/generate-unit-tests`.
3. Read **only the coverage-gap section**. Save it as your backlog.

**Checkpoint** — ≥ 8 distinct gaps covering: each `WeeklyAd` variant, missing SKU, weighed-item qty, qty=0, BOGO at qty=1, BuyNForX with leftover, decimal rounding, stacking conflicts.

---

## Exercise 2 — Red, one behavior at a time (25 min) 🟡

**Goal:** Add **one failing test** per gap, in priority order.

**Try this**

1. In Chat, switch to `/tdd-red-green-refactor`.
2. Pick ONE gap. Describe the behavior in one sentence.
3. Accept the *failing test only*. Stop. Run tests (`mvn test` / `dotnet test`).
4. Confirm it fails for the **reason you expected** — not by accident.

> **Terminal tip:** Pipe failures into chat using **Terminal → Send to Chat**. Faster than retyping the message.

**Checkpoint** — each new test fails first with a message naming the wrong value. You catch ≥ 2 genuine bugs and document them at the top of the test file as `// BUG-01:` comments. Do not fix yet.

---

## Exercise 3 — Green, then refactor (15 min) 🟡

**Try this**

1. For each `BUG-XX`, ask `/tdd-red-green-refactor` for the **minimum** fix.
2. Run all tests after each fix. If a previously-green test now fails — investigate; don't paper over.
3. When all green, ask Copilot for ONE refactor (rename, extract method, etc.). Confirm tests still pass.

**Checkpoint** — all green; diff is small and surgical; you can name *why* each change was the minimum.

---

## Exercise 4 — Frontend TDD on `PriceBadge` (20 min) 🟢

**Goal:** Same loop, different stack. Vitest + React Testing Library.

**Scenario:** Product Marketing wants two more rules on `PriceBadge`:

1. Sale prices (passed as `salePrice?`) display the regular price struck-through next to the sale price.
2. Prices ≥ $100 must include a thousands separator (`$1,299.00`).

**Try this**

1. Open `PriceBadge.test.tsx`. Type `#` → **Selection** on the existing tests.
2. Run `/tdd-red-green-refactor`. Ask for **one** failing test for rule 1.
3. `npm test` in `sample-app-frontend/`. Confirm it fails for the right reason.
4. Implement the minimum change to `PriceBadge.tsx`. Re-run.
5. Repeat for rule 2.

**Checkpoint** — `npm test` shows two new passing tests. The component diff is < 10 lines.

---

## Exercise 5 — Wire a frontend test that hits the backend contract (10 min) 🟡

**Goal:** Detect API drift before it becomes a runtime 500.

**Try this**

1. Ask Copilot to add a Vitest test for `src/api/client.ts` that uses `vi.fn()` / `msw` (your choice) to mock `fetch`, verify the URL and body of `quoteCart()`, and assert the typed shape of `QuoteResponse`.
2. Run `npm test`. Confirm it passes.

**Checkpoint** — if someone changes the API path in `client.ts`, this test fails.

---

## Stretch 🔴

- Make `PricingEngine` deterministic when multiple ads match the same SKU. Add a property-based test (jqwik / FsCheck) asserting price is monotonic in qty.
- Inject `Clock` / `TimeProvider` so future labs can test time-bounded promotions.
- Convert `PriceBadge` to use `Intl.NumberFormat` and prove behavior with a locale test.

## Debrief

1. How did writing tests *first* change what you noticed about the code?
2. When did Copilot try to "fix" something you hadn't asked it to fix? How did you push back?
3. Was the red-green loop easier on the backend or the frontend? Why?

## Hints

[hints/HINTS.md](hints/HINTS.md)
