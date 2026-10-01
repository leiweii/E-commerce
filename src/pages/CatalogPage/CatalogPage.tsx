import { useCallback, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../../components/catalog/ProductGrid/ProductGrid';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { CatalogEmptyState } from '../../features/catalog/components/CatalogEmptyState/CatalogEmptyState';
import { CatalogFilters } from '../../features/catalog/components/CatalogFilters/CatalogFilters';
import { CatalogToolbar } from '../../features/catalog/components/CatalogToolbar/CatalogToolbar';
import { FilterDrawer } from '../../features/catalog/components/FilterDrawer/FilterDrawer';
import {
  DEFAULT_CATALOG_FILTERS,
  filterAndSortProducts,
  getVisibleProducts,
  parseCatalogFilters,
  serializeCatalogFilters,
  type CatalogFilters as CatalogFiltersState,
} from '../../features/catalog/catalogFilters';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './CatalogPage.module.css';

export type CatalogPageMode = 'all' | 'category' | 'search' | 'promotions';

interface CatalogPageProps { mode: CatalogPageMode; }

const PAGE_COPY = {
  all: { eyebrow: 'Le marché en ligne', title: 'Tous les produits', description: 'Des essentiels du quotidien aux découvertes gourmandes, sélectionnés avec soin.' },
  search: { eyebrow: 'Trouver un produit', title: 'Recherche', description: 'Recherchez un produit ou une marque dans tout notre catalogue.' },
  promotions: { eyebrow: 'Les bons plans du marché', title: 'Les promotions', description: 'Une sélection d’offres utiles et gourmandes, disponibles pour une durée limitée.' },
} as const;

function countActiveFilters(filters: CatalogFiltersState, mode: CatalogPageMode) {
  return Number(filters.categoryIds.length > 0 && mode !== 'category')
    + Number(filters.minPriceCents !== undefined)
    + Number(filters.maxPriceCents !== undefined)
    + Number(filters.organicOnly)
    + Number(filters.promotionOnly && mode !== 'promotions')
    + Number(filters.availableOnly);
}

export function CatalogPage({ mode }: CatalogPageProps) {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const category = mode === 'category' ? categories.find(({ slug }) => slug === categorySlug) : undefined;
  const parsedFilters = useMemo(() => parseCatalogFilters(searchParams), [searchParams]);
  const filters = useMemo<CatalogFiltersState>(() => ({
    ...parsedFilters,
    categoryIds: category ? [category.id] : parsedFilters.categoryIds,
    promotionOnly: mode === 'promotions' ? true : parsedFilters.promotionOnly,
  }), [category, mode, parsedFilters]);

  const filteredProducts = useMemo(() => filterAndSortProducts(products, filters), [filters]);
  const visibleProducts = useMemo(() => getVisibleProducts(filteredProducts, filters.page), [filteredProducts, filters.page]);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  if (mode === 'category' && !category) return <NotFoundPage />;

  const copy = category
    ? { eyebrow: 'Une sélection du marché', title: category.name, description: category.description }
    : PAGE_COPY[mode as Exclude<CatalogPageMode, 'category'>];

  const updateFilters = (changes: Partial<CatalogFiltersState>) => {
    setSearchParams(serializeCatalogFilters({ ...filters, ...changes, page: changes.page ?? 1 }), { replace: true });
  };

  const resetFilters = () => {
    setSearchParams(serializeCatalogFilters({
      ...DEFAULT_CATALOG_FILTERS,
      query: mode === 'search' ? filters.query : '',
      categoryIds: category ? [category.id] : [],
      promotionOnly: mode === 'promotions',
    }), { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(serializeCatalogFilters({
      ...DEFAULT_CATALOG_FILTERS,
      categoryIds: category ? [category.id] : [],
      promotionOnly: mode === 'promotions',
    }), { replace: true });
  };

  const filterProps = {
    filters,
    categories,
    activeFilterCount: countActiveFilters(filters, mode),
    hideCategories: mode === 'category',
    lockPromotion: mode === 'promotions',
    onChange: updateFilters,
    onReset: resetFilters,
  };

  return <div className={styles.page}>
    <Container>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <CatalogToolbar
        query={filters.query}
        sort={filters.sort}
        resultCount={filteredProducts.length}
        onQueryChange={(query) => updateFilters({ query })}
        onSortChange={(sort) => updateFilters({ sort })}
        onOpenFilters={() => setDrawerOpen(true)}
      />

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filtres du catalogue"><CatalogFilters {...filterProps} /></aside>
        <section className={styles.results} aria-label="Résultats du catalogue">
          {filteredProducts.length > 0 ? <>
            <ProductGrid products={visibleProducts} />
            {visibleProducts.length < filteredProducts.length && <div className={styles.loadMore}>
              <Button variant="secondary" onClick={() => updateFilters({ page: filters.page + 1 })}>Afficher plus</Button>
              <span>{visibleProducts.length} sur {filteredProducts.length} produits affichés</span>
            </div>}
          </> : <CatalogEmptyState onReset={clearAllFilters} />}
        </section>
      </div>
    </Container>

    <FilterDrawer isOpen={isDrawerOpen} resultCount={filteredProducts.length} onClose={closeDrawer}>
      <CatalogFilters {...filterProps} showTitle={false} />
    </FilterDrawer>
  </div>;
}
