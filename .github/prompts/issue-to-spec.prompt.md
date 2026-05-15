---
mode: agent
description: Convert a GitHub issue into an engineering spec and a task breakdown.
---

# Issue → Spec → Tasks

Turn a fuzzy issue into something a developer (or the Copilot coding agent) can execute.

## Output

### 1. One-paragraph problem statement
Restate the user need in your own words, with the success metric.

### 2. Acceptance criteria
Given/When/Then format, 3–8 items.

### 3. Out of scope
Bullet list — explicit non-goals.

### 4. Design sketch
- Affected modules/files
- Data model changes
- API changes (request/response examples)
- Migration / backward-compat plan

### 5. Task breakdown
Numbered list of small, independently mergeable tasks. Each task: title, est. size (XS/S/M), and acceptance check.

### 6. Risks & open questions
Bullet list with the person/role best able to answer.

## Rules
- If acceptance criteria cannot be inferred, list the questions you need answered before starting.
- Tasks should be sized so any single one fits in a one-day PR.
