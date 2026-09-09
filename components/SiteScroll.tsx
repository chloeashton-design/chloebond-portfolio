import Image from 'next/image';
import HeroLoop from './HeroLoop';
import PlaceholderImage from './PlaceholderImage';
import type { SiteScroll as SiteScrollMeta } from '../lib/projects';
import styles from './SiteScroll.module.css';

/**
 * A whole web page shown as one continuous scroll, running to the edges of the
 * screen.
 *
 * The artwork arrives as a single very tall export, which is sliced rather than
 * shipped whole: browsers have to decode an image in full before painting any
 * of it, and one 45-megapixel file is enough to defeat a phone. The slices are
 * cut on rows of flat background colour and stacked flush, so the joins can't
 * be seen, and each loads only as it comes into view.
 *
 * The gap between two of the slices is where a live section of the page sits,
 * so a loop can play in place of a still. Its geometry is given as percentages
 * of the page width, which keeps it locked to the artwork at any screen size.
 */
export default function SiteScroll({ scroll, label }: { scroll: SiteScrollMeta; label: string }) {
  const { background, above, below, video, videoInset, videoRatio, videoRadius } = scroll;

  const slice = (img: SiteScrollMeta['above'][number], i: number, group: string) => (
    <Image
      key={`${group}-${i}`}
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      className={styles.slice}
      sizes="100vw"
      // The first slice sits directly under the banner, so it is worth fetching
      // eagerly; everything below it can wait until the reader gets there.
      priority={group === 'above' && i === 0}
    />
  );

  return (
    // The background shows through the video's side margin, and behind any
    // sub-pixel rounding where two slices meet, so no seam can open up.
    <section className={styles.scroll} style={{ background }} aria-label={label}>
      {above.map((img, i) => slice(img, i, 'above'))}

      <div className={styles.videoSlot} style={{ paddingInline: videoInset }}>
        <div
          className={styles.videoFrame}
          style={{ aspectRatio: videoRatio, borderRadius: videoRadius }}
        >
          {video ? (
            <HeroLoop hero={video} />
          ) : (
            <PlaceholderImage ratio="16/9" label="Hero section" sublabel="video to come" />
          )}
        </div>
      </div>

      {below.map((img, i) => slice(img, i, 'below'))}
    </section>
  );
}
