import { beforeEach, describe, expect, it } from 'vitest';
import { resolveCartItems } from '../features/commerce/cartCalculations';
import { CHECKOUT_DEFAULT_VALUES } from '../features/checkout/checkoutSchema';
import { buildOrder } from '../features/checkout/orderFactory';
import { sanitizeOrders, useOrderStore } from './orderStore';

const createOrder = () => buildOrder({
  items: resolveCartItems([{ productId: 'prod-001', quantity: 2 }]),
  form: {
    ...CHECKOUT_DEFAULT_VALUES,
    firstName: 'Camille', lastName: 'Martin', email: 'camille@example.fr', phone: '06 12 34 56 78',
    address: '12 rue des Lilas', postalCode: '75011', city: 'Paris', paymentMethod: 'paypal',
  },
  id: 'MF-20260930-TEST',
  createdAt: '2026-09-30T10:00:00.000Z',
});

describe('order store', () => {
  beforeEach(() => {
    localStorage.clear();
    useOrderStore.setState({ orders: [] });
  });

  it('adds, persists and finds a finalized order without duplicating its identifier', () => {
    const order = createOrder();
    useOrderStore.getState().addOrder(order);
    useOrderStore.getState().addOrder(order);

    expect(useOrderStore.getState().orders).toEqual([order]);
    expect(useOrderStore.getState().getOrder(order.id)).toEqual(order);
    expect(JSON.parse(localStorage.getItem('marche-frais-orders-v1') ?? '{}').state).toEqual({ orders: [order] });
  });

  it('ignores malformed, inconsistent and payment-sensitive persisted entries', () => {
    const order = createOrder();
    expect(sanitizeOrders([
      order,
      { ...order, id: 'MF-20260930-BAD1', totalCents: -1 },
      { ...order, id: 'MF-20260930-BAD2', status: 'unknown' },
      { ...order, id: 'MF-20260930-BAD3', cardNumber: '4242 4242 4242 4242' },
      { ...order, id: 'MF-20260930-BAD4', itemCount: 99 },
      null,
    ])).toEqual([order]);
  });

  it('returns an empty safe value for a non-array payload', () => {
    expect(sanitizeOrders({ orders: 'broken' })).toEqual([]);
  });
});
