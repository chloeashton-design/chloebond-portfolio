import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import HeroLoop from './HeroLoop';
import Reveal from './Reveal';
import type { HeroLoop as HeroLoopMeta, Project, ProjectContent } from '../lib/projects';
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
  tools: 'Placeholder',
};

const RATIO: Record<NonNullable<HeroLoopMeta['ratio']>, number> = {
  '16/9': 16 / 9,
  '5/4': 5 / 4,
  '4/5': 4 / 5,
  '1/1': 1,
};

export default function ProjectTemplate({ project, nextProject }: { project: Project; nextProject: Project }) {
  const content = project.content ?? placeholder;

  // Anything squarer than 3:2 can't run edge to edge -- at full viewport width
  // it would stand taller than the screen -- so it's held centred instead.
  const heroShape = project.pageHero
    ? RATIO[project.pageHero.ratio ?? '16/9']
    : project.pageHeroImage
      ? project.pageHeroImage.width / project.pageHeroImage.height
      : 16 / 9;
  const heldHero = heroShape < 1.5;

  return (
    <main className="page-enter">
      <section className={styles.header}>
        <Link href="/#work" className={styles.backLink}>
          &larr; Work
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
      </section>

      {project.pageHero ? (
        <div className={heldHero ? styles.heroHeld : undefined}>
          <HeroLoop hero={project.pageHero} ratio={project.pageHero.ratio} className={styles.heroLoop} />
        </div>
      ) : project.pageHeroImage ? (
        <div className={heldHero ? styles.heroHeld : undefined}>
          <Image
            src={project.pageHeroImage.src}
            alt={project.pageHeroImage.alt}
            width={project.pageHeroImage.width}
            height={project.pageHeroImage.height}
            className={styles.heroImage}
            sizes={heldHero ? '(max-width: 700px) 100vw, 60vw' : '100vw'}
            priority
          />
        </div>
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
          {content.tools ? (
            <div className={styles.metaRow}>
              <span className={styles.metaRowKey}>Tools</span>
              <span className={styles.metaRowVal}>{content.tools}</span>
            </div>
          ) : null}
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
