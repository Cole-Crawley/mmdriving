import { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, Mail } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import type { FormState } from '../types';
import styles from './Contact.module.css';

const LESSON_TYPES = [
  'Manual Lessons',
  'Automatic Lessons',
  'Semi-Intensive Course',
  '10-Hour Block Booking',
  'Pass Plus',
  'Motorway Lessons',
  'Refresher Lessons',
  'Test Day Package',
  'Not sure yet',
];

const AREAS = ['Loughborough', 'Melton Mowbray', 'Nottingham', 'Leicester', 'Derby', 'Hinckley', 'Other area'];

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  lessonType: '',
  area: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useReveal();
  const detailsRef = useReveal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://formspree.io/f/mgodepwk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('Something went wrong — please call or email directly.');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Get in Touch</div>
          <h2 className="section__title">Ready to Book?</h2>
          <p className="section__subtitle">
            Call, text, or fill in the form — I'll get back to you as soon as possible.
          </p>
        </div>

        <div className={styles.inner}>
          {/* ── Details ── */}
          <div
            className={`reveal ${styles.details}`}
            ref={detailsRef as React.RefObject<HTMLDivElement>}
          >
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}><Phone size={20} /></div>
              <div className={styles.detailBody}>
                <span className={styles.detailLabel}>Call or Text</span>
                <a href="tel:+447762363936" className={styles.detailMain}>
                  07762 363936
                </a>
                <span className={styles.detailSub}>Mon–Sat, 7am–8pm</span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}><Mail size={20} /></div>
              <div className={styles.detailBody}>
                <span className={styles.detailLabel}>Email</span>
                <a href="mailto:sohag78694@gmail.com" className={styles.detailMain} style={{ fontSize: '0.92rem' }}>
                  sohag78694@gmail.com
                </a>
                <span className={styles.detailSub}>Usually replies within a few hours</span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}><MapPin size={20} /></div>
              <div className={styles.detailBody}>
                <span className={styles.detailLabel}>Areas Covered</span>
                <span className={styles.detailMain} style={{ fontSize: '0.95rem' }}>
                  Loughborough, Melton Mowbray, Nottingham, Leicester, Derby &amp; Hinckley
                </span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}><Clock size={20} /></div>
              <div className={styles.detailBody}>
                <span className={styles.detailLabel}>Lesson Hours</span>
                <span className={styles.detailMain} style={{ fontSize: '1rem' }}>
                  Mon–Fri: 7am – 8pm
                </span>
                <span className={styles.detailSub}>Sat–Sun: 8am – 6pm</span>
              </div>
            </div>

            <div className={styles.whatsappNote}>
              <MessageSquare size={18} className={styles.whatsappIcon} />
              <p>
                <strong>Prefer to message?</strong> WhatsApp works great — tap the number above and send me a message. I reply quickly.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div
            className={`reveal ${styles.formWrap}`}
            ref={formRef as React.RefObject<HTMLDivElement>}
          >
            {submitted ? (
              <div className={styles.success}>
                <CheckCircle size={48} className={styles.successIcon} />
                <h3>Enquiry Sent!</h3>
                <p>
                  Thanks for getting in touch. I'll reply within a few hours — usually much sooner.
                </p>
                <button
                  className="btn btn--outline"
                  onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Your Name <span className={styles.req}>*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Sarah Jones"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone Number <span className={styles.req}>*</span></label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 07700 900123"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. sarah@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="lessonType">Type of Lesson</label>
                    <select
                      id="lessonType"
                      name="lessonType"
                      value={form.lessonType}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      {LESSON_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="area">Your Area</label>
                    <select
                      id="area"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      {AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Anything else? <span className={styles.opt}>(optional)</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="e.g. I've never driven before / I'm quite nervous / I passed my theory last month..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--lg btn--full">
                  <Send size={17} />
                  Send Enquiry
                </button>
                <p className={styles.formNote}>
                  I'll get back to you within a few hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
