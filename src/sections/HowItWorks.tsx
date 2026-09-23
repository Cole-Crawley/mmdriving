import { MessageSquare, CalendarCheck, Trophy } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRevealChildren } from '../hooks/useReveal';
import styles from './HowItWorks.module.css';

const steps: { number: string; title: string; body: string; icon: ReactNode }[] = [
  {
    number: '1',
    icon: <MessageSquare size={22} />,
    title: 'Get in Touch',
    body: "Call or message me for a quick chat about where you're at and what you need. No obligation — just a friendly conversation.",
  },
  {
    number: '2',
    icon: <CalendarCheck size={22} />,
    title: 'Book Your First Lesson',
    body: "Pick a date and time that suits you. I'll handle the rest — just have your provisional licence ready.",
  },
  {
    number: '3',
    icon: <Trophy size={22} />,
    title: 'Learn, Pass & Drive',
    body: "We'll build your skills lesson by lesson. When you're ready, book the test — then celebrate your new licence.",
  },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function HowItWorks() {
  const stepsRef = useRevealChildren();

  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Simple Process</div>
          <h2 className="section__title">How to Get Started</h2>
          <p className="section__subtitle">
            Three easy steps from today to your driving licence.
          </p>
        </div>

        <div
          className={styles.steps}
          ref={stepsRef as React.RefObject<HTMLDivElement>}
        >
          {steps.map((step, i) => (
            <div key={step.number} className={`reveal reveal-delay-${i + 1} ${styles.stepWrap}`}>
              <div className={styles.step}>
                <div className={styles.stepTop}>
                  <div className={styles.stepNum}>{step.number}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.arrow} aria-hidden="true">
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path d="M0 8H28M28 8L21 2M28 8L21 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button className="btn btn--primary btn--lg" onClick={() => scrollTo('#contact')}>
            Start Today — Book a Lesson
          </button>
        </div>
      </div>
    </section>
  );
}
