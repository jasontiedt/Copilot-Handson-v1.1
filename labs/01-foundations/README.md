# Module 01 — Foundations: Context, Prompts & Modes 🟢

**Time:** 75 min · **Difficulty:** Beginner · **Surfaces:** Chat (Ask / Plan / Agent) + Inline + Prompt Files

> **The shared project for every module:** Grocery Pricing & Inventory.
>
> - Backend (pick one to run): [`sample-app-java/`](../../sample-app-java) (Spring Boot, 8080) **or** [`sample-app-dotnet/`](../../sample-app-dotnet) (ASP.NET Core, 5080)
> - Frontend (always): [`sample-app-frontend/`](../../sample-app-frontend) (React + Vite, 5173)
>
> Every later module reuses these three projects. Get them running once; never set up again.

## What you'll learn

- Tell Inline / Ask / Plan / Agent surfaces apart and pick the right one
- Use the `#` context picker correctly (Files, Symbols, Selection, Changes, …)
- Invoke prompt files with `/<name>` and read their frontmatter
- Author your own `.prompt.md` using the **Role / Task / Context / Constraints / Examples / Verification** pattern (intro-level; M02 deepens this)

## Setup (do once for the whole curriculum, ~15 min)

1. Complete [PREREQUISITES.md](../../PREREQUISITES.md).
2. Pick **one** backend stack and start it:
   - Java: `cd sample-app-java && mvn spring-boot:run`
   - .NET: `cd sample-app-dotnet && dotnet run --project src/Grocery.Api`
3. Start the frontend:
   ```bash
   cd sample-app-frontend
   npm install
   npm run dev            # add API_PORT=5080 if you picked .NET
   ```
4. Open <http://localhost:5173>. Click **Products** — you should see 3 SKUs. Click **Cart preview → Get quote** — you should see a subtotal.

**Checkpoint:** Both backend and frontend respond. Leave them running for the rest of the day.

---

## Exercise 1 — Inline vs Ask vs Plan vs Agent (10 min) 🟢

**Goal:** Feel the difference between the four interaction surfaces on the same task.

**Try this** — task: add a one-line null-guard to `PricingEngine.apply` (Java) / `Apply` (.NET).

1. **Inline (Ctrl+I):** Place cursor in the method, describe the change in one sentence.
2. **Ask mode (Chat panel):** Same description; you have to copy/paste the diff yourself.
3. **Plan mode:** Same description; read the proposed step-by-step plan, iterate, then hand it to Agent or apply manually.
4. **Agent mode:** *"Add a null-guard and run the tests."* Watch it call the test runner.

**Checkpoint** — you can answer: *"When would I pick Inline over Plan? When would I pick Agent over Plan?"*

---

## Exercise 2 — The `#` context picker (10 min) 🟢

**Goal:** Stop relying on implicit context. Pick context explicitly.

> The `#` menu is **menu-driven**: type `#` in Chat → quick-pick opens → choose a category (**Files**, **Folders**, **Symbols**, **Selection**, **Codebase**, **Changes**, **Terminal**, **Problems**) → choose the item. Typing literal `#file:Foo` as plain text does nothing.

**Try this**

1. New chat, no context. Ask: *"What does the pricing engine do?"* — note how vague the answer is.
2. Type `#` → **Files** → `PricingEngine.java`/`.cs`. Ask the same question. Diff the quality.
3. Select the `apply`/`Apply` method body in the editor. Type `#` → **Selection**. Ask: *"What edge cases are missing here?"*
4. Make a small uncommitted edit. Type `#` → **Changes**. Ask: *"Summarize this change in two sentences."*

**Checkpoint** — you can produce 3 distinctly different answers about the same code by changing only the `#` context.

---

## Exercise 3 — Inventory the prompt files shipped here (5 min) 🟢

**Goal:** Know what's already on the shelf.

**Try this**

1. Open Chat, type `/`. Cross-reference the picker with files in [`.github/prompts/`](../../.github/prompts).
2. Open three `.prompt.md` files and identify their `mode` (`ask` / `agent`) and `tools` (if any).

**Checkpoint** — you can answer: *"Which prompt would I reach for to triage a vague bug report?"*

---

## Exercise 4 — Invoke a prompt on the sample app (10 min) 🟢

**Try this**

1. Open `PricingEngine.java`/`.cs`. Attach it as chat context (type `#` → **Files**).
2. Run `/generate-unit-tests`.
3. **Read the coverage-gap analysis** before reading the proposed tests. Save 3 gaps you wouldn't have thought of.

**Checkpoint** — you have a coverage-gap list to carry into M03.

---

## Exercise 5 — Author your first prompt file (25 min) 🟡

**Goal:** Capture a workflow you do weekly so the team can reuse it.

**Try this**

1. Pick a repeatable workflow ("explain a stack trace", "turn this TODO into acceptance criteria", "summarize a stand-up").
2. Create `.github/prompts/<your-name>.prompt.md`. Use frontmatter `mode`/`description`/`tools` and a body with **Role / Inputs / Procedure / Output format / Rules**.
3. Reload Chat. Invoke `/your-name` on three real inputs.
4. When output disappoints, **change the prompt, not the question**.

**Stretch** — add 2 worked examples (few-shot). Compare zero-shot vs few-shot output quality.

**Checkpoint** — output is consistent across 3 inputs; a teammate gets equivalent results.

---

## Debrief

1. When was the `#` picker the biggest single quality lift?
2. Which surface (Inline/Ask/Plan/Agent) do you reach for too often? Too rarely?
3. What is the difference between a *good prompt for you right now* and a *good prompt for the team next month*?

## Hints

[hints/HINTS.md](hints/HINTS.md)
