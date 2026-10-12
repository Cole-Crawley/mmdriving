import { ROUTE } from '../data/siteData';
import styles from './RoadToPass.module.css';

/**
 * The whole road from provisional licence to after the test, in the order GOV.UK gives it, with the official links.
 * Useful to someone who has not started yet, and it shows which parts are with Mohammed and which are theirs to do.
 */
export default function RoadToPass() {
  return (
    <section id="road" className="section wrap">
      <div className="grid">
        <header className="section-head">
          <h2 className="rise">The road from provisional licence to passed</h2>
          <p className="rise">Five stops. The yellow ones are with me. The others are yours to do, and I will point you the right way.</p>
        </header>

        <ol className={styles.road}>
          {ROUTE.map((stop, i) => (
            <li key={stop.title} className={`${styles.stop} ${stop.withMe ? styles.withMe : ''} rise`} style={{ ['--i' as string]: i }}>
              <span className={styles.marker} aria-hidden="true">{i + 1}</span>
              <div className={styles.body}>
                <h3>{stop.title}</h3>
                <p>{stop.body}</p>
                {stop.link && (
                  <a className="link" href={stop.link.href} target="_blank" rel="noopener">
                    {stop.link.label}<span className="vh"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              <p className={styles.who}>{stop.withMe ? 'With me' : 'Yours to do'}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
