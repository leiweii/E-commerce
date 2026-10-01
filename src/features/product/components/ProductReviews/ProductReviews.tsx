import { CheckCircle2, Star } from 'lucide-react';
import type { Product, ProductReview } from '../../../../types/catalog';
import styles from './ProductReviews.module.css';

interface ProductReviewsProps { product: Product; reviews: readonly ProductReview[]; }

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export function ProductReviews({ product, reviews }: ProductReviewsProps) {
  return <section className={styles.reviews} aria-labelledby="reviews-title">
    <header><div><p>Avis vérifiés</p><h2 id="reviews-title">Avis clients</h2></div><div className={styles.summary}><strong>{product.rating.toFixed(1)}</strong><Star fill="currentColor" aria-hidden="true" /><span>{product.reviewCount} avis</span></div></header>
    {reviews.length > 0 ? <div className={styles.list}>{reviews.map((review) => <article key={review.id}>
      <div className={styles.stars} aria-label={`${review.rating} étoiles sur 5`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < review.rating ? 'currentColor' : 'none'} aria-hidden="true" />)}</div>
      <h3>{review.title}</h3>
      <p>{review.comment}</p>
      <footer><span>{review.author} · {dateFormatter.format(new Date(review.date))}</span>{review.verifiedPurchase && <span><CheckCircle2 size={14} aria-hidden="true" /> Achat vérifié</span>}</footer>
    </article>)}</div> : <p className={styles.empty}>Aucun commentaire détaillé pour le moment. La note moyenne repose sur les évaluations clients.</p>}
  </section>;
}
