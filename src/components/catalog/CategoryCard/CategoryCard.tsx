import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import type { Category } from '../../../types/catalog';
import styles from './CategoryCard.module.css';

interface CategoryCardProps { category: Category; }
export function CategoryCard({ category }: CategoryCardProps) {
  return <Link className={styles.card} to={ROUTES.category(category.slug)} aria-label={`Découvrir la catégorie ${category.name}`}>
    <img src={category.image} alt={category.imageAlt} width="600" height="450" loading="lazy" />
    <div><h3>{category.name}</h3><p>{category.description}</p></div><ArrowUpRight size={20} aria-hidden="true" />
  </Link>;
}
