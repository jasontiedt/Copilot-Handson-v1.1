# Hints — Module 02

## Instructions not picking up

- `applyTo` is a comma-separated **glob list**, not a regex. `**/*.{java,cs}` (brace expansion) works in VS Code.
- Instructions are read on **every** Chat request; reload the window if you renamed a file.
- Conflicts: more specific `applyTo` doesn't automatically override broader rules. Phrase rules as guidelines, not strict bans, unless you want hard refusals.

## `AGENTS.md` tips

- Keep it short (< 100 lines). Agents skim.
- The most useful section is "How to know you're done": list the exact commands.
- If the agent skips your test command, add an explicit *"Do not declare success until `<command>` exits 0"* line.

## Frontend rule patterns

- Want to enforce typed API client usage? Phrase as *"Always import from `src/api/client.ts` — never call `fetch` directly in components."*
- For a11y rules to take effect, also show one **example** of correct usage in the instruction body.
