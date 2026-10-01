import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createAppRouter } from '../../app/router';
import { useProfileStore } from '../../stores/profileStore';
import { DEFAULT_CUSTOMER_PROFILE } from '../../types/customer';

describe('AccountPage', () => {
  beforeEach(() => {
    localStorage.clear();
    useProfileStore.setState({ profile: DEFAULT_CUSTOMER_PROFILE });
  });

  it('edits, validates and resets the fictitious local profile', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={createAppRouter(['/compte'])} />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Mon compte' }, { timeout: 5_000 })).toBeInTheDocument();
    expect(screen.getByText(/compte de démonstration/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mes commandes' })).toHaveAttribute('href', '/compte/commandes');
    expect(screen.getByLabelText('Prénom')).toHaveValue('Élodie');

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'incorrect' } });
    await user.click(screen.getByRole('button', { name: 'Enregistrer mes informations' }));
    expect(await screen.findByText('Saisissez une adresse email valide.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'camille@example.fr' } });
    await user.click(screen.getByRole('button', { name: 'Enregistrer mes informations' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Profil enregistré');
    expect(useProfileStore.getState().profile.email).toBe('camille@example.fr');

    await user.click(screen.getByRole('button', { name: 'Réinitialiser le profil fictif' }));
    expect(screen.getByLabelText('Email')).toHaveValue(DEFAULT_CUSTOMER_PROFILE.email);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });
});
