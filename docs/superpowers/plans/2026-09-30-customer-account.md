# Customer Account Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the local customer profile, order history, and order-detail pages using the orders produced by checkout.

**Architecture:** Add a separately persisted and sanitized profile store, then compose the three account routes inside a shared account layout. Order pages read the shared `orderStore` without mutating stored ordering and handle both empty history and unknown IDs.

**Tech Stack:** React, TypeScript, React Router, React Hook Form, Zod, Zustand persist, CSS Modules, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-29-customer-account-design.md`

## Global Constraints

- No authentication, password, token, backend, or API.
- Persist the fictitious profile under `marche-frais-profile-v1`.
- Read orders from `marche-frais-orders-v1`; never inject demo orders automatically.
- Never expose or persist bank-card data.
- Reuse the existing design system and the shared `Order` type from the checkout plan.
- Do not push to GitHub.

## Review Focus

- Corrupt nested address or preference data must fall back safely rather than partially poisoning the profile.
- Saving then refreshing must preserve every profile field and preference.
- Reset must restore the exact fictitious default profile and update the form immediately.
- Equal or invalid order dates must not mutate or crash the persistent history.
- Unknown order IDs and an empty history must expose clear recovery actions.

---

### Task 1: Profile domain, schema, and store

**Files:**
- Create: `src/types/customer.ts`
- Create: `src/features/account/profileSchema.ts`
- Create: `src/features/account/profileSchema.test.ts`
- Create: `src/stores/profileStore.ts`
- Create: `src/stores/profileStore.test.ts`

**Interfaces:**
- Produces: `CustomerProfile`, `CustomerPreferences`, `DEFAULT_CUSTOMER_PROFILE`, `profileSchema`, and `ProfileFormValues`.
- Produces: `useProfileStore` with `profile`, `updateProfile(profile): void`, and `resetProfile(): void`.
- Produces: `sanitizeProfile(value: unknown): CustomerProfile`.

- [ ] **Step 1: Write failing profile-schema tests**

Cover valid French names/phone/address, invalid email/phone/postcode/city, and all three boolean preferences.

- [ ] **Step 2: Run schema tests RED**

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement types, defaults, and schema**

Keep the default identity clearly fictitious and use the same validation rules as checkout where possible without coupling forms.

- [ ] **Step 4: Write failing store tests**

Assert update, reset, persistence, and complete fallback from malformed nested stored data.

- [ ] **Step 5: Implement the store and run Task 1 tests GREEN**

Expected: PASS.

### Task 2: Shared account layout and profile form

**Files:**
- Create: `src/features/account/components/AccountLayout/AccountLayout.tsx`
- Create: `src/features/account/components/AccountLayout/AccountLayout.module.css`
- Create: `src/pages/AccountPage/AccountPage.tsx`
- Create: `src/pages/AccountPage/AccountPage.module.css`
- Create: `src/pages/AccountPage/AccountPage.test.tsx`
- Modify: `src/app/router.tsx`

**Interfaces:**
- Consumes: Task 1 store/schema, `ROUTES.account`, `ROUTES.orders`, `PageHeader`, `Button`, and `Outlet` or children.
- Produces: account navigation with active state and `AccountPage(): JSX.Element`.

- [ ] **Step 1: Write failing account tests**

Assert default values, validation messages, successful save status, persistence-backed store update, reset behavior, three preference controls, demo-account copy, and links to both account sections.

- [ ] **Step 2: Run tests RED**

Expected: FAIL because `/compte` is still a placeholder.

- [ ] **Step 3: Implement responsive layout and accessible form**

Use React Hook Form with Zod; associate all error messages; use `role="status"` for successful save/reset feedback; keep two columns only where the existing breakpoint supports them.

- [ ] **Step 4: Register `/compte` and run tests GREEN**

Expected: PASS.

### Task 3: Order history and order detail

**Files:**
- Create: `src/features/account/orderPresentation.ts`
- Create: `src/features/account/orderPresentation.test.ts`
- Create: `src/pages/OrdersPage/OrdersPage.tsx`
- Create: `src/pages/OrdersPage/OrdersPage.module.css`
- Create: `src/pages/OrdersPage/OrdersPage.test.tsx`
- Create: `src/pages/OrderDetailPage/OrderDetailPage.tsx`
- Create: `src/pages/OrderDetailPage/OrderDetailPage.module.css`
- Create: `src/pages/OrderDetailPage/OrderDetailPage.test.tsx`
- Modify: `src/app/routes.ts`
- Modify: `src/app/router.tsx`

**Interfaces:**
- Consumes: shared `Order`, `useOrderStore`, product snapshot fields, `formatPrice`, and account layout.
- Produces: `sortOrdersNewestFirst(orders): Order[]`, `formatOrderDate(iso): string`, `getOrderStatusLabel(status): string`, and `ROUTES.orderDetail(id): string`.

- [ ] **Step 1: Write failing presentation tests**

Assert literal French status labels, valid French date output, safe fallback for invalid dates, newest-first copy without mutating input, and stable ordering for equal dates.

- [ ] **Step 2: Implement pure presentation helpers and run GREEN**

Expected: PASS.

- [ ] **Step 3: Write failing history/detail tests**

Assert empty history recovery; populated cards show number/date/amount/item count/status and detail links; detail shows timeline, lines, quantities, address, delivery, payment, totals, and return actions; unknown ID shows `Commande introuvable`.

- [ ] **Step 4: Implement both pages and routes**

Do not use a horizontally scrolling table; render semantic lists/cards and a status timeline with text labels.

- [ ] **Step 5: Run account, order, checkout-store, and router tests GREEN**

Expected: PASS.
