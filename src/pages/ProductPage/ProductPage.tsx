import { ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { ProductGrid } from '../../components/catalog/ProductGrid/ProductGrid';
import { Container } from '../../components/ui/Container/Container';
import { SectionHeader } from '../../components/ui/SectionHeader/SectionHeader';
import { categories } from '../../data/categories';
import { getReviewsForProduct } from '../../data/productReviews';
import { ProductGallery } from '../../features/product/components/ProductGallery/ProductGallery';
import { ProductInformation } from '../../features/product/components/ProductInformation/ProductInformation';
import { ProductPurchasePanel } from '../../features/product/components/ProductPurchasePanel/ProductPurchasePanel';
import { ProductReviews } from '../../features/product/components/ProductReviews/ProductReviews';
import { findProductBySlug, getSimilarProducts } from '../../features/product/productSelectors';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { productSlug = '' } = useParams<{ productSlug: string }>();
  const product = findProductBySlug(productSlug);

  if (!product) return <NotFoundPage />;

  const category = categories.find(({ id }) => id === product.categoryId);
  const similarProducts = getSimilarProducts(product, 3);
  const reviews = getReviewsForProduct(product.id);

  return <div className={styles.page}>
    <Container>
      <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
        <Link to={ROUTES.home}>Accueil</Link><ChevronRight aria-hidden="true" />
        <Link to={ROUTES.products}>Produits</Link><ChevronRight aria-hidden="true" />
        {category && <><Link to={ROUTES.category(category.slug)}>{category.name}</Link><ChevronRight aria-hidden="true" /></>}
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className={styles.productLayout}>
        <ProductGallery key={`gallery-${product.id}`} images={product.images} productName={product.name} />
        <ProductPurchasePanel key={`purchase-${product.id}`} product={product} />
      </div>

      <div className={styles.content}>
        <ProductInformation product={product} />
        <ProductReviews product={product} reviews={reviews} />
      </div>

      {similarProducts.length > 0 && <section className={styles.similar} aria-label="Produits similaires">
        <SectionHeader eyebrow="Dans le même rayon" title="Vous aimerez aussi" description="Une sélection proche, choisie dans la même catégorie." />
        <ProductGrid products={similarProducts} columns={3} />
      </section>}
    </Container>
  </div>;
}
