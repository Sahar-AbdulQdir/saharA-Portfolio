import { useEffect, useRef, useState } from "react";
import {
  FiUsers, FiHeart, FiMapPin, FiBell, FiBook,
  FiShare2, FiEye, FiCreditCard, FiBarChart2, FiCheckCircle, FiMessageCircle
} from "react-icons/fi";

/* ── Pre-imported screen images (avoids dynamic require issues in CRA) ── */
import highFidelityMockup from "../assets/Images/smHighOverview.png";
import smHigh1  from "../assets/Images/smHigh1.png";
import smHigh2  from "../assets/Images/smHigh2.png";
import smHigh3  from "../assets/Images/smHigh3.png";
import smHigh4  from "../assets/Images/smHigh4.png";
import smHigh5  from "../assets/Images/smHigh5.png";
import smHigh6  from "../assets/Images/smHigh6.png";
import smHigh7  from "../assets/Images/smHigh7.png";
import smHigh8  from "../assets/Images/smHigh8.png";
import smHigh9  from "../assets/Images/smHigh9.png";
import smHigh10 from "../assets/Images/smHigh10.png";
import smHigh11 from "../assets/Images/smHigh11.png";
import smHigh12 from "../assets/Images/smHigh12.png";
import smHigh13 from "../assets/Images/smHigh13.png";
import appSketche1 from "../assets/Images/smSketch1.jpeg"
import appSketche2 from "../assets/Images/smSketch2.jpeg"
import appSketche3 from "../assets/Images/smSketch3.jpeg"
import appSketche4 from "../assets/Images/smSketch4.jpeg"
import appSketche5 from "../assets/Images/smSketch5.jpeg"

const hifiScreens = [smHigh1,smHigh2,smHigh3,smHigh4,smHigh5,smHigh6,smHigh7,smHigh8,smHigh9,smHigh10,smHigh11,smHigh12,smHigh13];
/* ─── PALETTE ──────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --wisteria-blue:#7DA5FEff;
  --porcelain:#FAF8F3ff;
  --lavender:#E3E9F8ff;
  --crayola-blue:#4A7DF1ff;
  --charcoal-brown:#3C3D39ff;
  --jasmine:#FADA90ff;

  --bg:var(--porcelain);
  --bg2:var(--lavender);
  --ink:var(--charcoal-brown);
  --ink-soft:#5a5b57;
  --ink-muted:#8a8b86;
  --accent:var(--crayola-blue);
  --accent-lt:var(--wisteria-blue);
  --highlight:var(--jasmine);

  --grad:linear-gradient(135deg,var(--wisteria-blue) 0%,var(--crayola-blue) 100%);
  --grad-warm:linear-gradient(135deg,var(--jasmine) 0%,#f5c55a 100%);
  --grad-soft:linear-gradient(135deg,#eef3fe 0%,var(--lavender) 100%);
  --border:#dce5f5;
  --shadow:0 20px 60px rgba(74,125,241,.12);
  --radius:18px;
}

html{scroll-behavior:smooth}
body{
// font-family:'Inter',sans-serif;
background:var(--bg);color:var(--ink);overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}

.hope-root{
// font-family:'Inter',sans-serif;
background:var(--bg);color:var(--ink);overflow-x:hidden;position:relative}
.hope-root::after{content:'';position:fixed;inset:0;z-index:9999;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  opacity:.4;pointer-events:none}

/* PROGRESS */
.hope-prog{position:fixed;top:0;left:0;height:3px;z-index:1001;background:var(--grad);transition:width .1s;box-shadow:0 0 12px rgba(74,125,241,.5)}

/* BACK */
.hope-back{position:fixed;top:16px;left:24px;z-index:200;display:flex;align-items:center;gap:7px;
  background:white;border:1.5px solid var(--border);border-radius:100px;padding:8px 16px 8px 10px;
  font-size:.76rem;font-weight:600;color:var(--ink-soft);text-decoration:none;cursor:pointer;
  box-shadow:0 4px 16px rgba(74,125,241,.1);transition:all .3s;animation:hopeFadeUp .6s .1s both}
.hope-back:hover{background:var(--accent);color:white;border-color:var(--accent);transform:translateX(-3px)}
.hope-back svg{transition:transform .3s}
.hope-back:hover svg{transform:translateX(-3px)}

/* NAV */
.hope-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;
  justify-content:flex-end;padding:20px 60px;transition:all .4s;pointer-events:none}
.hope-nav.scrolled{background:rgba(250,248,243,.95);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);padding:14px 60px;pointer-events:all;box-shadow:0 2px 20px rgba(74,125,241,.08)}
.hope-nav-links{display:flex;align-items:center;gap:24px;list-style:none}
.hope-nav-links a{font-size:.73rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink-soft);text-decoration:none;transition:color .2s}
.hope-nav-links a:hover{color:var(--accent)}
.hope-nav-links li:last-child a{background:var(--accent);color:white;border-radius:8px;padding:7px 14px}
.hope-nav-links li:last-child a:hover{background:var(--charcoal-brown)}

/* ── HERO ───────────────────────────────────────────────────────────────────── */
.hope-hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
  padding:0 80px 0 100px;align-items:center;gap:60px;position:relative;overflow:hidden;background:var(--porcelain)}

.hope-hero-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.hope-hero-blob1{position:absolute;width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(125,165,254,.18) 0%,transparent 70%);
  top:-150px;right:-120px;animation:hopeBlobPulse 9s ease-in-out infinite}
.hope-hero-blob2{position:absolute;width:450px;height:450px;border-radius:50%;
  background:radial-gradient(circle,rgba(250,218,144,.15) 0%,transparent 70%);
  bottom:60px;left:-60px;animation:hopeBlobPulse 12s ease-in-out infinite reverse}
.hope-hero-dot-grid{position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(74,125,241,.12) 1px,transparent 1px);
  background-size:28px 28px;opacity:.6}
