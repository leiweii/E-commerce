import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import styles from './MainNavigation.module.css';

const links = [
  { to: ROUTES.products, label: 'Produits' }, { to: ROUTES.categories, label: 'Catégories' },
  { to: ROUTES.promotions, label: 'Promotions' }, { to: ROUTES.about, label: 'À propos' },
];

export function MainNavigation() {
  return <nav className={styles.nav} aria-label="Navigation principale"><ul>{links.map((link) => <li key={link.to}><NavLink to={link.to} className={({ isActive }) => isActive ? styles.active : undefined}>{link.label}</NavLink></li>)}</ul></nav>;
}
