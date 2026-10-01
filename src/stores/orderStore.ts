import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '../types/order';

const orderLineSchema = z.object({
  productId: z.string().min(1), slug: z.string().min(1), name: z.string().min(1),
  imageSrc: z.string().min(1), imageAlt: z.string(), packageSize: z.string().min(1),
  quantity: z.number().int().positive(), unitPriceCents: z.number().int().nonnegative(),
  previousUnitPriceCents: z.number().int().nonnegative().optional(),
}).strict();

const orderSchema = z.object({
  id: z.string().regex(/^MF-\d{8}-[A-Z0-9]{4}$/),
  createdAt: z.string().datetime(),
  status: z.enum(['confirmed', 'preparing', 'shipped', 'delivered']),
  contact: z.object({ firstName: z.string().min(1), lastName: z.string().min(1), email: z.string().email(), phone: z.string().min(1) }).strict(),
  address: z.object({ street: z.string().min(1), complement: z.string(), postalCode: z.string().regex(/^\d{5}$/), city: z.string().min(1) }).strict(),
  delivery: z.object({ method: z.enum(['standard', 'express', 'relay']), label: z.string().min(1), costCents: z.number().int().nonnegative() }).strict(),
  paymentMethod: z.enum(['card', 'paypal']),
  lines: z.array(orderLineSchema).min(1),
  itemCount: z.number().int().positive(),
  subtotalCents: z.number().int().nonnegative(),
  savingsCents: z.number().int().nonnegative(),
  deliveryCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
}).strict().superRefine((order, context) => {
  const itemCount = order.lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = order.lines.reduce((total, line) => total + line.quantity * line.unitPriceCents, 0);
  if (order.itemCount !== itemCount) context.addIssue({ code: 'custom', path: ['itemCount'], message: 'Invalid item count' });
  if (order.subtotalCents !== subtotal) context.addIssue({ code: 'custom', path: ['subtotalCents'], message: 'Invalid subtotal' });
  if (order.delivery.costCents !== order.deliveryCents) context.addIssue({ code: 'custom', path: ['deliveryCents'], message: 'Invalid delivery total' });
  if (order.totalCents !== order.subtotalCents + order.deliveryCents) context.addIssue({ code: 'custom', path: ['totalCents'], message: 'Invalid total' });
});

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export function sanitizeOrders(value: unknown): Order[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((candidate) => {
    const result = orderSchema.safeParse(candidate);
    if (!result.success || seen.has(result.data.id)) return [];
    seen.add(result.data.id);
    return [result.data];
  });
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(persist((set, get) => ({
  orders: [],
  addOrder: (order) => set((state) => state.orders.some(({ id }) => id === order.id)
    ? state
    : { orders: [...state.orders, order] }),
  getOrder: (id) => get().orders.find((order) => order.id === id),
}), {
  name: 'marche-frais-orders-v1',
  partialize: ({ orders }) => ({ orders }),
  merge: (persistedState, currentState) => {
    const persisted = isRecord(persistedState) ? persistedState : {};
    return { ...currentState, orders: sanitizeOrders(persisted.orders) };
  },
}));
