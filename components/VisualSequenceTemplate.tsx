import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import type { Project } from '../lib/projects';
import styles from './ProjectTemplates.module.css';

export default function VisualSequenceTemplate({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main className="page-enter">
      <section className={styles.vsHeader}>
        <div>
          <Link href="/#work" className={styles.backLink}>
            &larr; Index
          </Link>
          <h1 className={styles.vsTitle}>{project.title}</h1>
        </div>
        <div className={styles.vsMeta}>
          <span>Visual sequence &mdash; no case study</span>
          <span>Category 01 &middot; 2024 &middot; Placeholder client</span>
          <span>14 images, minimal captions</span>
        </div>
      </section>

      <PlaceholderImage ratio="4/5" label="Opening image" sublabel="portrait 4 : 5" style={{ maxWidth: 'min(100%, 46cqw)', marginInline: 'auto', marginTop: 'clamp(28px, 3.6cqw, 56px)' }} />

      <section className={styles.vsImagePairRow}>
        <PlaceholderImage ratio="4/5" label="portrait 4 : 5" />
        <PlaceholderImage ratio="4/5" label="portrait 4 : 5" />
      </section>

      <p className={styles.caption}>Fig. 02&ndash;03 &mdash; placeholder caption in the margin</p>

      <PlaceholderImage
        ratio="4/5"
        label="Sequence image"
        sublabel="portrait 4 : 5"
        style={{ maxWidth: 'min(100%, 46cqw)', marginInline: 'auto', marginTop: 'clamp(28px, 3.6cqw, 56px)' }}
      />

      <section className={styles.centeredColumnSection}>
        <div className={styles.centeredColumn}>
          <PlaceholderImage ratio="4/5" label="Centred column" sublabel="portrait 4 : 5" />
          <p className={styles.centeredCaption}>Fig. 04 &mdash; placeholder caption</p>
        </div>
      </section>

      <section className={styles.vsTripleGrid}>
        <PlaceholderImage ratio="4/5" label="4 : 5" />
        <PlaceholderImage ratio="4/5" label="4 : 5" />
        <PlaceholderImage ratio="4/5" label="4 : 5" />
      </section>

      <Link href={`/work/${nextProject.slug}`} className={styles.nextButton}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>{nextProject.title} &rarr;</span>
      </Link>
    </main>
  );
}
