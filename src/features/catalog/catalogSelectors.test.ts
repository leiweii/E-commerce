import { describe, expect, it } from 'vitest';
import { products } from '../../data/products';
import {
  getNewProducts,
  getOrganicProducts,
  getPopularProducts,
  getPromotionProducts,
  getSeasonalProducts,
  selectProducts,
} from './catalogSelectors';

describe('catalog selectors', () => {
  it('keeps the requested limit and matching condition for each home selection', () => {
    expect(getPopularProducts(4)).toHaveLength(4);
    expect(getPopularProducts(4).every((product) => product.isPopular)).toBe(true);
    expect(getPromotionProducts(4).every((product) => product.isPromotion)).toBe(true);
    expect(getOrganicProducts(4).every((product) => product.isOrganic)).toBe(true);
    expect(getSeasonalProducts(4).every((product) => product.isSeasonal)).toBe(true);
    expect(getNewProducts(4).every((product) => product.isNew)).toBe(true);
  });

  it('returns only available matches when the limit is higher than the selection', () => {
    const promotions = getPromotionProducts(100);

    expect(promotions.length).toBeLessThanOrEqual(products.length);
    expect(promotions.every((product) => product.previousPriceCents !== undefined)).toBe(true);
  });

  it('supports an empty source collection', () => {
    expect(selectProducts([], (product) => product.isPopular, 4)).toEqual([]);
  });

  it('keeps catalogue identifiers and slugs unique', () => {
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
  });
});
