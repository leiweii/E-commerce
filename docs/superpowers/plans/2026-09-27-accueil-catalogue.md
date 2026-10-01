# Accueil et socle de catalogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le socle React/TypeScript/Vite, un catalogue statique de 32 produits et une page d'accueil responsive complète.

**Architecture:** Le routeur rend un layout partagé et des pages focalisées. Les données métier et leurs sélecteurs restent indépendants de React ; les sections de l'accueil composent des composants UI et catalogue réutilisables avec des CSS Modules.

**Tech Stack:** React, TypeScript strict, Vite, React Router, Lucide React, Vitest, Testing Library, CSS Modules.

**Spec:** `docs/superpowers/specs/2026-09-27-accueil-catalogue-design.md`

## Global Constraints

- Ne pas ajouter Zustand, React Hook Form ou Zod dans ce lot.
- Ne pas utiliser `any`, Bootstrap, backend, API serveur ou paiement.
- Conserver les huit catégories et 32 produits réalistes définis par la spécification.
- Tous les contenus produits et catégories proviennent de données TypeScript.
- Utiliser des images locales organisées sous `public/images`.
- Respecter le design sobre, blanc ou beige clair, vert foncé, avec orange réservé aux promotions.
- Toutes les routes prévues doivent rendre une page ; les routes non développées utilisent un placeholder partagé.

## Review Focus

- Une URL inconnue doit afficher la page 404 sans casser le layout.
- Un paramètre dynamique inconnu doit rester affichable sans supposer qu'une donnée existe.
- Une sélection contenant moins de produits que la limite doit retourner uniquement les résultats disponibles.
- Le menu mobile doit exposer son état, se fermer après navigation et rester utilisable au clavier.
- Le contenu doit rester sans débordement horizontal à 320 px et lisible aux paliers tablette et bureau.

---

### Task 1: Socle Vite et design system

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`
- Create: `src/main.tsx`, `src/vite-env.d.ts`, `src/styles/reset.css`, `src/styles/tokens.css`, `src/styles/globals.css`

**Interfaces:**
- Produces: scripts `dev`, `build`, `lint`, `test`; variables CSS sémantiques ; point d'entrée React.

- [ ] Créer la configuration Vite/TypeScript stricte et les dépendances limitées au lot.
- [ ] Définir les tokens de couleur, typographie, espace, rayon, ombre, container et breakpoint.
- [ ] Définir le reset, les styles globaux, le focus et `prefers-reduced-motion`.
- [ ] Installer les dépendances et vérifier que `npm run build` atteint le point d'entrée attendu.

### Task 2: Modèle de catalogue, données et sélecteurs

**Files:**
- Create: `src/types/catalog.ts`
- Create: `src/data/categories.ts`, `src/data/products.ts`
- Create: `src/features/catalog/catalogSelectors.ts`, `src/features/catalog/catalogSelectors.test.ts`
- Create: `public/images/hero/*`, `public/images/categories/*`, `public/images/products/*`

**Interfaces:**
- Produces: `Category`, `Product`, `NutritionFacts`, `ProductImage`; `categories`; `products`; `getPopularProducts(limit)`, `getPromotionProducts(limit)`, `getOrganicProducts(limit)`, `getSeasonalProducts(limit)`, `getNewProducts(limit)`.

- [ ] Écrire les tests échouant pour les cinq sélecteurs, leurs limites et les collections vides.
- [ ] Définir les types métier avec prix en centimes, stock numérique et indicateurs explicites.
- [ ] Créer les huit catégories et les 32 produits avec slugs et identifiants uniques.
- [ ] Implémenter les sélecteurs purs et faire passer les tests.
- [ ] Ajouter les visuels locaux avec des noms stables correspondant aux références des données.

### Task 3: Routeur et layout partagé

**Files:**
- Create: `src/app/App.tsx`, `src/app/router.tsx`, `src/app/routes.ts`
- Create: `src/components/layout/Header/*`, `MainNavigation/*`, `MobileNavigation/*`, `Footer/*`, `PageLayout/*`
- Create: `src/components/ui/Container/*`, `Button/*`, `Badge/*`, `SectionHeader/*`
- Create: `src/pages/PlaceholderPage/*`, `src/pages/NotFoundPage/*`
- Create: `src/app/router.test.tsx`

**Interfaces:**
- Consumes: design tokens de Task 1.
- Produces: `router`, `ROUTES`, `PageLayout`, `Container`, `Button`, `Badge`, `SectionHeader`.

- [ ] Écrire les tests de routage pour l'accueil, une route temporaire, un paramètre dynamique et la 404.
- [ ] Créer les primitives UI typées à partir des attributs HTML natifs.
- [ ] Créer le layout sémantique, le lien d'évitement et les navigations desktop/mobile accessibles.
- [ ] Centraliser toutes les routes et raccorder les placeholders.
- [ ] Faire passer les tests de routage et vérifier la navigation clavier de base.

### Task 4: Composants catalogue et page d'accueil

**Files:**
- Create: `src/components/catalog/ProductCard/*`, `CategoryCard/*`, `ProductGrid/*`
- Create: `src/features/home/components/HeroSection/*`, `CategorySection/*`, `ProductSection/*`, `DeliveryBanner/*`, `TrustSection/*`, `NewsletterSection/*`
- Create: `src/pages/HomePage/HomePage.tsx`, `src/pages/HomePage/HomePage.module.css`, `src/pages/HomePage/HomePage.test.tsx`

**Interfaces:**
- Consumes: `Product`, `Category`, sélecteurs du catalogue, primitives UI et routes.
- Produces: cartes de catalogue réutilisables et page d'accueil complète.

- [ ] Écrire un test échouant confirmant les onze zones de l'accueil et les sélections issues des données.
- [ ] Implémenter `ProductCard`, `CategoryCard` et `ProductGrid` sans contenu métier codé en dur.
- [ ] Implémenter les sections focalisées avec titres, liens et variantes visuelles.
- [ ] Composer l'accueil dans l'ordre prévu par la spécification.
- [ ] Faire passer le test de l'accueil et vérifier les textes alternatifs et titres.

### Task 5: Responsive et validation finale

**Files:**
- Modify: CSS Modules et styles globaux créés dans les Tasks 1, 3 et 4.
- Create: `README.md`

**Interfaces:**
- Consumes: application complète des Tasks 1 à 4.
- Produces: lot documenté, responsive et vérifié.

- [ ] Vérifier visuellement l'accueil à environ 390 px, 768 px et 1440 px ; corriger débordements, densité et navigation.
- [ ] Exécuter `npm test -- --run`, `npm run lint` et `npm run build` jusqu'à réussite.
- [ ] Parcourir toutes les routes, y compris la 404 et les routes dynamiques.
- [ ] Rechercher `any`, imports inutilisés, contenus dupliqués et valeurs CSS répétées évitables.
- [ ] Documenter l'installation, les commandes et le périmètre fonctionnel sans prétendre que les fonctions futures existent.
