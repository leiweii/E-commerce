import { CheckCircle2, PackageSearch } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import { formatPrice } from '../../utils/currency';
import { useOrderStore } from '../../stores/orderStore';
import styles from './OrderConfirmationPage.module.css';

export function OrderConfirmationPage() {
  const { orderId = '' } = useParams<{ orderId: string }>();
  const order = useOrderStore((state) => state.orders.find(({ id }) => id === orderId));

  if (!order) {
    return <div className={styles.page}><Container><section className={styles.missing}>
      <PackageSearch size={36} aria-hidden="true" />
      <h1>Commande introuvable</h1>
      <p>Cette commande n’existe pas ou n’est plus disponible sur cet appareil.</p>
      <div className={styles.actions}><ButtonLink to={ROUTES.orders}>Voir mes commandes</ButtonLink><ButtonLink to={ROUTES.products} variant="secondary">Voir les produits</ButtonLink></div>
    </section></Container></div>;
  }

  return <div className={styles.page}><Container>
    <header className={styles.header}>
      <span className={styles.successIcon}><CheckCircle2 size={34} aria-hidden="true" /></span>
      <p className={styles.eyebrow}>Merci {order.contact.firstName}</p>
      <h1>Commande confirmée</h1>
      <p>Votre commande fictive a bien été enregistrée sur cet appareil.</p>
      <strong className={styles.orderNumber}>{order.id}</strong>
    </header>
    <div className={styles.grid}>
      <section className={styles.card} aria-labelledby="confirmation-products"><h2 id="confirmation-products">Produits</h2><ul className={styles.products}>{order.lines.map((line) => <li key={line.productId}>
        <img src={line.imageSrc} alt={line.imageAlt} width="80" height="60" />
        <span><strong>{line.name}</strong><small>{line.packageSize} · Quantité {line.quantity}</small></span>
        <strong>{formatPrice(line.unitPriceCents * line.quantity)}</strong>
      </li>)}</ul><div className={styles.total}><span>Total</span><strong>{formatPrice(order.totalCents)}</strong></div></section>
      <aside className={styles.details}>
        <section className={styles.card}><h2>Livraison</h2><p>{order.contact.firstName} {order.contact.lastName}<br />{order.address.street}<br />{order.address.complement && <>{order.address.complement}<br /></>}{order.address.postalCode} {order.address.city}</p><p className={styles.muted}>{order.delivery.label}</p></section>
        <section className={styles.card}><h2>Paiement</h2><p>{order.paymentMethod === 'card' ? 'Carte de démonstration' : 'PayPal fictif'}</p><p className={styles.muted}>Aucune transaction réelle.</p></section>
      </aside>
    </div>
    <div className={styles.footerActions}><ButtonLink to={ROUTES.products}>Continuer mes achats</ButtonLink><ButtonLink to={ROUTES.orders} variant="secondary">Voir mes commandes</ButtonLink></div>
  </Container></div>;
}
