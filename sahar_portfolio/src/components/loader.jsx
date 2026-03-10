import { useState, useEffect } from "react";

/* ─── Color palette ─────────────────────────────────────────── */
const C = {
  frostedBlue:    "#B8E7F3",
  bubblegumFizz:  "#ffffff",
  prussianBlue:   "#5c8aff",
  cornflowerBlue: "#6E9FEA",
  plum:           "#fff6fe",
  neonIce:        "#59E7E7",
};

/* ─── Icons with individual accent colors ───────────────────── */
const icons = [
  { label:"code",     angle:0,   radius:265, color: C.neonIce, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )},

  { label:"pen",      angle:45,  radius:295, color: C.bubblegumFizz, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="M2 2l7.586 7.586"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>
  )},

  { label:"terminal", angle:90,  radius:270, color: C.cornflowerBlue, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  )},

  { label:"layers",   angle:135, radius:290, color: C.plum, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  )},

  { label:"git",      angle:180, radius:265, color: C.neonIce, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15"/>
      <circle cx="18" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>
  )},

  { label:"palette",  angle:225, radius:295, color: C.bubblegumFizz, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5"  r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="17.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="8.5"  cy="7.5"  r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="6.5"  cy="12.5" r="1.2" fill="currentColor" stroke="none"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  )},

  { label:"box",      angle:270, radius:270, color: C.cornflowerBlue, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )},

  { label:"figma",    angle:315, radius:290, color: C.plum, svg:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
    </svg>
  )},
];

/* ─── CSS ───────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Montserrat:wght@300;400&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  :root {
    --frosted-blue:    #B8E7F3;
    --bubblegum-fizz:  #F568CB;
    --prussian-blue:   #0E1F4B;
    --cornflower-blue: #6E9FEA;
    --plum:            #E393D7;
    --neon-ice:        #59E7E7;
  }

  @keyframes grain {
    0%,100% { transform:translate(0,0) }
    25%  { transform:translate(-1.2%,1.2%) }
    50%  { transform:translate(1.2%,-1.2%) }
    75%  { transform:translate(-0.8%,-0.8%) }
  }

  @keyframes bgPulse {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  @keyframes nameIn {
    0%   { opacity:0; transform:translateY(20px) scale(0.88); filter:blur(12px); }
    100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
  }

  @keyframes nameThrough {
    0%   { opacity:1; transform:scale(1);  filter:blur(0); }
    45%  { opacity:1; transform:scale(8);  filter:blur(0); }
    75%  { opacity:0; transform:scale(14); filter:blur(6px); }
    100% { opacity:0; transform:scale(18); filter:blur(12px); }
  }

  @keyframes overlayOut {
    0%   { opacity:1; }
    100% { opacity:0; }
  }

  @keyframes lineGrow {
    0%   { width:0; opacity:0; }
    50%  { opacity:1; }
    100% { width:80px; opacity:1; }
  }

  @keyframes subIn {
    0%   { opacity:0; transform:translateY(8px); }
    100% { opacity:1; transform:translateY(0); }
  }

  @keyframes iconIn {
    0%   { opacity:0; transform:var(--ip) scale(0.4) rotate(-25deg); }
    65%  { opacity:1; transform:var(--ip) scale(1.08) rotate(3deg); }
    100% { opacity:1; transform:var(--ip) scale(1) rotate(0deg); }
  }

  @keyframes iconFloat {
    0%,100% { transform:var(--ip) translateY(0px); }
    50%      { transform:var(--ip) translateY(-8px); }
  }

  @keyframes iconOut {
    0%   { opacity:1; transform:var(--ip) scale(1) rotate(0deg); }
    100% { opacity:0; transform:var(--ip) scale(0.3) rotate(15deg); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  @keyframes pageIn {
    0%   { opacity:0; transform:translateY(24px); filter:blur(6px); }
    100% { opacity:1; transform:translateY(0); filter:blur(0); }
  }

  @keyframes glowPulse {
    0%,100% { text-shadow:
      0 0 30px rgba(133, 242, 242, 0.4),
      0 0 60px rgba(153, 191, 247, 0.3),
      0 0 90px rgba(237, 147, 210, 0.2); }
    50% { text-shadow:
      0 0 50px rgba(163, 248, 248, 0.7),
      0 0 90px rgba(204, 225, 255, 0.5),
      0 0 130px rgba(252, 174, 229, 0.35); }
  }

  /* ── Loader wrapper ── */
  .ldr {
    position:fixed; inset:0; z-index:9999;
    display:flex; align-items:center; justify-content:center;
    overflow:hidden;
    background: #F568CBff;
  }

  /* Animated mesh gradient background */
  .ldr-bg {
    position:absolute; inset:0;
    background: radial-gradient(ellipse at 20% 30%, rgba(89,231,231,0.18) 0%, transparent 55%),
                radial-gradient(ellipse at 80% 70%, rgba(245,104,203,0.18) 0%, transparent 55%),
                radial-gradient(ellipse at 50% 50%, rgba(110,159,234,0.12) 0%, transparent 60%),
                #F568CBff;
    animation: bgPulse 6s ease-in-out infinite;
    background-size: 200% 200%;
  }

  /* Noise grain */
  .ldr-grain {
    pointer-events:none;
    position:absolute; inset:-50%; width:200%; height:200%;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    animation: grain 0.65s steps(1) infinite;
    opacity:0.4;
  }

  .ldr.out { animation: overlayOut 1s cubic-bezier(0.4,0,0.2,1) forwards; }

