import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '../components/PlaceholderImage';
import HeroLoop from '../components/HeroLoop';
import HandNote from '../components/HandNote';
import { projects } from '../lib/projects';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className="page-enter">
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          A decade of ideas, identities, and everything in between.
        </h1>
        <HandNote className={styles.note}>
          all fuelled by coffee
          <br />
          and meticulous overthinking &#8601;
        </HandNote>
      </section>

      <section id="work" className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={`${styles.tile} ${project.tileLarge ? styles.tileLarge : styles.tileSmall}`}
            aria-label={project.title}
          >
            <span className={styles.tileMeta}>
              <span className={styles.tileIndex}>{String(project.index).padStart(2, '0')}</span>
              <span className={styles.tileSlash} aria-hidden="true">
                /
              </span>
              <span className={styles.tileName}>
                <span className={styles.tileNameRest}>{project.title}</span>
                <span className={styles.tileNameHover} aria-hidden="true">
                  View project
                </span>
              </span>
            </span>
            {/* The media is stretched to its row's height and cropped to fill,
                so all three tiles in a row line up regardless of the artwork's
                own ratio. */}
            <span className={styles.tileMedia}>
              {project.hero ? (
                <HeroLoop hero={project.hero} />
              ) : project.heroImage ? (
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  width={project.heroImage.width}
                  height={project.heroImage.height}
                  sizes={project.tileLarge ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 25vw'}
                />
              ) : (
                <PlaceholderImage ratio="16/9" label={project.title} />
              )}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
