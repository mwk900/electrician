'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TopIslandNav from '@/components/TopIslandNav';

// ─── Colour constants (CSS variables — respond to theme toggle) ──────────────
const C = {
  bg:        'var(--bg)',
  surface:   'var(--surface)',
  border:    'var(--border)',
  frostSurface: 'var(--frost-surface)',
  frostBorder:  'var(--frost-border)',
  frostShadow:  'var(--frost-shadow)',
  amber:     'var(--amber)',
  amberDim:  'var(--amber-dim)',
  amberGlow: 'var(--amber-glow)',
  text:      'var(--text)',
  textDim:   'var(--text-dim)',
  textMuted: 'var(--text-muted)',
};
/// Amber button text: always dark — contrasts on both light (#D97706) and dark (#f59e0b) amber
const AMBER_BTN_TEXT = '#0a0c0f';

const F = {
  display: 'var(--font-display, "Barlow Condensed", sans-serif)',
  body:    'var(--font-body, "Inter", system-ui, sans-serif)',
  code:    'var(--font-code, "IBM Plex Mono", monospace)',
};

// ─── Data ────────────────────────────────────────────────────────────────────
const FAULTS = [
  {
    id: 'tripping',
    label: 'Tripping breaker',
    diagnosis: 'A circuit is overloaded or there\'s a fault on one of your appliances.',
    action: 'Unplug appliances one by one, then reset the breaker. If it trips immediately with nothing on, call us — there may be a wiring fault.',
  },
  {
    id: 'dead-socket',
    label: 'Dead socket',
    diagnosis: 'The socket is likely on a ring circuit protected by a tripped RCD, or there\'s a loose connection behind the face.',
    action: 'Check your consumer unit for any tripped RCD or breaker. If all looks fine, book a fault inspection — don\'t open the socket yourself.',
  },
  {
    id: 'flickering',
    label: 'Flickering lights',
    diagnosis: 'Loose terminal connections at the fitting or switch, a failing lamp, or occasionally a sign of an overloaded circuit.',
    action: 'Replace the bulb first. If it continues, switch off at the wall. Loose connections generate heat and can cause fires.',
  },
  {
    id: 'burning',
    label: 'Burning smell',
    diagnosis: 'Overheating wire insulation, a faulty socket, or an appliance fault. This should be treated as urgent.',
    action: 'Switch off the suspected circuit at the consumer unit immediately. Do not ignore this. Call us same day.',
  },
  {
    id: 'no-power',
    label: 'No power in room',
    diagnosis: 'A dedicated breaker for that zone has tripped, or there\'s a broken or damaged cable run.',
    action: 'Check your consumer unit for a tripped breaker or RCD. If nothing is tripped, there may be a cable fault — book an inspection.',
  },
  {
    id: 'buzzing',
    label: 'Buzzing sound',
    diagnosis: 'A buzzing from a fitting or switch typically means a loose connection or a failing dimmer module.',
    action: 'Stop using the switch or socket. Arcing from loose connections causes fires. Book a fault inspection.',
  },
];

// ─── Service SVG icons ────────────────────────────────────────────────────────
function SvcConsumerUnit() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="12" y1="8" x2="16" y2="8" />
      <line x1="12" y1="12" x2="16" y2="12" />
      <line x1="12" y1="16" x2="16" y2="16" />
      <circle cx="5" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function SvcRewire() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12 C4 7 8 4 12 4 C16 4 20 7 20 12" />
      <path d="M4 12 C4 17 8 20 12 20 C16 20 20 17 20 12" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}
