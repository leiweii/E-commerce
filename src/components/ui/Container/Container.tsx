import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...props
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as ?? 'div';
  return <Component className={`${styles.container} ${className}`} {...props}>{children}</Component>;
}
