# Prerequisites

Complete this checklist **before** the workshop starts. We will not stop to install tooling during Module 01.

## All learners

- [ ] **VS Code** latest stable
- [ ] **GitHub Copilot** + **Copilot Chat** extensions, signed in with a license that includes **Ask / Plan / Agent** modes and MCP
- [ ] **Git** ≥ 2.40
- [ ] **GitHub CLI** (`gh`) installed and authenticated (`gh auth login`) — used in M07/M08 against your fork of this repo
- [ ] **Docker Desktop** (used for the GitHub MCP server in M07; optional if you use the native MCP binary)
- [ ] **Node.js ≥ 20** and **npm** (required for the frontend used from M01 onward)

### Confirm Copilot is current

- Open Chat. Confirm the mode picker shows **Ask**, **Plan**, and **Agent**. If it shows **Edit**, update the Copilot Chat extension.
- Click the **model picker** under the chat input. Pin one frontier model (e.g. *Claude Sonnet 4* or *GPT-5*) for hard tasks and one fast model (e.g. *GPT-4.1 mini*) for routine work. You'll switch between them throughout the workshop.
- Open the **MCP** view in the Activity Bar. You don't need any servers configured yet — just confirm the view exists; M07 wires up servers.

## Backend — pick at least one

### Java track

- [ ] **JDK 21** (`java -version` shows 21)
- [ ] **Maven 3.9+** (`mvn -v`)
- [ ] **VS Code extensions:** *Extension Pack for Java*, *Spring Boot Extension Pack*

### .NET track

- [ ] **.NET SDK 8** (`dotnet --version` shows 8.x)
- [ ] **VS Code extensions:** *C# Dev Kit*

## Verify the apps run (10 min)

Clone this repo, then:

```bash
# Backend — Java
cd sample-app-java && mvn -q -DskipTests package && mvn spring-boot:run
# or .NET
cd sample-app-dotnet && dotnet build && dotnet run --project src/Publix.Grocery.Api
```

```bash
# Frontend (in a second terminal)
cd sample-app-frontend
npm install
npm run dev            # API_PORT=5080 npm run dev   for the .NET backend
```

Open <http://localhost:5173>. You should see three products and a working **Cart preview → Get quote** button.

## Optional but recommended

- [ ] **Fork this repository** to your GitHub account before M07 — the fork is where you'll open PRs and issues. `gh repo fork --remote --clone` does it in one command. No need to create a separate scratch repo: this repo already ships with seeded issues ([`seed-issues/`](seed-issues/README.md)) and a PR-review GitHub Action.
- [ ] **GitHub Personal Access Token** with `repo` scope, available to paste when VS Code prompts (M07).
- [ ] Disable email/Slack notifications for two hours when running M08.

## If something doesn't work

- Java/Maven path issues → re-open VS Code from a fresh terminal so it inherits your `PATH`.
- `npm run dev` errors about ports → another process is on 5173 or your chosen API port. Stop it or override (`API_PORT=...`).
- Copilot Chat doesn't list any prompts → reload the window (Command Palette → *Developer: Reload Window*). Confirm `.github/prompts/` is present.
