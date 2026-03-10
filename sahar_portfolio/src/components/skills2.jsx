import { useState, useEffect, useRef, useMemo } from "react";

const skills = [
  { name: "React",      color: "#60A5FA", emoji: "⚛️" },  // soft blue
  { name: "TypeScript", color: "#818CF8", emoji: "🔷" },  // indigo
  { name: "Node.js",    color: "#5EEAD4", emoji: "🟩" },  // tiffany mint
  { name: "CSS",        color: "#38BDF8", emoji: "🎨" },  // sky blue
  { name: "Python",     color: "#A78BFA", emoji: "🐍" },  // soft purple
  { name: "GraphQL",    color: "#F0ABFC", emoji: "◈"  },  // light pink
  { name: "Docker",     color: "#22D3EE", emoji: "🐳" },  // cyan
  { name: "Git",        color: "#C084FC", emoji: "🌿" },  // lavender
  { name: "Figma",      color: "#F9A8D4", emoji: "🖌️" },  // pastel pink
  { name: "AWS",        color: "#67E8F9", emoji: "☁️" },  // icy blue
  { name: "PostgreSQL", color: "#93C5FD", emoji: "🐘" },  // light blue
  { name: "Redux",      color: "#A78BFA", emoji: "🔮" },  // violet
  { name: "Rust",       color: "#C4B5FD", emoji: "⚙️" },  // pale purple
  { name: "Swift",      color: "#F5D0FE", emoji: "🦅" },  // soft lilac pink
  { name: "Tailwind",   color: "#5EEAD4", emoji: "💨" },  // mint
  { name: "Firebase",   color: "#7DD3FC", emoji: "🔥" },  // light cyan
  { name: "Next.js",    color: "#A5B4FC", emoji: "▲"  },  // cool indigo
  { name: "MongoDB",    color: "#99F6E4", emoji: "🍃" },  // pale tiffany
];



function useStableRandom(count) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    rotation:  (Math.random() - 0.5) * 20,
    xOffset:   (Math.random() - 0.5) * 50,
    flyX:      (Math.random() - 0.5) * 400,
    flyY:      -(100 + Math.random() * 250), // fly upward when scrolling past
    fallFrom:  -(180 + Math.random() * 200), // start high above
    // stagger offset: each button starts falling slightly later (by index)
    stagger:   i / (count - 1), // 0 to 1
  })), [count]);
}

