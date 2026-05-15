# Module 02 — Squad Setup: Persistent AI Agent Teams 🟢

**Time:** 30 minutes · **Difficulty:** Beginner · **Surfaces:** Squad CLI + Copilot Chat

> **What is Squad?** [`@bradygaster/squad`](https://github.com/bradygaster/squad) gives you a named, persistent AI team — Lead, Frontend, Backend, Tester, Scribe — stored as plain files in `.squad/`. They live in your repo, share decisions, and accumulate project knowledge across sessions.
>
> Later modules can address `@tester`, `@frontend`, etc. instead of re-briefing Copilot every time. This module gets you a team in **three commands**.
>
> Status: **alpha software** — pin a version if you need cohort-wide reproducibility.

## Prerequisites (already covered by [PREREQUISITES.md](../../PREREQUISITES.md))

- Node.js **20+** (`node -v`)
- `gh auth status` shows authenticated

If both are good, the whole module is **three commands and a chat message**.

---

## Exercise 1 — Install and initialize (10 min) 🟢

**Try this**

```bash
npm install -g @bradygaster/squad-cli
squad doctor          # green = ready
squad init            # answer the prompts; defaults are fine
```

When `squad init` asks what you're building, paste:

> *Grocery pricing & inventory app: Java + .NET backends, React frontend. Small team: lead, frontend, backend, tester, scribe.*

Accept the proposed roster.

**Checkpoint** — `.squad/team.md` exists. `ls .squad` shows `agents/`, `decisions.md`, `routing.md`.

> Troubleshooting (only if needed): see [hints/HINTS.md](hints/HINTS.md).

---

## Exercise 2 — Talk to your team (10 min) 🟢

**Try this**

1. In VS Code Copilot Chat, open the agent picker and select **Squad**.
2. Send:

   > *Team, one-paragraph status: what's on this repo, who's on the team, what's each of you responsible for?*

3. Address one agent directly:

   > *@tester, list 3 missing test cases in `sample-app-frontend/src/components/__tests__/PriceBadge.test.tsx`. Don't write code yet.*

**Checkpoint** — a named agent (e.g. `@tester`) responded with project-specific content that references actual files.

---

## When NOT to use Squad

- Single-file edits — one plain Copilot chat is faster than spinning up a team.
- Anything against production credentials or shared infra. Never run `squad ... --yolo` outside a sandbox repo.
- Repos where you can't commit `.squad/`. Without persistence, you lose Squad's main value.

## Stretch 🟡

- Add an `@security` agent charter under `.squad/agents/security/charter.md`. Module 07 can then address it directly.
- Read the [Watch Mode](https://github.com/bradygaster/squad/blob/dev/README.md#watch-mode--ralphs-automated-polling) docs. Discuss: where would `squad triage --execute` be **dangerous** in your real org?

## Debrief

1. Which agent did you reach for first? What does that say about how you frame tasks?
2. `.squad/` is now in version control. What guardrail would you add before a teammate edits another teammate's charter on `main`?
3. How is "ask `@tester`" different from "use the Reviewer chat mode" you'll see in Module 03?

## Hints

[hints/HINTS.md](hints/HINTS.md)

## References

- [bradygaster/squad](https://github.com/bradygaster/squad) — source, samples, command reference
- [Squad CHANGELOG](https://github.com/bradygaster/squad/blob/dev/CHANGELOG.md) — pin a version for cohort reproducibility
