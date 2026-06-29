import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function Field({ label, placeholder, type = 'text', value, onChange, half }) {
  return (
    <div style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label style={{ display: 'block', fontFamily: "'Space Mono', monospace", fontSize: 9,
        letterSpacing: '2.5px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
        marginBottom: 8 }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '13px 16px', borderRadius: 10,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#f0f0ff', fontFamily: "'Inter', sans-serif", fontSize: 14,
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s' }}
        onFocus={e => { e.target.style.borderColor = '#ff6535'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
    </div>
  );
}

export default function Checkout({ onBack, onComplete }) {
  const { items, subtotal, clear } = useCart();
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    card: '', expiry: '', cvv: '',
  });
  const [loading, setLoading] = useState(false);

  const set = key => val => setForm(f => ({ ...f, [key]: val }));

  const formatCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = v => {
    const d = v.replace(/\D/g,'').slice(0,4);
    return d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { clear(); onComplete(); }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>

      {/* Top bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: 'rgba(3,3,20,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 clamp(20px,4vw,56px)', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)',
            fontFamily: "'Inter', sans-serif", fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8 }}>
          ← Back to shop
        </button>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 17, letterSpacing: '4px', color: '#f0f0ff' }}>GALAXY</span>
        <div style={{ width: 120 }}/>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto',
        padding: 'clamp(32px,5vw,64px) clamp(20px,4vw,40px)',
        display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* ── LEFT: Form ── */}
        <form onSubmit={handleSubmit} style={{ flex: '1 1 460px', minWidth: 0 }}>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,4vw,40px)',
            fontWeight: 700, color: '#f0f0ff', letterSpacing: '-1px', marginBottom: 40 }}>
            Checkout
          </h1>

          {/* Contact */}
          <Section title="Contact">
            <Field label="Email address" placeholder="you@example.com" type="email"
              value={form.email} onChange={set('email')} />
            <Field label="Phone" placeholder="+1 (555) 000-0000" type="tel"
              value={form.phone} onChange={set('phone')} />
          </Section>

          {/* Shipping */}
          <Section title="Shipping">
            <Field label="First name" placeholder="Jane" value={form.firstName} onChange={set('firstName')} half />
            <Field label="Last name" placeholder="Doe" value={form.lastName} onChange={set('lastName')} half />
            <Field label="Address" placeholder="123 Galaxy Drive" value={form.address} onChange={set('address')} />
            <Field label="City" placeholder="New York" value={form.city} onChange={set('city')} half />
            <Field label="State" placeholder="NY" value={form.state} onChange={set('state')} half />
            <Field label="ZIP code" placeholder="10001" value={form.zip} onChange={set('zip')} half />
            <Field label="Country" placeholder="United States" value={form.country} onChange={set('country')} half />
          </Section>

          {/* Payment */}
          <Section title="Payment">
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12,
              padding: '14px 16px', marginBottom: 16,
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono',monospace" }}>🔒</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif" }}>
                Secured with 256-bit SSL encryption
              </span>
            </div>
            <Field label="Card number" placeholder="1234 5678 9012 3456"
              value={form.card} onChange={v => set('card')(formatCard(v))} />
            <Field label="Expiry" placeholder="MM/YY"
              value={form.expiry} onChange={v => set('expiry')(formatExpiry(v))} half />
            <Field label="CVV" placeholder="123" type="password"
              value={form.cvv} onChange={v => set('cvv')(v.slice(0,4))} half />
          </Section>

          <motion.button
            type="submit" disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            style={{ width: '100%', padding: '18px', borderRadius: 100,
              background: loading ? 'rgba(255,101,53,0.5)' : '#ff6535',
              border: 'none', color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 16, cursor: loading ? 'default' : 'pointer',
              boxShadow: '0 12px 40px rgba(255,101,53,0.3)',
              transition: 'background 0.3s', marginTop: 8 }}>
            {loading ? 'Placing Order…' : `Place Order — $${total.toFixed(0)}`}
          </motion.button>
        </form>

        {/* ── RIGHT: Order Summary ── */}
        <div style={{ flex: '0 1 360px', minWidth: 0,
          position: 'sticky', top: 92,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
          padding: '28px 24px' }}>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16,
            fontWeight: 700, color: '#f0f0ff', marginBottom: 20 }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {items.map(item => (
              <div key={item.key} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img src={item.image} alt={item.name}
                    style={{ width: 58, height: 44, objectFit: 'cover', borderRadius: 8 }}/>
                  <span style={{ position: 'absolute', top: -6, right: -6,
                    background: '#ff6535', color: '#fff', borderRadius: '50%',
                    width: 18, height: 18, fontSize: 10, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{item.qty}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
                    fontWeight: 600, color: '#f0f0ff', margin: 0 }}>{item.name}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9,
                    color: 'rgba(255,255,255,0.3)', margin: '3px 0 0',
                    letterSpacing: '2px', textTransform: 'uppercase' }}>US {item.size}</p>
                </div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14, fontWeight: 700, color: '#f0f0ff' }}>
                  ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
            {[
              ['Subtotal', `$${subtotal.toFixed(0)}`],
              ['Shipping', shipping === 0 ? 'Free' : `$${shipping}`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: label === 'Shipping' && shipping === 0 ? '#4caf50' : '#f0f0ff' }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginTop: 4 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 16, color: '#f0f0ff' }}>Total</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 20, color: '#ff6535' }}>${total.toFixed(0)}</span>
            </div>
            {shipping === 0 && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11,
                color: '#4caf50', marginTop: 8, textAlign: 'center' }}>
                🎉 You qualify for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '4px',
        color: '#ff6535', textTransform: 'uppercase', marginBottom: 18 }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {children}
      </div>
    </div>
  );
}
