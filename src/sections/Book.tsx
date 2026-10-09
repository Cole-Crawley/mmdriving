import { useEffect, useRef, useState } from 'react';
import { BUSINESS, LESSON_GROUPS, PAY_OPTIONS, TEST_DAY, TOWNS, whatsapp } from '../data/siteData';
import { Countdown } from '../components/Signs';
import { track } from '../hooks/useSigns';
import type { FormState } from '../types';
import styles from './Book.module.css';

const EMPTY: FormState = { name: '', phone: '', area: '', lessonType: '', message: '' };
const CHOICES = [...LESSON_GROUPS.flatMap((g) => g.lessons.map((l) => l.value)), ...PAY_OPTIONS.map((o) => o.value), TEST_DAY.value, 'Not sure yet'];
const DRAFT = 'mm-enquiry-draft';
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'offline';
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

/** What was typed survives a refresh or an accidental Back, until it is sent. It never leaves this browser tab. */
function loadDraft(): FormState {
  try { const saved = sessionStorage.getItem(DRAFT); return saved ? { ...EMPTY, ...JSON.parse(saved) } : EMPTY; } catch { return EMPTY; }
}

/**
 * When a reply can honestly be expected. Inside lesson hours it is "within a few hours"; late at night it is
 * the next morning, because promising a quick reply at midnight would be untrue.
 */
function replyPromise(): string {
  let hour = new Date().getHours();
  try { hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/London' }).format(new Date())); } catch { /* keep the local hour */ }
  const { open, close } = BUSINESS.lessonHours;
  if (hour >= close) return 'tomorrow morning';
  if (hour < open) return 'this morning';
  return BUSINESS.replyTime;
}

/**
 * The end of the road: three countdown markers, then a short form. Two fields are needed and three are optional.
 * It has every state a form can be in: empty, part-filled with a mistake, sending, sent, failed, and offline.
 */
export default function Book() {
  const [form, setForm] = useState<FormState>(loadDraft);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [trap, setTrap] = useState('');           // a field people never see; only automated spam fills it in
  const [reply] = useState(replyPromise);
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

  // Keep a draft as it is typed.
  useEffect(() => {
    try { if (status !== 'sent') sessionStorage.setItem(DRAFT, JSON.stringify(form)); } catch { /* private mode: carry on without a draft */ }
  }, [form, status]);

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
    if (typeof navigator !== 'undefined' && navigator.onLine === false) { setStatus('offline'); return; }
    setStatus('sending');
    try {
      // a filled trap means a robot: say thank you and send nothing
      if (!trap) {
        const res = await fetch(BUSINESS.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, _subject: `New enquiry from ${form.name.trim()} (MMDriving website)` }),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      setStatus('sent');
      track('Enquiry sent');
      try { sessionStorage.removeItem(DRAFT); } catch { /* nothing to clear */ }
      window.setTimeout(() => done.current?.focus(), 50);
    } catch {
      // Nothing typed is lost: the form stays as it was and the other ways to get in touch are offered.
      setStatus('failed');
    }
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof FormState, string][];
  const first = form.name.trim().split(' ')[0];

  return (
    <section id="book" className="section wrap">
      <div className="grid">
        <div className={styles.side}>
          <h2>Book a first lesson</h2>
          <ol className={`${styles.steps} put-up`}>
            <li><Countdown bars={3} /><p><b>Send this form</b>, or message or call me. It takes about a minute.</p></li>
            <li><Countdown bars={2} /><p><b>I get back to you</b> {reply} for a quick chat about where you are starting from.</p></li>
            <li><Countdown bars={1} /><p><b>We book your first lesson</b> at a time that suits you. Have your provisional licence ready.</p></li>
          </ol>

          {/* Most people under 35 would rather message than fill in a form or make a call, so that route is given equal weight. */}
          <div className={styles.rather}>
            <p><b>Rather just message?</b> That works too.</p>
            <div className={styles.ways}>
              <a className="btn btn--plain" href={whatsapp(form.lessonType)}>Message me on WhatsApp</a>
              <a className="btn btn--plain" href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</a>
            </div>
          </div>

          <dl className={styles.direct}>
            <div><dt>Email</dt><dd><a className="link" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></dd></div>
            <div><dt>Lesson hours</dt><dd>{BUSINESS.hours.map((h) => <span key={h.days}>{h.days}, {h.times}</span>)}</dd></div>
          </dl>
        </div>

        <div className={`sign sign--white ${styles.formSign}`}>
          {status === 'sent' ? (
            <div ref={done} className={styles.done} tabIndex={-1} role="status">
              <span className={styles.tick} aria-hidden="true" />
              <h3>Sent. Thank you{first ? `, ${first}` : ''}.</h3>
              <p className="lead">I will call or text you on {form.phone.trim()} {reply}.</p>
              <p>Nothing to pay and nothing to do until then. If you would rather not wait, call me on <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
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
                  <p><b>That did not send.</b> The form service may be having a problem. Nothing you typed is lost.</p>
                  <p>Try again, or <a className="link" href={whatsapp(form.lessonType)}>message me on WhatsApp</a>, or call <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
                </div>
              )}
              {status === 'offline' && (
                <div className={styles.problems} role="alert">
                  <p><b>You are offline, so this cannot send yet.</b> Nothing you typed is lost.</p>
                  <p>Reconnect and press Send again, or call <a className="link" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
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
                </div>
              </div>
              {picked && form.lessonType === picked && <p className={styles.picked} role="status">"{picked}" is filled in from what you chose above.</p>}

              <div className={styles.field}>
                <label htmlFor="f-message">Anything I should know? <span>(optional)</span></label>
                <p id="h-message" className={styles.hint}>For example: never driven before, quite nervous, or test booked for June.</p>
                <textarea id="f-message" name="message" rows={3} value={form.message} onChange={set('message')} aria-describedby="h-message" />
              </div>

              {/* the trap: hidden from people and from screen readers, left empty by every real visitor */}
              <div className={styles.trap} aria-hidden="true">
                <label htmlFor="f-website">Leave this empty</label>
                <input id="f-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </div>

              <button className="btn btn--wide" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : status === 'failed' || status === 'offline' ? 'Try sending again' : 'Send my enquiry'}
                {status === 'sending' && <span className={styles.dots} aria-hidden="true" />}
              </button>
              <p className={`small ${styles.note}`}><b>Nothing to pay now and no commitment.</b> I reply {reply}.</p>

              <details className={styles.privacy}>
                <summary>How your details are used</summary>
                <p>
                  Your name, phone number and message go to me, {BUSINESS.instructor} at MMDriving, so that I can reply about lessons.
                  They are sent through a form service called Formspree. I do not pass them to anyone else or use them for marketing.
                  If you do not go on to book, I delete them. To ask what I hold or to have it removed, call or email me.
                </p>
              </details>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
