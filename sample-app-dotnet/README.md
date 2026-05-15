# Sample App — Grocery Pricing & Inventory API (.NET)

A minimal ASP.NET Core 8 service used as the **shared scenario** across the lab curriculum. Same domain as `sample-app-java/`, intentionally with gaps in tests, documentation, and security hardening.

## Quick start

```bash
cd sample-app-dotnet
dotnet build
dotnet run --project src/Publix.Grocery.Api
# in another terminal:
curl http://localhost:5080/api/products
```

## Project layout

```
src/Publix.Grocery.Api/
  Program.cs                     # minimal API endpoints
  Pricing/Product.cs             # record
  Pricing/WeeklyAd.cs            # discriminated union via abstract record
  Pricing/CartLine.cs
  Pricing/PricingEngine.cs       # core lab target
  Inventory/InventoryService.cs
tests/Publix.Grocery.Tests/
  PricingEngineTests.cs          # sparse on purpose — M03 expands it
```

## Known issues (deliberate — used by modules)

- `PricingEngine.Apply` does not handle stacking conflicts deterministically (M03, M05, M06).
- `/api/products/search` logs raw user input (log injection — M06).
- Missing XML doc comments on public APIs (M04).
- `InventoryService.Adjust` is not thread-safe (M05).
- No correlation-id middleware (M08 stretch).

## Run tests

```bash
dotnet test
```
