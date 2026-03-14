import { useEffect, useRef, useState } from "react";
import {
  FiUsers, FiBook, FiCode, FiDatabase,
  FiCheckCircle, FiFileText, FiLink,
  FiDownload, FiVolume2, FiFilter, FiLayout
} from "react-icons/fi";

/* ── Pre-imported screen images — replace paths as needed ── */
// HIGH-FIDELITY screens
import hifi1  from "../assets/Images/naanHifi1.png";
import hifi2  from "../assets/Images/naanHifi2.png";
import hifi3  from "../assets/Images/naanHifi3.png";
import hifi4  from "../assets/Images/naanHifi4.png";
// LOW-FIDELITY / wireframes
import lofi1  from "../assets/Images/naanLofi1.png";
import lofi2  from "../assets/Images/naanLofi2.png";
import lofi3  from "../assets/Images/naanLofi3.png";
// Diagrams
import jsonDiagram  from "../assets/Images/naanJsonDiagram.png";
import userFlow     from "../assets/Images/naanUserFlow.png";
// Logo
import appLogo      from "../assets/Images/naanLogo.png";

const hifiScreens = [hifi1, lofi1, hifi2, lofi2, hifi3, lofi3, hifi4];
// const lofiScreens = [lofi1, lofi2, lofi3];

/* ─── PALETTE ─────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --sky:#53C5F6;
  --ash:#E8E8E8;
  --blush:#D8B0AE;
  --ocean:#36A1D0;
  --deep:#115A7A;

  --bg:#F5FBFE;
  --bg2:#EAF6FD;
  --ink:#0D2B38;
  --ink-soft:#3A5A6A;
  --ink-muted:#6B8A97;
  --accent:var(--ocean);
  --accent-lt:var(--sky);
  --warm:var(--blush);

  --grad:linear-gradient(135deg,var(--sky) 0%,var(--ocean) 100%);
  --grad-deep:linear-gradient(135deg,var(--ocean) 0%,var(--deep) 100%);
  --grad-warm:linear-gradient(135deg,var(--blush) 0%,#c89694 100%);
  --grad-soft:linear-gradient(135deg,#EAF6FD 0%,#d8eef8 100%);
  --border:#c8e8f5;
  --shadow:0 20px 60px rgba(54,161,208,.13);
  --radius:18px;
}

html{scroll-behavior:smooth}
body{
// font-family:'Instrument Sans',sans-serif;
background:var(--bg);color:var(--ink);overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}

.nt-root{
// font-family:'Instrument Sans',sans-serif;
background:var(--bg);color:var(--ink);overflow-x:hidden;position:relative}
.nt-root::after{content:'';position:fixed;inset:0;z-index:9999;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  opacity:.35;pointer-events:none}

/* PROGRESS */
.nt-prog{position:fixed;top:0;left:0;height:3px;z-index:1001;background:var(--grad);transition:width .1s;box-shadow:0 0 12px rgba(83,197,246,.5)}

/* BACK */
.nt-back{position:fixed;top:16px;left:24px;z-index:200;display:flex;align-items:center;gap:7px;
  background:white;border:1.5px solid var(--border);border-radius:100px;padding:8px 16px 8px 10px;
  font-size:.76rem;font-weight:600;color:var(--ink-soft);text-decoration:none;cursor:pointer;
  box-shadow:0 4px 16px rgba(54,161,208,.12);transition:all .3s;animation:ntFadeUp .6s .1s both}
.nt-back:hover{background:var(--accent);color:white;border-color:var(--accent);transform:translateX(-3px)}

/* NAV */
.nt-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;
  justify-content:flex-end;padding:20px 60px;transition:all .4s;pointer-events:none}
.nt-nav.scrolled{background:rgba(245,251,254,.95);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);padding:14px 60px;pointer-events:all;box-shadow:0 2px 20px rgba(54,161,208,.08)}
.nt-nav-links{display:flex;align-items:center;gap:24px;list-style:none}
.nt-nav-links a{font-size:.73rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink-soft);text-decoration:none;transition:color .2s}
.nt-nav-links a:hover{color:var(--accent)}
.nt-nav-links li:last-child a{background:var(--accent);color:white;border-radius:8px;padding:7px 14px}
.nt-nav-links li:last-child a:hover{background:var(--deep)}

/* ── HERO ── */
.nt-hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
  padding:0 80px 0 100px;align-items:center;gap:60px;position:relative;overflow:hidden;background:var(--bg)}

.nt-hero-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.nt-hero-blob1{position:absolute;width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(83,197,246,.16) 0%,transparent 70%);
  top:-150px;right:-120px;animation:ntBlobPulse 9s ease-in-out infinite}
.nt-hero-blob2{position:absolute;width:450px;height:450px;border-radius:50%;
  background:radial-gradient(circle,rgba(216,176,174,.14) 0%,transparent 70%);
  bottom:60px;left:-60px;animation:ntBlobPulse 12s ease-in-out infinite reverse}
.nt-hero-dot-grid{position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(54,161,208,.1) 1px,transparent 1px);
  background-size:28px 28px;opacity:.7}
@keyframes ntBlobPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}

.nt-hero-content{position:relative;z-index:1}
.nt-hero-tag{display:inline-flex;align-items:center;gap:8px;background:white;
  border:1.5px solid var(--border);border-radius:100px;padding:7px 16px;
  font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:var(--accent);margin-bottom:26px;box-shadow:0 4px 16px rgba(54,161,208,.12);
  animation:ntFadeUp .7s .2s both}
.nt-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ntPulse 2s infinite}
@keyframes ntPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}

.nt-hero-title{
// font-family:'Syne',sans-serif;
font-size:clamp(3.5rem,7vw,6.5rem);font-weight:800;line-height:.92;
  letter-spacing:-.05em;color:var(--ink);margin-bottom:10px;animation:ntFadeUp .8s .3s both}
.nt-hero-title-sub{
// font-family:'Syne',sans-serif;
font-size:clamp(1rem,2.2vw,1.6rem);font-weight:400;letter-spacing:.01em;
  color:var(--ink-soft);margin-bottom:28px;animation:ntFadeUp .8s .4s both}
