'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  budgets,
  projectTypes,
  emptyBrief,
  validateBrief,
  type Brief,
} from '@/lib/inquiry';
export default function ContactForm() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [errors, setErrors] = useState<Partial<Record<keyof Brief, string>>>(
    {},
  );
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const attemptRef = useRef<{ payload: string; key: string } | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setBrief((b) => ({
      ...b,
      service: projectTypes.includes(q.get('service') || '')
        ? q.get('service')!
        : '',
      budget: budgets.includes(q.get('budget') || '') ? q.get('budget')! : '',
    }));
  }, []);
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);
  function update(key: keyof Brief, value: string) {
    setBrief((b) => ({ ...b, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }
  function focusError(next: Partial<Record<keyof Brief, string>>) {
    const key = Object.keys(next)[0];
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>(
          `[id="${key}"],[data-field="${key}"] [role="radio"]`,
        )
        ?.focus();
    });
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;
    const result = validateBrief(brief);
    setErrors(result.errors);
    if (Object.keys(result.errors).length) {
      setMessage('Please check the highlighted fields.');
      setStatus('idle');
      focusError(result.errors);
      return;
    }
    submittingRef.current = true;
    setStatus('sending');
    setMessage('');
    const payload = JSON.stringify(result.data);
    if (attemptRef.current?.payload !== payload)
      attemptRef.current = { payload, key: crypto.randomUUID() };
    try {
      const r = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': attemptRef.current.key,
        },
        body: payload,
        signal: AbortSignal.timeout(30000),
      });
      const body = (await r.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Partial<Record<keyof Brief, string>>;
      };
      if (!r.ok) {
        if (r.status === 400 && body.errors) {
          setErrors(body.errors);
          focusError(body.errors);
          setMessage(body.message || 'Please check the highlighted fields.');
        } else {
          setMessage(
            body.message ||
              'We couldn’t send your brief right now. Your details are still here. Please try again shortly, or save a copy below.',
          );
        }
        setStatus('error');
        return;
      }
      if (body.ok !== true) throw new Error('Unable to send');
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage(
        'We couldn’t confirm your submission. Your details are still here. Please try again; your brief won’t be sent twice.',
      );
    } finally {
      submittingRef.current = false;
    }
  }
  function download() {
    const text = Object.entries(brief)
      .filter(([k]) => k !== 'website')
      .map(([k, v]) => `${k.toUpperCase()}\n${v || 'Not provided'}`)
      .join('\n\n');
    const url = URL.createObjectURL(
      new Blob(['ELVYN — PROJECT BRIEF\n\n' + text], {
        type: 'text/plain;charset=utf-8',
      }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elvyn-project-brief.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function input(
    key: keyof Brief,
    label: string,
    type = 'text',
    autoComplete?: string,
    placeholder?: string,
  ) {
    return (
      <div className="form-field">
        <label htmlFor={key}>
          {label}
          <span aria-hidden="true"> *</span>
        </label>
        <input
          id={key}
          name={key}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={brief[key]}
          onChange={(e) => update(key, e.target.value)}
          maxLength={key === 'email' ? 254 : 150}
          required
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
        {errors[key] && (
          <p id={`${key}-error`} className="field-error">
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  function choices(
    key: 'service' | 'budget',
    label: string,
    options: string[],
  ) {
    return (
      <fieldset data-field={key}>
        <legend>
          {label} <span aria-hidden="true">*</span>
        </legend>
        <RadioGroup
          value={brief[key]}
          onValueChange={(v) => update(key, String(v))}
          className="choice-group"
          aria-label={label}
          aria-required="true"
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        >
          {options.map((option, i) => (
            <label
              key={option}
              className={`choice ${brief[key] === option ? 'selected' : ''}`}
            >
              <RadioGroupItem value={option} id={`${key}-${i}`} aria-label={option} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        {errors[key] && (
          <p id={`${key}-error`} className="field-error">
            {errors[key]}
          </p>
        )}
      </fieldset>
    );
  }
  if (status === 'success')
    return (
      <div className="form-success" tabIndex={-1} ref={successRef}>
        <span className="success-symbol" aria-hidden="true">
          ↗
        </span>
        <div className="meta">PROJECT BRIEF / RECEIVED</div>
        <h2>
          GOOD THINGS
          <br />
          START HERE.
        </h2>
        <p>
          Thanks, {brief.name.split(' ')[0]}. Your brief is with us. We’ll
          review your project and get in touch at <strong>{brief.email}</strong>{' '}
          to talk through the next steps.
        </p>
        <Link className="link-button" href="/">
          Back to the studio <span>↗</span>
        </Link>
      </div>
    );
  return (
    <form ref={formRef} className="project-form" onSubmit={submit} noValidate>
      <p className="form-intro">
        A little context goes a long way. <span>* Required fields</span>
      </p>
      <div className="form-section">
        <div className="form-section-label meta">01 / ABOUT YOU</div>
        <div className="form-grid">
          {input('name', 'Name', 'text', 'name', 'Your name')}
          {input(
            'business',
            'Business / Company',
            'text',
            'organization',
            'Your business',
          )}
          {input('email', 'Email', 'email', 'email', 'you@company.com')}
          {input(
            'whatsapp',
            'WhatsApp',
            'tel',
            'tel',
            'Include your country code',
          )}
        </div>
      </div>
      <div className="form-section">
        <div className="form-section-label meta">02 / YOUR PROJECT</div>
        {choices('service', 'What do you need?', projectTypes)}
      </div>
      <div className="form-section">
        <div className="form-section-label meta">03 / BUDGET</div>
        {choices('budget', 'What’s your creation budget?', budgets)}
        <p className="field-hint">
          Maintenance is separate. We’ll agree the full scope and costs before
          starting.
        </p>
      </div>
      <div className="form-section">
        <div className="form-section-label meta">04 / THE DETAILS</div>
        <div className="form-field">
          <label htmlFor="details">
            What are you looking to build, and what should the website
            accomplish? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            maxLength={5000}
            minLength={20}
            value={brief.details}
            onChange={(e) => update('details', e.target.value)}
            placeholder="A little about your business, your audience, and what you have in mind."
            required
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? 'details-error' : undefined}
          />
          {errors.details && (
            <p id="details-error" className="field-error">
              {errors.details}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="references">
            Reference URLs <span className="optional">— Optional</span>
          </label>
          <textarea
            id="references"
            name="references"
            rows={2}
            maxLength={2000}
            value={brief.references}
            onChange={(e) => update('references', e.target.value)}
            placeholder="https:// — Share websites you like, one per line."
            aria-invalid={!!errors.references}
            aria-describedby={
              errors.references ? 'references-error' : undefined
            }
          />
          {errors.references && (
            <p id="references-error" className="field-error">
              {errors.references}
            </p>
          )}
        </div>
        {input(
          'timeline',
          'Preferred launch date / timeframe',
          'text',
          undefined,
          'A date, a month, or simply “Flexible”',
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={brief.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {message && (
          <p className="form-message" role="alert">
            {message}
          </p>
        )}
      </div>
      <button
        className="link-button submit-button"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending your brief…' : 'Send project brief'}
        <span aria-hidden="true">↗</span>
      </button>
      {status === 'error' && (
        <button type="button" className="download-brief" onClick={download}>
          Save a copy of my brief ↓
        </button>
      )}
      <p className="form-note">
        We’ll use these details to respond to your enquiry. No mailing lists. No
        spam.
      </p>
    </form>
  );
}
