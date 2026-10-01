import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import styles from './MobileNavigation.module.css';

interface MobileNavigationProps { isOpen: boolean; onNavigate: () => void; }

const links = [
  [ROUTES.products, 'Tous les produits'], [ROUTES.categories, 'Catégories'], [ROUTES.search, 'Rechercher'], [ROUTES.promotions, 'Promotions'],
  [ROUTES.favorites, 'Favoris'], [ROUTES.account, 'Mon compte'], [ROUTES.about, 'À propos'], [ROUTES.contact, 'Contact'],
] as const;

export function MobileNavigation({ isOpen, onNavigate }: MobileNavigationProps) {
  return <nav id="mobile-navigation" className={`${styles.nav} ${isOpen ? styles.open : ''}`} aria-label="Navigation mobile" aria-hidden={!isOpen}><ul>{links.map(([to, label]) => <li key={to}><NavLink to={to} onClick={onNavigate}>{label}</NavLink></li>)}</ul></nav>;
}
