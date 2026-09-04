import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Chloe Bond
      </Link>
      <nav className={styles.nav}>
        <Link href="/#work" className="nav-link">
          Work
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/resume" className="nav-link">
          Resume
        </Link>
      </nav>
    </header>
  );
}
