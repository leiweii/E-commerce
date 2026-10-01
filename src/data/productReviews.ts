import type { ProductReview } from '../types/catalog';

export const productReviews = [
  {
    id: 'review-001', productId: 'prod-022', author: 'Camille R.', rating: 5,
    date: '2026-08-18', title: 'Texture vraiment onctueuse',
    comment: 'Le goût d’amande est franc sans être amer. Parfaite sur du pain au levain au petit-déjeuner.',
    verifiedPurchase: true,
  },
  {
    id: 'review-002', productId: 'prod-022', author: 'Julien M.', rating: 4,
    date: '2026-07-29', title: 'Très bonne composition',
    comment: 'Une liste d’ingrédients irréprochable et un pot généreux. Il faut simplement bien mélanger à l’ouverture.',
    verifiedPurchase: true,
  },
  {
    id: 'review-003', productId: 'prod-032', author: 'Sophie L.', rating: 5,
    date: '2026-09-04', title: 'Gourmands sans être trop sucrés',
    comment: 'De beaux morceaux de noisette et un cœur encore tendre. Le sachet a disparu très vite à la maison.',
    verifiedPurchase: true,
  },
  {
    id: 'review-004', productId: 'prod-001', author: 'Nadia B.', rating: 5,
    date: '2026-09-11', title: 'Croquantes et parfumées',
    comment: 'Les pommes sont arrivées fermes et sans choc. Très bonnes aussi bien à croquer qu’en compote.',
    verifiedPurchase: true,
  },
] satisfies ProductReview[];

export const getReviewsForProduct = (productId: string): ProductReview[] =>
  productReviews.filter((review) => review.productId === productId);