.nt-grad-text{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nt-warm-text{background:var(--grad-warm);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.nt-hero-desc{font-size:.97rem;line-height:1.8;color:var(--ink-soft);font-weight:400;
  max-width:440px;margin-bottom:36px;animation:ntFadeUp .8s .5s both}
.nt-hero-ctas{display:flex;gap:12px;flex-wrap:wrap;animation:ntFadeUp .8s .6s both}

.nt-btn-grad{display:inline-flex;align-items:center;gap:9px;background:var(--grad);
  color:white;padding:13px 24px;border-radius:100px;font-size:.82rem;font-weight:600;
  text-decoration:none;transition:all .3s;box-shadow:0 6px 20px rgba(54,161,208,.3)}
.nt-btn-grad:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(54,161,208,.45)}
.nt-btn-ghost{display:inline-flex;align-items:center;gap:9px;background:white;color:var(--ink-soft);
  border:1.5px solid var(--border);padding:13px 24px;border-radius:100px;font-size:.82rem;
  font-weight:600;text-decoration:none;transition:all .3s}
.nt-btn-ghost:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}

/* HERO VISUAL — app card mockup */
.nt-hero-visual{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;
  animation:ntFadeIn 1s .8s both}

.nt-app-card{background:white;border-radius:28px;padding:32px;box-shadow:0 40px 80px rgba(17,90,122,.18),0 8px 24px rgba(54,161,208,.12);
  width:300px;position:relative;animation:ntFloat 6s ease-in-out infinite;border:1.5px solid var(--border)}
@keyframes ntFloat{0%,100%{transform:translateY(0) rotate(1deg)}50%{transform:translateY(-14px) rotate(1deg)}}

.nt-app-card-logo{width:60px;height:60px;border-radius:16px;background:var(--grad);
  display:flex;align-items:center;justify-content:center;margin-bottom:18px;
  box-shadow:0 8px 24px rgba(54,161,208,.3)}
.nt-app-card-logo img{width:40px;height:40px;object-fit:contain;filter:brightness(0) invert(1)}
.nt-app-card-logo-placeholder{
// font-family:'Syne',sans-serif;
font-size:1.1rem;font-weight:800;color:white;letter-spacing:-.04em}
.nt-app-card-name{
// font-family:'Syne',sans-serif;
font-size:1.3rem;font-weight:800;color:var(--ink);letter-spacing:-.04em;margin-bottom:4px}
.nt-app-card-sub{font-size:.75rem;color:var(--ink-muted);font-weight:500;letter-spacing:.04em;text-transform:uppercase;margin-bottom:24px}
.nt-app-card-dropdowns{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.nt-app-card-dd{background:var(--bg2);border:1.5px solid var(--border);border-radius:10px;
  padding:10px 14px;display:flex;justify-content:space-between;align-items:center;
  font-size:.8rem;font-weight:600;color:var(--ink-soft)}
.nt-app-card-dd-arrow{color:var(--accent);font-size:.7rem}
.nt-app-card-module{background:var(--grad-soft);border:1.5px solid var(--border);border-radius:12px;padding:14px}
.nt-app-card-mod-title{font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:4px}
.nt-app-card-mod-desc{font-size:.7rem;line-height:1.6;color:var(--ink-muted)}

.nt-card-glow{position:absolute;inset:-30px;border-radius:60px;
  background:radial-gradient(ellipse,rgba(83,197,246,.18) 0%,transparent 70%);
  animation:ntGlowPulse 4s ease-in-out infinite;z-index:-1}
@keyframes ntGlowPulse{0%,100%{opacity:.5;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}

/* FLOATING BADGES */
.nt-float-badges{position:absolute;display:flex;flex-direction:column;gap:10px;right:-90px;top:20%;transform:translateY(-50%)}
.nt-float-badge{background:white;border:1.5px solid var(--border);border-radius:12px;
  padding:8px 12px;font-size:.65rem;font-weight:700;color:var(--ink);
  box-shadow:0 4px 16px rgba(54,161,208,.1);white-space:nowrap;display:flex;align-items:center;gap:6px;
  animation:ntSlideIn .6s both}
.nt-float-badge:nth-child(1){animation-delay:.9s}
.nt-float-badge:nth-child(2){animation-delay:1.1s}
.nt-float-badge:nth-child(3){animation-delay:1.3s}
.nt-float-badge-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;background:var(--sky)}
@keyframes ntSlideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}

/* STATS */
.nt-stats{background:var(--deep);padding:44px 80px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:40px}
.nt-stat{text-align:center}
.nt-stat-num{
// font-family:'Syne',sans-serif;
font-size:2.8rem;font-weight:800;line-height:1;letter-spacing:-.05em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;margin-bottom:6px}
.nt-stat-label{font-size:.7rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.4)}

/* SECTIONS */
.nt-section{padding:100px 80px}
.nt-eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--accent);display:flex;align-items:center;gap:10px;margin-bottom:14px}
.nt-eyebrow::before{content:'';display:block;width:24px;height:2px;background:var(--grad);flex-shrink:0}
.nt-sec-title{
// font-family:'Syne',sans-serif;
font-size:clamp(1.9rem,3.5vw,3rem);font-weight:800;letter-spacing:-.04em;
  line-height:1.1;color:var(--ink)}
.nt-sec-title em{font-style:normal;background:var(--grad);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text}

/* OVERVIEW */
.nt-overview{background:white}
.nt-overview-grid{display:grid;grid-template-columns:5fr 4fr;gap:80px;align-items:start}
.nt-overview-text p{font-size:.97rem;line-height:1.85;color:var(--ink-soft);font-weight:400;margin-top:20px}
.nt-tech-label{font-size:.67rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin:28px 0 10px}
.nt-tech-pills{display:flex;flex-wrap:wrap;gap:8px}
.nt-tech-pill{background:var(--bg2);border:1.5px solid var(--border);border-radius:100px;
  padding:5px 14px;font-size:.76rem;font-weight:600;color:var(--ink-soft);transition:all .25s;cursor:default}
