import { CalendarCheck, Clock, Layers, Target } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRevealChildren } from '../hooks/useReveal';
import { PRICING_PLANS } from '../data/siteData';
import styles from './Pricing.module.css';

const PLAN_ICONS: Record<string, ReactNode> = {
  payg:    <CalendarCheck size={20} />,
  block:   <Layers size={20} />,
  '90min': <Clock size={20} />,
  testday: <Target size={20} />,
};

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function Pricing() {
  const gridRef = useRevealChildren();

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Simple Pricing</div>
          <h2 className="section__title">Pick What Works for You</h2>
          <p className="section__subtitle">
            No hidden fees. No surprises. Just honest, clear pricing.
          </p>
        </div>

        <div
          className={styles.grid}
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={[
                styles.card,
                plan.featured ? styles.cardFeatured : '',
                plan.wide ? styles.cardWide : '',
                `reveal reveal-delay-${Math.min(i + 1, 4)}`,
              ].filter(Boolean).join(' ')}
            >
              {plan.featured && (
                <div className={styles.featuredRibbon}>Best Value</div>
              )}

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={`${styles.planIcon} ${plan.featured ? styles.planIconAccent : ''}`}>
                    {PLAN_ICONS[plan.id]}
                  </div>
                  <div>
                    <div className={styles.planLabel}>{plan.label}</div>
                    <div className={`${styles.priceTag} ${plan.featured ? styles.priceTagAccent : ''}`}>
                      {plan.priceTag}
                    </div>
                  </div>
                </div>

                <p className={styles.desc}>{plan.description}</p>

                <ul className={styles.features}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.featureTick}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`btn ${plan.featured ? 'btn--primary' : 'btn--outline'} btn--full`}
                onClick={() => scrollTo('#contact')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.policy}>
          <div className={styles.policyIcon}><CalendarCheck size={20} /></div>
          <div>
            <h3 className={styles.policyTitle}>Cancellation Policy</h3>
            <p className={styles.policyText}>
              Life happens — I get it. Give me at least <strong>48 hours' notice</strong> to cancel
              or reschedule and there's no charge. Less than 48 hours' notice may be charged at the
              full lesson rate. I'm always reasonable — just communicate with me and we'll sort it out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
