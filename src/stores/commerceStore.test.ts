import { beforeEach, describe, expect, it } from 'vitest';
import { sanitizeCartLines, useCommerceStore } from './commerceStore';

describe('commerce store', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
  });

  it('adds products, accumulates quantities and clamps them to available stock', () => {
    const store = useCommerceStore.getState();

    store.addToCart('prod-022', 10);
    useCommerceStore.getState().addToCart('prod-022', 10);
    expect(useCommerceStore.getState().cart).toEqual([{ productId: 'prod-022', quantity: 17 }]);

    useCommerceStore.getState().setCartQuantity('prod-022', 2.9);
    expect(useCommerceStore.getState().cart[0].quantity).toBe(2);
    useCommerceStore.getState().setCartQuantity('prod-022', Number.NaN);
    expect(useCommerceStore.getState().cart[0].quantity).toBe(1);
  });

  it('reports the quantity really added and keeps a favorite when no stock remains', () => {
    expect(useCommerceStore.getState().addToCart('prod-032', 20)).toBe(15);
    expect(useCommerceStore.getState().addToCart('prod-032')).toBe(0);

    useCommerceStore.getState().toggleFavorite('prod-032');
    useCommerceStore.getState().moveFavoriteToCart('prod-032');
    expect(useCommerceStore.getState().favoriteIds).toContain('prod-032');
    expect(useCommerceStore.getState().cart).toContainEqual({ productId: 'prod-032', quantity: 15 });
  });

  it('sanitizes stale, duplicated and out-of-range persisted lines', () => {
    expect(sanitizeCartLines([
      { productId: 'missing-product', quantity: 50 },
      { productId: 'prod-032', quantity: 99 },
      { productId: 'prod-032', quantity: 2 },
      { productId: 'prod-001', quantity: 0 },
    ])).toEqual([
      { productId: 'prod-032', quantity: 15 },
      { productId: 'prod-001', quantity: 1 },
    ]);
  });

  it('does not add unavailable products and removes cart lines explicitly', () => {
    useCommerceStore.getState().addToCart('prod-028');
    expect(useCommerceStore.getState().cart).toEqual([]);

    useCommerceStore.getState().addToCart('prod-001');
    useCommerceStore.getState().removeFromCart('prod-001');
    expect(useCommerceStore.getState().cart).toEqual([]);
  });

  it('toggles favorites and moves an available favorite into the cart', () => {
    useCommerceStore.getState().toggleFavorite('prod-001');
    expect(useCommerceStore.getState().favoriteIds).toEqual(['prod-001']);

    useCommerceStore.getState().moveFavoriteToCart('prod-001');
    expect(useCommerceStore.getState().favoriteIds).toEqual([]);
    expect(useCommerceStore.getState().cart).toEqual([{ productId: 'prod-001', quantity: 1 }]);
  });

  it('persists only cart and favorite data in localStorage', () => {
    useCommerceStore.getState().addToCart('prod-001', 2);
    useCommerceStore.getState().toggleFavorite('prod-022');

    const persisted = JSON.parse(localStorage.getItem('marche-frais-commerce-v1') ?? '{}') as {
      state?: { cart?: unknown; favoriteIds?: unknown };
    };
    expect(persisted.state).toEqual({
      cart: [{ productId: 'prod-001', quantity: 2 }],
      favoriteIds: ['prod-022'],
    });
  });

  it('clears the cart without removing favorites', () => {
    useCommerceStore.getState().addToCart('prod-001', 2);
    useCommerceStore.getState().toggleFavorite('prod-022');

    useCommerceStore.getState().clearCart();

    expect(useCommerceStore.getState().cart).toEqual([]);
    expect(useCommerceStore.getState().favoriteIds).toEqual(['prod-022']);
  });
});