.nt-tech-pill:hover{background:var(--accent);color:white;border-color:var(--accent)}
.nt-aside-card{background:var(--grad-soft);border:1.5px solid var(--border);border-radius:20px;
  padding:30px;position:sticky;top:100px}
.nt-aside-item{padding:15px 0;border-bottom:1px solid var(--border)}
.nt-aside-item:last-child{border-bottom:none;padding-bottom:0}
.nt-aside-item:first-child{padding-top:0}
.nt-aside-key{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:5px}
.nt-aside-val{font-size:.88rem;font-weight:600;color:var(--ink)}

/* VISUAL IDENTITY — 3 cards */
.nt-identity{background:var(--bg)}
.nt-identity-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:50px}
.nt-id-card{background:white;border:1.5px solid var(--border);border-radius:22px;padding:32px;
  transition:all .3s;overflow:hidden}
.nt-id-card:hover{box-shadow:var(--shadow);transform:translateY(-4px)}
.nt-id-card-label{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:22px}

/* Logo card */
.nt-logo-display{display:flex;flex-direction:column;align-items:center;gap:20px}
.nt-logo-main{background:var(--grad-soft);border:1.5px solid var(--border);border-radius:16px;
  padding:30px 40px;display:flex;align-items:center;justify-content:center;width:100%}
.nt-logo-main img{max-width:120px;height:auto;object-fit:contain}
.nt-logo-main-placeholder{
// font-family:'Syne',sans-serif;
font-size:1.5rem;font-weight:800;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nt-logo-variants{display:flex;gap:12px;width:100%}
.nt-logo-var{flex:1;background:var(--bg2);border:1.5px solid var(--border);border-radius:12px;
  padding:14px;display:flex;align-items:center;justify-content:center}
.nt-logo-var.dark{background:var(--deep)}
.nt-logo-var img{width:36px;height:36px;object-fit:contain}
.nt-logo-desc{font-size:.78rem;line-height:1.65;color:var(--ink-muted);font-weight:400;text-align:center}

/* Palette card */
.nt-palette{display:flex;flex-direction:column;gap:10px}
.nt-color-row{display:flex;gap:8px}
.nt-swatch{flex:1;border-radius:12px;min-height:56px;position:relative;overflow:hidden;
  display:flex;align-items:flex-end;padding:8px 10px;transition:transform .2s}
.nt-swatch:hover{transform:scale(1.04)}
.nt-swatch-label{font-size:.6rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.nt-swatch.tall{min-height:80px}

/* Typography card */
.nt-typo-samples{display:flex;flex-direction:column;gap:18px}
.nt-typo-row{padding-bottom:18px;border-bottom:1px solid var(--border)}
.nt-typo-row:last-child{border-bottom:none;padding-bottom:0}
.nt-typo-name{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:8px}

/* FEATURES */
.nt-features{background:white}
.nt-features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:50px}
.nt-feat-card{background:var(--bg);border:1.5px solid var(--border);border-radius:18px;
  padding:28px 24px;transition:all .3s;position:relative;overflow:hidden}
.nt-feat-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);
  opacity:0;transition:opacity .3s}
.nt-feat-card:hover::before{opacity:1}
.nt-feat-card:hover{border-color:var(--sky);transform:translateY(-4px);
  box-shadow:0 12px 40px rgba(54,161,208,.1)}
.nt-feat-icon{width:44px;height:44px;border-radius:12px;background:var(--bg2);
  display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent);
  margin-bottom:16px;position:relative;z-index:1;transition:background .3s}
.nt-feat-card:hover .nt-feat-icon{background:var(--accent);color:white}
.nt-feat-name{font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:8px;position:relative;z-index:1}
.nt-feat-desc{font-size:.82rem;line-height:1.7;color:var(--ink-muted);font-weight:400;position:relative;z-index:1}

/* PROCESS */
.nt-process{background:var(--bg)}
.nt-process-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:50px;
  border-radius:24px;overflow:hidden;border:2px solid var(--border)}
.nt-proc-step{background:white;padding:44px 32px;transition:background .3s}
.nt-proc-step+.nt-proc-step{border-left:1px solid var(--border)}
.nt-proc-step:hover{background:var(--bg2)}
.nt-proc-n{
// font-family:'Syne',sans-serif;
font-size:3.5rem;font-weight:800;line-height:1;margin-bottom:16px;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;opacity:.35;letter-spacing:-.05em}
.nt-proc-title{font-size:1.1rem;font-weight:700;color:var(--ink);margin-bottom:10px}
.nt-proc-desc{font-size:.86rem;line-height:1.75;color:var(--ink-soft);font-weight:400}

/* DIAGRAMS SECTION */
.nt-diagrams{background:white}
.nt-diagrams-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:50px}
.nt-diagram-card{border-radius:20px;overflow:hidden;
transition:all .3s}
.nt-diagram-card:hover{transform:translateY(-4px);box-shadow:0 28px 60px rgba(54,161,208,.15)}
.nt-diagram-card-header{padding:16px 20px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:10px}
.nt-diagram-card-title{font-size:.78rem;font-weight:700;color:var(--ink);letter-spacing:.02em}
.nt-diagram-card-icon{width:30px;height:30px;border-radius:8px;background:var(--grad);
  display:flex;align-items:center;justify-content:center;color:white;font-size:.85rem;flex-shrink:0}
.nt-diagram-card img{width:100%;height:auto;display:block;object-fit:contain}
.nt-diagram-placeholder{width:100%;aspect-ratio:4/3;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:10px;color:var(--ink-muted);padding:40px}
.nt-diagram-placeholder span{font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;opacity:.5}

/* ── SCREENS HORIZONTAL SCROLL ── */
.nt-screens-section{background:var(--bg);padding:100px 0}
.nt-screens-header{padding:0 80px;margin-bottom:20px}
.nt-screens-sublabel{font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-muted);margin-bottom:8px;padding:0 80px;margin-top:32px}
.nt-track-wrap{overflow-x:auto;padding:0 80px 20px;
  scrollbar-width:thin;scrollbar-color:var(--accent) var(--bg2);cursor:grab;user-select:none}
