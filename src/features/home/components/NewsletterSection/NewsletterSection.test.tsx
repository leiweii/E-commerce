import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NewsletterSection } from './NewsletterSection';

describe('NewsletterSection', () => {
  it('validates the email and gives local-only success feedback', async () => {
    const user = userEvent.setup();
    render(<NewsletterSection />);
    await user.click(screen.getByRole('button', { name: 'S’inscrire' }));
    expect(await screen.findByText('Saisissez une adresse email valide.')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Votre adresse e-mail'), 'camille@example.fr');
    await user.click(screen.getByRole('button', { name: 'S’inscrire' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Inscription simulée');
  });
});
