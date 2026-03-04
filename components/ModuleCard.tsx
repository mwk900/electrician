import React from 'react';

interface ModuleCardProps {
  id?: string;
  icon: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function ModuleCard({ id, icon, title, badge, children, className = '', fullHeight }: ModuleCardProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
        ...(fullHeight ? { height: '100%' } : {}),
        overflow: 'hidden',
      }}
    >
      {/* Module header */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Icon chip */}
          <span style={{
            width: 34,
            height: 34,
            borderRadius: 7,
            background: 'var(--bg-raised)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
          }}>
            {icon}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                {title}
              </h2>
              {badge && (
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  background: 'var(--tag-bg)',
                  padding: '1px 6px',
                  borderRadius: 3,
                }}>
                  {badge}
                </span>
              )}
            </div>
          </div>
          {/* Circuit node indicator */}
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--indicator)',
            boxShadow: '0 0 6px var(--bulb-glow)',
            flexShrink: 0,
          }} />
        </div>

        {/* Circuit divider */}
        <div className="module-divider" style={{ margin: '12px 0 0' }}>
          <span className="node-dot" />
        </div>
      </div>

      {/* Module body */}
      <div style={{ padding: '12px 20px 18px', flex: 1 }}>
        {children}
      </div>
    </section>
  );
}
