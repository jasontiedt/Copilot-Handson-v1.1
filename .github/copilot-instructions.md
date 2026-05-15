# Repository Custom Instructions

> Loaded automatically by Copilot Chat for **every** request in this repository. Keep it short, durable, and stack-aware.

This repository hosts the **Advanced Copilot Hands-On Lab Curriculum** with parallel **Java (Spring Boot)** and **.NET (ASP.NET Core)** sample applications.

## Project conventions

- Branch names: `feature/<lab-or-ticket>-<slug>`, `fix/<slug>`, `chore/<slug>`.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
- All public APIs require docs and tests. New code must not reduce coverage.
- No secrets or PII in source, tests, or fixtures. Use `.env.local` (git-ignored) and the secrets manager pattern shown in `sample-app-*/`.

## Java (Spring Boot) conventions

- JDK 21, Maven, Spring Boot 3.x.
- Test framework: **JUnit 5** + **AssertJ** + **Mockito**. Web tests use `@WebMvcTest` / `MockMvc`.
- Lombok is **not** used — prefer Java 21 records and explicit code.
- Layering: `controller` → `service` → `repository`. No JPA entities returned from controllers; use DTOs.

## .NET (ASP.NET Core) conventions

- .NET 8 (or 9), C# 12, nullable reference types **enabled**, `TreatWarningsAsErrors=true`.
- Test framework: **xUnit** + **FluentAssertions** + **NSubstitute**.
- Minimal APIs for new endpoints; controllers only when justified.
- Layering: endpoint → service → repository. Return DTOs, never EF entities.

## When generating code

- Prefer the smallest change that satisfies the request.
- Add or update tests in the same change. If you cannot test it, explain why.
- Never introduce a new dependency without naming the alternative considered.
- Cite file paths with workspace-relative links.

## When reviewing code

- Use the structure in [`.github/prompts/code-review.prompt.md`](prompts/code-review.prompt.md).
- Distinguish `[blocking]` vs `[nit]` on every comment.

## When unsure

Ask one focused clarifying question rather than guessing on intent.
