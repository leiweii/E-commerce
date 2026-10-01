import { products } from '../../data/products';
import type { Product } from '../../types/catalog';

type ProductPredicate = (product: Product) => boolean;

export function selectProducts(
  source: readonly Product[],
  predicate: ProductPredicate,
  limit: number,
): Product[] {
  return source.filter(predicate).slice(0, Math.max(0, limit));
}

export const getPopularProducts = (limit: number): Product[] =>
  selectProducts(products, (product) => product.isPopular, limit);

export const getPromotionProducts = (limit: number): Product[] =>
  selectProducts(
    products,
    (product) => product.isPromotion && product.previousPriceCents !== undefined,
    limit,
  );

export const getOrganicProducts = (limit: number): Product[] =>
  selectProducts(products, (product) => product.isOrganic, limit);

export const getSeasonalProducts = (limit: number): Product[] =>
  selectProducts(products, (product) => product.isSeasonal, limit);

export const getNewProducts = (limit: number): Product[] =>
  selectProducts(products, (product) => product.isNew, limit);
