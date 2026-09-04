import Image from 'next/image';
import HandNote from '../../components/HandNote';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className="page-enter">
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          A placeholder statement about practice, held to about two lines so it can be rewritten without redesigning
          the page.
        </h1>
      </section>

      <section className={styles.body}>
        <div className={styles.portraitCol}>
          <div className={styles.portraitFrame}>
            <Image
              src="/images/headshot.png"
              alt="Portrait of Chloe Bond"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
              className={styles.portraitImg}
            />
          </div>
          <HandNote className={styles.portraitNote} style={{ textAlign: 'center' }}>
            handwritten aside about the photo &#8598;
          </HandNote>
        </div>
        <div className={styles.bioCol}>
          <p className={styles.bioP}>
            Placeholder biography, first paragraph. Long-form copy will go here later &mdash; where the practice
            sits, what kinds of problems it takes on, and how a project usually starts.
          </p>
          <p className={styles.bioP}>
            Second placeholder paragraph, shorter. It exists to test how the measure reads when the text runs past
            the image beside it, and to hold space for teaching, writing, or speaking notes.
          </p>
        </div>
      </section>
    </main>
  );
}
