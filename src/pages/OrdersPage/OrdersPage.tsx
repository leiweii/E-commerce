import { PackageOpen } from 'lucide-react';
import { ROUTES } from '../../app/routes';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import { AccountLayout } from '../../features/account/components/AccountLayout/AccountLayout';
import { formatOrderDate, getOrderStatusLabel, sortOrdersNewestFirst } from '../../features/account/orderPresentation';
import { useOrderStore } from '../../stores/orderStore';
import { formatPrice } from '../../utils/currency';
import styles from './OrdersPage.module.css';

export function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const sortedOrders = sortOrdersNewestFirst(orders);
  return <AccountLayout title="Mes commandes" description="Consultez les commandes fictives enregistrées sur cet appareil.">
    {sortedOrders.length === 0 ? <section className={styles.empty}>
      <PackageOpen size={34} aria-hidden="true" /><h2>Aucune commande pour le moment</h2><p>Votre historique se remplira après la validation d’une commande fictive.</p><ButtonLink to={ROUTES.products}>Continuer mes achats</ButtonLink>
    </section> : <ol className={styles.list}>{sortedOrders.map((order) => <li className={styles.card} key={order.id}>
      <div className={styles.top}><div><span>Commande</span><strong>{order.id}</strong></div><Badge variant="organic">{getOrderStatusLabel(order.status)}</Badge></div>
      <dl><div><dt>Date</dt><dd>{formatOrderDate(order.createdAt)}</dd></div><div><dt>Articles</dt><dd>{order.itemCount} article{order.itemCount > 1 ? 's' : ''}</dd></div><div><dt>Montant</dt><dd>{formatPrice(order.totalCents)}</dd></div></dl>
      <ButtonLink to={ROUTES.orderDetail(order.id)} variant="secondary">Voir le détail</ButtonLink>
    </li>)}</ol>}
  </AccountLayout>;
}
