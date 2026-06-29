import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ['Collection', 'About', 'Contact'];
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 64px', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <motion.div
          whileHover={{ opacity: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '0.06em', color: '#fff' }}>↗GALAXY</span>
        </motion.div>

        <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <motion.button key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              whileHover={{ color: '#fff' }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >{l}</motion.button>
          ))}
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
          <motion.button
            onClick={() => scrollTo('collection')}
            whileHover={{ color: '#fff' }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >Shop ↗</motion.button>
        </nav>

        <motion.button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          whileTap={{ scale: 0.9 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
        >
          {[0,1,2].map(i => (
            <motion.span key={i}
              animate={menuOpen ? (i===1 ? { opacity: 0, scaleX: 0 } : i===0 ? { rotate: 45, y: 6.5 } : { rotate: -45, y: -6.5 }) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
              style={{ display: 'block', width: 22, height: 1, background: '#fff' }}
            />
          ))}
        </motion.button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px' }}
          >
            {links.map((l, i) => (
              <motion.button key={l}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l.toLowerCase())}
                whileHover={{ x: 12, color: 'rgba(255,255,255,0.5)' }}
                style={{ background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 72, color: '#fff', padding: '12px 0', textAlign: 'left', letterSpacing: '-0.04em', lineHeight: 1 }}
              >{l}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 768px) {
          header { padding: 0 32px !important; }
        }
      `}</style>
    </>
  );
}
