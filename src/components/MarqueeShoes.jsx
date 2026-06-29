import { useState } from 'react';
import { motion } from 'framer-motion';
import SneakerSVG from './SneakerSVG';

const RUNNERS = [
  { glow: '#7C3AED', w: 230, delay: 0 },
  { glow: '#D4A843', w: 255, delay: 0.09 },
  { glow: '#3B82F6', w: 205, delay: 0.18 },
  { glow: '#EC4899', w: 238, delay: 0.05 },
  { glow: '#7C3AED', w: 218, delay: 0.13 },
  { glow: '#D4A843', w: 248, delay: 0.07 },
];

const TICKER = 'GALAXY RUNNER X1  ·  GALAXY VOID PRO  ·  GALAXY NOVA  ·  GALAXY NEBULA  ·  SS25 COLLECTION  ·  NOW AVAILABLE  ·  ';

export default function MarqueeShoes() {
  const [fast, setFast] = useState(false);
  const all = [...RUNNERS, ...RUNNERS];

  return (
    <>
      <style>{`
        @keyframes shoes-run {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes text-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .shoe-strip        { animation: shoes-run  18s linear infinite; }
        .shoe-strip.sprint { animation-duration: 4s; }
        .text-strip        { animation: text-scroll 24s linear infinite; }
        .text-strip.sprint { animation-duration: 7s; }
      `}</style>

      <div
        onMouseEnter={() => setFast(true)}
        onMouseLeave={() => setFast(false)}
        style={{
          background: '#000',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '52px 0 40px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Gradient edge masks */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
          background: 'linear-gradient(to right, #000 0%, transparent 9%, transparent 91%, #000 100%)',
        }} />

        {/* Speed label — appears on hover */}
        <div style={{
          position: 'absolute', top: 18, right: 64, zIndex: 4,
          fontFamily: "'Inter', sans-serif", fontSize: 10,
          color: fast ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          transition: 'color 0.3s',
        }}>
          {fast ? 'SPRINT MODE ↑' : 'Hover to Sprint'}
        </div>

        {/* ── Shoe marquee ── */}
        <div
          className={`shoe-strip${fast ? ' sprint' : ''}`}
          style={{ display: 'flex', gap: 80, alignItems: 'flex-end', width: 'max-content', paddingLeft: 60 }}
        >
          {all.map((r, i) => (
            <div key={i} style={{ flexShrink: 0, width: r.w }}>
              {/* Rotation wrapper (plain div — avoids Framer transform conflict) */}
              <div style={{ transform: 'rotate(-9deg) scaleX(-1)' }}>
                {/* Bounce animation */}
                <motion.div
                  animate={{ y: [0, -22, 4, -16, 0] }}
                  transition={{
                    duration: 0.42,
                    repeat: Infinity,
                    delay: r.delay,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    filter: `drop-shadow(0 0 44px ${r.glow}cc) drop-shadow(0 28px 36px rgba(0,0,0,0.85))`,
                  }}
                >
                  <SneakerSVG style={{ width: '100%', height: 'auto' }} glowColor={`${r.glow}44`} />
                </motion.div>
              </div>

              {/* Ground shadow — shrinks when shoe is airborne */}
              <motion.div
                animate={{ scaleX: [1, 0.55, 1.1, 0.65, 1], opacity: [0.4, 0.08, 0.45, 0.1, 0.4] }}
                transition={{ duration: 0.42, repeat: Infinity, delay: r.delay }}
                style={{
                  width: '48%', height: 7, borderRadius: '50%',
                  background: r.glow, filter: 'blur(9px)',
                  margin: '-3px auto 0',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Text ticker ── */}
        <div
          className={`text-strip${fast ? ' sprint' : ''}`}
          style={{ display: 'flex', width: 'max-content', marginTop: 26, paddingLeft: 60 }}
        >
          {Array(10).fill(TICKER).map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10, color: 'rgba(255,255,255,0.13)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}
