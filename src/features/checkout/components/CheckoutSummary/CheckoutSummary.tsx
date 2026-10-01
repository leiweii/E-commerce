import type { CartItem } from '../../../../types/commerce';
import type { DeliveryMethod } from '../../../../types/order';
import { formatPrice } from '../../../../utils/currency';
import { calculateCartSummary } from '../../../commerce/cartCalculations';
import { calculateDeliveryCents } from '../../orderFactory';
import styles from './CheckoutSummary.module.css';

interface CheckoutSummaryProps { items: readonly CartItem[]; deliveryMethod: DeliveryMethod; }

export function CheckoutSummary({ items, deliveryMethod }: CheckoutSummaryProps) {
  const base = calculateCartSummary(items);
  const delivery = calculateDeliveryCents(deliveryMethod, base.subtotalCents);
  return <aside className={styles.summary} aria-label="Récapitulatif de commande">
    <h2>Votre commande</h2>
    <ul>{items.map(({ product, quantity }) => <li key={product.id}><img src={product.images[0].src} alt="" width="64" height="48" /><span><strong>{product.name}</strong><small>{quantity} × {formatPrice(product.priceCents)}</small></span></li>)}</ul>
    <dl><div><dt>Sous-total</dt><dd>{formatPrice(base.subtotalCents)}</dd></div>{base.savingsCents > 0 && <div className={styles.savings}><dt>Économies</dt><dd>-{formatPrice(base.savingsCents)}</dd></div>}<div><dt>Livraison</dt><dd>{delivery === 0 ? 'Offerte' : formatPrice(delivery)}</dd></div><div className={styles.total}><dt>Total</dt><dd>{formatPrice(base.subtotalCents + delivery)}</dd></div></dl>
    <p>Aucun achat réel ne sera effectué.</p>
  </aside>;
}
