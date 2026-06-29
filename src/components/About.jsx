import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section id="about" ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      background: '#000', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '120px 64px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Subtle bg glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '55%', transform: 'translate(-50%,-50%)',
        width: 900, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 48 }}
      >Our Story</motion.p>

      {/* Massive headline */}
      <motion.h2
        initial={{ opacity: 0, y: 70 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(52px, 8vw, 118px)',
          fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
          color: '#fff', maxWidth: '85%', marginBottom: 72,
        }}
      >
        BORN FROM<br />
        THE <span style={{ background: 'linear-gradient(135deg, #D4A843, #F5E08A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COSMOS.</span><br />
        MADE FOR<br />
        THE STREET.
      </motion.h2>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.42)', marginBottom: 20 }}>
            Galaxy was founded in 2021 with one obsession: to create footwear that felt otherworldly. Not just in look — in feel, in fit, in purpose.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.42)', marginBottom: 48 }}>
            We looked to deep space for our inspiration — the geometry of nebulae, the weight of silence between stars, the violence of a supernova. That tension lives in every silhouette we release.
          </p>
          <motion.button
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer', color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '0 0 8px', display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
          >Read Our Manifesto ↗</motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: 40 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[['2021', 'Founded'], ['48', 'Countries'], ['12K+', 'Pairs Sold']].map(([n, l], i) => (
              <div key={l} style={{ paddingRight: i < 2 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.09)' : 'none' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10 }}>{n}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[['Precision Craft', 'Aerospace-grade materials. No compromise.'], ['Cosmic Design', 'Geometry of the universe, worn on the street.'], ['Limited Drops', 'Every release is intentional. Rarity is the point.']].map(([t, d], i) => (
              <div key={t} style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', paddingTop: 2, minWidth: 24 }}>0{i+1}</span>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{t}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
