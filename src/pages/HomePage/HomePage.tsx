import { ROUTES } from '../../app/routes';
import { getNewProducts, getOrganicProducts, getPopularProducts, getPromotionProducts, getSeasonalProducts } from '../../features/catalog/catalogSelectors';
import { CategorySection } from '../../features/home/components/CategorySection/CategorySection';
import { DeliveryBanner } from '../../features/home/components/DeliveryBanner/DeliveryBanner';
import { HeroSection } from '../../features/home/components/HeroSection/HeroSection';
import { NewsletterSection } from '../../features/home/components/NewsletterSection/NewsletterSection';
import { ProductSection } from '../../features/home/components/ProductSection/ProductSection';
import { TrustSection } from '../../features/home/components/TrustSection/TrustSection';
import styles from './HomePage.module.css';

export function HomePage() {
  return <div className={styles.page}>
    <HeroSection />
    <CategorySection />
    <ProductSection ariaLabel="Produits populaires" eyebrow="Plébiscités par nos clients" title="Les préférés du moment" description="Des valeurs sûres choisies pour leur goût, leur qualité et leur simplicité." products={getPopularProducts(4)} linkLabel="Voir tous les produits" linkTo={ROUTES.products} />
    <ProductSection ariaLabel="Produits en promotion" eyebrow="Offres du moment" title="Les bons produits, à prix doux" description="Des remises ponctuelles, sans compromis sur la sélection." products={getPromotionProducts(4)} linkLabel="Toutes les promotions" linkTo={ROUTES.promotions} tone="muted" />
    <ProductSection ariaLabel="Produits biologiques" eyebrow="Certifiés bio" title="La sélection bio" description="Des essentiels issus de l’agriculture biologique pour varier le quotidien." products={getOrganicProducts(4)} linkLabel="Découvrir le bio" linkTo={ROUTES.category('bio')} tone="green" />
    <ProductSection ariaLabel="Produits de saison" eyebrow="Au bon moment" title="Le meilleur de la saison" description="Des fruits, légumes et boissons choisis au rythme des récoltes." products={getSeasonalProducts(4)} linkLabel="Voir la sélection" linkTo={ROUTES.products} />
    <DeliveryBanner />
    <ProductSection ariaLabel="Nouveaux produits" eyebrow="Tout juste arrivés" title="Nouveautés à découvrir" description="De nouvelles références choisies pour renouveler vos habitudes." products={getNewProducts(4)} linkLabel="Voir les nouveautés" linkTo={ROUTES.products} />
    <TrustSection />
    <NewsletterSection />
  </div>;
}