.nt-track-wrap:active{cursor:grabbing}
.nt-track-wrap::-webkit-scrollbar{height:5px}
.nt-track-wrap::-webkit-scrollbar-track{background:var(--bg2);border-radius:3px}
.nt-track-wrap::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}
.nt-screen-row{display:flex;gap:16px;padding-bottom:4px;min-width:max-content}
.nt-screen-card{flex-shrink:0;width:250px;border-radius:18px;overflow:hidden;;
transition:all .3s}
.nt-screen-card:hover{transform:translateY(-6px) scale(1.01);
  box-shadow:0 16px 40px rgba(54,161,208,.18);border-color:var(--sky)}
.nt-screen-card img{width:100%;height:auto;display:block;object-fit:cover}
.nt-screen-type-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;
  border-radius:100px;font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
.nt-screen-type-badge.hifi{background:var(--sky);color:var(--deep)}
.nt-screen-type-badge.lofi{background:var(--blush);color:#5a2e2c}

/* TECH DECISIONS */
.nt-tech-section{background:white}
.nt-tech-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:50px}
.nt-tech-card{background:var(--bg);border:1.5px solid var(--border);border-radius:18px;padding:28px;transition:all .3s}
.nt-tech-card:hover{box-shadow:var(--shadow);transform:translateY(-3px)}
.nt-tech-card-num{// font-family:'Syne',sans-serif;
  font-size:2rem;font-weight:800;letter-spacing:-.04em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;opacity:.4;margin-bottom:12px}
.nt-tech-card-title{font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:8px}
.nt-tech-card-desc{font-size:.82rem;line-height:1.75;color:var(--ink-muted)}

/* TESTING */
.nt-testing{background:var(--bg);padding:100px 80px}
.nt-testing-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:50px}
.nt-test-card{background:white;border:1.5px solid var(--border);border-radius:20px;padding:36px;transition:all .3s}
.nt-test-card:hover{box-shadow:var(--shadow);transform:translateY(-4px)}
.nt-test-card-badge{display:inline-block;background:var(--bg2);color:var(--accent);
  font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  padding:4px 12px;border-radius:100px;margin-bottom:20px;border:1.5px solid var(--border)}
.nt-feedback-list{list-style:none}
.nt-feedback-list li{display:flex;gap:12px;align-items:flex-start;
  padding:10px 0;border-bottom:1px solid var(--border);font-size:.9rem;
  color:var(--ink-soft);font-weight:400;line-height:1.65}
.nt-feedback-list li:last-child{border-bottom:none}
.nt-feedback-check{color:var(--accent);flex-shrink:0;margin-top:3px}

/* REFLECTION */
.nt-reflection{background:white;padding:100px 80px}
.nt-reflection-grid{display:grid;grid-template-columns:3fr 2fr;gap:60px;align-items:start;margin-top:50px}
.nt-reflection-text p{font-size:.97rem;line-height:1.9;color:var(--ink-soft);font-weight:400;margin-bottom:18px}
.nt-reflection-text p:last-child{margin-bottom:0}
.nt-reflection-aside{display:flex;flex-direction:column;gap:16px;position:sticky;top:100px}
.nt-ref-highlight{background:var(--bg);border:1.5px solid var(--border);border-radius:18px;padding:24px;
  border-left:4px solid var(--accent)}
.nt-ref-highlight-label{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--accent);margin-bottom:8px}
.nt-ref-highlight-text{font-size:.88rem;line-height:1.65;color:var(--ink-soft);font-weight:400}

/* LIMITATIONS */
.nt-limitations{background:var(--bg);padding:100px 80px}
.nt-lim-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:50px}
.nt-lim-card{background:white;border:1.5px solid var(--border);border-radius:18px;padding:28px;transition:all .3s}
.nt-lim-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
.nt-lim-card-icon{width:40px;height:40px;border-radius:10px;margin-bottom:14px;
  display:flex;align-items:center;justify-content:center;font-size:1rem}
.nt-lim-card-title{font-size:.92rem;font-weight:700;color:var(--ink);margin-bottom:8px}
.nt-lim-card-desc{font-size:.82rem;line-height:1.7;color:var(--ink-muted)}

/* OUTCOME */
.nt-outcome{background:var(--bg);padding:100px 80px}
.nt-outcome-inner{background:var(--grad-deep);border-radius:28px;padding:80px;
  text-align:center;position:relative;overflow:hidden}
.nt-outcome-inner::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;
  background:rgba(255,255,255,.05);top:-200px;right:-200px;pointer-events:none}
.nt-outcome-inner::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;
  background:rgba(255,255,255,.05);bottom:-150px;left:-100px;pointer-events:none}
.nt-out-eyebrow{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;
  color:rgba(255,255,255,.55);margin-bottom:16px}
.nt-out-title{
// font-family:'Syne',sans-serif;
  font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;line-height:1.15;
  letter-spacing:-.04em;color:white;max-width:600px;margin:0 auto 20px;position:relative;z-index:1}
.nt-out-desc{font-size:.97rem;line-height:1.75;color:rgba(255,255,255,.75);font-weight:400;
  max-width:520px;margin:0 auto 44px;position:relative;z-index:1}
.nt-out-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.nt-btn-white{display:inline-flex;align-items:center;gap:9px;background:white;color:var(--accent);
  padding:13px 24px;border-radius:100px;font-size:.82rem;font-weight:600;text-decoration:none;transition:all .3s}
.nt-btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
.nt-btn-outline-white{display:inline-flex;align-items:center;gap:9px;background:transparent;
  color:white;border:1.5px solid rgba(255,255,255,.4);padding:13px 24px;border-radius:100px;
  font-size:.82rem;font-weight:600;text-decoration:none;transition:all .3s}
.nt-btn-outline-white:hover{background:rgba(255,255,255,.12);border-color:white;transform:translateY(-2px)}

/* FOOTER */
.nt-footer{background:var(--deep);padding:40px 80px;
  display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid rgba(255,255,255,.06)}
