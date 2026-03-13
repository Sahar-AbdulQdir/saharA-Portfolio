import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { id: 2, title: "CreativePulse – Digital Agency", tag: "Development", year: "2025", iframe: "https://www.dcstuds.com/post/best-of-web-dev-2-with-ms-rafia-fall2024#viewer-vegnq1316", link: "https://www.dcstuds.com/post/best-of-web-dev-2-with-ms-rafia-fall2024#viewer-vegnq1316" },
  { id: 3, title: "Petrol Chatbot & Space Data Visualisation", tag: "Data Visualisation", year: "2025", iframe: "https://www.dcstuds.com/post/best-of-emerging-technologies-with-ms-rafia-spring2025#viewer-8bgcc1946", link: "https://www.dcstuds.com/post/best-of-emerging-technologies-with-ms-rafia-spring2025#viewer-8bgcc1946" },
  { id: 4, title: "Cinema App", tag: "Development", year: "2024", iframe: "https://www.dcstuds.com/post/best-of-code-lab-2-with-ms-arshiya-fall2024#viewer-2f5ke1056", link: "https://www.dcstuds.com/post/best-of-code-lab-2-with-ms-arshiya-fall2024#viewer-2f5ke1056" },
  { id: 5, title: "2D Game", tag: "Game Design", year: "2024", iframe: "https://www.dcstuds.com/post/best-of-game-design-with-ms-mary-fall2024#viewer-j64ws6520", link: "https://www.dcstuds.com/post/best-of-game-design-with-ms-mary-fall2024#viewer-j64ws6520" },
  { id: 6, title: "Creative Coding & Interactive Art", tag: "Creative Coding", year: "2024", iframe: "https://www.dcstuds.com/post/best-of-creative-coding-spring2024#viewer-0xcrx9976", link: "https://www.dcstuds.com/post/best-of-creative-coding-spring2024#viewer-0xcrx9976" },
  { id: 7, title: "FairyCup Chandeliers", tag: "Ideation & Design", year: "2024", iframe: "https://www.dcstuds.com/post/fairycup-chandeliers-ideation-creative-problem-solving-spring24", link: "https://www.dcstuds.com/post/fairycup-chandeliers-ideation-creative-problem-solving-spring24" },
];

const ACCENTS = ["#B8E7F3", "#F568CB", "#6E9FEA", "#E393D7", "#59E7E7", "#B8E7F3", "#F568CB"];

