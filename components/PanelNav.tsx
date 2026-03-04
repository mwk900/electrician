'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const circuits = [
  { id: '01', label: 'Fault Finder', href: '/#fault-finder' },
  { id: '02', label: 'Quote',        href: '/#quote' },
  { id: '03', label: 'Services',     href: '/#services' },
  { id: '04', label: 'Recent Work',  href: '/#recent-work' },
  { id: '05', label: 'Safety',       href: '/#safety' },
  { id: '06', label: 'EV & Smart',   href: '/#ev-smart' },
  { id: '07', label: 'Coverage',     href: '/#coverage' },
];

const pages = [
  { label: 'All Services', href: '/services' },
  { label: 'Projects',     href: '/projects' },
  { label: 'Contact',      href: '/contact' },
];

export default function PanelNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex flex-col fixed top-0 left-0 h-full z-50"
      style={{
        width: 220,
        background: 'var(--nav-bg)',
        borderRight: '1px solid var(--nav-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      aria-label="Panel navigation"
    >
      {/* Brand */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--nav-border)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.1rem' }}>⚡</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.2 }}>
              Arc &amp; Line
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Electrical
            </div>
          </div>
        </Link>
      </div>

      {/* Circuits label */}
      <div style={{ padding: '14px 18px 6px' }}>
        <span style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Circuits
        </span>
      </div>

      {/* Circuit items */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {circuits.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 18px',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            className="panel-item"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--panel-item-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Breaker number */}
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.04em',
              minWidth: 20,
            }}>
              {c.id}
            </span>
            {/* Indicator LED */}
            <span
              className="anim-pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--indicator)',
                boxShadow: '0 0 5px var(--bulb-glow)',
                flexShrink: 0,
              }}
            />
            {/* Label */}
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text)' }}>
              {c.label}
            </span>
          </Link>
        ))}

        {/* Pages divider */}
        <div style={{ padding: '14px 18px 6px', marginTop: 4, borderTop: '1px solid var(--border)' }}>
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Pages
          </span>
        </div>

        {pages.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                textDecoration: 'none',
                background: active ? 'var(--panel-item-hover)' : 'transparent',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => !active && (e.currentTarget.style.background = 'var(--panel-item-hover)')}
              onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>›</span>
              <span style={{ fontSize: '0.8rem', fontWeight: active ? 600 : 400, color: active ? 'var(--accent)' : 'var(--text)' }}>
                {p.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer status */}
      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid var(--nav-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-on)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Fully insured</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-on)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Safety-first</span>
        </div>
        <a
          href="tel:01159000000"
          style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', marginTop: 4 }}
        >
          0115 900 0000
        </a>
      </div>
    </nav>
  );
}
