import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('preserves the page heading hierarchy and optional class', () => {
    const { container } = render(
      <PageHeader
        eyebrow="Le marché en ligne"
        title="Tous les produits"
        description="Une sélection pour le quotidien."
        className="catalogue-header"
      />,
    );

    expect(screen.getByText('Le marché en ligne')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Tous les produits' })).toBeInTheDocument();
    expect(screen.getByText('Une sélection pour le quotidien.')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('catalogue-header');
  });
});