function SvcEV() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M18 10h2a2 2 0 0 1 0 4h-2" />
      <line x1="6" y1="17" x2="6" y2="20" />
      <line x1="12" y1="17" x2="12" y2="20" />
      <path d="M9 7V4l3 3-3 3" />
    </svg>
  );
}
function SvcEICR() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 13 11 15 15 11" />
    </svg>
  );
}
function SvcSockets() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <line x1="10" y1="7" x2="10" y2="9" />
      <line x1="14" y1="7" x2="14" y2="9" />
    </svg>
  );
}
function SvcSmartHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M8.5 15 C8.5 13.07 10.07 11.5 12 11.5 C13.93 11.5 15.5 13.07 15.5 15" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function SvcFaultFind() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8v3l2 2" />
    </svg>
  );
}
function SvcCommercial() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="15" rx="1" />
      <path d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      <line x1="12" y1="12" x2="12" y2="17" />
      <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
    </svg>
  );
}

const SERVICES = [
  { icon: SvcConsumerUnit, label: 'Consumer unit upgrades' },
  { icon: SvcRewire,       label: 'Full & partial rewires' },
  { icon: SvcEV,           label: 'EV charger installation' },
  { icon: SvcEICR,         label: 'EICR certificates' },
  { icon: SvcSockets,      label: 'Sockets & lighting' },
  { icon: SvcSmartHome,    label: 'Smart home wiring' },
  { icon: SvcFaultFind,    label: 'Fault finding & diagnosis' },
  { icon: SvcCommercial,   label: 'Commercial fit-outs' },
];

const RECENT_WORK = [
  {
    title: 'Consumer Unit Upgrade',
    location: 'Beeston, NG9',
    tag: 'DOMESTIC',
    tagStyle: { background: 'var(--tag-dom)', color: 'var(--tag-dom-text)' },
    desc: 'Old fuse board replaced with a modern unit — all circuits RCD-protected.',
    img: '/images/recent-work/consumer-unit-upgrade.svg',
  },
  {
    title: 'EV Charger Install',
    location: 'West Bridgford, NG2',
    tag: 'EV',
    tagStyle: { background: 'var(--tag-ev)', color: 'var(--tag-ev-text)' },
    desc: 'Ohme home charger installed with dedicated circuit run from consumer unit.',
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kitchen Full Rewire',
    location: 'Arnold, NG5',
    tag: 'DOMESTIC',
    tagStyle: { background: 'var(--tag-dom)', color: 'var(--tag-dom-text)' },
    desc: 'New circuits for hob, oven, extractor and LED downlights. Tidy, fully certified.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
  },
];

const AREAS = [
  'Nottingham City', 'West Bridgford', 'Beeston', 'Long Eaton',
  'Hucknall', 'Arnold', 'Carlton', 'Gedling', 'Radcliffe on Trent', 'Ruddington',
];

