import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '../data/products';
import type { CartLine } from '../types/commerce';

interface CommerceStore {
  cart: CartLine[];
  favoriteIds: string[];
  addToCart: (productId: string, quantity?: number) => number;
  removeFromCart: (productId: string) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  moveFavoriteToCart: (productId: string) => void;
  clearCart: () => void;
}

const findProduct = (productId: string) => products.find(({ id }) => id === productId);
const normalizeQuantity = (quantity: number, stock: number) => {
  const integer = Number.isFinite(quantity) ? Math.trunc(quantity) : 1;
  return Math.min(Math.max(1, integer), stock);
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export function sanitizeCartLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();

  return value.flatMap((candidate) => {
    if (!isRecord(candidate) || typeof candidate.productId !== 'string' || typeof candidate.quantity !== 'number') return [];
    const product = findProduct(candidate.productId);
    if (!product || product.stock <= 0 || seen.has(product.id)) return [];
    seen.add(product.id);
    return [{ productId: product.id, quantity: normalizeQuantity(candidate.quantity, product.stock) }];
  });
}

function sanitizeFavoriteIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && findProduct(id) !== undefined))];
}

export const getCartItemCount = (lines: readonly CartLine[]) => sanitizeCartLines(lines)
  .reduce((total, line) => total + line.quantity, 0);

export const useCommerceStore = create<CommerceStore>()(persist((set, get) => ({
  cart: [],
  favoriteIds: [],
  addToCart: (productId, requestedQuantity = 1) => {
    const product = findProduct(productId);
    if (!product || product.stock <= 0) return 0;
    const state = get();
    const existing = state.cart.find((line) => line.productId === productId);
    const currentQuantity = existing?.quantity ?? 0;
    const requested = Number.isFinite(requestedQuantity) ? Math.max(1, Math.trunc(requestedQuantity)) : 1;
    const quantity = Math.min(currentQuantity + requested, product.stock);
    const addedQuantity = quantity - currentQuantity;
    if (addedQuantity <= 0) return 0;
    const cart = existing
      ? state.cart.map((line) => line.productId === productId ? { ...line, quantity } : line)
      : [...state.cart, { productId, quantity }];
    set({ cart });
    return addedQuantity;
  },
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((line) => line.productId !== productId),
  })),
  setCartQuantity: (productId, requestedQuantity) => set((state) => {
    const product = findProduct(productId);
    if (!product || product.stock <= 0) return { cart: state.cart.filter((line) => line.productId !== productId) };
    return {
      cart: state.cart.map((line) => line.productId === productId
        ? { ...line, quantity: normalizeQuantity(requestedQuantity, product.stock) }
        : line),
    };
  }),
  toggleFavorite: (productId) => set((state) => ({
    favoriteIds: state.favoriteIds.includes(productId)
      ? state.favoriteIds.filter((id) => id !== productId)
      : [...state.favoriteIds, productId],
  })),
  moveFavoriteToCart: (productId) => set((state) => {
    const product = findProduct(productId);
    if (!product || product.stock <= 0) return state;
    const existing = state.cart.find((line) => line.productId === productId);
    if (existing && existing.quantity >= product.stock) return state;
    const cart = existing
      ? state.cart.map((line) => line.productId === productId
        ? { ...line, quantity: normalizeQuantity(line.quantity + 1, product.stock) }
        : line)
      : [...state.cart, { productId, quantity: 1 }];
    return { cart, favoriteIds: state.favoriteIds.filter((id) => id !== productId) };
  }),
  clearCart: () => set({ cart: [] }),
}), {
  name: 'marche-frais-commerce-v1',
  partialize: ({ cart, favoriteIds }) => ({ cart, favoriteIds }),
  merge: (persistedState, currentState) => {
    const persisted = isRecord(persistedState) ? persistedState : {};
    return {
      ...currentState,
      cart: sanitizeCartLines(persisted.cart),
      favoriteIds: sanitizeFavoriteIds(persisted.favoriteIds),
    };
  },
}));
