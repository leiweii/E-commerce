import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { CHECKOUT_DEFAULT_VALUES } from '../../features/checkout/checkoutSchema';
import { buildOrder } from '../../features/checkout/orderFactory';
import { resolveCartItems } from '../../features/commerce/cartCalculations';
import { useOrderStore } from '../../stores/orderStore';

const order = buildOrder({ id: 'MF-20260930-AB12', createdAt: '2026-09-30T10:00:00.000Z', items: resolveCartItems([{ productId: 'prod-001', quantity: 2 }]), form: { ...CHECKOUT_DEFAULT_VALUES, firstName: 'Camille', lastName: 'Martin', email: 'camille@example.fr', phone: '06 12 34 56 78', address: '12 rue des Lilas', postalCode: '75011', city: 'Paris', paymentMethod: 'paypal' } });

describe('OrdersPage', () => {
  beforeEach(() => { localStorage.clear(); useOrderStore.setState({ orders: [] }); });

  it('shows an empty history recovery action', async () => {
    render(<RouterProvider router={createAppRouter(['/compte/commandes'])} />);
    expect(await screen.findByRole('heading', { name: 'Aucune commande pour le moment' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continuer mes achats' })).toHaveAttribute('href', '/produits');
  });

  it('shows locally stored order information and detail link', async () => {
    useOrderStore.setState({ orders: [order] });
    render(<RouterProvider router={createAppRouter(['/compte/commandes'])} />);
    expect(await screen.findByText(order.id, {}, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText('Confirmée')).toBeInTheDocument();
    expect(screen.getByText('2 articles')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voir le détail' })).toHaveAttribute('href', `/compte/commandes/${order.id}`);
  });
});
