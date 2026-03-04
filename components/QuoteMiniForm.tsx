'use client';

import { useState } from 'react';
import ModuleCard from './ModuleCard';

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

type Fields = {
  name: string;
  contact: string;
  postcode: string;
  jobType: string;
  message: string;
};

export default function QuoteMiniForm() {
  const [fields, setFields] = useState<Fields>({ name: '', contact: '', postcode: '', jobType: '', message: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = 'Required';
    if (!fields.contact.trim()) e.contact = 'Required';
    if (!fields.postcode.trim()) e.postcode = 'Required';
    if (!fields.jobType) e.jobType = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function set(k: keyof Fields, v: string) {
    setFields(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
  }

  if (submitted) {
    return (
      <ModuleCard id="quote" icon="📋" title="Rapid Quote">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 180, gap: 10, textAlign: 'center' }}>
          <span style={{ fontSize: '2rem' }}>✅</span>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>
            Thanks — we&apos;ll reply within 24 hours.
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Or call us directly: <a href="tel:01159000000" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>0115 900 0000</a>
          </p>
        </div>
      </ModuleCard>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 11px',
    borderRadius: 6,
    border: '1px solid var(--border)',
    background: 'var(--bg-raised)',
    color: 'var(--text)',
    fontSize: '0.82rem',
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: 4,
    display: 'block',
  };

  const errStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    color: '#EF4444',
    marginTop: 3,
  };

  return (
    <ModuleCard id="quote" icon="📋" title="Rapid Quote">
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
        Clear quotes — usually within 24 hours.
      </p>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={fields.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your name"
              style={{ ...inputStyle, borderColor: errors.name ? '#EF4444' : 'var(--border)' }}
            />
            {errors.name && <span style={errStyle}>{errors.name}</span>}
          </div>
          <div>
            <label style={labelStyle}>Phone / Email</label>
            <input
              type="text"
              value={fields.contact}
              onChange={e => set('contact', e.target.value)}
              placeholder="07700 000000"
              style={{ ...inputStyle, borderColor: errors.contact ? '#EF4444' : 'var(--border)' }}
            />
            {errors.contact && <span style={errStyle}>{errors.contact}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={labelStyle}>Postcode</label>
            <input
              type="text"
              value={fields.postcode}
              onChange={e => set('postcode', e.target.value.toUpperCase())}
              placeholder="NG1 1AA"
              style={{ ...inputStyle, borderColor: errors.postcode ? '#EF4444' : 'var(--border)' }}
            />
            {errors.postcode && <span style={errStyle}>{errors.postcode}</span>}
          </div>
          <div>
            <label style={labelStyle}>Job Type</label>
            <select
              value={fields.jobType}
              onChange={e => set('jobType', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.jobType ? '#EF4444' : 'var(--border)', cursor: 'pointer' }}
            >
              <option value="">Select…</option>
              {jobTypes.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
            {errors.jobType && <span style={errStyle}>{errors.jobType}</span>}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Message (optional)</label>
          <textarea
            value={fields.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Brief description of the work…"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 68 }}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
          Send request →
        </button>
      </form>
    </ModuleCard>
  );
}
