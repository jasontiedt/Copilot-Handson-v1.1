# Module 04 — Documentation Everywhere 🟢

**Time:** 60 min · **Difficulty:** Beginner · **Surfaces:** Chat + Edit

## What you'll learn

- Generate Javadoc / XML-doc / JSDoc that describes **contracts**, not implementation
- Author an ADR and a README with Copilot
- Add inline comments that explain *why*, not *what*
- Generate and validate an `openapi.yaml` from your endpoints

## Exercise 1 — Public-API docs on the backend (15 min) 🟢

**Try this**

1. Open `PricingEngine` and `WeeklyAd` in your stack. Attach via `#` → **Files**.
2. Run `/doc-generator`.
3. Review every suggestion: does it describe **behavior** or just paraphrase the signature? Delete or rewrite anything that just restates the obvious.

**Checkpoint** — every public method documents: purpose, parameters, return semantics (units, rounding), thrown exceptions, ≥ 1 example. A teammate can call the API correctly without opening the implementation.

## Exercise 2 — Why-comments inside `apply` (10 min) 🟢

**Try this**

1. Select the `apply`/`Apply` method body. Type `#` → **Selection**.
2. Run `/inline-comments`.
3. Delete every comment that just paraphrases the next line.

**Checkpoint** — every remaining comment passes: *"If I deleted this, a future maintainer would make a worse decision."*

## Exercise 3 — Author an ADR (15 min) 🟡

**Goal:** Document a real decision: *"Why does `Subtotal` silently skip missing SKUs?"*

**Try this**

1. Ask `/doc-generator` for a [MADR](https://adr.github.io/madr/) ADR covering context, decision, status, consequences.
2. Save under `sample-app-<stack>/docs/adr/0001-subtotal-missing-sku-policy.md`.
3. Cite the related test from M03 in the **Consequences** section.

**Checkpoint** — the ADR captures a real decision; if your team disagrees with the decision, the ADR is still useful.

## Exercise 4 — JSDoc / component docs on the frontend (10 min) 🟢

**Try this**

1. Open `sample-app-frontend/src/api/client.ts` and `src/components/PriceBadge.tsx`.
2. Run `/doc-generator`. Ask explicitly for **JSDoc** with `@param`, `@returns`, `@throws`, and one usage example per export.
3. For `PriceBadge`, the prop docs should call out the `weighed` and the M03-added `salePrice` behavior.

**Checkpoint** — hover over `quoteCart` in another file: VS Code shows your new doc.

## Exercise 5 — Generate `openapi.yaml` from endpoints (10 min) 🟡

**Try this**

1. Attach the controller (Java) or `Program.cs` (.NET) as chat context via `#` → **Files**.
2. Ask `/doc-generator` to produce `docs/openapi.yaml` covering all `/api/*` endpoints.
3. Spot-check: do paths, methods, request bodies, and response schemas match the code? Ask Copilot to *"verify consistency between `Program.cs`/`ProductController.java` and `docs/openapi.yaml`"* and fix any drift.

**Checkpoint** — `openapi.yaml` validates (paste into [editor.swagger.io](https://editor.swagger.io)) and matches the running API.

## Stretch

- Add a `CHANGELOG.md` entry for "M03 fixes" using Conventional Commits as the source.
- Generate a frontend README section listing every component and its props table.

## Debrief

1. Where is Copilot great at docs (signatures, params) vs bad (intent, history)?
2. Which inline comments did you delete? Why?
3. How would `.github/instructions/docs-style.instructions.md` change Copilot's defaults?

## Hints

[hints/HINTS.md](hints/HINTS.md)
