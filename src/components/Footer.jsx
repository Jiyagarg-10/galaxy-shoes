import { motion } from 'framer-motion';

const LINKS = [
  ['Shop', '#'], ['Technology', '#features'], ['Sustainability', '#'],
  ['Instagram', '#'], ['Twitter / X', '#'], ['Careers', '#'],
];

export default function Footer() {
  return (
    <footer style={{ background: '#04041a', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(80px,10vw,130px)' }}>

      {/* Mirrored GALAXY wordmark */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%) scaleY(-1)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(72px, 16vw, 220px)', fontWeight: 700,
        color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.06)',
        whiteSpace: 'nowrap', letterSpacing: '-3px',
        userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1,
      }}>GALAXY</div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(24px,4vw,64px)' }}>

        {/* Logo */}
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '8px', color: '#f0f0ff', marginBottom: 12 }}>
          GALAXY
        </p>

        {/* Tagline */}
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11,
          letterSpacing: '4px', color: 'rgba(255,255,255,0.28)', marginBottom: 52,
          textTransform: 'uppercase' }}>
          Where gravity is optional.
        </p>

        {/* Links */}
        <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px',
          justifyContent: 'center', marginBottom: 64 }}>
          {LINKS.map(([label, href]) => (
            <motion.a key={label} href={href}
              whileHover={{ color: '#f0f0ff' }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
                color: 'rgba(255,255,255,0.32)', textDecoration: 'none',
                letterSpacing: '0.5px', transition: 'color 0.2s' }}>
              {label}
            </motion.a>
          ))}
        </nav>

        {/* Credit */}
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10,
          color: 'rgba(255,255,255,0.13)', letterSpacing: '2px',
          marginBottom: 28 }}>
          Galaxy Footwear © 2025 &nbsp;—&nbsp; Engineered for the cosmos
        </p>
      </div>

      {/* Nebula bleed at bottom */}
      <div style={{
        height: 'clamp(180px, 28vw, 340px)',
        background: `
          radial-gradient(ellipse 110% 100% at 50% 100%,
            rgba(61,26,120,0.75) 0%,
            rgba(26,79,255,0.3) 35%,
            transparent 65%)
        `,
        position: 'relative', zIndex: 1,
      }}/>
    </footer>
  );
}
