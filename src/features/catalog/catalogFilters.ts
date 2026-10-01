import type { Product } from '../../types/catalog';

export const CATALOG_PAGE_SIZE = 12;

export type CatalogSort = 'popularity' | 'price-asc' | 'price-desc' | 'newest';

export interface CatalogFilters {
  query: string;
  categoryIds: string[];
  minPriceCents?: number;
  maxPriceCents?: number;
  organicOnly: boolean;
  promotionOnly: boolean;
  availableOnly: boolean;
  sort: CatalogSort;
  page: number;
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  query: '',
  categoryIds: [],
  organicOnly: false,
  promotionOnly: false,
  availableOnly: false,
  sort: 'popularity',
  page: 1,
};

const SORT_VALUES: CatalogSort[] = ['popularity', 'price-asc', 'price-desc', 'newest'];

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').trim();

const parsePrice = (value: string | null): number | undefined => {
  if (!value) return undefined;
  const amount = Number(value.replace(',', '.'));
  return Number.isFinite(amount) && amount >= 0 ? Math.round(amount * 100) : undefined;
};

const parsePage = (value: string | null): number => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  const sort = params.get('sort');

  return {
    query: params.get('q')?.trim() ?? '',
    categoryIds: params.get('category')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [],
    minPriceCents: parsePrice(params.get('minPrice')),
    maxPriceCents: parsePrice(params.get('maxPrice')),
    organicOnly: params.get('organic') === '1',
    promotionOnly: params.get('promotion') === '1',
    availableOnly: params.get('available') === '1',
    sort: SORT_VALUES.includes(sort as CatalogSort) ? sort as CatalogSort : 'popularity',
    page: parsePage(params.get('page')),
  };
}

export function serializeCatalogFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.categoryIds.length > 0) params.set('category', filters.categoryIds.join(','));
  if (filters.minPriceCents !== undefined) params.set('minPrice', String(filters.minPriceCents / 100));
  if (filters.maxPriceCents !== undefined) params.set('maxPrice', String(filters.maxPriceCents / 100));
  if (filters.organicOnly) params.set('organic', '1');
  if (filters.promotionOnly) params.set('promotion', '1');
  if (filters.availableOnly) params.set('available', '1');
  if (filters.sort !== DEFAULT_CATALOG_FILTERS.sort) params.set('sort', filters.sort);
  if (filters.page > 1) params.set('page', String(filters.page));
  return params;
}

export function filterAndSortProducts(
  source: readonly Product[],
  filters: CatalogFilters,
): Product[] {
  const query = normalize(filters.query);
  const filtered = source.filter((product) => {
    const searchableText = normalize(`${product.name} ${product.brand}`);
    return (!query || searchableText.includes(query))
      && (filters.categoryIds.length === 0 || filters.categoryIds.includes(product.categoryId))
      && (filters.minPriceCents === undefined || product.priceCents >= filters.minPriceCents)
      && (filters.maxPriceCents === undefined || product.priceCents <= filters.maxPriceCents)
      && (!filters.organicOnly || product.isOrganic)
      && (!filters.promotionOnly || product.isPromotion)
      && (!filters.availableOnly || product.stock > 0);
  });

  return filtered.sort((first, second) => {
    if (filters.sort === 'price-asc') return first.priceCents - second.priceCents;
    if (filters.sort === 'price-desc') return second.priceCents - first.priceCents;
    if (filters.sort === 'newest') return Number(second.isNew) - Number(first.isNew);
    if (first.isPopular !== second.isPopular) return Number(second.isPopular) - Number(first.isPopular);
    return second.reviewCount - first.reviewCount || second.rating - first.rating;
  });
}

export const getVisibleProducts = (
  source: readonly Product[],
  page: number,
  pageSize = CATALOG_PAGE_SIZE,
): Product[] => source.slice(0, Math.max(1, page) * pageSize);
