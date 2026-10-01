import { useFormContext } from 'react-hook-form';
import type { CheckoutFormValues } from '../../checkoutSchema';
import styles from '../CheckoutFields.module.css';

export function PaymentStep() {
  const { register, watch, formState: { errors } } = useFormContext<CheckoutFormValues>();
  const method = watch('paymentMethod');
  return <section className={styles.step} aria-labelledby="payment-step-title">
    <h2 id="payment-step-title">Paiement simulé</h2><p className={styles.intro}>Aucun paiement réel ne sera effectué et aucune donnée bancaire ne sera conservée.</p>
    <fieldset className={styles.options}><legend className={styles.legend}>Choisir un moyen de paiement</legend>
      <label className={styles.option}><input type="radio" value="card" {...register('paymentMethod')} /><span><strong>Carte de démonstration</strong><small>Utilisation locale et temporaire</small></span></label>
      <label className={styles.option}><input type="radio" value="paypal" {...register('paymentMethod')} /><span><strong>PayPal fictif</strong><small>Aucune redirection externe</small></span></label>
    </fieldset>
    {method === 'card' ? <><p className={styles.notice}>Utilisez uniquement les données de démonstration : 4242 4242 4242 4242, 12/30 et 123.</p><div className={styles.grid}>
      <div className={`${styles.field} ${styles.full}`}><label htmlFor="cardNumber">Numéro de carte</label><input id="cardNumber" inputMode="numeric" autoComplete="off" aria-invalid={Boolean(errors.cardNumber)} aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined} {...register('cardNumber')} />{errors.cardNumber && <span id="cardNumber-error" className={styles.error}>{errors.cardNumber.message}</span>}</div>
      <div className={styles.field}><label htmlFor="cardExpiry">Expiration</label><input id="cardExpiry" placeholder="12/30" autoComplete="off" aria-invalid={Boolean(errors.cardExpiry)} aria-describedby={errors.cardExpiry ? 'cardExpiry-error' : undefined} {...register('cardExpiry')} />{errors.cardExpiry && <span id="cardExpiry-error" className={styles.error}>{errors.cardExpiry.message}</span>}</div>
      <div className={styles.field}><label htmlFor="cardCvc">Cryptogramme</label><input id="cardCvc" inputMode="numeric" autoComplete="off" aria-invalid={Boolean(errors.cardCvc)} aria-describedby={errors.cardCvc ? 'cardCvc-error' : undefined} {...register('cardCvc')} />{errors.cardCvc && <span id="cardCvc-error" className={styles.error}>{errors.cardCvc.message}</span>}</div>
    </div></> : <p className={styles.notice}>PayPal est entièrement simulé : aucune fenêtre et aucune transaction ne seront ouvertes.</p>}
  </section>;
}
