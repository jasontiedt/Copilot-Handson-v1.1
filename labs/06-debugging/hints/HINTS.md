# Hints — Module 06

## Race conditions are flaky on purpose

- Try `Executors.newFixedThreadPool(16)` / `Parallel.For` with 100k iterations and starting stock = 50.
- Assert the invariant *during* the loop, not just at the end — the bug is intermediate negative stock.

## Debugger + Chat

- In Java, use the Test Runner's **Debug Test** lens above the method, not the regular `mvn` run.
- In .NET, the green debug arrow in Test Explorer is the equivalent.
- When stopped on a breakpoint, the Chat panel can read the variables view. You don't need to retype values.

## Frontend rules out / rules in

- If Network shows the bad subtotal in the *response*, frontend is innocent.
- If Network shows the correct subtotal but the UI shows wrong, look at `CartPage.tsx` state updates — but for this scenario, the bug is server-side.
