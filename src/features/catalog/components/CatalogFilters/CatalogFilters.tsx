import type { Category } from '../../../../types/catalog';
import type { CatalogFilters as CatalogFiltersState } from '../../catalogFilters';
import styles from './CatalogFilters.module.css';

interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  categories: readonly Category[];
  activeFilterCount: number;
  hideCategories?: boolean;
  lockPromotion?: boolean;
  showTitle?: boolean;
  onChange: (changes: Partial<CatalogFiltersState>) => void;
  onReset: () => void;
}

const centsToInput = (value?: number) => value === undefined ? '' : String(value / 100);

export function CatalogFilters({
  filters,
  categories,
  activeFilterCount,
  hideCategories = false,
  lockPromotion = false,
  showTitle = true,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  const toggleCategory = (categoryId: string) => {
    const categoryIds = filters.categoryIds.includes(categoryId)
      ? filters.categoryIds.filter((id) => id !== categoryId)
      : [...filters.categoryIds, categoryId];
    onChange({ categoryIds });
  };

  const parsePrice = (value: string) => value === '' ? undefined : Math.max(0, Math.round(Number(value) * 100));

  return <div className={styles.filters}>
    {(showTitle || activeFilterCount > 0) && <div className={styles.heading}>
      <div>{showTitle && <strong>Filtres</strong>}{activeFilterCount > 0 && <span>{activeFilterCount} {activeFilterCount > 1 ? 'filtres actifs' : 'filtre actif'}</span>}</div>
      <button type="button" onClick={onReset} disabled={activeFilterCount === 0}>Réinitialiser les filtres</button>
    </div>}

    {!hideCategories && <fieldset>
      <legend>Catégories</legend>
      <div className={styles.options}>{categories.map((category) => <label key={category.id}>
        <input type="checkbox" checked={filters.categoryIds.includes(category.id)} onChange={() => toggleCategory(category.id)} />
        <span>{category.name}</span>
      </label>)}</div>
    </fieldset>}

    <fieldset>
      <legend>Prix</legend>
      <div className={styles.priceFields}>
        <label><span>Minimum</span><span className={styles.priceInput}><input type="number" min="0" step="0.5" inputMode="decimal" value={centsToInput(filters.minPriceCents)} onChange={(event) => onChange({ minPriceCents: parsePrice(event.target.value) })} /><span>€</span></span></label>
        <label><span>Maximum</span><span className={styles.priceInput}><input type="number" min="0" step="0.5" inputMode="decimal" value={centsToInput(filters.maxPriceCents)} onChange={(event) => onChange({ maxPriceCents: parsePrice(event.target.value) })} /><span>€</span></span></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Sélection</legend>
      <div className={styles.options}>
        <label><input type="checkbox" checked={filters.organicOnly} onChange={(event) => onChange({ organicOnly: event.target.checked })} /><span>Produits bio</span></label>
        {!lockPromotion && <label><input type="checkbox" checked={filters.promotionOnly} onChange={(event) => onChange({ promotionOnly: event.target.checked })} /><span>En promotion</span></label>}
        <label><input type="checkbox" checked={filters.availableOnly} onChange={(event) => onChange({ availableOnly: event.target.checked })} /><span>En stock uniquement</span></label>
      </div>
    </fieldset>
  </div>;
}
