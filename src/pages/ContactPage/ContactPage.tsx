import { zodResolver } from '@hookform/resolvers/zod';
import { Clock3, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { contactSchema, type ContactFormValues } from '../../features/contact/contactSchema';
import styles from './ContactPage.module.css';

const contactDetails = [
  { icon: MapPin, label: 'Adresse', value: '24 rue du Marché, 75011 Paris' },
  { icon: Phone, label: 'Téléphone', value: '01 84 80 20 26' },
  { icon: Mail, label: 'Email', value: 'bonjour@marchefrais-demo.fr' },
] as const;

export function ContactPage() {
  const [isSubmitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: '', name: '', email: '', message: '' },
  });

  const submit = () => {
    setSubmitted(true);
    reset();
  };

  return <div className={styles.page}>
    <Container>
      <PageHeader eyebrow="Une question ?" title="Contactez-nous" description="Notre équipe fictive vous répondrait avec plaisir. Ici, aucun message ne quitte votre navigateur." />
      <div className={styles.layout}>
        <aside className={styles.details} aria-label="Coordonnées et horaires">
          <h2>Marché Frais</h2>
          <p>Retrouvez nos coordonnées de démonstration et nos horaires habituels.</p>
          <ul>{contactDetails.map(({ icon: Icon, label, value }) => <li key={label}><span><Icon size={19} aria-hidden="true" /></span><div><strong>{label}</strong><p>{value}</p></div></li>)}</ul>
          <div className={styles.hours}><Clock3 size={20} aria-hidden="true" /><div><h3>Horaires</h3><p>Lundi – vendredi : 9h à 18h</p><p>Samedi : 9h à 13h</p><p>Dimanche : fermé</p></div></div>
        </aside>

        <section className={styles.formCard} aria-labelledby="contact-form-title">
          <div className={styles.formHeading}><div><p>Formulaire local</p><h2 id="contact-form-title">Envoyez-nous un message</h2></div><ShieldCheck size={25} aria-hidden="true" /></div>
          {isSubmitted && <div className={styles.success} role="status"><Send size={21} aria-hidden="true" /><div><h3>Message bien reçu</h3><p>Merci pour votre message. Dans cette démonstration, aucune requête n’a été envoyée.</p></div></div>}
          <form noValidate onChange={() => setSubmitted(false)} onSubmit={handleSubmit(submit)}>
            <div className={styles.field}>
              <label htmlFor="contact-subject">Sujet</label>
              <select id="contact-subject" required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} {...register('subject')}><option value="">Choisir un sujet</option><option value="order">Une commande</option><option value="product">Un produit</option><option value="partnership">Un partenariat</option><option value="other">Autre demande</option></select>
              {errors.subject && <span id="subject-error" className={styles.error}>{errors.subject.message}</span>}
            </div>
            <div className={styles.twoColumns}>
              <div className={styles.field}><label htmlFor="contact-name">Nom</label><input id="contact-name" type="text" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />{errors.name && <span id="name-error" className={styles.error}>{errors.name.message}</span>}</div>
              <div className={styles.field}><label htmlFor="contact-email">Email</label><input id="contact-email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />{errors.email && <span id="email-error" className={styles.error}>{errors.email.message}</span>}</div>
            </div>
            <div className={styles.field}><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows={7} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-help'} {...register('message')} /><small id="message-help">10 à 1 000 caractères. Aucune donnée n’est transmise.</small>{errors.message && <span id="message-error" className={styles.error}>{errors.message.message}</span>}</div>
            <Button type="submit" disabled={isSubmitting}>Envoyer le message</Button>
          </form>
        </section>
      </div>
    </Container>
  </div>;
}
