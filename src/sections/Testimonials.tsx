import { useRevealChildren } from '../hooks/useReveal';
import { TESTIMONIALS } from '../data/siteData';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const gridRef = useRevealChildren();

  return (
    <section className="section section--alt" id="testimonials">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Real Reviews</div>
          <h2 className="section__title">What Students Say</h2>
          <p className="section__subtitle">
            Don't just take my word for it — here's what real students have said.
          </p>
        </div>

        <div
          className={styles.grid}
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} ${styles.card} ${t.accent ? styles.cardAccent : ''}`}
            >
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>&ldquo;{t.body}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div className={styles.authorInfo}>
                  <strong>{t.name}</strong>
                  <span>{t.location} · {t.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
