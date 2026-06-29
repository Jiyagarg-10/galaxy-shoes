import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SneakerSVG from './SneakerSVG';

function NebulaStarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      baseAlpha: Math.random() * 0.8 + 0.15,
      speed: Math.random() * 1.5 + 0.3,
      offset: Math.random() * Math.PI * 2,
      color: (() => {
        const t = Math.random();
        if (t > 0.75) return [180, 120, 255];
        if (t > 0.5)  return [100, 160, 255];
        return [255, 255, 255];
      })(),
    }));
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const draw = (t) => {
      const T = t * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const a = s.baseAlpha * (0.4 + 0.6 * Math.sin(T * s.speed + s.offset));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}/>;
}

/* 5 satellites evenly spaced on the orbit (72° apart), flagship stays at center */
const SATELLITES = [
  { filter: 'hue-rotate(340deg) saturate(2) drop-shadow(0 0 22px rgba(255,40,100,0.8))',
    rotate: '-9deg',  flip: false, label: 'Pulsar Speed',  baseAngle: 0   },
  { filter: 'hue-rotate(185deg) saturate(1.5) drop-shadow(0 0 26px rgba(255,160,0,0.75))',
    rotate: '7deg',   flip: true,  label: 'Nova Runner',   baseAngle: 72  },
  { filter: 'hue-rotate(100deg) saturate(1.7) drop-shadow(0 0 22px rgba(40,200,100,0.7))',
    rotate: '-7deg',  flip: false, label: 'Eclipse Trail', baseAngle: 144 },
  { filter: 'hue-rotate(260deg) saturate(1.8) drop-shadow(0 0 22px rgba(120,40,255,0.7))',
    rotate: '9deg',   flip: true,  label: 'Nebula Slide',  baseAngle: 216 },
  { filter: 'grayscale(0.6) brightness(1.55) drop-shadow(0 0 16px rgba(210,210,210,0.55))',
    rotate: '5deg',   flip: false, label: 'Stellar HI',    baseAngle: 288 },
];

export default function Cosmic() {
  const sectionRef    = useRef(null);
  const overlayRef    = useRef(null);
  const nebulaRef     = useRef(null);
  const flagshipRef   = useRef(null);
  const satelliteRefs = useRef([]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let orbitAngle = 0;
    const DEG = Math.PI / 180;

    const orbitTicker = () => {
      orbitAngle += 0.25 * DEG; // ~24s per revolution
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rx = vw  * 0.36;
      const ry = vh  * 0.25;

      satelliteRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = SATELLITES[i].baseAngle * DEG + orbitAngle;
        const xOff = Math.cos(a) * rx;
        const yOff = Math.sin(a) * ry;

        /* depth: sin(a)==1 → front, sin(a)==-1 → back */
        const depth   = (Math.sin(a) + 1) / 2; // 0..1
        const scale   = 0.52 + depth * 0.48;
        const opacity = 0.35 + depth * 0.65;
        const zIndex  = Math.round(depth * 8) + 3;

        el.style.left      = `calc(50% + ${xOff}px)`;
        el.style.top       = `calc(50% + ${yOff}px)`;
        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity   = opacity.toFixed(3);
        el.style.zIndex    = String(zIndex);
      });
    };

    gsap.ticker.add(orbitTicker);

    const ctx = gsap.context(() => {
      /* Smooth dark overlay fades out as section enters */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top', end: '40% top',
        scrub: 1,
        onUpdate: s => { if (overlayRef.current) overlayRef.current.style.opacity = String(1 - s.progress); },
      });

      /* Flagship gentle float */
      if (flagshipRef.current)
        gsap.to(flagshipRef.current, { y: -24, repeat: -1, yoyo: true, duration: 4.2, ease: 'sine.inOut' });

      /* Nebula hue shift on scroll */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top', end: 'bottom bottom',
        scrub: 1,
        onUpdate: s => {
          if (nebulaRef.current)
            nebulaRef.current.style.filter = `hue-rotate(${s.progress * 28}deg) brightness(${1 + s.progress * 0.25})`;
        },
      });
    }, sectionRef);

    return () => { gsap.ticker.remove(orbitTicker); ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Nebula */}
        <div ref={nebulaRef} style={{ position: 'absolute', inset: 0, zIndex: 1,
          background: `
            radial-gradient(ellipse 80% 65% at 30% 45%, rgba(61,26,120,0.85) 0%, transparent 55%),
            radial-gradient(ellipse 65% 70% at 70% 55%, rgba(26,79,255,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 45% 50% at 55% 85%, rgba(255,101,53,0.12) 0%, transparent 55%),
            #030314
          ` }}/>

        <NebulaStarCanvas />

        {/* Faint orbit ring visual */}
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '72vw', height: '50vh',
          border: '1px solid rgba(120,100,255,0.1)',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 4,
        }}/>

        {/* FLAGSHIP — center, always in front */}
        <div ref={flagshipRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(220px, 34vw, 395px)',
          zIndex: 12, pointerEvents: 'none',
        }}>
          <SneakerSVG style={{
            width: '100%', height: 'auto',
            transform: 'rotate(-3deg)',
            filter: 'drop-shadow(0 0 60px rgba(26,79,255,0.9)) drop-shadow(0 0 120px rgba(61,26,120,0.65))',
          }}/>
        </div>

        {/* SATELLITES — orbit continuously */}
        {SATELLITES.map((sat, i) => (
          <div
            key={i}
            ref={el => { satelliteRefs.current[i] = el; }}
            style={{
              position: 'absolute', width: 'clamp(100px, 13vw, 140px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <SneakerSVG style={{
              width: '100%', height: 'auto',
              transform: `rotate(${sat.rotate}) ${sat.flip ? 'scaleX(-1)' : ''}`,
              filter: sat.filter,
            }}/>
            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '3px',
              color: 'rgba(240,240,255,0.5)', textTransform: 'uppercase',
              textAlign: 'center', marginTop: 6, whiteSpace: 'nowrap',
            }}>{sat.label}</p>
          </div>
        ))}

        {/* Flagship label */}
        <div style={{
          position: 'absolute', top: 'calc(50% + clamp(120px, 20vw, 220px))', left: '50%',
          transform: 'translateX(-50%)', zIndex: 13, textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '4px',
            color: 'rgba(240,240,255,0.35)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Orbit I · Flagship
          </p>
        </div>

        {/* Bottom caption */}
        <div style={{
          position: 'absolute', bottom: '7%', left: '50%',
          transform: 'translateX(-50%)', zIndex: 13, textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '8px',
            color: 'rgba(240,240,255,0.28)', textTransform: 'uppercase', whiteSpace: 'nowrap', marginBottom: 6 }}>
            Six Models · One Universe
          </p>
          <div style={{ width: 36, height: 1, background: '#ff6535', margin: '0 auto', opacity: 0.55 }}/>
        </div>

        {/* HUD */}
        <div style={{
          position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          zIndex: 13, fontFamily: "'Space Mono', monospace", fontSize: 10,
          letterSpacing: '7px', color: 'rgba(240,240,255,0.18)',
          textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          GALAXY ORBIT I &nbsp;—&nbsp; FLAGSHIP 2025
        </div>

        {/* Dark overlay — fades out on scroll entry */}
        <div ref={overlayRef} style={{
          position: 'absolute', inset: 0, zIndex: 14, pointerEvents: 'none',
          background: '#030314',
        }}/>
      </div>
    </section>
  );
}
