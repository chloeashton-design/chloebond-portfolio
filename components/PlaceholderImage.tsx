'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface PlaceholderImageProps {
  ratio: '16/9' | '4/5' | '1/1';
  label?: string;
  sublabel?: string;
  rotate?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

let sequence = 0;

export default function PlaceholderImage({ ratio, label, sublabel, rotate, style, className, children }: PlaceholderImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const orderRef = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    if (reduced || !('IntersectionObserver' in window)) {
      setLoaded(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          orderRef.current = sequence++;
          const delay = 90 + (orderRef.current % 4) * 110;
          setTimeout(() => setLoaded(true), delay);
        });
      },
      { rootMargin: '220px 0px' },
    );
    io.observe(node);

    const safety = setTimeout(() => setLoaded(true), 3200);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`ph-frame${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: ratio.replace('/', ' / '), transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
    >
      <span className="ph-skel" data-hidden={loaded} />
      <span className="ph-content" data-loaded={loaded}>
        {children ?? (
          <>
            {label}
            {sublabel ? (
              <>
                <br />
                {sublabel}
              </>
            ) : null}
          </>
        )}
      </span>
    </div>
  );
}
