import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Three isolated SVG layers extracted from the same 400×240 viewBox */

function ShoeUpper() {
  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ex-upper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141640"/>
          <stop offset="100%" stopColor="#0a0b28"/>
        </linearGradient>
        <filter id="glow-upper">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Heel counter */}
      <path d="M40 152 L40 90 Q40 76 50 70 Q60 64 72 66 L80 68 L82 152Z"
        fill="#0c0d2e" stroke="#16175a" strokeWidth="0.7"/>
      {/* Main upper */}
      <path d="M80 68 L80 152 L338 152 L346 144 Q355 130 357 114 Q359 98 353 84 Q346 68 330 60 Q310 50 284 46 Q254 42 222 40 Q186 38 152 40 Q120 41 100 52 Q84 60 80 68Z"
        fill="url(#ex-upper)" stroke="#1a1a60" strokeWidth="0.8"/>
      {/* Toe cap */}
      <path d="M290 46 Q320 52 340 66 Q360 80 364 100 Q368 118 364 136 Q360 150 350 158 Q344 162 338 164 L338 152 Q350 142 354 128 Q358 112 354 96 Q348 78 334 68 Q316 56 298 50Z"
        fill="#0e0f30" stroke="#141456" strokeWidth="0.7"/>
      {/* Toe cap stitching */}
      <path d="M290 46 Q316 56 332 72 Q346 86 350 108 Q352 126 346 142"
        strokeDasharray="3,2" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none"/>
      {/* Collar arch */}
      <path d="M40 90 Q40 74 50 67 L72 64 L80 68 Q80 82 78 94 Q74 108 66 114 Q58 118 50 116 Q42 114 40 104 Q38 97 40 90Z"
        fill="#16176a" stroke="#1e1e78" strokeWidth="0.6"/>
      {/* Collar top edge highlight */}
      <path d="M42 90 Q44 76 52 68 Q60 62 70 64"
        fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Tongue */}
      <path d="M152 40 Q158 38 164 38 Q170 38 174 40 L176 50 L172 152 L148 152 L146 50Z"
        fill="#101248" stroke="#181870" strokeWidth="0.6"/>
      {/* Tongue stitching lines */}
      {[68, 90, 112, 134].map(y => (
        <path key={y} d={`M154 ${y} Q161 ${y-2} 168 ${y}`}
          strokeDasharray="3,2" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"
          fill="none" strokeLinecap="round"/>
      ))}
      {/* GALAXY tongue text */}
      <text x="160" y="115" textAnchor="middle"
        fontFamily="'Space Grotesk',sans-serif" fontSize="7" fontWeight="700"
        letterSpacing="2" fill="rgba(255,255,255,0.15)"
        transform="rotate(-90 160 115)">GALAXY</text>
      {/* Eyelets + laces */}
      {[54, 70, 86, 102, 118, 134].map((y, i) => (
        <g key={i}>
          <circle cx="148" cy={y} r="3.2" fill="#0e1038" stroke="rgba(255,255,255,0.38)" strokeWidth="1"/>
          <circle cx="174" cy={y} r="3.2" fill="#0e1038" stroke="rgba(255,255,255,0.38)" strokeWidth="1"/>
          <line x1="148" y1={y} x2="174" y2={y+16} stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="174" y1={y} x2="148" y2={y+16} stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round"/>
        </g>
      ))}
      {/* Heel tab */}
      <rect x="40" y="56" width="10" height="18" rx="2.5" fill="#16176a" stroke="#1e1e80" strokeWidth="0.6"/>
      {/* Upper stitching */}
      <path d="M176 42 Q210 40 250 40 Q290 40 316 48"
        strokeDasharray="3,2" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" fill="none"/>
      <path d="M82 138 Q160 135 250 136 Q300 137 335 144"
        strokeDasharray="3,2" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" fill="none"/>
      {/* BRAND STRIPE — orange, along vamp bottom */}
      <path d="M80 140 Q160 136 240 138 Q290 140 336 148 Q340 152 335 154 Q285 148 236 146 Q154 144 80 150 Z"
        fill="#ff6535" opacity="0.92"/>
      {/* Stripe highlight */}
      <path d="M88 142 Q165 138 248 140 Q295 142 330 148 Q326 152 320 152 Q280 146 240 144 Q162 142 88 146 Z"
        fill="rgba(255,255,255,0.14)"/>
    </svg>
  );
}

function ShoeMidsole() {
  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="mid-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5ff"/>
          <stop offset="100%" stopColor="#d4d4f0"/>
        </linearGradient>
      </defs>
      <path d="M28 168 Q30 154 40 152 L348 152 Q362 152 368 158 Q374 164 372 172 Q370 182 364 188 Q358 194 350 194 L42 194 Q34 194 30 188 Q26 182 28 168Z"
        fill="url(#mid-grad)" stroke="#c0c0e8" strokeWidth="0.8"/>
      {/* Mid stripe */}
      <path d="M32 172 Q160 168 260 168 Q320 170 368 172"
        stroke="rgba(150,150,220,0.4)" strokeWidth="1" fill="none"/>
      {/* Heel orange accent */}
      <path d="M28 172 Q29 160 36 155 L42 152 L42 194 L34 193 Q26 190 26 182 Z"
        fill="#ff6535" opacity="0.9"/>
    </svg>
  );
}

