import { Car, Settings, Zap, Award, Navigation, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRevealChildren } from '../hooks/useReveal';
import { SERVICES } from '../data/siteData';
import styles from './Services.module.css';

const ICON_MAP: Record<string, ReactNode> = {
  steering:  <Car size={22} />,
  settings:  <Settings size={22} />,
  zap:       <Zap size={22} />,
  award:     <Award size={22} />,
  road:      <Navigation size={22} />,
  refresh:   <RotateCcw size={22} />,
};

export default function Services() {
  const gridRef = useRevealChildren();

  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section__header">
          <div className="section__label">What I Offer</div>
          <h2 className="section__title">Lessons for Every Learner</h2>
          <p className="section__subtitle">
            Whether you're starting from scratch or sharpening your skills, there's something here for you.
          </p>
        </div>

        <div
          className={styles.grid}
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${styles.card} ${service.badge ? styles.cardFeatured : ''}`}
            >
              {service.badge && (
                <span className={`chip chip--amber ${styles.badge}`}>
                  {service.badge}
                </span>
              )}
              <div className={styles.iconWrap}>
                {ICON_MAP[service.icon]}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
