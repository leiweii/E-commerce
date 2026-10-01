import { ArrowRight, Truck } from 'lucide-react';
import { ROUTES } from '../../../../app/routes';
import { ButtonLink } from '../../../../components/ui/Button/Button';
import { Container } from '../../../../components/ui/Container/Container';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return <section className={styles.hero}><Container className={styles.inner}>
    <div className={styles.content}><p className={styles.eyebrow}>Le marché vient à vous</p><h1>Mieux manger,<br />simplement.</h1><p className={styles.lead}>Des produits du quotidien bien choisis, des origines claires et une livraison qui respecte votre rythme.</p><div className={styles.actions}><ButtonLink to={ROUTES.products}>Découvrir les produits <ArrowRight size={18} aria-hidden="true" /></ButtonLink><ButtonLink to={ROUTES.categories} variant="secondary">Voir les catégories</ButtonLink></div><p className={styles.delivery}><Truck size={18} aria-hidden="true" /> Livraison offerte dès 50 € d’achats</p></div>
    <div className={styles.visual}><img src="/images/hero/panier-marche.webp" alt="Panier garni de légumes, fruits, pain et produits frais" width="1792" height="896" fetchPriority="high" /><span>Produits de saison</span></div>
  </Container></section>;
}
