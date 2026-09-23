import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../data/siteData';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={() => handleLink('#hero')}>
          <span className={styles.logoMark}>MM</span>
          <span className={styles.logoText}>Driving</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button className={styles.link} onClick={() => handleLink(link.href)}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className={styles.actions}>
          <a href="tel:+447762363936" className={`btn btn--outline ${styles.callBtn}`}>
            <Phone size={15} />
            Call Now
          </a>
          <button
            className="btn btn--primary"
            onClick={() => handleLink('#contact')}
          >
            Book a Lesson
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileInner}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className={styles.mobileLink}
              onClick={() => handleLink(link.href)}
            >
              {link.label}
            </button>
          ))}
          <div className={styles.mobileCtas}>
            <a href="tel:+447762363936" className="btn btn--outline btn--lg">
              <Phone size={16} />
              07762 363936
            </a>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => handleLink('#contact')}
            >
              Book a Lesson
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
