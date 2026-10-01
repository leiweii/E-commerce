import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBasket } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Container } from '../../components/ui/Container/Container';
import { PageHeader } from '../../components/ui/PageHeader/PageHeader';
import { Button } from '../../components/ui/Button/Button';
import { CHECKOUT_DEFAULT_VALUES, CHECKOUT_STEP_FIELDS, checkoutSchema, type CheckoutFormValues } from '../../features/checkout/checkoutSchema';
import { AddressStep } from '../../features/checkout/components/AddressStep/AddressStep';
import { CheckoutProgress } from '../../features/checkout/components/CheckoutProgress/CheckoutProgress';
import { CheckoutSummary } from '../../features/checkout/components/CheckoutSummary/CheckoutSummary';
import { ContactStep } from '../../features/checkout/components/ContactStep/ContactStep';
import { DeliveryStep } from '../../features/checkout/components/DeliveryStep/DeliveryStep';
import { PaymentStep } from '../../features/checkout/components/PaymentStep/PaymentStep';
import { ReviewStep } from '../../features/checkout/components/ReviewStep/ReviewStep';
import { buildOrder } from '../../features/checkout/orderFactory';
import { resolveCartItems } from '../../features/commerce/cartCalculations';
import { CommerceEmptyState } from '../../features/commerce/components/CommerceEmptyState/CommerceEmptyState';
import { useCommerceStore } from '../../stores/commerceStore';
import { useOrderStore } from '../../stores/orderStore';
import styles from './CheckoutPage.module.css';

const LAST_STEP = 4;

export function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCommerceStore((state) => state.cart);
  const clearCart = useCommerceStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const items = useMemo(() => resolveCartItems(cart), [cart]);
  const [currentStep, setCurrentStep] = useState(0);
  const submitting = useRef(false);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: CHECKOUT_DEFAULT_VALUES,
    mode: 'onTouched',
  });
  const deliveryMethod = form.watch('deliveryMethod');

  if (items.length === 0) {
    return <div className={styles.page}><Container><CommerceEmptyState icon={ShoppingBasket} title="Votre panier est vide" description="Ajoutez des produits avant de commencer votre commande." actionLabel="Découvrir les produits" actionTo={ROUTES.products} /></Container></div>;
  }

  const goNext = async () => {
    const fields = CHECKOUT_STEP_FIELDS[currentStep];
    if (!fields || await form.trigger(fields, { shouldFocus: true })) {
      setCurrentStep((step) => Math.min(LAST_STEP, step + 1));
    }
  };

  const submitOrder = form.handleSubmit((values) => {
    if (submitting.current || items.length === 0) return;
    submitting.current = true;
    const order = buildOrder({ items, form: values });
    addOrder(order);
    clearCart();
    navigate(ROUTES.orderConfirmation(order.id), { replace: true });
  });

  return <div className={styles.page}>
    <Container>
      <PageHeader eyebrow="Commande sécurisée" title="Finaliser ma commande" description="Un parcours entièrement simulé : aucune transaction réelle ne sera effectuée." />
      <CheckoutProgress currentStep={currentStep} />
      <FormProvider {...form}>
        <form className={styles.layout} onSubmit={submitOrder} noValidate>
          <div className={styles.formPanel}>
            {currentStep === 0 && <ContactStep />}
            {currentStep === 1 && <AddressStep />}
            {currentStep === 2 && <DeliveryStep />}
            {currentStep === 3 && <PaymentStep />}
            {currentStep === 4 && <ReviewStep values={form.getValues()} onEdit={setCurrentStep} />}
            <div className={styles.actions}>
              {currentStep > 0 && <Button variant="secondary" onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}>Retour</Button>}
              {currentStep < LAST_STEP
                ? <Button onClick={goNext}>Continuer</Button>
                : <Button type="submit">Créer ma commande fictive</Button>}
            </div>
          </div>
          <CheckoutSummary items={items} deliveryMethod={deliveryMethod} />
        </form>
      </FormProvider>
    </Container>
  </div>;
}
