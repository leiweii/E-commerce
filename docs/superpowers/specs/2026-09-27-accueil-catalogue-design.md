# Accueil et socle de catalogue

## Objectif

Livrer en un seul lot les fondations React, TypeScript et Vite, un catalogue statique typé de 32 produits alimentaires réalistes, et une page d'accueil complète digne d'un portfolio. Les fonctionnalités de panier, favoris, compte et checkout restent hors périmètre.

## Architecture

- React Router utilise un layout parent partagé avec header, navigation, zone principale et footer.
- Toutes les routes prévues existent ; seules l'accueil et la page 404 ont un contenu finalisé dans ce lot, les autres utilisent un placeholder partagé et propre.
- Le catalogue est séparé en types, catégories, produits et sélecteurs. Aucun contenu produit n'est écrit dans les composants.
- Les composants `ProductCard`, `CategoryCard`, `SectionHeader`, `Badge`, `Button` et `Container` sont conçus pour être réutilisés dans les futures pages du catalogue.
- Les styles reposent sur des CSS Modules et des variables globales sémantiques.

## Données

Le catalogue contient 32 produits répartis équitablement entre huit catégories : fruits et légumes, produits frais, épicerie, boulangerie, boissons, bio, produits asiatiques, snacks et desserts.

Chaque produit contient un identifiant, un slug, un nom, deux descriptions, une catégorie, une marque, un prix en centimes, un ancien prix facultatif, une unité, un conditionnement, une ou plusieurs images locales, une origine, des ingrédients, des allergènes, des informations nutritionnelles, un stock, ainsi que les indicateurs bio, promotion, nouveauté, saison, popularité, note moyenne et nombre d'avis.

Les marques sont fictives mais plausibles. Les produits frais génériques peuvent utiliser une marque de distributeur fictive. Les valeurs nutritionnelles et compositions restent raisonnables et cohérentes sans être présentées comme des données réglementaires réelles.

Les images sont référencées depuis `public/images`. Le lot fournit des visuels locaux légers et cohérents, organisés par `hero`, `categories` et `products`, afin qu'ils soient remplaçables sans modifier les composants.

## Page d'accueil

L'accueil suit cette hiérarchie :

1. hero éditorial avec proposition de valeur et appel vers le catalogue ;
2. catégories principales ;
3. produits populaires ;
4. offre promotionnelle et produits remisés ;
5. sélection bio ;
6. produits de saison ;
7. bannière de livraison ;
8. nouveautés ;
9. avantages de confiance ;
10. newsletter de présentation sans soumission fonctionnelle ;
11. footer global.

Les listes de produits utilisent une grille responsive et le même composant de carte. Les sélections proviennent de fonctions pures du catalogue afin d'être réutilisables et testables.

## Design et responsive

Le fond principal est blanc cassé, les surfaces sont blanches ou beige clair, et le vert foncé est la couleur principale. L'orange est réservé aux promotions. Les rayons sont modérés, les ombres discrètes et les transitions désactivables avec `prefers-reduced-motion`.

L'interface est mobile-first avec des paliers autour de 48 rem, 64 rem et 80 rem. Le header devient un menu mobile accessible. Les grilles passent progressivement de une ou deux colonnes à quatre colonnes. Les images ont un ratio stable et utilisent `object-fit` afin d'éviter les décalages de mise en page.

## Comportement et accessibilité

- lien d'évitement, landmarks sémantiques et titres hiérarchisés ;
- navigation active perceptible ;
- boutons et liens accessibles au clavier avec focus visible ;
- texte alternatif utile pour les images ;
- menu mobile avec `aria-expanded` et fermeture après navigation ;
- newsletter explicitement présentée comme non fonctionnelle dans ce lot ;
- liens produit et catégorie préparés pour leurs routes futures.

## Vérification

- TypeScript strict et absence de `any` ;
- build Vite réussi ;
- aucune erreur d'import ou variable inutilisée ;
- rendu de toutes les routes et page 404 ;
- inspection visuelle aux largeurs mobile, tablette et bureau ;
- contrôle de la cohérence des composants et des variables CSS ;
- recherche de contenu produit dupliqué dans les composants ;
- vérification des sélections populaire, promotion, bio, saison et nouveauté.

## Hors périmètre

Zustand, React Hook Form, Zod, persistance locale, recherche fonctionnelle, panier, favoris, checkout, commandes, authentification, backend et paiement ne sont pas introduits dans ce lot.
