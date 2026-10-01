import type { CheckoutFormValues } from '../../checkoutSchema';
import styles from '../CheckoutFields.module.css';

interface ReviewStepProps { values: CheckoutFormValues; onEdit: (step: number) => void; }

export function ReviewStep({ values, onEdit }: ReviewStepProps) {
  return <section className={styles.step} aria-labelledby="review-step-title">
    <h2 id="review-step-title">Vérifiez votre commande</h2><p className={styles.intro}>Relisez les informations avant de créer la commande fictive.</p>
    <div className={styles.reviewGrid}>
      <article className={styles.reviewCard}><header><h3>Coordonnées</h3><button type="button" onClick={() => onEdit(0)}>Modifier</button></header><p>{values.firstName} {values.lastName}<br />{values.email}<br />{values.phone}</p></article>
      <article className={styles.reviewCard}><header><h3>Adresse</h3><button type="button" onClick={() => onEdit(1)}>Modifier</button></header><p>{values.address}<br />{values.addressComplement && <>{values.addressComplement}<br /></>}{values.postalCode} {values.city}</p></article>
      <article className={styles.reviewCard}><header><h3>Livraison</h3><button type="button" onClick={() => onEdit(2)}>Modifier</button></header><p>{values.deliveryMethod === 'standard' ? 'Livraison standard' : values.deliveryMethod === 'express' ? 'Livraison express' : 'Point relais'}</p></article>
      <article className={styles.reviewCard}><header><h3>Paiement</h3><button type="button" onClick={() => onEdit(3)}>Modifier</button></header><p>{values.paymentMethod === 'card' ? 'Carte de démonstration' : 'PayPal fictif'}<br />Aucune transaction réelle.</p></article>
    </div>
  </section>;
}
