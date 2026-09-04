import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import HandNote from './HandNote';
import type { Project } from '../lib/projects';
import { caseStudyProjects } from '../lib/projects';
import styles from './ProjectTemplates.module.css';

export default function CaseStudyTemplate({ project, nextProject }: { project: Project; nextProject: Project }) {
  const position = caseStudyProjects.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <main className="page-enter">
      <section className={styles.csHeader}>
        <Link href="/#work" className={styles.backLink}>
          &larr; Index
        </Link>
        <div className={styles.csTitleRow}>
          <h1 className={styles.csTitle}>{project.title}</h1>
          <span className={styles.csIndex}>
            Case study &mdash; {String(position).padStart(2, '0')} / {String(caseStudyProjects.length).padStart(2, '0')}
          </span>
        </div>
        <p className={styles.csSubtitle}>
          One placeholder line that sets up the project &mdash; long enough to test how a subtitle behaves against the
          title above it.
        </p>
      </section>

      <PlaceholderImage ratio="4/5" label="Project hero" sublabel="portrait 4 : 5" className={styles.heroImage} />

      <section className={styles.metaSection}>
        <div className={styles.metaTable}>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Client</span>
            <span>Placeholder</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Year</span>
            <span>2026</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Role</span>
            <span>Placeholder</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Scope</span>
            <span className={styles.metaRowValRight}>Category 01, Category 02</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Studio</span>
            <span>Placeholder</span>
          </div>
        </div>
        <div className={styles.intro}>
          <p className={styles.introP}>
            Placeholder introduction. Three or four sentences of context will live here &mdash; the brief, the
            constraint, and the idea that came out of it. The column is set to a comfortable measure so the final
            copy can be longer or shorter without the layout breaking.
          </p>
          <p className={styles.introP}>
            A second placeholder paragraph, deliberately shorter, to show how the reading rhythm sits under the hero
            image.
          </p>
        </div>
      </section>

      <section className={styles.imagePairRow}>
        <PlaceholderImage ratio="4/5" label="Application" sublabel="portrait 4 : 5" />
        <PlaceholderImage ratio="4/5" label="Application" sublabel="portrait 4 : 5" />
      </section>

      <section className={styles.pullQuoteSection}>
        <p className={styles.pullQuote}>A placeholder pull quote, sized to break the page and reset the pace.</p>
        <p className={styles.pullAttribution}>Attribution placeholder</p>
      </section>

      <PlaceholderImage ratio="4/5" label="Application" sublabel="portrait 4 : 5" className={styles.heroImageTop} />

      <section className={styles.detailSection}>
        <PlaceholderImage ratio="4/5" label="Detail" sublabel="portrait 4 : 5" />
        <div>
          <p className={styles.detailLabel}>02 &mdash; System</p>
          <p className={styles.detailText}>
            Placeholder text describing one part of the system. This slot exists so a project can carry a middle
            chapter without needing a second hero image.
          </p>
        </div>
      </section>

      <section className={styles.sketchSection}>
        <div className={styles.sketchHeaderRow}>
          <h2 className={styles.sketchHeading}>Section heading</h2>
          <span className={styles.metaLabel}>Sketches &mdash; placeholder</span>
        </div>
        <div className={styles.sketchGrid}>
          <PlaceholderImage ratio="4/5" label="Sketch scan" sublabel="4 : 5" rotate={-1.2} />
          <PlaceholderImage ratio="4/5" label="Sketch scan" sublabel="4 : 5" rotate={0.8} />
          <PlaceholderImage ratio="4/5" label="Sketch scan" sublabel="4 : 5" rotate={-0.6} />
        </div>
        <HandNote className={styles.sketchNote}>
          real sketchbook scans go here &mdash; kept slightly off-grid on purpose
        </HandNote>
      </section>

      <section className={styles.applicationsGrid}>
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
