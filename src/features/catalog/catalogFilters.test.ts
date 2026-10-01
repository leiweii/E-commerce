import { describe, expect, it } from 'vitest';
import { products } from '../../data/products';
import type { Product } from '../../types/catalog';
import {
  DEFAULT_CATALOG_FILTERS,
  filterAndSortProducts,
  getVisibleProducts,
  parseCatalogFilters,
  serializeCatalogFilters,
} from './catalogFilters';

const product = (overrides: Partial<Product>): Product => ({
  ...products[0],
  id: `test-${Math.random()}`,
  ...overrides,
});

describe('catalog filters', () => {
  it('searches product names and brands without case or accent sensitivity', () => {
    const source = [
      product({ name: 'Purée d’amandes', brand: 'Atelier Végétal' }),
      product({ name: 'Pommes Gala', brand: 'Vergers du Val' }),
    ];

    expect(filterAndSortProducts(source, { ...DEFAULT_CATALOG_FILTERS, query: 'PUREE' })).toHaveLength(1);
    expect(filterAndSortProducts(source, { ...DEFAULT_CATALOG_FILTERS, query: 'vegetal' })[0].name).toBe('Purée d’amandes');
  });

  it('combines category, price, organic, promotion and availability filters', () => {
    const matching = product({ categoryId: 'bio', priceCents: 450, isOrganic: true, isPromotion: true, stock: 4 });
    const source = [
      matching,
      product({ categoryId: 'bio', priceCents: 900, isOrganic: true, isPromotion: true, stock: 4 }),
      product({ categoryId: 'bio', priceCents: 450, isOrganic: true, isPromotion: true, stock: 0 }),
      product({ categoryId: 'epicerie', priceCents: 450, isOrganic: true, isPromotion: true, stock: 4 }),
    ];

    const result = filterAndSortProducts(source, {
      ...DEFAULT_CATALOG_FILTERS,
      categoryIds: ['bio'],
      minPriceCents: 400,
      maxPriceCents: 500,
      organicOnly: true,
      promotionOnly: true,
      availableOnly: true,
    });

    expect(result).toEqual([matching]);
  });

  it.each([
    ['price-asc', ['low', 'middle', 'high']],
    ['price-desc', ['high', 'middle', 'low']],
    ['newest', ['high', 'low', 'middle']],
    ['popularity', ['middle', 'low', 'high']],
  ] as const)('sorts products by %s', (sort, expected) => {
    const source = [
      product({ id: 'middle', priceCents: 500, isNew: false, isPopular: true, rating: 4.8, reviewCount: 200 }),
      product({ id: 'high', priceCents: 900, isNew: true, isPopular: false, rating: 4.2, reviewCount: 20 }),
      product({ id: 'low', priceCents: 200, isNew: true, isPopular: false, rating: 4.5, reviewCount: 80 }),
    ];

    expect(filterAndSortProducts(source, { ...DEFAULT_CATALOG_FILTERS, sort }).map(({ id }) => id)).toEqual(expected);
  });

  it('reads valid filters from the URL and ignores invalid values', () => {
    const params = new URLSearchParams('q=cafe&category=bio,epicerie&minPrice=2.5&maxPrice=nope&organic=1&available=1&sort=price-desc&page=2');

    expect(parseCatalogFilters(params)).toEqual({
      ...DEFAULT_CATALOG_FILTERS,
      query: 'cafe',
      categoryIds: ['bio', 'epicerie'],
      minPriceCents: 250,
      organicOnly: true,
      availableOnly: true,
      sort: 'price-desc',
      page: 2,
    });
  });

  it('serializes only active filters and exposes products by page', () => {
    const filters = { ...DEFAULT_CATALOG_FILTERS, query: 'pomme', organicOnly: true, page: 2 };

    expect(serializeCatalogFilters(filters).toString()).toBe('q=pomme&organic=1&page=2');
    expect(getVisibleProducts(products, 2, 12)).toHaveLength(24);
    expect(getVisibleProducts(products, 4, 12)).toHaveLength(products.length);
  });

  it('makes the availability filter meaningful with the local catalogue', () => {
    const available = filterAndSortProducts(products, { ...DEFAULT_CATALOG_FILTERS, availableOnly: true });

    expect(available.length).toBeLessThan(products.length);
    expect(available.every(({ stock }) => stock > 0)).toBe(true);
  });
});
