import { roles, capabilities, tools, education } from '../../lib/resume';
import styles from './page.module.css';

export default function ResumePage() {
  return (
    <main className="page-enter">
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          Senior brand &amp; marketing designer, ten years across brand, campaigns and web.
        </h1>
        <p className={styles.summary}>
          Multidisciplinary practice across brand, digital marketing, web, campaigns, events, social, presentations
          and print &mdash; bringing strategy, craft and intuition to cohesive brand experiences, with strengths in
          art direction, design systems, cross-functional collaboration and AI-assisted creative workflows.
        </p>
        <div className={styles.contactLine}>
          <a href="mailto:hello@chloebond.ca">hello@chloebond.ca</a>
          <a href="tel:+16133152569">+1 (613) 315-2569</a>
          <a href="https://linkedin.com/in/chlobond">LinkedIn</a>
          <span className={styles.contactLineMuted}>Ottawa, Ontario, Canada</span>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.sectionLabel}>Experience</div>
        {roles.map((r) => (
          <div key={`${r.company}-${r.years}`} className={styles.roleRow}>
            <div>
              <h2 className={styles.roleTitle}>{r.role}</h2>
              <div className={styles.roleCompany}>{r.company}</div>
              <p className={styles.roleBlurb}>{r.blurb}</p>
            </div>
            <span className={styles.roleYears}>{r.years}</span>
          </div>
        ))}
      </section>

      <section className={styles.columns}>
        <div>
          <div className={styles.columnHeading}>Capabilities</div>
          <ul className={styles.list}>
            {capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.columnHeading}>Tools</div>
          <ul className={styles.list}>
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.columnHeading}>Education</div>
          <div className={styles.eduList}>
            {education.map((e) => (
              <div key={e.program}>
                <div className={styles.eduProgram}>{e.program}</div>
                <div className={styles.eduSchool}>{e.school}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
