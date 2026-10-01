import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { products } from '../../../data/products';
import { useCommerceStore } from '../../../stores/commerceStore';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  beforeEach(() => {
    localStorage.clear();
    useCommerceStore.setState({ cart: [], favoriteIds: [] });
  });

  it('keeps badges and commerce actions accessible', () => {
    const featuredProduct = { ...products[21], isNew: true };
    render(<MemoryRouter><ProductCard product={featuredProduct} /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: featuredProduct.name })).toBeInTheDocument();
    expect(screen.getByText('Promo')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Nouveau')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Voir le produit ${featuredProduct.name}` })).toHaveAttribute('href', `/produits/${featuredProduct.slug}`);
    expect(screen.getByRole('button', { name: `Ajouter ${featuredProduct.name} aux favoris` })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: `Ajouter ${featuredProduct.name} au panier` })).toBeEnabled();
  });

  it('describes an unavailable product without relying on color', () => {
    const unavailableProduct = products[27];
    render(<MemoryRouter><ProductCard product={unavailableProduct} /></MemoryRouter>);

    expect(screen.getByRole('button', { name: `Ajouter ${unavailableProduct.name} au panier` })).toBeDisabled();
    expect(screen.getByTitle('Rupture de stock')).toBeInTheDocument();
    expect(screen.getByText('Rupture')).toBeInTheDocument();
  });
});
