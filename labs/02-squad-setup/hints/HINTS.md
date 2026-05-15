# Hints — Module 02 (Squad Setup)

Open only when stuck. Each section nudges progressively.

## Install

- `npm install -g @bradygaster/squad-cli` failing with EACCES means your global npm prefix is in a system path. Don't `sudo`; instead: `npm config set prefix ~/.npm-global && export PATH=~/.npm-global/bin:$PATH` (add the export to your shell rc file).
- `command not found: squad` after install usually means your shell hasn't reloaded `PATH`. Open a fresh terminal.
- Pin the version for reproducibility: `npm install -g @bradygaster/squad-cli@<version>`. Check releases on GitHub.

## `squad init`

- The `init` command must run inside a **git** repo. From the workspace root, confirm with `git status` first.
- If `init` prompts you for things you don't know (cloud preferences, deployment target), say "skip" — for this lab the defaults are fine.
- It writes `.squad/team.md` + per-agent `charter.md` files. If you don't see them, re-run with `--verbose` and check the **last** line of output for the actual path it wrote to (some installs default to `.ai-team/`).

## Copilot Chat integration

- The "Squad" entry in VS Code Copilot Chat's agent picker only appears **after** `.squad/` exists in the workspace. Run `squad init` first, then reload the window.
- If the agent says "I don't know about this project yet," your team has no `history.md` populated. Ask it explicitly: *"Read the README and `sample-app-*/README.md`. Summarize what you learned. Write it to your `history.md`."*

## `@AgentName` routing

- Agent names are **case-insensitive** but must match `.squad/team.md`. Typos route to the coordinator instead, which often answers in a generic voice.
- `@everyone` and `@team` are not Squad conventions — use the literal coordinator address ("Team, ...") or a single `@name`.

## Decisions

- `decisions.md` is plain Markdown. Edit it directly when an agent records something inaccurately. There is no separate "decisions DB" — the file IS the source of truth.
- Don't let agents write speculative decisions ("we *might* prefer X"). Decisions should be settled when written. Reject and re-ask if a draft is hedged.

## Committing

- `.squad/log/` can get noisy. Some teams `.gitignore` `log/` while committing everything else under `.squad/`. The lab does **not** do this — the noise is useful for the cohort retro.
- Never commit a PAT, OpenAI key, or any other secret to `.squad/`. Grep your diff: `git diff --staged .squad | grep -Ei "token|key|secret|pat=|api[-_]?key"`.

## Going wrong

- If everything goes sideways, you can reset cleanly: `rm -rf .squad && squad init`. Commit before doing this so the team history isn't lost.
- `squad doctor` is the first command to run on any unexpected behavior. It checks the install, auth, repo state, and config in one pass.
- `squad nap` (context hygiene) can help if agents seem to be "remembering" stale context. Run with `--dry-run` first to preview.

## When in doubt — fall back

- Squad is alpha. If a command is unfamiliar or behaves oddly, **drop back to plain Copilot Chat** for the rest of the module. The subsequent labs (03+) do not strictly require Squad. You can return to Squad after the cohort moves on.
