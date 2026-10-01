import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { createAppRouter } from '../app/router';

const renderRoute = (path: string) => render(<RouterProvider router={createAppRouter([path])} />);

describe('secondary pages', () => {
  it('presents the brand with concise commitments and a catalogue action', async () => {
    renderRoute('/a-propos');

    expect(await screen.findByRole('heading', { level: 1, name: /des produits bien choisis/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'La qualité avant la quantité' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Des origines claires' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Une sélection responsable' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Découvrir nos produits' })).toHaveAttribute('href', '/produits');
  });

  it('validates the contact form and shows local-only feedback after a valid submission', async () => {
    const user = userEvent.setup();
    renderRoute('/contact');

    expect(await screen.findByRole('heading', { level: 1, name: 'Contactez-nous' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText('24 rue du Marché, 75011 Paris')).toBeInTheDocument();
    expect(screen.getByLabelText('Sujet')).toBeRequired();
    expect(screen.getByLabelText('Nom')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
    await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    expect(await screen.findByText('Le nom doit contenir au moins 2 caractères.')).toBeInTheDocument();
    expect(screen.getByText('Sélectionnez un sujet.')).toBeInTheDocument();
    expect(screen.getByText('Saisissez une adresse email valide.')).toBeInTheDocument();
    expect(screen.getByText('Le message doit contenir au moins 10 caractères.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Camille Martin' } });
    await user.selectOptions(screen.getByLabelText('Sujet'), 'product');
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'adresse-invalide' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Je souhaite obtenir davantage d’informations sur un produit.' } });
    await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    expect(screen.getByText('Saisissez une adresse email valide.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'camille@example.fr' } });
    await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));

    expect(await screen.findByRole('heading', { name: 'Message bien reçu' })).toBeInTheDocument();
    expect(screen.getByText(/aucune requête n’a été envoyée/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Nouvelle demande' } });
    expect(screen.queryByRole('heading', { name: 'Message bien reçu' })).not.toBeInTheDocument();
  }, 10_000);

  it('offers both recovery routes from the 404 page', async () => {
    renderRoute('/adresse-inconnue');

    expect(await screen.findByRole('heading', { name: 'Page introuvable' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Retour à l’accueil' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Voir tous les produits' })).toHaveAttribute('href', '/produits');
  });
});
