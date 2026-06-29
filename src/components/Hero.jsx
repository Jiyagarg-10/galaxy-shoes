import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SneakerSVG from './SneakerSVG';

function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      baseAlpha: Math.random() * 0.65 + 0.1,
      speed: Math.random() * 1.8 + 0.4,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.72 ? [100, 150, 255] : [240, 240, 255],
    }));

    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t) => {
      const T = t * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const a = s.baseAlpha * (0.45 + 0.55 * Math.sin(T * s.speed + s.offset));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

const fade = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  const { scrollY } = useScroll();
  const shoeY = useTransform(scrollY, [0, 700], [0, -60]);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)' }}>

      <StarCanvas />

      {/* Nebula glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 55% at 50% 48%, rgba(45,16,96,0.55) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 40% at 70% 30%, rgba(26,79,255,0.12) 0%, transparent 65%)' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', width: '100%' }}>

        {/* Eyebrow */}
        <motion.p variants={fade} initial="hidden" animate="show"
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22,1,0.36,1] }}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '5px',
            color: '#ff6535', textTransform: 'uppercase', marginBottom: 28 }}>
          Galaxy × SS25 &nbsp;·&nbsp; Flagship Collection
        </motion.p>

        {/* Title line 1 — outlined */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22,1,0.36,1] }}
            style={{ fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(64px, 11vw, 148px)', fontWeight: 700,
              lineHeight: 0.88, letterSpacing: '-4px', textTransform: 'uppercase',
              color: 'transparent', WebkitTextStroke: '1.5px rgba(240,240,255,0.25)',
              userSelect: 'none', marginBottom: 0 }}>
            BUILT FOR
          </motion.h1>
        </div>

        {/* Shoe */}
        <motion.div style={{ y: shoeY }}
          initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22,1,0.36,1] }}>
          <div style={{ position: 'relative', margin: '6px auto', width: 'clamp(260px, 48vw, 520px)' }}>
            {/* Halo glow */}
            <div style={{ position: 'absolute', inset: '20% 5%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,16,96,0.7) 0%, transparent 70%)',
              filter: 'blur(40px)', transform: 'scaleY(0.5) translateY(40%)' }} />
            <SneakerSVG style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1,
              filter: 'drop-shadow(0 0 48px rgba(26,79,255,0.45)) drop-shadow(0 24px 60px rgba(3,3,20,0.9))',
              transform: 'rotate(-4deg) scaleX(-1)' }} />
          </div>
        </motion.div>

        {/* Title line 2 — solid white */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22,1,0.36,1] }}
            style={{ fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(64px, 11vw, 148px)', fontWeight: 700,
              lineHeight: 0.88, letterSpacing: '-4px', textTransform: 'uppercase',
              color: '#f0f0ff', userSelect: 'none', marginBottom: 0 }}>
            LIFTOFF.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p variants={fade} initial="hidden" animate="show"
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22,1,0.36,1] }}
          style={{ marginTop: 28, fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 13, letterSpacing: '4px', color: 'rgba(240,240,255,0.35)',
            textTransform: 'uppercase' }}>
          Where gravity is optional
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '4px',
          color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, #ff6535, transparent)',
          animation: 'scrollPulse 1.6s ease-in-out infinite' }} />
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50%      { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
