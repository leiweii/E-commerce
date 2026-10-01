import { Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../../../../types/catalog';
import { formatPrice } from '../../../../utils/currency';
import { Badge } from '../../../../components/ui/Badge/Badge';
import { calculateDiscountPercentage } from '../../productSelectors';
import { useCommerceStore } from '../../../../stores/commerceStore';
import styles from './ProductPurchasePanel.module.css';

interface ProductPurchasePanelProps { product: Product; }

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const isFavorite = useCommerceStore((state) => state.favoriteIds.includes(product.id));
  const cartQuantity = useCommerceStore((state) => state.cart.find((line) => line.productId === product.id)?.quantity ?? 0);
  const addToCart = useCommerceStore((state) => state.addToCart);
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite);
  const isAvailable = product.stock > 0;
  const remainingStock = Math.max(0, product.stock - cartQuantity);
  const canAddToCart = isAvailable && remainingStock > 0;
  const selectedQuantity = Math.min(quantity, Math.max(1, remainingStock));
  const discount = calculateDiscountPercentage(product.priceCents, product.previousPriceCents);
  const updateQuantity = (next: number) => {
    const normalized = Number.isFinite(next) ? Math.trunc(next) : 1;
    setQuantity(Math.min(Math.max(1, normalized), Math.max(1, remainingStock)));
  };

  return <section className={styles.panel} aria-labelledby="product-title">
    <div className={styles.badges}>{product.isOrganic && <Badge variant="organic">Bio</Badge>}{product.isPromotion && <Badge variant="promotion">Promotion</Badge>}</div>
    <p className={styles.brand}>{product.brand}</p>
    <h1 id="product-title">{product.name}</h1>
    <p className={styles.shortDescription}>{product.shortDescription}</p>
    <div className={styles.rating} aria-label={`Note ${product.rating} sur 5, ${product.reviewCount} avis`}><Star size={17} fill="currentColor" aria-hidden="true" /><strong>{product.rating.toFixed(1)}</strong><span>{product.reviewCount} avis</span></div>

    <div className={styles.priceRow}>
      <strong>{formatPrice(product.priceCents)}</strong>
      {product.previousPriceCents !== undefined && <del>{formatPrice(product.previousPriceCents)}</del>}
      {discount !== undefined && <Badge variant="promotion">-{discount} %</Badge>}
    </div>
    <p className={styles.package}>{product.packageSize} · Prix par {product.unit}</p>

    <dl className={styles.facts}>
      <div><dt>Origine</dt><dd>{product.origin}</dd></div>
      <div><dt>Disponibilité</dt><dd className={isAvailable ? styles.available : styles.unavailable}>{isAvailable ? 'En stock' : 'Rupture de stock'}</dd></div>
    </dl>

    <div className={styles.quantityRow}>
      <span>Quantité</span>
      <div className={styles.quantity}>
        <button type="button" aria-label="Diminuer la quantité" disabled={!canAddToCart || selectedQuantity <= 1} onClick={() => updateQuantity(selectedQuantity - 1)}><Minus size={17} aria-hidden="true" /></button>
        <input aria-label="Quantité désirée" type="number" min="1" max={Math.max(1, remainingStock)} step="1" value={selectedQuantity} disabled={!canAddToCart} onChange={(event) => updateQuantity(Number(event.target.value))} />
        <button type="button" aria-label="Augmenter la quantité" disabled={!canAddToCart || selectedQuantity >= remainingStock} onClick={() => updateQuantity(selectedQuantity + 1)}><Plus size={17} aria-hidden="true" /></button>
      </div>
    </div>

    <div className={styles.actions}>
      <button className={styles.cart} type="button" aria-label={!isAvailable ? 'Indisponible' : canAddToCart ? 'Ajouter au panier' : 'Stock maximal atteint'} disabled={!canAddToCart} onClick={() => { const addedQuantity = addToCart(product.id, selectedQuantity); setMessage(addedQuantity > 0 ? `${addedQuantity} article${addedQuantity > 1 ? 's' : ''} ajouté${addedQuantity > 1 ? 's' : ''} au panier.` : 'Le stock maximal est déjà dans votre panier.'); }}><ShoppingBag size={19} aria-hidden="true" />{!isAvailable ? 'Indisponible' : canAddToCart ? 'Ajouter au panier' : 'Stock maximal atteint'}</button>
      <button className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`} type="button" aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} aria-pressed={isFavorite} onClick={() => { toggleFavorite(product.id); setMessage(isFavorite ? 'Produit retiré des favoris.' : 'Produit ajouté aux favoris.'); }}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />{isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button>
    </div>
    <p className={styles.status} aria-live="polite">{message}</p>
  </section>;
}
