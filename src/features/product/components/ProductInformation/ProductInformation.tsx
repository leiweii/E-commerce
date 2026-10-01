import { Leaf, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import type { Product } from '../../../../types/catalog';
import styles from './ProductInformation.module.css';

interface ProductInformationProps { product: Product; }

const nutritionRows = [
  ['Énergie', 'energyKcal', 'kcal'], ['Matières grasses', 'fat', 'g'], ['dont acides gras saturés', 'saturatedFat', 'g'],
  ['Glucides', 'carbohydrates', 'g'], ['dont sucres', 'sugars', 'g'], ['Fibres', 'fiber', 'g'], ['Protéines', 'protein', 'g'], ['Sel', 'salt', 'g'],
] as const;

export function ProductInformation({ product }: ProductInformationProps) {
  return <div className={styles.information}>
    <section className={styles.description}>
      <p className={styles.eyebrow}>À propos du produit</p>
      <h2>Description</h2>
      <p>{product.description}</p>
    </section>

    <div className={styles.detailsGrid}>
      <section><h2>Ingrédients</h2><p>{product.ingredients.length > 0 ? product.ingredients.join(', ') : 'Information non renseignée.'}</p></section>
      <section><h2>Allergènes</h2><p>{product.allergens.length > 0 ? product.allergens.join(', ') : 'Aucun allergène renseigné.'}</p></section>
      <section><h2>Conservation</h2><p>{product.conservation ?? 'À conserver selon les indications figurant sur l’emballage.'}</p></section>
    </div>

    <section className={styles.nutrition}>
      <div><p className={styles.eyebrow}>Pour 100 g ou 100 ml</p><h2>Valeurs nutritionnelles</h2></div>
      <div className={styles.tableWrap}><table><tbody>{nutritionRows.map(([label, key, unit]) => <tr key={key}><th scope="row">{label}</th><td>{product.nutrition[key]} {unit}</td></tr>)}</tbody></table></div>
    </section>

    <section className={styles.delivery} aria-label="Livraison et qualité">
      <article><Truck aria-hidden="true" /><div><h3>Livraison maîtrisée</h3><p>Créneau au choix et livraison offerte dès 50 €.</p></div></article>
      <article><PackageCheck aria-hidden="true" /><div><h3>Emballage adapté</h3><p>Les produits frais voyagent dans le respect de la chaîne du froid.</p></div></article>
      <article>{product.isOrganic ? <Leaf aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}<div><h3>{product.isOrganic ? 'Certification biologique' : 'Origine contrôlée'}</h3><p>{product.isOrganic ? 'Produit issu de l’agriculture biologique.' : `Origine déclarée : ${product.origin}.`}</p></div></article>
    </section>
  </div>;
}
