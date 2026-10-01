import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FilterDrawer } from './FilterDrawer';

function Harness() {
  const [open, setOpen] = useState(false);
  return <><button type="button" onClick={() => setOpen(true)}>Ouvrir les filtres</button><FilterDrawer isOpen={open} resultCount={4} onClose={() => setOpen(false)}><label>Bio<input type="checkbox" /></label></FilterDrawer></>;
}

describe('FilterDrawer', () => {
  it('moves focus inside, closes with Escape and restores focus', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Ouvrir les filtres' });
    await user.click(opener);
    expect(screen.getByRole('button', { name: 'Fermer les filtres' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
