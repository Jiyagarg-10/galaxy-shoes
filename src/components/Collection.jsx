import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrewSock, AnkleSock } from './SockSVG';
import SneakerSVG from './SneakerSVG';
import { useCart } from '../context/CartContext';

const SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

const SHOES = [
  { id: 'orbit',   name: 'Orbit I',      sub: 'Flagship Runner',  price: '$189', tag: 'BESTSELLER',
    wrapFilter: 'drop-shadow(0 0 32px rgba(26,79,255,0.75))',
    flip: false, rotate: '-4deg', cardAccent: 'rgba(26,79,255,0.12)', tagColor: '#ff6535' },
  { id: 'nova',    name: 'Nova Runner',   sub: 'Speed Series',     price: '$165', tag: 'NEW',
    wrapFilter: 'hue-rotate(340deg) saturate(2.2) drop-shadow(0 0 28px rgba(255,40,100,0.7))',
    flip: true,  rotate: '3deg',  cardAccent: 'rgba(255,40,100,0.1)', tagColor: '#1a4fff' },
  { id: 'stellar', name: 'Stellar HI',    sub: 'Premium Edition',  price: '$215', tag: 'LIMITED',
    wrapFilter: 'grayscale(0.5) brightness(1.6) drop-shadow(0 0 28px rgba(200,200,220,0.6))',
    flip: false, rotate: '-3deg', cardAccent: 'rgba(180,180,200,0.08)', tagColor: '#ff6535' },
  { id: 'nebula',  name: 'Nebula Slide',  sub: 'Lifestyle',        price: '$125', tag: '',
    wrapFilter: 'hue-rotate(260deg) saturate(1.8) drop-shadow(0 0 26px rgba(120,40,255,0.7))',
    flip: true,  rotate: '5deg',  cardAccent: 'rgba(120,40,255,0.1)', tagColor: '#ff6535' },
  { id: 'eclipse', name: 'Eclipse Trail', sub: 'All-Terrain',      price: '$195', tag: 'NEW',
    wrapFilter: 'hue-rotate(100deg) saturate(1.7) drop-shadow(0 0 26px rgba(40,200,100,0.65))',
    flip: false, rotate: '-2deg', cardAccent: 'rgba(40,200,100,0.1)', tagColor: '#1a4fff' },
  { id: 'pulsar',  name: 'Pulsar Speed',  sub: 'Performance',      price: '$175', tag: '',
    wrapFilter: 'hue-rotate(185deg) saturate(1.5) drop-shadow(0 0 28px rgba(255,160,0,0.7))',
    flip: true,  rotate: '4deg',  cardAccent: 'rgba(255,160,0,0.1)', tagColor: '#ff6535' },
];

const SOCKS = [
  { id: 'crew',  name: 'Orbit Crew',    sub: 'Crew Height · 3-Pack', price: '$48', comp: 'crew' },
  { id: 'ankle', name: 'Galaxy Ankle',  sub: 'No-Show · 3-Pack',     price: '$36', comp: 'ankle' },
];

