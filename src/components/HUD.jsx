import { useEffect, useState } from 'react';

const S = {
  wrap: {
    position: 'fixed', top: 24, right: 24, zIndex: 500,
    fontFamily: "'Space Mono', monospace", fontSize: 10,
    color: 'rgba(160,160,220,0.28)', textAlign: 'right',
    lineHeight: 1.9, pointerEvents: 'none', letterSpacing: '0.05em',
    userSelect: 'none',
  },
};

export default function HUD() {
  const [pct, setPct]   = useState(0);
  const [fps, setFps]   = useState(60);
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    let last = performance.now(), frames = 0, animId;

    const tick = (t) => {
      frames++;
      if (t - last >= 600) {
        setFps(Math.round(frames / ((t - last) / 1000)));
        frames = 0; last = t;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.round((window.scrollY / h) * 100) : 0);
      setPosY(Math.round(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { cancelAnimationFrame(animId); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div style={S.wrap}>
      <div>SCR&nbsp;{String(pct).padStart(3, '0')}%</div>
      <div>FPS&nbsp;{String(fps).padStart(2, '0')}</div>
      <div>Y&nbsp;&nbsp;{String(posY).padStart(5, '0')}</div>
    </div>
  );
}