export default function App() {
  const [vis, setVis] = useState(false);
  const [loaded, setLoaded] = useState({});
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Mono', monospace", padding: "40px 0 56px", marginTop: "50px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .head { padding: 0 44px 28px; opacity: 0; transform: translateY(-16px); transition: all .7s cubic-bezier(.22,1,.36,1); }
        .head.v { opacity: 1; transform: none; }
        .kicker { display: inline-flex; align-items: center; gap: 8px; background: #0E1F4B; color: #59E7E7; font-size: 9px; letter-spacing: .28em; text-transform: uppercase; padding: 5px 12px; border-radius: 15px; margin-bottom: 14px; }
        .kicker-dot { border-radius: 50%; background: #F568CB; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        .main-title {font-family: 'Playfair Display', serif font-size: clamp(30px, 4.5vw, 50px); font-weight: 900; color: #0E1F4B; line-height: .92; letter-spacing: -.02em; margin-bottom: 10px; }
        .main-title em { font-style: italic; color: #F568CB; }
        .subtitle { font-size: 10px; color: #6E9FEA; letter-spacing: .12em; line-height: 1.6; max-width: 600px; }
        .subtitle strong { color: #0E1F4B; }

        .rule { height: 1.5px; background: linear-gradient(90deg, #B8E7F3, #6E9FEA 25%, #F568CB 55%, #E393D7 75%, transparent); margin: 0 44px 32px; opacity: 0; transform: scaleX(0); transform-origin: left; transition: all .85s cubic-bezier(.22,1,.36,1) .2s; }
        .rule.v { opacity: 1; transform: scaleX(1); }

        .scroll { display: flex; gap: 20px; overflow-x: auto; padding: 6px 44px 24px; scrollbar-width: none; opacity: 0; transform: translateY(18px); transition: all .8s cubic-bezier(.22,1,.36,1) .35s; }
        .scroll.v { opacity: 1; transform: none; }
        .scroll::-webkit-scrollbar { display: none; }

        .card { flex: 0 0 260px; display: flex; flex-direction: column; gap: 12px; }

        .frame-wrap { position: relative; width: 360px; height: 200px; border-radius: 12px; overflow: hidden; background: #f0f5fc; border: 1.5px solid #e4ecf7; transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s; }
        .card:hover .frame-wrap { transform: translateY(-5px) scale(1.015); box-shadow: 0 16px 40px rgba(14,31,75,.13); }

        .accent-bar { position: absolute; top: 0; left: 0; right: 0; height: 3.5px; z-index: 3; }
        .win-dots { position: absolute; top: 10px; left: 11px; display: flex; gap: 5px; z-index: 3; }
        .win-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.55); }
        .award-pill { position: absolute; top: 10px; right: 10px; z-index: 3; display: flex; align-items: center; gap: 4px; background: rgba(14,31,75,.82); backdrop-filter: blur(6px); border-radius: 20px; padding: 3px 8px; font-size: 8px; letter-spacing: .14em; text-transform: uppercase; color: #fff; border: 1px solid rgba(255,255,255,.12); }

        .hover-overlay { position: absolute; inset: 0; z-index: 4; display: flex; align-items: center; justify-content: center; background: rgba(14,31,75,.55); backdrop-filter: blur(3px); opacity: 0; transition: opacity .22s ease; pointer-events: none; }
        .hover-overlay.show { opacity: 1; pointer-events: all; }

        .visit-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0E1F4B;font-size: 10px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; text-decoration: none; padding: 10px 18px; border-radius: 6px; border: none; cursor: pointer; transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s; box-shadow: 0 4px 16px rgba(14,31,75,.18); }
        .visit-btn:hover { transform: scale(1.06); box-shadow: 0 8px 24px rgba(14,31,75,.22); }
        .visit-btn svg { flex-shrink: 0; }

        .iframe-loader { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #f0f5fc; z-index: 2; transition: opacity .4s; }
        .iframe-loader.gone { opacity: 0; pointer-events: none; }
        .spinner { width: 22px; height: 22px; border: 2px solid #e4ecf7; border-radius: 50%; animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; opacity: 0; transition: opacity .5s; pointer-events: none; }
        iframe.show { opacity: 1; }

        .meta { padding: 0 3px; }
        .meta-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .meta-num { font-size: 9px; letter-spacing: .1em; font-weight: 500; }
        .meta-badge { font-size: 8px; letter-spacing: .16em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; font-weight: 500; }
        .meta-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
        .meta-title { font-size: 15px; font-weight: 700; color: #0E1F4B; line-height: 1.25; margin-bottom: 3px; }
        .meta-year { font-size: 9px; color: #aab4cc; letter-spacing: .08em; }

        .link-btn { display: inline-flex; align-items: center; gap: 5px; text-decoration: none;font-size: 9px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; padding: 6px 11px; border-radius: 6px; border: 1.5px solid; white-space: nowrap; flex-shrink: 0; transition: transform .18s cubic-bezier(.34,1.56,.64,1), background .18s, color .18s; }
        .link-btn:hover { transform: scale(1.05); }
      `}</style>

      <div className={`head${vis ? " v" : ""}`}>
        <div className="kicker">
          <span className="kicker-dot" />
          University Best of Works — Featured Selection
        </div>
        <h2 className="main-title">Awarded <em>Best</em> of Works</h2>
        <p className="subtitle">
          Projects selected by faculty members as the <strong>top submissions</strong> across the  cohort — recognized for craft, concept &amp; execution.
        </p>
      </div>

      <div className={`rule${vis ? " v" : ""}`} />

      <div className={`scroll${vis ? " v" : ""}`}>
        {PROJECTS.map((proj, i) => {
          const accent = ACCENTS[i];
          const isHovered = hovered === proj.id;
          return (
            <div
              key={proj.id}
              className="card"
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="frame-wrap">
                <div className="accent-bar" style={{ background: accent }} />
                <div className="win-dots">{[0,1,2].map(d => <div key={d} className="win-dot" />)}</div>
                <div className="award-pill">
                  <span>★</span> Best of Works
                </div>
                <div className={`iframe-loader${loaded[proj.id] ? " gone" : ""}`}>
                  <div className="spinner" style={{ borderTopColor: accent }} />
                </div>
                <iframe
                  src={proj.iframe}
                  className={loaded[proj.id] ? "show" : ""}
                  onLoad={() => setLoaded(p => ({ ...p, [proj.id]: true }))}
                  title={proj.title}
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Hover overlay with visit button */}
                <div className={`hover-overlay${isHovered ? " show" : ""}`}>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visit-btn"
                    style={{ color: accent === "#B8E7F3" || accent === "#59E7E7" ? "#0E1F4B" : "#0E1F4B" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 11L11 2M11 2H5M11 2V8" stroke="#0E1F4B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Project
                  </a>
                </div>
              </div>

              <div className="meta">
                <div className="meta-top">
                  <span className="meta-num" style={{ color: accent }}>0{i + 1}</span>
                  <span className="meta-badge" style={{ background: accent + "22", color: accent }}>{proj.tag}</span>
                </div>
                <div className="meta-bottom">
                  <div>
                    <div className="meta-title">{proj.title}</div>
                    <div className="meta-year">{proj.year}</div>
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    style={{ borderColor: accent, color: accent }}
                    onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#0E1F4B"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accent; }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Open
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}