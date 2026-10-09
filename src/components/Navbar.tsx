import { useEffect, useRef, useState } from 'react';
import { BUSINESS, NAV_LINKS } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const follow = (e: React.MouseEvent, href: string) => { e.preventDefault(); setOpen(false); goTo(href); };

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
            <li key={l.href}><a href={l.href} onClick={(e) => follow(e, l.href)}>{l.label}</a></li>
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
