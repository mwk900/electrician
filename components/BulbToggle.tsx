'use client';

import { useEffect, useState } from 'react';
import { toggleTheme, getActiveTheme, type Theme } from '@/lib/theme';

const CORD_H = 80; // px — length of cord above the bulb
const MOBILE_CORD_H = 116; // px — keep bulb lower on mobile so it doesn't compete with nav content

export default function HangingBulb() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [swaying, setSwaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const applyMatch = () => setIsMobile(mql.matches);
    const syncFromBrowser = () => {
      setTheme(getActiveTheme());
      applyMatch();
    };
    const rafId = window.requestAnimationFrame(syncFromBrowser);

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', applyMatch);
      return () => {
        window.cancelAnimationFrame(rafId);
        mql.removeEventListener('change', applyMatch);
      };
    }

    mql.addListener(applyMatch);
    return () => {
      window.cancelAnimationFrame(rafId);
      mql.removeListener(applyMatch);
    };
  }, []);

  function handleClick() {
    const next = toggleTheme();
    setTheme(next);
    setSwaying(true);
    setTimeout(() => setSwaying(false), 1900);
  }

  const isOn = theme === 'light';
  const cordHeight = isMobile ? MOBILE_CORD_H : CORD_H;

  return (
    /*
     * Outer wrapper: fixed at top, pointer-events:none so the cord doesn't
     * block nav clicks. Only the bulb button gets pointer-events:auto.
     * transform-origin:top center makes the whole unit pivot from the
     * ceiling attachment point when .bulb-sway fires.
     */
    <div
      className={swaying ? 'bulb-sway' : ''}
      style={{
        position:        'fixed',
        top:             0,
        right:           28,
        zIndex:          40,
        transformOrigin: 'top center',
        pointerEvents:   'none',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
      }}
    >
      {/* ── Ceiling socket ── */}
      <div
        aria-hidden="true"
        style={{
          width:        8,
          height:       5,
          borderRadius: '0 0 4px 4px',
          background:   isOn ? 'rgba(160,120,40,0.7)' : 'rgba(60,70,90,0.6)',
          transition:   'background 0.6s ease',
          flexShrink:   0,
        }}
      />

      {/* ── Cord ── */}
      <div
        aria-hidden="true"
        style={{
          width:      2,
          height:     cordHeight,
          background: isOn
            ? 'linear-gradient(to bottom, rgba(160,120,40,0.65), rgba(160,120,40,0.2))'
            : 'linear-gradient(to bottom, rgba(70,82,105,0.55), rgba(40,50,70,0.15))',
          transition: 'background 0.6s ease',
          flexShrink: 0,
        }}
      />

      {/* ── Bulb (the only interactive element) ── */}
      <button
        onClick={handleClick}
        aria-label={isOn ? 'Turn lights off' : 'Turn lights on'}
        role="switch"
        aria-checked={isOn}
        style={{
          pointerEvents: 'auto',
          background:    'none',
          border:        'none',
          padding:       0,
          cursor:        'pointer',
          display:       'block',
          lineHeight:    0,
          transform:     'rotate(180deg)',
          /* Warm glow when lights are on */
          filter: isOn
            ? 'drop-shadow(0 0 7px rgba(253,230,138,0.9)) drop-shadow(0 0 22px rgba(245,158,11,0.45))'
            : 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))',
          transition: 'filter 0.55s ease, transform 0.55s ease',
        }}
      >
        <BulbSVG on={isOn} />
      </button>
    </div>
  );
}

/* ── Bulb SVG ─────────────────────────────────────────────── */
function BulbSVG({ on }: { on: boolean }) {
  const glass       = on ? '#FEF3C7' : '#1e2636';
  const glassStroke = on ? '#d97706' : '#374258';
  const filament    = on ? '#d97706' : '#28344a';
  const cap         = '#141c28';
  const capLine     = on ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.04)';

  return (
    <svg
      width="38"
      height="54"
      viewBox="0 0 38 54"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Halo glow (light-on only) */}
      {on && (
        <ellipse cx="19" cy="19" rx="17" ry="18" fill="#FDE68A" opacity="0.18" />
      )}

      {/* Glass globe */}
      <ellipse
        cx="19" cy="18.5" rx="13.5" ry="15"
        fill={glass}
        stroke={glassStroke}
        strokeWidth="1.5"
      />

      {/* Filament */}
      <path
        d="M13 22 Q15.5 15.5 19 18.5 Q22.5 15.5 25 22"
        stroke={filament}
        strokeWidth="1.35"
        fill="none"
        strokeLinecap="round"
      />

      {/* Neck taper */}
      <path
        d="M15 32 Q16 34.5 19 34.5 Q22 34.5 23 32"
        fill="none"
        stroke={glassStroke}
        strokeWidth="1.1"
        opacity="0.65"
      />

      {/* Cap ring 1 */}
      <rect x="13.5" y="35.5" width="11" height="4" rx="1" fill={cap} />
      <line x1="13.5" y1="37.5" x2="24.5" y2="37.5" stroke={capLine} strokeWidth="0.75" />

      {/* Cap ring 2 */}
      <rect x="14"   y="40"   width="10" height="3.5" rx="1" fill={cap} opacity="0.9" />
      <line x1="14"  y1="41.8" x2="24"  y2="41.8"  stroke={capLine} strokeWidth="0.75" />

      {/* Cap tip */}
      <rect x="15"   y="44"   width="8"  height="2.5" rx="0.8" fill={cap} opacity="0.7" />
    </svg>
  );
}