@keyframes hopeBlobPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}

.hope-hero-content{position:relative;z-index:1}
.hope-hero-tag{display:inline-flex;align-items:center;gap:8px;background:white;
  border:1.5px solid var(--border);border-radius:100px;padding:7px 16px;
  font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:var(--accent);margin-bottom:26px;box-shadow:0 4px 16px rgba(74,125,241,.1);
  animation:hopeFadeUp .7s .2s both}
.hope-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:hopePulse 2s infinite}
@keyframes hopePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}

.hope-hero-title{font-size:clamp(4rem,8vw,7.5rem);font-weight:900;line-height:.92;
  letter-spacing:-.05em;color:var(--ink);margin-bottom:10px;animation:hopeFadeUp .8s .3s both}
.hope-hero-title-sub{font-size:clamp(1.1rem,2.5vw,1.8rem);font-weight:300;letter-spacing:.01em;
  color:var(--ink-soft);margin-bottom:28px;animation:hopeFadeUp .8s .4s both}
.hope-grad-text{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hope-highlight-text{background:var(--grad-warm);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.hope-hero-desc{font-size:.97rem;line-height:1.8;color:var(--ink-soft);font-weight:400;
  max-width:440px;margin-bottom:36px;animation:hopeFadeUp .8s .5s both}
.hope-hero-ctas{display:flex;gap:12px;flex-wrap:wrap;animation:hopeFadeUp .8s .6s both}

.hope-btn-grad{display:inline-flex;align-items:center;gap:9px;background:var(--grad);
  color:white;padding:13px 24px;border-radius:100px;font-size:.82rem;font-weight:600;
  text-decoration:none;transition:all .3s;box-shadow:0 6px 20px rgba(74,125,241,.3)}
.hope-btn-grad:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(74,125,241,.45)}
.hope-btn-ghost{display:inline-flex;align-items:center;gap:9px;background:white;color:var(--ink-soft);
  border:1.5px solid var(--border);padding:13px 24px;border-radius:100px;font-size:.82rem;
  font-weight:600;text-decoration:none;transition:all .3s}
.hope-btn-ghost:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}

/* HERO VISUAL — phone mockup */
.hope-hero-visual{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;
  animation:hopeFadeIn 1s .8s both}

/* ── PHONE MOCKUP ── */
.hope-phone{position:relative;width:260px;margin:auto;animation:hopeFloat 6s ease-in-out infinite}
@keyframes hopeFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(-2deg)}}
.hope-phone__frame{background:var(--charcoal-brown);border-radius:38px;padding:10px;
  box-shadow:0 40px 80px rgba(60,61,57,.35),0 8px 24px rgba(60,61,57,.2),
  inset 0 1px 0 rgba(255,255,255,.15);position:relative}
.hope-phone__notch{position:absolute;top:14px;left:50%;transform:translateX(-50%);
  width:80px;height:22px;background:var(--charcoal-brown);border-radius:0 0 14px 14px;z-index:10}
.hope-phone__screen{background:#fff;border-radius:30px;overflow:hidden;aspect-ratio:9/19.5;
  position:relative}
.hope-phone__screen video{width:100%;height:100%;object-fit:cover;display:block}
.hope-phone__screen-placeholder{width:100%;height:100%;background:var(--grad);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.hope-phone__screen-placeholder span{font-size:1.6rem;font-weight:900;color:white;letter-spacing:-.04em}
.hope-phone__screen-placeholder small{font-size:.7rem;color:rgba(255,255,255,.7);font-weight:500;letter-spacing:.06em;text-transform:uppercase}
.hope-phone__btn{position:absolute;right:-3px;top:100px;width:4px;height:32px;
  background:rgba(255,255,255,.2);border-radius:2px}
.hope-phone__btn2{top:142px}

.hope-phone-glow{position:absolute;inset:-30px;border-radius:60px;
  background:radial-gradient(ellipse,rgba(125,165,254,.25) 0%,transparent 70%);
  animation:hopeGlowPulse 4s ease-in-out infinite;z-index:-1}
@keyframes hopeGlowPulse{0%,100%{opacity:.6;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}

/* SDG BADGES */
.hope-sdg-badges{position:absolute;display:flex;flex-direction:column;gap:10px;left:-90px;top:50%;transform:translateY(-50%)}
.hope-sdg-badge{background:white;border:1.5px solid var(--border);border-radius:12px;
  padding:8px 12px;font-size:.65rem;font-weight:700;color:var(--ink);
  box-shadow:0 4px 16px rgba(74,125,241,.1);white-space:nowrap;display:flex;align-items:center;gap:6px;
  animation:hopeSlideIn .6s both}
.hope-sdg-badge:nth-child(1){animation-delay:.9s}
.hope-sdg-badge:nth-child(2){animation-delay:1.1s}
.hope-sdg-badge:nth-child(3){animation-delay:1.3s}
.hope-sdg-badge:nth-child(4){animation-delay:1.5s}
.hope-sdg-badge-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
@keyframes hopeSlideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}

/* STATS */
.hope-stats{background:var(--charcoal-brown);padding:44px 80px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:40px}
.hope-stat{text-align:center}
.hope-stat-num{font-size:2.8rem;font-weight:900;line-height:1;letter-spacing:-.05em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;margin-bottom:6px}
.hope-stat-label{font-size:.7rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.4)}

/* SECTIONS */
.hope-section{padding:100px 80px}
.hope-eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--accent);display:flex;align-items:center;gap:10px;margin-bottom:14px}
.hope-eyebrow::before{content:'';display:block;width:24px;height:2px;background:var(--grad);flex-shrink:0}
.hope-sec-title{font-size:clamp(1.9rem,3.5vw,3rem);font-weight:800;letter-spacing:-.04em;
  line-height:1.1;color:var(--ink)}
.hope-sec-title em{font-style:normal;background:var(--grad);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text}

