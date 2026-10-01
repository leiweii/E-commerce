import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { useCommerceStore } from '../../stores/commerceStore';

const renderRoute = (route: string) => render(<RouterProvider router={createAppRouter([route])} />);

describe('ProductPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
  });

  it('renders complete organic promotion information and realistic reviews', async () => {
    renderRoute('/produits/puree-amandes-completes-bio');

    expect(await screen.findByRole('heading', { level: 1, name: 'Purée d’amandes complètes bio' })).toBeInTheDocument();
    expect(screen.getByText('L’Atelier Végétal')).toBeInTheDocument();
    expect(screen.getByText(/7,95/)).toBeInTheDocument();
    expect(screen.getByText(/8,90/)).toBeInTheDocument();
    expect(screen.getByText('-11 %')).toBeInTheDocument();
    expect(screen.getAllByText('Bio').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Avis clients' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Afficher l’image/i }).length).toBeGreaterThan(1);
  });

  it('limits the desired quantity to the available stock', async () => {
    const user = userEvent.setup();
    renderRoute('/produits/cookies-noisettes-chocolat');
    const quantity = await screen.findByRole('spinbutton', { name: 'Quantité désirée' });

    expect(quantity).toHaveValue(1);
    await user.click(screen.getByRole('button', { name: 'Augmenter la quantité' }));
    expect(quantity).toHaveValue(2);
    await user.click(screen.getByRole('button', { name: 'Diminuer la quantité' }));
    expect(quantity).toHaveValue(1);
  });

  it('adds the selected quantity to the cart and toggles the favorite', async () => {
    const user = userEvent.setup();
    renderRoute('/produits/cookies-noisettes-chocolat');

    await screen.findByRole('heading', { level: 1, name: 'Cookies noisettes et chocolat' });
    await user.click(screen.getByRole('button', { name: 'Augmenter la quantité' }));
    await user.click(screen.getByRole('button', { name: 'Ajouter au panier' }));
    await user.click(screen.getByRole('button', { name: 'Ajouter aux favoris' }));

    expect(screen.getByRole('link', { name: 'Panier, 2 articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retirer des favoris' })).toHaveAttribute('aria-pressed', 'true');
    expect(useCommerceStore.getState().cart).toContainEqual({ productId: 'prod-032', quantity: 2 });
  });

  it('disables adding when the available stock is already in the cart', async () => {
    useCommerceStore.getState().addToCart('prod-032', 20);
    renderRoute('/produits/cookies-noisettes-chocolat');

    expect(await screen.findByRole('button', { name: 'Stock maximal atteint' })).toBeDisabled();
  });

  it('disables purchase controls for an unavailable product', async () => {
    renderRoute('/produits/pate-curry-rouge');

    expect(await screen.findByText('Rupture de stock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Indisponible' })).toBeDisabled();
    expect(screen.getByRole('spinbutton', { name: 'Quantité désirée' })).toBeDisabled();
  });

  it('handles absent allergens and excludes the current product from suggestions', async () => {
    renderRoute('/produits/pommes-gala-france');

    expect(await screen.findByText('Aucun allergène renseigné.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Conservation' })).toBeInTheDocument();
    expect(screen.getByText(/indications figurant sur l’emballage/i)).toBeInTheDocument();
    const suggestions = screen.getByRole('region', { name: 'Produits similaires' });
    expect(within(suggestions).queryByRole('heading', { name: 'Pommes Gala de France' })).not.toBeInTheDocument();
    expect(within(suggestions).getAllByRole('article')).toHaveLength(3);
  });

  it('resets state when navigating to another product and keeps quantities integral', async () => {
    const user = userEvent.setup();
    renderRoute('/produits/cookies-noisettes-chocolat');
    const quantity = await screen.findByRole('spinbutton', { name: 'Quantité désirée' });

    fireEvent.change(quantity, { target: { value: '2.7' } });
    expect(quantity).toHaveValue(2);
    expect(quantity).toHaveAttribute('step', '1');
    await user.click(screen.getByRole('button', { name: /Afficher l’image 2/i }));
    await user.click(screen.getByRole('link', { name: 'Voir le produit Chocolat noir 70 %' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Chocolat noir 70 %' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Quantité désirée' })).toHaveValue(1);
    expect(screen.getByRole('button', { name: /Afficher l’image 1/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders the 404 page for an unknown product slug', async () => {
    renderRoute('/produits/produit-inconnu');
    expect(await screen.findByRole('heading', { name: 'Page introuvable' })).toBeInTheDocument();
  });
});
