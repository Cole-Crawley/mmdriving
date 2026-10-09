import { useEffect, useRef, useState } from 'react';
import { BUSINESS, NAV_LINKS } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [here, setHere] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  // "You are here": the link for the section on screen is underlined, like the road you are on.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    // every section is watched, not only the four in the menu, so the mark clears when you are somewhere else
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setHere('#' + e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // While the menu is open the page behind it cannot be reached by keyboard or screen reader.
  useEffect(() => {
    const rest = [document.querySelector('main'), document.querySelector('footer')];
    rest.forEach((el) => { if (el) (el as HTMLElement).inert = open; });
    if (open) document.querySelector<HTMLAnchorElement>('#menu a')?.focus();
  }, [open]);

  // Close the menu first and let the page behind it become reachable again, then go to the section.
  const follow = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!open) { goTo(href); return; }
    setOpen(false);
    window.setTimeout(() => goTo(href), 60);
  };

  return (
    <header className={styles.header}>
      <a className="skip" href="#lessons">Skip to the lessons</a>
      <nav className={`wrap ${styles.nav}`} aria-label="Main">
        <a className={styles.logo} href="#top" onClick={(e) => follow(e, '#top')} aria-label="MMDriving, back to the top">
          <span className={styles.mark}>MM</span>
          <span className={styles.word}>Driving</span>
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} aria-current={here === l.href ? 'location' : undefined} onClick={(e) => follow(e, l.href)}>{l.label}</a></li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a className={styles.phone} href={BUSINESS.phoneHref}><span className="vh">Call </span>{BUSINESS.phoneDisplay}</a>
          <a className={`btn btn--flag ${styles.book}`} href="#book" onClick={(e) => follow(e, '#book')}>Book a lesson</a>
          <button ref={menuButton} className={styles.menu} type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <div id="menu" className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} hidden={!open}>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={(e) => follow(e, l.href)}>{l.label}</a></li>
          ))}
          <li><a href="#book" onClick={(e) => follow(e, '#book')}>Book a lesson</a></li>
        </ul>
        <p><a href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</a></p>
      </div>
    </header>
  );
}