.nt-footer-brand{
// font-family:'Syne',sans-serif;
  font-size:1.1rem;font-weight:800;letter-spacing:-.04em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nt-footer-text{font-size:.76rem;color:rgba(255,255,255,.3);font-weight:400}

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
@keyframes ntFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes ntFadeIn{from{opacity:0}to{opacity:1}}

/* RESPONSIVE */
@media(max-width:1024px){
  .nt-hero{grid-template-columns:1fr;padding:110px 32px 60px;text-align:center}
  .nt-hero-content{align-items:center;display:flex;flex-direction:column}
  .nt-hero-desc{text-align:left}
  .nt-hero-visual{margin-top:20px}
  .nt-float-badges{right:auto;left:-80px;top:10px;transform:none}
  .nt-stats{grid-template-columns:1fr 1fr;padding:36px 24px}
  .nt-section,.nt-testing,.nt-reflection,.nt-limitations,.nt-outcome{padding:70px 24px}
  .nt-screens-header,.nt-track-wrap,.nt-screens-sublabel{padding-left:24px;padding-right:24px}
  .nt-overview-grid{grid-template-columns:1fr}
  .nt-identity-grid{grid-template-columns:1fr}
  .nt-features-grid{grid-template-columns:1fr 1fr}
  .nt-process-strip{grid-template-columns:1fr}
  .nt-proc-step+.nt-proc-step{border-left:none;border-top:1px solid var(--border)}
  .nt-diagrams-grid{grid-template-columns:1fr}
  .nt-tech-grid{grid-template-columns:1fr}
  .nt-testing-grid{grid-template-columns:1fr}
  .nt-lim-grid{grid-template-columns:1fr}
  .nt-reflection-grid{grid-template-columns:1fr}
  .nt-reflection-aside{position:static}
  .nt-outcome-inner{padding:44px 24px}
  .nt-footer{flex-direction:column;gap:14px;text-align:center;padding:28px 24px}
  .nt-nav,.nt-nav.scrolled{padding:14px 70px 14px 24px}
}
@media(max-width:600px){
  .nt-features-grid{grid-template-columns:1fr}
  .nt-screen-card{width:140px}
  .nt-float-badges{display:none}
  .nt-hero-title{font-size:clamp(2.8rem,12vw,4.5rem)}
}

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
const IconAndroid = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341A5.96 5.96 0 0012 11a5.96 5.96 0 00-5.523 4.341L3 16v2h18v-2l-3.477-.659zM8.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 2L9.5 5.5h5L12 2z"/>
  </svg>
);

/* ── DRAG SCROLL HOOK ── */
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

const features = [
  [<FiFilter/>, 'Dropdown Filters', 'Select year, major, and semester via streamlined dropdowns — replacing 11+ buttons with a compact, readable interface.'],
  [<FiDatabase/>, 'Custom JSON Dataset', 'Hand-crafted JSON sourced from the official Bath Spa University website, providing accurate and updatable module data.'],
  [<FiLayout/>, 'Scrollable Card UI', 'Module titles, descriptions, learning tools with images, and clickable resource links — all organised into clean cards.'],
  [<FiDownload/>, 'Picasso Image Loading', 'Efficient async image loading via the Picasso library, with images hosted on Imgur to prevent broken links.'],
  [<FiVolume2/>, 'Sound Feedback', 'MediaPlayer integration plays audio on button interactions via a reusable ButtonSoundPlayer.kt object.'],
  [<FiLink/>, 'Clickable Resources', 'Direct links to module resources embedded in each card, providing instant access to learning materials.'],
];

const techDecisions = [
  ['01', 'Custom JSON Dataset', 'Bath Spa lacked a public undergraduate module API, so a fully custom JSON file was built. It provides exact structure control, update flexibility, and scalability — nested by major, year, and semester.'],
  ['02', 'Spinner (Dropdown) UI', 'Dropdowns were chosen over buttons because 11 individual buttons would have overcrowded the single-view layout. Spinners were customised via XML to adjust text size and visual appearance.'],
  ['03', 'Picasso for Images', 'Tool icons are hosted on Imgur and loaded via Picasso for efficient async rendering. This approach avoids bundled asset bloat and prevents broken image issues across devices.'],
  ['04', 'Optimised Scrolling', 'Layout modifiers and TypedValue provide fine-grained scroll control for nested card views across different screen sizes, preventing overflow and layout collapse.'],
];

