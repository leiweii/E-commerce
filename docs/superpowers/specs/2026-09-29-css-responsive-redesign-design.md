# Refonte CSS et responsive — spécification

## Objectif

Donner à Marché Frais l'apparence cohérente d'un e-commerce alimentaire français conçu avec un véritable design system. Le résultat doit rester sobre, moderne, légèrement premium et efficace pour parcourir un catalogue, sans modifier les fonctionnalités, les routes, les données ni les parcours existants.

La densité retenue est un équilibre « marché premium accessible » : les compositions restent aérées, tandis que les cartes, filtres et listes conservent une densité adaptée à un site marchand.

## Principes visuels

- Utiliser une palette courte : beige très clair pour le fond, blanc pour les surfaces, vert profond pour les actions et la structure, gris végétaux pour les textes secondaires, orange terre cuite uniquement pour les promotions et les erreurs.
- Éviter les gradients. Privilégier les bordures fines et les changements de couleur aux ombres.
- Limiter les rayons des panneaux et cartes à 6–12 px. Réserver les formes circulaires aux boutons d'icône, compteurs et pictogrammes.
- Employer les ombres uniquement pour signaler une élévation réelle, avec une opacité faible.
- Réduire les titres excessivement grands et appliquer la même échelle typographique aux pages comparables.
- Garder des animations brèves et discrètes, et respecter `prefers-reduced-motion`.

## Fondations du design system

### Couleurs

Les variables globales existantes restent l'unique source pour les couleurs courantes. Elles seront rationalisées autour des rôles suivants :

- arrière-plan général ;
- surface principale et surface secondaire ;
- texte principal, secondaire et discret ;
- primaire, primaire survolé et primaire atténué ;
- promotion/erreur ;
- succès ;
- bordure normale et renforcée ;
- focus visible.

La palette de référence conserve l'identité existante : fond `#fbfaf6`, surface `#ffffff`, surface secondaire `#f3f0e7`, texte `#17211a`, texte secondaire `#687069`, primaire `#173f2a`, primaire survolé `#235a3d`, primaire atténué `#dce9de`, promotion `#cf552e`, promotion sombre `#a83e1e`, bordure `#dedfd8`, bordure renforcée `#b8bdb5` et focus `#347a50`. Une valeur peut être légèrement corrigée uniquement si une mesure de contraste l'exige.

Les couleurs ponctuelles codées directement dans les modules CSS doivent être remplacées par un token lorsqu'elles représentent un rôle partagé.

### Typographie

- Conserver la pile système moderne actuelle afin d'éviter une dépendance réseau.
- Définir une échelle cohérente pour libellés, corps, introduction, titres de cartes, titres de sections et titres de pages.
- Limiter les titres principaux avec `clamp()` pour préserver la hiérarchie sans dominer l'écran mobile.
- Standardiser graisses, interlignages et espacements de lettres par rôle.
- Garder une largeur de lecture confortable pour les textes éditoriaux.

L'échelle cible conserve les niveaux `0.75`, `0.875`, `1`, `1.125` et `1.25rem`, puis utilise des valeurs fluides plafonnées à `2rem` pour les titres de blocs, `2.75rem` pour les titres de section et `3.5rem` pour les rares titres principaux. Sur un écran de 360 px, aucun titre ne doit dépasser `2.5rem`.

### Espacement et dimensions

- Conserver une échelle d'espacement en multiples cohérents et réduire les valeurs ponctuelles non nécessaires.
- Standardiser les hauteurs minimales des boutons, champs et boutons d'icône.
- Garantir des zones tactiles d'au moins 44 px pour les contrôles principaux.
- Conserver un conteneur central avec gouttières fluides et largeur maximale stable.
- Définir des espacements de sections fluides afin que les pages ne soient ni serrées sur mobile ni excessivement vides sur desktop.

### Rayons, ombres et transitions

- Petit rayon pour badges et petits contrôles.
- Rayon moyen pour champs, boutons et images secondaires.
- Grand rayon modéré pour cartes et panneaux majeurs.
- Ombre légère uniquement au survol des cartes ou pour les panneaux superposés.
- Transitions limitées à la couleur, la bordure, l'opacité, l'ombre et un déplacement vertical maximal de 2 px.

Les rayons cibles sont `6px`, `10px` et `12px`. L'ombre de carte maximale est `0 10px 24px rgb(23 33 26 / 0.07)`. Les transitions d'interface durent de `160ms` à `220ms`.

## Composants partagés

### Boutons et liens d'action

- Les variantes primaire, secondaire et discrète doivent partager hauteur, rayon, graisse et comportement focus.
- Le survol ne doit jamais être le seul indicateur d'interactivité.
- Les états désactivés doivent rester lisibles et supprimer les mouvements au survol.
- Les boutons pleine largeur sur mobile doivent être réservés aux actions principales des formulaires et panneaux étroits.

### Champs et formulaires

- Uniformiser les bordures, hauteurs, fonds, libellés, aides et erreurs.
- Fournir un focus net reposant sur le token global plutôt que sur une ombre forte.
- Conserver les associations `label`, `aria-describedby`, `aria-invalid` et les attributs `required` existants.
- Préserver les comportements React Hook Form et Zod sans changement métier.

### Badges et états

- Les badges Bio et Nouveauté utilisent des tons végétaux sobres.
- Le badge Promotion reste la seule accentuation orange forte.
- Les états vides utilisent une bordure légère, une icône et une action claire, sans carte surdimensionnée.

