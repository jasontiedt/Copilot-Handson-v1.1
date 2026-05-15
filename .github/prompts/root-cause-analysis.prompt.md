---
mode: ask
description: Produce a written root-cause analysis for a confirmed defect.
---

# Root Cause Analysis

Produce an RCA suitable for posting on a ticket or incident channel.

## Sections
1. **Impact** — who/what was affected, time window, severity.
2. **Timeline** — bullet timeline of detection, escalation, mitigation, resolution (UTC).
3. **Root cause** — the *why*, not just the *what*. Use 5-Whys if helpful.
4. **Contributing factors** — process, tooling, or knowledge gaps.
5. **Fix** — code change reference (PR/commit) and verification steps.
6. **Prevention** — concrete actions, each with an owner placeholder and a test/alert/doc artifact.

## Rules
- Blameless tone. Describe systems and decisions, not people.
- Cite evidence (logs, metrics, code) for every claim.
- If information is missing, list the gaps under "Open questions" rather than inventing facts.
