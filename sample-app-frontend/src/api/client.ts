// Thin API client for the Grocery Pricing & Inventory backend.
// Used by both Java (8080) and .NET (5080) sample apps via the Vite proxy.

export interface Product {
  sku: string;
  name: string;
  price: number;
  taxable: boolean;
  weighed: boolean;
}

export interface CartLine {
  sku: string;
  qty: number;
}

export type WeeklyAd =
  | { kind: 'Bogo'; sku: string }
  | { kind: 'PercentOff'; sku: string; percent: number }
  | { kind: 'BuyNForX'; sku: string; n: number; total: number };

export interface QuoteResponse {
  subtotal: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error(`Products request failed: ${res.status}`);
  return res.json();
}

export async function searchProducts(q: string): Promise<Product[]> {
  const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

export async function quoteCart(cart: CartLine[], ads: WeeklyAd[]): Promise<QuoteResponse> {
  const res = await fetch('/api/pricing/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart, ads }),
  });
  if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
  return res.json();
}
