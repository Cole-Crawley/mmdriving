import { TEACHING } from '../data/siteData';
import styles from './Instructor.module.css';

/**
 * Who is teaching me, and what is a lesson like? The first thing a nervous learner or their parent wants to know.
 * When the client sends a photo of himself and the car, it goes in the marked place below.
 */
export default function Instructor() {
  return (
    <section id="instructor" className="section wrap">
      <div className="grid">
        <div className={styles.say}>
          <h2 className={`rise ${styles.quote}`}>No pressure. No shouting. Just practical help that gets you ready to pass.</h2>
          {/* PHOTO: a portrait of Mohammed beside the car goes here once the client supplies one. */}
        </div>

        <div className={styles.about}>
          <h3>Hi, I'm Mohammed</h3>
          <p className="lead">
            Learning to drive can feel nerve-racking, and I get it. So every lesson is relaxed, clear and at your pace.
          </p>
          <p>
            I've been teaching people to drive for years across Loughborough, Melton Mowbray and the wider East Midlands.
            I love seeing someone go from a nervous beginner to a confident driver. Whether you've never sat behind the
            wheel or you need your confidence back, I'm here to help.
          </p>

          <h3 className={styles.listTitle}>What a lesson with me is like</h3>
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
