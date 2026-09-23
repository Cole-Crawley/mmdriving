import { useRevealChildren } from '../hooks/useReveal';
import { WHY_ITEMS } from '../data/siteData';
import styles from './Why.module.css';

export default function Why() {
  const gridRef = useRevealChildren();

  return (
    <section className="section section--alt" id="why">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Why Students Choose Me</div>
          <h2 className="section__title">More Than Just Lessons</h2>
        </div>

        <div
          className={styles.grid}
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {WHY_ITEMS.map((item, i) => (
            <div
              key={item.number}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${styles.item}`}
            >
              <div className={styles.num}>{item.number}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
