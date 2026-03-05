import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');

  :root {
    --bg:     #08080d;
    --card:   #0e0e16;
    --border: rgba(255,255,255,0.06);
    --accent: #920eac;
    --gold:   #763198;
    --glow:   rgba(201,169,110,0.18);
    --text:   #f4f0ea;
    --muted:  #5a5a72;
    --muted2: #3a3a52;
  }

  .pf-footer {
    position: relative;
    overflow: hidden;
    background: var(--bg);
    font-family: 'Syne', sans-serif;
  }

  .pf-rule {
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%, var(--muted2) 30%,
      var(--gold) 50%, var(--muted2) 70%, transparent 100%);
    opacity: 0;
    transform: scaleX(0.4);
    animation: pf-ruleIn 1s cubic-bezier(0.16,1,0.3,1) forwards 0.2s;
  }

  .pf-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .pf-blob-1 {
    width: 500px; height: 300px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%);
    top: -80px; left: -100px;
  }
  .pf-blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(ellipse, rgba(100,100,200,0.04) 0%, transparent 70%);
    bottom: -100px; right: 0;
  }

  .pf-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .pf-wrap {
    position: relative;
    z-index: 1;
    max-width: 1120px;
    margin: 0 auto;
    padding: 90px 48px 52px;
  }

  .pf-main {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 80px;
    align-items: end;
    margin-bottom: 72px;
  }

  .pf-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    opacity: 0;
    animation: pf-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.4s;
  }
  .pf-eyebrow-line {
    width: 28px; height: 1px;
    background: var(--gold);
  }
  .pf-eyebrow-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.35em;
    color: var(--gold);
    text-transform: uppercase;
  }

  .pf-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7.5vw, 100px);
    font-weight: 600;
    line-height: 0.92;
    color: var(--text);
    letter-spacing: -0.02em;
    opacity: 0;
    animation: pf-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.55s;
  }
  .pf-name-italic {
    font-style: italic;
    font-weight: 300;
    color: var(--gold);
  }

  .pf-tagline {
    margin-top: 22px;
    font-size: 13px;
    font-weight: 400;
    color: var(--muted);
    letter-spacing: 0.03em;
    line-height: 1.8;
    opacity: 0;
    animation: pf-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.7s;
  }

  .pf-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 28px;
    padding-bottom: 8px;
    opacity: 0;
    animation: pf-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.75s;
  }

  .pf-icon-row {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .pf-icon-btn {
    position: relative;
    width: 52px; height: 52px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.3s, border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    overflow: visible;
  }
  .pf-icon-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: radial-gradient(circle at 50% 120%, var(--glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .pf-icon-btn:hover::before { opacity: 1; }
  .pf-icon-btn:hover {
    color: var(--gold);
    border-color: rgba(201,169,110,0.35);
    background: rgba(201,169,110,0.05);
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(201,169,110,0.1);
  }
  .pf-icon-btn svg {
    width: 20px; height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    position: relative;
    z-index: 1;
  }

  .pf-tip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: var(--card);
    border: 1px solid rgba(201,169,110,0.2);
    color: var(--gold);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 10;
  }
  .pf-tip::after {
    content: '';
    position: absolute;
    top: 100%; left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(201,169,110,0.2);
  }
  .pf-icon-btn:hover .pf-tip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .pf-resume-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    background: transparent;
    border: 1px solid rgba(201,169,110,0.4);
    color: var(--gold);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    transition: color 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .pf-resume-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .pf-resume-btn:hover::before { opacity: 1; }
  .pf-resume-btn:hover {
    color: var(--accent);
    border-color: rgba(201,169,110,0.7);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(201,169,110,0.12), 0 0 0 1px rgba(201,169,110,0.1);
  }
  .pf-resume-btn svg {
    width: 14px; height: 14px;
    fill: none; stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.3s;
    position: relative; z-index: 1;
    flex-shrink: 0;
  }
  .pf-resume-btn:hover svg { transform: translateY(2px); }
  .pf-resume-btn span { position: relative; z-index: 1; }

  .pf-marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    margin-bottom: 70px;
    opacity: 0;
    animation: pf-fadeIn 0.8s ease forwards 0.9s;
  }
  .pf-marquee-track {
    display: flex;
    animation: pf-marquee 24s linear infinite;
    width: max-content;
  }
  .pf-marquee-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 32px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    color: var(--muted2);
    text-transform: uppercase;
    white-space: nowrap;
  }
  .pf-marquee-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.5;
    flex-shrink: 0;
  }

  .pf-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 28px;
    border-top: 1px solid var(--border);
    opacity: 0;
    animation: pf-fadeIn 0.8s ease forwards 1.05s;
  }
  .pf-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--muted2);
    letter-spacing: 0.1em;
  }
  .pf-copy em {
    color: var(--muted);
    font-style: normal;
  }
  .pf-top-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: var(--muted2);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s;
  }
  .pf-top-btn:hover { color: var(--gold); }
  .pf-top-btn svg {
    width: 14px; height: 14px;
    fill: none; stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.3s;
  }
  .pf-top-btn:hover svg { transform: translateY(-4px); }

  @keyframes pf-ruleIn {
    to { opacity: 1; transform: scaleX(1); }
  }
  @keyframes pf-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pf-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pf-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @media (max-width: 700px) {
    .pf-wrap { padding: 60px 24px 40px; }
    .pf-main { grid-template-columns: 1fr; gap: 40px; }
    .pf-actions { align-items: flex-start; }
    .pf-bottom { flex-direction: column; gap: 20px; }
  }