const JOB_TYPES = [
  'Consumer unit / fuse board',
  'Full or partial rewire',
  'EV charger installation',
  'EICR inspection',
  'Sockets or lighting',
  'Smart home wiring',
  'Fault finding',
  'Other',
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function BoltIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L5 13H12L11 22L19 11H12L13 2Z" fill={C.amber} />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
        stroke={C.amber} strokeWidth="1.5" fill="none" />
      <path d="M9 12L11 14L15 10" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── PCB background ───────────────────────────────────────────────────────────
function PcbGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          radial-gradient(circle, var(--pcb-dot) 1px, transparent 1px),
          linear-gradient(var(--pcb-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--pcb-line) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        backgroundPosition: '20px 20px, 0 0, 0 0',
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="hero-section"
      style={{
      minHeight: 'clamp(700px, 82vh, 920px)', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'clamp(118px, 16vw, 148px) clamp(24px, 6vw, 80px) 80px',
      position: 'relative', overflow: 'hidden',
    }}
    >
      <PcbGrid />
      {/* Amber ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '30%', left: '55%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div
        style={{ position: 'relative', zIndex: 1, maxWidth: 1220, margin: '0 auto', width: '100%' }}
        className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)] lg:gap-8 lg:items-start"
      >
        <div
          className="hero-lead-card"
          style={{
          background: C.frostSurface,
          border: `1px solid ${C.frostBorder}`,
          borderRadius: 10,
          backdropFilter: 'blur(14px)',
          boxShadow: C.frostShadow,
          padding: 'clamp(20px, 3vw, 34px)',
        }}
        >
          <div style={{
            fontFamily: F.code, fontSize: '0.75rem', letterSpacing: '0.18em',
            color: C.amber, marginBottom: 28,
          }}>
            {'// NOTTINGHAM ELECTRICIANS'}
          </div>

          <h1
            className="hero-title"
            style={{
            fontFamily: F.display,
            fontSize: 'clamp(3.8rem, 10vw, 8rem)',
            lineHeight: 0.93, letterSpacing: '0.02em',
            color: C.text, margin: '0 0 28px',
          }}
          >
            CLEAN WIRING.<br />
            NO GUESSWORK.
          </h1>

          <p
            className="hero-subtitle"
            style={{
            fontFamily: F.body, fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: C.textDim, margin: '0 0 44px', lineHeight: 1.7, maxWidth: 460,
          }}
          >
            Fully insured, domestic &amp; commercial, OZEV-approved EV installers across Nottingham.
          </p>

          <div className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="#quote" className="hero-cta-primary" style={{
              fontFamily: F.body, fontWeight: 600, fontSize: '0.95rem',
              padding: '14px 30px', background: C.amber, color: AMBER_BTN_TEXT,
              borderRadius: 2, textDecoration: 'none', letterSpacing: '0.02em',
            }}>
              Get a rapid quote →
            </Link>
            <Link href="/projects" className="hero-cta-secondary" style={{
              fontFamily: F.body, fontWeight: 400, fontSize: '0.95rem',
              padding: '13px 30px', border: `1px solid ${C.border}`,
              color: C.textDim, borderRadius: 2, textDecoration: 'none',
              letterSpacing: '0.02em',
            }}>
              See our work
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'flex', gap: 40, marginTop: 64, flexWrap: 'wrap' }}>
            {[
              ['500+', 'jobs completed'],
              ['NICEIC', 'certified'],
              ['24hr', 'response time'],
            ].map(([stat, label]) => (
              <div key={stat} className="hero-stat-item">
                <div className="hero-stat-value" style={{ fontFamily: F.code, fontSize: '1.05rem', color: C.amber, letterSpacing: '0.05em' }}>{stat}</div>
                <div className="hero-stat-label" style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="fault-finder" style={{ marginTop: 18 }} className="lg:mt-2">
          <FaultFinderCard />
        </div>
      </div>

      {/* Wire start indicator */}
      <div className="hidden lg:flex" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1,
      }}>
        <div style={{
          fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.1em',
        }}>SCROLL</div>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.textMuted}, transparent)` }} />
      </div>
    </section>
  );
}

// ─── Circuit Row wrapper ──────────────────────────────────────────────────────
function CircuitRow({
  side,
  label,
  id,
  children,
}: {
  side: 'left' | 'right';
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  const isLeft = side === 'left';

  return (
    <div id={id} style={{ scrollMarginTop: 68, position: 'relative' }}>
      {/* ── Desktop ── */}
      <div
        data-reveal
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: '1fr 80px 1fr',
          position: 'relative',
          alignItems: 'start',
        }}
      >
        {/* Left content */}
        <div style={{ padding: '48px 40px 48px 0' }}>
          {isLeft ? children : null}
        </div>

        {/* Center: wire segment + node + traces */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 52, position: 'relative',
        }}>
          <div style={{
            fontFamily: F.code, fontSize: '0.58rem', color: C.textMuted,
            letterSpacing: '0.1em', marginBottom: 10, textAlign: 'center',
          }}>
            {label}
          </div>

          {/* Node dot */}
          <div
            className="circuit-node"
            style={{
              width: 12, height: 12, borderRadius: '50%', background: C.amber,
              border: `2px solid ${C.amberDim}`, position: 'relative', zIndex: 2, flexShrink: 0,
            }}
          >
            {/* Horizontal trace toward card */}
            <div
              className={`trace-line${!isLeft ? ' trace-right' : ''}`}
              style={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                width: 48, height: 1,
                background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, transparent, rgba(245,158,11,0.35))`,
                ...(isLeft ? { right: '100%' } : { left: '100%' }),
              }}
            />
          </div>
        </div>

        {/* Right content */}
        <div style={{ padding: '48px 0 48px 40px' }}>
          {!isLeft ? children : null}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div
        data-reveal
        className="lg:hidden"
        style={{
          padding: '32px 24px',
          borderLeft: `2px solid rgba(245,158,11,0.3)`,
          marginLeft: 24,
          position: 'relative',
        }}
      >
        {/* Mobile node */}
        <div style={{
          position: 'absolute', top: 36, left: -7,
          width: 12, height: 12, borderRadius: '50%', background: C.amber,
          border: `2px solid ${C.amberDim}`,
        }} />
        <div style={{
          fontFamily: F.code, fontSize: '0.6rem', color: C.amber,
          letterSpacing: '0.12em', marginBottom: 14,
        }}>
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Card shell ───────────────────────────────────────────────────────────────
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.frostSurface, border: `1px solid ${C.frostBorder}`,
      borderRadius: 3, padding: '28px 28px',
      backdropFilter: 'blur(14px)',
      boxShadow: C.frostShadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: F.code, fontSize: '0.65rem', letterSpacing: '0.18em',
      color: C.amber, textTransform: 'uppercase', marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: F.display, fontSize: '1.9rem', letterSpacing: '0.04em',
      color: C.text, margin: '0 0 14px', lineHeight: 1,
    }}>
      {children}
    </h2>
  );
}

