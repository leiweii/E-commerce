# CSS and Responsive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harmoniser l'ensemble de l'interface Marché Frais autour d'un design system sobre, moderne, alimentaire et responsive sans modifier les fonctionnalités existantes.

**Architecture:** La refonte part des tokens globaux, introduit un en-tête de page réutilisable, puis aligne successivement le shell, les composants marchands et les familles de pages. Les changements restent majoritairement dans les CSS Modules ; les rares changements TSX servent uniquement à supprimer une duplication de présentation ou préserver une sémantique accessible.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, React Router 7, CSS Modules, Vitest, Testing Library, Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-29-css-responsive-redesign-design.md`

## Global Constraints

- Ne modifier ni logique métier, ni store Zustand, ni schéma de données, ni route, ni persistance.
- Ne pas ajouter de bibliothèque CSS, framework UI, police distante ou dépendance produit.
- Palette de référence : `#fbfaf6`, `#ffffff`, `#f3f0e7`, `#17211a`, `#687069`, `#173f2a`, `#235a3d`, `#dce9de`, `#cf552e`, `#a83e1e`, `#dedfd8`, `#b8bdb5`, `#347a50`.
- Échelle typographique plafonnée à `2rem`, `2.75rem` et `3.5rem`; aucun titre au-dessus de `2.5rem` à 360 px.
- Rayons partagés : `6px`, `10px`, `12px`; ombre maximale : `0 10px 24px rgb(23 33 26 / 0.07)`.
- Transitions de `160ms` à `220ms`, déplacement vertical maximal de `2px`, aucun gradient.
- Zone tactile minimale de `44px` pour les contrôles principaux.
- Plages responsive : 320–479, 480–767, 768–1023 et 1024 px et plus.
- Conserver `prefers-reduced-motion`, le lien d'évitement, les libellés, les descriptions ARIA et les focus visibles.
- Le dossier n'est pas un dépôt Git au moment de la rédaction : les étapes de commit sont remplacées par des points de contrôle. Si Git est initialisé avant l'exécution, créer un commit séparé après chaque tâche validée.

## Review Focus

- À 320–360 px, aucun composant ne doit provoquer de débordement horizontal et chaque action principale doit rester utilisable au toucher — contrôlé dans les tâches 3 à 7 et dans l'audit final.
- Au clavier, Header, menu mobile, cartes, filtres, quantités et formulaires doivent conserver un focus visible et un ordre logique — contrôlé par le contrat CSS de la tâche 1 et les tests de navigation des tâches 3, 4, 6 et 7.
- Les titres produits longs, anciens prix et combinaisons de trois badges ne doivent pas désaligner une grille — contrôlé par la tâche 4 avec les données réelles les plus longues.
- Rupture de stock, états désactivés, erreurs de formulaire et filtres actifs ne doivent pas dépendre uniquement de la couleur — contrôlé par les tests métier existants dans les tâches 4, 6 et 7.
- Avec réduction des animations activée, les transitions et animations doivent être neutralisées — verrouillé par le test de contrat de la tâche 1.

---

### Task 1: Stabiliser les fondations du design system

