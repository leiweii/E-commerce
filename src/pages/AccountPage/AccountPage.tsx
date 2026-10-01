import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button/Button';
import { AccountLayout } from '../../features/account/components/AccountLayout/AccountLayout';
import { profileSchema, type ProfileFormValues } from '../../features/account/profileSchema';
import { useProfileStore } from '../../stores/profileStore';
import styles from './AccountPage.module.css';

export function AccountPage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const resetProfile = useProfileStore((state) => state.resetProfile);
  const [feedback, setFeedback] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: profile });

  const save = handleSubmit((values) => { updateProfile(values); setFeedback('Profil enregistré sur cet appareil.'); });
  const resetToDefault = () => { resetProfile(); const restored = useProfileStore.getState().profile; reset(restored); setFeedback('Profil fictif réinitialisé.'); };
  const error = (message?: string) => message ? <span className={styles.error}>{message}</span> : null;

  return <AccountLayout title="Mon compte" description="Modifiez votre identité fictive et vos préférences enregistrées uniquement dans ce navigateur.">
    <form className={styles.form} onSubmit={save} noValidate>
      <section aria-labelledby="identity-title"><h2 id="identity-title">Informations personnelles</h2><div className={styles.grid}>
        <div className={styles.field}><label htmlFor="profile-firstName">Prénom</label><input id="profile-firstName" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} {...register('firstName')} />{error(errors.firstName?.message)}</div>
        <div className={styles.field}><label htmlFor="profile-lastName">Nom</label><input id="profile-lastName" autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} {...register('lastName')} />{error(errors.lastName?.message)}</div>
        <div className={styles.field}><label htmlFor="profile-email">Email</label><input id="profile-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />{error(errors.email?.message)}</div>
        <div className={styles.field}><label htmlFor="profile-phone">Téléphone</label><input id="profile-phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...register('phone')} />{error(errors.phone?.message)}</div>
      </div></section>
      <section aria-labelledby="address-title"><h2 id="address-title">Adresse</h2><div className={styles.grid}>
        <div className={`${styles.field} ${styles.full}`}><label htmlFor="profile-street">Adresse</label><input id="profile-street" autoComplete="street-address" aria-invalid={Boolean(errors.address?.street)} {...register('address.street')} />{error(errors.address?.street?.message)}</div>
        <div className={`${styles.field} ${styles.full}`}><label htmlFor="profile-complement">Complément <span>(facultatif)</span></label><input id="profile-complement" autoComplete="address-line2" {...register('address.complement')} />{error(errors.address?.complement?.message)}</div>
        <div className={styles.field}><label htmlFor="profile-postalCode">Code postal</label><input id="profile-postalCode" inputMode="numeric" autoComplete="postal-code" aria-invalid={Boolean(errors.address?.postalCode)} {...register('address.postalCode')} />{error(errors.address?.postalCode?.message)}</div>
        <div className={styles.field}><label htmlFor="profile-city">Ville</label><input id="profile-city" autoComplete="address-level2" aria-invalid={Boolean(errors.address?.city)} {...register('address.city')} />{error(errors.address?.city?.message)}</div>
      </div></section>
      <section aria-labelledby="preferences-title"><h2 id="preferences-title">Préférences</h2><div className={styles.preferences}>
        <label><input type="checkbox" {...register('preferences.newsletter')} /><span><strong>Newsletter</strong><small>Recevoir les nouvelles du marché fictif.</small></span></label>
        <label><input type="checkbox" {...register('preferences.promotionalOffers')} /><span><strong>Offres promotionnelles</strong><small>Voir les offres sélectionnées pour ce profil.</small></span></label>
        <label><input type="checkbox" {...register('preferences.deliverySms')} /><span><strong>Suivi par SMS</strong><small>Simuler les alertes de livraison.</small></span></label>
      </div></section>
      {feedback && <p className={styles.feedback} role="status">{feedback}</p>}
      <div className={styles.actions}><Button type="submit">Enregistrer mes informations</Button><Button variant="secondary" onClick={resetToDefault}>Réinitialiser le profil fictif</Button></div>
    </form>
  </AccountLayout>;
}
