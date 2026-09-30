# Audit final et préparation Vercel

## Objectif

Rendre Marché Frais réellement présentable et déployable sur Vercel en corrigeant les défauts démontrés par l'audit, sans refondre inutilement l'architecture ni l'apparence validée.

Le résultat attendu est une application front-end complète dont toutes les routes annoncées fonctionnent, dont les données locales restent cohérentes après rechargement, et dont la suite de tests, ESLint, TypeScript et le build de production passent.

## État constaté

L'application existante couvre l'accueil, le catalogue, la recherche, les promotions, les catégories individuelles, la fiche produit, le panier, les favoris, À propos, Contact et la page 404.

Les écarts bloquant une livraison finale sont :

- `/categories` affiche encore un placeholder ;
- `/commande` et `/commande/confirmation/:orderId` affichent des placeholders ;
- `/compte` et `/compte/commandes` affichent des placeholders ;
- `/compte/commandes/:orderId` n'est pas enregistrée ;
- le store panier ne possède pas encore l'action de vidage requise par la finalisation ;
- les stores de commandes et de profil n'existent pas ;
- l'image hero PNG pèse environ 2,8 Mo ;
- aucun favicon n'est déclaré ;
- aucune réécriture Vercel ne protège les routes React Router lors d'un accès direct.

## Stratégie retenue

La remise à niveau conserve les composants, stores et styles existants. Les fonctionnalités absentes sont ajoutées selon les spécifications déjà validées :

- `docs/superpowers/specs/2026-09-29-checkout-design.md` pour le checkout en cinq étapes et la confirmation ;
- `docs/superpowers/specs/2026-09-29-customer-account-design.md` pour le profil local, l'historique et le détail d'une commande.

Les deux sous-systèmes partagent le même type `Order` et le même `orderStore`. Le checkout produit les commandes ; l'espace client les lit. Les données bancaires de démonstration restent exclusivement dans l'état éphémère du formulaire et ne figurent jamais dans le type persistant.

## Routes finales

- `/` : accueil ;
- `/produits` : catalogue ;
- `/produits/:productSlug` : fiche produit ;
- `/categories` : index des catégories ;
- `/categories/:categorySlug` : catalogue filtré ;
- `/recherche` : recherche ;
- `/promotions` : promotions ;
- `/favoris` : favoris ;
- `/panier` : panier ;
- `/commande` : checkout ;
- `/commande/confirmation/:orderId` : confirmation ;
- `/compte` : profil local ;
- `/compte/commandes` : historique ;
- `/compte/commandes/:orderId` : détail ;
- `/a-propos` : présentation ;
- `/contact` : contact ;
- `*` : 404.

Les routes lourdes du checkout et de l'espace client pourront être chargées paresseusement pour limiter le bundle initial, avec un fallback accessible cohérent.

## Persistance et confidentialité

Trois espaces `localStorage` indépendants sont conservés :

- `marche-frais-commerce-v1` pour le panier et les favoris ;
- `marche-frais-orders-v1` pour les commandes finalisées ;
- `marche-frais-profile-v1` pour le profil fictif et ses préférences.

Chaque store assainit les données réhydratées. Une valeur absente, ancienne ou corrompue doit produire un état par défaut sûr plutôt qu'une erreur d'affichage. Le brouillon du checkout, les numéros de carte, l'expiration et le cryptogramme ne sont jamais persistés.

## Formulaires et accessibilité

Les formulaires Contact, Profil et Checkout utilisent React Hook Form et Zod. Chaque champ dispose d'un label, d'un message d'erreur associé et d'un état `aria-invalid` lorsque nécessaire. Les étapes, cartes radio, confirmations et messages d'état doivent être compréhensibles au clavier et par lecteur d'écran.

La navigation, les contrôles de quantité, les boutons et les liens conservent des cibles tactiles adaptées. Les états vides, les identifiants inconnus, les produits indisponibles et les données locales invalides ont un rendu explicite.

## Catégories

La page `/categories` réutilise les données typées et `CategoryCard`. Elle présente toutes les catégories disponibles dans une grille responsive avec un en-tête de page et un accès au catalogue complet. Aucune nouvelle source de données n'est créée.

## Images et métadonnées

L'image hero est convertie vers un format web moderne et référencée avec des dimensions explicites. Les images produits et catégories conservent leur chargement différé lorsqu'elles ne sont pas prioritaires. L'image principale visible immédiatement ne doit pas être chargée paresseusement.

`index.html` reçoit :

- un titre français descriptif ;
- une description cohérente avec le site de démonstration ;
- un favicon local ;
- une couleur de thème ;
- des métadonnées Open Graph minimales ne prétendant pas à une URL de production inconnue.

## Configuration Vercel

Un fichier `vercel.json` ajoute une réécriture de toutes les routes applicatives vers `/index.html`, afin que React Router résolve les accès directs et les actualisations. Aucune fonction serveur ni configuration de backend n'est ajoutée.

Les réglages attendus sur Vercel restent standards : framework Vite, commande `npm run build`, dossier de sortie `dist`. Le déploiement effectif n'est pas inclus dans l'audit.

## Contrôle de qualité

L'audit final couvre :

- compilation TypeScript et imports inutilisés ;
- ESLint et absence de journaux de développement ;
- taille et responsabilités des composants ;
- duplication évitable ;
- cohérence de toutes les routes et liens internes ;
- responsive aux seuils existants ;
- navigation clavier, focus, labels, erreurs et annonces ;
- assainissement de `localStorage` ;
- panier, favoris, checkout, commandes et profil ;
- cas d'absence ou de corruption des données ;
- 404 ;
- poids et attributs des images ;
- métadonnées, favicon et titre ;
- configuration SPA Vercel.

Chaque correction comportementale suit un cycle test rouge, correction minimale, test vert. Les changements purement déclaratifs, comme `vercel.json` ou les métadonnées, sont vérifiés par leur effet ou par le build plutôt que par des tests de texte fragiles.

## Vérification finale

La clôture exige :

- la suite Vitest complète sans échec ;
- `npm run lint` sans erreur ;
- `npm run build` avec TypeScript et Vite sans erreur applicative ;
- un audit statique des journaux, placeholders, routes et références d'images ;
- une inspection responsive et clavier dans un navigateur si l'environnement local l'autorise ;
- une revue finale des changements sans refactorisation hors périmètre.

## Hors périmètre

Backend, API serveur, base de données, authentification réelle, paiement réel, stockage de données bancaires, envoi d'email, facturation, suivi logistique réel, analytics, déploiement automatique et URL de production définitive.
