import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { useCommerceStore } from '../../stores/commerceStore';
import { useOrderStore } from '../../stores/orderStore';

const renderCheckout = () => render(<RouterProvider router={createAppRouter(['/commande'])} />);

describe('CheckoutPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
    useOrderStore.setState({ orders: [] });
  });

  it('offers a catalogue recovery action when the cart is empty', async () => {
    renderCheckout();
    expect(await screen.findByRole('heading', { name: 'Votre panier est vide' }, { timeout: 8_000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Découvrir les produits' })).toHaveAttribute('href', '/produits');
  }, 10_000);

  it('validates each step, updates delivery and creates one fictitious PayPal order', async () => {
    const user = userEvent.setup();
    useCommerceStore.getState().addToCart('prod-001', 2);
    renderCheckout();

    expect(await screen.findByRole('heading', { level: 1, name: 'Finaliser ma commande' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText('Étape 1 sur 5')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Continuer' }));
    expect(await screen.findByText('Saisissez un prénom d’au moins 2 caractères.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Camille' } });
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Martin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'camille@example.fr' } });
    fireEvent.change(screen.getByLabelText('Téléphone'), { target: { value: '06 12 34 56 78' } });
    await user.click(screen.getByRole('button', { name: 'Continuer' }));

    expect(screen.getByText('Étape 2 sur 5')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Adresse'), { target: { value: '12 rue des Lilas' } });
    fireEvent.change(screen.getByLabelText('Code postal'), { target: { value: '75011' } });
    fireEvent.change(screen.getByLabelText('Ville'), { target: { value: 'Paris' } });
    await user.click(screen.getByRole('button', { name: 'Continuer' }));

    expect(screen.getByText('Étape 3 sur 5')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /livraison express/i }));
    expect(screen.getAllByText(/8,90\s*€/).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: 'Continuer' }));

    expect(screen.getByText('Étape 4 sur 5')).toBeInTheDocument();
    expect(screen.getByText(/utilisez uniquement les données de démonstration/i)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /paypal fictif/i }));
    expect(screen.queryByLabelText('Numéro de carte')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Continuer' }));

    expect(screen.getByText('Étape 5 sur 5')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vérifiez votre commande' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Créer ma commande fictive' }));

    expect(await screen.findByRole('heading', { name: 'Commande confirmée' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(useOrderStore.getState().orders).toHaveLength(1);
    expect(useOrderStore.getState().orders[0].delivery.method).toBe('express');
    expect(useOrderStore.getState().orders[0].paymentMethod).toBe('paypal');
    expect(useCommerceStore.getState().cart).toEqual([]);
    expect(localStorage.getItem('marche-frais-orders-v1')).not.toMatch(/cardNumber|cardExpiry|cardCvc|4242/);
  }, 15_000);
});
