import { SearchX } from 'lucide-react';
import { Button, ButtonLink } from '../../../../components/ui/Button/Button';
import { ROUTES } from '../../../../app/routes';
import styles from './CatalogEmptyState.module.css';

interface CatalogEmptyStateProps { onReset: () => void; }

export function CatalogEmptyState({ onReset }: CatalogEmptyStateProps) {
  return <div className={styles.empty}>
    <SearchX size={34} aria-hidden="true" />
    <h2>Aucun produit trouvé</h2>
    <p>Essayez une recherche plus simple ou retirez certains filtres.</p>
    <div><Button onClick={onReset}>Réinitialiser les filtres</Button><ButtonLink to={ROUTES.products} variant="secondary">Voir tout le catalogue</ButtonLink></div>
  </div>;
}
