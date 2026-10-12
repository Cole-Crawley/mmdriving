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
    (window as unknown as { __signs?: number }).__signs = 1;

    const targets = () => Array.from(document.querySelectorAll<HTMLElement>('.put-up, .rise, .drop'));
    // A sign that leaves the screen before its movement has finished (a fast scroll, or a jump that glides past it)
    // is taken down again while it is off screen, so it goes up properly when it is scrolled back to. Once it has
    // been up for the whole movement it stays up for good and is no longer watched.
    const SETTLE = 2600;
    const settling = new Map<Element, number>();
    const gone = (el: Element) => { const r = el.getBoundingClientRect(); return r.bottom <= 0 || r.top >= window.innerHeight; };
    // Things that reach the line in the same moment (a row of lanes, the first rows of a list) go up one after
    // another in reading order; anything that arrives on its own goes up straight away.
    const pending = new Set<HTMLElement>();
    let flushing = false;
    const flush = () => {
      flushing = false;
      const batch = [...pending].sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return Math.round(ra.top / 40) - Math.round(rb.top / 40) || ra.left - rb.left;
      });
      pending.clear();
      batch.forEach((el, k) => {
        el.style.transitionDelay = `${Math.min(k, 6) * 150}ms`;
        el.classList.add('is-up');
        settling.set(el, performance.now());
      });
    };
    const up = (el: Element) => {
      const h = el as HTMLElement;
      if (h.classList.contains('is-up') || pending.has(h)) return;
      pending.add(h);
      // Rows and lanes inside a sign count as hidden to the browser while the sign is still closed, so they would
      // only be told to go up at the next scroll. They go up with their sign instead, straight after it in order.
      if (h.classList.contains('put-up')) h.querySelectorAll('.rise, .drop').forEach((c) => { if (onScreen(c)) up(c); });
      if (!flushing) { flushing = true; requestAnimationFrame(flush); }
    };
    const down = (el: Element) => { (el as HTMLElement).style.transitionDelay = '0ms'; el.classList.remove('is-up'); };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) up(e.target); }),
      // a sign goes up once its top is a fifth of the way up the screen, so the movement is seen and not missed
      { rootMargin: '0px 0px -20% 0px' },
    );
    targets().forEach((el) => io.observe(el));
    const settle = () => settling.forEach((at, el) => {
      const early = performance.now() - at < SETTLE;
      if (gone(el) && early) { down(el); settling.delete(el); }
      else if (!early) { settling.delete(el); if (gone(el)) down(el); else io.unobserve(el); }
    });
    let queued = false;
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; settle(); }); } };
    window.addEventListener('scroll', onScroll, { passive: true });

    // the safety net uses the same line as the observer, so it can never put a sign up early and steal the animation,
    // and it only puts up signs that are on screen now: anything a fast scroll or a jump skipped past stays down
    // and goes up as it is scrolled back to, instead of already standing there
    const onScreen = (el: Element) => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.8 && r.bottom > 0; };
    const net = () => { settle(); targets().forEach((el) => { if (onScreen(el)) up(el); }); };
    // Once scrolling has stopped at the foot of the page, anything still below the line goes up, because there is
    // no more scrolling to lift it and a sign must never stay down while it can be seen. Anywhere else a pause does
    // not put signs up early: they wait for the line, so the movement happens where the eye is.
    const atFoot = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    const atRest = () => { settle(); const foot = atFoot(); targets().forEach((el) => { if (onScreen(el) || (foot && !gone(el))) up(el); }); };
    let checks = 0;
    const timer = window.setInterval(() => { net(); if (++checks > 8) window.clearInterval(timer); }, 1200);
    let rest = 0;
    const later = () => { window.clearTimeout(rest); rest = window.setTimeout(atRest, 700); };
    window.addEventListener('load', later);
    window.addEventListener('scroll', later, { passive: true });
    window.addEventListener('resize', later);
    window.addEventListener('pageshow', later);
    document.addEventListener('visibilitychange', later);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(timer);
      window.clearTimeout(rest);
      window.removeEventListener('load', later);
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
  // move focus as well as the view, so keyboard and screen-reader users arrive in the same place
  const heading = el.querySelector<HTMLElement>('h2, h1');
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}

/**
 * Counts the things that matter (an enquiry sent, a tap on the phone number or WhatsApp) in Vercel Web Analytics.
 * It does nothing at all on a computer where the analytics script is not present, such as this one during development.
 */
export function track(name: string) {
  const va = (window as unknown as { va?: (kind: string, data: { name: string }) => void }).va;
  try { if (va) va('event', { name }); } catch { /* counting must never break the page */ }
}
