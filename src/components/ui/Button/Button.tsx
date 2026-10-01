import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const classNames = (variant: ButtonVariant, className = '') =>
  `${styles.button} ${styles[variant]} ${className}`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={classNames(variant, className)} {...props} />;
}

interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={classNames(variant, className)} {...props} />;
}
