import { BUSINESS, TOWNS, whatsapp } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import { LPlate } from '../components/Signs';
import styles from './Hero.module.css';

/**
 * The first screen is one road sign: what this is, where, and how to book. No slogan, no badge above the
 * headline, no row of statistics, and no claim the client has not confirmed.
 */
export default function Hero() {
  const others = TOWNS.filter((t) => !t.home).map((t) => t.name);
  return (
    <section id="top" className={`wrap ${styles.hero}`}>
      <div className={`sign put-up ${styles.sign}`}>
        <div className={styles.plate}><LPlate /></div>

        <h1 className={styles.title}>
          Calm driving lessons in <span className={styles.home}>Loughborough</span>
        </h1>

        <p className={styles.also}>
          and {others.slice(0, -1).join(', ')} and {others[others.length - 1]}
        </p>

        <div className={styles.foot}>
          <p className={`lead ${styles.intro}`}>
            I'm {BUSINESS.instructor}, a DVSA approved instructor. Manual and automatic lessons in a dual-control car,
            at your pace. No pressure and no shouting.
          </p>
          <div className={styles.actions}>
            <a className="btn btn--flag" href="#book" onClick={(e) => { e.preventDefault(); goTo('#book'); }}>Book a first lesson</a>
            <p className={styles.call}>
              <span>or call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></span>
              <span>or <a href={whatsapp()}>message on WhatsApp</a></span>
            </p>
          </div>
        </div>
      </div>

      <ul className={styles.facts}>
        <li><b>DVSA approved</b> and DBS checked</li>
        <li><b>Dual-control car</b>, manual or automatic</li>
        <li><b>7am to 8pm</b> on weekdays, <b>8am to 6pm</b> at weekends</li>
      </ul>
    </section>
  );
}
