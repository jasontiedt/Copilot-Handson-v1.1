# Module 08 — Capstone: Agent Mode End-to-End 🔴

**Time:** 2–3 hours · **Difficulty:** Advanced · **Surfaces:** Agent mode + everything from M01–M07

## Premise

Deliver a real, small vertical-slice feature **with Copilot agent mode**, leveraging everything from prior modules:

> **Feature:** Add a "Weekly Ad Preview" feature.
>
> - **Backend:** `GET /api/pricing/weekly-ad/preview?storeId=NNN` — returns the active weekly ad for a store with a per-SKU "best price" calculation and a stub for store-specific override rules.
> - **Frontend:** A new tab in `sample-app-frontend/` that fetches the preview and renders each SKU with regular and best price (uses the M03 `PriceBadge` extensions).
> - **Tests:** Backend unit tests for best-price math; frontend component test for the new page.
> - **Docs:** Update `docs/openapi.yaml`. Add an ADR for the override mechanism.

You'll do this issue → branch → tests → code → review → PR — minimizing manual code editing while holding quality bars.

## Pre-flight

- [ ] `.github/copilot-instructions.md` and `.github/instructions/*` in place
- [ ] `AGENTS.md` from M02 includes "must run `mvn test` / `dotnet test` / `npm test` before declaring done"
- [ ] **Reviewer** and **Security Auditor** modes available
- [ ] GitHub MCP server connected (M07)
- [ ] Frontend rule from M02 in place (typed client + a11y)

## Phase 1 — Issue & spec (15 min)

1. The feature is already drafted as **issue #4** (`seed-issues/04-weekly-ad-preview.md`) in your fork. Open it in the browser.
2. Run `/issue-to-spec` against issue #4. Refine until acceptance criteria are crisp.
3. Post the refined spec as a comment on issue #4.

## Phase 2 — Branch & failing tests (30 min)

1. Agent mode: *"Create branch `feature/weekly-ad-preview`, write failing tests for the spec using `/tdd-red-green-refactor`. Stop after each test for me to confirm."*
2. Approve tests one by one. Confirm `mvn test` / `dotnet test` shows the new failures.
3. Add a failing **frontend** Vitest for the new page (mocked API).

## Phase 3 — Implementation (45–60 min)

1. *"Make the new tests pass with the smallest changes. Honor `.github/instructions/*`. Stop if architectural choices are unclear."*
2. Watch boundary crossings: pricing math, repository, controller/endpoint wiring, frontend API client + page.
3. After every green-light from the agent, run **all** tests yourself (backend + frontend).

## Phase 4 — Security & docs (20 min)

1. Switch to **Security Auditor**. Run `/security-audit` on the new files only.
2. `/secure-refactor` any High/Critical finding.
3. Switch to default. Run `/doc-generator`. Add the ADR for the override mechanism. Update `docs/openapi.yaml`.

## Phase 5 — Review & PR (20 min)

1. Switch to **Reviewer**. Attach the diff via `#` → **Changes**. Run `/code-review`.
2. Address blockers; defer nits to follow-up issues if needed.
3. Open the PR using the GitHub MCP (or `gh pr create`). Use the spec issue as the body's `Closes #N` link.
4. Trigger your M07 PR-review workflow. Confirm the bot comment appears.

## Definition of Done

- [ ] All tests green; new backend test count ≥ 6; new frontend test count ≥ 2
- [ ] Endpoint responds with correct JSON for ≥ 1 curl example in the README
- [ ] Frontend tab visible at <http://localhost:5173> and renders prices
- [ ] No High/Critical security findings outstanding
- [ ] ADR committed under `sample-app-<stack>/docs/adr/`
- [ ] `docs/openapi.yaml` updated
- [ ] PR opened with a description listing every accepted Copilot decision and every override

## Reflection (200–400 words — the most valuable part)

1. **Where the agent saved the most time.**
2. **Where it cost you time** (re-prompts, undoing wrong changes, missed conventions).
3. **One concrete change** to your `.github/copilot-instructions.md`, prompt files, or `AGENTS.md` to make next time better.
4. **A rule for when *not* to use agent mode** in your real Publix repos.

## Stretch

- Use the SQLite MCP to seed realistic store data and validate the override stub end-to-end.
- Add an "approve-if-trivial" path in the M07 PR-review Action.
- Build a tiny eval harness (`evals/weekly-ad-preview.md`) — 5 inputs × 2 prompt variants × score — and pick the winner empirically.

## Hints

[hints/HINTS.md](hints/HINTS.md)
