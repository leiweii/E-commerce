import { Heart, Plus, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { useCommerceStore } from '../../../stores/commerceStore';
import type { Product } from '../../../types/catalog';
import { formatPrice } from '../../../utils/currency';
import { Badge } from '../../ui/Badge/Badge';
import styles from './ProductCard.module.css';

interface ProductCardProps { product: Product; moveToCart?: boolean; }

export function ProductCard({ product, moveToCart = false }: ProductCardProps) {
  const isFavorite = useCommerceStore((state) => state.favoriteIds.includes(product.id));
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite);
  const addToCart = useCommerceStore((state) => state.addToCart);
  const moveFavoriteToCart = useCommerceStore((state) => state.moveFavoriteToCart);
  const cartQuantity = useCommerceStore((state) => state.cart.find((line) => line.productId === product.id)?.quantity ?? 0);
  const isAvailable = product.stock > 0;
  const canAddToCart = isAvailable && cartQuantity < product.stock;

  return <article className={styles.card}>
    <div className={styles.media}>
      <Link to={ROUTES.product(product.slug)} aria-label={`Voir le produit ${product.name}`}>
        <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" width="600" height="450" />
        <div className={styles.badges}>{!isAvailable && <Badge>Rupture</Badge>}{product.isPromotion && <Badge variant="promotion">Promo</Badge>}{product.isOrganic && <Badge variant="organic">Bio</Badge>}{product.isNew && <Badge variant="new">Nouveau</Badge>}</div>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>
      <button
        className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
        type="button"
        aria-label={`${isFavorite ? 'Retirer' : 'Ajouter'} ${product.name} ${isFavorite ? 'des' : 'aux'} favoris`}
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(product.id)}
      ><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></button>
    </div>
    <div className={styles.body}>
      <p className={styles.meta}>{product.brand} · {product.packageSize}</p>
      <div className={styles.rating} aria-label={`Note ${product.rating} sur 5, ${product.reviewCount} avis`}><Star size={15} fill="currentColor" aria-hidden="true" /><span>{product.rating.toFixed(1)}</span><span>({product.reviewCount})</span></div>
      <div className={styles.footer}>
        <div className={styles.prices}><strong>{formatPrice(product.priceCents)}</strong>{product.previousPriceCents && <del>{formatPrice(product.previousPriceCents)}</del>}</div>
        <button
          className={styles.add}
          type="button"
          aria-label={moveToCart ? `Déplacer ${product.name} vers le panier` : `Ajouter ${product.name} au panier`}
          title={!isAvailable ? 'Rupture de stock' : canAddToCart ? (moveToCart ? 'Déplacer vers le panier' : 'Ajouter au panier') : 'Stock maximal atteint'}
          disabled={!canAddToCart}
          onClick={() => moveToCart ? moveFavoriteToCart(product.id) : addToCart(product.id)}
        >{moveToCart ? <ShoppingBag size={19} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}</button>
      </div>
    </div>
  </article>;
}
