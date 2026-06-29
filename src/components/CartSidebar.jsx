import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartSidebar({ onCheckout }) {
  const { items, remove, setQty, count, subtotal, open, setOpen } = useCart();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
              zIndex: 300, backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'clamp(320px, 90vw, 440px)', zIndex: 301,
              background: '#0a0a1e', borderLeft: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18,
                  fontWeight: 700, color: '#f0f0ff', margin: 0 }}>Your Cart</h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10,
                  letterSpacing: '3px', color: 'rgba(255,255,255,0.3)',
                  margin: '4px 0 0', textTransform: 'uppercase' }}>
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                  fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: 4 }}>✕</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px 32px' }}>
                  <p style={{ fontSize: 36, marginBottom: 12 }}>👟</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.3)',
                    fontSize: 15 }}>Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <motion.div key={item.key} layout
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{ display: 'flex', gap: 16, padding: '16px 28px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={item.image} alt={item.name}
                      style={{ width: 72, height: 54, objectFit: 'cover',
                        borderRadius: 8, flexShrink: 0 }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                          fontSize: 14, color: '#f0f0ff', margin: 0,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </p>
                        <button onClick={() => remove(item.key)}
                          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)',
                            fontSize: 14, cursor: 'pointer', flexShrink: 0, marginLeft: 8, padding: 0 }}>✕</button>
                      </div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10,
                        color: 'rgba(255,255,255,0.3)', margin: '0 0 10px',
                        letterSpacing: '2px', textTransform: 'uppercase' }}>
                        US {item.size}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0,
                          border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20 }}>
                          <button onClick={() => setQty(item.key, item.qty - 1)}
                            style={{ background: 'none', border: 'none', color: '#f0f0ff',
                              width: 30, height: 30, cursor: 'pointer', fontSize: 16 }}>−</button>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
                            color: '#f0f0ff', minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => setQty(item.key, item.qty + 1)}
                            style={{ background: 'none', border: 'none', color: '#f0f0ff',
                              width: 30, height: 30, cursor: 'pointer', fontSize: 16 }}>+</button>
                        </div>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                          fontSize: 15, color: '#ff6535' }}>
                          ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
                    color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 18, color: '#f0f0ff' }}>${subtotal.toFixed(0)}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11,
                  color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>
                  Shipping & taxes calculated at checkout
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setOpen(false); onCheckout(); }}
                  style={{ width: '100%', padding: '16px', borderRadius: 100,
                    background: '#ff6535', border: 'none', color: '#fff',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 15, cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(255,101,53,0.35)' }}>
                  Checkout — ${subtotal.toFixed(0)}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
