'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

/** How far down the page you have to be before the bar is allowed to hide. */
const HIDE_AFTER = 140;
/** Ignored movement, so a trackpad's jitter or a rubber-band bounce can't flicker it. */
const DEADZONE = 6;

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    // Someone who asked for reduced motion keeps a bar that simply stays put.
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    if (reduced) return;

    lastY.current = window.scrollY;
    let queued = false;

    const measure = () => {
      queued = false;
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < DEADZONE) return;

      // Down past the threshold hides it; any upward movement brings it back.
      setHidden(delta > 0 && y > HIDE_AFTER);
      lastY.current = y;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={styles.header}
      data-hidden={hidden || undefined}
      // Tabbing into a link that's currently tucked away pulls the bar back down.
      onFocus={() => setHidden(false)}
    >
      <Link href="/" className={styles.logo}>
        Chloe Bond
      </Link>
      <nav className={styles.nav}>
        <Link href="/#work" className="nav-link">
          Work
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/resume" className="nav-link">
          Resume
        </Link>
      </nav>
    </header>
  );
}
