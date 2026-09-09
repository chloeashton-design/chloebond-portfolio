'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { ProjectIcons } from '../lib/projects';
import styles from './IconGrid.module.css';

/**
 * A whole icon set, shown at once.
 *
 * Fifty icons are the evidence that a system exists, so they are laid out as a
 * field rather than paraded past: every one stays legible, and the labels drawn
 * into each icon can be read. What they do instead of moving is arrive -- as
 * the grid comes into view the icons tick in a few at a time, on a diagonal, so
 * the set assembles itself rather than simply being there.
 *
 * Under reduced motion they are simply there.
 */
export default function IconGrid({ icons }: { icons: ProjectIcons }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    if (reduced) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setShown(true);
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={styles.panel}
      style={icons.background ? { background: icons.background } : undefined}
      data-shown={shown || undefined}
      aria-label={icons.label}
    >
      <ul className={styles.grid}>
        {icons.items.map((icon, i) => (
          // The stagger runs on a diagonal rather than straight down the rows,
          // which reads as the set filling in instead of a list being typed.
          <li key={icon.src} className={styles.cell} style={{ '--i': i } as CSSProperties}>
            <Image src={icon.src} alt={icon.alt} width={360} height={360} sizes="160px" className={styles.icon} />
          </li>
        ))}
      </ul>
    </section>
  );
}
