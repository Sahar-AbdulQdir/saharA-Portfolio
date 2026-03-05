// src/components/SkillsSection.jsx
import { useState, useEffect } from "react";
import SkillCard from "./SkillsCard";

const skills = [
  {
    id: 1,
    title: "Web Development",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    description: "Crafting performant, accessible web experiences with modern frameworks and clean architecture.",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    accent: "#00E5FF",
    level: 92,
  },
  {
    id: 2,
    title: "App Development",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="3" />
        <path d="M11 18h2" />
      </svg>
    ),
    description: "Building cross-platform mobile apps with native performance and seamless user flows.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    accent: "#FF6B6B",
    level: 85,
  },
  {
    id: 3,
    title: "Machine Learning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      </svg>
    ),
    description: "Developing intelligent systems and predictive models that transform raw data into actionable insight.",
    tags: ["Python", "TensorFlow", "PyTorch", "scikit-learn"],
    accent: "#B06EFF",
    level: 78,
  },
  {
    id: 4,
    title: "UI/UX Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" />
      </svg>
    ),
    description: "Designing intuitive interfaces that delight users through thoughtful interaction and visual harmony.",
    tags: ["Figma", "Prototyping", "Design Systems", "Research"],
    accent: "#FFD166",
    level: 88,
  },
];

export default function SkillsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorations */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #3a1f6e22 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #00E5FF0a 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1100px", width: "100%", position: "relative" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "64px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#00E5FF12",
                border: "1px solid #00E5FF25",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00E5FF",
                  boxShadow: "0 0 8px #00E5FF",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#00E5FF",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Skills
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "#f0f0ff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              What I{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #B06EFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                bring
              </span>{" "}
              to the table
            </h2>
            {/* <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#55557a",
                marginTop: "16px",
                maxWidth: "480px",
                margin: "16px auto 0",
                lineHeight: 1.7,
              }}
            >
              A multidisciplinary skill set spanning the full spectrum of digital
              product creation.
            </p> */}
          </div>

          {/* Grid */}
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}