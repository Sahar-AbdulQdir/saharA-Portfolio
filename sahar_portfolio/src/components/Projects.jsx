import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import Project1 from "../pages/Project1";


const apps = [
  {
    id: 1, type: "app", name: "BSU app", subtitle: "Task Management App", date: "Aug 2025",
    video: "./bsuV2.mp4",
    details: "Cross-platform mobile app for team task management with offline mode, push notifications, and AI-assisted scheduling.",
    tech: ["React Native", "Firebase", "OpenAI"], accent: "#f97316",
  },
  {
    id: 2, type: "app", name: "Charity", subtitle: "Voice Platform App", date: "Nov 2025",
    video: "./smV.mp4",
    details: "Voice-enabled app with real-time transcription, speaker detection, and multilingual support for 40+ languages.",
    tech: ["Swift", "Whisper AI", "WebRTC"], accent: "#8b5cf6",
  },
];

const websites = [
  {
    id: 3, type: "web", name: "Lexia Minds", subtitle: "Analytics Dashboard", date: "Jan 2025",
    video: "./lexV.mp4",
    details: "Real-time analytics dashboard with live data streaming, customizable widgets, and full dark mode support.",
    tech: ["React", "D3.js", "WebSocket"], accent: "#0ea5e9",
  },
  {
    id: 4, type: "web", name: "CreativePulse", subtitle: "E-Commerce Platform", date: "Mar 2025",
    video: "./creatV.mp4",
    details: "Headless e-commerce with dynamic product pages, Stripe integration, and a CMS-powered editorial layer.",
    tech: ["Next.js", "Stripe", "Sanity"], accent: "#10b981",
  },
  {
    id: 5, type: "web", name: "Sign Language system", subtitle: "Design System Site", date: "Jun 2025",
    video: "./signV.mp4",
    details: "Documentation site for an 80+ component design system with Figma token sync and typed TypeScript APIs.",
    tech: ["TypeScript", "Storybook", "Figma"], accent: "#ec4899",
  },
];

function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: width < 600, isTablet: width >= 600 && width < 900, isDesktop: width >= 900 };
}

/* ── Tooltip ─────────────────────────────────────────────────────────── */
function Tooltip({ project, visible, direction = "right", above = false }) {
  const base = {
    position: "absolute", pointerEvents: "none", zIndex: 100, width: "220px",
    transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: visible ? 1 : 0,
  };

  const posStyle = above
    ? {
        bottom: "calc(100% + 12px)", left: "50%",
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(6px)",
      }
    : direction === "right"
    ? {
        top: "50%", left: "calc(100% + 16px)",
        transform: visible ? "translateY(-50%)" : "translateY(-50%) translateX(-8px)",
      }
    : {
        top: "50%", right: "calc(100% + 16px)",
        transform: visible ? "translateY(-50%)" : "translateY(-50%) translateX(8px)",
      };

  const arrowStyle = above
    ? {
        position: "absolute", bottom: "-8px", left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 13, height: 13, background: "#fff",
        borderRight: "1.5px solid #e5e7eb", borderBottom: "1.5px solid #e5e7eb",
      }
    : direction === "right"
    ? {
        position: "absolute", top: "50%", left: "-8px",
        transform: "translateY(-50%) rotate(45deg)",
        width: 13, height: 13, background: "#fff",
        borderLeft: "1.5px solid #e5e7eb", borderBottom: "1.5px solid #e5e7eb",
      }
    : {
        position: "absolute", top: "50%", right: "-8px",
        transform: "translateY(-50%) rotate(45deg)",
        width: 13, height: 13, background: "#fff",
        borderRight: "1.5px solid #e5e7eb", borderTop: "1.5px solid #e5e7eb",
      };

  return (
    <div style={{ ...base, ...posStyle }}>
      <div style={{
        background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "16px",
        padding: "15px 16px", boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        position: "relative",
      }}>
        <div style={arrowStyle} />
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: project.accent, margin: "0 0 6px 0" }}>Details</p>
        <p style={{ fontFamily: "'Fraunces',serif", fontSize: "12px", lineHeight: "1.6", color: "#4b5563", margin: "0 0 10px 0" }}>{project.details}</p>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", padding: "2px 7px", borderRadius: "99px", background: `${project.accent}12`, color: project.accent, border: `1px solid ${project.accent}28`, letterSpacing: "0.04em" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SectionLabel ─────────────────────────────────────────────────────── */