// ─── 01 Fault Finder ─────────────────────────────────────────────────────────
function FaultFinderCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const fault = FAULTS.find((f) => f.id === selected);

  return (
    <Card>
      <CardLabel>Fault Finder</CardLabel>
      <CardHeading>What&apos;s the problem?</CardHeading>
      <div className="lg:hidden" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        border: `1px solid rgba(245,158,11,0.35)`,
        background: 'rgba(245,158,11,0.08)',
        color: C.amber,
        borderRadius: 999,
        fontFamily: F.code,
        fontSize: '0.64rem',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        margin: '0 0 12px',
      }}>
        <span aria-hidden="true">●</span>
        Interactive: tap a symptom
      </div>
      <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 20px', lineHeight: 1.65 }}>
        Select a symptom for a plain-English likely cause and next step.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {FAULTS.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(selected === f.id ? null : f.id)}
            style={{
              fontFamily: F.body, fontSize: '0.82rem', fontWeight: 400,
              padding: '7px 14px', borderRadius: 2, cursor: 'pointer',
              border: `1px solid ${selected === f.id ? C.amber : C.border}`,
              background: selected === f.id ? 'rgba(245,158,11,0.1)' : 'transparent',
              color: selected === f.id ? C.amber : C.textDim,
              transition: 'all 0.2s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      {fault && (
        <div className="anim-fade-up" style={{
          background: 'rgba(245,158,11,0.05)', border: `1px solid rgba(245,158,11,0.2)`,
          borderRadius: 2, padding: '16px 18px',
        }}>
          <div style={{ fontFamily: F.code, fontSize: '0.65rem', color: C.amber, letterSpacing: '0.12em', marginBottom: 8 }}>
            LIKELY CAUSE
          </div>
          <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.text, margin: '0 0 12px', lineHeight: 1.65 }}>
            {fault.diagnosis}
          </p>
          <div style={{ fontFamily: F.code, fontSize: '0.65rem', color: C.amber, letterSpacing: '0.12em', marginBottom: 8 }}>
            SUGGESTED ACTION
          </div>
          <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 14px', lineHeight: 1.65 }}>
            {fault.action}
          </p>
          <Link href="/contact" style={{
            fontFamily: F.body, fontSize: '0.82rem', fontWeight: 600,
            color: AMBER_BTN_TEXT, background: C.amber, padding: '7px 16px',
            borderRadius: 2, textDecoration: 'none', display: 'inline-block',
          }}>
            Book a fault inspection →
          </Link>
        </div>
      )}
    </Card>
  );
}

