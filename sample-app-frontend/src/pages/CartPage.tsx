import { useState } from 'react';
import { quoteCart, type CartLine, type WeeklyAd } from '../api/client';

const SAMPLE_CART: CartLine[] = [
  { sku: 'MILK-1G', qty: 2 },
  { sku: 'BREAD-WW', qty: 1 },
  { sku: 'BANANA', qty: 3 },
];

const SAMPLE_ADS: WeeklyAd[] = [
  { kind: 'Bogo', sku: 'MILK-1G' },
  { kind: 'PercentOff', sku: 'BREAD-WW', percent: 20 },
];

export function CartPage() {
  const [subtotal, setSubtotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onQuote() {
    setLoading(true);
    setError(null);
    try {
      const res = await quoteCart(SAMPLE_CART, SAMPLE_ADS);
      setSubtotal(res.subtotal);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Cart preview</h2>
      <ul>
        {SAMPLE_CART.map((line) => (
          <li key={line.sku}>{line.sku} × {line.qty}</li>
        ))}
      </ul>
      <h3>Active weekly ads</h3>
      <ul>
        {SAMPLE_ADS.map((ad, i) => (
          <li key={i}>{ad.kind} — {ad.sku}</li>
        ))}
      </ul>
      <button onClick={onQuote} disabled={loading}>{loading ? 'Quoting…' : 'Get quote'}</button>
      {subtotal !== null && <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>}
      {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
    </section>
  );
}
