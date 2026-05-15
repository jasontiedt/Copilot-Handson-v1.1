interface PriceBadgeProps {
  price: number;
  weighed?: boolean;
}

/**
 * Displays a formatted price. Adds a "/ lb" suffix for weighed items so the
 * shelf-edge UI matches in-store signage.
 */
export function PriceBadge({ price, weighed = false }: PriceBadgeProps) {
  const formatted = `$${price.toFixed(2)}`;
  return <span data-testid="price-badge">{weighed ? `${formatted} / lb` : formatted}</span>;
}