**Files:**
- Create: `src/styles/designSystem.test.ts`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/globals.css`
- Modify: `src/styles/reset.css`

**Interfaces:**
- Consumes: imports globaux existants de `src/styles/globals.css` dans l'application.
- Produces: tokens `--color-*`, `--font-size-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--control-height`, `--icon-control-size`, `--section-space`, `--container-*`, `--transition-*` utilisés par toutes les tâches suivantes.

- [ ] **Step 1: Écrire le test de contrat CSS en échec**

Créer des tests qui lisent `tokens.css` et `globals.css`, puis vérifient la présence des nouveaux tokens de contrôle et de rythme, les rayons `6px/10px/12px`, l'ombre maximale, une règle `:focus-visible`, une règle `prefers-reduced-motion` et l'absence de `linear-gradient` dans les feuilles CSS de `src`.

- [ ] **Step 2: Vérifier l'échec attendu**

Run: `npm run test -- --run src/styles/designSystem.test.ts`

Expected: FAIL car `--control-height`, `--icon-control-size` et `--section-space` n'existent pas encore.

- [ ] **Step 3: Rationaliser les tokens et les styles globaux**

Conserver la palette fixée par la spécification, réduire les plafonds typographiques, définir les trois rayons exacts, ajouter les dimensions de contrôles et le rythme de section, alléger l'ombre, compléter le reset pour `textarea` et `select`, et préserver les règles de focus et de réduction des animations.

- [ ] **Step 4: Vérifier le contrat et la non-régression**

Run: `npm run test -- --run src/styles/designSystem.test.ts src/app/router.test.tsx`

Expected: PASS.

- [ ] **Step 5: Examiner le diff du lot**

Confirmer que seuls les fondements visuels ont changé et qu'aucune règle métier n'a été introduite.

---

### Task 2: Extraire un en-tête de page réutilisable

**Files:**
- Create: `src/components/ui/PageHeader/PageHeader.tsx`
- Create: `src/components/ui/PageHeader/PageHeader.module.css`
- Create: `src/components/ui/PageHeader/PageHeader.test.tsx`
- Modify: `src/pages/CatalogPage/CatalogPage.tsx`
- Modify: `src/pages/CatalogPage/CatalogPage.module.css`
- Modify: `src/pages/CartPage/CartPage.tsx`
- Modify: `src/pages/CartPage/CartPage.module.css`
- Modify: `src/pages/FavoritesPage/FavoritesPage.tsx`
- Modify: `src/pages/FavoritesPage/FavoritesPage.module.css`
- Modify: `src/pages/ContactPage/ContactPage.tsx`
- Modify: `src/pages/ContactPage/ContactPage.module.css`

**Interfaces:**
- Consumes: tokens produits par la tâche 1.
- Produces: composant `PageHeader` acceptant `PageHeaderProps { eyebrow: string; title: string; description: string; className?: string }`, avec un unique `h1` et une description textuelle.

- [ ] **Step 1: Écrire le test du composant en échec**

Tester que `PageHeader` rend le sourcil, un `h1`, la description et une classe additionnelle sans modifier le texte fourni.

- [ ] **Step 2: Vérifier l'échec attendu**

Run: `npm run test -- --run src/components/ui/PageHeader/PageHeader.test.tsx`

Expected: FAIL car le module `PageHeader` n'existe pas.

- [ ] **Step 3: Implémenter le composant et son style**

Créer l'interface exacte annoncée, appliquer une largeur de lecture stable, l'échelle typographique commune et des espacements fluides.

- [ ] **Step 4: Remplacer les quatre en-têtes dupliqués**

Utiliser `PageHeader` dans Catalogue, Panier, Favoris et Contact, puis supprimer uniquement les règles CSS devenues redondantes.

- [ ] **Step 5: Vérifier le composant et les pages migrées**

Run: `npm run test -- --run src/components/ui/PageHeader/PageHeader.test.tsx src/pages/CatalogPage/CatalogPage.test.tsx src/pages/CartPage/CartPage.test.tsx src/pages/FavoritesPage/FavoritesPage.test.tsx src/pages/SecondaryPages.test.tsx`

Expected: PASS, avec les mêmes titres et textes visibles qu'avant la migration.

- [ ] **Step 6: Examiner le diff du lot**

Confirmer l'absence de changement dans les filtres, calculs du panier, favoris et validation du contact.

---

### Task 3: Harmoniser le shell et la navigation responsive

**Files:**
- Modify: `src/components/layout/Header/Header.module.css`
- Modify: `src/components/layout/MainNavigation/MainNavigation.module.css`
- Modify: `src/components/layout/MobileNavigation/MobileNavigation.module.css`
- Modify: `src/components/layout/Footer/Footer.module.css`
- Modify: `src/components/layout/PageLayout/PageLayout.module.css`
- Modify: `src/components/ui/Container/Container.module.css`
- Modify: `src/components/layout/MobileNavigation/MobileNavigation.test.tsx`
- Modify if required for accessible state only: `src/components/layout/MobileNavigation/MobileNavigation.tsx`

**Interfaces:**
- Consumes: tokens de la tâche 1 et routes existantes.
- Produces: shell cohérent, navigation desktop à partir de 1024 px, navigation mobile sous 1024 px et footer responsive.

- [ ] **Step 1: Renforcer le test de navigation avant modification**

Ajouter un cas qui rend la navigation sur une route active, vérifie `aria-current="page"`, puis déclenche un lien et confirme l'appel de `onNavigate`.

- [ ] **Step 2: Vérifier l'état du test**

Run: `npm run test -- --run src/components/layout/MobileNavigation/MobileNavigation.test.tsx`

Expected: PASS si la sémantique native de `NavLink` est déjà correcte; dans ce cas, ce test devient le garde-fou avant la refonte CSS.

- [ ] **Step 3: Recomposer le Header et les navigations en CSS**

Réduire l'effet de verre, employer la bordure globale, garantir des actions de 44 px, clarifier l'état actif, structurer les liens mobiles avec séparateurs et conserver exactement le comportement du menu et du compteur.

- [ ] **Step 4: Recomposer le Footer et le conteneur**

Aligner les colonnes, augmenter le contraste utile, fluidifier les gouttières et réduire le poids vertical du footer mobile.

- [ ] **Step 5: Vérifier navigation et routage**

Run: `npm run test -- --run src/components/layout/MobileNavigation/MobileNavigation.test.tsx src/app/router.test.tsx`

Expected: PASS.

- [ ] **Step 6: Contrôler 360, 768, 1024 et 1440 px**

Vérifier que les deux navigations ne sont jamais affichées simultanément, que les actions ne se chevauchent pas et qu'aucun débordement horizontal n'apparaît.

---

### Task 4: Revoir les cartes, badges, boutons et grilles

**Files:**
- Modify: `src/components/ui/Button/Button.module.css`
- Modify: `src/components/ui/Badge/Badge.module.css`
- Modify: `src/components/ui/SectionHeader/SectionHeader.module.css`
- Modify: `src/components/catalog/ProductCard/ProductCard.module.css`
- Modify: `src/components/catalog/CategoryCard/CategoryCard.module.css`
- Modify: `src/components/catalog/ProductGrid/ProductGrid.module.css`
- Create: `src/components/catalog/ProductCard/ProductCard.test.tsx`

**Interfaces:**
- Consumes: composants et props publics existants; tokens des tâches 1 et 2.
- Produces: mêmes interfaces React, avec présentation et états interactifs harmonisés.

- [ ] **Step 1: Écrire les garde-fous ProductCard avant la refonte CSS**

Tester avec un produit promotionnel, bio et nouveau que le titre, les trois badges, le lien produit, le bouton favoris pressable et l'action panier sont accessibles; ajouter un produit sans stock et vérifier que l'action panier est désactivée avec le titre « Rupture de stock ».

- [ ] **Step 2: Vérifier le comportement de référence**

Run: `npm run test -- --run src/components/catalog/ProductCard/ProductCard.test.tsx`

Expected: PASS. Ces tests verrouillent les comportements existants avant un changement purement visuel; s'ils échouent, corriger uniquement le montage du store de test, pas le composant de production.

- [ ] **Step 3: Uniformiser primitives et cartes**

Appliquer hauteurs, rayons, focus, états désactivés, bordures et transitions communes. Stabiliser les zones de texte/prix, limiter le déplacement à 2 px, conserver le ratio 4:3 et passer la grille à quatre, deux puis une colonne selon les plages définies.

- [ ] **Step 4: Vérifier les cartes et les parcours consommateurs**

Run: `npm run test -- --run src/components/catalog/ProductCard/ProductCard.test.tsx src/pages/HomePage/HomePage.test.tsx src/pages/CatalogPage/CatalogPage.test.tsx src/pages/FavoritesPage/FavoritesPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Contrôler les cas visuels extrêmes**

