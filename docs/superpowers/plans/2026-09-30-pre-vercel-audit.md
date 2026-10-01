# Pre-Vercel Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the completed pages, remove manifestly incomplete production surfaces, optimize delivery assets, configure Vercel deep links, and prepare one validated local commit without pushing it.

**Architecture:** Execute the category, checkout, and customer-account plans first. Then perform a route/content/static audit, make only evidence-backed corrections, add production metadata and Vercel SPA configuration, and finish with fresh full verification before a single clean commit.

**Tech Stack:** React, TypeScript, Vite, React Router, React Hook Form, Zod, CSS Modules, Vitest, ESLint, Vercel static configuration

**Spec:** `docs/superpowers/specs/2026-09-30-pre-vercel-audit-design.md`

## Global Constraints

- Execute plans in this order: categories, checkout, customer account, final audit.
- Work in the current checkout because the application tree is currently untracked and cannot be reproduced in a new worktree.
- Preserve the approved visual system; do not redesign working pages.
- Exclude generated and internal execution files from the release commit.
- Create one validated application commit at the end and do not push it.
- Do not add a backend, API, database, authentication, or real payment.

## Review Focus

- A direct Vercel request to any client route must resolve `index.html` without changing the visible URL.
- A missing first product image or malformed persisted image path must not produce a runtime exception.
- Lazy route loading states must remain understandable to assistive technology.
- Hero optimization must materially reduce transfer size without changing its displayed aspect ratio.
- The final Git index must omit `node_modules`, `dist`, `.superpowers`, editor files, secrets, and local environment files.

---

### Task 1: Complete route and placeholder audit

**Files:**
- Modify: `src/app/router.tsx`
- Modify: `src/app/routes.ts`
- Modify: `src/app/router.test.tsx`
- Modify: any source file proven by the audit to expose unfinished copy or a broken internal link.

**Interfaces:**
- Consumes: pages and routes produced by the three preceding plans.
- Produces: one registered route for every page listed in the audit spec and a shared accessible lazy-loading fallback.

- [ ] **Step 1: Write or extend route tests**

Assert every public path renders its intended page, dynamic unknown product/order cases are safe, navigation links target registered routes, and no principal page renders “disponible prochainement”.

- [ ] **Step 2: Run route tests RED for any remaining gap**

Run: `npm run test -- --run src/app/router.test.tsx src/pages/SecondaryPages.test.tsx`

- [ ] **Step 3: Correct only demonstrated route/link/placeholder gaps**

Delete `PlaceholderPage` only if no route or test still imports it. Consolidate lazy fallbacks rather than duplicating markup.

- [ ] **Step 4: Run route tests GREEN**

Expected: PASS.

### Task 2: Complete the local newsletter form

**Files:**
- Create: `src/features/home/newsletterSchema.ts`
- Create: `src/features/home/components/NewsletterSection/NewsletterSection.test.tsx`
- Modify: `src/features/home/components/NewsletterSection/NewsletterSection.tsx`
- Modify: `src/features/home/components/NewsletterSection/NewsletterSection.module.css`

**Interfaces:**
- Produces: `newsletterSchema`, `NewsletterFormValues`, and an enabled local-only newsletter form with success feedback.

- [ ] **Step 1: Write the failing newsletter tests**

Assert that empty and malformed email values show an associated validation error; a valid email clears the field and announces a local-only success message; no network request is made; the form no longer contains “bientôt” or “prochain lot”.

- [ ] **Step 2: Run the focused test RED**

Run: `npm run test -- --run src/features/home/components/NewsletterSection/NewsletterSection.test.tsx`

Expected: FAIL because the current controls are disabled.

- [ ] **Step 3: Implement with React Hook Form and Zod**

Use an email-only schema, labelled input, `aria-invalid`, associated error text, and `role="status"` feedback explaining that no real subscription was sent.

- [ ] **Step 4: Run newsletter and home tests GREEN**

Expected: PASS.

### Task 3: Image delivery, favicon, and document metadata

**Files:**
- Create: `public/favicon.svg`
- Create: `public/images/hero/panier-marche.webp`
- Modify: `src/features/home/components/HeroSection/HeroSection.tsx`
- Modify: `index.html`
- Remove after reference verification: `public/images/hero/panier-marche.png`

**Interfaces:**
- Produces: optimized hero with explicit intrinsic dimensions, high fetch priority, and descriptive alt text; local SVG favicon; French title/description/theme and minimal Open Graph metadata.

- [ ] **Step 1: Record original dimensions and byte size**

