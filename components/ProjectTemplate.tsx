import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import type { Project } from '../lib/projects';
import styles from './ProjectTemplate.module.css';

export default function ProjectTemplate({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main className="page-enter">
      <section className={styles.header}>
        <Link href="/#work" className={styles.backLink}>
          &larr; Work
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
      </section>

      <PlaceholderImage ratio="16/9" label="Project hero" sublabel="landscape 16 : 9" className={styles.hero} />

      <section className={styles.overview}>
        <div className={styles.intro}>
          <p className={styles.introP}>
            Placeholder introduction. A short blurb about the role and the work will live here &mdash; what the
            project was, what it needed, and what was delivered. The column is set to a comfortable measure so the
            final copy can be longer or shorter without the layout breaking.
          </p>
        </div>
        <div className={styles.metaTable}>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Client</span>
            <span className={styles.metaRowVal}>Placeholder</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Year</span>
            <span className={styles.metaRowVal}>2026</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Role</span>
            <span className={styles.metaRowVal}>Placeholder</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Scope</span>
            <span className={styles.metaRowVal}>Category 01, Category 02</span>
          </div>
        </div>
      </section>

      <section className={styles.pairRow}>
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="portrait 4 : 5" />
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="portrait 4 : 5" />
      </section>

      <section className={styles.wideRow}>
        <PlaceholderImage ratio="16/9" label="Project image" sublabel="landscape 16 : 9" />
      </section>

      <section className={styles.tripleRow}>
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="4 : 5" />
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="4 : 5" />
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="4 : 5" />
      </section>

      <section className={styles.pairRow}>
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="portrait 4 : 5" />
        <PlaceholderImage ratio="4/5" label="Project image" sublabel="portrait 4 : 5" />
      </section>

      <Link href={`/work/${nextProject.slug}`} className={styles.nextButton}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>{nextProject.title} &rarr;</span>
      </Link>
    </main>
  );
}
