'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileHeader() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const pathname = usePathname();

  function handleBrandClick(event: React.MouseEvent<HTMLAnchorElement>) {
    setEmergencyOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      <header
        className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4"
        style={{
          height: 56,
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--nav-border)',
          boxShadow: 'var(--shadow-sm)',
          gap: 10,
        }}
      >
        {/* Brand */}
        <Link href="/" onClick={handleBrandClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <span style={{ fontSize: '1.1rem' }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>Arc &amp; Line</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Link href="/services" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Services</Link>
          <Link href="/projects" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Projects</Link>
          <Link href="/#coverage" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Coverage</Link>

          <button
            type="button"
            onClick={() => setEmergencyOpen((v) => !v)}
            aria-expanded={emergencyOpen}
            aria-controls="mobile-emergency-panel"
            aria-label={emergencyOpen ? 'Close emergency contact panel' : 'Show emergency contact panel'}
            style={{
              padding: '6px 10px',
              fontSize: '0.78rem',
              borderRadius: 6,
              border: `1px solid ${emergencyOpen ? 'var(--accent)' : 'var(--border)'}`,
              background: emergencyOpen ? 'var(--accent)' : 'var(--bg-surface)',
              color: emergencyOpen ? 'var(--btn-primary-text)' : 'var(--accent)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              transition: 'background 180ms ease, color 180ms ease, border-color 180ms ease',
            }}
          >
            Emergency?
            <span aria-hidden="true" style={{ fontSize: '0.95rem', lineHeight: 1 }}>
              {emergencyOpen ? '×' : '+'}
            </span>
          </button>

        </div>
      </header>

      <div
        id="mobile-emergency-panel"
        className="lg:hidden fixed top-[56px] left-0 right-0 z-30"
        style={{
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          opacity: emergencyOpen ? 1 : 0,
          transform: emergencyOpen ? 'translateY(0)' : 'translateY(-8px)',
          visibility: emergencyOpen ? 'visible' : 'hidden',
          pointerEvents: emergencyOpen ? 'auto' : 'none',
          transition: `opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0ms linear ${emergencyOpen ? '0ms' : '220ms'}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 0' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            URGENT ELECTRICAL HELP
          </span>
          <button
            type="button"
            onClick={() => setEmergencyOpen(false)}
            aria-label="Close emergency contact panel"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              fontSize: '1rem',
            }}
          >
            ×
          </button>
        </div>
        <a
          href="tel:01159000000"
          style={{
            display: 'block',
            padding: '10px 20px 8px',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--accent)',
            textDecoration: 'none',
          }}
        >
          0115 900 0000
        </a>
        <a
          href="mailto:hello@arcandline.co.uk"
          style={{
            display: 'block',
            padding: '0 20px 14px',
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          hello@arcandline.co.uk
        </a>
      </div>
    </>
  );
}
