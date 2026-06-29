import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const REVIEWS = [
  {
    id: 1, name: 'Jordan M.', location: 'New York, NY', shoe: 'Orbit I',
    rating: 5, date: 'June 2025', verified: true,
    text: "These are genuinely the most comfortable shoes I've ever worn. Wore them for a 10-mile run on day one — zero break-in time.",
  },
  {
    id: 2, name: 'Priya S.', location: 'San Francisco, CA', shoe: 'Nova Runner',
    rating: 5, date: 'May 2025', verified: true,
    text: "Switched from another premium brand and never looking back. Lighter than expected, and the cushioning on long runs is something else.",
  },
  {
    id: 3, name: 'Alex T.', location: 'Austin, TX', shoe: 'Stellar HI',
    rating: 5, date: 'June 2025', verified: true,
    text: "Limited edition and it shows. The build quality is immaculate. Wore them to a gallery opening and a morning run — both times perfect.",
  },
  {
    id: 4, name: 'Marcus L.', location: 'Chicago, IL', shoe: 'Eclipse Trail',
    rating: 4, date: 'April 2025', verified: true,
    text: "Trail grip is excellent — handled muddy paths without slipping once. Sizing runs slightly small so go half a size up.",
  },
  {
    id: 5, name: 'Sofia R.', location: 'Miami, FL', shoe: 'Nebula Slide',
    rating: 5, date: 'June 2025', verified: true,
    text: "Slips on and off in seconds. Wore these all day at a music festival and my feet didn't complain once.",
  },
  {
    id: 6, name: 'Kai W.', location: 'Seattle, WA', shoe: 'Pulsar Speed',
    rating: 5, date: 'May 2025', verified: true,
    text: "PR'd my 5K in these. I'm not saying it's entirely the shoes but… it's the shoes. Incredibly responsive.",
  },
];

function Stars({ rating, size = 13 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? '#ff6535' : 'none'}
          stroke={i <= rating ? '#ff6535' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 26vw, 360px)',
        background: 'linear-gradient(145deg, #0d0d26 0%, #080818 100%)',
        border: `1px solid ${hovered ? 'rgba(255,101,53,0.3)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18, padding: '22px 22px 20px',
        display: 'flex', flexDirection: 'column', gap: 12,
        boxShadow: hovered
          ? '0 12px 48px rgba(255,101,53,0.12)'
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative', overflow: 'hidden',
      }}>
      {/* Glow on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
        background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,101,53,${hovered ? 0.09 : 0.04}) 0%, transparent 70%)`,
        pointerEvents: 'none', transition: 'background 0.3s',
      }}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stars rating={review.rating} />
        {review.verified && (
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '2px',
            color: 'rgba(76,175,80,0.8)', border: '1px solid rgba(76,175,80,0.25)',
            borderRadius: 100, padding: '3px 9px', textTransform: 'uppercase',
          }}>Verified</span>
        )}
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.6,
        color: 'rgba(240,240,255,0.72)', margin: 0, flex: 1,
        position: 'relative', zIndex: 1,
      }}>"{review.text}"</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 13, color: '#f0f0ff', margin: 0 }}>{review.name}</p>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8,
            color: 'rgba(255,255,255,0.28)', letterSpacing: '1.5px', margin: '2px 0 0' }}>
            {review.location}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '2px',
            color: '#ff6535', textTransform: 'uppercase', margin: 0 }}>{review.shoe}</p>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7,
            color: 'rgba(255,255,255,0.2)', letterSpacing: '1px', margin: '2px 0 0' }}>{review.date}</p>
        </div>
      </div>
    </div>
  );
}

/* Counting number animation */
function CountUp({ to, decimals = 0, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (inView) { const t = setTimeout(() => mv.set(to), delay * 1000); return () => clearTimeout(t); }
  }, [inView, mv, to, delay]);
  useEffect(() => spring.on('change', v => setDisplay(v.toFixed(decimals))), [spring, decimals]);
  return <span ref={ref}>{display}</span>;
}

const WORDS = ['Worn.', 'Loved.', 'Trusted.'];
const TRACK = [...REVIEWS, ...REVIEWS]; // duplicate for seamless loop
const SPEED = 38; // seconds for one full loop

export default function Reviews() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="reviews" style={{
      background: 'var(--bg)',
      padding: 'clamp(56px, 7vw, 100px) 0',
      overflow: 'hidden',
    }}>
      {/* Header — keep horizontal padding here */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 60px)',
        padding: '0 clamp(24px, 4vw, 56px)' }}>

        <motion.p
          initial={{ opacity: 0, letterSpacing: '14px' }}
          whileInView={{ opacity: 1, letterSpacing: '5px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: '#ff6535', textTransform: 'uppercase', marginBottom: 16 }}>
          Customer Reviews
        </motion.p>

        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(34px, 5.5vw, 72px)', letterSpacing: '-2px',
          color: '#f0f0ff', lineHeight: 1, marginBottom: 8,
          display: 'flex', justifyContent: 'center', gap: '0.28em', flexWrap: 'wrap' }}>
          {WORDS.map((word, i) => (
            <motion.span key={word}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', color: i === 2 ? '#ff6535' : '#f0f0ff' }}>
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,101,53,0.6), transparent)',
            maxWidth: 160, margin: '16px auto 24px' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 100, padding: '10px 24px' }}>
          <Stars rating={5} size={15} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 18, color: '#f0f0ff' }}>
            <CountUp to={4.8} decimals={1} delay={0.5} />
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13,
            color: 'rgba(255,255,255,0.35)' }}>/ 5 · {REVIEWS.length} reviews</span>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: 'hidden', cursor: 'default' }}>

        {/* Fade edges */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, var(--bg), transparent)' }}/>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to left, var(--bg), transparent)' }}/>

          <div style={{
            display: 'flex', gap: 16,
            width: 'max-content',
            animation: `marquee ${SPEED}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            padding: '8px 0 16px',
          }}>
            {TRACK.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
