'use client';

import { useEffect, useRef, useState } from 'react';
import type { AnimationItem } from 'lottie-web';
import styles from './LottieLoop.module.css';

/**
 * A vector animation, played from its own JSON.
 *
 * These arrive as After Effects exports whose artwork is only 632px across but
 * is drawn as shapes, so it stays sharp however wide the page renders it -- and
 * the four of them together come to a fraction of what the same footage would
 * weigh as video.
 *
 * Nothing is fetched until the animation is nearly in view: neither the player
 * nor the JSON is worth downloading for a reader who never scrolls this far.
 * Once loaded it plays only while on screen, and a reader who has asked for
 * reduced motion gets a single frame from the end, where the work is done.
 */
export default function LottieLoop({
  src,
  alt,
  width,
  height,
  stillFrame,
  tint,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The frame shown under reduced motion. Pick one where the story has landed. */
  stillFrame: number;
  tint?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    // Build once, the first time the animation comes near the viewport.
    const build = async () => {
      const [{ default: lottie }, data] = await Promise.all([
        import('lottie-web/build/player/lottie_light'),
        fetch(src).then((r) => r.json()),
      ]);
      if (cancelled || !hostRef.current) return;

      const anim = lottie.loadAnimation({
        container: hostRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: data,
        rendererSettings: { progressiveLoad: true },
      });
      animRef.current = anim;
      anim.addEventListener('DOMLoaded', () => {
        if (cancelled) return;
        setReady(true);
        if (reduced) anim.goToAndStop(stillFrame, true);
        else anim.play();
      });
    };

    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        build();
      },
      { rootMargin: '400px 0px' },
    );
    near.observe(host);

    // Once it exists, it runs only while it is actually on screen.
    const onScreen = new IntersectionObserver(
      (entries) => {
        const anim = animRef.current;
        if (!anim || reduced) return;
        for (const e of entries) {
          if (e.isIntersecting) anim.play();
          else anim.pause();
        }
      },
      { threshold: 0.1 },
    );
    onScreen.observe(host);

    return () => {
      cancelled = true;
      near.disconnect();
      onScreen.disconnect();
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [src, stillFrame]);

  return (
    <div
      className={styles.frame}
      style={{ aspectRatio: `${width} / ${height}`, background: ready ? undefined : tint }}
      role="img"
      aria-label={alt}
    >
      <div ref={hostRef} className={styles.host} aria-hidden="true" />
    </div>
  );
}
