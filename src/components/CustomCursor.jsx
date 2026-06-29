import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mx = useMotionValue(-100), my = useMotionValue(-100);
  const rx = useSpring(mx, { damping: 30, stiffness: 220 });
  const ry = useSpring(my, { damping: 30, stiffness: 220 });

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <>
      {/* Dot — tracks exactly */}
      <motion.div
        id="galaxy-cursor"
        style={{
          position: 'fixed', top: -5, left: -5, zIndex: 9999,
          width: 10, height: 10, borderRadius: '50%',
          background: '#ff6535', pointerEvents: 'none',
          x: mx, y: my,
        }}
      />
      {/* Ring — lags behind */}
      <motion.div
        id="galaxy-cursor-ring"
        style={{
          position: 'fixed', top: -20, left: -20, zIndex: 9998,
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid rgba(255,101,53,0.35)',
          pointerEvents: 'none',
          x: rx, y: ry,
        }}
      />
    </>
  );
}
