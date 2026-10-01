import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { MobileNavigation } from './MobileNavigation';

describe('MobileNavigation', () => {
  it('keeps search available when the compact header hides its icon', () => {
    render(<MemoryRouter><MobileNavigation isOpen onNavigate={vi.fn()} /></MemoryRouter>);

    const navigation = screen.getByRole('navigation', { name: 'Navigation mobile' });
    expect(within(navigation).getByRole('link', { name: 'Rechercher' })).toHaveAttribute('href', '/recherche');
  });

  it('exposes the active route and closes after navigation', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<MemoryRouter initialEntries={['/promotions']}><MobileNavigation isOpen onNavigate={onNavigate} /></MemoryRouter>);

    expect(screen.getByRole('link', { name: 'Promotions' })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('link', { name: 'Contact' }));
    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
