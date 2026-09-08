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
            className={`${styles.tile} ${project.tileFull ? styles.tileFull : styles.tileHalf}`}
            aria-label={project.title}
          >
            {project.hero ? (
              <HeroLoop hero={project.hero} ratio={project.tileRatio} />
            ) : project.heroImage ? (
              <Image
                src={project.heroImage.src}
                alt={project.heroImage.alt}
                width={project.heroImage.width}
                height={project.heroImage.height}
                className={styles.tileImage}
                sizes={project.tileFull ? '(max-width: 700px) 100vw, 90vw' : '(max-width: 700px) 100vw, 45vw'}
              />
            ) : (
              <PlaceholderImage
                ratio={project.tileRatio}
                label={project.title}
                sublabel={project.tileRatio === '16/9' ? 'landscape 16 : 9' : 'portrait 4 : 5'}
              />
            )}
            <span className={styles.tileMeta}>
              <span className={styles.tileIndex}>{String(project.index).padStart(2, '0')}</span>
              <span className={styles.tileName}>{project.title}</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