Utiliser le produit au nom le plus long, trois badges, un ancien prix et un produit épuisé pour confirmer l'alignement à 360, 768 et 1440 px.

---

### Task 5: Harmoniser la page d'accueil

**Files:**
- Modify: `src/pages/HomePage/HomePage.module.css`
- Modify: `src/features/home/components/HeroSection/HeroSection.module.css`
- Modify: `src/features/home/components/CategorySection/CategorySection.module.css`
- Modify: `src/features/home/components/ProductSection/ProductSection.module.css`
- Modify: `src/features/home/components/DeliveryBanner/DeliveryBanner.module.css`
- Modify: `src/features/home/components/TrustSection/TrustSection.module.css`
- Modify: `src/features/home/components/NewsletterSection/NewsletterSection.module.css`

**Interfaces:**
- Consumes: tokens et composants partagés des tâches 1 à 4.
- Produces: même contenu éditorial et mêmes actions, avec rythme de section et responsive unifiés.

- [ ] **Step 1: Établir le garde-fou fonctionnel**

Run: `npm run test -- --run src/pages/HomePage/HomePage.test.tsx`

Expected: PASS avant modification; le test existant verrouille la hiérarchie et les sections alimentées par les données.

- [ ] **Step 2: Recomposer le hero et le rythme des sections**

