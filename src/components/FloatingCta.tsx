import { useState, useEffect } from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import styles from './FloatingCta.module.css';

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('footer');
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      setVisible(window.scrollY > 500 && footerTop > window.innerHeight + 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
      <a href="tel:+447762363936" className="btn btn--outline btn--lg">
        <Phone size={17} />
        Call Now
      </a>
      <button
        className="btn btn--primary btn--lg"
        onClick={() => scrollTo('#contact')}
      >
        <CalendarCheck size={17} />
        Book a Lesson
      </button>
    </div>
  );
}
