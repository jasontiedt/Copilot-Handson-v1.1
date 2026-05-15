# Hints — Module 01

Open only after 10 minutes of genuine effort.

## Stuck running the apps

- Java: confirm JDK 21 with `java -version`. If `mvn` not found, see [PREREQUISITES.md](../../PREREQUISITES.md).
- .NET: confirm `dotnet --version` ≥ 8.0.
- Frontend: `npm run dev` failed? Delete `node_modules` and retry. Confirm Node ≥ 20.
- CORS / network errors in the browser? You probably hit the backend directly (`localhost:8080`). Use the Vite proxy via <http://localhost:5173>.

## Stuck with the `#` picker

- Type `#` and **wait** for the quick-pick menu. Don't type `file:` after it.
- If Symbols is empty, the language server is still indexing. Open the file, wait for the status-bar spinner, retry — or use **Selection** instead.
- The chip in the input may render as `#file:Foo.java` text or as a pill — both are correct. The chip is the attachment.

## Stuck choosing a mode

| Want | Use |
|---|---|
| Insert a few lines at the cursor | Inline (Ctrl+I) |
| Discuss code, get an explanation | Ask |
| Shape a multi-step approach before any code is written | Plan |
| Run commands, execute a multi-step plan | Agent |

## Stuck writing a prompt file

- Frontmatter must be valid YAML, between `---` fences, at the very top of the file.
- `mode: agent` is required if you want to allow tool calls. `ask` is the safer default for read-only prompts.
- After saving, the prompt does not appear under `/`? Reload the window (Command Palette → *Developer: Reload Window*).
- Keep the body under 200 lines. Anything longer is a sign two prompts are hiding inside one.