### En-têtes de page et de section

- Unifier la hiérarchie sourcil, titre, introduction et action secondaire.
- Les pages catalogue, panier, favoris, contact et pages temporaires doivent sembler appartenir au même système.
- Les titres et textes introductifs doivent conserver une largeur maximale lisible.

## Navigation globale

### Header

- Conserver le Header fixe, mais réduire l'effet de verre et renforcer la lisibilité de sa bordure.
- Clarifier la marque, l'état actif de navigation et les actions compte/favoris/panier.
- Garantir des boutons d'icône de 44 px et un compteur panier lisible.
- Ne pas modifier les routes ni les compteurs existants.

### Navigation mobile

- Conserver le bouton menu et le panneau actuel.
- Donner aux liens une hauteur tactile confortable, des séparateurs légers et un état actif clair.
- Éviter que le menu ressemble à une simple liste non structurée.

### Footer

- Conserver le fond vert profond, mais améliorer rythme vertical, alignements et contraste des liens.
- Réduire l'impression de bloc massif sur mobile et maintenir une lecture simple des colonnes.

## Composants marchands

### Cartes produits

- Uniformiser le ratio et le traitement des images, avec `object-fit: cover` et un fond de repli neutre.
- Réduire l'élévation et le déplacement au survol.
- Stabiliser la hauteur des zones titre, métadonnées et prix pour aligner les cartes d'une même rangée.
- Conserver les badges, favoris, notes, prix, anciens prix et ajout au panier.
- Rendre les boutons d'icône accessibles au clavier et suffisamment grands au toucher.
- Sur mobile étroit, privilégier une colonne lorsque deux colonnes rendraient les textes ou actions trop comprimés.

### Cartes catégories

- Reprendre le même langage de bordure, rayon, image et survol que les produits.
- Préserver une hiérarchie plus éditoriale et moins dense que les cartes produits.

### Catalogue et filtres

- Conserver la sidebar sticky sur grand écran et le drawer mobile.
- Uniformiser recherche, tri, filtres, compteur et bouton de réinitialisation.
- Éviter les panneaux trop lourds et assurer des contrôles accessibles sur tablette.
- Conserver les comportements de filtre, tri, recherche et chargement progressif.

### Produit, panier et favoris

- Aligner galerie, panneau d'achat, blocs d'information, avis, lignes panier et résumé sur les mêmes surfaces et bordures.
- Maintenir une priorité claire : produit et prix, disponibilité, quantité, action principale, informations secondaires.
- Les réorganisations responsive restent purement visuelles et ne changent ni calculs ni état global.

## Pages éditoriales et accueil

- Le hero conserve sa composition et son contenu, avec une typographie moins spectaculaire et une image mieux cadrée selon le viewport.
- Les sections de produits partagent les mêmes rythmes et cartes que le catalogue.
- Livraison, confiance et newsletter doivent apparaître comme des modules de la même marque, sans multiplier les traitements décoratifs.
- À propos, Contact, 404 et placeholders réutilisent la même hiérarchie et les mêmes surfaces que les pages marchandes.

## Responsive

Les seuils doivent être regroupés autour de quatre intentions plutôt que multipliés arbitrairement :

- mobile étroit : 320–479 px ;
- mobile large et petite tablette : 480–767 px ;
- tablette et petit desktop : 768–1023 px ;
- desktop : 1024 px et plus.

Comportements attendus :

- aucune barre de défilement horizontale à largeur normale ;
- navigation desktop remplacée proprement par la navigation mobile sous 1024 px ;
- grilles de produits à quatre colonnes sur grand desktop, deux sur tablette et une sur mobile étroit ;
- panneaux à deux colonnes empilés avant que leur contenu soit comprimé ;
- boutons, champs, filtres et quantités utilisables au toucher ;
- images sans déformation et sans hauteur excessive sur mobile ;
- tableaux nutritionnels défilables horizontalement dans leur propre conteneur si nécessaire.

## Accessibilité

- Conserver un focus visible de contraste suffisant sur tous les éléments interactifs.
- Ne pas supprimer les contours sans remplacement explicite.
- Respecter les préférences de réduction des animations.
- Maintenir un contraste lisible pour texte secondaire, états désactivés et footer.
- Ne pas utiliser uniquement la couleur pour les promotions, erreurs, sélections ou disponibilités.
- Préserver le lien d'évitement et la structure sémantique existante.

## Limites

- Aucun changement de logique métier, de store Zustand, de schéma de données, de routes ou de persistance.
- Aucun ajout de bibliothèque CSS ou de framework UI.
- Aucun gradient, effet décoratif lourd ou nouvelle couleur sans rôle dans les tokens.
- Aucun remplacement général des images produits dans ce lot.
- Les pages encore temporaires restent temporaires ; seule leur présentation peut être harmonisée.

## Validation

- Exécuter toute la suite Vitest et conserver les 51 tests existants au vert.
- Exécuter ESLint sans erreur ni import inutilisé.
- Exécuter le build TypeScript/Vite sans erreur.
- Vérifier les états clavier, focus, survol et désactivé des composants partagés.
- Vérifier les mises en page représentatives aux largeurs 360, 768, 1024 et 1440 px lorsque l'environnement de prévisualisation le permet.
- Contrôler les pages Accueil, Catalogue, Produit, Panier, Favoris, À propos, Contact et 404.
- Inspecter les changements pour confirmer l'absence de duplication CSS évidente et de modification fonctionnelle involontaire.