// ─── 02 Rapid Quote ───────────────────────────────────────────────────────────
function QuoteCard() {
  const [form, setForm] = useState({ name: '', contact: '', postcode: '', job: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    fontFamily: F.body, fontSize: '0.875rem', color: C.text,
    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: '10px 14px', width: '100%', outline: 'none',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card>
      <CardLabel>Rapid Quote</CardLabel>
      <CardHeading>Get a price fast</CardHeading>
      {submitted ? (
        <div style={{ padding: '24px 0' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(245,158,11,0.12)', border: `1px solid ${C.amber}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}>
            <span style={{ color: C.amber, fontSize: '1.2rem' }}>✓</span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: '1rem', fontWeight: 600, color: C.text, margin: '0 0 8px' }}>
            Request received
          </p>
          <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: 0, lineHeight: 1.65 }}>
            We&apos;ll be in touch within a few hours. For urgent jobs call{' '}
            <a href="tel:01159000000" style={{ color: C.amber }}>0115 900 0000</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>NAME</label>
              <input required style={inputStyle} placeholder="Your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>PHONE / EMAIL</label>
              <input required style={inputStyle} placeholder="07700 000000" value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>POSTCODE</label>
              <input required style={inputStyle} placeholder="NG1 1AA" value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
            </div>
            <div>
              <label style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>JOB TYPE</label>
              <select required style={{ ...inputStyle, appearance: 'none' }} value={form.job}
                onChange={(e) => setForm({ ...form, job: e.target.value })}>
                <option value="">Select…</option>
                {JOB_TYPES.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>MESSAGE (OPTIONAL)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} placeholder="Any details…"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button type="submit" style={{
            fontFamily: F.body, fontWeight: 600, fontSize: '0.9rem',
            padding: '12px 24px', background: C.amber, color: AMBER_BTN_TEXT,
            border: 'none', borderRadius: 2, cursor: 'pointer', letterSpacing: '0.02em',
            alignSelf: 'flex-start',
          }}>
            Send request →
          </button>
        </form>
      )}
    </Card>
  );
}

