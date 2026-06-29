export default function SneakerSVG({ style = {}, glowColor = 'rgba(26,79,255,0.5)' }) {
  return (
    <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', ...style }}>
      <defs>
        <linearGradient id="sn-upper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141640"/>
          <stop offset="100%" stopColor="#090b28"/>
        </linearGradient>
        <linearGradient id="sn-midsole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5ff"/>
          <stop offset="100%" stopColor="#d8d8f0"/>
        </linearGradient>
        <linearGradient id="sn-heel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c0d2c"/>
          <stop offset="100%" stopColor="#141640"/>
        </linearGradient>
      </defs>

      {/* Ground glow */}
      <ellipse cx="265" cy="332" rx="196" ry="11" fill={glowColor} style={{ filter: 'blur(9px)' }}/>

      {/* Outsole */}
      <path d="M 86,308 Q 74,308 72,316 Q 70,324 80,327 L 460,327 Q 473,327 475,319 Q 477,311 465,308 Z"
        fill="#0a0a1e" stroke="#121230" strokeWidth="1"/>
      {[1,2,3,4,5].map(i => (
        <line key={i} x1={118 + i*66} y1={308} x2={106 + i*66} y2={327}
          stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
      ))}

      {/* Midsole */}
      <path d="M 84,282 L 468,282 Q 483,282 485,292 Q 487,302 475,307 L 84,307 Q 72,307 70,297 Q 68,287 78,282 Z"
        fill="url(#sn-midsole)" stroke="#c8c8ec" strokeWidth="1"/>
      {/* Midsole heel accent orange */}
      <path d="M 78,282 Q 70,284 68,294 Q 66,304 76,307 L 124,307 L 124,282 Z"
        fill="#ff6535" opacity="0.88"/>
      <line x1="84" y1="295" x2="466" y2="295" stroke="rgba(160,160,220,0.4)" strokeWidth="1"/>

      {/* Main upper */}
      <path d="
        M 88,282 L 88,212
        Q 82,185 87,158
        Q 92,132 106,110
        Q 118,90 134,76
        Q 152,62 172,54
        Q 196,44 224,46
        Q 246,48 258,62
        Q 266,75 268,96
        L 276,148
        Q 312,163 354,188
        Q 390,212 420,246
        Q 444,272 448,290
        Q 451,300 448,307
        L 448,282
        L 88,282 Z
      " fill="url(#sn-upper)" stroke="#181868" strokeWidth="1.5"/>

      {/* Heel counter */}
      <path d="
        M 88,282 L 88,212
        Q 82,186 88,160
        Q 91,148 98,136
        L 116,144
        Q 108,158 107,182
        Q 106,206 112,238
        Q 118,264 130,282 Z
      " fill="url(#sn-heel)" opacity="0.8"/>
      <path d="M 88,248 Q 83,208 92,168"
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" strokeDasharray="4,3"/>

      {/* Toe cap */}
      <path d="
        M 384,200 Q 422,226 444,262
        Q 454,280 452,307
        L 366,307 Q 364,284 354,260
        Q 346,238 345,212 Z
      " fill="#0c0d2a" stroke="#141456" strokeWidth="1"/>
      <path d="M 390,207 Q 424,234 444,268 Q 453,284 450,307"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4,5"/>

      {/* Tongue */}
      <path d="
        M 198,50 Q 220,44 244,50 Q 258,56 264,72
        L 276,148 Q 258,136 236,140
        Q 216,144 202,152
        L 194,88 Q 190,62 198,50 Z
      " fill="#101244" stroke="#1a1a70" strokeWidth="1"/>
      <path d="M 204,62 Q 224,52 246,60 L 262,144"
        fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" strokeDasharray="3,5"/>
      <text x="234" y="108" textAnchor="middle"
        fontFamily="'Space Grotesk',sans-serif" fontSize="9" fontWeight="700"
        letterSpacing="2.5" fill="rgba(255,255,255,0.16)">GALAXY</text>

      {/* Vamp / lace zone */}
      <path d="
        M 110,116 Q 148,104 190,102 Q 224,101 266,140
        Q 246,128 224,132 Q 200,136 176,142
        Q 142,148 110,142 Z
      " fill="#0e1040" stroke="#161862" strokeWidth="0.8"/>

      {/* Laces — 6 cross pairs */}
      {[0,1,2,3,4,5].map(i => {
        const t = i / 5;
        const x1 = 164 + t * 84;
        const x2 = x1 + 36;
        const y  = 106 + t * 32;
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y+5}
              stroke="rgba(255,255,255,0.58)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx={x1-3} cy={y}   r="3.2" fill="#0c0e32" stroke="rgba(255,255,255,0.42)" strokeWidth="1.2"/>
            <circle cx={x2+3} cy={y+5} r="3.2" fill="#0c0e32" stroke="rgba(255,255,255,0.42)" strokeWidth="1.2"/>
          </g>
        );
      })}

      {/* BRAND STRIPE — the main orange swoosh-style element */}
      <path d="
        M 110,148 Q 150,158 194,158
        Q 244,158 296,175
        Q 344,192 378,216
        Q 390,226 386,236
        Q 300,206 226,196
        Q 150,186 110,166 Z
      " fill="#ff6535" opacity="0.96"/>
      {/* Brand stripe inner highlight */}
      <path d="
        M 128,152 Q 168,162 210,166
        Q 266,172 320,190 Q 356,204 380,220
        Q 376,228 370,230
        Q 336,214 282,197
        Q 208,178 128,162 Z
      " fill="rgba(255,255,255,0.15)"/>

      {/* Collar padding arch */}
      <path d="
        M 108,114 Q 120,96 136,80
        Q 152,64 172,56 Q 195,46 220,48
        Q 238,50 250,64 Q 256,74 257,90
        Q 248,74 232,70 Q 212,66 192,74
        Q 168,84 148,104 Q 126,122 112,145 Z
      " fill="#181872" stroke="#1e1e80" strokeWidth="0.8"/>
      <path d="M 114,112 Q 136,92 160,76 Q 180,64 204,58 Q 222,54 238,62 Q 250,70 255,84"
        fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" strokeLinecap="round"/>

      {/* Perforations on toe */}
      {Array.from({length: 12}, (_,i) => (
        <circle key={i}
          cx={355 + (i%4)*20} cy={228 + Math.floor(i/4)*18}
          r="2.4" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}

      {/* Side stitch */}
      <path d="M 152,245 Q 205,254 268,268 Q 340,285 408,306"
        fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="5,4"/>
    </svg>
  );
}
