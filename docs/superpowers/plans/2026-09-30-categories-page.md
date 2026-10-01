# Categories Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/categories` placeholder with a complete responsive category index built from the existing typed catalogue data.

**Architecture:** Add one focused page that composes `PageHeader`, `CategoryCard`, `Container`, and the existing `categories` dataset. Register it in the existing router without changing category-detail behavior.

**Tech Stack:** React, TypeScript, React Router, CSS Modules, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-30-pre-vercel-audit-design.md`

## Global Constraints

- Reuse `CategoryCard` and `categories`; do not duplicate category data.
- Preserve the approved design system and responsive breakpoints.
- Do not introduce a backend, network request, or new dependency.
- Do not push to GitHub.

## Review Focus

- An empty category dataset must not crash the page and should render an explicit empty state.
- Every category card must link to the matching `/categories/:slug` route.
- The page must expose one `h1` and a labelled category section.
- The grid must not create horizontal overflow at mobile widths.
- The catalogue action must remain reachable by keyboard.

---

### Task 1: Category index page

**Files:**
- Create: `src/pages/CategoriesPage/CategoriesPage.tsx`
- Create: `src/pages/CategoriesPage/CategoriesPage.module.css`
- Create: `src/pages/CategoriesPage/CategoriesPage.test.tsx`
- Modify: `src/app/router.tsx`

**Interfaces:**
- Consumes: `categories: Category[]`, `CategoryCard`, `PageHeader`, `Container`, `ButtonLink`, `ROUTES.products`.
- Produces: `CategoriesPage({ items? }): JSX.Element`, registered at `/categories`.

- [ ] **Step 1: Write the failing route test**

Add a router test asserting that `/categories` renders the heading `Toutes nos catégories`, all eight category names, links for `fruits-et-legumes` and `snacks-et-desserts`, and no “disponible prochainement” copy.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm run test -- --run src/app/router.test.tsx`

Expected: FAIL because `/categories` still renders `PlaceholderPage`.

- [ ] **Step 3: Implement the page and route**

Render the dataset in a responsive grid, provide a concise introduction and a `Voir tous les produits` action, then replace only the categories placeholder route.

- [ ] **Step 4: Add the page-level empty-dataset behavior test**

Make the page accept `items?: readonly Category[]` defaulting to `categories`; assert that `items={[]}` renders `Aucune catégorie disponible` and the catalogue action.

- [ ] **Step 5: Run focused and router tests GREEN**

Run: `npm run test -- --run src/pages/CategoriesPage/CategoriesPage.test.tsx src/app/router.test.tsx`

Expected: PASS.
