'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackgroundCircuit from '@/components/BackgroundCircuit';
import TopIslandNav from '@/components/TopIslandNav';

const jobTypes = [
  'Consumer unit upgrade',
  'EV charger installation',
  'Rewire (full or partial)',
  'New sockets / lighting',
  'EICR / safety certificate',
  'Outdoor sockets / lighting',
  'Smart home / automation',
  'Fault finding',
  'Other',
];

type Fields = { name: string; email: string; phone: string; postcode: string; jobType: string; message: string };

export default function ContactPage() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', phone: '', postcode: '', jobType: '', message: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = 'Please enter your name';
    if (!fields.email.trim() && !fields.phone.trim()) e.email = 'Please provide an email or phone number';
    if (!fields.jobType) e.jobType = 'Please select a job type';
    if (!fields.message.trim()) e.message = 'Please add a brief description';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function set(k: keyof Fields, v: string) {
    setFields(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: undefined }));
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 13px', borderRadius: 7,
    border: '1px solid var(--border)', background: 'var(--bg-raised)',
    color: 'var(--text)', fontSize: '0.88rem', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.15s',
  };
  const label = (text: string) => (
    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 5 }}>
      {text}
    </label>
  );
  const err = (msg?: string) => msg ? <span style={{ display: 'block', fontSize: '0.72rem', color: '#EF4444', marginTop: 4 }}>{msg}</span> : null;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundCircuit />
      <TopIslandNav />

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(112px, 16vw, 136px) 16px 100px', maxWidth: 720, margin: '0 auto' }} className="lg:px-8">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Arc &amp; Line Electrical</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--border-strong)' }}>›</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>Contact</span>
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Get in touch
          </h1>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Most quotes turned around within 24 hours. Call for urgent or emergency jobs.
          </p>
        </div>

        {/* Direct CTAs */}
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }} className="sm:grid-cols-3">
          {[
            { icon: '📞', label: 'Call direct', value: '0115 900 0000', href: 'tel:01159000000', primary: true },
            { icon: '✉️', label: 'Email', value: 'hello@arcandline.co.uk', href: 'mailto:hello@arcandline.co.uk', primary: false },
            { icon: '💬', label: 'WhatsApp', value: 'Message us', href: 'https://wa.me/447700000000', primary: false },
          ].map(cta => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.href.startsWith('https') ? '_blank' : undefined}
              rel={cta.href.startsWith('https') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', borderRadius: 9,
                background: cta.primary ? 'var(--btn-primary)' : 'var(--bg-surface)',
                border: `1px solid ${cta.primary ? 'transparent' : 'var(--border)'}`,
                textDecoration: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'opacity 0.15s',
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{cta.icon}</span>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: cta.primary ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                  {cta.label}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: cta.primary ? 'var(--btn-primary-text)' : 'var(--text)', marginTop: 1 }}>
                  {cta.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Or send a message
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {submitted ? (
          /* Success state */
          <div style={{
            padding: '40px 24px', textAlign: 'center', borderRadius: 12,
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
              Message sent — thanks!
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              We aim to respond within 24 hours, often sooner. For urgent jobs, call us directly.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:01159000000" className="btn-primary">📞 0115 900 0000</a>
              <Link href="/" className="btn-outline">← Back home</Link>
            </div>
          </div>
        ) : (
          /* Contact form */
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '24px',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'grid', gap: 16 }} className="sm:grid-cols-2">
              <div>
                {label('Your name *')}
                <input type="text" value={fields.name} onChange={e => set('name', e.target.value)}
                  placeholder="Jane Smith"
                  style={{ ...inputStyle, borderColor: errors.name ? '#EF4444' : 'var(--border)' }} />
                {err(errors.name)}
              </div>
              <div>
                {label('Postcode')}
                <input type="text" value={fields.postcode} onChange={e => set('postcode', e.target.value.toUpperCase())}
                  placeholder="NG1 1AA"
                  style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 16 }} className="sm:grid-cols-2">
              <div>
                {label('Email *')}
                <input type="email" value={fields.email} onChange={e => set('email', e.target.value)}
                  placeholder="jane@example.com"
                  style={{ ...inputStyle, borderColor: errors.email ? '#EF4444' : 'var(--border)' }} />
                {err(errors.email)}
              </div>
              <div>
                {label('Phone')}
                <input type="tel" value={fields.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="07700 000000"
                  style={inputStyle} />
              </div>
            </div>

            <div>
              {label('Job type *')}
              <select value={fields.jobType} onChange={e => set('jobType', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.jobType ? '#EF4444' : 'var(--border)' }}>
                <option value="">Select a job type…</option>
                {jobTypes.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
              {err(errors.jobType)}
            </div>

            <div>
              {label('Tell us about the job *')}
              <textarea value={fields.message} onChange={e => set('message', e.target.value)}
                placeholder="Describe the work — property type, any access notes, urgency…"
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 110, borderColor: errors.message ? '#EF4444' : 'var(--border)' }} />
              {err(errors.message)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
                Send message →
              </button>
              <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)' }}>
                No obligation. Usually quoted within 24 hrs.
              </span>
            </div>
          </form>
        )}

        {/* Info strip */}
        <div style={{ marginTop: 28, display: 'grid', gap: 10 }} className="sm:grid-cols-3">
          {[
            { icon: '🕐', title: 'Response time', body: 'Mon–Fri same day, Sat within 4 hrs' },
            { icon: '📍', title: 'Coverage', body: 'Nottingham + up to 20 miles' },
            { icon: '🛡️', title: 'Fully insured', body: 'Public liability & employer\'s insurance' },
          ].map(info => (
            <div key={info.title} style={{ padding: '14px 16px', borderRadius: 9, background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{info.icon}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{info.title}</div>
              <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{info.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
