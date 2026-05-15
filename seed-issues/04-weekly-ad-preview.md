**Title:** Feature: Weekly Ad Preview tab

## Summary

Add a "Weekly Ad Preview" feature so store associates can see, before opening, what the active weekly ads look like for a given store.

## Backend

`GET /api/pricing/weekly-ad/preview?storeId=NNN` returns:

```json
{
  "storeId": "0123",
  "items": [
    {
      "sku": "MILK-1G",
      "name": "Whole Milk 1gal",
      "regularPrice": 3.49,
      "bestPrice": 1.75,
      "appliedAd": { "kind": "Bogo", "sku": "MILK-1G" }
    }
  ]
}
```

"Best price" is `min(regularPrice, applyWeeklyAdToOneUnit(sku))` across all active ads. Include a stub for store-specific override rules so we can wire it up later.

## Frontend

A new tab in `sample-app-frontend/` (next to Products / Cart preview) that calls the new endpoint and renders each SKU with regular price (struck-through if discounted) and best price.

## Definition of Done

- New backend endpoint with ≥ 6 unit tests
- New frontend tab with ≥ 2 component tests
- `docs/openapi.yaml` updated
- ADR under `sample-app-<stack>/docs/adr/` for the override mechanism
- PR opened with the spec issue linked via `Closes #N`
- No High/Critical security findings on the new files

## Out of scope

- Persisting overrides (the stub is fine)
- Per-user authorization (separate ticket)
- Real store data (use the seeded SQLite from M08 if you want, otherwise hard-coded fixtures)
