import { Phone, CalendarCheck } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import styles from './CtaBanner.module.css';

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function CtaBanner() {
  const ref = useReveal();

  return (
    <section className={styles.banner}>
      <div className={styles.bgShape} aria-hidden="true" />
      <div
        className={`container ${styles.inner} reveal`}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className={styles.text}>
          <h2 className={styles.heading}>Ready to Get Started?</h2>
          <p className={styles.sub}>
            Spaces fill up fast — especially evenings and weekends. Don't wait until
            your theory certificate is about to expire.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            className="btn btn--primary btn--lg"
            onClick={() => scrollTo('#contact')}
          >
            <CalendarCheck size={18} />
            Book a Lesson Today
          </button>
          <a href="tel:+447762363936" className={`btn btn--outline btn--lg ${styles.callBtn}`}>
            <Phone size={17} />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
