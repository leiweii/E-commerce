import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { CHECKOUT_DEFAULT_VALUES } from '../../features/checkout/checkoutSchema';
import { buildOrder } from '../../features/checkout/orderFactory';
import { resolveCartItems } from '../../features/commerce/cartCalculations';
import { useOrderStore } from '../../stores/orderStore';

const order = buildOrder({ id: 'MF-20260930-CD34', createdAt: '2026-09-30T10:00:00.000Z', items: resolveCartItems([{ productId: 'prod-001', quantity: 2 }]), form: { ...CHECKOUT_DEFAULT_VALUES, firstName: 'Camille', lastName: 'Martin', email: 'camille@example.fr', phone: '06 12 34 56 78', address: '12 rue des Lilas', postalCode: '75011', city: 'Paris', deliveryMethod: 'express', paymentMethod: 'paypal' } });

describe('OrderDetailPage', () => {
  beforeEach(() => { localStorage.clear(); useOrderStore.setState({ orders: [] }); });

  it('shows complete order information without payment secrets', async () => {
    useOrderStore.setState({ orders: [order] });
    render(<RouterProvider router={createAppRouter([`/compte/commandes/${order.id}`])} />);
    expect(await screen.findByRole('heading', { level: 1, name: `Commande ${order.id}` }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText('Pommes Gala de France')).toBeInTheDocument();
    expect(screen.getByText('Livraison express')).toBeInTheDocument();
    expect(screen.getByText('PayPal fictif')).toBeInTheDocument();
    expect(screen.getByText(/12 rue des Lilas/)).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent('4242');
  });

  it('shows an unknown-order recovery state', async () => {
    render(<RouterProvider router={createAppRouter(['/compte/commandes/MF-UNKNOWN'])} />);
    expect(await screen.findByRole('heading', { name: 'Commande introuvable' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Retour à mes commandes' })).toHaveAttribute('href', '/compte/commandes');
  });
});
