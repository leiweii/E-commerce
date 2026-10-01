import type { CartItem, CartLine, CartSummary } from '../../types/commerce';
import { products } from '../../data/products';

export const DELIVERY_FEE_CENTS = 490;
export const FREE_DELIVERY_THRESHOLD_CENTS = 5000;

export const resolveCartItems = (lines: readonly CartLine[]): CartItem[] => lines.flatMap((line) => {
  const product = products.find(({ id }) => id === line.productId);
  return product ? [{ ...line, product }] : [];
});

export function calculateCartSummary(items: readonly CartItem[]): CartSummary {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalCents = items.reduce((total, item) => total + item.product.priceCents * item.quantity, 0);
  const savingsCents = items.reduce((total, item) => {
    const previousPrice = item.product.previousPriceCents ?? item.product.priceCents;
    return total + Math.max(0, previousPrice - item.product.priceCents) * item.quantity;
  }, 0);
  const deliveryCents = subtotalCents === 0 || subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS
    ? 0
    : DELIVERY_FEE_CENTS;

  return { itemCount, subtotalCents, savingsCents, deliveryCents, totalCents: subtotalCents + deliveryCents };
}
