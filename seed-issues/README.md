# Seed Issues

These are pre-written GitHub issues used by **Module 08** (triage, spec, coding-agent hand-off) and **Module 09** (capstone). They cover three quality levels intentionally:

| File | Quality | Used by |
|---|---|---|
| [`01-low-stock-alert.md`](01-low-stock-alert.md) | 🟢 Well-formed | M08 Exercise 8 (triage), M08 Exercise 10 (coding-agent hand-off) |
| [`02-cart-subtotal-flicker.md`](02-cart-subtotal-flicker.md) | 🟡 Vague | M08 Exercise 9 (`/issue-to-spec`) |
| [`03-duplicate-promo-question.md`](03-duplicate-promo-question.md) | 🔴 Likely duplicate | M08 Exercise 8 (triage / dedup) |
| [`04-weekly-ad-preview.md`](04-weekly-ad-preview.md) | 🟢 Capstone feature | M09 (capstone) |

## How to use these

You have two options.

### Option A — Fork this repo to your GitHub account (recommended)

```bash
# One-time: fork via the GitHub UI or with the CLI
gh repo fork --remote --clone

# Open all four seed issues in your fork in one go:
bash scripts/seed-issues.sh        # macOS / Linux / Git Bash
# or:
pwsh scripts/seed-issues.ps1       # Windows PowerShell
```

The scripts run `gh issue create --title ... --body-file seed-issues/NN-*.md` for each file. You'll end up with four open issues in your fork that the M08/M09 exercises reference by number.

### Option B — Work fully local (no GitHub fork)

Treat each `.md` file as if it were the body of an issue. Paste the contents into Chat where the exercise says "the issue body". You'll miss the coding-agent hand-off in M08 Exercise 10 (which requires a real GitHub issue), but everything else works.

## Editing

Feel free to edit the seed files to reflect your team's voice. Keep the three quality levels — that's the whole point.
