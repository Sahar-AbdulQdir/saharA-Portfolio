import { useEffect, useRef } from "react";

const tags = [
  {
    label: "Senior\nVisual\nDesigner",
    bg: "#6B48FF",
    color: "#fff",
    style: { top: "8%", left: "50%", borderRadius: "12px", padding: "8px 14px", fontWeight: 700, fontSize: 10, lineHeight: 1.3, textAlign: "center" },
    shape: "squircle",
  },
  {
    label: "Visual Design",
    bg: "#CCFF00",
    color: "#000",
    style: { top: "28%", right: "2%", borderRadius: "999px", padding: "8px 18px", fontWeight: 700, fontSize: 10 },
    shape: "pill",
  },
  {
    label: "Branding",
    bg: "transparent",
    color: "#FF3DDB",
    border: "2px solid #FF3DDB",
    style: { top: "55%", left: "1.5%", borderRadius: "999px", padding: "7px 16px", fontWeight: 700, fontSize: 10 },
    shape: "pill-outline",
  },
  {
    label: "UX Design",
    bg: "#FF6B1A",
    color: "#fff",
    style: { top: "60%", left: "43%", borderRadius: "999px", padding: "8px 20px", fontWeight: 700, fontSize: 10 },
    shape: "pill",
  },
  {
    label: "UI Design",
    bg: "#00E5C0",
    color: "#000",
    style: { top: "73%", left: "57%", borderRadius: "999px", padding: "8px 18px", fontWeight: 700, fontSize: 10 },
    shape: "pill",
  },
];

export default function RishikeshBanner() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        background: "#0a0a0a",
        aspectRatio: "1512/480",
        overflow: "hidden",
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        userSelect: "none",
      }}
    >
      {/* Big name text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "clamp(60px, 15vw, 200px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontFamily: "'Arial Black', Arial, sans-serif",
            background: "linear-gradient(180deg, #ffffff 40%, #555555 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          RISHIKESH
        </span>
      </div>

      {/* Tags */}
      {tags.map((tag, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            background: tag.bg,
            color: tag.color,
            border: tag.border || "none",
            zIndex: 10,
            whiteSpace: "pre-line",
            lineHeight: tag.style.lineHeight || 1.2,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            ...tag.style,
          }}
        >
          {tag.label}
        </div>
      ))}

      {/* Figma icon */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "31%",
          zIndex: 10,
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "#1e1e1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 25.48 21.46 23 24.5 23H29C32.04 23 34.5 25.48 34.5 28.5C34.5 31.52 32.04 34 29 34H24.5C21.46 34 19 31.52 19 28.5Z" fill="#1ABCFE"/>
          <path d="M3.5 42.5C3.5 39.48 5.96 37 9 37H13.5H19V42.5C19 45.52 16.54 48 13.5 48C10.46 48 8 45.52 8 42.5H3.5Z" fill="#0ACF83"/>
          <path d="M19 9V23H24.5C27.54 23 30 20.52 30 17.5C30 14.48 27.54 12 24.5 12H19V9Z" fill="#FF7262"/>
          <path d="M3.5 17.5C3.5 20.52 5.96 23 9 23H19V12H9C5.96 12 3.5 14.48 3.5 17.5Z" fill="#F24E1E"/>
          <path d="M3.5 31.5C3.5 34.52 5.96 37 9 37H19V26H9C5.96 26 3.5 28.48 3.5 31.5Z" fill="#FF7262"/>
        </svg>
      </div>

      {/* Color sphere */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "38%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          boxShadow: "inset -8px -8px 16px rgba(0,0,0,0.4), inset 4px 4px 10px rgba(255,255,255,0.3)",
          filter: "saturate(1.2)",
        }}
      />

      {/* 8PX logo text */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "2%",
          zIndex: 10,
          color: "#ff2200",
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(16px, 2.5vw, 28px)",
          fontWeight: 900,
          letterSpacing: "0.05em",
        }}
      >
        8PX
      </div>
    </div>
  );
}