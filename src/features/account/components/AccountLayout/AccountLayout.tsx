import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../app/routes';
import { Container } from '../../../../components/ui/Container/Container';
import { PageHeader } from '../../../../components/ui/PageHeader/PageHeader';
import styles from './AccountLayout.module.css';

interface AccountLayoutProps { title: string; description: string; children: ReactNode; }

export function AccountLayout({ title, description, children }: AccountLayoutProps) {
  return <div className={styles.page}><Container>
    <PageHeader eyebrow="Compte de démonstration" title={title} description={description} />
    <div className={styles.layout}>
      <nav className={styles.nav} aria-label="Espace client">
        <NavLink to={ROUTES.account} end>Mon compte</NavLink>
        <NavLink to={ROUTES.orders}>Mes commandes</NavLink>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  </Container></div>;
}
