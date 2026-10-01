import { lazy, Suspense } from 'react';
import { createBrowserRouter, createMemoryRouter, type RouteObject } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout/PageLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { CategoriesPage } from '../pages/CategoriesPage/CategoriesPage';

const ContactPage = lazy(async () => {
  const module = await import('../pages/ContactPage/ContactPage');
  return { default: module.ContactPage };
});
const CheckoutPage = lazy(async () => ({ default: (await import('../pages/CheckoutPage/CheckoutPage')).CheckoutPage }));
const OrderConfirmationPage = lazy(async () => ({ default: (await import('../pages/OrderConfirmationPage/OrderConfirmationPage')).OrderConfirmationPage }));
const AccountPage = lazy(async () => ({ default: (await import('../pages/AccountPage/AccountPage')).AccountPage }));
const OrdersPage = lazy(async () => ({ default: (await import('../pages/OrdersPage/OrdersPage')).OrdersPage }));
const OrderDetailPage = lazy(async () => ({ default: (await import('../pages/OrderDetailPage/OrderDetailPage')).OrderDetailPage }));

const lazyFallback = <p role="status" aria-live="polite">Chargement de la page…</p>;

const routes: RouteObject[] = [{
  element: <PageLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'produits', element: <CatalogPage mode="all" /> },
    { path: 'produits/:productSlug', element: <ProductPage /> },
    { path: 'categories', element: <CategoriesPage /> },
    { path: 'categories/:categorySlug', element: <CatalogPage mode="category" /> },
    { path: 'recherche', element: <CatalogPage mode="search" /> },
    { path: 'promotions', element: <CatalogPage mode="promotions" /> },
    { path: 'favoris', element: <FavoritesPage /> },
    { path: 'panier', element: <CartPage /> },
    { path: 'commande', element: <Suspense fallback={lazyFallback}><CheckoutPage /></Suspense> },
    { path: 'commande/confirmation/:orderId', element: <Suspense fallback={lazyFallback}><OrderConfirmationPage /></Suspense> },
    { path: 'compte', element: <Suspense fallback={lazyFallback}><AccountPage /></Suspense> },
    { path: 'compte/commandes', element: <Suspense fallback={lazyFallback}><OrdersPage /></Suspense> },
    { path: 'compte/commandes/:orderId', element: <Suspense fallback={lazyFallback}><OrderDetailPage /></Suspense> },
    { path: 'a-propos', element: <AboutPage /> },
    { path: 'contact', element: <Suspense fallback={lazyFallback}><ContactPage /></Suspense> },
    { path: '*', element: <NotFoundPage /> },
  ],
}];

export const createAppRouter = (initialEntries?: string[]) => initialEntries
  ? createMemoryRouter(routes, { initialEntries })
  : createBrowserRouter(routes);
