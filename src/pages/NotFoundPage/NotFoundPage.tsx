import { SearchX } from 'lucide-react';
import { ROUTES } from '../../app/routes';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return <Container className={styles.page}>
    <span className={styles.icon}><SearchX size={30} aria-hidden="true" /></span>
    <p className={styles.code}>Erreur 404</p>
    <h1>Page introuvable</h1>
    <p className={styles.copy}>Cette adresse n’existe pas ou a été déplacée. Le marché, lui, reste bien ouvert.</p>
    <div className={styles.actions}><ButtonLink to={ROUTES.home}>Retour à l’accueil</ButtonLink><ButtonLink to={ROUTES.products} variant="secondary">Voir tous les produits</ButtonLink></div>
  </Container>;
}
