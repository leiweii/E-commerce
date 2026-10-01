import type { LucideIcon } from 'lucide-react';
import { ButtonLink } from '../../../../components/ui/Button/Button';
import styles from './CommerceEmptyState.module.css';

interface CommerceEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
}

export function CommerceEmptyState({ icon: Icon, title, description, actionLabel, actionTo }: CommerceEmptyStateProps) {
  return <section className={styles.emptyState}>
    <span className={styles.icon}><Icon size={28} aria-hidden="true" /></span>
    <h2>{title}</h2>
    <p>{description}</p>
    <ButtonLink to={actionTo}>{actionLabel}</ButtonLink>
  </section>;
}
