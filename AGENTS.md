# AGENTS.md

## Projet

Ce dépôt contient un projet front-end d'e-commerce alimentaire destiné à être présenté dans un portfolio.

Le projet doit rester réaliste, moderne, propre et suffisamment professionnel pour être présenté à un recruteur.

## Stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules ou CSS structuré
- Zustand si un état global est nécessaire
- React Hook Form + Zod pour les formulaires
- Lucide React pour les icônes
- localStorage pour la persistance
- Déploiement sur Vercel

Il n'y a pas de backend.

Ne pas introduire de backend, de base de données ou d'API serveur sans demande explicite.

## TypeScript

- Éviter `any`.
- Créer des interfaces/types clairs pour les données métier.
- Garder les props des composants correctement typées.
- Supprimer les imports et variables inutilisés.
- Le projet doit compiler sans erreur TypeScript.

## Architecture

- Favoriser les composants réutilisables.
- Éviter les composants et fichiers inutilement volumineux.
- Séparer les pages, composants, données, stores, types et utilitaires.
- Ne pas dupliquer une logique existante.
- Réutiliser les composants déjà présents avant d'en créer de nouveaux.

## Design

Le site est un e-commerce alimentaire moderne.

Direction visuelle :

- design sobre et professionnel ;
- fond blanc ou beige clair ;
- vert foncé comme couleur principale ;
- orange ou rouge uniquement pour les promotions ;
- typographie moderne ;
- beaucoup d'espace ;
- cartes produits simples ;
- animations discrètes ;
- responsive mobile, tablette et desktop.

Éviter :

- Bootstrap ;
- gradients inutiles ;
- ombres excessives ;
- trop de couleurs ;
- gros border-radius partout ;
- interfaces ressemblant à un template générique généré par IA.

Maintenir une cohérence visuelle sur toutes les pages.

## Données

Les produits sont des produits alimentaires réalistes disponibles en France.

Catégories principales :

- Fruits et légumes
- Produits frais
- Épicerie
- Boulangerie
- Boissons
- Bio
- Produits asiatiques
- Snacks et desserts

Les données doivent être réalistes et ne jamais utiliser de Lorem Ipsum.

## Fonctionnalités

Les données persistantes comme :

- panier ;
- favoris ;
- commandes fictives ;
- préférences utilisateur ;

doivent utiliser localStorage.

Ne jamais implémenter de vrai paiement.

## Qualité

Après une modification importante :

- vérifier les erreurs TypeScript ;
- vérifier le build ;
- conserver le responsive ;
- ne pas casser les fonctionnalités déjà présentes.

Avant de modifier une fonctionnalité existante, lire le code concerné et conserver l'architecture actuelle sauf s'il existe une bonne raison de la refactoriser.

Ne pas réécrire inutilement du code fonctionnel.
