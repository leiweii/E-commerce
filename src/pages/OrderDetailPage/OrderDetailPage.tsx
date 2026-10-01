import { PackageSearch } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Badge } from '../../components/ui/Badge/Badge';
import { ButtonLink } from '../../components/ui/Button/Button';
import { AccountLayout } from '../../features/account/components/AccountLayout/AccountLayout';
import { formatOrderDate, getOrderStatusLabel } from '../../features/account/orderPresentation';
import { useOrderStore } from '../../stores/orderStore';
import type { OrderStatus } from '../../types/order';
import { formatPrice } from '../../utils/currency';
import styles from './OrderDetailPage.module.css';

const timeline: { status: OrderStatus; label: string }[] = [
  { status: 'confirmed', label: 'Confirmée' }, { status: 'preparing', label: 'En préparation' }, { status: 'shipped', label: 'Expédiée' }, { status: 'delivered', label: 'Livrée' },
];

export function OrderDetailPage() {
  const { orderId = '' } = useParams<{ orderId: string }>();
  const order = useOrderStore((state) => state.orders.find(({ id }) => id === orderId));
  if (!order) return <AccountLayout title="Commande introuvable" description="Cette commande n’existe pas ou n’est plus disponible sur cet appareil."><section className={styles.missing}><PackageSearch size={34} aria-hidden="true" /><p>Consultez votre historique pour retrouver les commandes enregistrées.</p><ButtonLink to={ROUTES.orders}>Retour à mes commandes</ButtonLink></section></AccountLayout>;

  const currentStatusIndex = timeline.findIndex(({ status }) => status === order.status);
  return <AccountLayout title={`Commande ${order.id}`} description={`${formatOrderDate(order.createdAt)} · ${order.itemCount} article${order.itemCount > 1 ? 's' : ''}`}>
    <div className={styles.statusHeader}><Badge variant="organic">{getOrderStatusLabel(order.status)}</Badge></div>
    <ol className={styles.timeline} aria-label="Suivi de la commande">{timeline.map((step, index) => <li className={index <= currentStatusIndex ? styles.complete : undefined} key={step.status}><span aria-hidden="true" />{step.label}</li>)}</ol>
    <div className={styles.layout}>
      <section className={styles.card} aria-labelledby="order-products"><h2 id="order-products">Produits</h2><ul className={styles.products}>{order.lines.map((line) => <li key={line.productId}><img src={line.imageSrc} alt={line.imageAlt} width="80" height="60" /><span><strong>{line.name}</strong><small>{line.packageSize} · Quantité {line.quantity}</small><small>{formatPrice(line.unitPriceCents)} l’unité</small></span><strong>{formatPrice(line.quantity * line.unitPriceCents)}</strong></li>)}</ul></section>
      <aside className={styles.sidebar}>
        <section className={styles.card}><h2>Livraison</h2><p>{order.contact.firstName} {order.contact.lastName}<br /><span>{order.address.street}</span><br />{order.address.complement && <>{order.address.complement}<br /></>}{order.address.postalCode} {order.address.city}</p><p className={styles.muted}>{order.delivery.label}</p></section>
        <section className={styles.card}><h2>Paiement</h2><p>{order.paymentMethod === 'card' ? 'Carte de démonstration' : 'PayPal fictif'}</p><p className={styles.muted}>Aucune donnée bancaire conservée.</p></section>
        <section className={styles.card}><h2>Récapitulatif</h2><dl className={styles.totals}><div><dt>Sous-total</dt><dd>{formatPrice(order.subtotalCents)}</dd></div>{order.savingsCents > 0 && <div><dt>Économies</dt><dd>-{formatPrice(order.savingsCents)}</dd></div>}<div><dt>Livraison</dt><dd>{order.deliveryCents === 0 ? 'Offerte' : formatPrice(order.deliveryCents)}</dd></div><div className={styles.total}><dt>Total</dt><dd>{formatPrice(order.totalCents)}</dd></div></dl></section>
      </aside>
    </div>
    <div className={styles.actions}><ButtonLink to={ROUTES.orders} variant="secondary">Retour à mes commandes</ButtonLink><ButtonLink to={ROUTES.products}>Continuer mes achats</ButtonLink></div>
  </AccountLayout>;
}
