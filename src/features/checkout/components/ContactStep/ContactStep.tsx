import { useFormContext } from 'react-hook-form';
import type { CheckoutFormValues } from '../../checkoutSchema';
import styles from '../CheckoutFields.module.css';

export function ContactStep() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormValues>();
  return <section className={styles.step} aria-labelledby="contact-step-title">
    <h2 id="contact-step-title">Vos coordonnées</h2><p className={styles.intro}>Ces informations servent uniquement à cette commande fictive.</p>
    <div className={styles.grid}>
      <div className={styles.field}><label htmlFor="firstName">Prénom</label><input id="firstName" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'firstName-error' : undefined} {...register('firstName')} />{errors.firstName && <span id="firstName-error" className={styles.error}>{errors.firstName.message}</span>}</div>
      <div className={styles.field}><label htmlFor="lastName">Nom</label><input id="lastName" autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'lastName-error' : undefined} {...register('lastName')} />{errors.lastName && <span id="lastName-error" className={styles.error}>{errors.lastName.message}</span>}</div>
      <div className={styles.field}><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'checkout-email-error' : undefined} {...register('email')} />{errors.email && <span id="checkout-email-error" className={styles.error}>{errors.email.message}</span>}</div>
      <div className={styles.field}><label htmlFor="phone">Téléphone</label><input id="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} {...register('phone')} />{errors.phone && <span id="phone-error" className={styles.error}>{errors.phone.message}</span>}</div>
    </div>
  </section>;
}
