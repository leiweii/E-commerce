const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export const formatPrice = (priceCents: number): string => currencyFormatter.format(priceCents / 100);
