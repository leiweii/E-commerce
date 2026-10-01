import type { Product } from '../../../types/catalog';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps { products: readonly Product[]; columns?: 3 | 4; moveToCart?: boolean; }
export function ProductGrid({ products, columns = 4, moveToCart = false }: ProductGridProps) { return <div className={`${styles.grid} ${columns === 3 ? styles.threeColumns : ''}`}>{products.map((product) => <ProductCard key={product.id} product={product} moveToCart={moveToCart} />)}</div>; }