function ShoeOutsole() {
  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <path d="M38 194 L353 194 Q364 194 368 200 Q372 206 368 210 Q364 214 353 214 L38 214 Q28 214 26 208 Q24 202 28 197 Z"
        fill="#0a0a1e" stroke="#121230" strokeWidth="0.8"/>
      {[78, 118, 158, 198, 238, 278, 318].map(x => (
        <line key={x} x1={x} y1="195" x2={x-8} y2="213"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      ))}
      {/* Ground glow */}
      <ellipse cx="198" cy="220" rx="155" ry="9"
        fill="rgba(26,79,255,0.2)" style={{ filter: 'blur(7px)' }}/>
    </svg>
  );
}

const LBL = {
  position: 'absolute', fontFamily: "'Space Mono', monospace",
  fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
  opacity: 0, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
  color: 'rgba(240,240,255,0.55)',
};

export default function Explode() {
  const sectionRef    = useRef(null);
  const upperRef      = useRef(null);
  const midsoleRef    = useRef(null);
  const outsoleRef    = useRef(null);
  const lblUpRef      = useRef(null);
  const lblMidRef     = useRef(null);
  const lblOutRef     = useRef(null);
  const stmtRef       = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });

      tl
        // 0→0.45 — layers separate
        .to(upperRef.current,   { y: -88, ease: 'none', duration: 0.45 }, 0)
        .to(outsoleRef.current, { y: 68,  ease: 'none', duration: 0.45 }, 0)
        // 0.18→0.45 — labels slide in
        .to(lblUpRef.current,  { opacity: 1, x: 0, ease: 'none', duration: 0.25 }, 0.18)
        .to(lblMidRef.current, { opacity: 1, x: 0, ease: 'none', duration: 0.25 }, 0.22)
        .to(lblOutRef.current, { opacity: 1, x: 0, ease: 'none', duration: 0.25 }, 0.26)
        // 0.48→0.72 — statement appears
        .to(stmtRef.current, { opacity: 1, ease: 'none', duration: 0.2 }, 0.48)
        // 0.78→0.95 — everything fades out
        .to([upperRef.current, midsoleRef.current, outsoleRef.current,
             lblUpRef.current, lblMidRef.current, lblOutRef.current], { opacity: 0, ease: 'none', duration: 0.17 }, 0.78)
        .to(stmtRef.current, { opacity: 0, ease: 'none', duration: 0.17 }, 0.78);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SHOE_W = 'clamp(300px, 48vw, 520px)';
  const SHOE_H = 'clamp(160px, 26vw, 280px)';

  return (
    <section ref={sectionRef} style={{ height: '300vh', background: 'var(--bg)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Subtle bg radial */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(45,16,96,0.3) 0%, transparent 70%)' }}/>

        {/* Shoe container */}
        <div style={{ position: 'relative', width: SHOE_W, height: SHOE_H }}>

          {/* UPPER */}
          <div ref={upperRef} style={{ position: 'absolute', inset: 0, willChange: 'transform,opacity' }}>
            <ShoeUpper />
          </div>

          {/* MIDSOLE */}
          <div ref={midsoleRef} style={{ position: 'absolute', inset: 0, willChange: 'opacity' }}>
            <ShoeMidsole />
          </div>

          {/* OUTSOLE */}
          <div ref={outsoleRef} style={{ position: 'absolute', inset: 0, willChange: 'transform,opacity' }}>
            <ShoeOutsole />
          </div>

          {/* Labels */}
          <div ref={lblUpRef} style={{ ...LBL, right: 'calc(100% + 24px)', top: '12%', transform: 'translateX(-20px)' }}>
            <span style={{ color: '#ff6535' }}>—</span>
            <span>Orbit Foam Upper</span>
          </div>
          <div ref={lblMidRef} style={{ ...LBL, left: 'calc(100% + 24px)', top: '60%', transform: 'translateX(20px)' }}>
            <span>AeroMax Midsole</span>
            <span style={{ color: '#ff6535' }}>—</span>
          </div>
          <div ref={lblOutRef} style={{ ...LBL, right: 'calc(100% + 24px)', top: '90%', transform: 'translateX(-20px)' }}>
            <span style={{ color: '#ff6535' }}>—</span>
            <span>Carbon Grip Outsole</span>
          </div>
        </div>

        {/* Statement text — positioned below the shoe */}
        <div ref={stmtRef} style={{
          position: 'absolute', bottom: '9%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center', opacity: 0, pointerEvents: 'none',
          width: '80%', maxWidth: 720,
        }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11,
            letterSpacing: '5px', color: '#ff6535', marginBottom: 20,
            textTransform: 'uppercase' }}>The engineering</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 700,
            letterSpacing: '-1.5px', lineHeight: 1.05, color: '#f0f0ff' }}>
            The Spirit of Motion,{' '}
            <em style={{ fontStyle: 'normal', color: '#ff6535' }}>Engineered.</em>
          </h2>
        </div>
      </div>
    </section>
  );
}
