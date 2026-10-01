import styles from './CheckoutProgress.module.css';

const steps = ['Coordonnées', 'Adresse', 'Livraison', 'Paiement', 'Vérification'] as const;

interface CheckoutProgressProps { currentStep: number; }

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return <div className={styles.progress}>
    <p>Étape {currentStep + 1} sur {steps.length}</p>
    <ol aria-label="Progression de la commande">
      {steps.map((step, index) => <li key={step} aria-current={index === currentStep ? 'step' : undefined} className={index <= currentStep ? styles.active : undefined}>
        <span>{index + 1}</span><strong>{step}</strong>
      </li>)}
    </ol>
  </div>;
}