/* OVERVIEW */
.hope-overview{background:white}
.hope-overview-grid{display:grid;grid-template-columns:5fr 4fr;gap:80px;align-items:start}
.hope-overview-text p{font-size:.97rem;line-height:1.85;color:var(--ink-soft);font-weight:400;margin-top:20px}
.hope-tech-label{font-size:.67rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin:28px 0 10px}
.hope-tech-pills{display:flex;flex-wrap:wrap;gap:8px}
.hope-tech-pill{background:var(--bg2);border:1.5px solid var(--border);border-radius:100px;
  padding:5px 14px;font-size:.76rem;font-weight:600;color:var(--ink-soft);transition:all .25s;cursor:default}
.hope-tech-pill:hover{background:var(--accent);color:white;border-color:var(--accent)}
.hope-aside-card{background:var(--grad-soft);border:1.5px solid var(--border);border-radius:20px;
  padding:30px;position:sticky;top:100px}
.hope-aside-item{padding:15px 0;border-bottom:1px solid var(--border)}
.hope-aside-item:last-child{border-bottom:none;padding-bottom:0}
.hope-aside-item:first-child{padding-top:0}
.hope-aside-key{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:5px}
.hope-aside-val{font-size:.88rem;font-weight:600;color:var(--ink)}

/* SDG GOALS */
.hope-sdgs{background:var(--bg)}
.hope-sdg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:50px}
.hope-sdg-card{border-radius:20px;padding:32px 24px;position:relative;overflow:hidden;transition:all .3s}
.hope-sdg-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.12)}
.hope-sdg-card-n{font-size:3.5rem;font-weight:900;line-height:1;letter-spacing:-.05em;
  color:rgba(255,255,255,.2);margin-bottom:12px}
.hope-sdg-card-title{font-size:1rem;font-weight:700;color:white;margin-bottom:8px}
.hope-sdg-card-desc{font-size:.8rem;line-height:1.6;color:rgba(255,255,255,.75);font-weight:400}

/* FEATURES */
.hope-features{background:white}
.hope-features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:50px}
.hope-feat-card{background:var(--bg);border:1.5px solid var(--border);border-radius:18px;
  padding:28px 24px;transition:all .3s;position:relative;overflow:hidden}
.hope-feat-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);
  opacity:0;transition:opacity .3s}
.hope-feat-card:hover::before{opacity:1}
.hope-feat-card:hover{border-color:var(--accent-lt);transform:translateY(-4px);
  box-shadow:0 12px 40px rgba(74,125,241,.1)}
.hope-feat-icon{width:44px;height:44px;border-radius:12px;background:var(--lavender);
  display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent);
  margin-bottom:16px;position:relative;z-index:1;transition:background .3s}
.hope-feat-card:hover .hope-feat-icon{background:var(--accent);color:white}
.hope-feat-name{font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:8px;position:relative;z-index:1}
.hope-feat-desc{font-size:.82rem;line-height:1.7;color:var(--ink-muted);font-weight:400;position:relative;z-index:1}

/* PROCESS */
.hope-process{background:var(--bg)}
.hope-process-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:50px;
  border-radius:24px;overflow:hidden;border:2px solid var(--border)}
.hope-proc-step{background:white;padding:44px 32px;transition:background .3s}
.hope-proc-step+.hope-proc-step{border-left:1px solid var(--border)}
.hope-proc-step:hover{background:var(--lavender)}
.hope-proc-n{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:16px;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;opacity:.35;letter-spacing:-.05em}
.hope-proc-title{font-size:1.1rem;font-weight:700;color:var(--ink);margin-bottom:10px}
.hope-proc-desc{font-size:.86rem;line-height:1.75;color:var(--ink-soft);font-weight:400}

/* ── WIREFRAME GALLERY ───────────────────────────────────────────────────── */
.hope-wf-section{background:white}
.hope-wf-pair{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start;margin-top:60px}
.hope-wf-pair.reverse{grid-template-columns:1.1fr 1fr}
.hope-wf-pair.reverse .hope-wf-text{order:2}
.hope-wf-pair.reverse .hope-wf-img{order:1}
.hope-wf-text h3{font-size:1.6rem;font-weight:800;letter-spacing:-.04em;color:var(--ink);margin-bottom:12px}
.hope-wf-text p{font-size:.95rem;line-height:1.8;color:var(--ink-soft);font-weight:400}
.hope-wf-img{border-radius:20px;overflow:hidden;border:2px solid var(--border);
  background:var(--lavender);box-shadow:0 20px 50px rgba(74,125,241,.1)}
.hope-wf-img img{width:100%;height:auto;display:block;object-fit:contain}
.hope-wf-placeholder{width:100%;aspect-ratio:4/3;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:10px;color:var(--ink-muted);padding:40px}
.hope-wf-placeholder svg{opacity:.4;font-size:2rem}
.hope-wf-placeholder span{font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;opacity:.5}

/* ── HiFi HORIZONTAL SCROLL ─────────────────────────────────────────────── */
.hope-hifi-section{background:var(--bg);padding:100px 0 100px}
.hope-hifi-header{padding:0 80px;margin-bottom:50px}
.hope-hifi-label{font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:14px}
.hope-hifi-track-wrap{overflow-x:auto;padding:0 80px 28px;
  scrollbar-width:thin;scrollbar-color:var(--accent) var(--lavender);cursor:grab;user-select:none}
.hope-hifi-track-wrap:active{cursor:grabbing}
.hope-hifi-track-wrap::-webkit-scrollbar{height:5px}
.hope-hifi-track-wrap::-webkit-scrollbar-track{background:var(--lavender);border-radius:3px}
.hope-hifi-track-wrap::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}
.hope-hifi-row{display:flex;gap:16px;padding-bottom:4px;min-width:max-content}
.hope-hifi-rows{display:flex;flex-direction:column;gap:20px}
.hope-hifi-card{flex-shrink:0;width:200px;border-radius:18px;overflow:hidden;
transition:all .3s}
.hope-hifi-card:hover{transform:translateY(-6px) scale(1.01);
  box-shadow:0 16px 40px rgba(74,125,241,.18);border-color:var(--accent-lt)}
