import { motion } from 'framer-motion';

/* ── Floating ambient particles ───────────────────────────────────────── */
const PARTICLES = [
  { x: '8%',  y: '18%', s: 3, c: '#ff6535', dur: 4.5, d: 0    },
  { x: '88%', y: '22%', s: 5, c: '#1a4fff', dur: 6.2, d: 1.2  },
  { x: '14%', y: '72%', s: 2, c: '#f0f0ff', dur: 5.1, d: 0.6  },
  { x: '92%', y: '62%', s: 4, c: '#ff6535', dur: 7.0, d: 2.1  },
  { x: '44%', y: '7%',  s: 2, c: '#1a4fff', dur: 5.8, d: 0.9  },
  { x: '62%', y: '88%', s: 3, c: '#f0f0ff', dur: 4.2, d: 1.8  },
  { x: '24%', y: '44%', s: 2, c: '#ff6535', dur: 6.5, d: 0.3  },
  { x: '76%', y: '38%', s: 5, c: '#1a4fff', dur: 5.5, d: 1.5  },
  { x: '36%', y: '94%', s: 2, c: '#f0f0ff', dur: 7.2, d: 0.7  },
  { x: '4%',  y: '52%', s: 3, c: '#1a4fff', dur: 4.8, d: 2.4  },
  { x: '96%', y: '34%', s: 2, c: '#ff6535', dur: 6.0, d: 1.1  },
  { x: '52%', y: '14%', s: 4, c: '#f0f0ff', dur: 5.3, d: 0.4  },
  { x: '18%', y: '28%', s: 2, c: '#ff6535', dur: 4.1, d: 2.8  },
  { x: '72%', y: '78%', s: 3, c: '#1a4fff', dur: 6.8, d: 0.9  },
];

function Particles() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: ['-12px', '12px', '-12px'], opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.x, top: p.y,
            width: p.s, height: p.s, borderRadius: '50%', background: p.c,
          }}
        />
      ))}
    </div>
  );
}

/* ── Decorative orbit rings ───────────────────────────────────────────── */
function OrbitRings() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
      {[320, 520, 720].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 8, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: size, height: size * 0.4,
            borderRadius: '50%',
            border: `1px solid rgba(${i === 0 ? '255,101,53' : i === 1 ? '26,79,255' : '240,240,255'},${0.12 - i * 0.03})`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Word reveal variant ──────────────────────────────────────────────── */
const wordVariant = {
  hidden: { opacity: 0, y: 60, rotate: 5, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  rotate: 0, filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

function Word({ children, accent }) {
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.28em', verticalAlign: 'bottom' }}>
      <motion.span variants={wordVariant} style={{ display: 'inline-block', color: accent ? '#ff6535' : undefined }}>
        {children}
      </motion.span>
    </span>
  );
}

/* ── Component ────────────────────────────────────────────────────────── */
export default function Statement() {
  return (
    <section id="statement" style={{
      background: 'var(--bg)', padding: 'clamp(100px, 12vw, 180px) clamp(24px, 5vw, 64px)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>

      {/* Particles */}
      <Particles />

      {/* Orbit rings */}
      <OrbitRings />

      {/* Rotating GALAXY watermark */}
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 2, 0, -2, 0], scale: [1, 1.02, 1, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(80px, 18vw, 260px)', fontWeight: 700,
          color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.05)',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-4px',
        }}>GALAXY</motion.div>

      {/* Orange radial pulse */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.18, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(300px, 50vw, 700px)', height: 'clamp(300px, 50vw, 700px)',
          borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(255,101,53,0.14) 0%, transparent 70%)',
        }}/>

      {/* Scan line that sweeps across once on entry */}
      <motion.div
        aria-hidden
        initial={{ x: '-110%', opacity: 0 }}
        whileInView={{ x: '210%', opacity: [0, 0.5, 0.5, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.4, ease: 'linear' }}
        style={{
          position: 'absolute', left: 0, right: 0, top: '48%',
          height: 2, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent 0%, #ff6535 30%, #1a4fff 70%, transparent 100%)',
        }}/>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Eyebrow with line reveal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ height: 1, width: 40, background: '#ff6535', transformOrigin: 'right', opacity: 0.6 }}/>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'Space Mono', monospace", fontSize: 11,
              letterSpacing: '5px', color: '#ff6535', textTransform: 'uppercase', margin: 0 }}>
            The promise
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ height: 1, width: 40, background: '#ff6535', transformOrigin: 'left', opacity: 0.6 }}/>
        </div>

        {/* Headline — word-by-word with blur reveal */}
        <motion.h2
          variants={container} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-100px' }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(34px, 6vw, 96px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-2px',
            maxWidth: 960, margin: '0 auto', color: '#f0f0ff',
          }}
        >
          <Word>Engineered</Word><Word>With</Word>
          {/* "Clarity." with infinite orange glow pulse */}
          <span style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}>
            <motion.span
              variants={wordVariant}
              animate={{ textShadow: [
                '0 0 0px rgba(255,101,53,0)',
                '0 0 40px rgba(255,101,53,0.7)',
                '0 0 0px rgba(255,101,53,0)',
              ]}}
              transition={{
                textShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              style={{ display: 'inline-block', color: '#ff6535' }}
            >
              Clarity.
            </motion.span>
          </span>
          <br/>
          <Word>Worn</Word><Word>Without</Word><Word>Limits.</Word>
        </motion.h2>

        {/* CTA with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ marginTop: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
        >
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ height: 1, width: 'clamp(32px, 5vw, 72px)',
              background: 'linear-gradient(to left, #ff6535, transparent)',
              transformOrigin: 'right' }}/>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              const el = document.getElementById('collection');
              if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
              else el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '18px 52px', borderRadius: 100, background: '#ff6535',
              color: '#fff', border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 16, letterSpacing: '0.3px',
              transition: 'box-shadow 0.3s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,101,53,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Shop the Collection →
          </motion.button>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ height: 1, width: 'clamp(32px, 5vw, 72px)',
              background: 'linear-gradient(to right, #ff6535, transparent)',
              transformOrigin: 'left' }}/>
        </motion.div>
      </div>
    </section>
  );
}
