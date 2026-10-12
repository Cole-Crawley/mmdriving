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
    const SETTLE = 3400;
    const settling = new Map<Element, number>();
    const gone = (el: Element) => { const r = el.getBoundingClientRect(); return r.bottom <= 0 || r.top >= window.innerHeight; };
    // Things that reach the line in the same moment (a row of lanes, the first rows of a list) go up one after
    // another in reading order; anything that arrives on its own goes up straight away.
    const pending = new Set<HTMLElement>();
    const withSign = new Set<Element>();
    let flushing = false;
    const flush = () => {
      if (!flushing) return;
      flushing = false;
      const batch = [...pending].sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return Math.round(ra.top / 40) - Math.round(rb.top / 40) || ra.left - rb.left;
      });
      pending.clear();
      let inSign = 0;
      batch.forEach((el, k) => {
        if (el.classList.contains('put-up') && !el.classList.contains('paint')) {
          // a sign unrolls at the same steady pace whatever its size, so a tall one (the gantry) takes longer
          // instead of rushing: about 320px a second, between 1.2 and 2.6 seconds
          const dur = Math.min(2.6, Math.max(1.2, el.getBoundingClientRect().height / 320)).toFixed(2);
          el.style.transitionDuration = `${dur}s, ${dur}s`;
        }
        // rows and lanes that open with their sign wait until it is about half open, then follow one by one
        el.style.transitionDelay = withSign.has(el) ? `${450 + Math.min(inSign++, 4) * 180}ms` : `${Math.min(k, 4) * 120}ms`;
        withSign.delete(el);
        el.classList.add('is-up');
        settling.set(el, performance.now());
      });
    };
    const up = (el: Element) => {
      const h = el as HTMLElement;
      if (h.classList.contains('is-up') || pending.has(h)) return;
      // anything inside a sign waits for its sign: opened earlier it would finish unseen behind the closed sign,
      // and the sign would then uncover it already in place
      const sign = h.parentElement?.closest('.put-up');
      if (sign && !sign.classList.contains('is-up') && !pending.has(sign as HTMLElement)) return;
      pending.add(h);
      // Rows and lanes inside a sign count as hidden to the browser while the sign is still closed, so they would
      // only be told to go up at the next scroll. They go up with their sign instead, straight after it in order.
      if (h.classList.contains('put-up')) h.querySelectorAll('.rise, .drop').forEach((c) => { if (onScreen(c) && !c.classList.contains('is-up')) { withSign.add(c); up(c); } });
      // the next frame, or a tenth of a second if frames are paused (a tab in the background), whichever is first
      if (!flushing) { flushing = true; requestAnimationFrame(flush); window.setTimeout(flush, 100); }
    };
    const down = (el: Element) => { (el as HTMLElement).style.transitionDelay = '0ms'; el.classList.remove('is-up'); };
    // Cole's scroll recording (12 Oct) showed things sitting blank for 0.3 to 1.3s while they waited for a line a
    // fifth (or half) of the way up the screen. Everything now starts as soon as it is a little way into view.
    const line = (_el: Element) => 0.92;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && e.boundingClientRect.top < window.innerHeight * line(e.target)) up(e.target); }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    targets().forEach((el) => io.observe(el));
    const settle = () => settling.forEach((at, el) => {
      const early = performance.now() - at < SETTLE;
      if (gone(el) && early) { down(el); settling.delete(el); }
      else if (!early) { settling.delete(el); if (gone(el)) down(el); else io.unobserve(el); }
    });
    let queued = false;
    // Every scrolled frame also checks each closed sign against its own line. The observer alone is not enough:
    // a closed sign is clipped to nothing, so the browser never reports it moving further up the screen, and a
    // sign would otherwise only open when a safety net happened to run.
    const all = targets();
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => {
      queued = false; settle();
      all.forEach((el) => { if (!el.classList.contains('is-up') && onScreen(el)) up(el); });
    }); } };
    window.addEventListener('scroll', onScroll, { passive: true });

    // the safety net uses the same line as the observer, so it can never put a sign up early and steal the animation,
    // and it only puts up signs that are on screen now: anything a fast scroll or a jump skipped past stays down
    // and goes up as it is scrolled back to, instead of already standing there
    const onScreen = (el: Element, at = line(el)) => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight * at && r.bottom > 0; };
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
