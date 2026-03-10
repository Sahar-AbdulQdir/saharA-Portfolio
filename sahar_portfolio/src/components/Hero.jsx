import React, { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Cormorant+Garamond:wght@300;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── MARQUEE STRIP ─────────────────────────────────── */
  .marqueeStrip {
    width: 100%;
    background: #000000;
    overflow: hidden;
    padding: 11px 0;
    border-radius: 20px 20px 0 0;
    position: relative;
    z-index: 10;
  }

  .marqueeTrack {
    display: flex;
    width: max-content;
    animation: marqueeScroll 24s linear infinite;
  }

  .marqueeTrack:hover {
    animation-play-state: paused;
  }

  .marqueeItem {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 26px;
    white-space: nowrap;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
  }

  .marqueeStar {
    color: #E393D7ff;
    font-size: 16px;
    display: inline-block;
    animation: rotateStar 5s linear infinite;
  }

  @keyframes rotateStar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── WRAPPER ───────────────────────────────────────── */
  .heroOuter {
    overflow: hidden;
  }

  /* ── HERO ──────────────────────────────────────────── */
  .hero {
    background-color: #ffffff;
    min-height: 86vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    font-family: 'Playfair Display', serif;
    position: relative;
    overflow: hidden;
  }

  /* gradient orbs */
  .hero::before {
    content: '';
    position: absolute;
    width: 640px; height: 640px; border-radius: 50%;
    background: radial-gradient(circle, #fa94dc5f 0%, transparent 70%);
    top: -130px; right: -130px;
    animation: floatOrb 9s ease-in-out infinite;
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    width: 460px; height: 460px; border-radius: 50%;
    background: radial-gradient(circle, #fbbde859 0%, transparent 70%);
    bottom: -100px; left: -30px;
    animation: floatOrb 12s ease-in-out infinite reverse;
    pointer-events: none;
  }

  @keyframes floatOrb {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(28px,-20px) scale(1.05); }
    66%      { transform: translate(-20px,14px) scale(0.95); }
  }

  /* subtle noise grain */
  .grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.45;
  }

  .container {
    position: relative; z-index: 1;
    width: 100%; max-width: 1200px;
  }

  /* ── ROLE TAGS ─────────────────────────────────────── */
  .roleWrapper {
    position: absolute;
    top: 3rem; right: 11rem;
    display: flex; flex-direction: column; align-items: flex-end;
    opacity: 0;
    animation: slideInRight 0.9s cubic-bezier(0.22,1,0.36,1) 1.3s forwards;
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .roleVisual {
    background: #05010c; color: #ffffff;
    padding: 8px 18px; border-radius: 15px;
    font-size: 30px; font-family: 'Cormorant Garamond', serif;
    font-weight: 300; letter-spacing: 2px; text-transform: lowercase;
    align-self: flex-start; transform: translateX(-30px);
    transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    cursor: default;
  }
  .roleVisual:hover {
    transform: translateX(-30px) scale(1.07);
    background: #5B21B6;
    box-shadow: 0 8px 30px rgba(76,29,149,0.45);
  }

  .roleDesigner {
    background: #000000; color: #ffffff;
    padding: 8px 18px; border-radius: 15px;
    font-size: 30px; font-family: 'Cormorant Garamond', serif;
    font-weight: 300; letter-spacing: 2px; text-transform: lowercase;
    margin-top: -1rem; transform: translateX(30px);
    transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    cursor: default;
  }
  .roleDesigner:hover {
    transform: translateX(30px) scale(1.07);
    background: #5B21B6;
    box-shadow: 0 8px 30px rgba(76,29,149,0.45);
  }

  /* ── MAIN TEXT ─────────────────────────────────────── */
  .content { text-align: left; margin-top: 40px; }

  .titleTop {
    font-size: 110px; color: #000000;
    margin: 0; margin-left: 3rem; line-height: 0.9;
    font-family: 'Playfair Display', serif; font-weight: 900;
    opacity: 0;
    animation: revealUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
    position: relative;
  }

  @keyframes lineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 40%; opacity: 1; }
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .middleRow {
    display: flex; align-items: center;
    justify-content: center; gap: 30px;
  }

  .titleBottom {
    font-size: 120px; color: #000000;
    margin: 0; margin-top: -14rem;
    font-family: 'Playfair Display', serif; font-weight: 900;
    opacity: 0;
  }
  .titleBottom.im   { animation: revealUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards; }
  .titleBottom.name {
    animation: revealUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
    font-style: italic; color: #170c2a;
  }

  /* ── IMAGE ─────────────────────────────────────────── */
  .imageContainer { position: relative; display: inline-block; }

  .imageWrapper {
    border-radius: 30px; overflow: hidden;
    box-shadow: 0 10px 30px #E393D7ff;
    opacity: 0;
    animation: revealScale 1s cubic-bezier(0.22,1,0.36,1) 0.4s forwards;
    position: relative;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
  }
  .imageWrapper:hover {
    transform: scale(1.04) rotate(-1.5deg);
    box-shadow: 0 24px 60px #E393D7ff;
  }
  .imageWrapper::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.28) 50%,transparent 60%);
    background-size: 200% 100%;
    animation: shimmer 3.5s ease-in-out 1.5s infinite;
    border-radius: 40px; pointer-events: none;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes revealScale {
    from { opacity: 0; transform: scale(0.82); }
    to   { opacity: 1; transform: scale(1); }
  }

  .image { width: 260px; height: 320px; object-fit: cover; border-radius: 40px; display: block; }

  .imageRing {
    position: absolute; inset: -14px; border-radius: 46px;
    border: 2px dashed #E393D7ff;
    animation: spinSlow 22s linear infinite;
    pointer-events: none;
  }
  .imageRing2 {
    position: absolute; inset: -28px; border-radius: 56px;
    border: 1px dotted rgba(167,139,250,0.18);
    animation: spinSlow 38s linear infinite reverse;
    pointer-events: none;
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .badge {
    position: absolute; top: -40px; right: -36px;
    background: #E393D7ff; color: #fff;
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    padding: 6px 14px; border-radius: 30px;
    opacity: 0;
    animation: revealScale 0.7s cubic-bezier(0.22,1,0.36,1) 1.1s forwards,
               bobBadge 4s ease-in-out 1.8s infinite;
    white-space: nowrap;
    box-shadow: 0 4px 14px #C28EB2;
  }
  @keyframes bobBadge {
    0%,100% { transform: translateY(0) rotate(-3deg); }
    50%      { transform: translateY(-7px) rotate(-3deg); }
  }

  /* ── PORTFOLIO ─────────────────────────────────────── */
  .portfolioWrapper {
    position: absolute; bottom: 0; left: 70px;
    display: flex; align-items: center;
    flex-direction: row-reverse; gap: 20px;
    cursor: pointer; opacity: 0;
    animation: fadeInUp 0.8s ease 1.5s forwards;
    transition: gap 0.3s ease;
  }
  .portfolioWrapper:hover { gap: 28px; }
  .portfolioWrapper:hover .arrow { transform: rotate(35deg) translateY(6px); color: #C28EB2; }
  .portfolioWrapper:hover .portfolioText { color: #C28EB2; letter-spacing: 4px; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .portfolioText {
    color: #F568CBff; font-weight: 600; letter-spacing: 2px;
    text-decoration: underline; text-transform: uppercase;
    font-family: 'Cormorant Garamond', serif; font-size: 14px;
    transition: letter-spacing 0.4s ease, color 0.3s ease;
  }

  .arrow {
    font-size: 32px; color: #F568CBff;
    transform: rotate(35deg);
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease;
    display: inline-block;
  }

  /* ── CUSTOM CURSOR ─────────────────────────────────── */
  .cursorDot {
    width: 10px; height: 10px; border-radius: 50%;
    background: #C28EB2;
    position: fixed; pointer-events: none; z-index: 9999;
    opacity: 0.6;
    transform: translate(-50%,-50%);
    transition: left 0.05s linear, top 0.05s linear;
    mix-blend-mode: multiply;
  }
  .cursorRing {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1.5px solid #C28EB2;
    position: fixed; pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    transition: left 0.16s ease, top 0.16s ease;
  }

  /* ── RESPONSIVE ────────────────────────────────────── */

  /* Tablet: 768px – 1023px */
  @media (max-width: 1023px) {
    .hero {
      padding: 40px 30px;
      min-height: auto;
      padding-bottom: 80px;
    }

    .hero::before { width: 400px; height: 400px; }
    .hero::after  { width: 300px; height: 300px; }

    .titleTop {
      font-size: 80px;
      margin-left: 1.5rem;
    }

    .titleBottom {
      font-size: 86px;
      margin-top: -10rem;
    }

    .image { width: 200px; height: 250px; }

    .roleWrapper {
      top: 1.5rem; right: 2rem;
    }
    .roleVisual  { font-size: 22px; }
    .roleDesigner { font-size: 22px; }

    .portfolioWrapper {
      left: 30px;
    }
  }

  /* Mobile: up to 767px */
  @media (max-width: 767px) {
    .marqueeItem {
      font-size: 12px;
      letter-spacing: 2px;
      padding: 0 16px;
    }

    .hero {
      padding: 24px 20px 100px;
      min-height: auto;
      align-items: flex-start;
    }

    .hero::before { width: 280px; height: 280px; top: -60px; right: -60px; }
    .hero::after  { width: 220px; height: 220px; }

    .container { padding-top: 1rem; }

    /* Role tags: move inline below name */
    .roleWrapper {
      position: static;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
      opacity: 0;
      animation: fadeInUp 0.8s ease 1.3s forwards;
    }

    .roleVisual {
      font-size: 18px;
      padding: 6px 14px;
      transform: none !important;
      align-self: auto;
    }
    .roleVisual:hover { transform: scale(1.05) !important; }

    .roleDesigner {
      font-size: 18px;
      padding: 6px 14px;
      transform: none !important;
      margin-top: 0;
    }
    .roleDesigner:hover { transform: scale(1.05) !important; }

    .content { margin-top: 20px; text-align: center; }

    .titleTop {
      font-size: 52px;
      margin-left: 0;
      text-align: center;
    }

    .middleRow {
      flex-direction: column;
      gap: 16px;
    }

    .titleBottom {
      font-size: 56px;
      margin-top: 0;
    }

    .titleBottom.im {
      order: 1;
      align-self: center;
    }

    .imageContainer {
      order: 2;
    }

    .titleBottom.name {
      order: 3;
      align-self: center;
    }

    .image { width: 180px; height: 220px; }

    .badge {
      top: -32px; right: -20px;
      font-size: 10px;
      padding: 5px 10px;
    }

    .portfolioWrapper {
      position: static;
      justify-content: center;
      margin-top: 40px;
      opacity: 0;
      animation: fadeInUp 0.8s ease 1.5s forwards;
    }

    .cursorDot, .cursorRing { display: none; }
  }

  /* Small mobile: up to 479px */
  @media (max-width: 479px) {
    .titleTop  { font-size: 42px; }
    .titleBottom { font-size: 46px; }
    .image { width: 150px; height: 185px; }
    .roleVisual, .roleDesigner { font-size: 15px; padding: 5px 11px; }
  }
`;

const MARQUEE_WORDS = [
  "Visual Design","✦","UI/UX","✦","Brand Identity","✦",
  "Motion","✦","Creative Direction","✦","Typography","✦",
  "Illustration","✦","Art Direction","✦","Digital Design","✦",
  "Visual Design","✦","UI/UX","✦","Brand Identity","✦",
  "Motion","✦","Creative Direction","✦","Typography","✦",
  "Illustration","✦","Art Direction","✦","Digital Design","✦",
];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="cursorDot"  style={{ left: mouse.x, top: mouse.y }} />
      <div className="cursorRing" style={{ left: mouse.x, top: mouse.y }} />

      <div className="heroOuter">

        {/* ── MARQUEE ── */}
        <div className="marqueeStrip">
          <div className="marqueeTrack">
            {MARQUEE_WORDS.map((w, i) =>
              w === "✦"
                ? <span key={i} className="marqueeItem"><span className="marqueeStar">✦</span></span>
                : <span key={i} className="marqueeItem">{w}</span>
            )}
          </div>
        </div>

        {/* ── HERO BODY ── */}
        <section className="hero">
          <div className="grain" />

          <div className="container">

            <div className="roleWrapper">
              <div className="roleVisual">visual</div>
              <div className="roleDesigner">designer</div>
            </div>

            <div className="content">
              <h1 className="titleTop">HELLO</h1>

              <div className="middleRow">
                <h1 className="titleBottom im">I'M</h1>

                <div className="imageContainer">
                  <div className="badge">Available ✦</div>
                  <div className="imageWrapper">
                    <img
                      src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face"
                      alt="Profile"
                      className="image"
                    />
                  </div>
                  <div className="imageRing" />
                  <div className="imageRing2" />
                </div>

                <h1 className="titleBottom name">Sahar</h1>
              </div>
            </div>

            <div className="portfolioWrapper">
              <span className="portfolioText">My <br /> portfolio</span>
              <span className="arrow">↓</span>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}