.hope-hifi-card img{width:100%;height:auto;display:block;object-fit:cover}

/* ── HELPER COMPONENTS GRID ─────────────────────────────────────────────── */
.hope-helpers-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
  gap:20px;
  margin-top:40px;
  align-items:end;
}
.hope-helper-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
}
.hope-helper-card{
  width:100%;
  border-radius:16px;
  overflow:hidden;
  border:2px solid var(--border);
  background:white;
  box-shadow:0 4px 16px rgba(74,125,241,.07);
  transition:all .3s;
}
.hope-helper-card:hover{
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 12px 32px rgba(74,125,241,.15);
  border-color:var(--accent-lt);
}
.hope-helper-card img{
  width:100%;
  height:auto;
  display:block;
  object-fit:contain;
}
/* Wide helpers (keyboard, side-menu, checkout) span more columns */
.hope-helper-item.wide{
  grid-column:span 2;
}
.hope-helper-item.wide .hope-helper-card img{
  object-fit:cover;
}
.hope-helper-label{
  font-size:.62rem;
  font-weight:700;
  letter-spacing:.07em;
  text-transform:uppercase;
  color:var(--ink-muted);
  text-align:center;
  line-height:1.3;
}

/* USER TESTING */
.hope-testing{background:white;padding:100px 80px}
.hope-testing-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:50px}
.hope-test-card{background:var(--bg);border:1.5px solid var(--border);border-radius:20px;padding:36px;transition:all .3s}
.hope-test-card:hover{box-shadow:var(--shadow);transform:translateY(-4px)}
.hope-test-card-badge{display:inline-block;background:var(--lavender);color:var(--accent);
  font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  padding:4px 12px;border-radius:100px;margin-bottom:20px;border:1.5px solid var(--border)}
.hope-feedback-list{list-style:none}
.hope-feedback-list li{display:flex;gap:12px;align-items:flex-start;
  padding:10px 0;border-bottom:1px solid var(--border);font-size:.9rem;
  color:var(--ink-soft);font-weight:400;line-height:1.65}
.hope-feedback-list li:last-child{border-bottom:none}
.hope-feedback-check{color:var(--accent);flex-shrink:0;margin-top:3px}

.hope-testing-note{margin-top:24px;background:var(--lavender);border:1.5px solid var(--border);
  border-radius:16px;padding:24px 28px;display:flex;align-items:flex-start;gap:14px}
.hope-testing-note-icon{font-size:1.2rem;color:var(--accent);flex-shrink:0;margin-top:2px}
.hope-testing-note p{font-size:.88rem;line-height:1.7;color:var(--ink-soft);font-weight:400}
.hope-testing-note strong{color:var(--accent);font-weight:700}

/* REFLECTION */
.hope-reflection{background:var(--bg);padding:100px 80px}
.hope-reflection-grid{display:grid;grid-template-columns:3fr 2fr;gap:60px;align-items:start;margin-top:50px}
.hope-reflection-text p{font-size:.97rem;line-height:1.9;color:var(--ink-soft);font-weight:400;margin-bottom:18px}
.hope-reflection-text p:last-child{margin-bottom:0}
.hope-reflection-aside{display:flex;flex-direction:column;gap:16px;position:sticky;top:100px}
.hope-ref-highlight{background:white;border:1.5px solid var(--border);border-radius:18px;padding:24px;
  border-left:4px solid var(--accent)}
.hope-ref-highlight-label{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--accent);margin-bottom:8px}
.hope-ref-highlight-text{font-size:.88rem;line-height:1.65;color:var(--ink-soft);font-weight:400}

/* OUTCOME */
.hope-outcome{background:var(--bg);padding:100px 80px}
.hope-outcome-inner{background:var(--grad);border-radius:28px;padding:80px;
  text-align:center;position:relative;overflow:hidden}
.hope-outcome-inner::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;
  background:rgba(255,255,255,.06);top:-200px;right:-200px;pointer-events:none}
.hope-outcome-inner::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;
  background:rgba(255,255,255,.06);bottom:-150px;left:-100px;pointer-events:none}
.hope-out-eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;
  color:rgba(255,255,255,.6);margin-bottom:16px}
.hope-out-title{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;line-height:1.15;
  letter-spacing:-.04em;color:white;max-width:600px;margin:0 auto 20px;position:relative;z-index:1}
.hope-out-desc{font-size:.97rem;line-height:1.75;color:rgba(255,255,255,.8);font-weight:400;
  max-width:520px;margin:0 auto 44px;position:relative;z-index:1}
.hope-out-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.hope-btn-white{display:inline-flex;align-items:center;gap:9px;background:white;color:var(--accent);
  padding:13px 24px;border-radius:100px;font-size:.82rem;font-weight:600;text-decoration:none;transition:all .3s}
.hope-btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
.hope-btn-outline-white{display:inline-flex;align-items:center;gap:9px;background:transparent;
  color:white;border:1.5px solid rgba(255,255,255,.4);padding:13px 24px;border-radius:100px;
  font-size:.82rem;font-weight:600;text-decoration:none;transition:all .3s}
.hope-btn-outline-white:hover{background:rgba(255,255,255,.12);border-color:white;transform:translateY(-2px)}

/* FOOTER */
.hope-footer{background:var(--charcoal-brown);padding:40px 80px;
  display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid rgba(255,255,255,.06)}