Réduire le plafond du titre, contraindre le texte, assurer un cadrage d'image stable et utiliser `--section-space` pour les séparations verticales.

- [ ] **Step 3: Aligner catégories, livraison, confiance et newsletter**

Employer les mêmes bordures, rayons et contrôles que le reste du design system; conserver un seul bloc vert fort pour la livraison et simplifier le formulaire newsletter sur mobile.

- [ ] **Step 4: Vérifier la page**

Run: `npm run test -- --run src/pages/HomePage/HomePage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Contrôler 360, 768, 1024 et 1440 px**

Vérifier ordre de lecture, hauteur du hero, retours des CTA, grilles, formulaire newsletter et absence de grands vides ou blocs comprimés.

---

### Task 6: Harmoniser catalogue, filtres et fiche produit

**Files:**
- Modify: `src/pages/CatalogPage/CatalogPage.module.css`
- Modify: `src/features/catalog/components/CatalogFilters/CatalogFilters.module.css`
- Modify: `src/features/catalog/components/CatalogToolbar/CatalogToolbar.module.css`
- Modify: `src/features/catalog/components/FilterDrawer/FilterDrawer.module.css`
- Modify: `src/features/catalog/components/CatalogEmptyState/CatalogEmptyState.module.css`
- Modify: `src/pages/ProductPage/ProductPage.module.css`
- Modify: `src/features/product/components/ProductGallery/ProductGallery.module.css`
- Modify: `src/features/product/components/ProductPurchasePanel/ProductPurchasePanel.module.css`
- Modify: `src/features/product/components/ProductInformation/ProductInformation.module.css`
- Modify: `src/features/product/components/ProductReviews/ProductReviews.module.css`

**Interfaces:**
- Consumes: tokens, PageHeader et composants marchands des tâches 1 à 4.
- Produces: catalogue et fiche produit visuellement alignés sans changement des filtres, quantités, panier ou favoris.

- [ ] **Step 1: Établir les garde-fous fonctionnels**

Run: `npm run test -- --run src/pages/CatalogPage/CatalogPage.test.tsx src/pages/ProductPage/ProductPage.test.tsx`

Expected: PASS avec filtres, drawer, états vides, quantités, favoris et panier actuels.

- [ ] **Step 2: Recomposer catalogue et contrôles**

Alléger la sidebar, normaliser recherche/tri/prix/checkboxes, préserver le sticky desktop, basculer vers le drawer avant compression et aligner l'état vide.

- [ ] **Step 3: Recomposer la fiche produit**

Aligner galerie, vignettes, prix, quantité, actions, tableaux, livraison et avis sur les surfaces/rayons communs; conserver le défilement interne du tableau nutritionnel.

- [ ] **Step 4: Vérifier les parcours**

Run: `npm run test -- --run src/pages/CatalogPage/CatalogPage.test.tsx src/pages/ProductPage/ProductPage.test.tsx src/features/catalog/catalogFilters.test.ts src/features/product/productSelectors.test.ts`

Expected: PASS.

- [ ] **Step 5: Contrôler 360, 768, 1024 et 1440 px**

Vérifier toolbar, drawer, sidebar, galerie, panneau d'achat, actions, tableaux et produits similaires sans débordement.

---

### Task 7: Harmoniser panier, favoris et pages secondaires

**Files:**
- Modify: `src/pages/CartPage/CartPage.module.css`
- Modify: `src/pages/FavoritesPage/FavoritesPage.module.css`
- Modify: `src/features/commerce/components/CartItemRow/CartItemRow.module.css`
- Modify: `src/features/commerce/components/CartSummary/CartSummary.module.css`
- Modify: `src/features/commerce/components/CommerceEmptyState/CommerceEmptyState.module.css`
- Modify: `src/pages/AboutPage/AboutPage.module.css`
- Modify: `src/pages/ContactPage/ContactPage.module.css`
- Modify: `src/pages/NotFoundPage/NotFoundPage.module.css`
- Modify: `src/pages/PlaceholderPage/PlaceholderPage.module.css`
- Modify: `src/pages/NotFoundPage/NotFoundPage.tsx`

**Interfaces:**
- Consumes: tokens, PageHeader, boutons, badges et grilles des tâches précédentes.
- Produces: même panier, mêmes favoris et mêmes formulaires avec une présentation cohérente; import `SearchX` replacé avec les autres imports sans changement d'API.

- [ ] **Step 1: Établir les garde-fous fonctionnels**

Run: `npm run test -- --run src/pages/CartPage/CartPage.test.tsx src/pages/FavoritesPage/FavoritesPage.test.tsx src/pages/SecondaryPages.test.tsx`

Expected: PASS.

- [ ] **Step 2: Recomposer panier et favoris**

Aligner lignes, images, quantités, prix, résumé sticky et états vides; empiler avant compression et garder toutes les actions à au moins 44 px.

- [ ] **Step 3: Recomposer À propos, Contact, placeholders et 404**

Réutiliser le rythme typographique, les surfaces et les contrôles du système; uniformiser champs, messages d'erreur/succès et actions mobiles; replacer l'import tardif de `SearchX` en tête de fichier.

- [ ] **Step 4: Vérifier les parcours**

Run: `npm run test -- --run src/pages/CartPage/CartPage.test.tsx src/pages/FavoritesPage/FavoritesPage.test.tsx src/pages/SecondaryPages.test.tsx src/features/commerce/cartCalculations.test.ts src/stores/commerceStore.test.ts`

Expected: PASS.

- [ ] **Step 5: Contrôler 360, 768, 1024 et 1440 px**

Vérifier lignes panier longues, résumé, grilles de favoris, formulaire Contact, CTA À propos, placeholders et 404.

---

### Task 8: Audit transversal et validation finale

**Files:**
- Modify only if a defect is observed: CSS Modules already listed in Tasks 1–7.

**Interfaces:**
- Consumes: tous les lots précédents.
- Produces: lot vérifié, sans régression fonctionnelle ni incohérence visuelle évidente.

- [ ] **Step 1: Rechercher les écarts au design system**

Run: `rg -n "linear-gradient|border-radius:\s*(1[3-9]|[2-9][0-9])px|box-shadow:" src --glob "*.css"`

Expected: aucun gradient; aucune valeur de rayon hors tokens sauf cercle explicite; chaque ombre restante correspond à une élévation décrite dans la spécification.

- [ ] **Step 2: Vérifier les couleurs et dimensions ponctuelles**

Recenser les codes hexadécimaux et valeurs de contrôle hors tokens, puis remplacer uniquement ceux qui représentent un rôle partagé. Conserver les exceptions documentées comme les couleurs de notation ou le blanc transparent sur fond vert.

- [ ] **Step 3: Exécuter tous les tests**

Run: `npm run test -- --run`

Expected: 13 fichiers existants plus les nouveaux tests, zéro échec.

- [ ] **Step 4: Exécuter lint et build**

Run: `npm run lint`

Expected: zéro erreur et zéro import inutilisé.

Run: `npm run build`

Expected: TypeScript et Vite terminent avec code 0.

- [ ] **Step 5: Réaliser la matrice responsive finale**

Contrôler Accueil, Catalogue, Produit, Panier, Favoris, À propos, Contact et 404 aux largeurs 360, 768, 1024 et 1440 px; vérifier débordements, focus, survol, états désactivés, densité, images, Header et Footer.

- [ ] **Step 6: Relire les changements**

Confirmer qu'aucun fichier métier, store, données, route ou calcul n'a changé et consigner toute limite de prévisualisation dans le compte rendu final.
