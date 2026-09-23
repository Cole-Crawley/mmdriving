import { Phone, CalendarCheck, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import styles from './Hero.module.css';

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background texture */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={`container ${styles.inner}`}>
        {/* ── Left content ── */}
        <div className={`${styles.content} ${styles.contentEnter}`}>
          <div className={`chip chip--accent ${styles.badge}`}>
            <span className={styles.dot} />
            DVSA Approved · Loughborough &amp; Melton Mowbray
          </div>

          <h1 className={styles.title}>
            Pass Your Test.
            <br />
            <span className={styles.accent}>First Time.</span>
          </h1>

          <p className={styles.sub}>
            Friendly, patient driving lessons across Loughborough, Melton Mowbray and beyond.
            Structured lessons designed to help you pass in fewer sessions — saving you time and money.
          </p>

          <div className={styles.ctas}>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => scrollTo('#contact')}
            >
              <CalendarCheck size={18} />
              Book Your First Lesson
            </button>
            <a href="tel:+447762363936" className="btn btn--outline btn--lg">
              <Phone size={17} />
              Call Now
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>100+</strong>
              <span>Students Passed</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <strong>Years</strong>
              <span>Experience</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <strong>5.0 ★</strong>
              <span>Rated Instructor</span>
            </div>
          </div>
        </div>

        {/* ── Right card ── */}
        <div className={`${styles.cardWrap} ${styles.cardEnter}`}>
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <span className={`chip chip--green`}>
                <span className={styles.dot} style={{ background: 'var(--c-green)' }} />
                Spaces Available This Week
              </span>
              <p className={styles.cardLocation}>Loughborough &amp; Melton Mowbray</p>
            </div>

            <div className={styles.cardFeatures}>
              <div className={styles.feat}>
                <ShieldCheck size={18} className={styles.featIcon} />
                <span>DVSA Approved Instructor</span>
              </div>
              <div className={styles.feat}>
                <TrendingUp size={18} className={styles.featIcon} />
                <span>Above-average pass rate</span>
              </div>
              <div className={styles.feat}>
                <Star size={18} className={styles.featIcon} />
                <span>5-star rated by students</span>
              </div>
              <div className={styles.feat}>
                <Phone size={18} className={styles.featIcon} />
                <span>Dual-control car for your safety</span>
              </div>
            </div>

            <div className={styles.cardDivider} />

            <p className={styles.cardNote}>
              Spots fill up fast — especially evenings and weekends. Lock in your preferred time today.
            </p>

            <button
              className={`btn btn--primary btn--full`}
              onClick={() => scrollTo('#contact')}
            >
              Check Availability
            </button>
          </div>

          {/* Floating badge */}
          <div className={styles.floatBadge}>
            <span className={styles.floatTop}>DVSA</span>
            <span className={styles.floatSub}>Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
}
