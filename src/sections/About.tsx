import { useReveal } from '../hooks/useReveal';
import styles from './About.module.css';

const ROUTE = "M 65 355 C 65 285, 215 265, 215 205 C 215 145, 65 145, 75 85 C 85 35, 210 40, 215 28";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function About() {
  const svgRef = useReveal();
  const contentRef = useReveal();

  return (
    <section className="section" id="about">
      <div className={`container ${styles.inner}`}>

        {/* ── Route graphic panel ── */}
        <div
          className={`reveal ${styles.svgPanel}`}
          ref={svgRef as React.RefObject<HTMLDivElement>}
        >
          <svg
            viewBox="0 0 280 390"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.routeSvg}
            aria-hidden="true"
          >
            {/* ── Faint road surface ── */}
            <path
              d={ROUTE}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ── Static centre-line dashes ── */}
            <path
              d={ROUTE}
              fill="none"
              stroke="rgba(255,255,255,0.11)"
              strokeWidth="1.5"
              strokeDasharray="11 8"
              strokeLinecap="round"
            />

            {/* ── Animated amber route line ── */}
            <path
              d={ROUTE}
              fill="none"
              stroke="#f0b429"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.routeLine}
            />

            {/* ── Start pin ── */}
            <circle cx="65" cy="355" r="20" className={styles.pulseRing}
              fill="none" stroke="#f0b429" strokeWidth="1.5" opacity="0" />
            <circle cx="65" cy="355" r="13" fill="#0f2440" stroke="#f0b429" strokeWidth="2.5" />
            <text x="65" y="360" textAnchor="middle"
              fontSize="11" fontWeight="700" fill="#f0b429"
              fontFamily="system-ui, sans-serif">S</text>
            <text x="65" y="381" textAnchor="middle"
              fontSize="11" fill="rgba(255,255,255,0.78)"
              fontFamily="system-ui, sans-serif" fontWeight="600"
              letterSpacing="0.08em">BEGINNER</text>

            {/* ── Milestone 1 — confidence (right side) ── */}
            <circle cx="215" cy="205" r="6" fill="#f0b429" opacity="0.9" />
            <text x="202" y="198" textAnchor="end"
              fontSize="11" fill="rgba(255,255,255,0.78)"
              fontFamily="system-ui, sans-serif" fontWeight="500">Building Confidence</text>

            {/* ── Milestone 2 — test ready (left side) ── */}
            <circle cx="75" cy="85" r="6" fill="#f0b429" opacity="0.9" />
            <text x="88" y="78" textAnchor="start"
              fontSize="11" fill="rgba(255,255,255,0.78)"
              fontFamily="system-ui, sans-serif" fontWeight="500">Test Ready</text>

            {/* ── Finish — checkmark circle ── */}
            <circle cx="215" cy="28" r="16" fill="#f0b429" />
            <path
              d="M 205 28 L 212 35 L 225 19"
              stroke="#1c3a6b" strokeWidth="3"
              fill="none" strokeLinecap="round" strokeLinejoin="round"
            />
            <text x="196" y="32" textAnchor="end"
              fontSize="12" fontWeight="700" fill="#f0b429"
              fontFamily="system-ui, sans-serif" letterSpacing="0.04em">PASSED!</text>
          </svg>

          <p className={styles.routeCaption}>
            Your journey — first lesson to passing your test
          </p>
        </div>

        {/* ── Text content ── */}
        <div
          className={`${styles.content} reveal`}
          ref={contentRef as React.RefObject<HTMLDivElement>}
        >
          <div className="section__label">Meet Your Instructor</div>
          <h2 className={styles.heading}>Hi, I'm Mohammed</h2>

          <p className={styles.intro}>
            Learning to drive can feel nerve-wracking — trust me, I get it. That's why I make every lesson relaxed, clear, and at <em>your</em> pace. No pressure. No shouting. Just practical help that actually gets you ready to pass.
          </p>
          <p className={styles.body}>
            I've been teaching people to drive for years across Loughborough, Melton Mowbray and the wider East Midlands. I genuinely love seeing students go from nervous beginners to confident drivers. Whether you've never sat behind the wheel or just need a confidence boost — I'm here to help.
          </p>
          <p className={styles.body}>
            My lessons are built around <strong>what actually works</strong> — structured, step-by-step, and always tailored to you.
          </p>

          <div className={styles.credentials}>
            {[
              'DVSA-approved & DBS checked',
              'Structured, step-by-step lessons',
              'Patient with nervous learners',
              'Dual-control car — always safe',
              'Flexible mornings, evenings & weekends',
            ].map((b) => (
              <div key={b} className={styles.credItem}>
                <span className={styles.tick}>✓</span>
                {b}
              </div>
            ))}
          </div>

          <button
            className={`btn btn--primary btn--lg ${styles.cta}`}
            onClick={() => scrollTo('#contact')}
          >
            Book a Lesson with Me
          </button>
        </div>
      </div>
    </section>
  );
}
