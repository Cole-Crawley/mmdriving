import { TOWNS } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import { Roundabout } from '../components/Signs';
import styles from './Areas.module.css';

/** The six towns, drawn as the roundabout sign every learner has to read, with the same names as plain text beside it. */
export default function Areas() {
  return (
    <section id="areas" className="section wrap">
      <div className="grid">
        <div className={`sign put-up paint ${styles.sign}`}>
          <Roundabout />
        </div>

        <div className={styles.text}>
          <h2 className="rise">Six towns, and the test roads around each one</h2>
          <p className="lead rise">
            I teach from Loughborough out to five towns nearby, and the villages between them. You practise on the roads
            around the test centre you will use, so nothing on the day is new.
          </p>
          <ul className={styles.towns}>
            {TOWNS.map((t) => <li key={t.name} className="rise">{t.name}</li>)}
          </ul>
          <p className="rise">
            Not sure you are in range?{' '}
            <a className="link" href="#book" onClick={(e) => { e.preventDefault(); goTo('#book'); }}>Send me your postcode</a>{' '}
            and I will tell you.
          </p>
        </div>
      </div>
    </section>
  );
}
