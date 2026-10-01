import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from '../../app/router';
import { useCommerceStore } from '../../stores/commerceStore';

const renderCart = () => render(<RouterProvider router={createAppRouter(['/panier'])} />);

describe('CartPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
  });

  it('renders a useful empty state', async () => {
    renderCart();

    expect(await screen.findByRole('heading', { level: 1, name: 'Votre panier' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Votre panier est vide' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Découvrir les produits' })).toHaveAttribute('href', '/produits');
  });

  it('shows exact totals and updates quantities and the header count', async () => {
    const user = userEvent.setup();
    useCommerceStore.getState().addToCart('prod-002', 2);
    useCommerceStore.getState().addToCart('prod-001');
    renderCart();

    expect(await screen.findByRole('heading', { name: 'Pommes Gala de France' })).toBeInTheDocument();
    const summary = screen.getByRole('complementary', { name: 'Résumé du panier' });
    expect(within(summary).getByText(/9,97\s€/)).toBeInTheDocument();
    expect(within(summary).getByText(/-1,00\s€/)).toBeInTheDocument();
    expect(within(summary).getByText(/4,90\s€/)).toBeInTheDocument();
    expect(within(summary).getByText(/14,87\s€/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Panier, 3 articles' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Augmenter la quantité de Pommes Gala de France' }));
    expect(screen.getByRole('link', { name: 'Panier, 4 articles' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Quantité de Pommes Gala de France' })).toHaveValue(2);
  });

  it('removes a product from the cart', async () => {
    const user = userEvent.setup();
    useCommerceStore.getState().addToCart('prod-001');
    renderCart();

    await user.click(await screen.findByRole('button', { name: 'Supprimer Pommes Gala de France du panier' }));
    expect(screen.getByRole('heading', { name: 'Votre panier est vide' })).toBeInTheDocument();
  });
});
