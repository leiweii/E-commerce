import { ROUTES } from '../../app/routes';
import { CategoryCard } from '../../components/catalog/CategoryCard/CategoryCard';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { categories } from '../../data/categories';
import type { Category } from '../../types/catalog';
import styles from './CategoriesPage.module.css';

interface CategoriesPageProps { items?: readonly Category[]; }

export function CategoriesPage({ items = categories }: CategoriesPageProps) {
  return <div className={styles.page}>
    <Container>
      <PageHeader
        eyebrow="Tous nos univers"
        title="Toutes nos catégories"
        description="Du marché aux produits du quotidien, parcourez nos rayons et trouvez rapidement ce qu’il vous faut."
      />
      <section className={styles.content} aria-label="Liste des catégories">
        {items.length > 0
          ? <div className={styles.grid}>{items.map((category) => <CategoryCard key={category.id} category={category} />)}</div>
          : <div className={styles.empty}><h2>Aucune catégorie disponible</h2><p>Le catalogue complet reste accessible pendant la mise à jour de nos rayons.</p></div>}
        <div className={styles.action}><ButtonLink to={ROUTES.products}>Voir tous les produits</ButtonLink></div>
      </section>
    </Container>
  </div>;
}