function SectionLabel({ label, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "8.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c4bfb8" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: "#ece9e3" }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "8.5px", color: "#d6d0c8" }}>{count}</span>
    </div>
  );
}

/* ── AppCard ──────────────────────────────────────────────────────────── */
function AppCard({ project }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useBreakpoint();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", display: "flex", gap: "16px", alignItems: "center",
        padding: isMobile ? "14px 14px" : "18px 20px",
        background: hovered ? "#fff" : "transparent",
        borderRadius: "20px", border: "1.5px solid",
        borderColor: hovered ? `${project.accent}45` : "#ece9e3",
        transition: "all 0.3s ease", cursor: "pointer",
        boxShadow: hovered ? `0 10px 36px ${project.accent}18` : "none",
      }}
    >
      <Tooltip project={project} visible={hovered} direction={isMobile ? "right" : "right"} above={isMobile} />

      {/* Phone mockup */}
      <div style={{
        flexShrink: 0,
        width: isMobile ? "90px" : "120px",
        height: isMobile ? "140px" : "190px",
        borderRadius: "14px", overflow: "hidden",
        border: "2px solid #e5e7eb",
        boxShadow: hovered ? `0 8px 28px ${project.accent}30` : "0 3px 12px rgba(0,0,0,0.09)",
        transition: "all 0.3s ease",
        transform: hovered ? "scale(1.05) rotate(-1.5deg)" : "scale(1) rotate(0)",
        background: "#111", position: "relative",
      }}>
        <video src={project.video} autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "filter 0.3s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 55%)", pointerEvents: "none" }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "inline-block", fontFamily: "'DM Mono',monospace", fontSize: "8px", letterSpacing: "0.13em", textTransform: "uppercase", color: project.accent, background: `${project.accent}12`, border: `1px solid ${project.accent}22`, padding: "2px 8px", borderRadius: "99px", marginBottom: "6px" }}>App</div>
<button
  onClick={() => navigate("/Project1")}
  style={{
    fontFamily: "'Fraunces',serif",
    fontWeight: "700",
    fontSize: isMobile ? "18px" : "22px",
    color: "#111827",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    marginBottom: "3px",
    background: "none",
    border: "none"
  }}
>
  {project.name}
</button>        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#9ca3af", marginBottom: "6px" }}>{project.subtitle}</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", color: "#d1d5db", letterSpacing: "0.04em" }}>{project.date}</div>
      </div>

      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: hovered ? project.accent : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease", flexShrink: 0 }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke={hovered ? "#fff" : "#9ca3af"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

