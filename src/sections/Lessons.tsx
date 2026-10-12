import { LESSON_GROUPS } from '../data/siteData';
import { goTo } from '../hooks/useSigns';
import { Arrow } from '../components/Signs';
import styles from './Lessons.module.css';

/**
 * Six kinds of lesson as one list in three groups, set out like a stack sign: one destination per row.
 * Choosing a row carries that lesson into the enquiry form, so nobody has to say it twice.
 */
export default function Lessons() {
  return (
    <section id="lessons" className="section wrap">
      <div className="grid">
        <header className="section-head">
          <h2 className="rise">Lessons for wherever you are starting from</h2>
          <p className="rise">Pick the one that sounds like you. If you are not sure, say so and we will work it out together.</p>
        </header>

        <div className={`sign sign--white put-up ${styles.stack}`}>
          {LESSON_GROUPS.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={`${styles.groupTitle} rise`}>{group.title}</h3>
              <ul>
                {group.lessons.map((lesson) => (
                  <li key={lesson.name} className="rise">
                    <a className={styles.row} href="#book" onClick={(e) => { e.preventDefault(); goTo('#book', lesson.value); }}>
                      <span className={styles.name}>{lesson.name}</span>
                      <span className={styles.body}>{lesson.body}</span>
                      <span className={styles.ask}>Ask about this <Arrow turn={90} className={styles.arrow} /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
