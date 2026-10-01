import { Check, Truck } from 'lucide-react';
import { ROUTES } from '../../../../app/routes';
import { ButtonLink } from '../../../../components/ui/Button/Button';
import type { CartSummary as CartSummaryData } from '../../../../types/commerce';
import { formatPrice } from '../../../../utils/currency';
import { FREE_DELIVERY_THRESHOLD_CENTS } from '../../cartCalculations';
import styles from './CartSummary.module.css';

interface CartSummaryProps { summary: CartSummaryData; }

export function CartSummary({ summary }: CartSummaryProps) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD_CENTS - summary.subtotalCents);
  const progress = Math.min(100, Math.round(summary.subtotalCents / FREE_DELIVERY_THRESHOLD_CENTS * 100));

  return <aside className={styles.summary} aria-label="Résumé du panier">
    <h2>Résumé du panier</h2>
    <dl>
      <div><dt>Sous-total ({summary.itemCount} article{summary.itemCount > 1 ? 's' : ''})</dt><dd>{formatPrice(summary.subtotalCents)}</dd></div>
      {summary.savingsCents > 0 && <div className={styles.savings}><dt>Vos économies</dt><dd>-{formatPrice(summary.savingsCents)}</dd></div>}
      <div><dt>Livraison</dt><dd>{summary.deliveryCents === 0 ? 'Offerte' : formatPrice(summary.deliveryCents)}</dd></div>
      <div className={styles.total}><dt>Total</dt><dd>{formatPrice(summary.totalCents)}</dd></div>
    </dl>
    <div className={styles.delivery}>
      <span><Truck size={18} aria-hidden="true" />{remaining > 0 ? `Plus que ${formatPrice(remaining)} pour la livraison offerte` : <><Check size={17} aria-hidden="true" />Livraison offerte</>}</span>
      <div className={styles.track} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    </div>
    <ButtonLink className={styles.checkout} to={ROUTES.checkout}>Passer la commande</ButtonLink>
    <p>Paiement fictif : aucune transaction réelle ne sera effectuée.</p>
  </aside>;
}