/* ── WebCardFeatured ──────────────────────────────────────────────────── */
function WebCardFeatured({ project }) {
  const [hovered, setHovered] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const height = isMobile ? "180px" : isTablet ? "200px" : "230px";

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative", cursor: "pointer" }}>
      <Tooltip project={project} visible={hovered} direction="left" above={isMobile} />

      <div style={{
        borderRadius: "22px", overflow: "hidden", height,
        border: "1.5px solid", borderColor: hovered ? `${project.accent}55` : "#ece9e3",
        boxShadow: hovered ? `0 20px 56px ${project.accent}22,0 4px 16px rgba(0,0,0,0.07)` : "0 4px 18px rgba(0,0,0,0.06)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "scale(1.012)" : "scale(1)",
        position: "relative", background: "#111",
      }}>
        <video src={project.video} autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "filter 0.35s ease" }}
        />
        <div style={{ position: "absolute", top: "12px", left: "12px", fontFamily: "'DM Mono',monospace", fontSize: "8.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.15)" }}>Website · Featured</div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent)", pointerEvents: "none" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "13px", paddingLeft: "2px", paddingRight: "2px" }}>
        <div>
          <button style={{ fontFamily: "'Fraunces',serif", fontWeight: "700", fontSize: "21px", color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.05, background: "none", border: "none" }}>{project.name}</button>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#9ca3af", marginTop: "3px" }}>{project.subtitle}</div>
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#d1d5db", letterSpacing: "0.04em", flexShrink: 0, marginLeft: "12px", paddingBottom: "2px" }}>{project.date}</span>
      </div>
      <div style={{ height: "2px", borderRadius: "99px", marginTop: "9px", background: project.accent, width: hovered ? "100%" : "0%", transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
}

/* ── WebCardSmall ─────────────────────────────────────────────────────── */
function WebCardSmall({ project }) {
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useBreakpoint();

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative", cursor: "pointer" }}>
      <Tooltip project={project} visible={hovered} direction="left" above={isMobile} />

      <div style={{
        borderRadius: "18px", overflow: "hidden", height: isMobile ? "130px" : "156px",
        border: "1.5px solid", borderColor: hovered ? `${project.accent}50` : "#ece9e3",
        boxShadow: hovered ? `0 14px 40px ${project.accent}20,0 3px 12px rgba(0,0,0,0.06)` : "0 3px 12px rgba(0,0,0,0.05)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        position: "relative", background: "#111",
      }}>
        <video src={project.video} autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "filter 0.35s ease" }}
        />
        <div style={{ position: "absolute", top: "9px", left: "9px", fontFamily: "'DM Mono',monospace", fontSize: "7.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", padding: "2px 8px", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.15)" }}>Website</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "11px", paddingLeft: "2px", paddingRight: "2px" }}>
        <div>
          <button style={{ fontFamily: "'Fraunces',serif", fontWeight: "700", fontSize: "16px", color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.1, background: "none", border: "none" }}>{project.name}</button>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", color: "#9ca3af", marginTop: "2px" }}>{project.subtitle}</div>
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", color: "#d1d5db", letterSpacing: "0.04em", flexShrink: 0, marginLeft: "8px" }}>{project.date}</span>
      </div>
      <div style={{ height: "1.5px", borderRadius: "99px", marginTop: "8px", background: project.accent, width: hovered ? "100%" : "0%", transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function ProjectCards() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Layout modes:
  // Desktop (≥900px): 2-col asymmetric — apps left, websites right
  // Tablet (600–899px): stacked — websites section first (featured + 2 small grid), then apps
  // Mobile (<600px): fully stacked, single column, small cards

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7f5f0; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#ffffff", marginTop: "20rem", padding: isMobile ? "36px 20px 60px" : isTablet ? "48px 32px 72px" : "56px 44px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? "36px" : "52px" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b5b0a6", marginBottom: "12px" }}>Portfolio · 2025</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: "700", fontSize: isMobile ? "32px" : isTablet ? "42px" : "clamp(34px,4.5vw,52px)", color: "#111827", lineHeight: 1.05, letterSpacing: "-0.03em" }}>Selected Projects</h1>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#c4bfb8", letterSpacing: "0.06em" }}>05</span>
          </div>
        </div>

        {/* ── DESKTOP: side-by-side ── */}
        {isDesktop && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "32px", maxWidth: "1080px", alignItems: "start" }}>
            <div>
              <SectionLabel label="Mobile Apps" count="02" />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {apps.map(p => <AppCard key={p.id} project={p} />)}
              </div>
            </div>
            <div>
              <SectionLabel label="Websites" count="03" />
              <div style={{ marginBottom: "20px" }}><WebCardFeatured project={websites[0]} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <WebCardSmall project={websites[1]} />
                <WebCardSmall project={websites[2]} />
              </div>
            </div>
          </div>
        )}

        {/* ── TABLET: stacked, websites on top ── */}
        {isTablet && (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px", maxWidth: "720px" }}>
            <div>
              <SectionLabel label="Websites" count="03" />
              <div style={{ marginBottom: "18px" }}><WebCardFeatured project={websites[0]} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <WebCardSmall project={websites[1]} />
                <WebCardSmall project={websites[2]} />
              </div>
            </div>
            <div>
              <SectionLabel label="Mobile Apps" count="02" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {apps.map(p => <AppCard key={p.id} project={p} />)}
              </div>
            </div>
          </div>
        )}

        {/* ── MOBILE: fully stacked single column ── */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <div>
              <SectionLabel label="Websites" count="03" />
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <WebCardFeatured project={websites[0]} />
                <WebCardSmall project={websites[1]} />
                <WebCardSmall project={websites[2]} />
              </div>
            </div>
            <div>
              <SectionLabel label="Mobile Apps" count="02" />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {apps.map(p => <AppCard key={p.id} project={p} />)}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}