/* ── MAIN COMPONENT ── */
export default function TermTracker() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const trackRef = useDragScroll();

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

  return (
    <>
      <style>{styles}</style>
      <div className="nt-root">
        {/* progress */}
        <div className="nt-prog" style={{ width: `${scrollPct}%` }}/>

        {/* back */}
        <a href="/Home" className="nt-back" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack/> Back
        </a>

        {/* nav */}
        <nav className={`nt-nav${scrolled ? ' scrolled' : ''}`}>
          <ul className="nt-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#identity">Design</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#screens">Screens</a></li>
            <li><a href="#diagrams">Diagrams</a></li>
            <li><a href="#figma">Prototype</a></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="nt-hero" id="hero">
          <div className="nt-hero-bg">
            {/* <div className="nt-hero-blob1"/> */}
            {/* <div className="nt-hero-blob2"/> */}
            {/* <div className="nt-hero-dot-grid"/> */}
          </div>

          <div className="nt-hero-content">
            <div className="nt-hero-tag">
              <span className="nt-tag-dot"/>
              Android App · UX & Development
            </div>
            <h1 className="nt-hero-title">
              <span className="nt-grad-text">NAAN</span>
            </h1>
            <div className="nt-hero-title-sub">Term Tracker. <span className="nt-warm-text">Built for students.</span></div>
            <p className="nt-hero-desc">
              An Android app helping Bath Spa University undergraduates explore their modules — with detailed descriptions, learning tools, and resource links — all filtered by year, major, and semester in a clean single-view layout.
            </p>
            <div className="nt-hero-ctas">
              <a href="https://www.figma.com/design/uwknZMi5leroxCNmcK103E/Project-Collection?node-id=0-1&t=AbZem0Mc3TxSpQaI-1" target="_blank" rel="noopener noreferrer" className="nt-btn-grad">
                <IconFigma/> View Figma
              </a>
              <a href="#screens" className="nt-btn-ghost">
                <IconAndroid/> See Screens
              </a>
            </div>
          </div>

          {/* app card mockup */}
          <div className="nt-hero-visual">
            <div style={{ position: 'relative' }}>
                         <div className="hope-phone">
                <video autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}>
                  <source src={`${process.env.PUBLIC_URL}/bsuV6.mp4`} type="video/mp4"/>
                </video>
              </div>
              {/* float badges */}
              <div className="nt-float-badges">
                {[
                  'Android Native',
                  'Kotlin + XML',
                  'JSON Dataset',
                ].map(label => (
                  <div key={label} className="nt-float-badge">
                    <span className="nt-float-badge-dot"/>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="nt-stats h-stagger">
          {[['3', 'Filter Dropdowns'], ['100%', 'Official Content'], ['Kotlin', 'Language'], ['Figma', 'Prototype']].map(([num, label], i) => (
            <div key={i} className="nt-stat">
              <div className="nt-stat-num">{num}</div>
              <div className="nt-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* OVERVIEW */}
        <section className="nt-section nt-overview" id="overview">
          <div className="nt-overview-grid">
            <div className="h-reveal-l">
              <div className="nt-eyebrow">About the project</div>
              <h2 className="nt-sec-title">Module info, <em>centralised</em></h2>
              <p>Term Tracker was developed to solve a real problem: Bath Spa University students struggle to find detailed, consolidated module information before each semester. The university's existing app and website cover basics — but learning tools, reliable resources, and module descriptions are scattered or absent.</p>
              <p>The app functions as a single-view Android application that lets students filter by year, major, and semester to instantly surface module cards with titles, descriptions, tool icons, and clickable resource links. Module data was sourced directly from the university's official website to guarantee accuracy.</p>
              <div className="nt-tech-label">Tools & Technologies</div>
              <div className="nt-tech-pills h-stagger">
                {['Android Studio', 'Kotlin', 'XML Layouts', 'JSON', 'Picasso', 'CardView', 'MediaPlayer', 'Figma', 'UX Research', 'User Testing'].map(t => (
                  <span key={t} className="nt-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="nt-aside-card h-reveal-r">
              {[
                ['Project Type', 'Native Android Application'],
                ['Scope', 'Android Dev + UX Design'],
                ['Target Users', 'Bath Spa University Undergrads'],
                ['Platform', 'Android (Native — Kotlin)'],
                ['Design Tool', 'Figma — Hi-Fi Prototype'],
                ['Assessment', 'NAAN Calculator — Term Tracker'],
              ].map(([k, v]) => (
                <div key={k} className="nt-aside-item">
                  <div className="nt-aside-key">{k}</div>
                  <div className="nt-aside-val">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VISUAL IDENTITY — 3 cards */}
        <section className="nt-section nt-identity" id="identity">
          <div className="h-reveal">
            <div className="nt-eyebrow">Brand & Visual Identity</div>
            <h2 className="nt-sec-title">The <em>design language</em> of Term Tracker</h2>
          </div>
          <div className="nt-identity-grid h-stagger">

            {/* Card 1 — Logo */}
            <div className="nt-id-card">
              <div className="nt-id-card-label">Logo System</div>
              <div className="nt-logo-display">
                <div className="nt-logo-main">
                  <img src={appLogo} alt="Term Tracker Logo"
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                  />
                  <span className="nt-logo-main-placeholder" style={{ display:'none' }}>NAAN</span>
                </div>
                <div className="nt-logo-variants">
                  <div className="nt-logo-var">
                    <img src={appLogo} alt="Icon light"
                      onError={e => { e.target.style.display='none'; }}
                    />
                  </div>
                  <div className="nt-logo-var dark">
                    <img src={appLogo} alt="Icon dark"
                      style={{ filter:'brightness(0) invert(1)' }}
                      onError={e => { e.target.style.display='none'; }}
                    />
                  </div>
                </div>
                <p className="nt-logo-desc">The app icon uses a clean, geometric form that scales clearly from launcher to notification tray. Both light and dark variants are provided for system adaptability.</p>
              </div>
            </div>

            {/* Card 2 — Colour Palette */}
            <div className="nt-id-card">
              <div className="nt-id-card-label">Colour Palette</div>
              <div className="nt-palette">
                <div className="nt-color-row">
                  <div className="nt-swatch tall" style={{ background: 'linear-gradient(135deg,#53C5F6,#36A1D0)', flex: 2 }}>
                    <span className="nt-swatch-label" style={{ color: 'white' }}>Primary Gradient</span>
                  </div>
                  <div className="nt-swatch tall" style={{ background: '#115A7A' }}>
                    <span className="nt-swatch-label" style={{ color: 'rgba(255,255,255,.75)' }}>#115A7A</span>
                  </div>
                </div>
                <div className="nt-color-row">
                  <div className="nt-swatch" style={{ background: '#53C5F6' }}>
                    <span className="nt-swatch-label" style={{ color: 'white' }}>#53C5F6</span>
                  </div>
                  <div className="nt-swatch" style={{ background: '#36A1D0' }}>
                    <span className="nt-swatch-label" style={{ color: 'white' }}>#36A1D0</span>
                  </div>
                </div>
                <div className="nt-color-row">
                  <div className="nt-swatch" style={{ background: '#E8E8E8' }}>
                    <span className="nt-swatch-label" style={{ color: '#666' }}>#E8E8E8</span>
                  </div>
                  <div className="nt-swatch" style={{ background: '#D8B0AE' }}>
                    <span className="nt-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>#D8B0AE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Typography */}
            <div className="nt-id-card">
              <div className="nt-id-card-label">Typography</div>
              <div className="nt-typo-samples">
                <div className="nt-typo-row">
                  <div className="nt-typo-name">Display — Syne</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-.04em', color: 'var(--ink)' }}>
                    Term <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Tracker</span>
                  </div>
                </div>
                <div className="nt-typo-row">
                  <div className="nt-typo-name">Body — Sans-Serif (Roboto)</div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '.92rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                    Clean, legible, and familiar — reducing cognitive load for students scanning module content.
                  </div>
                </div>
                <div className="nt-typo-row">
                  <div className="nt-typo-name">Label — Instrument Sans Medium</div>
                  <div style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Year 1 · Semester 1 · CS
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="nt-section nt-features" id="features">
          <div className="h-reveal">
            <div className="nt-eyebrow">App Features</div>
            <h2 className="nt-sec-title">Everything a student <em>needs</em></h2>
          </div>
          <div className="nt-features-grid h-stagger">
            {features.map(([icon, name, desc]) => (
              <div key={name} className="nt-feat-card">
                <div className="nt-feat-icon">{icon}</div>
                <div className="nt-feat-name">{name}</div>
                <p className="nt-feat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="nt-section nt-process" id="process">
          <div className="h-reveal">
            <div className="nt-eyebrow">Design & Development Process</div>
            <h2 className="nt-sec-title">From idea to <em>working app</em></h2>
          </div>
          <div className="nt-process-strip h-stagger">
            {[
              ['01', 'Research & Goals', 'Identified a genuine gap — students lacked a single, reliable source for undergraduate module details. Competitive analysis of the university\'s existing app and website revealed missing content: learning tools, resources, and clear descriptions. The project brief required a single-view layout that respects screen space.'],
              ['02', 'Design & Prototyping', 'A Figma prototype mapped the full interface before development began. The single-view layout was chosen to minimise navigation complexity. Dropdown filters replaced multiple buttons to keep the UI compact and legible. A blue-and-white colour scheme with soft shadows creates a calm, academic feel.'],
              ['03', 'Development & Testing', 'The Android app was built natively in Kotlin with XML layouts. CardView components, Picasso image loading, and a custom JSON dataset were integrated. MediaPlayer adds audio feedback. Test cases validated all dropdown combinations and card rendering across screen sizes.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="nt-proc-step">
                <div className="nt-proc-n">{n}</div>
                <div className="nt-proc-title">{title}</div>
                <p className="nt-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCREENS — combined hi-fi + lo-fi horizontal scroll ── */}
        <section className="nt-screens-section" id="screens">
          <div className="nt-screens-header h-reveal">
            <div className="nt-eyebrow">App Screens</div>
            <h2 className="nt-sec-title">Every screen, <em>designed</em></h2>
            <p style={{ marginTop: 14, fontSize: '.92rem', color: 'var(--ink-muted)', fontWeight: 400 }}>
              Drag to scroll · High-fidelity and wireframe screens
            </p>
          </div>

          {/* Hi-Fi row */}
          <div className="nt-screens-sublabel h-reveal">
            <span className="nt-screen-type-badge hifi">High Fidelity & Wireframes</span>
          </div>
          <div className="nt-track-wrap" ref={trackRef}>
            <div className="nt-screen-row">
              {hifiScreens.map((src, i) => (
                <div key={i} className="nt-screen-card">
                  <img src={src} alt={`Hi-fi screen ${i + 1}`}/>
                </div>
              ))}
            </div>
          </div>

          {/* Lo-Fi row */}
          {/* <div className="nt-screens-sublabel h-reveal" style={{ marginTop: 32 }}>
            <span className="nt-screen-type-badge lofi">Wireframes / Lo-Fi</span>
          </div>
          <div className="nt-track-wrap">
            <div className="nt-screen-row">
              {lofiScreens.map((src, i) => (
                <div key={i} className="nt-screen-card">
                  <img src={src} alt={`Wireframe ${i + 1}`}/>
                </div>
              ))}
            </div>
          </div> */}
        </section>

        {/* DIAGRAMS */}
        <section className="nt-section nt-diagrams" id="diagrams">
          <div className="h-reveal">
            <div className="nt-eyebrow">Architecture & Flow</div>
            <h2 className="nt-sec-title">How the data <em>flows</em></h2>
          </div>
          <div className="nt-diagrams-grid">
            <div className="nt-diagram-card h-reveal-l">
              <div className="nt-diagram-card-header">
                <div className="nt-diagram-card-icon"><FiDatabase size={14}/></div>
                <span className="nt-diagram-card-title">JSON Nesting Diagram</span>
              </div>
              <img src={jsonDiagram} alt="JSON nesting structure diagram"
                onError={e => {
                  e.target.style.display='none';
                  e.target.nextSibling.style.display='flex';
                }}
              />
              <div className="nt-diagram-placeholder" style={{ display:'none' }}>
                <FiDatabase size={32} style={{ opacity:.3, color:'var(--accent)' }}/>
                <span>JSON Nesting Diagram</span>
              </div>
            </div>
            <div className="nt-diagram-card h-reveal-r">
              <div className="nt-diagram-card-header">
                <div className="nt-diagram-card-icon"><FiUsers size={14}/></div>
                <span className="nt-diagram-card-title">User Flow Diagram</span>
              </div>
              <img src={userFlow} alt="User flow diagram"
                onError={e => {
                  e.target.style.display='none';
                  e.target.nextSibling.style.display='flex';
                }}
              />
              <div className="nt-diagram-placeholder" style={{ display:'none' }}>
                <FiUsers size={32} style={{ opacity:.3, color:'var(--accent)' }}/>
                <span>User Flow Diagram</span>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL DECISIONS */}
        <section className="nt-section nt-tech-section" id="tech">
          <div className="h-reveal">
            <div className="nt-eyebrow">Technical Decisions</div>
            <h2 className="nt-sec-title">Why each choice <em>was made</em></h2>
          </div>
          <div className="nt-tech-grid h-stagger">
            {techDecisions.map(([n, title, desc]) => (
              <div key={n} className="nt-tech-card">
                <div className="nt-tech-card-num">{n}</div>
                <div className="nt-tech-card-title">{title}</div>
                <p className="nt-tech-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTING */}
        <section className="nt-testing" id="testing">
          <div className="h-reveal">
            <div className="nt-eyebrow">Test Cases & Validation</div>
            <h2 className="nt-sec-title">Verified across <em>all combinations</em></h2>
          </div>
          <div className="nt-testing-grid">
            <div className="nt-test-card h-reveal-l">
              <div className="nt-test-card-badge">Functionality Tests</div>
              <ul className="nt-feedback-list">
                {[
                  'All dropdown combinations display the correct module cards without error.',
                  'Clickable resource links open correctly in the device browser.',
                  'Tool icons load via Picasso across varying network speeds.',
                  'Sound effects trigger reliably on all tested button interactions.',
                ].map((item, i) => (
                  <li key={i}><FiCheckCircle size={14} className="nt-feedback-check"/>{item}</li>
                ))}
              </ul>
            </div>
            <div className="nt-test-card h-reveal-r">
              <div className="nt-test-card-badge">UI & Layout Tests</div>
              <ul className="nt-feedback-list">
                {[
                  'Scrollable card layout renders without overflow across tested screen sizes.',
                  '3D-styled icons display consistently on different Android API levels.',
                  'Info button tooltip appears and dismisses correctly.',
                  'Single-view layout maintains usability on both small and large screens.',
                ].map((item, i) => (
                  <li key={i}><FiCheckCircle size={14} className="nt-feedback-check"/>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 24, background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 14 }} className="h-reveal">
            <FiFileText size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}/>
            <p style={{ fontSize: '.88rem', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 400 }}>
              Full test case documentation is available in the Evidence Folder, including screen-recorded test runs and the complete <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>Test Case Table</strong>. Testing was conducted against the project brief requirements and real user device conditions.
            </p>
          </div>
        </section>

        {/* LIMITATIONS */}
        <section className="nt-limitations" id="limitations">
          <div className="h-reveal">
            <div className="nt-eyebrow">Limitations & Future Work</div>
            <h2 className="nt-sec-title">What comes <em>next</em></h2>
          </div>
          <div className="nt-lim-grid h-stagger">
            {[
              { icon: <FiBook size={18}/>, iconBg: 'var(--bg2)', iconColor: 'var(--accent)', title: 'Undergraduate Only', desc: 'The current dataset covers undergraduate modules only. Foundation and postgraduate levels were out of scope due to time constraints, but represent a clear expansion path.' },
              { icon: <FiUsers size={18}/>, iconBg: '#f0fafe', iconColor: 'var(--ocean)', title: 'Tutor Contact Info', desc: 'Adding module tutor contact details would let students reach the right person directly from the app — a high-value addition that emerged during development review.' },
              { icon: <FiCode size={18}/>, iconBg: '#fdf4f4', iconColor: '#b05c5a', title: 'Live Data Sync', desc: 'Currently the JSON is static. A future version could sync with an institutional API or CMS, ensuring module data stays current without manual updates each semester.' },
            ].map(({ icon, iconBg, iconColor, title, desc }) => (
              <div key={title} className="nt-lim-card">
                <div className="nt-lim-card-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
                <div className="nt-lim-card-title">{title}</div>
                <p className="nt-lim-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REFLECTION */}
        <section className="nt-reflection" id="reflection">
          <div className="h-reveal">
            <div className="nt-eyebrow">Critical Evaluation</div>
            <h2 className="nt-sec-title">What I learned <em>building this</em></h2>
          </div>
          <div className="nt-reflection-grid">
            <div className="nt-reflection-text h-reveal-l">
              <p>Term Tracker was built from a genuine frustration — the difficulty of gathering module information before each semester at Bath Spa University. Starting from a real need rather than a hypothetical one shaped every design and technical decision throughout the project.</p>
              <p>The choice to use dropdown filters instead of individual buttons was the defining UI decision. Eleven separate buttons would have overwhelmed a single-view layout; three dropdowns achieved the same filtering power while keeping the interface clean and readable. The project brief's constraint of a single view became an asset rather than a limitation.</p>
              <p>Building the custom JSON dataset was the most time-intensive technical challenge. Without an official API, every module had to be researched and formatted manually from the university website. The upside: total control over structure, and a dataset that can be updated and expanded without touching the application code.</p>
              <p>If developed further, adding postgraduate and foundation-year modules would significantly broaden the app's value. Tutor contact details — identified as a gap during the evaluation phase — would make Term Tracker a complete first-stop for any new Bath Spa student.</p>
            </div>
            <div className="nt-reflection-aside h-reveal-r">
              {[
                { label: 'Key Decision', text: 'Dropdowns over buttons: 3 controls replaced 11, keeping the single-view layout clean without sacrificing filtering power.' },
                { label: 'Biggest Challenge', text: 'Hand-crafting the JSON dataset from official university pages — time-consuming, but it gave full structural control and ensured accuracy.' },
                { label: 'Future Priority', text: 'Expanding to postgraduate and foundation levels, and adding direct tutor contact info within each module card.' },
              ].map(({ label, text }) => (
                <div key={label} className="nt-ref-highlight">
                  <div className="nt-ref-highlight-label">{label}</div>
                  <p className="nt-ref-highlight-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="nt-outcome" id="figma">
          <div className="nt-outcome-inner h-reveal-s">
            <div className="nt-out-eyebrow">Final Outcome</div>
            <h2 className="nt-out-title">A focused, student-built Android app that centralises module knowledge for Bath Spa undergrads</h2>
            <p className="nt-out-desc">Term Tracker eliminates the pre-semester information hunt with clean filtering, reliable content sourced directly from the university, and a polished single-view experience.</p>
            <div className="nt-out-ctas">
              <a href="https://www.figma.com/design/uwknZMi5leroxCNmcK103E/Project-Collection?node-id=0-1&t=AbZem0Mc3TxSpQaI-1" target="_blank" rel="noopener noreferrer" className="nt-btn-white">
                <IconFigma/> View Figma Prototype
              </a>
              <a href="#screens" className="nt-btn-outline-white">
                <IconExternal/> Browse Screens
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nt-footer">
          <span className="nt-footer-brand">NAAN · Term Tracker</span>
          <p className="nt-footer-text">Android App Design & Development — Sahar AbdulQadir</p>
        </footer>
      </div>
    </>
  );
}