import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the complete editorial hierarchy from catalogue data', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 1, name: /mieux manger/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Explorez nos univers' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Les préférés du moment' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Les bons produits, à prix doux' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'La sélection bio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Le meilleur de la saison' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nouveautés à découvrir' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /livrés avec soin/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pourquoi choisir Marché Frais ?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /recevez nos idées fraîches/i })).toBeInTheDocument();

    const popularSection = screen.getByLabelText('Produits populaires');
    expect(within(popularSection).getByText('Pommes Gala de France')).toBeInTheDocument();
    expect(within(popularSection).getAllByRole('link', { name: /voir le produit/i })).toHaveLength(4);
    expect(screen.getAllByRole('link', { name: /découvrir la catégorie/i })).toHaveLength(8);
  });
});
