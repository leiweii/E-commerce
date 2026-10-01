# Fondations techniques de l'e-commerce alimentaire

## Objectif

Mettre en place une base React, TypeScript et Vite propre pour un site e-commerce alimentaire de portfolio. Cette première tranche doit fournir l'ossature de navigation, le layout partagé et un design system léger, sans développer les fonctionnalités métier du catalogue, du panier, des favoris, du checkout ou du compte.

La base doit être suffisamment stable pour permettre l'ajout progressif des fonctionnalités sans réorganisations majeures. Elle doit compiler en TypeScript strict, rester lisible et offrir un responsive cohérent dès le départ.

## Périmètre

### Inclus

- initialisation Vite avec React et TypeScript ;
- React Router avec une configuration centralisée ;
- layout principal partagé ;
- header, navigation principale, navigation mobile et footer ;
- composant de container global ;
- routes de toutes les pages prévues dans l'architecture ;
- pages temporaires légères pour les routes non développées ;
- page 404 dédiée ;
- design system CSS global ;
- styles de base et premier comportement responsive ;
- vérification TypeScript et build de production.

### Exclus

- données de produits ou de catégories ;
- recherche, filtres et tri ;
- panier, favoris et commandes ;
- stores Zustand et persistance `localStorage` ;
- formulaires React Hook Form et schémas Zod ;
- authentification ou backend ;
- paiement réel ou simulé ;
- contenu final et design détaillé de chaque page ;
- déploiement Vercel.

## Choix techniques

Le projet utilise Vite, React et TypeScript avec le mode strict activé. React Router fournit le routage côté client. Lucide React fournit les icônes de navigation afin d'éviter les caractères décoratifs ou les SVG dupliqués.

Les styles des composants utilisent des CSS Modules. Les variables, le reset minimal et les règles typographiques partagées restent dans `src/styles`. Aucun framework CSS n'est introduit.

Zustand, React Hook Form et Zod ne sont pas nécessaires dans cette tranche. Ils seront ajoutés lorsque les premières fonctionnalités qui les utilisent seront développées, afin de ne pas installer des dépendances sans usage réel.

