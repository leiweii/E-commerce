import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from '../../app/router';
import { useCommerceStore } from '../../stores/commerceStore';

const renderFavorites = () => render(<RouterProvider router={createAppRouter(['/favoris'])} />);

describe('FavoritesPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
  });

  it('renders a useful empty state', async () => {
    renderFavorites();

    expect(await screen.findByRole('heading', { level: 1, name: 'Vos favoris' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Aucun favori pour le moment' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explorer le catalogue' })).toHaveAttribute('href', '/produits');
  });

  it('moves an available favorite to the cart and removes another favorite', async () => {
    const user = userEvent.setup();
    useCommerceStore.getState().toggleFavorite('prod-001');
    useCommerceStore.getState().toggleFavorite('prod-028');
    renderFavorites();

    expect(await screen.findByRole('heading', { name: 'Pommes Gala de France' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Déplacer Pommes Gala de France vers le panier' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Déplacer Pâte de curry rouge vers le panier' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Déplacer Pommes Gala de France vers le panier' }));
    expect(screen.queryByRole('heading', { name: 'Pommes Gala de France' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Panier, 1 article' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retirer Pâte de curry rouge des favoris' }));
    expect(screen.getByRole('heading', { name: 'Aucun favori pour le moment' })).toBeInTheDocument();
  });
});
