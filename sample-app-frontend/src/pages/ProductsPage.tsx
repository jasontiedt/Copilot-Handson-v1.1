import { useEffect, useState } from 'react';
import { fetchProducts, searchProducts, type Product } from '../api/client';
import { PriceBadge } from '../components/PriceBadge';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts).catch((e: Error) => setError(e.message));
  }, []);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      setProducts(query.trim() ? await searchProducts(query) : await fetchProducts());
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <section>
      <form onSubmit={onSearch} style={{ marginBottom: '1rem' }}>
        <input
          aria-label="Search products"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {products.map((p) => (
          <li key={p.sku}>
            <strong>{p.name}</strong> ({p.sku}) — <PriceBadge price={p.price} weighed={p.weighed} />
          </li>
        ))}
      </ul>
    </section>
  );
}
