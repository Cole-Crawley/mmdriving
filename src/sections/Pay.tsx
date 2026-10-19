import { CANCELLATION, PAY_OPTIONS, TEST_DAY } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import { Arrow } from '../components/Signs';
import styles from './Pay.module.css';

/**
 * Three ways to pay, drawn as a motorway gantry: one sign over each lane, an arrow pointing down into it.
 * The recommended lane is the only one with a yellow button. The price is the largest thing in each lane.
 */
export default function Pay() {
  const ask = (e: React.MouseEvent, value: string) => { e.preventDefault(); goTo('#book', value); };
  return (
    <section id="pay" className="section wrap">
      <div className="grid">
        <header className="section-head">
          <h2>Three ways to pay. Pick a lane.</h2>
          <p>The same prices in all six towns, with nothing added on. The 10-hour block costs the least per hour.</p>
        </header>

        <div className={`sign sign--blue put-up paint ${styles.gantry}`}>
          {PAY_OPTIONS.map((o, i) => (
            <article key={o.id} className={`${styles.lane} ${o.recommended ? styles.best : ''}`}>
              {/* every lane keeps the same space at the top, so the three headings line up whether or not there is a tag */}
              <p className={styles.tagRow}>{o.recommended && <span className={styles.tag}>Best value</span>}</p>
              <h3 className={styles.name}>{o.name.split(' ').map((word) => <span key={word}>{word} </span>)}</h3>
              {o.price && <p className={styles.price}>{o.price} <span>{o.per}</span></p>}
              <p className={styles.summary}>{o.summary}</p>
              <p className={styles.body}>{o.body}</p>
              <ul className={styles.points}>
                {o.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <a className={`btn ${o.recommended ? '' : 'btn--plain'} ${styles.ask}`} href="#book" onClick={(e) => ask(e, o.value)}>
                Choose this
              </a>
              <Arrow turn={180} className={styles.down} />
              <span className="vh">Lane {i + 1} of {PAY_OPTIONS.length}</span>
            </article>
          ))}
        </div>

        <div className={styles.extra}>
          <div className={styles.testDay}>
            <h3>{TEST_DAY.name}, {TEST_DAY.price}</h3>
            <p>{TEST_DAY.body}</p>
            <a className="link" href="#book" onClick={(e) => ask(e, TEST_DAY.value)}>Ask about a test-day lesson</a>
          </div>
          <div className={styles.cancel}>
            <h3>If you need to cancel</h3>
            <p>{CANCELLATION}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
