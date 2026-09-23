import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/siteData';
import styles from './Faq.module.css';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section section--alt" id="faq">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Got Questions?</div>
          <h2 className="section__title">FAQ</h2>
          <p className="section__subtitle">
            The most common questions I get asked. If yours isn't here, just give me a call.
          </p>
        </div>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <div
                className={styles.answerWrap}
                style={{ maxHeight: openIndex === i ? '400px' : '0' }}
              >
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
