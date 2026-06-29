export function CrewSock({ style = {} }) {
  return (
    <svg viewBox="0 0 280 290" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', ...style }}>
      <defs>
        <linearGradient id="cs-black" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1c1c"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="148" cy="283" rx="96" ry="6" fill="rgba(0,0,0,0.35)" style={{ filter: 'blur(6px)' }}/>

      {/* Cuff */}
      <path d="M 40,14 Q 40,6 56,4 Q 96,0 116,4 Q 128,7 128,16 L 128,56 L 40,56 Z"
        fill="#111111" stroke="#2a2a2a" strokeWidth="0.8"/>
      {[10,18,26,34,42,50].map(y => (
        <line key={y} x1="40" y1={y} x2="128" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"/>
      ))}

      {/* Leg tube */}
      <rect x="40" y="56" width="88" height="149" fill="url(#cs-black)" stroke="#222222" strokeWidth="0.8"/>
      {[72,90,108,126,144,162,180,198].map(y => (
        <line key={y} x1="40" y1={y} x2="128" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      <line x1="42" y1="56" x2="42" y2="205" stroke="rgba(255,255,255,0.035)" strokeDasharray="4,3" strokeWidth="1.5"/>

      {/* Ankle + heel */}
      <path d="M 40,205 Q 23,210 21,232 Q 19,252 36,260 Q 50,267 68,260 L 66,238 Q 52,242 44,234 Q 38,225 42,212 Z"
        fill="#151515" stroke="#222" strokeWidth="0.8"/>
      <path d="M 40,205 L 128,205 L 128,270 L 72,270 L 72,215 L 50,215 Z"
        fill="#0e0e0e"/>

      {/* Foot */}
      <rect x="72" y="205" width="172" height="65" fill="url(#cs-black)" stroke="#222222" strokeWidth="0.8"/>

      {/* Toe cap */}
      <path d="M 236,205 Q 264,205 267,222 Q 270,240 258,250 Q 244,258 230,254 L 230,205 Z"
        fill="#131313" stroke="#1e1e1e" strokeWidth="0.8"/>

      {/* Subtle rib highlight on cuff edge */}
      <path d="M 40,56 L 128,56" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
    </svg>
  );
}

export function AnkleSock({ style = {} }) {
  return (
    <svg viewBox="0 0 280 240" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', ...style }}>
      <defs>
        <linearGradient id="as-white" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f5f5"/>
          <stop offset="100%" stopColor="#e8e8e8"/>
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="148" cy="234" rx="96" ry="6" fill="rgba(0,0,0,0.18)" style={{ filter: 'blur(6px)' }}/>

      {/* Short cuff */}
      <path d="M 40,18 Q 40,10 55,8 Q 92,4 116,8 Q 128,11 128,20 L 128,50 L 40,50 Z"
        fill="#efefef" stroke="#d0d0d0" strokeWidth="0.8"/>
      {[13,21,29,37,45].map(y => (
        <line key={y} x1="40" y1={y} x2="128" y2={y} stroke="rgba(0,0,0,0.07)" strokeWidth="1.5"/>
      ))}

      {/* Short leg */}
      <rect x="40" y="50" width="88" height="111" fill="url(#as-white)" stroke="#d8d8d8" strokeWidth="0.8"/>
      {[66,82,98,114,130,146].map(y => (
        <line key={y} x1="40" y1={y} x2="128" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>
      ))}

      {/* Heel */}
      <path d="M 40,161 Q 23,167 21,186 Q 19,204 36,210 Q 50,216 68,208 L 66,188 Q 50,194 42,186 Q 36,177 40,165 Z"
        fill="#e0e0e0" stroke="#cccccc" strokeWidth="0.8"/>

      {/* Ankle + foot */}
      <path d="M 40,161 L 128,161 L 128,225 L 72,225 L 72,172 Q 55,172 45,180 Z"
        fill="#eaeaea"/>
      <rect x="72" y="161" width="172" height="64" fill="url(#as-white)" stroke="#d8d8d8" strokeWidth="0.8"/>

      {/* Toe cap */}
      <path d="M 236,161 Q 264,161 267,178 Q 270,196 258,204 Q 244,212 230,208 L 230,161 Z"
        fill="#e4e4e4" stroke="#cccccc" strokeWidth="0.8"/>

      {/* Cuff edge line */}
      <path d="M 40,50 L 128,50" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
    </svg>
  );
}
