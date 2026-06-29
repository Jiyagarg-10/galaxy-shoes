import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ORDER_NUM = () => Math.floor(100000 + Math.random() * 900000);

export default function OrderConfirmation({ onContinue }) {
  const [orderNo] = useState(ORDER_NUM);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: 'clamp(40px,8vw,100px) clamp(24px,5vw,64px)' }}>

      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
        style={{ width: 88, height: 88, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.25) 0%, transparent 70%)',
          border: '2px solid rgba(76,175,80,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 36, fontSize: 38 }}>
        ✓
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: "'Space Mono', monospace", fontSize: 11,
          letterSpacing: '5px', color: '#ff6535', textTransform: 'uppercase',
          marginBottom: 16 }}>
        Order Confirmed
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px,6vw,72px)', fontWeight: 700,
          letterSpacing: '-2px', color: '#f0f0ff', marginBottom: 20, lineHeight: 1.1 }}>
        Thanks for your order!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 15,
          color: 'rgba(255,255,255,0.45)', maxWidth: 480, lineHeight: 1.7, marginBottom: 40 }}>
        We've received your order and are getting it ready. You'll receive a confirmation
        email shortly with tracking details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '20px 40px', marginBottom: 48 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9,
          letterSpacing: '3px', color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase', margin: '0 0 6px' }}>Order number</p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 26, color: '#ff6535', letterSpacing: '2px', margin: 0 }}>
          #{orderNo}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        style={{ padding: '16px 52px', borderRadius: 100,
          background: '#ff6535', border: 'none', color: '#fff',
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 15, cursor: 'pointer',
          boxShadow: '0 12px 40px rgba(255,101,53,0.3)' }}>
        Continue Shopping
      </motion.button>
    </motion.div>
  );
}
