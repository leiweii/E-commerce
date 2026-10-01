import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { getCartItemCount, useCommerceStore } from '../../../stores/commerceStore';
import { Container } from '../../ui/Container/Container';
import { MainNavigation } from '../MainNavigation/MainNavigation';
import { MobileNavigation } from '../MobileNavigation/MobileNavigation';
import styles from './Header.module.css';

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const itemCount = useCommerceStore((state) => getCartItemCount(state.cart));
  const actions = [
    { to: ROUTES.search, label: 'Rechercher', icon: Search }, { to: ROUTES.favorites, label: 'Favoris', icon: Heart },
    { to: ROUTES.account, label: 'Mon compte', icon: UserRound },
    { to: ROUTES.cart, label: itemCount > 0 ? `Panier, ${itemCount} article${itemCount > 1 ? 's' : ''}` : 'Panier', icon: ShoppingBag, count: itemCount },
  ];
  return <header className={styles.header}>
    <Container className={styles.inner}>
      <Link className={styles.brand} to={ROUTES.home} aria-label="Marché Frais, accueil"><span>Marché</span><strong>Frais</strong></Link>
      <MainNavigation />
      <div className={styles.actions}>{actions.map(({ to, label, icon: Icon, count }) => <Link key={to} to={to} aria-label={label} title={label}><Icon size={20} aria-hidden="true" />{count !== undefined && count > 0 && <span className={styles.cartCount} aria-hidden="true">{count > 99 ? '99+' : count}</span>}</Link>)}</div>
      <button className={styles.menuButton} type="button" aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </Container>
    <MobileNavigation isOpen={isMenuOpen} onNavigate={() => setMenuOpen(false)} />
  </header>;
}
