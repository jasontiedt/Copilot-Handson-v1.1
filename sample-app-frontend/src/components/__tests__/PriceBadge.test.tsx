import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PriceBadge } from '../PriceBadge';

describe('PriceBadge', () => {
  it('renders a fixed-2 dollar amount', () => {
    render(<PriceBadge price={3.4} />);
    expect(screen.getByTestId('price-badge')).toHaveTextContent('$3.40');
  });

  it('adds "/ lb" suffix when weighed', () => {
    render(<PriceBadge price={0.59} weighed />);
    expect(screen.getByTestId('price-badge')).toHaveTextContent('$0.59 / lb');
  });
});
