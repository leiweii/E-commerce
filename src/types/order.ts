export type DeliveryMethod = 'standard' | 'express' | 'relay';
export type PaymentMethod = 'card' | 'paypal';
export type OrderStatus = 'confirmed' | 'preparing' | 'shipped' | 'delivered';

export interface OrderContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  street: string;
  complement: string;
  postalCode: string;
  city: string;
}

export interface OrderLine {
  productId: string;
  slug: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  packageSize: string;
  quantity: number;
  unitPriceCents: number;
  previousUnitPriceCents?: number;
}

export interface OrderDelivery {
  method: DeliveryMethod;
  label: string;
  costCents: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  contact: OrderContact;
  address: OrderAddress;
  delivery: OrderDelivery;
  paymentMethod: PaymentMethod;
  lines: OrderLine[];
  itemCount: number;
  subtotalCents: number;
  savingsCents: number;
  deliveryCents: number;
  totalCents: number;
}
