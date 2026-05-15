# Hints — Module 03

## Backend

- If `mvn test` runs slowly, `mvn -Dtest=PricingEngineTest test` is fine for the inner loop.
- If `dotnet test` is rebuilding everything, `dotnet test --no-build` after a successful `dotnet build` is faster.
- Don't accept a test that passes on the first run — that means it's testing what the code does, not what it *should* do. Make it red first.

## BOGO at qty=1

If your `apply` implementation gives a discount at `qty=1`, you've found the off-by-one. The correct formula is `paid = ceil(qty / 2) * price`. Write the test before you fix it.

## Frontend

- Vitest auto-discovers `*.test.tsx` files. If `npm test` shows "no tests found", confirm the file ends in `.test.tsx` and isn't `.test.ts.tsx`.
- `screen.getByTestId('price-badge')` is the safest selector here. Avoid `getByText` when the price format is the thing under test.
- Strike-through is typically `<del>` or a class; testing for the *element type* is more durable than testing for inline styles.

## API drift test

- `vi.spyOn(globalThis, 'fetch')` works without msw if you don't need response shaping.
- Want type checking? Cast the mock through `as unknown as typeof fetch` once and reuse.
