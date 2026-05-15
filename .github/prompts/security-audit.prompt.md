---
mode: agent
description: Audit code for OWASP Top 10 and common secure-coding issues.
---

# Security Audit

Audit the selected files (or whatever is attached as chat context) for security defects.

## Checklist (cite which apply)
- A01 Broken access control
- A02 Cryptographic failures (weak algos, hardcoded keys, missing TLS)
- A03 Injection (SQL, NoSQL, OS, LDAP, log injection)
- A04 Insecure design (missing rate limits, no authz on sensitive ops)
- A05 Security misconfiguration (verbose errors, default creds, open CORS)
- A06 Vulnerable / outdated components
- A07 Identification & authentication failures
- A08 Software & data integrity failures (unsafe deserialization, unsigned updates)
- A09 Security logging & monitoring failures
- A10 SSRF
- Plus: secrets in source, XXE, path traversal, prototype pollution, ReDoS, unsafe reflection.

## Output

For each finding:

```
[Severity: Critical|High|Medium|Low]
Category: <OWASP code or "Other">
File: path/to/file.ext:line
Evidence: <minimal snippet showing the issue>
Why it matters: <1–2 sentences>
Fix: <concrete, minimal patch idea>
```

Then list **what you DID NOT check** so I know the audit's limits.

## Rules
- Do not invent CVEs. If a dependency looks suspect, say "investigate" and name the package + version.
- Prefer false positives over silence on Critical/High items.
- Never paste real secrets back into the chat — redact.