// ─── 03 Services ─────────────────────────────────────────────────────────────
function ServicesCard() {
  return (
    <Card>
      <CardLabel>Services</CardLabel>
      <CardHeading>What we do</CardHeading>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 0', borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ color: C.amber, flexShrink: 0, lineHeight: 0 }}><Icon /></span>
              <span style={{ fontFamily: F.body, fontSize: '0.9rem', color: C.text }}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <Link href="/services" style={{
        fontFamily: F.body, fontSize: '0.85rem', color: C.amber, textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        View all services →
      </Link>
    </Card>
  );
}

// ─── 04 Recent Work ───────────────────────────────────────────────────────────
function RecentWorkCard() {
  return (
    <Card>
      <CardLabel>Recent Work</CardLabel>
      <CardHeading>Fresh off the tools</CardHeading>
      <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 20px', lineHeight: 1.65 }}>
        A snapshot of recent jobs across Nottingham.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {RECENT_WORK.map((job) => (
          <div key={job.title} style={{
            border: `1px solid ${C.border}`, borderRadius: 2, overflow: 'hidden',
            background: C.bg,
          }}>
            {/* Project image */}
            <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
              <img
                src={job.img}
                alt={job.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <span style={{
                position: 'absolute', top: 8, right: 8,
                fontFamily: F.code, fontSize: '0.58rem', letterSpacing: '0.1em',
                padding: '3px 8px', borderRadius: 2, flexShrink: 0,
                ...job.tagStyle,
              }}>
                {job.tag}
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.875rem', color: C.text }}>{job.title}</div>
                <div style={{ fontFamily: F.code, fontSize: '0.68rem', color: C.amber, flexShrink: 0 }}>{job.location}</div>
              </div>
              <p style={{ fontFamily: F.body, fontSize: '0.82rem', color: C.textDim, margin: 0, lineHeight: 1.6 }}>{job.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/projects" style={{
        fontFamily: F.body, fontSize: '0.85rem', color: C.amber, textDecoration: 'none',
      }}>
        See all projects →
      </Link>
    </Card>
  );
}

// ─── 05 Safety & Compliance ───────────────────────────────────────────────────
function SafetyCard() {
  return (
    <Card>
      <CardLabel>Safety &amp; Compliance</CardLabel>
      <CardHeading>Done right, certified</CardHeading>
      <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 24px', lineHeight: 1.65 }}>
        Trust signals, not a sales pitch. Every job is completed to BS 7671 18th Edition wiring regulations.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { icon: <ShieldIcon />, title: 'NICEIC Approved', body: 'Independently assessed. You can verify our registration on the NICEIC website.' },
          { icon: '📋', title: 'Part P Certified', body: 'Notifiable electrical work is registered with Building Control automatically.' },
          { icon: '🛡️', title: 'Fully Insured', body: 'Public liability and employers\' liability insurance on every job.' },
          { icon: '📄', title: 'EICR Reports', body: 'Condition reports for landlords, buyers, and homeowners. Legally compliant.' },
        ].map((item) => (
          <div key={item.title} style={{
            display: 'flex', gap: 14, padding: '12px 14px',
            border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg,
          }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              {typeof item.icon === 'string'
                ? <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                : item.icon}
            </div>
            <div>
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.875rem', color: C.text, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontFamily: F.body, fontSize: '0.8rem', color: C.textDim, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── 06 EV & Smart Home ───────────────────────────────────────────────────────
function EVSmartCard() {
  return (
    <Card>
      <CardLabel>EV &amp; Smart Home</CardLabel>
      <CardHeading>Future-ready wiring</CardHeading>
      <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 24px', lineHeight: 1.65 }}>
        OZEV-approved installer. All major EV charger brands. Smart wiring from new-build to retrofit.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { icon: '🚗', title: 'EV Home Charger', body: 'Ohme, Zappi, Easee and more. OZEV-registered. Dedicated circuit, typically 3–4 hours.' },
          { icon: '💡', title: 'Smart Lighting', body: 'Lutron, Hue, bespoke wiring for automated scenes. New-build or retrofit.' },
          { icon: '🔌', title: 'Smart Sockets', body: 'Wired smart sockets integrated with your home hub — Matter, Zigbee or proprietary.' },
        ].map((item) => (
          <div key={item.title} style={{
            display: 'flex', gap: 14, padding: '14px 16px',
            border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg,
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
            <div>
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.875rem', color: C.text, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontFamily: F.body, fontSize: '0.8rem', color: C.textDim, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link href="/contact" style={{
          fontFamily: F.body, fontWeight: 600, fontSize: '0.875rem',
          padding: '10px 20px', background: C.amber, color: AMBER_BTN_TEXT,
          borderRadius: 2, textDecoration: 'none',
        }}>
          Get EV quote →
        </Link>
        <span style={{
          fontFamily: F.code, fontSize: '0.65rem', letterSpacing: '0.1em',
          padding: '10px 12px', border: `1px solid rgba(245,158,11,0.3)`,
          borderRadius: 2, color: C.amber, display: 'flex', alignItems: 'center',
        }}>
          OZEV APPROVED
        </span>
      </div>
    </Card>
  );
}

// ─── 07 Coverage ─────────────────────────────────────────────────────────────
function CoverageCard() {
  return (
    <Card>
      <CardLabel>Coverage</CardLabel>
      <CardHeading>Nottingham &amp; surrounds</CardHeading>
      <p style={{ fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, margin: '0 0 20px', lineHeight: 1.65 }}>
        Based in Nottingham city centre, covering the wider area up to 20 miles out.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {AREAS.map((area) => (
          <div key={area} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 0', borderBottom: `1px solid ${C.border}`,
            fontFamily: F.body, fontSize: '0.875rem', color: C.text,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: C.amber, flexShrink: 0, display: 'inline-block',
              boxShadow: `0 0 4px ${C.amberGlow}`,
            }} />
            {area}
          </div>
        ))}
      </div>
      <p style={{ fontFamily: F.body, fontSize: '0.8rem', color: C.textMuted, margin: '16px 0 0', lineHeight: 1.65 }}>
        Not listed?{' '}
        <Link href="/contact" style={{ color: C.amber, textDecoration: 'none' }}>Get in touch</Link>
        {' '}— we cover up to 20 miles from Nottingham city centre.
      </p>
    </Card>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: C.surface, borderTop: `1px solid ${C.border}`,
      padding: '60px clamp(24px, 6vw, 80px) 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <BoltIcon size={16} />
              <span style={{ fontFamily: F.display, fontSize: '1.3rem', letterSpacing: '0.06em', color: C.text }}>
                ARC &amp; LINE
              </span>
            </div>
            <div style={{ fontFamily: F.code, fontSize: '0.55rem', letterSpacing: '0.2em', color: C.textMuted, paddingLeft: 24 }}>
              ELECTRICAL
            </div>
            <p style={{ fontFamily: F.body, fontSize: '0.8rem', color: C.textDim, margin: '16px 0 0', maxWidth: 240, lineHeight: 1.65 }}>
              Safety-first electrics. Clear quotes. Clean finishes.
            </p>
          </div>

          {/* Phone */}
          <div>
            <div style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.15em', marginBottom: 10 }}>
              CALL US
            </div>
            <a href="tel:01159000000" style={{
              fontFamily: F.code, fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              color: C.amber, textDecoration: 'none', letterSpacing: '0.05em',
              display: 'block',
            }}>
              0115 900 0000
            </a>
            <a href="mailto:hello@arcandline.co.uk" style={{
              fontFamily: F.body, fontSize: '0.85rem', color: C.textDim,
              textDecoration: 'none', display: 'block', marginTop: 8,
            }}>
              hello@arcandline.co.uk
            </a>
            <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: C.textMuted, margin: '10px 0 0', lineHeight: 1.6 }}>
              Mon–Fri 7am–6pm · Sat 8am–2pm<br />Emergency callouts available
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: F.code, fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.15em', marginBottom: 12 }}>
              NAVIGATE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Services', '/services'], ['Projects', '/projects'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={label} href={href} style={{
                  fontFamily: F.body, fontSize: '0.875rem', color: C.textDim, textDecoration: 'none',
                }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          paddingTop: 24, borderTop: `1px solid ${C.border}`,
        }}>
          <span style={{ fontFamily: F.body, fontSize: '0.75rem', color: C.textMuted }}>
            © 2026 Arc &amp; Line Electrical Ltd. Nottingham.
          </span>
          <span style={{
            fontFamily: F.code, fontSize: '0.65rem', letterSpacing: '0.1em',
            color: C.textMuted,
          }}>
            NICEIC · PART P · OZEV
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal();

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
      <TopIslandNav mobileEmergencyPlacement="bottom" />
      <Hero />

      {/* Circuit sections */}
      <main style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px) 80px' }}>
        {/* Vertical wire — desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: '50%', width: 1, transform: 'translateX(-50%)',
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(245,158,11,0.18) 0px, rgba(245,158,11,0.18) 6px, transparent 6px, transparent 12px)`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        <CircuitRow side="right" label="01" id="quote"><QuoteCard /></CircuitRow>
        <CircuitRow side="left"  label="02">  <ServicesCard /></CircuitRow>
        <CircuitRow side="right" label="03">  <RecentWorkCard /></CircuitRow>
        <CircuitRow side="left"  label="04">  <SafetyCard /></CircuitRow>
        <CircuitRow side="right" label="05">  <EVSmartCard /></CircuitRow>
        <CircuitRow side="left"  label="06" id="coverage"><CoverageCard /></CircuitRow>
      </main>

      <Footer />

    </div>
  );
}
