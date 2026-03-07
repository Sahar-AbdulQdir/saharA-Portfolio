import { useEffect, useRef, useState } from "react";
import "../styles/DesignPh.css";

export default function DesignPhilosophy() {
  const textRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="design-philosophy">
      <div className="icon-wrapper">
        <div className="moving-icon">✦</div>
      </div>

      <p
        ref={textRef}
        className={`philosophy-text ${visible ? "show" : ""}`}
      >
        Design should feel effortless, guide attention naturally, remove
        friction, and create meaningful experiences that users remember and
        return to again.
      </p>
    </section>
  );
}