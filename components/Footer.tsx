import styles from './Footer.module.css';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/chlobond' },
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
];

const isExternal = (href: string) => href.startsWith('http');

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
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.socialLink}
              {...(isExternal(social.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className={styles.credit}>
          &copy; Chloe Bond 2026. Vibe-coded with Claude Code and an unreasonable amount of ambition.
        </p>
      </div>
    </footer>
  );
}
