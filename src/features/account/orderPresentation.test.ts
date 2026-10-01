import { describe, expect, it } from 'vitest';
import type { Order } from '../../types/order';
import { formatOrderDate, getOrderStatusLabel, sortOrdersNewestFirst } from './orderPresentation';

describe('orderPresentation', () => {
  it('provides French status labels', () => {
    expect(getOrderStatusLabel('confirmed')).toBe('Confirmée');
    expect(getOrderStatusLabel('preparing')).toBe('En préparation');
    expect(getOrderStatusLabel('shipped')).toBe('Expédiée');
    expect(getOrderStatusLabel('delivered')).toBe('Livrée');
  });

  it('formats valid dates and handles invalid dates', () => {
    expect(formatOrderDate('2026-09-30T10:00:00.000Z')).toMatch(/30 septembre 2026/i);
    expect(formatOrderDate('invalid')).toBe('Date indisponible');
  });

  it('sorts a copy newest first and keeps equal dates stable', () => {
    const source = [
      { id: 'old', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'new-a', createdAt: '2026-02-01T00:00:00Z' },
      { id: 'new-b', createdAt: '2026-02-01T00:00:00Z' },
    ] as Order[];
    expect(sortOrdersNewestFirst(source).map(({ id }) => id)).toEqual(['new-a', 'new-b', 'old']);
    expect(source.map(({ id }) => id)).toEqual(['old', 'new-a', 'new-b']);
  });
});
