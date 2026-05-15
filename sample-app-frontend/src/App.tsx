import { useState } from 'react';
import { CartPage } from './pages/CartPage';
import { ProductsPage } from './pages/ProductsPage';

type Tab = 'products' | 'cart';

export function App() {
  const [tab, setTab] = useState<Tab>('products');
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Publix Grocery — Demo</h1>
      <nav style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setTab('products')} aria-pressed={tab === 'products'}>Products</button>
        <button onClick={() => setTab('cart')} aria-pressed={tab === 'cart'}>Cart preview</button>
      </nav>
      {tab === 'products' ? <ProductsPage /> : <CartPage />}
    </main>
  );
}
