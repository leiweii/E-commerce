import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { products } from '../../data/products';

const renderRoute = (route: string) => render(<RouterProvider router={createAppRouter([route])} />);

describe('catalog pages', () => {
  it('renders the complete catalogue and filters it through the search field', async () => {
    const user = userEvent.setup();
    renderRoute('/produits');

    expect(screen.getByRole('heading', { level: 1, name: 'Tous les produits' })).toBeInTheDocument();
    expect(screen.getByText(`${products.length} produits`)).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: 'Rechercher par nom ou marque' }), 'amandes');

    expect(screen.getByText('1 produit')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Purée d’amandes complètes bio' })).toBeInTheDocument();
  });

  it('combines sidebar filters and can reset them', async () => {
    const user = userEvent.setup();
    renderRoute('/produits');

    const filters = screen.getByRole('complementary', { name: 'Filtres du catalogue' });
    await user.click(within(filters).getByRole('checkbox', { name: 'Produits bio' }));
    await user.click(within(filters).getByRole('checkbox', { name: 'En stock uniquement' }));

    expect(screen.getAllByText(/filtre[s]? actif[s]?/)[0]).toBeInTheDocument();
    await user.click(within(filters).getByRole('button', { name: 'Réinitialiser les filtres' }));
    expect(screen.getByText(`${products.length} produits`)).toBeInTheDocument();
  });

  it('applies the category and promotion route contexts', () => {
    const categoryView = renderRoute('/categories/fruits-et-legumes');
    expect(screen.getByRole('heading', { level: 1, name: 'Fruits et légumes' })).toBeInTheDocument();
    expect(screen.getByText(`${products.filter(({ categoryId }) => categoryId === 'fruits-legumes').length} produits`)).toBeInTheDocument();
    categoryView.unmount();

    renderRoute('/promotions');
    expect(screen.getByRole('heading', { level: 1, name: 'Les promotions' })).toBeInTheDocument();
    expect(screen.getByText(`${products.filter(({ isPromotion }) => isPromotion).length} produits`)).toBeInTheDocument();
  });

  it('shows an empty state and opens the mobile filter panel', async () => {
    const user = userEvent.setup();
    renderRoute('/recherche?q=produit-introuvable');

    expect(screen.getByRole('heading', { level: 2, name: 'Aucun produit trouvé' })).toBeInTheDocument();
    const results = screen.getByRole('region', { name: 'Résultats du catalogue' });
    await user.click(within(results).getByRole('button', { name: 'Réinitialiser les filtres' }));
    expect(screen.getByText(`${products.length} produits`)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Ouvrir les filtres'));
    expect(screen.getByRole('dialog', { name: 'Filtres' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Fermer les filtres' }));
    expect(screen.queryByRole('dialog', { name: 'Filtres' })).not.toBeInTheDocument();
  });
});
