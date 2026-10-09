import { BUSINESS, NAV_LINKS, TOWNS } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* the road runs out here: tarmac, with the centre line */}
      <div className={styles.road} aria-hidden="true" />
      <div className={`wrap grid ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.name}>MMDriving</p>
          <p>Driving lessons with {BUSINESS.instructor}, a DVSA approved instructor.</p>
        </div>

        <div className={styles.col}>
          <p className={styles.label}>Areas</p>
          <ul>{TOWNS.map((t) => <li key={t.name}>{t.name}</li>)}</ul>
        </div>

        <div className={styles.col}>
          <p className={styles.label}>On this page</p>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} onClick={(e) => { e.preventDefault(); goTo(l.href); }}>{l.label}</a></li>
            ))}
            <li><a href="#book" onClick={(e) => { e.preventDefault(); goTo('#book'); }}>Book a lesson</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.label}>Get in touch</p>
          <ul>
            <li><a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></li>
            <li><a href={BUSINESS.whatsappHref}>WhatsApp</a></li>
            <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
          </ul>
        </div>

        <p className={styles.end}>
          <span>© {new Date().getFullYear()} MMDriving</span>
          <span>Website by <a href="https://colecrawley.com">Cole Crawley</a></span>
        </p>
      </div>
    </footer>
  );
}
