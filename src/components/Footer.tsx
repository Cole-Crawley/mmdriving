import styles from './Footer.module.css';

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <button className={styles.logo} onClick={() => scrollTo('#hero')}>
            <span className={styles.logoMark}>MM</span>
            <span className={styles.logoText}>Driving</span>
          </button>
          <p className={styles.tagline}>
            DVSA-approved driving lessons across Loughborough, Melton Mowbray, Nottingham, Leicester, Derby and Hinckley.
            Patient, structured lessons.
          </p>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.col}>
            <strong>Services</strong>
            {['Manual Lessons', 'Automatic Lessons', 'Semi-Intensive Courses', 'Pass Plus', 'Refresher Lessons', 'Motorway Lessons'].map((s) => (
              <button key={s} className={styles.link} onClick={() => scrollTo('#services')}>{s}</button>
            ))}
          </div>
          <div className={styles.col}>
            <strong>Quick Links</strong>
            {[
              { label: 'About Mohammed', href: '#about' },

              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Book a Lesson', href: '#contact' },
            ].map((l) => (
              <button key={l.href} className={styles.link} onClick={() => scrollTo(l.href)}>{l.label}</button>
            ))}
            <a href="tel:+447762363936" className={styles.link}>07762 363936</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} MMDriving · Loughborough &amp; East Midlands · DVSA Approved</p>
        </div>
      </div>
    </footer>
  );
}
