import Image from 'next/image';
import HandNote from '../../components/HandNote';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className="page-enter">
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          I make brand and marketing work that&rsquo;s built to actually get used &mdash; not just admired in a deck.
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
            taken on a normal Tuesday &#8598;
          </HandNote>
        </div>
        <div className={styles.bioCol}>
          <p className={styles.bioP}>
            I&rsquo;m a brand and marketing designer based in Ottawa, with ten years spent moving between brand
            identity, web, campaigns, events, and the systems that hold it all together. I like the part of the job
            where strategy turns into something people can actually see and use &mdash; a rebrand that ships, a
            component library that saves the next designer a week, a campaign that looks like it came from one place
            even when six teams touched it.
          </p>
          <p className={styles.bioP}>
            Lately that includes figuring out where AI actually earns a place in a creative workflow versus where it
            just adds noise &mdash; Claude and ChatGPT are both part of how I work now, not just what I put on a
            resume.
          </p>
        </div>
      </section>
    </main>
  );
}
