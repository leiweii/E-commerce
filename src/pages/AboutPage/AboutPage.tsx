import { MapPinned, Salad, Sprout } from 'lucide-react';
import { ROUTES } from '../../app/routes';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import styles from './AboutPage.module.css';

const commitments = [
  { icon: Salad, title: 'La qualité avant la quantité', text: 'Une gamme courte, composée de produits du quotidien choisis pour leur goût et leur régularité.' },
  { icon: MapPinned, title: 'Des origines claires', text: 'Nous mettons en avant la provenance et les informations utiles pour acheter en toute confiance.' },
  { icon: Sprout, title: 'Une sélection responsable', text: 'Des options bio, de saison et des formats adaptés pour mieux consommer sans compliquer les courses.' },
] as const;

export function AboutPage() {
  return <div className={styles.page}>
    <Container>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Notre histoire</p>
          <h1>Des produits bien choisis,<br />pour mieux manger.</h1>
          <p className={styles.lead}>Marché Frais est une enseigne fictive née d’une idée simple : rendre les courses alimentaires plus lisibles, plus agréables et plus proches des attentes du quotidien.</p>
          <ButtonLink to={ROUTES.products}>Découvrir nos produits</ButtonLink>
        </div>
        <aside className={styles.note} aria-label="La promesse Marché Frais">
          <span>Depuis 2026</span>
          <strong>Le bon produit,<br />au bon moment.</strong>
          <p>Une sélection accessible, des informations claires et un service pensé avec soin.</p>
        </aside>
      </section>

      <section className={styles.commitments} aria-labelledby="commitments-title">
        <div className={styles.sectionIntro}><p>Nos engagements</p><h2 id="commitments-title">Une petite marque avec des priorités simples</h2></div>
        <div className={styles.grid}>{commitments.map(({ icon: Icon, title, text }) => <article key={title}><span><Icon size={23} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </Container>
  </div>;
}
