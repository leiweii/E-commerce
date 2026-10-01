import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { createAppRouter } from './router';

const renderRoute = (path: string) =>
  render(<RouterProvider router={createAppRouter([path])} />);

describe('application router', () => {
  it('renders the home route inside the shared layout', async () => {
    renderRoute('/');

    expect(await screen.findByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mieux manger/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the complete category index instead of a placeholder', async () => {
    renderRoute('/categories');

    expect(await screen.findByRole('heading', { level: 1, name: 'Toutes nos catégories' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(8);
    expect(screen.getByRole('link', { name: 'Découvrir la catégorie Fruits et légumes' })).toHaveAttribute('href', '/categories/fruits-et-legumes');
    expect(screen.getByRole('link', { name: 'Découvrir la catégorie Snacks et desserts' })).toHaveAttribute('href', '/categories/snacks-et-desserts');
    expect(screen.queryByText(/disponible prochainement/i)).not.toBeInTheDocument();
  });

  it('renders the checkout empty state instead of a placeholder', async () => {
    renderRoute('/commande');
    expect(await screen.findByRole('heading', { name: 'Votre panier est vide' }, { timeout: 8_000 })).toBeInTheDocument();
    expect(screen.queryByText(/disponible prochainement/i)).not.toBeInTheDocument();
  }, 10_000);

  it('renders the account and order history routes', async () => {
    const account = renderRoute('/compte');
    expect(await screen.findByRole('heading', { level: 1, name: 'Mon compte' }, { timeout: 5_000 })).toBeInTheDocument();
    account.unmount();
    renderRoute('/compte/commandes');
    expect(await screen.findByRole('heading', { level: 1, name: 'Mes commandes' })).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown category', async () => {
    renderRoute('/categories/categorie-inconnue');

    expect(await screen.findByRole('heading', { name: /page introuvable/i })).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', async () => {
    renderRoute('/adresse-inconnue');

    expect(await screen.findByRole('heading', { name: /page introuvable/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /retour à l’accueil/i })).toBeInTheDocument();
  });
});
