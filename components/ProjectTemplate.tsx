import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import HeroLoop from './HeroLoop';
import Reveal from './Reveal';
import type { Project, ProjectContent } from '../lib/projects';
import styles from './ProjectTemplate.module.css';

/** Shown by any project that doesn't have real copy yet. */
const placeholder: ProjectContent = {
  intro: [
    'Placeholder introduction. A short blurb about the role and the work will live here — what the project was, what it needed, and what was delivered. The column is set to a comfortable measure so the final copy can be longer or shorter without the layout breaking.',
  ],
  client: 'Placeholder',
  year: '2026',
  role: 'Placeholder',
  scope: 'Category 01, Category 02',
};

export default function ProjectTemplate({ project, nextProject }: { project: Project; nextProject: Project }) {
  const content = project.content ?? placeholder;

  return (
    <main className="page-enter">
      <section className={styles.header}>
        <Link href="/#work" className={styles.backLink}>
          &larr; Work
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
      </section>

      {project.hero ? (
        <HeroLoop hero={project.hero} className={styles.heroLoop} />
      ) : project.heroImage ? (
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          width={project.heroImage.width}
          height={project.heroImage.height}
          className={styles.heroImage}
          sizes="100vw"
          priority
        />
      ) : (
        <PlaceholderImage ratio="16/9" label="Project hero" sublabel="landscape 16 : 9" className={styles.hero} />
      )}

      <section className={styles.overview}>
        <div className={styles.intro}>
          {content.intro.map((paragraph, i) => (
            <p key={i} className={styles.introP}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className={styles.metaTable}>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Client</span>
            <span className={styles.metaRowVal}>{content.client}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Year</span>
            <span className={styles.metaRowVal}>{content.year}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Role</span>
            <span className={styles.metaRowVal}>{content.role}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaRowKey}>Scope</span>
            <span className={styles.metaRowVal}>{content.scope}</span>
          </div>
        </div>
      </section>

      {project.gallery ? (
        project.gallery.map((row, i) => (
          <Reveal key={i}>
            <section className={styles.galleryRow} data-columns={row.length}>
              {row.map((item) =>
                item.kind === 'video' ? (
                  <HeroLoop key={item.src} hero={item} ratio={item.ratio} />
                ) : (
                  <Image
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={styles.galleryImage}
                    sizes={
                      row.length === 1
                        ? '(max-width: 700px) 100vw, 90vw'
                        : row.length === 2
                          ? '(max-width: 700px) 100vw, 45vw'
                          : '(max-width: 700px) 100vw, 30vw'
                    }
                  />
                ),
              )}
            </section>
          </Reveal>
        ))
      ) : (
        <>
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
        </>
      )}

      <Link href={`/work/${nextProject.slug}`} className={styles.nextButton}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>{nextProject.title} &rarr;</span>
      </Link>
    </main>
  );
}
