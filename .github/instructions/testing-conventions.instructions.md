---
applyTo: "**/*Test*.{java,cs},**/test/**,**/tests/**"
description: Conventions for test code in this repository.
---

# Testing Conventions

## Naming
- **Java (JUnit 5):** `methodUnderTest_givenScenario_thenExpectedOutcome`. Use `@DisplayName` for human-readable text.
- **C# (xUnit):** `MethodUnderTest_GivenScenario_ThenExpectedOutcome`. Use `[Theory]` + `[InlineData]` for table-driven tests.

## Structure
- Arrange / Act / Assert with blank lines separating sections.
- One logical assertion per test (multiple `assertThat` calls on the same object are fine).
- Test data builders live next to the tests, not in production code.

## Doubles
- Mock only true external dependencies (clock, IO, HTTP, DB).
- Prefer fakes (`InMemoryRepository`) over mocks for value-object collaborators.
- Never verify on more than one mock per test.

## Coverage
- New code requires tests covering happy path + at least one failure path + boundary values.
- Do not chase line coverage — prioritize behavior coverage.

## Async / time
- Inject `Clock` / `TimeProvider` instead of calling `Instant.now()` / `DateTime.UtcNow`.
- Use Awaitility (Java) or `await` polling helpers (C#) for eventual consistency, never `Thread.Sleep` / `Task.Delay` in tests.
