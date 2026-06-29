import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  const inputStyle = {
    width: '100%', padding: '16px 0',
    background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)',
    color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 15,
    outline: 'none', transition: 'border-color 0.25s',
  };

  return (
    <section id="contact" ref={ref} style={{
      padding: '120px 64px 100px',
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start', maxWidth: 1200 }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 32 }}>Get in Touch</p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(52px, 7vw, 100px)',
            fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.88,
            color: '#fff', marginBottom: 40,
          }}>
            JOIN<br />
            <span style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>THE<br />GALAXY.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', marginBottom: 52, maxWidth: 340 }}>
            Stockist enquiries, collaborations, or just want to say hello — we're listening from the other side of the cosmos.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {['Instagram', 'Twitter', 'TikTok', 'Discord'].map((s, i) => (
              <motion.button key={s}
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{
                  background: 'none', border: 'none', borderTop: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.3)',
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '16px 0', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >{s} <span style={{ fontSize: 16 }}>↗</span></motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 }}
          style={{ paddingTop: 72 }}
        >
          {sent ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 88, fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: 24, background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', marginBottom: 14 }}>Signal Received.</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>We'll be in touch from the other side of the cosmos.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                { key: 'name', label: 'Name', placeholder: 'Your name', type: 'text' },
                { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>{label}</label>
                  <input required type={type} style={inputStyle} placeholder={placeholder}
                    value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
                    onFocus={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.55)'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Message</label>
                <textarea required rows={4} style={{ ...inputStyle, resize: 'none' }} placeholder="Tell us about your enquiry..."
                  value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                  onFocus={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.55)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{
                  background: 'none', border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer', color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '0 0 10px', display: 'inline-flex', alignItems: 'center', gap: 12, alignSelf: 'flex-start', marginTop: 8,
                }}
              >Send Signal ↗</motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
