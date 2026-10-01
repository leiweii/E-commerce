import { useFormContext } from 'react-hook-form';
import type { CheckoutFormValues } from '../../checkoutSchema';
import styles from '../CheckoutFields.module.css';

export function AddressStep() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();
  return <section className={styles.step} aria-labelledby="address-step-title">
    <h2 id="address-step-title">Adresse de livraison</h2><p className={styles.intro}>Indiquez une adresse française fictive pour cette démonstration.</p>
    <div className={styles.grid}>
      <div className={`${styles.field} ${styles.full}`}><label htmlFor="address">Adresse</label><input id="address" autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} {...register('address')} />{errors.address && <span id="address-error" className={styles.error}>{errors.address.message}</span>}</div>
      <div className={`${styles.field} ${styles.full}`}><label htmlFor="addressComplement">Complément <span>(facultatif)</span></label><input id="addressComplement" autoComplete="address-line2" aria-invalid={Boolean(errors.addressComplement)} {...register('addressComplement')} /></div>
      <div className={styles.field}><label htmlFor="postalCode">Code postal</label><input id="postalCode" inputMode="numeric" autoComplete="postal-code" aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? 'postalCode-error' : undefined} {...register('postalCode')} />{errors.postalCode && <span id="postalCode-error" className={styles.error}>{errors.postalCode.message}</span>}</div>
      <div className={styles.field}><label htmlFor="city">Ville</label><input id="city" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} {...register('city')} />{errors.city && <span id="city-error" className={styles.error}>{errors.city.message}</span>}</div>
    </div>
  </section>;
}
