import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import styles from './FilterDrawer.module.css';

interface FilterDrawerProps { isOpen: boolean; resultCount: number; onClose: () => void; children: ReactNode; }

export function FilterDrawer({ isOpen, resultCount, onClose, children }: FilterDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); previouslyFocused?.focus(); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={drawerRef} className={styles.drawer} role="dialog" aria-modal="true" aria-label="Filtres">
      <header><h2>Filtres</h2><button ref={closeButtonRef} type="button" aria-label="Fermer les filtres" onClick={onClose}><X aria-hidden="true" /></button></header>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}><button type="button" onClick={onClose}>Afficher {resultCount} {resultCount === 1 ? 'produit' : 'produits'}</button></div>
    </section>
  </div>;
}
