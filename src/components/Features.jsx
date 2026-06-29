import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function MiniChart() {
  return (
    <svg viewBox="0 0 160 72" style={{ width: '100%', height: 72, marginTop: 16 }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,58 C14,52 30,44 50,34 C70,24 94,14 118,9 C136,5 148,4 160,3"
        fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M0,58 C14,52 30,44 50,34 C70,24 94,14 118,9 C136,5 148,4 160,3 L160,72 L0,72Z"
        fill="url(#cg)"/>
      <text x="1" y="70" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="'Space Mono',monospace">0 km</text>
      <text x="118" y="70" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="'Space Mono',monospace">42 km</text>
    </svg>
  );
}

function FoamOrbs() {
  return (
    <div style={{ position: 'absolute', bottom: -40, right: -40, pointerEvents: 'none' }}>
      <div style={{ width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(26,79,255,0.18)', background: 'rgba(26,79,255,0.06)' }}/>
      <div style={{ position: 'absolute', bottom: 40, right: 40, width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(61,26,120,0.25)', background: 'rgba(61,26,120,0.1)' }}/>
      <div style={{ position: 'absolute', bottom: 80, right: 80, width: 55, height: 55, borderRadius: '50%', background: 'rgba(26,79,255,0.14)' }}/>
    </div>
  );
}

const CARDS = [
  {
    id: 'cushion', col: '1/6', row: '1/3',
    bg: '#06061e', color: '#f0f0ff',
    label: 'Cushioning', title: 'Orbit Foam 3.0', desc: 'Triple-density foam compounds engineered to absorb 94% of impact energy at any pace. Your joints will notice the difference after kilometre one.',
    extra: 'orbs',
  },
  {
    id: 'breathe', col: '6/10', row: '1/2',
    bg: '#ffffff', color: '#06061e',
    label: 'Materials', title: '360° Breathable Mesh', desc: 'Spacer mesh woven with thermoplastic yarns creates constant airflow, keeping the microclimate inside the shoe 8°C cooler.',
  },
  {
    id: 'weight', col: '10/13', row: '1/2',
    bg: '#ff6535', color: '#ffffff',
    label: 'Flyweight Upper', title: '6.2 oz', desc: 'Less shoe. More speed.',
    big: true,
  },
  {
    id: 'grip', col: '6/10', row: '2/3',
    bg: '#f0f0f8', color: '#06061e',
    label: 'Traction', title: 'All-Surface Grip', desc: 'Hexagonal lug geometry adapts ground contact from studio floors to cobblestone streets.',
  },
  {
    id: 'chart', col: '10/13', row: '2/4',
    bg: '#1a4fff', color: '#ffffff',
    label: 'Impact Data', title: 'Absorption over distance',
    chart: true,
  },
  {
    id: 'eco', col: '1/5', row: '3/4',
    bg: '#f0eeff', color: '#2d1060',
    label: 'Sustainability', title: 'Recycled Build', desc: '72% recycled material by weight. Every pair plants one tree through our partner reforestation network.',
  },
  {
    id: 'craft', col: '5/10', row: '3/4',
    bg: '#fafafa', color: '#06061e',
    label: 'Community', title: 'Built for Makers', desc: 'Trusted by 14,000+ designers, developers, and creative professionals. Comfort that keeps pace with the way you actually work.',
    makers: true,
  },
];

export default function Features() {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = gridRef.current?.querySelectorAll('.bcard');
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: (i % 3) * 0.08,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" style={{ background: 'var(--light-bg, #f4f4f8)', padding: 'clamp(64px, 8vw, 120px) clamp(24px, 4vw, 56px)' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '5px',
          color: '#1a4fff', textTransform: 'uppercase', marginBottom: 14 }}>
          The technology
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 700,
          color: '#06061e', letterSpacing: '-2px', lineHeight: 1 }}>
          Every detail, deliberate.
        </h2>
      </div>

      {/* Bento grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'clamp(130px, 14vw, 180px)',
        gap: 14, maxWidth: 1200, margin: '0 auto',
      }}>
        {CARDS.map(card => (
          <div key={card.id} className="bcard" style={{
            gridColumn: card.col, gridRow: card.row,
            background: card.bg, borderRadius: 20,
            padding: 'clamp(20px, 2.5vw, 32px)',
            position: 'relative', overflow: 'hidden',
            border: card.bg === '#ffffff' || card.bg === '#fafafa' || card.bg === '#f0f0f8' || card.bg === '#f0eeff'
              ? '1px solid rgba(0,0,0,0.07)' : 'none',
          }}>
            {card.extra === 'orbs' && <FoamOrbs />}

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: card.color, opacity: 0.4, marginBottom: 10 }}>
              {card.label}
            </p>

            {card.big ? (
              <>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(44px,6vw,72px)', color: card.color, lineHeight: 1,
                  letterSpacing: '-2px' }}>{card.title}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12,
                  color: card.color, opacity: 0.7, marginTop: 6 }}>{card.desc}</p>
              </>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(18px, 2.2vw, 28px)', color: card.color,
                  letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 8 }}>
                  {card.title}
                </h3>
                {card.desc && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300,
                    fontSize: 13, lineHeight: 1.6, color: card.color, opacity: 0.65 }}>
                    {card.desc}
                  </p>
                )}
              </>
            )}

            {card.chart && <MiniChart />}

            {card.makers && (
              <p style={{ marginTop: 12, fontFamily: "'Space Mono', monospace", fontSize: 9,
                letterSpacing: '2px', color: '#888', textTransform: 'uppercase' }}>
                Figma &nbsp;·&nbsp; VS Code &nbsp;·&nbsp; Adobe &nbsp;·&nbsp; Notion
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .bcard { grid-column: 1/-1 !important; grid-row: auto !important; min-height: 160px; }
        }
        @media (max-width: 480px) {
          .bcard { border-radius: 14px !important; }
        }
      `}</style>
    </section>
  );
}
