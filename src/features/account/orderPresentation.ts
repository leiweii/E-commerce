import type { Order, OrderStatus } from '../../types/order';

const labels: Record<OrderStatus, string> = {
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
};

export const getOrderStatusLabel = (status: OrderStatus) => labels[status];

export function formatOrderDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Date indisponible';
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export function sortOrdersNewestFirst(orders: readonly Order[]) {
  return orders.map((order, index) => ({ order, index })).sort((a, b) => {
    const aTime = Date.parse(a.order.createdAt);
    const bTime = Date.parse(b.order.createdAt);
    const safeA = Number.isNaN(aTime) ? Number.NEGATIVE_INFINITY : aTime;
    const safeB = Number.isNaN(bTime) ? Number.NEGATIVE_INFINITY : bTime;
    return safeB - safeA || a.index - b.index;
  }).map(({ order }) => order);
}
