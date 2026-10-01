import { useState } from 'react';
import type { ProductImage } from '../../../../types/catalog';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps { images: readonly [ProductImage, ...ProductImage[]]; productName: string; }

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];

  return <div className={styles.gallery}>
    <div className={styles.mainImage}>
      <img className={selectedImage.variant === 'detail' ? styles.detailImage : ''} src={selectedImage.src} alt={selectedImage.alt} width="800" height="650" />
    </div>
    {images.length > 1 && <div className={styles.thumbnails} aria-label={`Galerie de ${productName}`}>
      {images.map((image, index) => <button
        key={`${image.src}-${index}`}
        className={index === selectedIndex ? styles.active : ''}
        type="button"
        aria-label={`Afficher l’image ${index + 1} de ${productName}`}
        aria-pressed={index === selectedIndex}
        onClick={() => setSelectedIndex(index)}
      ><img className={image.variant === 'detail' ? styles.detailImage : ''} src={image.src} alt="" width="120" height="90" /></button>)}
    </div>}
  </div>;
}
