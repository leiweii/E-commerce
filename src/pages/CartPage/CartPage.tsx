import { ShoppingBasket } from 'lucide-react';
import { Container } from '../../components/ui/Container/Container';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { ROUTES } from '../../app/routes';
import { calculateCartSummary, resolveCartItems } from '../../features/commerce/cartCalculations';
import { CartItemRow } from '../../features/commerce/components/CartItemRow/CartItemRow';
import { CartSummary } from '../../features/commerce/components/CartSummary/CartSummary';
import { CommerceEmptyState } from '../../features/commerce/components/CommerceEmptyState/CommerceEmptyState';
import { useCommerceStore } from '../../stores/commerceStore';
import styles from './CartPage.module.css';

export function CartPage() {
  const cart = useCommerceStore((state) => state.cart);
  const items = resolveCartItems(cart);
  const summary = calculateCartSummary(items);

  return <div className={styles.page}>
    <Container>
      <PageHeader
        eyebrow="Votre sélection"
        title="Votre panier"
        description={summary.itemCount > 0 ? `${summary.itemCount} article${summary.itemCount > 1 ? 's' : ''} prêt${summary.itemCount > 1 ? 's' : ''} à être commandé${summary.itemCount > 1 ? 's' : ''}.` : 'Retrouvez ici les produits que vous avez sélectionnés.'}
      />
      {items.length === 0 ? <CommerceEmptyState icon={ShoppingBasket} title="Votre panier est vide" description="Parcourez notre marché et composez votre panier avec des produits frais et gourmands." actionLabel="Découvrir les produits" actionTo={ROUTES.products} /> : <div className={styles.layout}>
        <section className={styles.items} aria-label="Articles du panier">{items.map((item) => <CartItemRow key={item.productId} item={item} />)}</section>
        <CartSummary summary={summary} />
      </div>}
    </Container>
  </div>;
}
