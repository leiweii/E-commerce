export type CategoryIconName =
  | 'apple'
  | 'milk'
  | 'pantry'
  | 'croissant'
  | 'bottle'
  | 'leaf'
  | 'bowl'
  | 'cookie';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: CategoryIconName;
}

export type ProductUnit = 'pièce' | 'kg' | 'lot' | 'bouteille' | 'paquet' | 'pot';

export interface ProductImage {
  src: string;
  alt: string;
  variant?: 'default' | 'detail';
}

export interface NutritionFacts {
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  protein: number;
  salt: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  brand: string;
  priceCents: number;
  previousPriceCents?: number;
  unit: ProductUnit;
  packageSize: string;
  images: readonly [ProductImage, ...ProductImage[]];
  origin: string;
  conservation?: string;
  ingredients: string[];
  allergens: string[];
  nutrition: NutritionFacts;
  stock: number;
  isOrganic: boolean;
  isPromotion: boolean;
  isNew: boolean;
  isSeasonal: boolean;
  isPopular: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}
