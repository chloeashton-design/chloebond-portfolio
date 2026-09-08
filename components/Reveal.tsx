'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Eases its contents up into place the first time they scroll into view.
 *
 * Deliberately starts in an 'idle' state that carries no styles at all: if the
 * script never runs, or the visitor asks for reduced motion, the content is
 * simply visible. Only once mounted does it hide itself and wait for the
 * observer, so a failure can never leave the page blank.
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'pending' | 'in'>('idle');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    if (reduced || !('IntersectionObserver' in window)) {
      setState('in');
      return;
    }

    // Anything already on screen at mount skips straight in, so the top of the
    // page doesn't animate under a visitor who hasn't scrolled yet.
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight) {
      setState('in');
      return;
    }

    setState('pending');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setState('in');
          io.disconnect();
        }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={state} className={className}>
      {children}
    </div>
  );
}