/* Corners */
.c {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 7px; /* very subtle rounding */
}

/* Top Left */
.c.tl {
  top: 24px;
  left: 24px;
  border-top: 3px solid rgb(255, 255, 255);
  border-left: 3px solid rgb(255, 255, 255);
}

/* Top Right */
.c.tr {
  top: 24px;
  right: 24px;
  border-top: 3px solid rgb(255, 255, 255);
  border-right: 3px solid rgb(255, 255, 255);
}

/* Bottom Left */
.c.bl {
  bottom: 24px;
  left: 24px;
  border-bottom: 3px solid rgb(255, 255, 255);
  border-left: 3px solid rgb(255, 255, 255);
}

/* Bottom Right */
.c.br {
  bottom: 24px;
  right: 24px;
  border-bottom: 3px solid rgb(255, 255, 255);
  border-right: 3px solid rgb(255, 255, 255);
}
  /* Icon ring */
  .ring { position:absolute; inset:0; pointer-events:none; }
  .ico {
    position:absolute; top:50%; left:50%;
    opacity:0;
    will-change:transform,opacity;
    filter: drop-shadow(0 0 6px currentColor);
  }
  .ico.show {
    animation:
      iconIn    0.85s cubic-bezier(0.22,1,0.36,1) var(--delay) both,
      iconFloat 3.8s  ease-in-out calc(var(--delay) + 0.85s) infinite both;
  }
  .ico.hide {
    animation: iconOut 0.4s cubic-bezier(0.4,0,1,1) var(--exit) both !important;
  }

  /* Name */
  .nwrap { position:relative; text-align:center; z-index:2; }

  .n {
    font-family:sans-serif;
    font-weight: 800;
    font-size: clamp(4.5rem, 12vw, 8.5rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    display: block;
    transform-origin: center center;
    will-change: transform, opacity, filter;
    background: linear-gradient(
      135deg,
      #d8f0f6    0%,
      #b8fafa        25%,
      #cadcf6 50%,
      #f3d1ee            75%,
      #ffffff  100%
    );
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .n.in  {
    animation:
      nameIn    1.1s cubic-bezier(0.22,1,0.36,1) forwards,
      shimmer   3s   linear 1.1s infinite,
      glowPulse 2.5s ease-in-out 1.5s infinite;
  }
  .n.out {
    -webkit-text-fill-color: transparent;
    animation:
      nameThrough 1.6s cubic-bezier(0.4,0,0.15,1) forwards,
      shimmer     3s  linear infinite;
  }

  .nline {
    display:block; height:1.5px; width:0;
    margin:1.2rem auto 0;
    background: linear-gradient(90deg, transparent, #59E7E7, #F568CB, transparent);
    animation: lineGrow 0.9s cubic-bezier(0.22,1,0.36,1) 1.1s forwards;
    box-shadow: 0 0 8px rgba(89,231,231,0.5);
  }

  .nsub {
    font-family:'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.72rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: #ffffff;
    margin-top: 1rem;
    opacity: 0;
    animation: subIn 0.9s ease 1.6s forwards;
  }

  /* Page */
  .page {
    min-height:100vh;
    background: #F568CBff;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    position: relative;
    overflow: hidden;
  }
  .page::before {
    content:'';
    position:absolute; inset:0;
    background: radial-gradient(ellipse at 20% 30%, rgba(89,231,231,0.12) 0%, transparent 55%),
                radial-gradient(ellipse at 80% 70%, rgba(245,104,203,0.12) 0%, transparent 55%);
  }
  .page h1 {
    font-family:'Syne',sans-serif; font-weight:800;
    font-size:clamp(3.5rem,9vw,7rem);
    letter-spacing:0.18em; text-transform:uppercase;
    background: linear-gradient(135deg, #d6eff5, #c5ffff, #c8deff, #f5d2f0, #ffffff);
    background-size: 300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation: pageIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both,
               shimmer 3s linear 1.3s infinite;
    position: relative;
  }
  .page hr {
    border:none; height:1.5px; width:55px;
    background: linear-gradient(90deg, #59E7E7, #F568CB);
    margin:1.5rem auto 0;
    box-shadow: 0 0 10px rgba(89,231,231,0.5);
    opacity:0; animation: pageIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }
  .page p {
    font-family:'Montserrat',sans-serif; font-weight:300;
    font-size:0.7rem; letter-spacing:0.45em; text-transform:uppercase;
    color:#B8E7F3; margin-top:1rem;
    opacity:0; animation: pageIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.65s both;
  }
`;

/* ─── Component ─────────────────────────────────────────────── */
export default function Loader() {
  const [stage, setStage] = useState("in");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("out"),  2800);
    const t2 = setTimeout(() => setStage("done"), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (stage === "done") return (
    <>
      <style>{css}</style>
      <div className="page">
        <h1>Sahar</h1>
        <hr />
        <p>Creative &amp; Developer</p>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className={`ldr${stage === "out" ? " out" : ""}`}
           style={{ animationDelay: stage === "out" ? "0.7s" : "0s" }}>

        <div className="ldr-bg" />
        <div className="ldr-grain" />

        {/* Corners */}
        <div className="c tl"/><div className="c tr"/>
        <div className="c bl"/><div className="c br"/>

        {/* Icon ring */}
        <div className="ring">
          {icons.map((ic, i) => {
            const rad = (ic.angle - 90) * (Math.PI / 180);
            const x   = Math.cos(rad) * ic.radius;
            const y   = Math.sin(rad) * ic.radius;
            const pos = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

            return (
              <div
                key={ic.label}
                className={`ico ${stage === "out" ? "hide" : "show"}`}
                style={{
                  "--ip":    pos,
                  "--delay": `${0.22 + i * 0.09}s`,
                  "--exit":  `${i * 0.04}s`,
                  transform: pos,
                  color:     ic.color,
                }}
              >
                {ic.svg}
              </div>
            );
          })}
        </div>

        {/* Name */}
        <div className="nwrap">
          <span className={`n ${stage === "out" ? "out" : "in"}`}>Sahar</span>
          {stage === "in" && (
            <>
              <span className="nline" />
              <p className="nsub">Creative &amp; Developer</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}