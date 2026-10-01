import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { Container } from '../../ui/Container/Container';
import styles from './Footer.module.css';

export function Footer() {
  return <footer className={styles.footer}><Container>
    <div className={styles.grid}>
      <div><p className={styles.brand}>Marché <strong>Frais</strong></p><p className={styles.copy}>Une épicerie en ligne fictive pensée comme un vrai produit numérique français.</p></div>
      <div><h2>Découvrir</h2><ul><li><Link to={ROUTES.products}>Tous les produits</Link></li><li><Link to={ROUTES.categories}>Catégories</Link></li><li><Link to={ROUTES.promotions}>Promotions</Link></li></ul></div>
      <div><h2>Marché Frais</h2><ul><li><Link to={ROUTES.about}>À propos</Link></li><li><Link to={ROUTES.contact}>Contact</Link></li><li><Link to={ROUTES.account}>Mon compte</Link></li></ul></div>
    </div>
    <div className={styles.bottom}><span>© 2026 Marché Frais</span><span>Projet de démonstration — aucun achat réel.</span></div>
  </Container></footer>;
}
