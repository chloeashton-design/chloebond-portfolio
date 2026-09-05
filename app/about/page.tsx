import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className="page-enter">
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          I’m a multidisciplinary designer with 10+ years of experience across brand, digital, and everything in
          between.
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
        </div>
        <div className={styles.bioCol}>
          <p className={styles.bioP}>
            That breadth of experience has shaped me into a multidisciplinary designer, and over time it’s also
            pulled me toward the bigger picture: how ideas come together, how creative teams work, and how good
            design shapes the way people experience a brand.
          </p>
          <p className={styles.bioP}>
            Most recently, I spent 5+ years at Rewind, a B2B SaaS company, where my role grew from hands-on design
            into broader ownership across brand and marketing. I led the company’s rebrand and website redesign,
            helped shape how the brand showed up across campaigns, events, social, web, and other touchpoints,
            mentored other designers, and built systems that helped the work stay consistent and scale. That
            experience deepened my focus on art direction, brand stewardship, design systems, and the processes that
            support strong creative work.
          </p>
          <p className={styles.bioP}>
            My approach to design is equal parts strategy, intuition, and craft. After more than a decade of shaping
            brands, I’ve learned that the strongest work lives somewhere between aesthetics and purpose, where every
            detail feels intentional. That same thinking is what draws me to creative operations and the thoughtful
            use of generative and agentic AI to make creative work more efficient without losing the human thinking
            behind it. I love exploring how better tools and processes can create more room for teams to think,
            collaborate, and make great work.
          </p>
          <p className={styles.bioP}>
            Outside of work, you’ll often find me decorating our home, getting lost in a good book, knitting or
            scrapbooking, chasing after my little one, or stirring up something new in the kitchen (usually with a
            fresh batch of chocolate chip cookies cooling on the counter). These simple, everyday rituals at home
            fuel my creativity and quietly shape the way I approach design.
          </p>
        </div>
      </section>
    </main>
  );
}
