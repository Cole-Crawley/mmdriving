import { useEffect, useRef, useState } from 'react';
import { BUSINESS, LESSON_GROUPS, PAY_OPTIONS, TEST_DAY, TOWNS } from '../data/siteData';
import { Countdown } from '../components/Signs';
import type { FormState } from '../types';
import styles from './Book.module.css';

const EMPTY: FormState = { name: '', phone: '', area: '', lessonType: '', message: '' };
const CHOICES = [...LESSON_GROUPS.flatMap((g) => g.lessons.map((l) => l.value)), ...PAY_OPTIONS.map((o) => o.value), TEST_DAY.value, 'Not sure yet'];
type Status = 'idle' | 'sending' | 'sent' | 'failed';
type Errors = Partial<Record<keyof FormState, string>>;

/** A UK phone number in any of the ways people type one: spaces, brackets, +44 or a leading 0. */
const phoneOk = (v: string) => { const d = v.replace(/[^\d+]/g, '').replace(/^\+44/, '0').replace(/^0044/, '0'); return /^0\d{9,10}$/.test(d); };

function check(form: FormState): Errors {
  const e: Errors = {};
  if (form.name.trim().length < 2) e.name = 'Enter your name, so I know who to ask for.';
  if (!form.phone.trim()) e.phone = 'Enter a phone number, so I can call or text you back.';
  else if (!phoneOk(form.phone)) e.phone = 'That does not look like a UK phone number. It should be 10 or 11 digits, like 07700 900123.';
  return e;
}

/**
 * The end of the road: three countdown markers, then a short form. Two fields are needed and three are optional.
 * It has every state a form can be in: empty, part-filled with a mistake, sending, sent, and failed.
 */
export default function Book() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState('');
  const [attempts, setAttempts] = useState(0);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);

  // A lesson or a way to pay chosen higher up the page arrives here already filled in.
  useEffect(() => {
    const onChoose = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, lessonType: value })); setPicked(value); setStatus((s) => (s === 'sent' ? 'idle' : s));
    };
    window.addEventListener('mm:choose', onChoose);
    return () => window.removeEventListener('mm:choose', onChoose);
  }, []);

  // After a failed attempt to send, the list of things to fix takes focus, so it is read out and easy to act on.
  useEffect(() => { if (attempts > 0) summary.current?.focus(); }, [attempts]);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };
  // Mistakes are pointed out when someone leaves a field, not while they are still typing in it.
  const blur = (key: 'name' | 'phone') => () => { const found = check(form)[key]; setErrors((x) => ({ ...x, [key]: found })); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = check(form);
    setErrors(found);
    if (Object.keys(found).length) { setAttempts((n) => n + 1); return; }
    setStatus('sending');
    try {
      const res = await fetch(BUSINESS.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      window.setTimeout(() => done.current?.focus(), 50);
    } catch {
      // Nothing typed is lost: the form stays as it was and the other ways to get in touch are offered.
      setStatus('failed');
    }
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof FormState, string][];

  return (
    <section id="book" className="section wrap">
      <div className="grid">
        <div className={styles.side}>
          <h2>Book a first lesson</h2>
          <ol className={`${styles.steps} put-up`}>
            <li><Countdown bars={3} /><p><b>Send this form</b>, or call or message me. It takes about a minute.</p></li>
            <li><Countdown bars={2} /><p><b>I get back to you</b> {BUSINESS.replyTime} for a quick chat about where you are starting from.</p></li>
            <li><Countdown bars={1} /><p><b>We book your first lesson</b> at a time that suits you. Have your provisional licence ready.</p></li>
          </ol>

          <dl className={styles.direct}>
            <div><dt>Call or text</dt><dd><a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></dd></div>
            <div><dt>WhatsApp</dt><dd><a className="link" href={BUSINESS.whatsappHref}>Message me on WhatsApp</a></dd></div>
            <div><dt>Email</dt><dd><a className="link" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></dd></div>
            <div><dt>Lesson hours</dt><dd>{BUSINESS.hours.map((h) => <span key={h.days}>{h.days}, {h.times}</span>)}</dd></div>
          </dl>
        </div>

        <div className={`sign sign--white ${styles.formSign}`}>
          {status === 'sent' ? (
            <div ref={done} className={styles.done} tabIndex={-1} role="status">
              <span className={styles.tick} aria-hidden="true" />
              <h3>Sent. Thank you, {form.name.trim().split(' ')[0]}.</h3>
              <p className="lead">I will call or text you on {form.phone.trim()} {BUSINESS.replyTime}, usually sooner.</p>
              <p>If you would rather not wait, call me on <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
              <button className="btn btn--plain" type="button" onClick={() => { setForm(EMPTY); setPicked(''); setStatus('idle'); }}>Send another enquiry</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate aria-busy={status === 'sending'}>
              {errorList.length > 0 && (
                <div ref={summary} className={styles.problems} role="alert" tabIndex={-1}>
                  <p><b>{errorList.length === 1 ? 'One thing to fix' : `${errorList.length} things to fix`}</b></p>
                  <ul>{errorList.map(([key, text]) => <li key={key}><a href={`#f-${key}`}>{text}</a></li>)}</ul>
                </div>
              )}
              {status === 'failed' && (
                <div className={styles.problems} role="alert">
                  <p><b>That did not send.</b> Your connection may have dropped, or the form service may be down. Nothing you typed is lost.</p>
                  <p>Try again, or call or text me on <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
                </div>
              )}

              <div className={`${styles.field} ${errors.name ? styles.bad : ''}`}>
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" name="name" type="text" autoComplete="name" value={form.name} onChange={set('name')} onBlur={blur('name')}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} required />
                {errors.name && <p id="e-name" className={styles.error}>{errors.name}</p>}
              </div>

              <div className={`${styles.field} ${errors.phone ? styles.bad : ''}`}>
                <label htmlFor="f-phone">Phone number</label>
                <p id="h-phone" className={styles.hint}>I will call or text you on this.</p>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} onBlur={blur('phone')}
                  aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone h-phone' : 'h-phone'} required />
                {errors.phone && <p id="e-phone" className={styles.error}>{errors.phone}</p>}
              </div>

              <div className={styles.pair}>
                <div className={styles.field}>
                  <label htmlFor="f-area">Your town <span>(optional)</span></label>
                  <select id="f-area" name="area" value={form.area} onChange={set('area')}>
                    <option value="">Choose one</option>
                    {TOWNS.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                    <option value="Somewhere else">Somewhere else</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="f-lessonType">What you are after <span>(optional)</span></label>
                  <select id="f-lessonType" name="lessonType" value={form.lessonType} onChange={set('lessonType')}>
                    <option value="">Choose one</option>
                    {CHOICES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {picked && form.lessonType === picked && <p className={styles.picked} role="status">Filled in from what you chose above.</p>}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="f-message">Anything I should know? <span>(optional)</span></label>
                <p id="h-message" className={styles.hint}>For example: never driven before, quite nervous, or test booked for June.</p>
                <textarea id="f-message" name="message" rows={3} value={form.message} onChange={set('message')} aria-describedby="h-message" />
              </div>

              <button className="btn btn--wide" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : status === 'failed' ? 'Try sending again' : 'Send my enquiry'}
                {status === 'sending' && <span className={styles.dots} aria-hidden="true" />}
              </button>
              <p className={`small ${styles.note}`}>I reply {BUSINESS.replyTime}. Your details are used to reply to you and for nothing else.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
