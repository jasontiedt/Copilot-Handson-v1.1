# Hints — Module 08

## MCP

- Servers won't connect? Check the **Output → MCP** channel. 95% of failures are a missing PAT or a stale `npx` cache (`npx clear-npx-cache` once if needed).
- The `${input:github_pat}` syntax prompts you on first use. Never commit a real token.
- Filesystem MCP must be scoped — don't point it at `/`. The shipped config points at `./scratch/` for safety.

## GitHub Actions

- Use a per-job `permissions:` block. `models: read` is required for `actions/ai-inference`. `pull-requests: write` is required to post comments.
- The Action will skip on PRs from forks unless you allow it explicitly. That's a feature.

## Coding agent hand-off

- The agent does best on tasks that are < 200 lines of code, have an existing test pattern to mirror, and live entirely in one layer.
- It does worst on cross-cutting changes (touch 6 files), naming/design decisions, and "make this faster."
- If it spins, comment with one specific next step rather than re-prompting the whole task.
