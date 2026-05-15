**Title:** Add a "low-stock" badge to the products list

## Summary

When a SKU's on-hand count drops below a configurable threshold (default 5), the products list in `sample-app-frontend` should show a "Low stock" badge next to the price.

## Acceptance criteria

- **Given** the backend reports `onHand < 5` for a SKU
- **When** the user loads the Products tab
- **Then** a visually distinct "Low stock" badge appears next to the price
- **And** the badge has an `aria-label` for screen readers

The threshold must be configurable via a new query param `?lowStockAt=N` on `GET /api/products`.

## Out of scope

- Mutation endpoints to adjust stock (already exists in `InventoryService`)
- Backend persistence of stock changes (in-memory is fine for now)

## Notes for the assignee

- A new typed field on `Product` (`onHand: number`) is required in both backends and the frontend `client.ts`.
- The existing `PriceBadge` component is a good place to compose with, not modify.

## Definition of Done

- New backend endpoint accepts the optional query param
- Frontend renders the badge for low-stock SKUs
- Tests added: 1 backend unit test, 1 frontend component test
- `docs/openapi.yaml` updated
