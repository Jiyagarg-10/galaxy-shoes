import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { shoes } from '../data/shoes';
import SneakerSVG from './SneakerSVG';
import WavyText from './WavyText';

const NUMS = ['01', '02', '03', '04'];

function ProductSection({ shoe, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} style={{
      position: 'relative', height: '100vh',
      background: '#000', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Big number watermark */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.04 } : {}}
        transition={{ duration: 1.2, delay: 0.1 }}
        style={{
          position: 'absolute',
          right: isEven ? '-2%' : 'auto', left: isEven ? 'auto' : '-2%',
          top: '50%', transform: 'translateY(-52%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '48vw', fontWeight: 700, lineHeight: 1,
          color: '#fff', userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.06em', zIndex: 0,
        }}
      >{NUMS[index]}</motion.div>

      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        right: isEven ? '-10%' : 'auto', left: isEven ? 'auto' : '-10%',
        top: '50%', transform: 'translateY(-50%)',
        width: '70vw', height: '70vw', borderRadius: '50%',
        background: `radial-gradient(circle, ${shoe.glow}22 0%, transparent 60%)`,
        filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Shoe — massive, fills right/left half */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          right: isEven ? '-4%' : 'auto',
          left: isEven ? 'auto' : '-4%',
          top: '50%', transform: 'translateY(-50%)',
          width: '58%', zIndex: 1,
          filter: `drop-shadow(0 0 90px ${shoe.glow}88) drop-shadow(0 60px 120px rgba(0,0,0,0.9))`,
        }}
      >
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: isEven ? 'rotate(-5deg) scaleX(-1)' : 'rotate(-5deg)' }}
        >
          <SneakerSVG style={{ width: '100%', height: 'auto' }} glowColor={`${shoe.glow}40`}/>
        </motion.div>
        {/* Ground shadow */}
        <div style={{ width: '60%', height: 20, borderRadius: '50%', background: `${shoe.glow}22`, filter: 'blur(24px)', margin: '-8px auto 0' }} />
      </motion.div>

      {/* Thin horizontal reveal line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'absolute', bottom: 100, left: 0, right: 0, height: 1,
          background: `linear-gradient(to right, transparent, ${shoe.glow}44, transparent)`,
          transformOrigin: 'left center', zIndex: 2,
        }}
      />

      {/* Counter — top left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}
        style={{ position: 'absolute', top: 36, left: 64, zIndex: 10,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 400,
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}
      >{NUMS[index]} / 04</motion.div>

      {/* Tag — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        style={{ position: 'absolute', top: 36, right: 64, zIndex: 10,
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          color: shoe.glow, letterSpacing: '0.18em', textTransform: 'uppercase' }}
      >{shoe.tag}</motion.div>

      {/* Text content — centered vertically on the opposite side from shoe */}
      <div style={{
        position: 'absolute',
        left: isEven ? 64 : 'auto',
        right: isEven ? 'auto' : 64,
        top: '50%', transform: 'translateY(-50%)',
        maxWidth: 420, zIndex: 5,
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18 }}
        >{shoe.colorway}</motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(40px, 5.5vw, 80px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.92,
            color: '#fff', marginBottom: 18,
          }}
        >{shoe.name}</motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, marginBottom: 52 }}
        >{shoe.tagline}</motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 36, transformOrigin: 'left center' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 44 }}
        >
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>£{shoe.price}</div>
          <motion.button
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{
              background: 'none', border: 'none',
              borderBottom: `1px solid rgba(255,255,255,0.22)`,
              cursor: 'pointer', color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 12,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0 0 8px', display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
          >Add to Cart ↗</motion.button>
        </motion.div>

        {/* Size row */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          style={{ display: 'flex', gap: 8, marginTop: 28 }}
        >
          {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(s => (
            <motion.button key={s}
              whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.06em',
                padding: '6px 10px',
              }}
            >{s}</motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { scrollY } = useScroll();
  const bannerX = useTransform(scrollY, [400, 2000], ['0%', '-28%']);

  return (
    <div id="collection">
      {/* Section intro */}
      <section ref={ref} style={{
        padding: '96px 64px 100px', background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>The Collection</p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(48px, 7.5vw, 112px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88, color: '#fff',
            overflow: 'visible',
          }}>
            <WavyText text="SS25 DROP." amplitude={8} frequency={0.003} /><br />
            <span style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>FOUR<br />SILHOUETTES.</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: 320, paddingBottom: 8 }}
        >
          Precision-engineered for those who move between worlds. Each silhouette is a statement — worn by few, felt by all.
        </motion.p>

        {/* Horizontal parallax banner text */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div style={{ x: bannerX, display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(72px, 13vw, 160px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.028)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}>
              GALAXY · SS25 · FOUR SILHOUETTES · GALAXY · SS25 · FOUR SILHOUETTES ·
            </span>
          </motion.div>
        </div>
      </section>

      {shoes.map((shoe, i) => <ProductSection key={shoe.id} shoe={shoe} index={i} />)}
    </div>
  );
}
