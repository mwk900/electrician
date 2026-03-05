import Link from 'next/link';
import Image from 'next/image';
import BackgroundCircuit from '@/components/BackgroundCircuit';
import TopIslandNav from '@/components/TopIslandNav';

const projects = [
  {
    title: 'Consumer Unit Upgrade',
    location: 'Beeston, Nottingham',
    duration: '4 hrs',
    tags: ['Domestic', 'Safety'],
    image: '/images/recent-work/consumer-unit-upgrade.svg',
    imageAlt: 'Modern consumer unit installation',
    before: 'Ageing 1980s fuse board with ceramic fuses — no RCD protection, no room for additional circuits.',
    after: 'New 18-way Hager consumer unit, all circuits RCD-protected, 10-year guarantee, satisfactory EICR issued same day.',
    highlights: ['All circuits RCD-protected', 'Dual RCD split load', 'Certificate issued same day'],
  },
  {
    title: 'EV Charger Installation',
    location: 'West Bridgford, Nottingham',
    duration: '3 hrs',
    tags: ['EV', 'Smart'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'EV home charger installed on garage wall',
    before: 'Client purchased a Tesla Model 3 and relied on a 3-pin plug charger — slow and inconvenient.',
    after: 'Ohme Home Pro 7.4kW smart charger installed on the garage wall, dedicated 6mm² circuit from consumer unit. Charge speed increased from 6 hrs to under 2 hrs for full charge.',
    highlights: ['Ohme Home Pro 7.4kW', 'Dedicated circuit from CU', 'OZEV grant applied'],
  },
  {
    title: 'Kitchen Full Rewire',
    location: 'Arnold, Nottingham',
    duration: '2 days',
    tags: ['Domestic'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Modern kitchen with new electrical fit-out',
    before: 'Kitchen extension required a complete rewire — no existing circuits were suitable for new appliances.',
    after: 'New dedicated circuit for induction hob, double oven, extractor, dishwasher and fridge-freezer. Ten LED downlights on a dimmer circuit. All first-fix concealed in new stud walls.',
    highlights: ['7 dedicated circuits', 'LED downlights on dimmer', 'All concealed first-fix'],
  },
  {
    title: 'Outdoor Lighting & Sockets',
    location: 'Radcliffe on Trent',
    duration: '6 hrs',
    tags: ['Domestic', 'Outdoor'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Garden with outdoor lighting at dusk',
    before: 'No outdoor power — client had to run extension leads to garden.',
    after: 'Two weatherproof IP65 double sockets in the garden, PIR security floodlight on the driveway, and six low-voltage garden path lights on a timer circuit.',
    highlights: ['IP65 weatherproof sockets', 'PIR security floodlight', 'Timer-controlled path lights'],
  },
  {
    title: 'EICR + Remedial Works',
    location: 'Hucknall, Nottingham',
    duration: '1 day',
    tags: ['Safety', 'Commercial'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Residential flat electrical inspection',
    before: 'Landlord EICR due before new tenancy. Previous report had several C2 observations outstanding.',
    after: 'Full EICR completed. C2 faults rectified: broken socket outlets replaced, kitchen bonding added, consumer unit dated label updated. Satisfactory certificate issued same day — tenancy able to proceed.',
    highlights: ['Full EICR completed', 'All C2 faults rectified', 'Certificate issued same day'],
  },
  {
    title: 'Smart Lighting Fit-Out',
    location: 'Gedling, Nottingham',
    duration: '1.5 days',
    tags: ['Smart', 'Domestic'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Smart home living room lighting',
    before: 'New-build home with standard lighting — no smart capability.',
    after: 'Lutron Caseta system installed across 12 circuits. Wall dimmers and keypads fitted in living areas. Compatible with HomeKit and Alexa. Scenes set for morning, day and evening.',
    highlights: ['Lutron Caseta across 12 circuits', 'HomeKit & Alexa compatible', 'Pre-programmed scenes'],
  },
];

export default function ProjectsPage() {
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
              Projects
            </span>
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Recent work
          </h1>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 520 }}>
            Real jobs, real results. Every project completed to Part P and BS 7671 standards, with certificates issued where required.
          </p>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((p, i) => (
            <article
              key={p.title}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="lg:flex">
                {/* Image */}
                <div style={{ position: 'relative', flexShrink: 0 }} className="lg:w-64">
                  <div style={{ position: 'relative', height: 200 }} className="lg:h-full">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 1024px) 100vw, 256px"
                      priority={i === 0}
                    />
                    {/* Duration badge */}
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(0,0,0,0.7)', color: '#fff',
                      fontSize: '0.72rem', fontWeight: 700,
                      padding: '4px 9px', borderRadius: 5,
                      backdropFilter: 'blur(4px)',
                    }}>
                      ⏱ {p.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px', flex: 1, minWidth: 0 }}>
                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>

                  <h2 style={{ margin: '0 0 2px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                    {p.title}
                  </h2>
                  <p style={{ margin: '0 0 14px', fontSize: '0.77rem', color: 'var(--text-muted)' }}>
                    📍 {p.location}
                  </p>

                  {/* Before / After */}
                  <div style={{ display: 'grid', gap: 10, marginBottom: 14 }} className="lg:grid-cols-2">
                    <div style={{ padding: '10px 12px', borderRadius: 7, background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '0.67rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>Before</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.5 }}>{p.before}</p>
                    </div>
                    <div style={{ padding: '10px 12px', borderRadius: 7, background: 'var(--bg-raised)', border: '1px solid var(--accent)' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '0.67rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--accent)' }}>After</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.5 }}>{p.after}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.highlights.map(h => (
                      <span key={h} style={{
                        fontSize: '0.73rem', padding: '3px 9px',
                        borderRadius: 5, border: '1px solid var(--border)',
                        color: 'var(--text-muted)', background: 'var(--bg-raised)',
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <span style={{ color: 'var(--status-on)' }}>✓</span> {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 40, padding: '24px', borderRadius: 10,
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          textAlign: 'center', boxShadow: 'var(--shadow)',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
            Ready to get started?
          </p>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Most jobs quoted within 24 hours. We aim for clear, honest pricing upfront.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Get a free quote →</Link>
            <a href="tel:01159000000" className="btn-outline">📞 Call us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
