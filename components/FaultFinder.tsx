'use client';

import { useState } from 'react';
import ModuleCard from './ModuleCard';

const symptoms = [
  {
    id: 'trip',
    label: 'Fuse keeps tripping',
    causes: [
      'Overloaded circuit — too many devices on one breaker',
      'Faulty appliance drawing excessive current',
      'Ageing or failing consumer unit',
    ],
    urgent: false,
    cta: 'Book a callout',
    ctaHref: '/contact',
  },
  {
    id: 'nopower',
    label: 'No power in one room',
    causes: [
      'Tripped MCB — check your consumer unit first',
      'Loose or failed connection at a socket or junction',
      'Partial circuit fault',
    ],
    urgent: false,
    cta: 'Book a callout',
    ctaHref: '/contact',
  },
  {
    id: 'flicker',
    label: 'Lights flickering',
    causes: [
      'Loose bulb fitting or lamp holder',
      'Voltage fluctuation from the supply',
      'Ageing or loose wiring connections',
    ],
    urgent: false,
    cta: 'Request a quote',
    ctaHref: '/contact',
  },
  {
    id: 'sparking',
    label: 'Sockets warm / sparking',
    causes: [
      'Overloaded socket — too many adapters in use',
      'Loose internal wiring behind the socket',
      'Worn or damaged socket — needs replacement',
    ],
    urgent: true,
    cta: 'Book a callout',
    ctaHref: '/contact',
  },
  {
    id: 'ev',
    label: 'Need an EV charger quote',
    causes: [
      'We install all major brands (Ohme, Zappi, Easee)',
      'OZEV-registered installer — grant-eligible installations',
      'Typically completed in 3–4 hours with zero disruption',
    ],
    urgent: false,
    cta: 'Request a quote',
    ctaHref: '/contact',
  },
  {
    id: 'eicr',
    label: 'EICR / safety certificate',
    causes: [
      'Legally required for landlords every 5 years',
      'Often needed for mortgage applications and house sales',
      'We issue certificates same day where possible',
    ],
    urgent: false,
    cta: 'Request a quote',
    ctaHref: '/contact',
  },
];

export default function FaultFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = symptoms.find(s => s.id === selected);

  return (
    <ModuleCard id="fault-finder" icon="🔍" title="Fault Finder" badge="Interactive">
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
        Select a symptom for likely causes and next steps.
      </p>

      {/* Symptom chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {symptoms.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(prev => prev === s.id ? null : s.id)}
            style={{
              padding: '7px 13px',
              borderRadius: 6,
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              border: '1px solid',
              borderColor: selected === s.id ? 'var(--accent)' : 'var(--border)',
              background: selected === s.id ? 'var(--tag-bg)' : 'var(--bg-raised)',
              color: selected === s.id ? 'var(--accent)' : 'var(--text)',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Diagnosis panel */}
      {active && (
        <div
          className="anim-fade-up"
          style={{
            borderRadius: 8,
            border: active.urgent ? '1px solid #EF4444' : '1px solid var(--border)',
            background: active.urgent ? 'rgba(239,68,68,0.05)' : 'var(--bg-raised)',
            padding: '14px 16px',
          }}
        >
          {active.urgent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF4444', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                ⚠ Safety concern — act promptly
              </span>
            </div>
          )}
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Possible causes
          </p>
          <ul style={{ margin: '0 0 14px', padding: '0 0 0 16px', listStyle: 'disc' }}>
            {active.causes.map((c, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text)', marginBottom: 4, lineHeight: 1.5 }}>
                {c}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <a href={active.ctaHref} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              {active.cta} →
            </a>
            <button
              onClick={() => setSelected(null)}
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </ModuleCard>
  );
}
