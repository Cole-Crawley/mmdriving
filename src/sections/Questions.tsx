import { BUSINESS, FAQS } from '../data/siteData';
import styles from './Questions.module.css';

/**
 * The worries people have before they pick up the phone. Built on the browser's own open-and-close element,
 * so it works with a keyboard, a screen reader, or no script at all.
 */
export default function Questions() {
  return (
    <section id="questions" className="section wrap">
      <div className="grid">
        <div className={styles.head}>
          <h2 className="rise">Before you ask</h2>
          <p className="lead rise">
            The questions I hear most. If yours is not here, call or message me on{' '}
            <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.
          </p>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <details key={f.question} className={`${styles.item} rise`} name="questions" open={i === 0}>
              <summary>
                <span>{f.question}</span>
                <span className={styles.sign} aria-hidden="true" />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
