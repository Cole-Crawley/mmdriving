import { useEffect } from 'react';

/**
 * Puts the signs up: every element with the class "put-up" or "rise" gets "is-up" once, when it comes on screen.
 * Content is only ever hidden while this is running (see .js in index.css), and there are safety nets for the cases
 * where a scroll observer does not fire: a timer, returning to the tab, rotating the phone, and a restored page.
 */
export function useSigns() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    root.classList.add('js');

    const targets = () => Array.from(document.querySelectorAll<HTMLElement>('.put-up, .rise'));
    const up = (el: Element) => el.classList.add('is-up');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { up(e.target); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    targets().forEach((el) => io.observe(el));

    const net = () => targets().forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.96) up(el); });
    let checks = 0;
    const timer = window.setInterval(() => { net(); if (++checks > 8) window.clearInterval(timer); }, 1200);
    const later = () => window.setTimeout(net, 300);
    window.addEventListener('scroll', later, { passive: true });
    window.addEventListener('resize', later);
    window.addEventListener('pageshow', later);
    document.addEventListener('visibilitychange', later);

    return () => {
      io.disconnect();
      window.clearInterval(timer);
      window.removeEventListener('scroll', later);
      window.removeEventListener('resize', later);
      window.removeEventListener('pageshow', later);
      document.removeEventListener('visibilitychange', later);
      root.classList.remove('js');
    };
  }, []);
}

/** Scrolls to a section and, if a lesson or payment choice was clicked, fills that choice into the enquiry form. */
export function goTo(hash: string, choice?: string) {
  if (choice) window.dispatchEvent(new CustomEvent('mm:choose', { detail: choice }));
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ block: 'start' });
  if (history.replaceState) history.replaceState(null, '', hash);
}
