import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { CHECKOUT_DEFAULT_VALUES } from '../../features/checkout/checkoutSchema';
import { buildOrder } from '../../features/checkout/orderFactory';
import { resolveCartItems } from '../../features/commerce/cartCalculations';
import { useOrderStore } from '../../stores/orderStore';

const order = buildOrder({
  id: 'MF-20260930-TEST',
  createdAt: '2026-09-30T10:00:00.000Z',
  items: resolveCartItems([{ productId: 'prod-001', quantity: 2 }]),
  form: {
    ...CHECKOUT_DEFAULT_VALUES,
    firstName: 'Camille', lastName: 'Martin', email: 'camille@example.fr', phone: '06 12 34 56 78',
    address: '12 rue des Lilas', postalCode: '75011', city: 'Paris', paymentMethod: 'paypal',
  },
});

describe('OrderConfirmationPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useOrderStore.setState({ orders: [] });
  });

  it('shows the persisted order details and shopping recovery action', async () => {
    useOrderStore.setState({ orders: [order] });
    render(<RouterProvider router={createAppRouter([`/commande/confirmation/${order.id}`])} />);
    expect(await screen.findByRole('heading', { name: 'Commande confirmée' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText(order.id)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Livraison' }).parentElement).toHaveTextContent('12 rue des Lilas');
    expect(screen.getByRole('link', { name: 'Continuer mes achats' })).toHaveAttribute('href', '/produits');
  });

  it('handles an unknown order without crashing', async () => {
    render(<RouterProvider router={createAppRouter(['/commande/confirmation/MF-UNKNOWN'])} />);
    expect(await screen.findByRole('heading', { name: 'Commande introuvable' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voir mes commandes' })).toHaveAttribute('href', '/compte/commandes');
  });
});
