---
mode: agent
description: Generate high-value unit tests for the selected code or symbol.
---

# Generate Unit Tests

Generate unit tests for the selected code (or a symbol I attach via the `#` picker).

## Required output
1. A **coverage gap analysis** — list untested branches, edge cases, and error paths.
2. A **prioritized test list** (Must / Should / Nice).
3. The **test file** in the project's existing style and folder layout.

## Constraints
- Use the project's existing test framework and assertion library — do not introduce new dependencies.
- Follow Arrange-Act-Assert and name tests as `MethodUnderTest_Scenario_ExpectedOutcome`.
- Cover: happy path, boundary values, null/empty/zero, invalid input, exception paths, and one concurrency or ordering case if relevant.
- Mock only true external dependencies (clock, IO, HTTP, DB). Prefer fakes over mocks for value objects.
- Do **not** modify production code in this turn. If a test reveals the code is untestable, list the smallest seam needed and stop.
