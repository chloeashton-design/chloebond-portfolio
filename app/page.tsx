import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '../components/PlaceholderImage';
import HeroLoop from '../components/HeroLoop';
import HandNote from '../components/HandNote';
import { projects } from '../lib/projects';
import styles from './page.module.css';

/** Three to a row, so each row can size its own columns around its wide tile. */
const rows = Array.from({ length: Math.ceil(projects.length / 3) }, (_, i) =>
  projects.slice(i * 3, i * 3 + 3),
);

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
        {rows.map((row, i) => (
          // Which slot holds this row's wide tile, 1-indexed, so the CSS can
          // widen that column. Absent if the row is all one size.
          <div
            key={i}
            className={styles.row}
            data-large={row.findIndex((p) => p.tileLarge) + 1 || undefined}
          >
            {row.map((project) => (
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
                {/* Each tile keeps its own ratio -- 16:9 wide, 5:4 narrow --
                    and the column widths are set so the three still finish
                    level. Artwork fills its slot and crops. */}
                <span className={styles.tileMedia}>
                  {project.hero ? (
                    <HeroLoop hero={project.hero} />
                  ) : project.heroImage ? (
                    <Image
                      src={project.heroImage.src}
                      alt={project.heroImage.alt}
                      width={project.heroImage.width}
                      height={project.heroImage.height}
                      sizes={project.tileLarge ? '(max-width: 700px) 100vw, 42vw' : '(max-width: 700px) 100vw, 30vw'}
                    />
                  ) : (
                    <PlaceholderImage ratio="16/9" label={project.title} />
                  )}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
