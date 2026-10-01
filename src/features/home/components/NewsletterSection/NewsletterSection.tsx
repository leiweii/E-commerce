import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/ui/Button/Button';
import { Container } from '../../../../components/ui/Container/Container';
import { newsletterSchema, type NewsletterFormValues } from '../../newsletterSchema';
import styles from './NewsletterSection.module.css';

export function NewsletterSection() {
  const [feedback, setFeedback] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: '' } });
  const submit = handleSubmit(() => { setFeedback('Inscription simulée : merci, votre adresse n’a pas été envoyée.'); reset(); });
  return <section className={styles.section}><Container><div className={styles.card}>
    <span className={styles.icon}><Mail aria-hidden="true" /></span>
    <div><p className={styles.eyebrow}>Le courrier du marché</p><h2>Recevez nos idées fraîches</h2><p>Produits de saison, recettes simples et nouveautés, une fois par semaine.</p></div>
    <form className={styles.form} onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email">Votre adresse e-mail</label>
      <div><input id="newsletter-email" type="email" placeholder="vous@exemple.fr" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'newsletter-error' : 'newsletter-note'} {...register('email')} /><Button type="submit">S’inscrire</Button></div>
      {errors.email ? <small id="newsletter-error" className={styles.error}>{errors.email.message}</small> : <small id="newsletter-note">Démonstration locale : aucune donnée n’est envoyée.</small>}
      {feedback && <p className={styles.feedback} role="status">{feedback}</p>}
    </form>
  </div></Container></section>;
}
