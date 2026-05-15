# Hints — Module 04

- Hover over a method *in another file* to verify your docs render correctly in the tooltip. If they don't, your block-comment fence is probably wrong (`/** */` for Javadoc/JSDoc, `///` for C# XML).
- For ADRs, the [MADR](https://adr.github.io/madr/) template is enough. Don't invent fields.
- `openapi.yaml` drift is the most common failure mode. Make it a **rule** in `.github/instructions/docs-style.instructions.md`: *"When changing an endpoint signature, also update `docs/openapi.yaml` in the same PR."*
- If JSDoc isn't picked up by VS Code IntelliSense, the file probably isn't included in `tsconfig.json`'s `include`. Confirm `src/` is covered.
