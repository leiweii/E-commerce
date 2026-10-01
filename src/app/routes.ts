export const ROUTES = {
  home: '/', products: '/produits', categories: '/categories', search: '/recherche', promotions: '/promotions',
  favorites: '/favoris', cart: '/panier', checkout: '/commande', account: '/compte', orders: '/compte/commandes',
  about: '/a-propos', contact: '/contact',
  category: (slug: string) => `/categories/${slug}`,
  product: (slug: string) => `/produits/${slug}`,
  orderConfirmation: (id: string) => `/commande/confirmation/${id}`,
  orderDetail: (id: string) => `/compte/commandes/${id}`,
} as const;
