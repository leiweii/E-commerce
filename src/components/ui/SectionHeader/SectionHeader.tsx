import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkTo?: string;
}

export function SectionHeader({ eyebrow, title, description, linkLabel, linkTo }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {linkLabel && linkTo && <Link className={styles.link} to={linkTo}>{linkLabel}<ArrowRight size={18} aria-hidden="true" /></Link>}
    </div>
  );
}
