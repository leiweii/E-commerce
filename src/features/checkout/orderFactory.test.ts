import { describe, expect, it } from 'vitest';
import { resolveCartItems } from '../commerce/cartCalculations';
import { CHECKOUT_DEFAULT_VALUES } from './checkoutSchema';
import { buildOrder, calculateDeliveryCents, createOrderId } from './orderFactory';

const form = {
  ...CHECKOUT_DEFAULT_VALUES,
  firstName: 'Élodie',
  lastName: 'Martin',
  email: 'elodie@example.fr',
  phone: '06 12 34 56 78',
  address: '12 rue des Lilas',
  postalCode: '75011',
  city: 'Paris',
  cardNumber: '4242 4242 4242 4242',
  cardExpiry: '12/30',
  cardCvc: '123',
} as const;

describe('orderFactory', () => {
  it('calculates each delivery method with the standard free-delivery threshold', () => {
    expect(calculateDeliveryCents('standard', 4_999)).toBe(490);
    expect(calculateDeliveryCents('standard', 5_000)).toBe(0);
    expect(calculateDeliveryCents('express', 10_000)).toBe(890);
    expect(calculateDeliveryCents('relay', 10_000)).toBe(290);
  });

  it('generates an uppercase order number with the current French calendar date', () => {
    expect(createOrderId(new Date('2026-09-30T10:00:00.000Z'), () => 0.5)).toMatch(/^MF-20260930-[A-Z0-9]{4}$/);
  });

  it('builds a durable product snapshot and recalculates exact totals', () => {
    const order = buildOrder({
      items: resolveCartItems([{ productId: 'prod-002', quantity: 2 }, { productId: 'prod-001', quantity: 1 }]),
      form,
      id: 'MF-20260930-TEST',
      createdAt: '2026-09-30T10:00:00.000Z',
    });

    expect(order).toMatchObject({
      id: 'MF-20260930-TEST', status: 'confirmed', itemCount: 3,
      subtotalCents: 997, savingsCents: 100, deliveryCents: 490, totalCents: 1487,
      paymentMethod: 'card',
      delivery: { method: 'standard', label: 'Livraison standard', costCents: 490 },
      contact: { firstName: 'Élodie', lastName: 'Martin', email: 'elodie@example.fr', phone: '06 12 34 56 78' },
      address: { street: '12 rue des Lilas', complement: '', postalCode: '75011', city: 'Paris' },
    });
    expect(order.lines).toHaveLength(2);
    expect(order.lines[0]).toMatchObject({ productId: 'prod-002', quantity: 2, unitPriceCents: 349 });
    expect(JSON.stringify(order)).not.toMatch(/4242|12\/30|123|cardNumber|cardExpiry|cardCvc/);
  });

  it('rejects creation from an empty cart snapshot', () => {
    expect(() => buildOrder({ items: [], form, id: 'MF-20260930-TEST', createdAt: '2026-09-30T10:00:00.000Z' })).toThrow('empty cart');
  });
});
