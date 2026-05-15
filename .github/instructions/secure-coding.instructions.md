---
applyTo: "**/*.{java,cs,sql,yml,yaml,json,properties}"
description: Secure-coding rules Copilot must follow when generating or modifying these files.
---

# Secure Coding Rules

When generating or modifying matched files, Copilot **must**:

## Input handling
- Validate all external input at the boundary using an allow-list approach.
- Never concatenate user input into SQL, shell commands, file paths, or log message templates.
- Use parameterized queries / `PreparedStatement` / EF parameters only.

## AuthN / AuthZ
- Every new endpoint declares an authentication requirement and an authorization policy. Default to deny.
- Never trust client-supplied user IDs, roles, tenant IDs, or store IDs — derive them from the authenticated principal.

## Crypto & secrets
- Use platform crypto: JCE / `System.Security.Cryptography`. Never hand-roll algorithms.
- Use AES-GCM (or ChaCha20-Poly1305), SHA-256+, Argon2id / bcrypt for passwords.
- Read secrets from environment or a secret manager. Never commit secrets, even in tests — use the `TestSecrets` helper or env vars.

## HTTP
- TLS only. Reject `http://` URLs in outbound calls unless explicitly allow-listed.
- Validate redirects; cap response sizes; set sane timeouts.

## Errors
- Return generic error messages to clients; log details server-side with a correlation id.
- Never return stack traces, SQL fragments, or file paths in HTTP responses.

## Dependencies
- Prefer first-party / standard library. Justify any new third-party dependency in the PR description.
- Pin versions; do not use floating ranges in production manifests.

## When you cannot comply
Stop and ask. Do **not** generate code that violates these rules even if requested implicitly.
