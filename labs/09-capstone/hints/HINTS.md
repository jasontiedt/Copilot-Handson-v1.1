# Hints — Module 09

## Scoping

- The capstone is intentionally end-to-end. If you only have an hour, do **Phases 1–3** for the backend; skip the frontend tab and ADR.
- "Best price" math = `min(regularPrice, applyWeeklyAdToOneUnit(sku))`. Don't over-engineer the override stub — a `Map<sku, function>` is fine.

## Agent guardrails

- Add to your `AGENTS.md`: *"Do not modify `sample-app-frontend/src/api/client.ts` without my approval — that file is the cross-stack contract."* Watch the agent respect it.
- If the agent skips test runs, your `AGENTS.md` is too soft. Add: *"You are not done until you have personally run `mvn test`, `dotnet test`, and `cd sample-app-frontend && npm test`, and pasted the green output into chat."*

## When stuck

- "Agent keeps choosing the wrong file" — your `#` context is broader than it needs to be. Narrow to **Symbols** or **Selection**.
- "Agent rewrites unrelated code" — add `git diff` to your AGENTS.md "before declaring done" checklist; reject if the diff has noise.
- "Tests pass but the UI is empty" — the proxy. Restart `npm run dev` after backend restarts.
