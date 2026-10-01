import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(' ');

  return <header className={classes}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h1>{title}</h1>
    <p className={styles.description}>{description}</p>
  </header>;
}
