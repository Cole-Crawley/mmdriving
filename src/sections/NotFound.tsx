import { BUSINESS } from '../data/siteData';
import styles from './NotFound.module.css';

/** A wrong address gets a "no through road" sign and the two things most people came for. */
export default function NotFound() {
  return (
    <section className={`wrap ${styles.wrap}`}>
      <div className={`sign sign--blue ${styles.sign}`}>
        {/* the no through road sign: a red bar across the top of a white road */}
        <svg className={styles.tee} viewBox="0 0 120 150" role="img" aria-label="No through road sign">
          <rect x="44" y="40" width="32" height="110" fill="#fff" />
          <rect x="14" y="14" width="92" height="30" fill="#d4351c" />
        </svg>
        <div>
          <h1 className={styles.title}>No through road</h1>
          <p className="lead rise">That page does not exist. The address may have a typo, or the page may have moved.</p>
          <div className={styles.actions}>
            <a className="btn btn--flag" href="/">Back to the start</a>
            <a className={styles.call} href={BUSINESS.phoneHref}>or call <b>{BUSINESS.phoneDisplay}</b></a>
          </div>
        </div>
      </div>
    </section>
  );
}