Verify the source is 1792 × 896 and approximately 2.8 MB; identify an installed image conversion tool before changing files.

- [ ] **Step 2: Convert to WebP and verify the result**

Preserve dimensions and aspect ratio, visually inspect the generated asset, and require a materially smaller byte size. Do not install a runtime dependency for this conversion.

- [ ] **Step 3: Update the hero reference and remove the obsolete PNG**

Keep `fetchPriority="high"`, explicit width/height, and non-lazy loading for the above-the-fold image.

- [ ] **Step 4: Add favicon and metadata**

Add `theme-color`, `og:title`, `og:description`, `og:type=website`, favicon declaration, and the existing accurate portfolio description. Do not invent a production URL or social image URL.

- [ ] **Step 5: Verify asset references and production build**

Search for the removed PNG path and run `npm run build`; expected build success and copied assets.

### Task 4: Vercel SPA configuration

**Files:**
- Create: `vercel.json`
- Modify if necessary: `README.md`

**Interfaces:**
- Produces: Vercel rewrite using schema `https://openapi.vercel.sh/vercel.json`, source `/(.*)`, destination `/index.html`.

- [ ] **Step 1: Add the official Vite SPA rewrite**

Follow the current [Vercel Vite SPA guidance](https://vercel.com/docs/frameworks/frontend/vite) exactly; do not add functions, SSR packages, or React Router framework mode.

- [ ] **Step 2: Document only required deployment settings**

Record Vite framework detection, build command `npm run build`, and output directory `dist`. Do not include an unverified live URL.

- [ ] **Step 3: Validate JSON and run the build**

Parse `vercel.json` and run `npm run build`; expected success.

### Task 5: Static quality, accessibility, and resilience audit

**Files:**
- Modify: only files with a reproduced audit finding.
- Test: nearest existing or new focused test for every behavioral correction.

**Interfaces:**
- Consumes: complete application.
- Produces: no TypeScript/ESLint errors, unused imports, development logs, broken internal routes, unsafe storage hydration, or manifest production placeholders.

- [ ] **Step 1: Run static and structural evidence collection**

Run ESLint; TypeScript through build; searches for `console.log`, `TODO`, `FIXME`, `any`, disabled lint/type checks, placeholders, and missing image paths; list TSX files over 150 lines and CSS files over 250 lines for manual responsibility review.

- [ ] **Step 2: Audit forms, keyboard behavior, and accessible names**

Inspect labels, `aria-describedby`, error/status roles, heading order, active navigation, focus visibility, disabled controls, modal/drawer behavior, and keyboard reachability. Reproduce each defect in a focused test before correction.

- [ ] **Step 3: Audit localStorage and absent-data paths**

Exercise malformed commerce, order, and profile payloads; empty cart/favourites/orders; unknown product/category/order IDs; optional product fields; and unavailable products. Add failing tests only for uncovered wrong behavior, then apply minimal fixes.

- [ ] **Step 4: Audit duplication and component size**

Extract only repeated logic with at least two real consumers or components whose mixed responsibilities impede testing. Avoid cosmetic rewrites.

- [ ] **Step 5: Run affected tests after each fix**

Expected: each regression test fails before its fix and passes afterward.

### Task 6: Full verification and clean local commit

**Files:**
- Modify: `.gitignore`
- Add: all intended application, asset, configuration, test, and documentation files.
- Exclude: `.superpowers/`, `node_modules/`, `dist/`, logs, local environment files, editor files, and secrets.

**Interfaces:**
- Produces: one local commit on `main`; no push.

- [ ] **Step 1: Run the complete test suite**

Run: `npm run test -- --run`

Expected: all test files and tests PASS with zero failures.

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`

Expected: exit 0 with no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite exit 0 with no application error.

- [ ] **Step 4: Verify responsive and route behavior**

Inspect mobile, tablet, and desktop widths plus direct navigation to catalogue, product, checkout, confirmation, account, orders, order detail, contact, and unknown paths. If localhost remains blocked by the available browser environment, record the limitation and complete CSS breakpoint/static checks without claiming a live visual pass.

- [ ] **Step 5: Review the exact release index**

Update `.gitignore`, stage intended paths, inspect `git diff --cached --stat`, `git diff --cached`, and `git status --short`; remove any generated/internal/sensitive file from the index before committing.

- [ ] **Step 6: Create one clean local commit**

Commit message: `feat: complete Marche Frais storefront`

- [ ] **Step 7: Verify commit and stop before push**

Show `git status -sb`, `git show --stat --oneline HEAD`, and confirm no `git push` command was executed.
