---
applyTo: "**/*.md,**/README*,**/docs/**"
description: House style for documentation in this repository.
---

# Documentation Style

## Voice
- Second person, present tense, active voice.
- Direct and concrete. Cut filler words ("simply", "just", "obviously").

## Structure
- One H1 per file matching the file's purpose.
- READMEs follow: Purpose → Quick start → Configuration → Examples → Troubleshooting → Contributing.
- ADRs follow MADR: Context, Decision, Status, Consequences.

## Code samples
- Every code block declares a language.
- Examples must be **runnable** as-is or clearly marked `// pseudocode`.
- Show the command and the expected output for CLI examples.

## Links
- Use workspace-relative Markdown links, not bare URLs.
- Never link to a file that does not exist.

## Diagrams
- Prefer Mermaid for sequence/flow/class diagrams.
- Include a one-line caption above each diagram.
