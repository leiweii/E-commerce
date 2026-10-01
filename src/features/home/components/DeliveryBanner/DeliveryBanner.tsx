import { CalendarDays, MapPin, Truck } from 'lucide-react';
import { ROUTES } from '../../../../app/routes';
import { ButtonLink } from '../../../../components/ui/Button/Button';
import { Container } from '../../../../components/ui/Container/Container';
import styles from './DeliveryBanner.module.css';

export function DeliveryBanner() { return <section className={styles.section}><Container><div className={styles.banner}><div className={styles.icon}><Truck aria-hidden="true" /></div><div><p className={styles.eyebrow}>Livraison flexible</p><h2>Vos produits livrés avec soin</h2><p>Choisissez votre créneau et recevez vos produits dans des emballages adaptés.</p><div className={styles.facts}><span><CalendarDays size={18} aria-hidden="true" />Créneaux du lundi au samedi</span><span><MapPin size={18} aria-hidden="true" />Livraison locale simulée</span></div></div><ButtonLink to={ROUTES.products} variant="secondary">Préparer ma sélection</ButtonLink></div></Container></section>; }
