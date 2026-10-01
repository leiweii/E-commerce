import { CategoryCard } from '../../../../components/catalog/CategoryCard/CategoryCard';
import { Container } from '../../../../components/ui/Container/Container';
import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader';
import { categories } from '../../../../data/categories';
import styles from './CategorySection.module.css';

export function CategorySection() { return <section className={styles.section}><Container><SectionHeader eyebrow="Tout pour bien manger" title="Explorez nos univers" description="Des rayons pensés pour trouver rapidement les essentiels comme les nouvelles envies." /><div className={styles.grid}>{categories.map((category) => <CategoryCard key={category.id} category={category} />)}</div></Container></section>; }
