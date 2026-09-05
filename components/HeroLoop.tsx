'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { HeroLoop as HeroLoopMeta } from '../lib/projects';
import styles from './HeroLoop.module.css';

/**
 * A looping hero. Plays WebM/MP4 where video is supported and falls back to the
 * GIF where it isn't. Visitors who ask for reduced motion get the poster frame.
 *
 * The asset set is `${src}.webm`, `${src}.mp4`, `${src}.gif` and `${src}-poster.webp`.
 */
export default function HeroLoop({ hero, className }: { hero: HeroLoopMeta; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    } catch {
      return;
    }

    const apply = () => {
      setReduced(mq.matches);
      const video = videoRef.current;
      if (!video) return;
      if (mq.matches) {
        video.pause();
        // Park on the poster frame so the frozen hero reads as a composed still.
        const park = () => { video.currentTime = hero.posterTime ?? 0; };
        if (video.readyState >= 1) park();
        else video.addEventListener('loadedmetadata', park, { once: true });
      } else {
        // autoplay may still be blocked, in which case the poster stays up
        void video.play().catch(() => {});
      }
    };

    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [hero.posterTime]);

  const poster = `${hero.src}-poster.webp`;

  return (
    <div
      className={`${styles.frame}${className ? ` ${className}` : ''}`}
      style={{ '--hero-poster': `url("${poster}")` } as CSSProperties}
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
        <source src={`${hero.src}.webm`} type="video/webm" />
        <source src={`${hero.src}.mp4`} type="video/mp4" />
        {/* Fallback for browsers with no video support at all. Hidden under
            reduced motion, where the poster background shows through instead. */}
        {!reduced && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.media} src={`${hero.src}.gif`} width={960} height={540} alt={hero.alt} />
        )}
      </video>
    </div>
  );
}