function SkillButton({ skill, rand, progress }) {
  const [hovered, setHovered] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [particles, setParticles] = useState([]);

  // Each button has its own staggered fall window within 0→0.55 phase
  // Button i starts falling when progress reaches its stagger offset
  // Fall-in window: staggered across 0.0 → 0.55
  // Fly-apart window: 0.6 → 1.0

  let translateY, translateX, rotate, opacity;

  const FALL_END = 0.58;
  const FLY_START = 0.62;

  if (progress < FLY_START) {
    // FALLING PHASE — staggered per button
    // Button starts animating at: stagger * 0.35 (so first starts at 0, last at 0.35)
    const startAt = rand.stagger * 0.32;
    const endAt = startAt + 0.26; // each button's fall takes 0.26 of progress
    const t = Math.max(0, Math.min(1, (progress - startAt) / (endAt - startAt)));

    // Gravity feel: slow start, fast drop, slight overshoot
    const eased = t === 0 ? 0 : t < 0.7
      ? 2 * t * t                         // accelerate (gravity)
      : 1 - Math.pow(-2 * t + 2, 2) / 2; // decelerate with slight bounce

    translateY = rand.fallFrom * (1 - eased);
    translateX = rand.xOffset * (1 - eased * 0.6);
    rotate = rand.rotation * (1 - eased);
    opacity = Math.min(1, t * 3); // fade in quickly at start of fall
  } else {
    // FLY APART PHASE
    const t = Math.max(0, Math.min(1, (progress - FLY_START) / (1 - FLY_START)));
    const eased = t * t * t;
    translateY = rand.flyY * eased;
    translateX = rand.xOffset + rand.flyX * eased;
    rotate = rand.rotation + rand.rotation * 6 * eased;
    opacity = 1 - Math.min(1, t * 1.4);
  }

  const handleMouseEnter = () => {
    setHovered(true);
    setParticles(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      distance: 30 + Math.random() * 30,
      size: 4 + Math.random() * 6,
    })));
  };
  const handleMouseLeave = () => { setHovered(false); setParticles([]); setExploded(false); };
  const handleClick = () => { setExploded(true); setTimeout(() => setExploded(false), 600); };

  return (
    <div style={{
      display: "inline-block",
      margin: "8px",
      transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg)`,
      opacity: Math.max(0, opacity),
      position: "relative",
      willChange: "transform, opacity",
    }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", top: "50%", left: "50%",
          width: p.size, height: p.size, borderRadius: "50%",
          background: skill.color,
          transform: hovered
            ? `translate(-50%,-50%) translate(${Math.cos(p.angle * Math.PI / 180) * p.distance}px,${Math.sin(p.angle * Math.PI / 180) * p.distance}px) scale(1)`
            : `translate(-50%,-50%) scale(0)`,
          opacity: hovered ? 0 : 1,
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease 0.3s",
          pointerEvents: "none", zIndex: 0,
          boxShadow: `0 0 6px ${skill.color}`,
        }} />
      ))}

      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          position: "relative", zIndex: 1,
          padding: "10px 20px",
          border: `2px solid ${hovered ? skill.color : "rgb(174, 201, 243)"}`,
          borderRadius: "999px",
          background: hovered ? `${skill.color}18` : "rgba(255,255,255,0.9)",
          color: hovered ? skill.color : "#444",
          fontSize: "14px",
          fontFamily: "'Space Mono', monospace",
          fontWeight: "700",
          letterSpacing: "0.04em",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          boxShadow: hovered
            ? `0 0 20px ${skill.color}44, 0 0 40px ${skill.color}18`
            : "0 2px 8px rgba(0,0,0,0.08)",
          transform: exploded ? "scale(1.2)" : hovered ? "scale(1.08) translateY(-3px)" : "scale(1)",
          transition: "border 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          outline: "none", whiteSpace: "nowrap",
        }}
      >
        <span style={{ marginRight: "7px", fontSize: "15px" }}>{skill.emoji}</span>
        {skill.name}
        <span style={{
          position: "absolute", inset: 0, borderRadius: "999px",
          background: `linear-gradient(105deg, transparent 40%, ${skill.color}44 50%, transparent 60%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: hovered ? "right center" : "left center",
          transition: "background-position 0.6s ease",
          pointerEvents: "none",
        }} />
      </button>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const randoms = useStableRandom(skills.length);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const elH = el.offsetHeight;
      const total = winH + elH;
      const scrolled = winH - rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        // body { background: #ffffff; }

        .skills-section {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 5px;
          position: relative;
          overflow: hidden;
          // 
          // background: #ffffff;
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .bg-glow {
          position: absolute;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          pointer-events: none;
        }
        .section-title {
          font-family: sans-serif;
          font-weight: 800;
          font-size: clamp(38px, 8vw, 66px);
          color: #1a1a2e;
          letter-spacing: -0.03em;
          text-align: center;
          // margin-bottom: 16px;
          line-height: 1;
          position: relative; z-index: 2;
        }
        .section-title span {
          background: linear-gradient(135deg, #6E9FEAff, #98bff9, #bcd3f8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        // .section-sub {
        //   font-family: 'Space Mono', monospace;
        //   font-size: 12px;
        //   color: rgba(0,0,0,0.3);
        //   letter-spacing: 0.25em;
        //   text-transform: uppercase;
        //   margin-bottom: 60px;
        //   position: relative; z-index: 2;
        // }
        .skills-cloud {
        margin-top: 60px;
          max-width: 800px;
          text-align: center;
          position: relative; z-index: 2;
        }
        .spacer { height: 15vh; 
        background: #ffffff; }
      `}</style>

      <div className="spacer" />

      <section className="skills-section" ref={sectionRef}>
        <div className="bg-grid" />
        <div className="bg-glow" />
        <h2 className="section-title">what do I <span>bring </span>to the <span>table</span></h2>
        {/* <p className="section-sub">hover to ignite · click to burst</p> */}
        <div className="skills-cloud">
          {skills.map((skill, i) => (
            <SkillButton
              key={skill.name}
              skill={skill}
              rand={randoms[i]}
              progress={progress}
            />
          ))}
        </div>
      </section>

      <div className="spacer" />
    </>
  );
}