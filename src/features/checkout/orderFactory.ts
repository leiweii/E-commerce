import type { CartItem } from '../../types/commerce';
import type { DeliveryMethod, Order } from '../../types/order';
import type { CheckoutFormValues } from './checkoutSchema';

const deliveryOptions: Record<DeliveryMethod, { label: string; costCents: number }> = {
  standard: { label: 'Livraison standard', costCents: 490 },
  express: { label: 'Livraison express', costCents: 890 },
  relay: { label: 'Retrait en point relais', costCents: 290 },
};

export function calculateDeliveryCents(method: DeliveryMethod, subtotalCents: number) {
  if (method === 'standard' && subtotalCents >= 5_000) return 0;
  return deliveryOptions[method].costCents;
}

export function createOrderId(now = new Date(), random = Math.random) {
  const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('');
  const suffix = Math.floor(random() * 36 ** 4).toString(36).toUpperCase().padStart(4, '0').slice(-4);
  return `MF-${date}-${suffix}`;
}

interface BuildOrderInput {
  items: readonly CartItem[];
  form: CheckoutFormValues;
  id?: string;
  createdAt?: string;
}

export function buildOrder({ items, form, id = createOrderId(), createdAt = new Date().toISOString() }: BuildOrderInput): Order {
  if (items.length === 0) throw new Error('Cannot create an order from an empty cart');

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalCents = items.reduce((total, item) => total + item.product.priceCents * item.quantity, 0);
  const savingsCents = items.reduce((total, item) => total + Math.max(0, (item.product.previousPriceCents ?? item.product.priceCents) - item.product.priceCents) * item.quantity, 0);
  const deliveryCents = calculateDeliveryCents(form.deliveryMethod, subtotalCents);

  return {
    id,
    createdAt,
    status: 'confirmed',
    contact: { firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), phone: form.phone.trim() },
    address: { street: form.address.trim(), complement: form.addressComplement.trim(), postalCode: form.postalCode.trim(), city: form.city.trim() },
    delivery: { method: form.deliveryMethod, label: deliveryOptions[form.deliveryMethod].label, costCents: deliveryCents },
    paymentMethod: form.paymentMethod,
    lines: items.map(({ product, quantity }) => ({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageSrc: product.images[0].src,
      imageAlt: product.images[0].alt,
      packageSize: product.packageSize,
      quantity,
      unitPriceCents: product.priceCents,
      ...(product.previousPriceCents ? { previousUnitPriceCents: product.previousPriceCents } : {}),
    })),
    itemCount,
    subtotalCents,
    savingsCents,
    deliveryCents,
    totalCents: subtotalCents + deliveryCents,
  };
}