`;

// ── SVG Icons ──────────────────────────────────────────────
const EmailIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2.5" />
    <path d="m22 6-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

// ── Marquee items ──────────────────────────────────────────
// const MARQUEE_ITEMS = [
//   "Available for opportunities",
//   "Open to collaboration",
//   "Let's build something great",
//   "Frontend · Full-Stack · Design Systems",
// ];

// ── Main Component ─────────────────────────────────────────
export default function PortfolioFooter({
  name = "Your Name",
  tagline = "Crafting thoughtful digital experiences &\nturning complex ideas into clean, elegant code.",
  email = "hello@yourname.com",
  linkedIn = "https://linkedin.com/in/yourname",
  github = "https://github.com/yourname",
  resumeUrl = "#",
  year = new Date().getFullYear(),
}) {
  const styleRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("pf-styles")) {
      const tag = document.createElement("style");
      tag.id = "pf-styles";
      tag.textContent = styles;
      document.head.appendChild(tag);
    }
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Duplicate marquee items for seamless loop
//   const allItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <footer className="pf-footer">
      <div className="pf-blob pf-blob-1" />
      <div className="pf-blob pf-blob-2" />
      <div className="pf-grain" />
      <div className="pf-rule" />

      <div className="pf-wrap">

        {/* ── Main grid ── */}
        <div className="pf-main">

          {/* LEFT: Name + tagline */}
          <div>
            <div className="pf-eyebrow">
              <div className="pf-eyebrow-line" />
              <span className="pf-eyebrow-text">Get in touch</span>
            </div>

            <h2 className="pf-name">
              {firstName}{" "}
              <span className="pf-name-italic">{lastName}</span>
            </h2>

            <p className="pf-tagline">
              {tagline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < tagline.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* RIGHT: Icons + Resume */}
          <div className="pf-actions">

            <div className="pf-icon-row">

              {/* Email */}
              <a href={`mailto:${email}`} className="pf-icon-btn" aria-label="Email">
                <span className="pf-tip">Email</span>
                <EmailIcon />
              </a>

              {/* LinkedIn */}
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="pf-icon-btn" aria-label="LinkedIn">
                <span className="pf-tip">LinkedIn</span>
                <LinkedInIcon />
              </a>

              {/* GitHub */}
              <a href={github} target="_blank" rel="noopener noreferrer" className="pf-icon-btn" aria-label="GitHub">
                <span className="pf-tip">GitHub</span>
                <GitHubIcon />
              </a>

            </div>

            {/* Resume */}
            <a href={resumeUrl} className="pf-resume-btn" download aria-label="Download Resume">
              <DownloadIcon />
              <span>Resume</span>
            </a>

          </div>
        </div>

     
        {/* <div className="pf-marquee-wrap">
          <div className="pf-marquee-track">
            {allItems.map((item, i) => (
              <span className="pf-marquee-item" key={i}>
                {item}
                <span className="pf-marquee-dot" />
              </span>
            ))}
          </div>
        </div> */}

        {/* ── Bottom bar ── */}
        <div className="pf-bottom">
          <p className="pf-copy">
            © {year} <em>{name}</em> — All rights reserved
          </p>
          <a href="#" className="pf-top-btn" onClick={scrollToTop}>
            Back to top
            <ChevronUpIcon />
          </a>
        </div>

      </div>
    </footer>
  );
}