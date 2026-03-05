'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const C = {
  surface: 'var(--surface)',
  border: 'var(--border)',
  amber: 'var(--amber)',
  text: 'var(--text)',
  textDim: 'var(--text-dim)',
  textMuted: 'var(--text-muted)',
};

const F = {
  display: 'var(--font-display, "Barlow Condensed", sans-serif)',
  body: 'var(--font-body, "Inter", system-ui, sans-serif)',
  code: 'var(--font-code, "IBM Plex Mono", monospace)',
};

const AMBER_BTN_TEXT = '#0a0c0f';

type TopIslandNavProps = {
  mobileEmergencyPlacement?: 'inline' | 'bottom';
};

function BoltIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L5 13H12L11 22L19 11H12L13 2Z" fill={C.amber} />
    </svg>
  );
}

function EmergencyPanelContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{
          fontFamily: F.code,
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: C.textMuted,
        }}>
          URGENT ELECTRICAL HELP
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close emergency contact panel"
          style={{
            width: 24,
            height: 24,
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            background: 'transparent',
            color: C.textDim,
            cursor: 'pointer',
            lineHeight: 1,
            fontSize: '1rem',
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
      <a href="tel:01159000000" style={{
        fontFamily: F.code,
        fontSize: '1.2rem',
        color: C.amber,
        textDecoration: 'none',
        display: 'block',
        letterSpacing: '0.04em',
        marginTop: 8,
      }}>
        0115 900 0000
      </a>
      <a href="mailto:hello@arcandline.co.uk" style={{
        fontFamily: F.body,
        fontSize: '0.82rem',
        color: C.textDim,
        textDecoration: 'none',
        display: 'block',
        marginTop: 6,
      }}>
        hello@arcandline.co.uk
      </a>
      <p style={{
        fontFamily: F.body,
        fontSize: '0.78rem',
        color: C.textMuted,
        margin: '10px 0 0',
        lineHeight: 1.55,
      }}>
        Mon-Fri 7am-6pm, Sat 8am-2pm. For dangerous faults, call immediately.
      </p>
    </>
  );
}

