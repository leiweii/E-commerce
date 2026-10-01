import { Heart } from 'lucide-react';
import { ProductGrid } from '../../components/catalog/ProductGrid/ProductGrid';
import { Container } from '../../components/ui/Container/Container';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { ROUTES } from '../../app/routes';
import { products } from '../../data/products';
import { CommerceEmptyState } from '../../features/commerce/components/CommerceEmptyState/CommerceEmptyState';
import { useCommerceStore } from '../../stores/commerceStore';
import styles from './FavoritesPage.module.css';

export function FavoritesPage() {
  const favoriteIds = useCommerceStore((state) => state.favoriteIds);
  const favorites = products.filter((product) => favoriteIds.includes(product.id));

  return <div className={styles.page}>
    <Container>
      <PageHeader
        eyebrow="Votre sélection"
        title="Vos favoris"
        description={favorites.length > 0 ? `${favorites.length} produit${favorites.length > 1 ? 's' : ''} enregistré${favorites.length > 1 ? 's' : ''} pour plus tard.` : 'Gardez vos produits préférés à portée de main.'}
      />
      {favorites.length === 0 ? <CommerceEmptyState icon={Heart} title="Aucun favori pour le moment" description="Enregistrez les produits qui vous font envie pour les retrouver facilement ici." actionLabel="Explorer le catalogue" actionTo={ROUTES.products} /> : <ProductGrid products={favorites} moveToCart />}
    </Container>
  </div>;
}
