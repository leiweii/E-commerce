import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../app/routes';
import { useCommerceStore } from '../../../../stores/commerceStore';
import type { CartItem } from '../../../../types/commerce';
import { formatPrice } from '../../../../utils/currency';
import styles from './CartItemRow.module.css';

interface CartItemRowProps { item: CartItem; }

export function CartItemRow({ item: { product, quantity } }: CartItemRowProps) {
  const setCartQuantity = useCommerceStore((state) => state.setCartQuantity);
  const removeFromCart = useCommerceStore((state) => state.removeFromCart);

  return <article className={styles.item}>
    <Link className={styles.imageLink} to={ROUTES.product(product.slug)} tabIndex={-1} aria-hidden="true">
      <img src={product.images[0].src} alt="" width="160" height="120" />
    </Link>
    <div className={styles.details}>
      <div>
        <p className={styles.brand}>{product.brand}</p>
        <h2><Link to={ROUTES.product(product.slug)}>{product.name}</Link></h2>
        <p className={styles.meta}>{product.packageSize} · {product.origin}</p>
      </div>
      <button className={styles.remove} type="button" aria-label={`Supprimer ${product.name} du panier`} onClick={() => removeFromCart(product.id)}><Trash2 size={17} aria-hidden="true" /><span>Supprimer</span></button>
    </div>
    <div className={styles.controls}>
      <div className={styles.quantity}>
        <button type="button" aria-label={`Diminuer la quantité de ${product.name}`} disabled={quantity <= 1} onClick={() => setCartQuantity(product.id, quantity - 1)}><Minus size={16} aria-hidden="true" /></button>
        <input aria-label={`Quantité de ${product.name}`} type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setCartQuantity(product.id, Number(event.target.value))} />
        <button type="button" aria-label={`Augmenter la quantité de ${product.name}`} disabled={quantity >= product.stock} onClick={() => setCartQuantity(product.id, quantity + 1)}><Plus size={16} aria-hidden="true" /></button>
      </div>
      <div className={styles.price}>
        <strong>{formatPrice(product.priceCents * quantity)}</strong>
        {product.previousPriceCents !== undefined && <del>{formatPrice(product.previousPriceCents * quantity)}</del>}
      </div>
    </div>
  </article>;
}
