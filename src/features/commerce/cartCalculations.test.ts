import { describe, expect, it } from 'vitest';
import { calculateCartSummary, resolveCartItems } from './cartCalculations';

describe('cart calculations', () => {
  it('calculates subtotal, savings, delivery and total from real catalogue prices', () => {
    const items = resolveCartItems([
      { productId: 'prod-002', quantity: 2 },
      { productId: 'prod-001', quantity: 1 },
    ]);

    expect(calculateCartSummary(items)).toEqual({
      itemCount: 3,
      subtotalCents: 997,
      savingsCents: 100,
      deliveryCents: 490,
      totalCents: 1487,
    });
  });

  it('offers delivery at 50 euros and charges nothing for an empty cart', () => {
    expect(calculateCartSummary(resolveCartItems([{ productId: 'prod-022', quantity: 7 }])).deliveryCents).toBe(0);
    expect(calculateCartSummary([])).toEqual({
      itemCount: 0,
      subtotalCents: 0,
      savingsCents: 0,
      deliveryCents: 0,
      totalCents: 0,
    });
  });

  it('ignores stale catalogue identifiers when resolving persisted lines', () => {
    expect(resolveCartItems([{ productId: 'missing-product', quantity: 4 }])).toEqual([]);
  });
});
