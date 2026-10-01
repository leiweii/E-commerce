import { ProductGrid } from '../../../../components/catalog/ProductGrid/ProductGrid';
import { Container } from '../../../../components/ui/Container/Container';
import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader';
import type { Product } from '../../../../types/catalog';
import styles from './ProductSection.module.css';

interface ProductSectionProps { ariaLabel: string; eyebrow: string; title: string; description: string; products: readonly Product[]; linkLabel: string; linkTo: string; tone?: 'default' | 'muted' | 'green'; }
export function ProductSection({ ariaLabel, eyebrow, title, description, products, linkLabel, linkTo, tone = 'default' }: ProductSectionProps) {
  return <section className={`${styles.section} ${styles[tone]}`} aria-label={ariaLabel}><Container><SectionHeader eyebrow={eyebrow} title={title} description={description} linkLabel={linkLabel} linkTo={linkTo} /><ProductGrid products={products} /></Container></section>;
}
