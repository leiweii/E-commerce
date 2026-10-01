import { describe, expect, it } from 'vitest';
import { products } from '../../data/products';
import { calculateDiscountPercentage, findProductBySlug, getSimilarProducts } from './productSelectors';

describe('product selectors', () => {
  it('finds a product by its route slug', () => {
    expect(findProductBySlug('pommes-gala-france')?.id).toBe('prod-001');
    expect(findProductBySlug('produit-inconnu')).toBeUndefined();
  });

  it('calculates a rounded promotion percentage only with a valid former price', () => {
    expect(calculateDiscountPercentage(795, 890)).toBe(11);
    expect(calculateDiscountPercentage(890)).toBeUndefined();
    expect(calculateDiscountPercentage(900, 800)).toBeUndefined();
  });

  it('returns distinct products from the same category', () => {
    const current = products.find(({ slug }) => slug === 'pommes-gala-france');
    expect(current).toBeDefined();

    const similar = getSimilarProducts(current!, 3);
    expect(similar).toHaveLength(3);
    expect(similar.every(({ categoryId }) => categoryId === current!.categoryId)).toBe(true);
    expect(similar.some(({ id }) => id === current!.id)).toBe(false);
  });
});
