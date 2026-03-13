import { useState, useEffect, useRef } from "react";
import  "../App.css";

const SEGMENTS = [
  { text: "I'm a passionate ", type: "normal" },
  { text: "creative developer", type: "highlight" },
  { text: " with a love for building ", type: "normal" },
  { text: "immersive digital experiences", type: "purple" },
  { text: ". My journey began in ", type: "normal" },
  { text: "graphic design", type: "highlight" },
  { text: " and evolved into ", type: "normal" },
  { text: "front-end architecture", type: "purple" },
  { text: ", allowing me to blend aesthetics with interactivity. ", type: "normal" },
  { text: "I believe the best designs tell a story and evoke emotion.", type: "italic-glow" },
  { text: " Currently based in ", type: "normal" },
  { text: "UAE", type: "highlight" },
  { text: ", I'm available for freelance projects and collaborations that push creative boundaries.", type: "normal" },
];

function buildWords() {
  const tokens = [];
  SEGMENTS.forEach((seg) => {
    seg.text.split(/(\s+)/).forEach((part) => {
      if (part === "") return;
      tokens.push({ word: part, type: /^\s+$/.test(part) ? "space" : seg.type });
    });
  });
  return tokens;
}

const WORDS = buildWords();
const HEADING = "Creative developer";

// Animated blob positions driven by sine waves
function useBlobAnimation() {
  const [blobs, setBlobs] = useState([
    { x: 20, y: 20 }, { x: 75, y: 60 }, { x: 50, y: 80 },
    { x: 85, y: 15 }, { x: 10, y: 70 },
  ]);
  const t = useRef(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      t.current += 0.003;
      setBlobs([
        { x: 20 + Math.sin(t.current * 0.7) * 15,       y: 20 + Math.cos(t.current * 0.5) * 12 },
        { x: 75 + Math.cos(t.current * 0.4) * 18,       y: 60 + Math.sin(t.current * 0.6) * 14 },
        { x: 50 + Math.sin(t.current * 0.9 + 1) * 20,   y: 80 + Math.cos(t.current * 0.3) * 10 },
        { x: 85 + Math.cos(t.current * 0.5 + 2) * 10,   y: 15 + Math.sin(t.current * 0.8) * 16 },
        { x: 10 + Math.sin(t.current * 0.6 + 3) * 12,   y: 70 + Math.cos(t.current * 0.7) * 14 },
      ]);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return blobs;
}

export default function AboutMe() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [revealed, setRevealed] = useState(0);
  const [contentIn, setContentIn] = useState(false);
  const [chars, setChars] = useState([]);
  const [hoveredWord, setHoveredWord] = useState(null);
  const intervalRef = useRef(null);
  const blobs = useBlobAnimation();

  // Mouse tracking for extra glow that follows cursor
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Entrance sequence
  useEffect(() => {
    const t1 = setTimeout(() => setContentIn(true), 200);
    let ci = 0;
    const t2 = setTimeout(() => {
      const hi = setInterval(() => {
        ci++;
        setChars(HEADING.slice(0, ci).split(""));
        if (ci >= HEADING.length) clearInterval(hi);
      }, 44);
    }, 500);
    const done = 500 + HEADING.length * 44 + 250;
    let wi = 0;
    const t3 = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        wi++;
        setRevealed(wi);
        if (wi >= WORDS.length) clearInterval(intervalRef.current);
      }, 36);
    }, done);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(intervalRef.current); };
  }, []);

  const showCursor = revealed < WORDS.length;

  const blobColors = [
    ["#ffffff", "#ffffff"],
    ["#ffffff", "#ffffff"],
    ["#ffffff", "#ffffff"],
    ["#ffffff", "#ffffff"],
    ["#ffffff", "#ffffff"],
  ];
  const blobSizes = [520, 420, 380, 300, 350];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400;1,500&family=Lato:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-root {
          min-height: 100vh;
          font-weight: 500;
          // background: #f0ebff;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 40px;
          position: relative; overflow: hidden;
          font-family: 'Lato', sans-serif;
          margin-top: 60px;
        }

        /* ── Animated blobs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(75px);
          pointer-events: none;
          will-change: left, top;
          mix-blend-mode: multiply;
        }

        /* Extra glow that tracks the mouse */
        .mouse-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          background: radial-gradient(circle, rgba(110, 160, 234, 0.47) 0%, rgba(110, 160, 234, 0.24) 40%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: left 0.08s linear, top 0.08s linear;
          mix-blend-mode: multiply;
          z-index: 1;
        }

        /* ── Content ── */
        .ab-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.23,1,0.32,1);
        }
        .ab-content.in { opacity: 1; transform: translateY(0); }

        /* Label */
        .ab-label {
          font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
          color: #0E1F4Bff; margin-bottom: 22px;
          opacity: 0; transition: opacity 0.7s ease 0.3s;
        }
        .ab-content.in .ab-label { opacity: 1; }

        /* Heading */
        .ab-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 6.5vw, 60px);
          font-weight: 400; 
          color: #000000;
          margin-bottom: 12px; min-height: 1.2em;
        }
        .ab-heading .line2 {
          font-style: italic; color: #837ef5;
        }

        .h-cursor {
          display: inline-block; width: 3px; height: 0.8em;
          background: rgb(0, 0, 0); margin-left: 4px; vertical-align: middle;
          border-radius: 2px; animation: blink 0.85s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Divider */
        .ab-divider {
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #6E9FEAff, rgb(140, 178, 235) 50%, transparent);
          border-radius: 2px; margin: 32px 0;
          transition: width 1.2s cubic-bezier(0.23,1,0.32,1) 0.4s;
        }
        .ab-content.in .ab-divider { width: 100%; }

        /* Paragraph */
        .ab-para {
          font-size: clamp(16px, 2.1vw, 18.5px);
          line-height: 1.95; color: rgb(0, 0, 0); font-weight: 300;
          min-height: 8em;
        }

        /* Words */
        .w {
          display: inline;
          opacity: 0; transform: translateY(7px);
          transition: opacity 0.3s ease, transform 0.3s ease,
                      color 0.15s ease, text-shadow 0.15s ease,
                      letter-spacing 0.15s ease;
          cursor: default;
        }
        .w.show { opacity: 1; transform: translateY(0); }

        .w.highlight { color: #837ef5; font-weight: 400; }
        .w.purple    { color: #8580ee; font-weight: 400; }
        .w.italic-glow {
          font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.07em;
          background: linear-gradient(120deg, #6c66e0, #7f7add, #aba8ea);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Word hover */
        .w.show:not(.italic-glow):hover {
          color: #837ef5 !important;
          text-shadow: 0 0 20px rgba(109,40,217,0.5), 0 0 50px rgba(167,139,250,0.25);
          letter-spacing: 0.04em;
          transform: translateY(-3px) scale(1.08);
          -webkit-text-fill-color: unset;
        }
        .w.near {
          color: #9b96f4 !important;
          text-shadow: 0 0 12px rgba(124,58,237,0.3);
          transform: translateY(-1px);
          -webkit-text-fill-color: unset;
        }

        /* Typing cursor */
        .p-cursor {
          display: inline-block; width: 2px; height: 0.9em;
          background: #88b1ef; margin-left: 2px; vertical-align: middle;
          border-radius: 1px; animation: blink 0.7s step-end infinite;
        }

        /* Footer */
        .ab-footer {
          display: flex; align-items: center; gap: 10px;
          margin-top: 40px; opacity: 0; transition: opacity 0.8s ease;
        }
        .ab-footer.show { opacity: 1; }

        .ab-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #6E9FEAff; flex-shrink: 0;
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
          60%      { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
        }
        .ab-status { font-size: 12px; letter-spacing: 0.08em; color: #0E1F2F; }

        @media (max-width: 600px) {
          .ab-root { padding: 60px 24px; }
        }
      `}</style>

      <div className="ab-root">
        {/* Animated blobs */}
        {blobs.map((b, i) => (
          <div
            key={i}
            className="blob"
            style={{
              width: blobSizes[i],
              height: blobSizes[i],
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${blobColors[i][0]} 0%, ${blobColors[i][1]} 50%, transparent 100%)`,
              opacity: 0.55 + i * 0.04,
            }}
          />
        ))}

        {/* Mouse-tracking glow */}
        <div
          className="mouse-glow"
          style={{ left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%` }}
        />

        {/* Text content */}
        <div className={`ab-content ${contentIn ? "in" : ""}`}>
          <p className="ab-label">About me</p>

          <h1 className="ab-heading">
            {chars.slice(0, 9).join("")}
            {chars.length > 0 && chars.length < 9 && <span className="h-cursor" />}
            {chars.length >= 9 && (
              <span className="line2">
                {chars.slice(9).join("")}
                {chars.length < HEADING.length && <span className="h-cursor" />}
              </span>
            )}
          </h1>

          <div className="ab-divider" />

          <p className="ab-para">
            {WORDS.map((token, i) => {
              if (token.type === "space") return i < revealed ? " " : null;
              const isNear = hoveredWord !== null && Math.abs(i - hoveredWord) <= 2 && i !== hoveredWord;
              return (
                <span
                  key={i}
                  className={`w ${token.type} ${i < revealed ? "show" : ""} ${isNear && i < revealed ? "near" : ""}`}
                  onMouseEnter={() => setHoveredWord(i)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {token.word}
                </span>
              );
            })}
            {showCursor && revealed > 0 && <span className="p-cursor" />}
          </p>

          <div className={`ab-footer ${revealed >= WORDS.length ? "show" : ""}`}>
            <span className="ab-dot" />
            <span className="ab-status">Available for freelance · UAE, Shj</span>
          </div>
        </div>
      </div>
    </>
  );
}