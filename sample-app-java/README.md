# Sample App — Grocery Pricing & Inventory API (Java)

A minimal Spring Boot 3 service used as the **shared scenario** across the lab curriculum. Intentionally has gaps in tests, documentation, and security hardening so labs have something concrete to improve.

## Domain

A simplified grocery pricing engine for grocery-store scenarios:

- `Product` — SKU, name, unit price, taxable flag
- `WeeklyAd` — promotion rules (BOGO, percent-off, dollar-off, "buy N for $X")
- `CartLine` — SKU + quantity (or weight in lbs)
- `PricingEngine` — applies the best matching promo per line and computes totals
- `InventoryService` — adjusts on-hand counts and prevents oversell

## Quick start

```bash
cd sample-app-java
mvn -q -DskipTests package
mvn spring-boot:run
# then in another terminal
curl http://localhost:8080/api/products
```

## Project layout

```
src/main/java/com/example/grocery/
  GroceryApplication.java
  pricing/
    Product.java          # record
    WeeklyAd.java         # sealed interface w/ promo variants
    CartLine.java
    PricingEngine.java    # the core lab target
  inventory/
    InventoryService.java
  api/
    ProductController.java
    PricingController.java
src/test/java/com/example/grocery/
  pricing/PricingEngineTest.java   # sparse on purpose — M04 expands it
```

## Known issues (deliberate — used by modules)

- `PricingEngine.apply` does not handle stacking conflicts deterministically (M04, M06, M07).
- `ProductController.search` logs raw user input (log injection — M07).
- Missing Javadoc on public methods (M05).
- `InventoryService.adjust` is not thread-safe (M06).
- No correlation-id logging (M09 stretch).

## Run tests

```bash
mvn test
```
