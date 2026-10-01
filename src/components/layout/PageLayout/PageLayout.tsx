import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './PageLayout.module.css';

export function PageLayout() {
  return <><a className={styles.skipLink} href="#main-content">Aller au contenu</a><Header /><main id="main-content"><Outlet /></main><Footer /></>;
}
