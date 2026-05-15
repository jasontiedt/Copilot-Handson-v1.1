---
applyTo: "**"
description: Team coding standards and review expectations (sample).
---

# Team Coding Standards (Sample)

> Example only. Replace with your organization's real internal standards when adapting this curriculum.

## Naming
- Classes/types: `PascalCase`. Methods/functions: `camelCase` (Java) / `PascalCase` (C#).
- Booleans read as predicates: `isExpired`, `hasPromotion`.
- Avoid abbreviations except well-known ones (`id`, `url`, `db`).

## Structure
- One public type per file.
- Functions ≤ 40 lines and ≤ 4 parameters; otherwise extract.
- No cyclic dependencies between packages/projects.

## Errors
- Throw typed exceptions; never throw `Exception`/`Throwable` directly.
- Translate infrastructure exceptions at the boundary into domain exceptions.
- Log at the boundary, not in the middle of business logic.

## Logging
- Structured logging with key=value or JSON fields. No `println`/`Console.WriteLine` in production code.
- Never log secrets, full PAN, full tokens, or customer PII. Mask to last 4 chars max.

## Tests
- Public behavior is the unit. Avoid testing private methods directly.
- Each test asserts one behavior. Use `@DisplayName` (Java) or descriptive `[Fact]` names (C#).

## Reviews
- Address every `[blocking]` comment before merge. `[nit]` comments are author's discretion.