export default function TopIslandNav({ mobileEmergencyPlacement = 'inline' }: TopIslandNavProps) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const pathname = usePathname();

  const desktopPanelRef = useRef<HTMLDivElement | null>(null);
  const desktopButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);

  const emergencyAtBottomOnMobile = mobileEmergencyPlacement === 'bottom';

  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    setEmergencyOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    if (!emergencyOpen) return undefined;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (desktopPanelRef.current?.contains(target)) return;
      if (desktopButtonRef.current?.contains(target)) return;
      if (mobilePanelRef.current?.contains(target)) return;
      if (mobileButtonRef.current?.contains(target)) return;
      setEmergencyOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setEmergencyOpen(false);
    }

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [emergencyOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: 'min(1160px, calc(100% - 20px))',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '8px 10px',
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            background: `linear-gradient(135deg, var(--nav-bg) 0%, ${C.surface} 100%)`,
            backdropFilter: 'blur(18px)',
            boxShadow: '0 10px 26px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: '6px 10px 6px 8px',
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              background: 'linear-gradient(150deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <BoltIcon size={16} />
              <span style={{
                fontFamily: F.display,
                fontSize: 'clamp(1.05rem, 5vw, 1.45rem)',
                letterSpacing: '0.06em',
                color: C.text,
                lineHeight: 1,
              }}>
                ARC &amp; LINE
              </span>
            </span>
            <span style={{
              fontFamily: F.code,
              fontSize: 'clamp(0.46rem, 1.6vw, 0.55rem)',
              letterSpacing: '0.2em',
              color: C.textMuted,
              paddingLeft: 23,
              lineHeight: 1,
            }}>
              ELECTRICAL
            </span>
          </Link>

          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 6,
              minWidth: 0,
            }}
          >
            {[
              { label: 'Services', href: '/services' },
              { label: 'Projects', href: '/projects' },
              { label: 'Coverage', href: '/#coverage' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: F.body,
                  fontSize: '0.78rem',
                  color: C.textDim,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  borderRadius: 8,
                  padding: '7px 9px',
                  border: `1px solid ${C.border}`,
                  background: 'linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div style={{ position: 'relative' }}>
              <button
                ref={desktopButtonRef}
                type="button"
                onClick={() => setEmergencyOpen((prev) => !prev)}
                aria-expanded={emergencyOpen}
                aria-controls="emergency-contact-details"
                aria-label={emergencyOpen ? 'Close emergency contact details' : 'Show emergency contact details'}
                className="hidden md:inline-flex"
                style={{
                  fontFamily: F.body,
                  fontWeight: 600,
                  fontSize: '0.83rem',
                  padding: '8px 12px',
                  border: emergencyOpen ? `1px solid ${C.amber}` : `1px solid ${C.border}`,
                  background: emergencyOpen
                    ? C.amber
                    : 'linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                  color: emergencyOpen ? AMBER_BTN_TEXT : C.amber,
                  borderRadius: 8,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'background 180ms ease, color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                }}
              >
                Emergency?
                <span aria-hidden="true" style={{ fontSize: '0.92rem', lineHeight: 1 }}>
                  {emergencyOpen ? '×' : '+'}
                </span>
              </button>

              <div
                id="emergency-contact-details"
                ref={desktopPanelRef}
                className="hidden md:block"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: 'min(320px, calc(100vw - 36px))',
                  background: `linear-gradient(140deg, ${C.surface} 0%, var(--nav-bg) 100%)`,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.22)',
                  backdropFilter: 'blur(16px)',
                  opacity: emergencyOpen ? 1 : 0,
                  transform: emergencyOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
                  visibility: emergencyOpen ? 'visible' : 'hidden',
                  pointerEvents: emergencyOpen ? 'auto' : 'none',
                  transition: `opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0ms linear ${emergencyOpen ? '0ms' : '220ms'}`,
                }}
              >
                <EmergencyPanelContent onClose={() => setEmergencyOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {emergencyAtBottomOnMobile && (
        <>
          <button
            ref={mobileButtonRef}
            type="button"
            onClick={() => setEmergencyOpen((prev) => !prev)}
            aria-expanded={emergencyOpen}
            aria-controls="mobile-emergency-contact-details"
            aria-label={emergencyOpen ? 'Close emergency contact details' : 'Show emergency contact details'}
            className="inline-flex md:hidden"
            style={{
              position: 'fixed',
              bottom: 14,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 56,
              fontFamily: F.body,
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '11px 16px',
              border: emergencyOpen ? `1px solid ${C.amber}` : `1px solid ${C.border}`,
              background: emergencyOpen
                ? C.amber
                : 'linear-gradient(150deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
              color: emergencyOpen ? AMBER_BTN_TEXT : C.amber,
              borderRadius: 10,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              alignItems: 'center',
              gap: 7,
              backdropFilter: 'blur(14px)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
              transition: 'background 180ms ease, color 180ms ease, border-color 180ms ease',
            }}
          >
            Emergency?
            <span aria-hidden="true" style={{ fontSize: '0.92rem', lineHeight: 1 }}>
              {emergencyOpen ? '×' : '+'}
            </span>
          </button>

          <div
            id="mobile-emergency-contact-details"
            ref={mobilePanelRef}
            className="md:hidden"
            style={{
              position: 'fixed',
              left: 10,
              right: 10,
              bottom: 66,
              zIndex: 55,
              background: `linear-gradient(140deg, ${C.surface} 0%, var(--nav-bg) 100%)`,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '14px 16px',
              boxShadow: '0 16px 28px rgba(0,0,0,0.28)',
              backdropFilter: 'blur(16px)',
              opacity: emergencyOpen ? 1 : 0,
              transform: emergencyOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
              visibility: emergencyOpen ? 'visible' : 'hidden',
              pointerEvents: emergencyOpen ? 'auto' : 'none',
              transition: `opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0ms linear ${emergencyOpen ? '0ms' : '220ms'}`,
            }}
          >
            <EmergencyPanelContent onClose={() => setEmergencyOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
