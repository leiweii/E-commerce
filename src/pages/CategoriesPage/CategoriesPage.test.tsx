import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CategoriesPage } from './CategoriesPage';

describe('CategoriesPage', () => {
  it('keeps a useful catalogue action when category data is absent', () => {
    render(<MemoryRouter><CategoriesPage items={[]} /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Aucune catégorie disponible' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voir tous les produits' })).toHaveAttribute('href', '/produits');
  });
});
