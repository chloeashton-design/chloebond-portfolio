'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { HeroLoop as HeroLoopMeta } from '../lib/projects';
import styles from './HeroLoop.module.css';

/**
 * A looping hero. Plays WebM/MP4 where video is supported and falls back to the
 * GIF where it isn't. Visitors who ask for reduced motion get the poster frame.
 *
 * Used in two places: the banner inside a project page, and that project's tile
 * on the home work grid. `ratio` matches whichever slot it is filling.
 *
 * The asset set is `${src}.webm`, `${src}.mp4`, `${src}.gif` and `${src}-poster.webp`.
 */
export default function HeroLoop({
  hero,
  ratio = '16/9',
  className,
}: {
  hero: HeroLoopMeta;
  ratio?: '16/9' | '4/5' | '1/1';
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  // Starts true so the markup is identical on server and first client render;
  // the observer corrects it immediately for anything below the fold.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    } catch {
      return;
    }
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Only the tiles actually on screen decode video. Matters on the work grid,
  // where every project that defines a hero would otherwise play at once.
  useEffect(() => {
    const node = frameRef.current;
    if (!node || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { rootMargin: '200px 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced || !visible) {
      video.pause();
      if (reduced) {
        // Park on the poster frame so the frozen hero reads as a composed still.
        const park = () => { video.currentTime = hero.posterTime ?? 0; };
        if (video.readyState >= 1) park();
        else video.addEventListener('loadedmetadata', park, { once: true });
      }
      return;
    }

    // autoplay may still be blocked, in which case the poster stays up
    void video.play().catch(() => {});
  }, [reduced, visible, hero.posterTime]);

  const poster = `${hero.src}-poster.webp`;

  return (
    <div
      ref={frameRef}
      className={`${styles.frame}${className ? ` ${className}` : ''}`}
      style={{
        '--hero-poster': `url("${poster}")`,
        '--hero-ratio': ratio.replace('/', ' / '),
        ...(hero.tint ? { '--hero-tint': hero.tint } : {}),
      } as CSSProperties}
    >
      <video
        ref={videoRef}
        className={styles.media}
        // `reduced` is only ever true after mount, so the server-rendered markup
        // is the autoplaying variant and hydration stays consistent.
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        width={1920}
        height={1080}
        aria-label={hero.alt}
      >
        {(hero.sources ?? ['webm', 'mp4']).map((format) => (
          <source key={format} src={`${hero.src}.${format}`} type={`video/${format}`} />
        ))}
        {/* Fallback for browsers with no video support at all. Hidden under
            reduced motion, where the poster background shows through instead. */}
        {!reduced && (hero.gifFallback ?? true) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.media} src={`${hero.src}.gif`} width={960} height={540} alt={hero.alt} />
        )}
      </video>
    </div>
  );
}
