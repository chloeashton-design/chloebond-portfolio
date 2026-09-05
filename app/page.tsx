import Link from 'next/link';
import PlaceholderImage from '../components/PlaceholderImage';
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
          >
            <PlaceholderImage
              ratio={project.tileRatio}
              label={project.title}
              sublabel={project.tileRatio === '16/9' ? 'landscape 16 : 9' : 'portrait 4 : 5'}
            />
          </Link>
        ))}
      </section>
    </main>
  );
}
