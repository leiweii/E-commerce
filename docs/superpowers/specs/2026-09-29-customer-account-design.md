# Espace client local

## Objectif

Créer un espace client front-end réaliste pour Marché Frais, sans authentification ni backend. Il permet de consulter et modifier un profil fictif local, d'afficher les commandes créées ultérieurement par le checkout et d'ouvrir le détail d'une commande.

L'historique démarre vide. Aucune commande de démonstration n'est injectée automatiquement : seules les futures commandes finalisées par le checkout alimenteront la liste.

## Architecture

L'espace client repose sur deux stores Zustand persistants et indépendants :

- `profileStore`, clé `marche-frais-profile-v1`, pour le profil et les préférences ;
- `orderStore`, clé `marche-frais-orders-v1`, pour les commandes finalisées.

Cette séparation empêche de mêler l'identité locale à l'historique commercial et fournit au futur checkout un contrat de commande stable. Les deux stores assainissent les données réhydratées afin qu'une valeur `localStorage` ancienne ou corrompue ne casse pas l'interface.

Un `AccountLayout` partagé fournit le titre, la mention Compte de démonstration et la navigation entre Mon compte et Mes commandes. Sur bureau, la navigation est latérale ; elle passe au-dessus du contenu sur tablette et mobile.

## Routes

- `/compte` : consultation et modification du profil ;
- `/compte/commandes` : historique des commandes ;
- `/compte/commandes/:orderId` : détail d'une commande.

Aucune route n'est protégée et aucun état d'authentification n'est créé.

## Profil local

Le profil initial est fictif mais réaliste : prénom, nom, email, téléphone et adresse française. Il est clairement présenté comme une identité de démonstration et peut être modifié.

Le type `CustomerProfile` contient :

- `firstName` ;
- `lastName` ;
- `email` ;
- `phone` ;
- `address` structurée en voie, complément facultatif, code postal et ville ;
- `preferences` avec `newsletter`, `promotionalOffers` et `deliverySms`.

`AccountPage` utilise React Hook Form, Zod et `@hookform/resolvers`. Les noms exigent au moins deux caractères et acceptent les lettres françaises, espaces, apostrophes et traits d'union. L'email doit être valide. Le téléphone accepte les formats français `06…`, `07…` ou `+33…`. La voie exige au moins cinq caractères, le code postal cinq chiffres et la ville au moins deux caractères.

Enregistrer met à jour le store et affiche une confirmation accessible sans rechargement. Réinitialiser restaure explicitement le profil fictif initial. Les préférences sont présentées sous forme de cases à cocher avec des descriptions concrètes.

## Contrat de commande

Le type `Order` est partagé avec le futur checkout. Il contient :

- `id` au format `MF-AAAAMMJJ-XXXX` et `createdAt` ISO ;
- `status` parmi `confirmed`, `preparing`, `shipped` et `delivered` ;
- coordonnées et adresse de livraison ;
- mode, libellé et coût de livraison ;
- moyen de paiement simulé `card` ou `paypal`, sans données bancaires ;
- instantané des produits avec identifiant, slug, nom, image, conditionnement, quantité et prix unitaires ;
- nombre d'articles, sous-total, économies, frais de livraison et total en centimes.

Le store expose au minimum l'ajout d'une commande et sa recherche par identifiant. Les commandes sont affichées de la plus récente à la plus ancienne, sans modifier l'ordre persistant.

## Page Mes commandes

Lorsque l'historique est vide, la page affiche une illustration légère, une explication et un bouton Continuer mes achats vers le catalogue.

Chaque commande existante affiche son numéro, sa date au format français, son montant, son nombre d'articles et un badge de statut. La carte entière ou une action explicite mène au détail. Les libellés des statuts sont : Confirmée, En préparation, Expédiée et Livrée.

## Détail d'une commande

La page affiche :

- numéro, date et badge de statut ;
- chronologie visuelle correspondant au statut actuel ;
- produits, images, quantités, prix unitaires et totaux de ligne ;
- adresse complète ;
- mode de livraison ;
- moyen de paiement simulé, sans numéro de carte ;
- sous-total, économies, livraison et total ;
- lien de retour à Mes commandes et bouton Continuer mes achats.

Un identifiant inconnu affiche un état clair « Commande introuvable » sans faire planter la page.

## Interface et responsive

Les pages réutilisent les variables, boutons, badges et containers existants. Les surfaces restent blanches ou beige clair, le vert foncé porte les actions et les couleurs secondaires sont limitées aux statuts. Les cartes conservent des rayons et ombres modérés.

Le formulaire utilise deux colonnes sur bureau lorsque les champs s'y prêtent, puis une colonne sur mobile. L'historique conserve des informations lisibles sans tableau horizontal. Le détail juxtapose contenu et récapitulatif sur grand écran avant de les empiler sur tablette et mobile.

## Confidentialité et limites

- Aucune authentification, aucun mot de passe et aucun jeton.
- Aucune donnée bancaire dans les types, les composants de compte ou `localStorage`.
- Les données du profil et des commandes restent uniquement dans le navigateur.
- L'interface indique qu'il s'agit d'un compte fictif de démonstration.
- Aucun appel réseau, email, remboursement, facture ou suivi réel.

## Dépendances

- `react-hook-form` pour le formulaire du profil ;
- `zod` pour les validations et l'assainissement ;
- `@hookform/resolvers` pour l'intégration React Hook Form/Zod ;
- Zustand et `localStorage` pour la persistance locale.

## Vérification

- tests unitaires du schéma de profil et de l'assainissement des stores ;
- test de sauvegarde et de réinitialisation du profil ;
- test de persistance des préférences ;
- test de l'état vide des commandes ;
- tests de tri et d'affichage des métadonnées de commande ;
- test du détail complet et d'un identifiant inconnu ;
- vérification qu'aucune donnée bancaire n'est conservée ;
- tests des trois routes dans le layout partagé ;
- suite Vitest complète, ESLint, TypeScript strict et build Vite ;
- inspection responsive mobile, tablette et bureau lorsque l'outil de navigateur local est disponible ;
- revue indépendante avant clôture.

## Hors périmètre

Implémentation du checkout, authentification, inscription, changement de mot de passe, backend, API, base de données, paiement réel, facturation, remboursement et suivi logistique réel.
