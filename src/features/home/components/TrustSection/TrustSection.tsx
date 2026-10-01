import { Leaf, MapPinCheck, PackageCheck, ShieldCheck } from 'lucide-react';
import { Container } from '../../../../components/ui/Container/Container';
import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader';
import styles from './TrustSection.module.css';

const benefits = [
  { icon: MapPinCheck, title: 'Origines transparentes', text: 'L’origine et la composition sont indiquées pour chaque produit.' },
  { icon: Leaf, title: 'Des choix responsables', text: 'Une sélection bio et saisonnière identifiable en un coup d’œil.' },
  { icon: PackageCheck, title: 'Préparé avec attention', text: 'Les produits frais et fragiles sont présentés avec un conditionnement adapté.' },
  { icon: ShieldCheck, title: 'Démonstration sans risque', text: 'Aucun paiement réel : ce site est un projet de portfolio front-end.' },
];

export function TrustSection() { return <section className={styles.section}><Container><SectionHeader eyebrow="Nos engagements" title="Pourquoi choisir Marché Frais ?" description="Une expérience claire, utile et pensée autour de produits crédibles." /><div className={styles.grid}>{benefits.map(({ icon: Icon, title, text }) => <article key={title}><span><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div></Container></section>; }
