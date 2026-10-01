import type { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'neutral' | 'organic' | 'promotion' | 'new';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'neutral', className = '', ...props }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`} {...props} />;
}
