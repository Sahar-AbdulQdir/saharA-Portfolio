// src/components/SkillCard.jsx
import { useState, useEffect } from "react";

export default function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(145deg, #181828 0%, #1e1e35 100%)`
          : "linear-gradient(145deg, #12121f 0%, #181828 100%)",
        border: `1px solid ${hovered ? skill.accent + "55" : "#ffffff12"}`,
        borderRadius: "20px",
        padding: "32px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: animated
          ? hovered
            ? "translateY(-8px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(30px) scale(0.96)",
        opacity: animated ? 1 : 0,
        boxShadow: hovered
          ? `0 24px 60px ${skill.accent}22, 0 0 0 1px ${skill.accent}33`
          : "0 4px 24px #00000040",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: skill.accent,
          opacity: hovered ? 0.08 : 0.03,
          filter: "blur(40px)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: `${skill.accent}18`,
          border: `1px solid ${skill.accent}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "22px",
          color: skill.accent,
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div style={{ width: "24px", height: "24px" }}>{skill.icon}</div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#f0f0ff",
          marginBottom: "10px",
          letterSpacing: "-0.01em",
        }}
      >
        {skill.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          lineHeight: 1.65,
          color: "#8888aa",
          marginBottom: "24px",
        }}
      >
        {skill.description}
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: "#55557a",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Proficiency
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: skill.accent,
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div
          style={{
            height: "3px",
            background: "#ffffff0f",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: animated ? `${skill.level}%` : "0%",
              background: `linear-gradient(90deg, ${skill.accent}99, ${skill.accent})`,
              borderRadius: "2px",
              transition: "width 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
              boxShadow: `0 0 10px ${skill.accent}88`,
            }}
          />
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {skill.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: hovered ? skill.accent : "#6666aa",
              background: hovered ? `${skill.accent}15` : "#ffffff08",
              border: `1px solid ${
                hovered ? skill.accent + "33" : "#ffffff0f"
              }`,
              borderRadius: "6px",
              padding: "3px 10px",
              transition: "all 0.3s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}