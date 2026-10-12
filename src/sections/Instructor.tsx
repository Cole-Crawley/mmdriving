import { TEACHING } from '../data/siteData';
import { LPlate } from '../components/Signs';
import styles from './Instructor.module.css';

/**
 * Who is teaching me, and what is a lesson like? The first thing a nervous learner or their parent wants to know.
 * The client does not want a photograph on the site, so trust is built from what a visitor can check for themselves.
 */
export default function Instructor() {
  return (
    <section id="instructor" className="section wrap">
      <div className="grid">
        <div className={styles.say}>
          <h2 className={`rise ${styles.quote}`}>No pressure. No shouting. Just practical help that gets you ready to pass.</h2>
          <div className={`${styles.check} rise`}>
            <LPlate className={styles.badge} />
            <p>
              <b>Check me before you book.</b> I am a DVSA approved instructor and DBS checked. Ask to see my green badge
              at your first lesson: every approved instructor has to show one in the windscreen.
            </p>
          </div>
        </div>

        <div className={styles.about}>
          <h3 className="rise">Hi, I'm Mohammed</h3>
          <p className="lead rise">
            Learning to drive can feel nerve-racking, and I get it. So every lesson is relaxed, clear and at your pace.
          </p>
          <p className="rise">
            I've been teaching people to drive for years across Loughborough, Melton Mowbray and the wider East Midlands.
            I love seeing someone go from a nervous beginner to a confident driver. Whether you've never sat behind the
            wheel or you need your confidence back, I'm here to help.
          </p>

          <h3 className={`${styles.listTitle} rise`}>What a lesson with me is like</h3>
          <ol className={styles.list}>
            {TEACHING.map((t, i) => (
              <li key={t.title} className="rise" style={{ ['--i' as string]: i }}>
                <b>{t.title}</b>
                <span>{t.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
