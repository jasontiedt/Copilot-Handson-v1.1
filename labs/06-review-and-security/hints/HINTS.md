# Hints — Module 06

## Reviewer mode

- The Chat mode picker is **per-chat**, not global. New chat resets to default — re-pick before running `/code-review`.
- If `#` → **Changes** is empty, you forgot `git add`. The pick reflects the *staged* diff.

## Log injection — what "good" looks like

- Java: use SLF4J with placeholders (`log.info("query={}", q)`) and a structured-logging encoder (logstash-logback) that escapes newlines.
- .NET: `log.LogInformation("query={Query}", q)` (structured) — the framework escapes for you.
- **Bad**: regex-stripping `\n` and `\r` from `q`. Whitelisting characters is fragile; framework-level structured logging is the real fix.

## Pushing back

- Adding *"This is for internal admin tooling"* often makes Copilot more cautious, not less. If it still complies, your instructions file is too permissive — tighten it.

## XSS / S6

- React auto-escapes `{product.name}` in JSX. The lab moment is realizing *why* you're safe and what would break that (e.g., `dangerouslySetInnerHTML`).
- A good follow-up rule: *"Never use `dangerouslySetInnerHTML` without an attached sanitizer call. Document the source of the HTML in a comment."*
