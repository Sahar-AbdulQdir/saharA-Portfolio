import { useState, useEffect } from "react";
import "../styles/Projects.css"; // Link to the external CSS

const projects = [
  {
    id: 1,
    title: "Neon Horizon",
    subtitle: "Immersive AR experience",
    image: "https://picsum.photos/seed/tech1/900/600",
    accent: "#ff6b35",
    span: 2,
  },
  {
    id: 2,
    title: "Void Studio",
    subtitle: "Digital identity system",
    image: "https://picsum.photos/seed/arch2/600/600",
    accent: "#a8ff78",
    span: 1,
  },
  {
    id: 3,
    title: "Drift",
    subtitle: "Motion design toolkit",
    image: "https://picsum.photos/seed/motion3/600/600",
    accent: "#78a8ff",
    span: 1,
  },
  {
    id: 4,
    title: "Marble OS",
    subtitle: "Next-gen interface paradigm",
    image: "https://picsum.photos/seed/marble4/600/600",
    accent: "#f7d794",
    span: 1,
  },
  {
    id: 5,
    title: "Pulse",
    subtitle: "Real-time data visualized",
    image: "https://picsum.photos/seed/data5/900/600",
    accent: "#ff78c4",
    span: 2,
  },
];

const ArrowIcon = ({ filled, color }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 16L16 4M16 4H7M16 4V13"
      stroke={filled ? "#000" : color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const transitionStyle = {
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms,
                 transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
  };

  return (
    <div
      className={`project-card span-${project.span} ${hovered ? 'hovered' : ''} ${visible ? 'visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...transitionStyle,
        boxShadow: hovered
          ? `0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px ${project.accent}44`
          : "0 6px 28px rgba(0,0,0,0.35)",
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="project-image"
      />

      <div 
        className="gradient-overlay"
        style={{
          background: `linear-gradient(160deg, rgba(0,0,0,0.6) 0%, transparent 55%, ${project.accent}18 100%)`,
        }}
      />

      <div 
        className="hover-border"
        style={{ borderColor: project.accent }}
      />

      <div className="card-content">
        <div className="card-header">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>

          <div
            className="arrow-button"
            style={{
              borderColor: project.accent,
              background: hovered ? project.accent : "rgba(0,0,0,0.3)",
            }}
          >
            <ArrowIcon filled={hovered} color={project.accent} />
          </div>
        </div>

        <div
          className="accent-bar"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, ${project.accent}66)`,
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="header-tag">Selected Work</span>

          <div className="header-title-wrapper">
            <h2 className="header-title">
              Projects
              <span className="header-title-dot">.</span>
            </h2>
            <span className="header-year">2023 – 2025</span>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}