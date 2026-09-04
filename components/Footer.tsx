import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <a href="mailto:hello@chloebond.ca" className={styles.email}>
          hello@chloebond.ca
        </a>
      </div>
      <div className={styles.meta}>
        <div className={styles.socials}>
          <span className={styles.socialsLabel}>Socials</span>
          <a href="https://linkedin.com/in/chlobond" className={styles.socialLink}>
            LinkedIn
          </a>
          <a href="#" className={styles.socialLink}>
            Instagram
          </a>
          <a href="#" className={styles.socialLink}>
            Behance
          </a>
        </div>
        <p className={styles.credit}>Placeholder footer credit line &mdash; one short sentence sits here.</p>
      </div>
    </footer>
  );
}
