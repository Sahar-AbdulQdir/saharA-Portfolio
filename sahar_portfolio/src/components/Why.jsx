import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, x = 0, y = 28 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : `translate(${x}px,${y}px)`,
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function useWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

export default function WhyIBuild() {
  const blobRef = useRef(null);
  const width = useWidth();
  const mobile = width < 700;

  useEffect(() => {
    let frame, t = 0;
    const run = () => {
      t += 0.0025;
      if (blobRef.current)
        blobRef.current.style.transform =
          `translate(${Math.sin(t) * 18}px,${Math.cos(t * 0.7) * 14}px)`;
      frame = requestAnimationFrame(run);
    };
    run();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{ background: "#fdfcff", overflow: "hidden", position: "relative", fontFamily: "'DM Sans','Segoe UI',sans-serif", fontWeight: 300 }}>

      {/* Floating blobs */}
      <div ref={blobRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {[
          { w: 400, h: 400, bg: "#f5d0ec", op: 0.4, top: -80, right: -60 },
          { w: 280, h: 280, bg: "#cce5ff", op: 0.45, bottom: 60, left: -40 },
          { w: 200, h: 200, bg: "#a8f7f7", op: 0.35, top: "40%", right: "5%" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            filter: "blur(80px)", width: b.w, height: b.h,
            background: b.bg, opacity: b.op,
            top: b.top, right: b.right, bottom: b.bottom, left: b.left,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: mobile ? "64px 24px 72px" : "100px 40px 80px", position: "relative", zIndex: 2, marginTop: "50px" }}>

        {/* 2-col grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? "40px" : "64px 80px",
          alignItems: "start",
        }}>

          {/* LEFT */}
          <div>
            <Reveal delay={0} x={-24} y={0}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: "0.12em", color: "#b48faf", display: "block", marginBottom: 16 }}>
                01 — Why these projects
              </span>
              <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: mobile ? "22px" : "clamp(20px,2.5vw,28px)", fontWeight: 400, lineHeight: 1.15, color: "#1c1a2e", margin: "0 0 28px" }}>
                I build things that make life a little easier{" "}
                <em style={{ fontStyle: "italic", color: "#9b6baf" }}>for people who need it.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.15} x={-24} y={0}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a4760", fontWeight: 300, margin: 0 }}>
                Every project here started with a real problem — a student confused about their
                modules, a donor who can't find a way to give, someone with dyslexia who just
                wants to read without frustration. Tech is most interesting to me when it closes
                that gap. That's what brought me into this field.
              </p>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div>
            <Reveal delay={mobile ? 0.1 : 0.25}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, letterSpacing: "0.12em", color: "#b48faf", display: "block", marginBottom: 16 }}>
                02 — Why I build
              </span>
              <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: mobile ? "22px" : "clamp(20px,2.5vw,28px)", fontWeight: 400, lineHeight: 1.25, color: "#1c1a2e", margin: "0 0 28px" }}>
                If you noticed a pattern in the projects above,{" "}
                <em style={{ fontStyle: "italic", color: "#e15cd0" }}>it is intentional.</em>
              </h2>
            </Reveal>

            <Reveal delay={mobile ? 0.18 : 0.35}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4a4760", fontWeight: 300, margin: "0 0 16px" }}>
                Most of what I build is designed to solve real problems and make everyday
                experiences easier for people — sign language tools, student support systems,
                charity platforms, dashboards that simplify complexity. The goal is always the same.
              </p>

            </Reveal>
          </div>
        </div>

        {/* Divider */}
        <Reveal delay={0.1}>
          <div style={{ height: 1, margin: "12px 0 60px", background: "linear-gradient(to right,#f5d0ec,#cce5ff,#e3fbff,transparent)" }} />
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.2} y={16}>
          <p style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontStyle: "italic",
            fontSize: mobile ? "18px" : "clamp(18px,2.2vw,24px)",
            color: "#9b6baf",
            lineHeight: 1.65,
            textAlign: "center",
            // maxWidth: 560,
            margin: "0 auto",
            marginTop: "-50px"
          }}>
            "Technology becomes powerful when it solves real human problems."
          </p>
        </Reveal>

      </div>
    </div>
  );
}