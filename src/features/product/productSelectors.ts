import { products } from '../../data/products';
import type { Product } from '../../types/catalog';

export const findProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export function calculateDiscountPercentage(
  priceCents: number,
  previousPriceCents?: number,
): number | undefined {
  if (previousPriceCents === undefined || previousPriceCents <= priceCents) return undefined;
  return Math.round(((previousPriceCents - priceCents) / previousPriceCents) * 100);
}

export const getSimilarProducts = (product: Product, limit: number): Product[] =>
  products
    .filter((candidate) => candidate.categoryId === product.categoryId && candidate.id !== product.id)
    .sort((first, second) => Number(second.isPopular) - Number(first.isPopular) || second.rating - first.rating)
    .slice(0, Math.max(0, limit));
