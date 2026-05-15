# Advanced GitHub Copilot — Hands-On Lab Curriculum

A hands-on, scenario-driven curriculum for engineers who already use GitHub Copilot for autocomplete and want to master its **advanced** capabilities: the `#` context picker, prompt files, custom instructions, chat modes, MCP servers, agent mode, secure-coding workflows, PR-review automation, and issue/work-item automation.

> **One project, eight modules.** Every module builds on the same shared application — a *Grocery Pricing & Inventory* service with parallel **Java (Spring Boot)** and **.NET (ASP.NET Core)** backends and a **React + Vite** frontend. Get set up once in Module 01; reuse for the rest of the day.

---

## Who this is for

- Developers, SDETs, tech leads, and platform engineers who use Copilot daily and want to go deeper.
- Mixed-skill cohorts: each module is tagged 🟢 Beginner / 🟡 Intermediate / 🔴 Advanced with stretch goals.

## What you will build / learn

- The `#` context picker (Files, Symbols, Selection, Changes…) and when each one wins.
- Authoring **prompt files** (`.prompt.md`) and **custom instructions** (`.instructions.md`, `copilot-instructions.md`, `AGENTS.md`).
- Driving **TDD**, **debugging**, **documentation**, **code review**, and **secure-coding** loops with Chat — across **backend and frontend**.
- Configuring and using **MCP servers** (GitHub, filesystem, SQLite) from inside VS Code.
- Automating **PR reviews** and **issue triage** via GitHub.com Copilot, the **coding agent**, and a GitHub Action.
- Delivering a real vertical-slice feature end-to-end in agent mode.

## Curriculum at a glance

| # | Module | Level | Time | Primary surfaces |
|---|---|---|---|---|
| [01](labs/01-foundations/README.md) | Foundations: Context, Prompts & Modes | 🟢 | 75m | Chat (Ask / Plan / Agent) + Prompt Files |
| [02](labs/02-custom-instructions/README.md) | Custom Instructions & Project Standards | 🟡 | 75m | Workspace customization + Chat |
| [03](labs/03-tdd-across-stack/README.md) | TDD Across the Stack | 🟢🟡 | 90m | Chat + Inline + Edit + Terminal |
| [04](labs/04-documentation/README.md) | Documentation Everywhere | 🟢 | 60m | Chat + Edit |
| [05](labs/05-debugging/README.md) | Debugging Across the Stack | 🟡 | 75m | Chat + Terminal + Debugger + Browser |
| [06](labs/06-review-and-security/README.md) | Code Review & Secure Coding | 🟡🔴 | 90m | Reviewer / Security Auditor modes |
| [07](labs/07-automation/README.md) | Automation: MCP, PR Review & Issues | 🔴 | 2h | Agent + MCP + GitHub.com + Actions |
| [08](labs/08-capstone/README.md) | Capstone: Agent Mode End-to-End | 🔴 | 2–3h | Agent + everything |

## Suggested delivery tracks

- **Half-day (~4h):** Modules 01, 02, 03, 04
- **Full-day (~8h):** Modules 01–06
- **Two-day (~14h):** All eight modules + the M07/M08 stretch goals

## Repository layout

```
.github/
  copilot-instructions.md     Repo-wide instructions
  instructions/               Path-scoped instructions (applyTo globs)
  prompts/                    Reusable prompt files (invoke from Chat with /<name>)
  chatmodes/                  Custom chat modes (Reviewer, Security Auditor)
  workflows/copilot-review.yml  Automated PR review summary (M07)
.vscode/mcp.json              GitHub + filesystem + SQLite MCP server config (M07)
sample-app-java/              Spring Boot backend — Grocery Pricing & Inventory API
sample-app-dotnet/            ASP.NET Core backend — same API in .NET
sample-app-frontend/          React + Vite SPA that calls either backend
labs/01..08/                  Self-contained modules with hints
scripts/seed-grocery-db.sql   Sample data for the SQLite MCP demo
scratch/                      Sandbox dir for MCP filesystem server (git-ignored)
FACILITATOR-GUIDE.md          Timing, cohort sizing, debrief prompts, rubric
INSTRUCTOR-SCRIPT.md          Minute-by-minute opening live-demo script
PREREQUISITES.md              Setup checklist
```

## Before you start

1. Read [PREREQUISITES.md](PREREQUISITES.md) and complete the setup checklist.
2. Pick your backend stack: **Java** (`sample-app-java/`) or **.NET** (`sample-app-dotnet/`).
3. Start the backend, then start the frontend ([`sample-app-frontend/README.md`](sample-app-frontend/README.md)). Module 01 walks you through this.

## Conventions used in every module

- **Goal** — what you should be able to do at the end of the exercise.
- **Try this** — open-ended prompt for the learner; no solution inline.
- **Checkpoint** — a verifiable outcome (test passes, file exists, command output).
- **Stretch** — optional advanced task.
- **Hints** — progressive nudges in `hints/HINTS.md` (open only when stuck).
- **Debrief** — discussion questions for cohort or self-reflection.

## Facilitators

- [INSTRUCTOR-SCRIPT.md](INSTRUCTOR-SCRIPT.md) — minute-by-minute live-demo script for the opening 90 minutes (run **before** learners start Module 01).
- [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md) — timing, cohort sizing, debrief prompts, and the **competency rubric** (Novice → Practitioner → Advanced → Coach).