.hope-footer-brand{font-size:1.1rem;font-weight:900;letter-spacing:-.04em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hope-footer-text{font-size:.76rem;color:rgba(255,255,255,.3);font-weight:400}

/* ANIMATIONS */
.h-reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.h-reveal.visible{opacity:1;transform:none}
.h-reveal-l{opacity:0;transform:translateX(-36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.h-reveal-l.visible{opacity:1;transform:none}
.h-reveal-r{opacity:0;transform:translateX(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.h-reveal-r.visible{opacity:1;transform:none}
.h-reveal-s{opacity:0;transform:scale(.94);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.h-reveal-s.visible{opacity:1;transform:none}
.h-stagger>*{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.h-stagger.visible>*:nth-child(1){opacity:1;transform:none;transition-delay:.04s}
.h-stagger.visible>*:nth-child(2){opacity:1;transform:none;transition-delay:.12s}
.h-stagger.visible>*:nth-child(3){opacity:1;transform:none;transition-delay:.20s}
.h-stagger.visible>*:nth-child(4){opacity:1;transform:none;transition-delay:.28s}
.h-stagger.visible>*:nth-child(5){opacity:1;transform:none;transition-delay:.36s}
.h-stagger.visible>*:nth-child(6){opacity:1;transform:none;transition-delay:.44s}
@keyframes hopeFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes hopeFadeIn{from{opacity:0}to{opacity:1}}

/* RESPONSIVE */
@media(max-width:1024px){
  .hope-hero{grid-template-columns:1fr;padding:110px 32px 60px;text-align:center}
  .hope-hero-content{align-items:center;display:flex;flex-direction:column}
  .hope-hero-desc{text-align:left}
  .hope-hero-visual{margin-top:20px}
  .hope-sdg-badges{left:auto;right:-80px;top:10px;transform:none}
  .hope-stats{grid-template-columns:1fr 1fr;padding:36px 24px}
  .hope-section,.hope-testing,.hope-reflection,.hope-outcome{padding:70px 24px}
  .hope-hifi-header,.hope-hifi-track-wrap{padding-left:24px;padding-right:24px}
  .hope-overview-grid{grid-template-columns:1fr}
  .hope-sdg-grid{grid-template-columns:1fr 1fr}
  .hope-features-grid{grid-template-columns:1fr 1fr}
  .hope-process-strip{grid-template-columns:1fr}
  .hope-proc-step+.hope-proc-step{border-left:none;border-top:1px solid var(--border)}
  .hope-wf-pair,.hope-wf-pair.reverse{grid-template-columns:1fr}
  .hope-wf-pair.reverse .hope-wf-text,.hope-wf-pair.reverse .hope-wf-img{order:unset}
  .hope-testing-grid{grid-template-columns:1fr}
  .hope-reflection-grid{grid-template-columns:1fr}
  .hope-reflection-aside{position:static}
  .hope-outcome-inner{padding:44px 24px}
  .hope-footer{flex-direction:column;gap:14px;text-align:center;padding:28px 24px}
  .hope-nav,.hope-nav.scrolled{padding:14px 70px 14px 24px}
  .hope-helpers-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}
  .hope-helper-item.wide{grid-column:span 2}
}
@media(max-width:600px){
  .hope-stats{grid-template-columns:1fr 1fr}
  .hope-sdg-grid{grid-template-columns:1fr}
  .hope-features-grid{grid-template-columns:1fr}
  .hope-hifi-card{width:130px}
  .hope-sdg-badges{display:none}
  .hope-hero-title{font-size:clamp(3rem,14vw,5rem)}
  .hope-helpers-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}
  .hope-helper-item.wide{grid-column:span 2}
}
`;

/* ── SVG ICONS ── */
const IconBack = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconExternal = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconFigma = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z"/>
    <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z"/>
    <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z"/>
    <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"/>
    <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-.3C16.8 3 12 3 12 3s-4.8 0-7.3.1c-.6.1-1.9.1-3 1.3C.8 5.2.5 7.2.5 7.2S.2 9.5.2 11.8v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22.6 12 22.6 12 22.6s4.8 0 7.3-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.4-.3-4.4zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
  </svg>
);

/* ── DRAG-SCROLL HOOK ── */
function useDragScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false, startX, scrollLeft;
    const onDown = e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp = () => { isDown = false; };
    const onMove = e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.2; };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mouseup', onUp); el.removeEventListener('mousemove', onMove); };
  }, []);
  return ref;
}

/* ── USE REVEAL ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.h-reveal,.h-reveal-l,.h-reveal-r,.h-reveal-s,.h-stagger').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const primaryFeatures = [
  [<FiCreditCard/>, 'Online Donations', 'Contribute money directly via multiple online payment methods within the app.'],
  [<FiMapPin/>, 'Donation Boxes', 'The app suggests the nearest donation box based on your current location.'],
  [<FiHeart/>, 'Free Pick-up Service', 'Schedule a free pick-up for physical donations like food, medicine, and clothes.'],
  [<FiBarChart2/>, 'Latest Updates', 'View real achievements, statistics, and informative articles from the organisation.'],
  [<FiBell/>, 'Event Notifications', 'Get reminders and alerts for upcoming donation events and campaigns.'],
  [<FiBook/>, 'SDG Information', 'Explore detailed educational content about all four supported SDGs.'],
];

const secondaryFeatures = [
  [<FiShare2/>, 'Awareness Sharing', 'Share articles and photos to raise awareness within your network.'],
  [<FiEye/>, 'Anonymous Donations', 'Choose to donate without revealing your name or personal information.'],
  [<FiCreditCard/>, 'Flexible Payments', 'Multiple payment methods so users can choose what works for them.'],
  [<FiMessageCircle/>, 'Contact Us', 'Reach out to the organisation directly through the app.'],
  [<FiBarChart2/>, 'Monthly Tracker', 'Monitor your total contributions and impact over time.'],
  [<FiCheckCircle/>, 'Transaction History', 'View a full log of all past donations made through the app.'],
];

const sdgCards = [
  { n: '01', title: 'No Poverty', desc: 'Connect users to initiatives that directly combat extreme poverty.', bg: 'linear-gradient(135deg,#e5243b,#c0182c)' },
  { n: '02', title: 'Zero Hunger', desc: 'Facilitate food donations and meal programs for those in need.', bg: 'linear-gradient(135deg,#dda83a,#c48a1a)' },
  { n: '03', title: 'Good Health', desc: 'Support medical aid and health-related charitable programmes.', bg: 'linear-gradient(135deg,#4C9F38,#357a28)' },
  { n: '04', title: 'Quality Education', desc: 'Fund educational materials and learning opportunities for all.', bg: 'linear-gradient(135deg,#C5192D,#a0141e)' },
];


/* ─── MAIN COMPONENT ─────────────────────────────────────────────────── */
export default function HopeApp() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const trackRef1 = useDragScroll();

  useReveal();

  useEffect(() => {
    const handle = () => {
      const el = document.documentElement;
      setScrollPct(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  /* stat counter */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.hope-stat-num').forEach(el => {
            const v = el.textContent, n = parseInt(v);
            if (isNaN(n)) return;
            const s = v.replace(/[0-9]/g, '');
            let t;
            const step = ts => {
              if (!t) t = ts;
              const p = Math.min((ts - t) / 1400, 1), ep = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(ep * n) + s;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.hope-stats').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* hifi screens — driven by pre-imported arrays, no dynamic require */

  return (
    <>
      <style>{styles}</style>
      <div className="hope-root">
        {/* progress */}
        <div className="hope-prog" style={{ width: `${scrollPct}%` }}/>

        {/* back */}
        <a href="/Home" className="hope-back" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack/> Back
        </a>

        {/* nav */}
        <nav className={`hope-nav${scrolled ? ' scrolled' : ''}`}>
          <ul className="hope-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#sdgs">SDGs</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#wireframes">Design</a></li>
            <li><a href="#hifi">Hi-Fi</a></li>
            <li><a href="#prototype">Prototype</a></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="hope-hero" id="hero">
          <div className="hope-hero-bg">
            {/* <div className="hope-hero-blob1"/> */}
            {/* <div className="hope-hero-blob2"/> */}
            <div className="hope-hero-dot-grid"/>
          </div>

          <div className="hope-hero-content">
            <div className="hope-hero-tag">
              <span className="hope-tag-dot"/>
              Smartphone App · UX Design
            </div>
            <h1 className="hope-hero-title">
              <span className="hope-grad-text">HOPE</span>
            </h1>
            <div className="hope-hero-title-sub">Donate. Impact. <span className="hope-highlight-text">Change.</span></div>
            <p className="hope-hero-desc">
              An innovative donation platform supporting the first four SDGs — connecting users to causes through online payments, location-based donation boxes, and a free pick-up service. Built with transparency and community at its core.
            </p>
            <div className="hope-hero-ctas">
              <a href="https://www.figma.com/proto/zo33dkDqkUpr60YPPnooPF/Smart-Phone-App?node-id=217-944&t=oifD6swLcrZCb5Q4-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=16%3A14&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" className="hope-btn-grad">
                <IconFigma/> View Prototype
              </a>
              <a href="https://youtu.be/F_b3v-K8t2k" target="_blank" rel="noopener noreferrer" className="hope-btn-ghost">
                <IconYoutube/> Watch Demo
              </a>
            </div>
          </div>

          {/* phone mockup */}
          <div className="hope-hero-visual">
            <div style={{ position: 'relative' }}>
              <div className="hope-phone">
                <video autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}>
                  <source src={`${process.env.PUBLIC_URL}/smV5.mp4`} type="video/mp4"/>
                </video>
              </div>
            </div>
            {/* SDG badges */}
            <div className="hope-sdg-badges">
              {[
                { label: 'SDG 1 — No Poverty', color: '#e5243b' },
                { label: 'SDG 2 — Zero Hunger', color: '#dda83a' },
                { label: 'SDG 3 — Good Health', color: '#4C9F38' },
                { label: 'SDG 4 — Education', color: '#C5192D' },
              ].map(({ label, color }) => (
                <div key={label} className="hope-sdg-badge">
                  <span className="hope-sdg-badge-dot" style={{ background: color }}/>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="hope-stats h-stagger">
          {[['4', 'SDGs Supported'], ['3', 'Donation Methods'], ['100%', 'User-Tested'], ['Figma', 'Hi-Fi Prototype']].map(([num, label], i) => (
            <div key={i} className="hope-stat">
              <div className="hope-stat-num">{num}</div>
              <div className="hope-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* OVERVIEW */}
        <section className="hope-section hope-overview" id="overview">
          <div className="hope-overview-grid">
            <div className="h-reveal-l">
              <div className="hope-eyebrow">About the project</div>
              <h2 className="hope-sec-title">A donation platform <em>built for impact</em></h2>
              <p>HOPE is a smartphone app concept designed to support the first four United Nations Sustainable Development Goals — No Poverty, Zero Hunger, Good Health, and Quality Education — through a simplified, transparent donation experience.</p>
              <p>Users can donate money online, locate nearby donation boxes, or schedule a free pick-up for physical items like food, medicine, and clothing. The app bridges the gap between willing donors and the communities that need them most, while providing real achievements and statistics to build trust and transparency.</p>
              <div className="hope-tech-label">Tools & Methods</div>
              <div className="hope-tech-pills h-stagger">
                {['Figma', 'UX Research', 'User Testing', 'Hi-Fi Prototyping', 'Wireframing', 'Google Forms', 'Competitive Analysis', 'SDG Framework'].map(t => (
                  <span key={t} className="hope-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="hope-aside-card h-reveal-r">
              {[
                ['Project Type', 'Smartphone App Prototype'],
                ['Scope', 'UX Design & Prototyping'],
                ['Target Users', 'Donors aged 18–59, male & female'],
                ['Platform', 'Mobile (iOS/Android concept)'],
                ['Design Tool', 'Figma — Hi-Fi Interactive Prototype'],
                ['Assessment', 'Smart Phone App Design'],
              ].map(([k, v]) => (
                <div key={k} className="hope-aside-item">
                  <div className="hope-aside-key">{k}</div>
                  <div className="hope-aside-val">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SDG GOALS */}
        <section className="hope-section hope-sdgs" id="sdgs">
          <div className="h-reveal">
            <div className="hope-eyebrow">Sustainable Development Goals</div>
            <h2 className="hope-sec-title">Four SDGs. <em>One platform.</em></h2>
          </div>
          <div className="hope-sdg-grid h-stagger">
            {sdgCards.map(({ n, title, desc, bg }) => (
              <div key={n} className="hope-sdg-card" style={{ background: bg }}>
                <div className="hope-sdg-card-n">{n}</div>
                <div className="hope-sdg-card-title">{title}</div>
                <p className="hope-sdg-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="hope-section hope-features" id="features">
          <div className="h-reveal">
            <div className="hope-eyebrow">Primary Features</div>
            <h2 className="hope-sec-title">Everything a donor <em>needs</em></h2>
          </div>
          <div className="hope-features-grid h-stagger">
            {primaryFeatures.map(([icon, name, desc]) => (
              <div key={name} className="hope-feat-card">
                <div className="hope-feat-icon">{icon}</div>
                <div className="hope-feat-name">{name}</div>
                <p className="hope-feat-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 60 }} className="h-reveal">
            <div className="hope-eyebrow" style={{ marginBottom: 14 }}>Secondary Features</div>
            <h2 className="hope-sec-title" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>Nice-to-haves that <em>matter</em></h2>
          </div>
          <div className="hope-features-grid h-stagger" style={{ marginTop: 30 }}>
            {secondaryFeatures.map(([icon, name, desc]) => (
              <div key={name} className="hope-feat-card">
                <div className="hope-feat-icon" style={{ background: 'var(--jasmine)', color: 'var(--charcoal-brown)' }}>{icon}</div>
                <div className="hope-feat-name">{name}</div>
                <p className="hope-feat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="hope-section hope-process" id="process">
          <div className="h-reveal">
            <div className="hope-eyebrow">Design Process</div>
            <h2 className="hope-sec-title">From research to <em>prototype</em></h2>
          </div>
          <div className="hope-process-strip h-stagger">
            {[
              ['01', 'Research & Discovery', 'A Google Form was distributed to real users aged 18–59 to understand their donation habits, trust issues with charities, and familiarity with the SDGs. Competitive analysis of ShareTheMeal and IKhair revealed key gaps: real-time donation tracking, location-based box suggestions, and transparent impact reporting.'],
              ['02', 'Wireframing & Design', 'Low-fidelity sketches mapped out navigation flows and content hierarchy before any visual decisions were made. High-fidelity mockups in Figma introduced the final colour palette, typography, and component system. Multiple screens were designed covering onboarding, donation flows, article feeds, SDG info pages, and account management.'],
              ['03', 'Prototyping & Testing', 'The interactive Figma prototype was shared with test users via Google Form. Two rounds of feedback confirmed strong clarity, organisation, and usability. A suggestion to add country-specific targeting was identified as a valuable future feature. The prototype was refined based on feedback before final submission.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="hope-proc-step">
                <div className="hope-proc-n">{n}</div>
                <div className="hope-proc-title">{title}</div>
                <p className="hope-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WIREFRAMES */}
        <section className="hope-section hope-wf-section" id="wireframes">
          <div className="h-reveal">
            <div className="hope-eyebrow">Design Artefacts</div>
            <h2 className="hope-sec-title">Wireframes & <em>Mockups</em></h2>
          </div>

          {/* Low-fi */}
          <div className="hope-wf-pair h-reveal" style={{ marginTop: 60 }}>
            <div className="hope-wf-text">
              <h3>App Sketches & Wireframes</h3>
              <p>Early sketches mapped navigation flows, screen layouts, and content hierarchy before any visual decisions were made. These low-fidelity frames helped identify structural issues — particularly around the donation flow and SDG info section — that were resolved before moving to high-fidelity design.</p>
            </div>
            <div className="hope-wf-img">
              <img src={appSketche1} alt="App sketches and wireframes"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
               <img src={appSketche2} alt="App sketches and wireframes"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
               <img src={appSketche3} alt="App sketches and wireframes"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
               <img src={appSketche4} alt="App sketches and wireframes"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
               <img src={appSketche5} alt="App sketches and wireframes"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
                           </div>
          </div>

          {/* High-fi mockups overview */}
          <div className="hope-wf-pair reverse h-reveal" style={{ marginTop: 80 }}>
            <div className="hope-wf-text">
              <h3>High-Fidelity Mockups</h3>
              <p>The high-fidelity designs introduced the final colour palette, typography, and component library. A warm neutral background with vibrant SDG-aligned accents creates a trustworthy, energising feel, while generous whitespace and card-based layouts keep content accessible across all screen sizes.</p>
            </div>
            <div className="hope-wf-img">
              <img src={highFidelityMockup} alt="High fidelity mockups overview"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
            </div>
          </div>
        </section>

        {/* ── HI-FI HORIZONTAL SCROLL — 15 real screens ── */}
        <section className="hope-hifi-section" id="hifi">
          <div className="hope-hifi-header h-reveal">
            <div className="hope-eyebrow">Interactive Prototype Screens</div>
            <h2 className="hope-sec-title">Every screen, <em>crafted</em></h2>
            <p style={{ marginTop: 14, fontSize: '.92rem', color: 'var(--ink-muted)', fontWeight: 400 }}>
              Drag to scroll · 15 screens across two rows
            </p>
          </div>

          <div className="hope-hifi-track-wrap" ref={trackRef1}>
            <div className="hope-hifi-rows">
              {/* All hifi screens from pre-imported array */}
              <div className="hope-hifi-row">
                {hifiScreens.map((src, i) => (
                  <div key={i} className="hope-hifi-card">
                    <img src={src} alt={`Screen ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROTOTYPE VIDEO */}
        <section className="hope-section" id="prototype" style={{ background: 'white' }}>
          <div className="h-reveal">
            <div className="hope-eyebrow">Prototype Walkthrough</div>
            <h2 className="hope-sec-title">See it <em>in action</em></h2>
          </div>
          <div className="h-reveal-s" style={{ marginTop: 50, borderRadius: 20, overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: '0 40px 80px rgba(74,125,241,.12)', aspectRatio: '16/9', background: 'var(--charcoal-brown)', position: 'relative' }}>
            <iframe
              src="https://www.youtube.com/embed/F_b3v-K8t2k"
              title="HOPE App — Hi-Fi Prototype Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <p style={{ marginTop: 18, textAlign: 'center', fontSize: '.78rem', color: 'var(--ink-muted)', fontWeight: 400, letterSpacing: '.03em' }}>
            Full interactive prototype walkthrough — all screens, flows, and animations recorded in Figma.
          </p>
        </section>

        {/* USER TESTING */}
        <section className="hope-testing" id="testing">
          <div className="h-reveal">
            <div className="hope-eyebrow">User Testing & Feedback</div>
            <h2 className="hope-sec-title">Validated by <em>real users</em></h2>
          </div>
          <div className="hope-testing-grid">
            <div className="hope-test-card h-reveal-l">
              <div className="hope-test-card-badge">Test Round 1</div>
              <ul className="hope-feedback-list">
                {[
                  'All buttons were clickable with well-linked navigation across pages.',
                  'The app is well organised and provides a wealth of information to users.',
                  'Fully developed concept with a clearly helpful purpose.',
                ].map((item, i) => (
                  <li key={i}><FiCheckCircle size={14} className="hope-feedback-check"/>{item}</li>
                ))}
              </ul>
            </div>
            <div className="hope-test-card h-reveal-r">
              <div className="hope-test-card-badge">Test Round 2</div>
              <ul className="hope-feedback-list">
                {[
                  'FAQ section was appreciated as a valuable addition.',
                  'Flexible donation amounts and multiple payment options stood out positively.',
                  'Suggestion: add a feature to target specific countries for donation.',
                ].map((item, i) => (
                  <li key={i}><FiCheckCircle size={14} className="hope-feedback-check"/>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hope-testing-note h-reveal" style={{ marginTop: 24 }}>
            <FiUsers size={20} className="hope-testing-note-icon"/>
            <p>Testing was conducted via <strong>Google Forms</strong> containing the Figma Hi-Fi prototype, distributed to a group of target users aged 18–59. Both rounds confirmed strong usability and concept clarity, with one actionable suggestion — country targeting — noted for future development.</p>
          </div>
        </section>

        {/* REFLECTION */}
        <section className="hope-reflection" id="reflection">
          <div className="h-reveal">
            <div className="hope-eyebrow">Self-Critical Reflection</div>
            <h2 className="hope-sec-title">What I learned <em>building HOPE</em></h2>
          </div>
          <div className="hope-reflection-grid">
            <div className="hope-reflection-text h-reveal-l">
              <p>The task was to develop a prototype for a smartphone app. I chose a donation platform to directly address the SDGs — not just as an academic exercise, but as a concept I genuinely believe could make a positive impact if developed further.</p>
              <p>Audience research surfaced a recurring problem: people want to donate but lack trust in charities and struggle to find accessible, transparent ways to give. This became the north star for HOPE's feature set — multiple donation methods, location-based box discovery, and real-time achievement reporting all emerged directly from user feedback.</p>
              <p>User testing validated the concept clearly. Both test rounds praised the app's organisation, richness of information, and usability. The suggestion to add country-specific targeting was a genuinely useful insight I had initially overlooked — a reminder that user feedback often surfaces the most practical improvements.</p>
              <p>If HOPE were to be developed into a real product, I'm confident the transparency-first approach and multi-method donation system would achieve meaningful adoption and impact.</p>
            </div>
            <div className="hope-reflection-aside h-reveal-r">
              {[
                { label: 'Key Insight', text: 'Donors want to see exactly where their money goes — transparency drove every design decision.' },
                { label: 'Biggest Challenge', text: 'Balancing the depth of SDG information with a clean, approachable UI for non-familiar users.' },
                { label: 'Future Feature', text: 'Country-specific donation targeting, suggested by test users and validated as high-value.' },
              ].map(({ label, text }) => (
                <div key={label} className="hope-ref-highlight">
                  <div className="hope-ref-highlight-label">{label}</div>
                  <p className="hope-ref-highlight-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="hope-outcome" id="outcome">
          <div className="hope-outcome-inner h-reveal-s">
            <div className="hope-out-eyebrow">Final Outcome</div>
            <h2 className="hope-out-title">A transparent, user-validated donation platform aligned with four global SDGs</h2>
            <p className="hope-out-desc">HOPE simplifies giving, builds donor trust through transparent reporting, and connects communities to the causes that matter most — all through a polished, accessible mobile experience.</p>
            <div className="hope-out-ctas">
              <a href="https://www.figma.com/proto/zo33dkDqkUpr60YPPnooPF/Smart-Phone-App?node-id=217-944&t=oifD6swLcrZCb5Q4-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=16%3A14&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" className="hope-btn-white">
                <IconFigma/> Interactive Prototype
              </a>
              <a href="https://youtu.be/F_b3v-K8t2k" target="_blank" rel="noopener noreferrer" className="hope-btn-outline-white">
                <IconExternal/> YouTube Walkthrough
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="hope-footer">
          <span className="hope-footer-brand">HOPE</span>
          <p className="hope-footer-text">Smartphone App Design — Sahar AbdulQadir</p>
        </footer>
      </div>
    </>
  );
}