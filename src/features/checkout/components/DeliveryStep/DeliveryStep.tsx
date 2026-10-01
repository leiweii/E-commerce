import { useFormContext } from 'react-hook-form';
import { formatPrice } from '../../../../utils/currency';
import type { CheckoutFormValues } from '../../checkoutSchema';
import styles from '../CheckoutFields.module.css';

const options = [
  { value: 'standard', label: 'Livraison standard', description: 'Sous 2 à 3 jours ouvrés · offerte dès 50 €', price: 490 },
  { value: 'express', label: 'Livraison express', description: 'Le prochain jour ouvré', price: 890 },
  { value: 'relay', label: 'Point relais', description: 'Sous 3 à 4 jours ouvrés', price: 290 },
] as const;

export function DeliveryStep() {
  const { register } = useFormContext<CheckoutFormValues>();
  return <section className={styles.step} aria-labelledby="delivery-step-title">
    <h2 id="delivery-step-title">Mode de livraison</h2><p className={styles.intro}>Les créneaux et points relais sont simulés pour ce projet.</p>
    <fieldset className={styles.options}><legend className={styles.legend}>Choisir une livraison</legend>{options.map((option) => <label className={styles.option} key={option.value}>
      <input type="radio" value={option.value} {...register('deliveryMethod')} />
      <span><strong>{option.label}</strong><small>{option.description}</small></span><strong>{formatPrice(option.price)}</strong>
    </label>)}</fieldset>
  </section>;
}
