import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const pill = {
  padding: '9px 22px', borderRadius: 100,
  border: '1px solid rgba(255,255,255,0.14)',
  color: 'rgba(255,255,255,0.75)', background: 'none',
  fontFamily: "'Inter', sans-serif", fontSize: 13, letterSpacing: '0.3px',
  textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s',
};

const cta = {
  padding: '9px 26px', borderRadius: 100,
  background: '#ff6535', color: '#fff', textDecoration: 'none',
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
  fontSize: 13, letterSpacing: '0.3px',
  transition: 'opacity 0.2s, transform 0.2s',
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '20px 48px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        background: scrolled ? 'rgba(3,3,20,0.75)' : 'transparent',
        transition: 'backdrop-filter 0.3s, background 0.3s',
      }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', padding: 0,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 18, letterSpacing: '6px', color: '#f0f0ff' }}
        >GALAXY</button>

        {/* Desktop */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="nav-desktop">
          {[['Technology', 'features'], ['Our Story', 'statement']].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={pill}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'none'; }}
            >{label}</button>
          ))}
          <button onClick={() => scrollTo('collection')}
            style={cta}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >Shop Now</button>

          {/* Cart icon */}
          <button onClick={() => openCart(true)}
            style={{ position: 'relative', background: 'none', border: 'none',
              color: '#f0f0ff', cursor: 'pointer', padding: '8px', marginLeft: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                style={{ position: 'absolute', top: 0, right: 0,
                  background: '#ff6535', color: '#fff', borderRadius: '50%',
                  width: 17, height: 17, fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif" }}>
                {count > 9 ? '9+' : count}
              </motion.span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          className="nav-mobile"
          style={{ background: 'none', border: 'none', padding: 4, display: 'none', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <motion.span key={i}
              animate={menuOpen ? (i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6 } : { rotate: -45, y: -6 }) : { rotate: 0, y: 0, opacity: 1 }}
              style={{ display: 'block', width: 22, height: 1.5, background: '#fff' }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 199, background: '#030314',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px' }}>
            {[['Technology', 'features'], ['Our Story', 'statement'], ['Shop', 'collection']].map(([label, id], i) => (
              <motion.button key={label}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 'clamp(52px,10vw,80px)',
                  color: '#f0f0ff', padding: '14px 0', textAlign: 'left', letterSpacing: '-0.03em' }}
              >{label}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          nav { padding: 18px 24px !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
