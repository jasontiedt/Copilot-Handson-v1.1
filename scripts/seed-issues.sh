#!/usr/bin/env bash
# Open the four seed-issues files as GitHub issues in the current repo's
# `origin` remote. Requires: `gh` authenticated. Run from repo root.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: gh CLI is not authenticated. Run 'gh auth login' first." >&2
  exit 1
fi

for file in seed-issues/0[1-9]-*.md; do
  # First line of the file is "**Title:** <title>"; extract it.
  title=$(head -n 1 "$file" | sed -E 's/^\*\*Title:\*\* //')
  body_file=$(mktemp)
  # Strip the title line; the body is everything after.
  tail -n +2 "$file" > "$body_file"
  echo "Opening: $title"
  gh issue create --title "$title" --body-file "$body_file"
  rm -f "$body_file"
done

echo "Done. Run 'gh issue list' to see them."
