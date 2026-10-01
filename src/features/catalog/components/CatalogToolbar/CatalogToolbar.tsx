import { SlidersHorizontal, Search } from 'lucide-react';
import type { CatalogSort } from '../../catalogFilters';
import styles from './CatalogToolbar.module.css';

interface CatalogToolbarProps {
  query: string;
  sort: CatalogSort;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: CatalogSort) => void;
  onOpenFilters: () => void;
}

export function CatalogToolbar({ query, sort, resultCount, onQueryChange, onSortChange, onOpenFilters }: CatalogToolbarProps) {
  return <div className={styles.toolbar}>
    <label className={styles.search}>
      <Search size={19} aria-hidden="true" />
      <span className={styles.srOnly}>Rechercher par nom ou marque</span>
      <input type="search" value={query} placeholder="Rechercher un produit ou une marque" aria-label="Rechercher par nom ou marque" onChange={(event) => onQueryChange(event.target.value)} />
    </label>
    <div className={styles.actions}>
      <button className={styles.filterButton} type="button" aria-label="Ouvrir les filtres" onClick={onOpenFilters}><SlidersHorizontal size={18} aria-hidden="true" />Filtres</button>
      <label className={styles.sort}><span>Trier par</span><select value={sort} onChange={(event) => onSortChange(event.target.value as CatalogSort)}>
        <option value="popularity">Popularité</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="newest">Nouveautés</option>
      </select></label>
    </div>
    <p className={styles.count} aria-live="polite">{resultCount} {resultCount === 1 ? 'produit' : 'produits'}</p>
  </div>;
}
