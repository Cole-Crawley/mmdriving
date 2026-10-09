import { useEffect, useState } from 'react';
import { BUSINESS, whatsapp } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import styles from './StickyBar.module.css';

/**
 * Phones only: Call, WhatsApp and Book stay at the thumb for the whole page (a sticky bar lifted mobile conversions by
 * about 31% in the research). It steps aside once the booking form itself is on screen, so it never covers it.
 */
export default function StickyBar() {
  const [atForm, setAtForm] = useState(false);
  // Hidden at first only where the browser can tell us when the first button has scrolled away.
  const [atTop, setAtTop] = useState(() => typeof window !== 'undefined' && 'IntersectionObserver' in window);

  useEffect(() => {
    const form = document.querySelector('#book');
    const first = document.querySelector('#top a.btn');   // the Book button on the first sign
    if (!form || !first || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.target === form) setAtForm(e.isIntersecting); else setAtTop(e.isIntersecting);
    }), { threshold: 0.15 });
    io.observe(form); io.observe(first);
    return () => io.disconnect();
  }, []);

  // It waits until the first Book button has scrolled away, so the same button is never on screen twice.
  const away = atForm || atTop;
  return (
    <div className={`${styles.bar} ${away ? styles.away : ''}`} inert={away}>
      <a className={`btn btn--plain ${styles.call}`} href={BUSINESS.phoneHref}>Call</a>
      <a className={`btn btn--plain ${styles.call}`} href={whatsapp()}>WhatsApp</a>
      <a className="btn" href="#book" onClick={(e) => { e.preventDefault(); goTo('#book'); }}>Book a lesson</a>
    </div>
  );
}
