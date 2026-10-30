'use client';

import { useEffect } from 'react';

/**
 * Makes the eye in the browser tab blink.
 *
 * Browsers only ever draw the first frame of an animated favicon (Firefox
 * aside), so the blink is done by swapping the icon itself: open, half shut,
 * shut, half shut, open. The resting icon stays app/icon.svg, which is what
 * shows anywhere this script doesn't run.
 */

// The same eye as app/icon.svg: transparent, black on a light tab bar and
// white on a dark one.
const frame = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><style>svg{color:#000000}@media (prefers-color-scheme:dark){svg{color:#ffffff}}</style>${body}</svg>`,
  )}`;

const HALF = frame(
  '<path d="M2 12s4-3 10-3 10 3 10 3-4 3-10 3S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>' +
    '<ellipse cx="12" cy="12" rx="3.3" ry="1.9" fill="currentColor"/>',
);
// Shut: the lid as a single line, dipping a little like a closed eye does.
const SHUT = frame(
  '<path d="M2 12s4 2 10 2 10-2 10-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>',
);

const STEP_MS = 55; // per frame: the whole blink is over in about a fifth of a second
const BLINK = [HALF, SHUT, SHUT, HALF];

export default function BlinkingFavicon() {
  useEffect(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch {}

    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;
    const open = link.href;
    // Decoded once up front so the first blink doesn't stall on it.
    BLINK.forEach((src) => {
      new Image().src = src;
    });

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const blink = (then: () => void) => {
      let i = 0;
      const next = () => {
        if (cancelled) return;
        if (i < BLINK.length) {
          link.href = BLINK[i++];
          timer = setTimeout(next, STEP_MS);
        } else {
          link.href = open;
          then();
        }
      };
      next();
    };

    const schedule = () => {
      // A person blinks every few seconds, irregularly, now and then twice.
      timer = setTimeout(
        () => {
          // Background tabs throttle timers to a second or more, which would
          // stretch a blink into a long stare -- so only blink while visible.
          if (document.hidden) return schedule();
          blink(() => {
            if (Math.random() < 0.2) timer = setTimeout(() => blink(schedule), 140);
            else schedule();
          });
        },
        2600 + Math.random() * 3400,
      );
    };
    schedule();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      link.href = open;
    };
  }, []);

  return null;
}
