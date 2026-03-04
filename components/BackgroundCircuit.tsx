'use client';

export default function BackgroundCircuit() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Circuit trace pattern — 120×120 tile */}
          <pattern id="cp" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Path A: left→node→down→right */}
            <line x1="0"   y1="35"  x2="38"  y2="35"  stroke="var(--circuit-line)" strokeWidth="1" />
            <circle cx="38" cy="35" r="2.5" fill="var(--circuit-node)" />
            <line x1="38"  y1="35"  x2="38"  y2="88"  stroke="var(--circuit-line)" strokeWidth="1" />
            <line x1="38"  y1="88"  x2="120" y2="88"  stroke="var(--circuit-line)" strokeWidth="1" />
            <circle cx="38" cy="88" r="2.5" fill="var(--circuit-node)" />

            {/* Path B: top→node→right */}
            <line x1="82"  y1="0"   x2="82"  y2="35"  stroke="var(--circuit-line)" strokeWidth="1" />
            <circle cx="82" cy="35" r="2.5" fill="var(--circuit-node)" />
            <line x1="82"  y1="35"  x2="120" y2="35"  stroke="var(--circuit-line)" strokeWidth="1" />

            {/* Path C: left edge continues at y=88 */}
            <line x1="0"   y1="88"  x2="22"  y2="88"  stroke="var(--circuit-line)" strokeWidth="1" />
            <circle cx="22" cy="88" r="2" fill="var(--circuit-node)" opacity="0.7" />
            <line x1="22"  y1="88"  x2="22"  y2="35"  stroke="var(--circuit-line)" strokeWidth="1" />
            <line x1="22"  y1="35"  x2="0"   y2="35"  stroke="var(--circuit-line)" strokeWidth="1" />

            {/* Path D: bottom drop from 82 */}
            <line x1="82"  y1="88"  x2="82"  y2="120" stroke="var(--circuit-line)" strokeWidth="1" />
            <circle cx="82" cy="88" r="1.8" fill="var(--circuit-node)" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cp)" />
      </svg>
    </div>
  );
}