function ShoeCard({ shoe, i }) {
  const { addToCart } = useCart();
  const [picking, setPicking] = useState(false);
  const [added, setAdded]     = useState(false);

  const handleSize = size => {
    addToCart(shoe, size);
    setPicking(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: 'linear-gradient(145deg, #0c0c24 0%, #080818 100%)',
        borderRadius: 18, padding: '16px 16px 14px',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${shoe.cardAccent} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}/>

      {shoe.tag && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '2.5px',
          color: shoe.tagColor, border: `1px solid ${shoe.tagColor}`,
          borderRadius: 100, padding: '4px 11px', background: shoe.tagColor + '18', zIndex: 3,
        }}>{shoe.tag}</div>
      )}

      {/* Shoe SVG */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 8,
        height: 'clamp(90px, 11vh, 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SneakerSVG style={{
          width: '90%', maxHeight: '100%', height: 'auto', display: 'block',
          transform: `rotate(${shoe.rotate}) ${shoe.flip ? 'scaleX(-1)' : ''}`,
          filter: shoe.wrapFilter,
        }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '2.5px',
          color: 'rgba(240,240,255,0.28)', textTransform: 'uppercase', marginBottom: 2 }}>{shoe.sub}</p>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(13px, 1.2vw, 16px)', color: '#f0f0ff',
          letterSpacing: '-0.4px', marginBottom: 8 }}>{shoe.name}</h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 16, color: '#ff6535' }}>{shoe.price}</span>
          {!picking && (
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => added ? null : setPicking(true)}
              style={{
                background: added ? 'rgba(76,175,80,0.18)' : 'rgba(255,101,53,0.14)',
                border: `1px solid ${added ? 'rgba(76,175,80,0.5)' : 'rgba(255,101,53,0.45)'}`,
                color: added ? '#4caf50' : '#ff6535',
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                padding: '7px 14px', borderRadius: 100, cursor: added ? 'default' : 'pointer',
                transition: 'all 0.3s', whiteSpace: 'nowrap',
              }}>
              {added ? '✓ Added' : 'Add to Cart'}
            </motion.button>
          )}
        </div>

        {/* Size picker */}
        <AnimatePresence>
          {picking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '2px',
                color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 10 }}>
                Select size (US)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10 }}>
                {SIZES.map(sz => (
                  <motion.button key={sz}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                    onClick={() => handleSize(sz)}
                    style={{ width: 40, height: 36, borderRadius: 8,
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#f0f0ff', fontFamily: "'Inter', sans-serif",
                      fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
                    {sz}
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setPicking(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                  fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer', padding: 0 }}>
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SockCard({ sock, i }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id: sock.id, name: sock.name, sub: sock.sub, price: sock.price, image: '' }, 'One Size');
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: (6 + i) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: 'linear-gradient(145deg, #0c0c24 0%, #080818 100%)',
        borderRadius: 22, padding: '32px 24px 24px',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer', boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        {sock.comp === 'crew'
          ? <CrewSock  style={{ width: 'clamp(90px, 16vw, 145px)', height: 'auto' }} />
          : <AnkleSock style={{ width: 'clamp(90px, 16vw, 145px)', height: 'auto' }} />}
      </div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '3px',
        color: 'rgba(240,240,255,0.28)', textTransform: 'uppercase', marginBottom: 7 }}>{sock.sub}</p>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 'clamp(17px, 2vw, 22px)', color: '#f0f0ff', letterSpacing: '-0.5px', marginBottom: 18 }}>
        {sock.name}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 20, color: '#ff6535' }}>{sock.price}</span>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          style={{
            background: added ? 'rgba(76,175,80,0.18)' : 'rgba(255,101,53,0.14)',
            border: `1px solid ${added ? 'rgba(76,175,80,0.5)' : 'rgba(255,101,53,0.45)'}`,
            color: added ? '#4caf50' : '#ff6535',
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            padding: '9px 18px', borderRadius: 100, cursor: 'pointer', transition: 'all 0.3s',
          }}>
          {added ? '✓ Added' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" style={{
      background: 'var(--bg)',
      padding: 'clamp(32px, 4vh, 56px) clamp(16px, 3vw, 48px)',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(16px, 2vh, 28px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '5px',
            color: '#ff6535', textTransform: 'uppercase', marginBottom: 8 }}>
          SS25 — Full Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.85, ease: [0.22,1,0.36,1] }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(24px, 3.5vw, 48px)', letterSpacing: '-2px', color: '#f0f0ff', lineHeight: 1 }}>
          Built for Every{' '}
          <span style={{ color: '#ff6535' }}>Mission.</span>
        </motion.h2>
      </div>

      <style>{`
        .shoe-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(8px, 1vw, 14px);
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 700px) { .shoe-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .shoe-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Shoes grid */}
      <div className="shoe-grid">
        {SHOES.map((shoe, i) => <ShoeCard key={shoe.id} shoe={shoe} i={i} />)}
      </div>

      {/* Socks divider */}
      <div style={{ textAlign: 'center', margin: 'clamp(56px, 8vw, 96px) 0 clamp(36px, 5vw, 56px)' }}>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ width: 48, height: 1, background: '#ff6535', margin: '0 auto 20px' }}/>
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '6px',
            color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }}>
          Complete the Look
        </motion.p>
      </div>

      {/* Socks grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(220px, 22vw, 280px), 1fr))',
        gap: 20, maxWidth: 640, margin: '0 auto',
      }}>
        {SOCKS.map((sock, i) => <SockCard key={sock.id} sock={sock} i={i} />)}
      </div>
    </section>
  );
}
