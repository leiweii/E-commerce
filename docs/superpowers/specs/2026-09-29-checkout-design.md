# Checkout front-end et confirmation de commande

## Objectif

Livrer un checkout front-end complet en cinq étapes pour le projet Marché Frais, sans backend et sans paiement réel. Le parcours transforme le panier local en commande fictive persistante, vide le panier puis affiche une confirmation exploitable après actualisation.

## Contraintes de confidentialité

- Le brouillon du checkout reste uniquement dans l'état React Hook Form de la page courante.
- Une actualisation réinitialise volontairement les cinq étapes.
- Aucune donnée de carte bancaire n'est enregistrée dans Zustand, `localStorage` ou l'objet `Order`.
- La carte de démonstration accepte uniquement le numéro `4242 4242 4242 4242`, l'expiration `12/30` et le cryptogramme `123`.
- L'option PayPal est entièrement simulée et ne déclenche aucune redirection externe.
- L'interface indique explicitement qu'aucun paiement ni achat réel n'est effectué.

## Architecture

`CheckoutPage` contient un formulaire React Hook Form unique fourni aux étapes avec `FormProvider`. L'étape active reste dans un état React local. Chaque bouton Suivant déclenche uniquement la validation Zod des champs de l'étape courante ; la soumission depuis l'étape Vérification applique le schéma complet.

Les responsabilités sont séparées comme suit :

- schémas Zod et types du formulaire ;
- définition des étapes et groupes de champs à valider ;
- composants Coordonnées, Adresse, Livraison, Paiement et Vérification ;
- résumé de commande réutilisable dans le checkout ;
- fonctions pures de calcul des frais, création de l'identifiant et construction de la commande ;
- store Zustand distinct pour les commandes persistées ;
- page de confirmation qui résout une commande par son identifiant d'URL.

Le store panier reçoit une action `clearCart`. La finalisation respecte cet ordre : construire la commande depuis un instantané du panier, l'enregistrer, vider le panier, puis naviguer vers `/commande/confirmation/:orderId`.

## Parcours en cinq étapes

### 1. Coordonnées

Champs : prénom, nom, email et téléphone. Les noms exigent au moins deux caractères et acceptent les lettres françaises, espaces, apostrophes et traits d'union. L'email doit être valide. Le téléphone accepte les formats français `06…`, `07…` et `+33…`, avec espaces ou séparateurs usuels.

### 2. Adresse

Champs : adresse, complément facultatif, code postal et ville. L'adresse exige au moins cinq caractères, le code postal exactement cinq chiffres et la ville au moins deux caractères avec les caractères français usuels.

### 3. Livraison

Trois options exclusives sont proposées :

- `standard` : 4,90 €, offerte lorsque le sous-total atteint 50 € ;
- `express` : 8,90 €, sans seuil de gratuité ;
- `relay` : 2,90 €, sans seuil de gratuité.

Le choix met immédiatement à jour le total du checkout. Le mode standard est sélectionné par défaut.

### 4. Paiement

Deux options sont proposées : carte de démonstration et PayPal fictif. La carte présente trois champs avec les valeurs de test autorisées et un avertissement visible. PayPal affiche seulement un message de simulation. Seule la valeur `card` ou `paypal` est conservée dans la commande.

### 5. Vérification

Cette étape affiche les coordonnées, l'adresse, la livraison, le moyen de paiement, les produits, les économies et le total. Des actions Modifier ramènent vers l'étape correspondante sans perdre les valeurs en mémoire. Le bouton final mentionne clairement la création d'une commande fictive.

## Modèles TypeScript

`CheckoutFormValues` contient les valeurs temporaires des cinq étapes, y compris les champs de carte. `DeliveryMethod` vaut `standard | express | relay` et `PaymentMethod` vaut `card | paypal`.

`Order` contient :

- `id` et `createdAt` ;
- coordonnées et adresse de livraison ;
- mode, libellé et coût de livraison ;
- moyen de paiement sans aucune donnée bancaire ;
- instantané des produits avec identifiant, slug, nom, image, conditionnement, quantité et prix unitaires ;
- nombre d'articles, sous-total, économies, frais de livraison et total.

L'identifiant suit le format `MF-AAAAMMJJ-XXXX`, avec un suffixe alphanumérique majuscule. Les prix sont conservés en centimes.

## Persistance

Les commandes sont persistées par un store Zustand dédié sous la clé `marche-frais-orders-v1`. Seules les commandes finalisées sont enregistrées. La réhydratation valide la forme minimale des données et ignore les entrées corrompues. Cette séparation prépare la future page Mes commandes sans mêler l'historique au panier et aux favoris.

## États particuliers et erreurs

- Un panier vide sur `/commande` affiche un état dédié avec un lien vers le catalogue.
- Une commande introuvable sur la route de confirmation affiche un état clair avec un lien pour continuer les achats.
- Une erreur de validation bloque seulement l'avancement de l'étape concernée, place les messages près des champs et conserve les autres valeurs.
- Les doubles soumissions sont bloquées pendant la création synchrone de la commande.
- Le calcul final est refait depuis l'instantané du panier et le mode de livraison, sans faire confiance à une valeur de total issue du formulaire.

## Interface et responsive

Le checkout réutilise le design system existant. Un indicateur accessible présente les cinq étapes. Sur bureau, le formulaire et le résumé utilisent deux colonnes avec résumé fixe ; sur tablette puis mobile, ils passent sur une colonne. Les options de livraison et de paiement sont des cartes radio accessibles. Les boutons Retour et Suivant restent visibles et suffisamment larges sur mobile.

La confirmation utilise une hiérarchie sobre : icône de réussite, numéro de commande, produits, total, adresse, livraison et bouton Continuer mes achats. Elle rappelle qu'il s'agit d'une démonstration.

## Dépendances

- `react-hook-form` pour l'état et les interactions du formulaire ;
- `zod` pour les schémas et messages de validation ;
- `@hookform/resolvers` pour relier Zod à React Hook Form ;
- Zustand et `localStorage` déjà présents pour la persistance des commandes.

## Vérification

- tests unitaires des schémas Zod, frais de livraison, génération d'identifiant et construction de commande ;
- tests du store de commandes, notamment la persistance et l'assainissement des données ;
- tests d'intégration du passage entre les cinq étapes et du retour vers une étape ;
- tests des erreurs réalistes pour chaque champ demandé ;
- test des deux paiements simulés et de l'absence de données bancaires dans la commande persistée ;
- test de création, vidage du panier et redirection ;
- tests des états panier vide et commande introuvable ;
- suite Vitest complète, ESLint, TypeScript et build Vite ;
- inspection responsive mobile, tablette et bureau lorsque l'outil de navigateur local est disponible ;
- revue indépendante avant clôture.

## Hors périmètre

Backend, API serveur, base de données, authentification, paiement réel, validation bancaire externe, géocodage, sélection réelle d'un point relais, envoi d'email et facturation.
