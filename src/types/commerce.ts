import type { Product } from './catalog';

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItem extends CartLine {
  product: Product;
}

export interface CartSummary {
  itemCount: number;
  subtotalCents: number;
  savingsCents: number;
  deliveryCents: number;
  totalCents: number;
}
