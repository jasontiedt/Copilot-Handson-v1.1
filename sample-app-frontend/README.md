# Publix Grocery — Frontend (React + Vite)

Minimal React/Vite SPA that calls the Java or .NET backend. Used by every lab module from M03 onward.

## Run

```bash
cd sample-app-frontend
npm install

# In another terminal: start Java backend (port 8080)
#   cd ../sample-app-java && mvn spring-boot:run
# OR start .NET backend (port 5080)
#   cd ../sample-app-dotnet && dotnet run --project src/Publix.Grocery.Api

npm run dev          # defaults to proxying /api -> http://localhost:8080
# For .NET:
# API_PORT=5080 npm run dev
```

Open <http://localhost:5173>.

## Test

```bash
npm test
```

## Layout

| Path | Purpose |
|---|---|
| `src/api/client.ts` | Typed fetch wrapper for `/api/products`, `/api/products/search`, `/api/pricing/quote` |
| `src/pages/ProductsPage.tsx` | List + search; used in M05 (debugging) and M06 (XSS review) |
| `src/pages/CartPage.tsx` | Cart + ads quote button; used in M08 capstone |
| `src/components/PriceBadge.tsx` | Tiny component — target of M03 frontend TDD |

## API contract (must match both backends)

```
GET  /api/products              -> Product[]
GET  /api/products/search?q=    -> Product[]
POST /api/pricing/quote         -> { subtotal: number }
       body: { cart: CartLine[], ads: WeeklyAd[] }
```