## Structure prévue

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── routes.ts
├── components/
│   ├── layout/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── MainNavigation/
│   │   ├── MobileNavigation/
│   │   └── PageLayout/
│   └── ui/
│       ├── Badge/
│       ├── Button/
│       ├── Container/
│       └── FormField/
├── pages/
│   ├── AboutPage/
│   ├── AccountPage/
│   ├── CartPage/
│   ├── CategoriesPage/
│   ├── CategoryPage/
│   ├── CheckoutPage/
│   ├── ContactPage/
│   ├── FavoritesPage/
│   ├── HomePage/
│   ├── NotFoundPage/
│   ├── OrderConfirmationPage/
│   ├── OrdersPage/
│   ├── ProductDetailPage/
│   ├── ProductsPage/
│   ├── PromotionsPage/
│   └── SearchPage/
├── styles/
│   ├── globals.css
│   ├── reset.css
│   └── tokens.css
├── main.tsx
└── vite-env.d.ts
```

Les pages temporaires restent très courtes. Un composant partagé de présentation peut être utilisé pour éviter de recopier le même balisage dans chaque page, à condition que la page 404 conserve son contenu et son comportement spécifiques.

## Routage

Le routeur utilise un layout parent avec un `Outlet`. Le header et le footer ne sont donc déclarés qu'une fois. Les routes sont centralisées et les chemins réutilisables sont exposés sous forme de constantes typées pour limiter les chaînes dupliquées.

Routes initiales :

| Chemin | Destination |
| --- | --- |
| `/` | Accueil |
| `/produits` | Tous les produits |
| `/categories` | Catégories |
| `/categories/:categorySlug` | Catégorie |
| `/produits/:productSlug` | Détail produit |
| `/recherche` | Recherche |
| `/promotions` | Promotions |
| `/favoris` | Favoris |
| `/panier` | Panier |
| `/commande` | Checkout |
| `/commande/confirmation/:orderId` | Confirmation |
| `/compte` | Mon compte |
| `/compte/commandes` | Mes commandes |
| `/a-propos` | À propos |
| `/contact` | Contact |
| `*` | Page 404 |

À ce stade, aucune garde de route n'est ajoutée : le panier et les commandes n'existent pas encore. Les paramètres dynamiques sont lus uniquement par les pages concernées et restent typés par des types dédiés.

## Layout et navigation

`PageLayout` contient le header, la zone principale et le footer. La zone principale possède un identifiant stable pour qu'un lien d'évitement permette aux utilisateurs clavier de contourner la navigation.

Le header comprend :

- une marque textuelle temporaire et accessible ;
- la navigation principale sur écran large ;
- des accès vers la recherche, les favoris, le compte et le panier ;
- un bouton de menu mobile avec état ouvert ou fermé local au composant ;
- une navigation mobile refermée après sélection d'un lien.

La navigation indique la route active avec `NavLink`. Le bouton mobile expose `aria-expanded` et `aria-controls`. Les icônes décoratives sont masquées aux technologies d'assistance lorsque leur libellé est déjà présent.

Le footer contient une navigation secondaire, des liens vers les pages éditoriales et une mention précisant le caractère démonstratif du projet. Aucun faux label de certification, moyen de paiement ou engagement commercial non vérifiable n'est affiché.

## Design system

### Couleurs

Les variables utilisent des noms sémantiques plutôt que des noms liés à une teinte précise :

- fond principal blanc cassé ;
- surface blanche ;
- surface secondaire beige clair ;
- texte principal presque noir ;
- texte secondaire gris chaud ;
- couleur principale vert foncé ;
- vert plus clair pour les états interactifs ;
- orange ou rouge réservé aux promotions et alertes ;
- couleurs de bordure et de focus accessibles.

Les contrastes des textes et contrôles doivent viser le niveau AA de WCAG.

### Typographie

La base repose sur une pile de polices système moderne afin d'éviter une dépendance réseau. L'échelle comprend les tailles `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl` et `4xl`, avec des hauteurs de ligne adaptées au texte courant et aux titres.

### Espacements et dimensions

L'échelle d'espacement suit une progression courte et régulière, par exemple de `0.25rem` à `6rem`. Les hauteurs des contrôles sont cohérentes et les zones interactives importantes mesurent au moins 44 pixels sur mobile.

### Rayons et ombres

Les rayons restent modérés : petit pour les badges et champs, moyen pour les cartes, circulaire uniquement pour les boutons icône. Une ombre discrète est disponible pour les éléments surélevés, mais les bordures restent le moyen principal de structuration.

### Composants de base

- `Button` accepte les variantes principale, secondaire et texte, ainsi que les tailles usuelles ;
- `FormField` fournit un libellé, un champ, une aide et un emplacement d'erreur accessibles ;
- `Badge` fournit des variantes neutre, succès et promotion ;
- `Container` centre le contenu, applique la largeur maximale et les marges latérales responsive.

Les composants acceptent les attributs HTML natifs appropriés. Ils n'utilisent pas `any` et ne recréent pas une API complexe avant qu'un besoin concret existe.

## Responsive

Les styles sont conçus mobile-first. Les breakpoints servent de repères CSS et ne sont pas consommés par JavaScript :

- petit écran : base sans media query ;
- tablette : environ `48rem` ;
- bureau : environ `64rem` ;
- grand bureau : environ `80rem`.

Sur mobile, la navigation principale est remplacée par un menu contrôlé. Le container conserve une marge latérale compacte. Les espacements et titres augmentent progressivement sur les écrans plus larges. Le contenu ne doit provoquer aucun défilement horizontal à partir de 320 pixels de largeur.

## Accessibilité et comportement

- structure sémantique avec `header`, `nav`, `main` et `footer` ;
- lien d'évitement visible au focus ;
- focus clavier clairement visible ;
- libellés accessibles pour les boutons icône ;
- navigation active perceptible autrement que par la couleur seule ;
- respect de `prefers-reduced-motion` pour les transitions ;
- titre principal unique sur chaque page ;
- page 404 avec message explicite et lien de retour à l'accueil ou au catalogue.

## Gestion des erreurs

Cette tranche ne communique avec aucun serveur. Les erreurs attendues concernent principalement les routes inconnues et les paramètres dynamiques sans contenu réel. Une route inconnue affiche la page 404. Les pages dynamiques temporaires présentent le paramètre de manière sûre sans prétendre qu'un produit ou une catégorie existe.

Une future gestion d'erreur React pourra être ajoutée lorsqu'un flux métier le justifiera ; elle n'est pas anticipée dans cette base.

## Validation

La tranche est considérée comme terminée lorsque :

1. l'installation des dépendances aboutit ;
2. TypeScript ne remonte aucune erreur ;
3. le build Vite de production réussit ;
4. toutes les routes prévues rendent une page ;
5. la route inconnue rend la page 404 ;
6. le header, la navigation mobile et le footer restent utilisables aux largeurs mobile, tablette et bureau ;
7. le menu mobile est utilisable au clavier et expose les attributs ARIA requis ;
8. aucun contenu e-commerce fonctionnel n'a été développé prématurément ;
9. aucun `any`, import inutilisé ou duplication importante n'est introduit.

## Étapes ultérieures

Après validation de cette base, chaque fonctionnalité sera ajoutée par lots indépendants et testables : données du catalogue, catalogue et catégories, détail produit et recherche, panier, favoris, checkout, commandes, compte, puis pages éditoriales et finition.
