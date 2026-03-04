import Link from 'next/link';
import BackgroundCircuit from '@/components/BackgroundCircuit';
import TopIslandNav from '@/components/TopIslandNav';

const groups = [
  {
    category: 'Domestic',
    icon: '🏠',
    services: [
      { title: 'Consumer Unit Upgrade', desc: 'Replace your old fuse board with a modern, RCD-protected consumer unit. Required for safety and often mortgage applications.', price: 'From £450' },
      { title: 'Full & Partial Rewires', desc: 'Complete rewires for older properties, or partial rewires for extensions, lofts and kitchen refits.', price: 'Quote on survey' },
      { title: 'New Sockets & Lighting', desc: 'Add USB sockets, relocate power points, or fit new lighting circuits throughout your home.', price: 'From £80/point' },
      { title: 'Outdoor Sockets & Security Lighting', desc: 'Weatherproof sockets for gardens, garages and outbuildings. PIR security lighting and LED floodlights.', price: 'From £150' },
      { title: 'Loft Conversion Wiring', desc: 'Full electrical fit-out for loft conversions — lighting, sockets, extractor and smoke detection.', price: 'Quote on survey' },
    ],
  },
  {
    category: 'Commercial',
    icon: '🏢',
    services: [
      { title: 'Office & Retail Fit-Outs', desc: 'New electrical installations for offices, shops and commercial spaces. Minimal disruption, clean finishes.', price: 'Quote on survey' },
      { title: 'Landlord Certificates (EICR)', desc: 'Legally required every 5 years. We test, report and carry out any required remedial works.', price: 'From £180' },
      { title: 'Emergency Lighting', desc: 'BS 5266-compliant emergency lighting design, installation and annual testing for commercial premises.', price: 'Quote on survey' },
      { title: 'Three-Phase Supplies', desc: 'Three-phase installation and upgrades for workshops, production units and larger commercial sites.', price: 'Quote on survey' },
    ],
  },
  {
    category: 'EV & Smart Home',
    icon: '⚡',
    services: [
      { title: 'EV Home Charger', desc: 'Supply and install of all major brands — Ohme, Zappi, Easee, Pod Point. OZEV-registered. Typically 3–4 hours.', price: 'From £650 installed' },
      { title: 'Smart Lighting Control', desc: 'Wiring for Lutron, Hue, Casambi and bespoke systems. Automate and scene-set your home lighting.', price: 'Quote on survey' },
      { title: 'Smart Sockets & Automation', desc: 'Retrofit or new-build wiring for smart plugs, hubs and whole-home automation systems.', price: 'From £120' },
      { title: 'Solar PV & Battery Diverters', desc: 'Electrical connection for solar systems and battery storage. Coordinate with your solar installer.', price: 'Quote on survey' },
    ],
  },
  {
    category: 'Safety & Certification',
    icon: '🛡️',
    services: [
      { title: 'EICR (Electrical Installation Condition Report)', desc: 'Visual and tested inspection of your property\'s wiring. Satisfactory or unsatisfactory report issued same day.', price: 'From £180' },
      { title: 'Remedial Works & Sign-Off', desc: 'Fix C1/C2 faults found in your EICR and issue an updated satisfactory certificate.', price: 'Quoted per fault' },
      { title: 'Fire Alarm Installation', desc: 'LD2 and LD1 grade domestic fire alarm systems. Interlinked, mains-wired with battery backup.', price: 'From £280' },
      { title: 'Carbon Monoxide Detection', desc: 'Mains-wired CO detectors fitted to building regulations requirements.', price: 'From £80' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundCircuit />
      <TopIslandNav />

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(112px, 16vw, 136px) 16px 100px', maxWidth: 900, margin: '0 auto' }} className="lg:px-8">
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Arc &amp; Line Electrical
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--border-strong)' }}>›</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Services
            </span>
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            What we do
          </h1>
          <p style={{ margin: '0 0 20px', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 520 }}>
            Domestic, commercial, EV and safety work across Nottingham. Clear pricing where possible — complex jobs quoted on survey.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="tel:01159000000" className="btn-primary">📞 0115 900 0000</a>
            <Link href="/contact" className="btn-outline">Request a quote</Link>
          </div>
        </div>

        {/* Service groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {groups.map(group => (
            <div key={group.category}>
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                }}>
                  {group.icon}
                </span>
                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                  {group.category}
                </h2>
                <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: 8 }} />
              </div>

              {/* Service cards */}
              <div style={{ display: 'grid', gap: 10 }} className="lg:grid-cols-2">
                {group.services.map(s => (
                  <div
                    key={s.title}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 9,
                      padding: '16px 18px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                        {s.title}
                      </h3>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)',
                        background: 'var(--tag-bg)', padding: '2px 8px', borderRadius: 4,
                        whiteSpace: 'nowrap', flexShrink: 0,
                      }}>
                        {s.price}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 40, padding: '24px', borderRadius: 10,
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          textAlign: 'center', boxShadow: 'var(--shadow)',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
            Not sure what you need?
          </p>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Call or message us — we&apos;ll talk you through it, no obligation.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:01159000000" className="btn-primary">📞 Call us</a>
            <Link href="/contact" className="btn-outline">Send a message</Link>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex gap-3 px-4 py-3"
        style={{ background: 'var(--nav-bg)', borderTop: '1px solid var(--border)', boxShadow: '0 -2px 12px rgba(0,0,0,0.1)' }}>
        <a href="tel:01159000000" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px 0' }}>📞 Call Now</a>
        <Link href="/contact" className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '12px 0' }}>Get Quote</Link>
      </div>
    </div>
  );
}
