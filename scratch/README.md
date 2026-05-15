# Scratch directory

This folder is used by Module 08 (Automation: MCP, PR Review & Issues) as the sandbox for the **filesystem** and **sqlite** MCP servers.

- `grocery.db` is created by [scripts/seed-grocery-db.sql](../scripts/seed-grocery-db.sql).
- The contents of this folder are git-ignored (except this README).

## Seed the database

```bash
mkdir -p scratch
sqlite3 scratch/grocery.db < scripts/seed-grocery-db.sql
```

Verify:

```bash
sqlite3 scratch/grocery.db "SELECT COUNT(*) FROM sales;"
# expected: 100
```
