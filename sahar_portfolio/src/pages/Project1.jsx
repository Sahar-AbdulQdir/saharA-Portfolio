import { useEffect, useRef, useState } from "react";
import Heroimg1 from "../assets/Images/le1.png";
import highimg from "../assets/Images/test.png";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f5f3ff; --bg2: #ede9fe; --white: #fefeff; --ink: #1e1730; --ink-soft: #4b4270; --ink-muted: #8b82b0;
    --violet: #7c3aed; --violet-mid: #9d5cf6; --violet-lt: #c4b5fd; --violet-pale: #ede9fe;
    --blue: #2563eb; --blue-mid: #60a5fa; --blue-lt: #bfdbfe; --blue-pale: #eff6ff;
    --grad: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
    --grad-soft: linear-gradient(135deg, #ede9fe 0%, #eff6ff 100%);
    --border: #ddd6fe; --border-s: #a78bfa; --shadow: 0 20px 60px rgba(124,58,237,0.12);
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--ink); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

  .lm-root {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--ink);
    overflow-x: hidden;
    position: relative;
  }
  .lm-root::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity:.6;
  }

  /* PROGRESS */
  .lm-prog { position:fixed; top:0; left:0; height:3px; z-index:1000; background:var(--grad); transition:width .1s; box-shadow:0 0 14px rgba(124,58,237,.5); }

  /* BACK */
  .lm-back-btn {
    position:fixed; top:24px; left:28px; z-index:200;
    display:flex; align-items:center; gap:8px;
    background:white; border:1.5px solid var(--border); border-radius:100px;
    padding:8px 18px 8px 12px; font-size:.78rem; font-weight:500; color:var(--ink-soft);
    text-decoration:none; cursor:pointer;
    box-shadow:0 4px 16px rgba(124,58,237,.1);
    transition:all .3s; animation:lmFadeUp .6s .1s both;
  }
  .lm-back-btn:hover { background:var(--violet); color:white; border-color:var(--violet); transform:translateX(-3px); box-shadow:0 6px 20px rgba(124,58,237,.3); }
  .lm-back-btn svg { transition:transform .3s; }
  .lm-back-btn:hover svg { transform:translateX(-3px); }

  /* NAV */
  .lm-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:center; padding:20px 60px; transition:all .4s; pointer-events:none; }
  .lm-nav.scrolled { background:rgba(245,243,255,.92); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); padding:14px 60px; pointer-events:all; justify-content:space-between; }
  .lm-nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; opacity:0; transition:opacity .3s; }
  .lm-nav.scrolled .lm-nav-logo { opacity:1; }
  .lm-nav-logo-icon { width:32px; height:32px; border-radius:8px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
  .lm-nav-logo-text { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:var(--ink); letter-spacing:-.02em; }
  .lm-nav-links { display:flex; gap:28px; list-style:none; }
  .lm-nav-links a { font-size:.75rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft); text-decoration:none; transition:color .2s; }
  .lm-nav-links a:hover { color:var(--violet); }

  /* HERO */
  .lm-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; padding:0 80px 0 100px; align-items:center; gap:60px; position:relative; overflow:hidden; }
  .lm-hero-blob1 { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%); top:-100px; right:-100px; pointer-events:none; animation:lmBlobPulse 8s ease-in-out infinite; }
  .lm-hero-blob2 { position:absolute; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%); bottom:50px; left:-50px; pointer-events:none; animation:lmBlobPulse 10s ease-in-out infinite reverse; }
  @keyframes lmBlobPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  .lm-hero-content { position:relative; z-index:1; }
  .lm-hero-tag { display:inline-flex; align-items:center; gap:8px; background:white; border:1.5px solid var(--border); border-radius:100px; padding:6px 16px; font-size:.72rem; font-weight:600; letter-spacing:.07em; text-transform:uppercase; color:var(--violet); margin-bottom:28px; box-shadow:0 4px 16px rgba(124,58,237,.1); animation:lmFadeUp .7s .2s both; }
  .lm-hero-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--violet); }
  .lm-hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(3.8rem,7vw,7rem); font-weight:300; line-height:.95; letter-spacing:-.04em; color:var(--ink); margin-bottom:28px; animation:lmFadeUp .8s .35s both; }
  .lm-grad-text { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-style:italic; }
  .lm-hero-desc { font-size:1rem; line-height:1.8; color:var(--ink-soft); font-weight:300; max-width:420px; margin-bottom:40px; animation:lmFadeUp .8s .5s both; }
  .lm-hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:lmFadeUp .8s .65s both; }
  .lm-btn-grad { display:inline-flex; align-items:center; gap:9px; background:var(--grad); color:white; padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; box-shadow:0 6px 20px rgba(124,58,237,.3); }
  .lm-btn-grad:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(124,58,237,.45); }
  .lm-btn-ghost { display:inline-flex; align-items:center; gap:9px; background:white; color:var(--ink-soft); border:1.5px solid var(--border); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .lm-btn-ghost:hover { border-color:var(--violet); color:var(--violet); transform:translateY(-2px); }

  /* HERO VISUAL */
  .lm-hero-visual { position:relative; z-index:1; animation:lmFadeIn 1s .8s both; display:flex; align-items:center; justify-content:center; }
  .lm-hero-mockup { width:100%; max-width:550px; background:white; border-radius:14px; border:1px solid var(--border); box-shadow:0 40px 80px rgba(124,58,237,.15),0 8px 24px rgba(124,58,237,.08); overflow:hidden; animation:lmFloatMock 7s ease-in-out infinite; }
  @keyframes lmFloatMock { 0%,100%{transform:perspective(1000px) rotateY(-10deg) rotateX(4deg) translateY(0)} 50%{transform:perspective(1000px) rotateY(-10deg) rotateX(4deg) translateY(-14px)} }
//   .lm-mock-bar { height:38px; background:var(--bg2); display:flex; align-items:center; padding:0 14px; gap:7px; border-bottom:1px solid var(--border); }
//   .lm-mock-dot { width:10px; height:10px; border-radius:50%; }
//   .lm-mock-dot:nth-child(1){background:#fc5f57} .lm-mock-dot:nth-child(2){background:#febc2e} .lm-mock-dot:nth-child(3){background:#28c840}
//   .lm-mock-body { padding:24px 22px 28px; }
//   .lm-mock-logo-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }
//   .lm-mock-logo-inner { display:flex; align-items:center; gap:8px; }
//   .lm-mock-logo-icon { width:26px; height:26px; border-radius:6px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
//   .lm-mock-logo-word { font-family:'Cormorant Garamond',serif; font-size:.9rem; font-weight:600; color:var(--ink); }
//   .lm-mock-nav-items { display:flex; gap:10px; }
//   .lm-mock-nav-pill { height:6px; border-radius:3px; background:var(--border); }
//   .lm-mock-nav-pill.active { background:linear-gradient(90deg,var(--violet),var(--blue)); }
//   .lm-mock-hero-area { background:var(--grad-soft); border-radius:14px; padding:20px 16px; margin-bottom:16px; text-align:center; }
//   .lm-mock-badge { display:inline-block; background:white; border:1px solid var(--border); border-radius:100px; padding:3px 10px; font-size:.55rem; font-weight:600; color:var(--violet); letter-spacing:.06em; text-transform:uppercase; margin-bottom:10px; }
//   .lm-mock-h { font-family:'Cormorant Garamond',serif; font-size:1.45rem; font-weight:300; line-height:1.1; color:var(--ink); margin-bottom:8px; }
//   .lm-mock-lines { display:flex; flex-direction:column; gap:5px; align-items:center; }
//   .lm-mock-line { height:5px; border-radius:3px; background:var(--border); }
//   .lm-mock-btn-row { display:flex; gap:8px; justify-content:center; margin-top:12px; }
//   .lm-mock-btn-a { padding:5px 14px; border-radius:100px; font-size:.55rem; font-weight:600; background:var(--grad); color:white; }
//   .lm-mock-btn-b { padding:5px 14px; border-radius:100px; font-size:.55rem; font-weight:500; border:1px solid var(--border); color:var(--ink-soft); }
//   .lm-mock-cards { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
//   .lm-mock-card { background:var(--bg); border-radius:10px; border:1px solid var(--border); padding:10px 9px; }
//   .lm-mock-card-icon { width:22px; height:22px; border-radius:6px; background:linear-gradient(135deg,var(--violet-pale),var(--blue-pale)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:.65rem; margin-bottom:7px; }
//   .lm-mock-card-line { height:4px; border-radius:2px; background:var(--border); margin-top:4px; }

  /* STATS */
  .lm-stats-strip { background:var(--ink); padding:44px 80px; display:grid; grid-template-columns:repeat(4,1fr); gap:40px; }
  .lm-stat { text-align:center; }
  .lm-stat-num { font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:300; line-height:1; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; letter-spacing:-.04em; }
  .lm-stat-label { font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:rgba(245,243,255,.4); }

  /* SECTIONS */
  .lm-section { padding:100px 80px; }
  .lm-eyebrow { font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:flex; align-items:center; gap:10px; margin-bottom:16px; }
  .lm-eyebrow::before { content:''; display:block; width:28px; height:2px; background:var(--grad); flex-shrink:0; }
  .lm-sec-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:300; letter-spacing:-.03em; line-height:1.1; color:var(--ink); }
  .lm-sec-title em { font-style:italic; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* OVERVIEW */
  .lm-overview { background:white; }
  .lm-overview-grid { display:grid; grid-template-columns:5fr 4fr; gap:80px; align-items:start; }
  .lm-overview-text p { font-size:1rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:24px; }
  .lm-tech-label { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-muted); margin:32px 0 12px; }
  .lm-tech-pills { display:flex; flex-wrap:wrap; gap:8px; }
  .lm-tech-pill { background:var(--bg); border:1.5px solid var(--border); border-radius:100px; padding:5px 15px; font-size:.78rem; font-weight:500; color:var(--ink-soft); transition:all .25s; cursor:default; }
  .lm-tech-pill:hover { background:var(--violet); color:white; border-color:var(--violet); }
  .lm-aside-card { background:var(--grad-soft); border:1px solid var(--border); border-radius:20px; padding:32px; position:sticky; top:100px; }
  .lm-aside-item { padding:16px 0; border-bottom:1px solid var(--border); }
  .lm-aside-item:last-child { border-bottom:none; padding-bottom:0; }
  .lm-aside-item:first-child { padding-top:0; }
  .lm-aside-key { font-size:.65rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:5px; }
  .lm-aside-val { font-size:.9rem; font-weight:500; color:var(--ink); }

  /* IDENTITY */
  .lm-identity-section { background:var(--bg); }
  .lm-identity-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:56px; }
  .lm-id-card { background:white; border:1px solid var(--border); border-radius:20px; padding:32px; transition:all .3s; }
  .lm-id-card:hover { box-shadow:var(--shadow); transform:translateY(-4px); }
  .lm-id-card-label { font-size:.65rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:20px; }
  .lm-logo-display { display:flex; flex-direction:column; align-items:center; gap:20px; }
  .lm-logo-main { display:flex; align-items:center; gap:12px; padding:20px 28px; background:var(--grad-soft); border-radius:14px; border:1px solid var(--border); width:100%; }
  .lm-logo-icon-lg { width:48px; height:48px; border-radius:12px; background:var(--grad); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 6px 16px rgba(124,58,237,.3); }
  .lm-logo-wordmark { font-family:'Cormorant Garamond',serif; font-size:1.45rem; font-weight:600; color:var(--ink); letter-spacing:-.03em; line-height:1; }
  .lm-logo-wordmark span { display:block; font-size:.62rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-muted); margin-top:2px; font-family:'Outfit',sans-serif; }
  .lm-logo-icon-only { display:flex; gap:12px; align-items:center; }
  .lm-logo-sm { width:36px; height:36px; border-radius:9px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
  .lm-logo-sm-inv { width:36px; height:36px; border-radius:9px; background:var(--ink); display:flex; align-items:center; justify-content:center; }
  .lm-palette { display:flex; flex-direction:column; gap:10px; }
  .lm-color-row { display:flex; gap:8px; }
  .lm-swatch { flex:1; height:52px; border-radius:10px; position:relative; overflow:hidden; transition:transform .2s; }
  .lm-swatch:hover { transform:scale(1.04); }
  .lm-swatch-label { position:absolute; bottom:6px; left:8px; font-size:.55rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; }
  .lm-typo-samples { display:flex; flex-direction:column; gap:14px; }
  .lm-typo-row { padding:12px 0; border-bottom:1px solid var(--border); }
  .lm-typo-row:last-child { border-bottom:none; }
  .lm-typo-name { font-size:.6rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:4px; }

  /* PROBLEM */
  .lm-problem-section { background:white; }
  .lm-two-col { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:56px; }
  .lm-content-card { background:var(--bg); border:1px solid var(--border); border-radius:20px; padding:40px; transition:all .3s; }
  .lm-content-card:hover { box-shadow:var(--shadow); transform:translateY(-4px); }
  .lm-content-card > p { font-size:.95rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:18px; }
  .lm-obj-list { list-style:none; margin-top:18px; }
  .lm-obj-list li { display:flex; gap:14px; align-items:flex-start; padding:11px 0; border-bottom:1px solid var(--border); font-size:.92rem; color:var(--ink-soft); font-weight:300; line-height:1.6; }
  .lm-obj-list li:last-child { border-bottom:none; }
  .lm-obj-n { font-family:'Cormorant Garamond',serif; font-size:.8rem; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:600; flex-shrink:0; margin-top:2px; }

  /* PROCESS */
  .lm-process-section { background:var(--bg); }
  .lm-process-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:56px; border-radius:24px; overflow:hidden; border:1px solid var(--border); }
  .lm-proc-step { background:white; padding:48px 36px; transition:background .3s; }
  .lm-proc-step + .lm-proc-step { border-left:1px solid var(--border); }
  .lm-proc-step:hover { background:var(--grad-soft); }
  .lm-proc-n { font-family:'Cormorant Garamond',serif; font-size:4rem; font-weight:300; line-height:1; margin-bottom:18px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; opacity:.4; letter-spacing:-.04em; }
  .lm-proc-title { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:400; color:var(--ink); margin-bottom:12px; letter-spacing:-.02em; }
  .lm-proc-desc { font-size:.88rem; line-height:1.75; color:var(--ink-soft); font-weight:300; }

  /* HSCROLL */
  .lm-hscroll-section { background:white; padding:100px 0 100px 80px; overflow:hidden; }
  .lm-hscroll-header { margin-bottom:40px; padding-right:80px; }
  .lm-hscroll-track { display:flex; gap:24px; overflow-x:auto; scroll-behavior:smooth; padding:20px 80px 30px 0; cursor:grab; scrollbar-width:none; }
  .lm-hscroll-track::-webkit-scrollbar { display:none; }
  .lm-hscroll-track.grabbing { cursor:grabbing; }
  .lm-wf-card { flex:0 0 340px; height:420px; background:var(--bg); border:1.5px solid var(--border); border-radius:20px; overflow:hidden; transition:all .3s; position:relative; }
  .lm-wf-card:hover { border-color:var(--violet-lt); box-shadow:0 16px 48px rgba(124,58,237,.12); transform:translateY(-6px); }
  .lm-wf-card-header { background:var(--bg2); padding:12px 16px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:8px; }
  .lm-wf-dot { width:8px; height:8px; border-radius:50%; background:var(--border); }
  .lm-wf-url { flex:1; height:20px; background:white; border-radius:100px; border:1px solid var(--border); margin:0 8px; }
  .lm-wf-card-body { padding:16px; }
  .lm-wf-label { position:absolute; bottom:16px; left:16px; background:white; border:1px solid var(--border); border-radius:100px; padding:4px 12px; font-size:.65rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--violet); }
  .lm-hscroll-hint { display:flex; align-items:center; gap:10px; font-size:.72rem; font-weight:500; letter-spacing:.05em; color:var(--ink-muted); margin-top:20px; padding-right:80px; }
  .lm-hscroll-hint-arrow { display:flex; gap:4px; }
  .lm-hscroll-hint-arrow span { display:block; width:6px; height:6px; border-radius:50%; background:var(--violet-lt); animation:lmDotPulse 1.5s ease-in-out infinite; }
  .lm-hscroll-hint-arrow span:nth-child(2){animation-delay:.2s} .lm-hscroll-hint-arrow span:nth-child(3){animation-delay:.4s}
  @keyframes lmDotPulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }

  /* FEATURES */
  .lm-features-section { background:var(--bg); }
  .lm-features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:56px; }
  .lm-feat-card { background:white; border:1px solid var(--border); border-radius:18px; padding:30px 26px; transition:all .3s; position:relative; overflow:hidden; }
  .lm-feat-card::after { content:''; position:absolute; inset:0; background:var(--grad-soft); opacity:0; transition:opacity .3s; }
  .lm-feat-card:hover::after { opacity:1; }
  .lm-feat-card:hover { border-color:var(--violet-lt); transform:translateY(-4px); box-shadow:0 12px 40px rgba(124,58,237,.1); }
  .lm-feat-icon { width:42px; height:42px; border-radius:10px; background:var(--grad-soft); border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-bottom:16px; position:relative; z-index:1; }
  .lm-feat-name { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:400; color:var(--ink); margin-bottom:8px; position:relative; z-index:1; }
  .lm-feat-desc { font-size:.83rem; line-height:1.7; color:var(--ink-muted); font-weight:300; position:relative; z-index:1; }

  /* GALLERY */
.project-gallery{
  width:100%;
  max-width:1200px;
  margin:auto;
  padding:80px 20px;
  display:flex;
  flex-direction:column;
  gap:80px;
}

/* block layout */
.gallery-block{
  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap:50px;
  align-items:center;
}

/* alternate layout */
.gallery-block.reverse{
  grid-template-columns: 1.2fr 1fr;
}

.gallery-block.reverse .gallery-text{
  order:2;
}

.gallery-block.reverse .gallery-image{
  order:1;
}

/* text */
.gallery-text h3{
  font-size:32px;
  margin-bottom:12px;
}

.gallery-text p{
  font-size:16px;
  line-height:1.6;
  opacity:.8;
  max-width:420px;
}

/* image container */
.gallery-image{
  width:100%;
  max-height:520px;
  overflow:hidden;
  border-radius:16px;
  box-shadow:0 20px 60px rgba(0,0,0,0.08);
}

/* responsive image */
.gallery-image img{
  width:100%;
  height:100%;
  object-fit:contain;
}

/* mobile */
@media (max-width: 900px){

  .gallery-block{
    grid-template-columns:1fr;
  }

  .gallery-block.reverse .gallery-text,
  .gallery-block.reverse .gallery-image{
    order:unset;
  }

  .gallery-image{
    max-height:420px;
  }

}
  /* INSIGHTS */
  .lm-insights-section { background:var(--ink); padding:100px 80px; }
  .lm-insights-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:56px; }
  .lm-ins-card { border:1px solid rgba(245,243,255,.08); border-radius:20px; padding:40px; background:rgba(245,243,255,.03); transition:all .3s; }
  .lm-ins-card:hover { background:rgba(245,243,255,.06); border-color:rgba(124,58,237,.3); }
  .lm-ins-label { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:flex; align-items:center; gap:8px; margin-bottom:18px; }
  .lm-ins-label::before { content:''; display:block; width:20px; height:1.5px; background:var(--grad); }
  .lm-ins-title { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:300; color:rgba(245,243,255,.9); margin-bottom:14px; letter-spacing:-.02em; line-height:1.2; }
  .lm-ins-text { font-size:.9rem; line-height:1.8; color:rgba(245,243,255,.5); font-weight:300; }

  /* AUDIENCE */
  .lm-audience-section { background:white; }
  .lm-aud-grid { display:grid; grid-template-columns:4fr 5fr; gap:64px; align-items:start; margin-top:56px; }
  .lm-quote-card { background:var(--grad-soft); border:1px solid var(--border); border-radius:20px; padding:40px; }
  .lm-quote-mark { font-family:'Cormorant Garamond',serif; font-size:5rem; font-weight:300; line-height:.7; margin-bottom:12px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lm-quote-text { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-style:italic; line-height:1.7; color:var(--ink-soft); font-weight:300; }
  .lm-aud-tags { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
  .lm-aud-tag { padding:8px 18px; border-radius:100px; border:1.5px solid var(--border); font-size:.82rem; font-weight:500; color:var(--ink-soft); transition:all .25s; cursor:default; }
  .lm-aud-tag:hover { background:var(--violet); color:white; border-color:var(--violet); }
  .lm-aud-text p { font-size:.97rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-bottom:20px; }

  /* OUTCOME */
  .lm-outcome-section { background:var(--bg); padding:100px 80px; }
  .lm-outcome-inner { background:var(--grad); border-radius:28px; padding:80px; text-align:center; position:relative; overflow:hidden; }
  .lm-outcome-inner::before { content:''; position:absolute; width:600px; height:600px; border-radius:50%; background:rgba(255,255,255,.05); top:-200px; right:-200px; }
  .lm-outcome-inner::after { content:''; position:absolute; width:400px; height:400px; border-radius:50%; background:rgba(255,255,255,.05); bottom:-150px; left:-100px; }
  .lm-out-eyebrow { font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; font-weight:600; color:rgba(255,255,255,.6); margin-bottom:18px; }
  .lm-out-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:300; line-height:1.15; letter-spacing:-.03em; color:white; max-width:620px; margin:0 auto 22px; position:relative; z-index:1; }
  .lm-out-desc { font-size:.97rem; line-height:1.75; color:rgba(255,255,255,.75); font-weight:300; max-width:540px; margin:0 auto 44px; position:relative; z-index:1; }
  .lm-out-ctas { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
  .lm-btn-white { display:inline-flex; align-items:center; gap:9px; background:white; color:var(--violet); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .lm-btn-white:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.2); }
  .lm-btn-outline-white { display:inline-flex; align-items:center; gap:9px; background:transparent; color:white; border:1.5px solid rgba(255,255,255,.4); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .lm-btn-outline-white:hover { background:rgba(255,255,255,.1); border-color:white; transform:translateY(-2px); }

  /* FOOTER */
  .lm-footer { background:var(--ink); padding:44px 80px; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,.06); }
  .lm-footer-logo-row { display:flex; align-items:center; gap:10px; }
  .lm-footer-logo-icon { width:30px; height:30px; border-radius:8px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
  .lm-footer-logo-word { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:rgba(245,243,255,.9); letter-spacing:-.02em; }
  .lm-footer-text { font-size:.78rem; color:rgba(245,243,255,.3); font-weight:300; }

  /* ANIMATIONS */
  .lm-reveal{opacity:0;transform:translateY(40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .lm-reveal.visible{opacity:1;transform:none}
  .lm-reveal-l{opacity:0;transform:translateX(-40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .lm-reveal-l.visible{opacity:1;transform:none}
  .lm-reveal-r{opacity:0;transform:translateX(40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .lm-reveal-r.visible{opacity:1;transform:none}
  .lm-reveal-s{opacity:0;transform:scale(.93);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .lm-reveal-s.visible{opacity:1;transform:none}
  .lm-stagger>*{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .lm-stagger.visible>*:nth-child(1){opacity:1;transform:none;transition-delay:.05s}
  .lm-stagger.visible>*:nth-child(2){opacity:1;transform:none;transition-delay:.15s}
  .lm-stagger.visible>*:nth-child(3){opacity:1;transform:none;transition-delay:.25s}
  .lm-stagger.visible>*:nth-child(4){opacity:1;transform:none;transition-delay:.35s}
  .lm-stagger.visible>*:nth-child(5){opacity:1;transform:none;transition-delay:.45s}
  .lm-stagger.visible>*:nth-child(6){opacity:1;transform:none;transition-delay:.55s}
  @keyframes lmFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  @keyframes lmFadeIn{from{opacity:0}to{opacity:1}}

  /* WIREFRAME INTERNALS */
  .lm-wf-nav-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
  .lm-wf-logo-block{display:flex;align-items:center;gap:7px}
  .lm-wf-logo-sq{width:20px;height:20px;border-radius:5px;background:var(--grad-soft);border:1.5px solid var(--border)}
  .lm-wf-logo-lines{display:flex;flex-direction:column;gap:3px}
  .lm-wf-logo-line-long{width:50px;height:5px;border-radius:3px;background:var(--border)}
  .lm-wf-logo-line-short{width:35px;height:4px;border-radius:3px;background:var(--border)}
  .lm-wf-nav-pills{display:flex;gap:8px}
  .lm-wf-nav-pill{width:32px;height:6px;border-radius:3px;background:var(--border)}
  .lm-wf-nav-pill.active{background:linear-gradient(90deg,var(--violet),var(--blue))}
  .lm-wf-hero-block{background:white;border-radius:12px;border:1px solid var(--border);padding:16px;margin-bottom:12px;text-align:center}
  .lm-wf-hero-tag{display:inline-block;width:80px;height:14px;border-radius:100px;background:var(--violet-pale);border:1px solid var(--border);margin-bottom:10px}
  .lm-wf-h-line{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--border),var(--bg2))}
  .lm-wf-p-line{height:6px;border-radius:3px;background:var(--border)}
  .lm-wf-hero-btns{display:flex;gap:8px;justify-content:center}
  .lm-wf-btn-a{width:70px;height:22px;border-radius:100px;background:linear-gradient(90deg,var(--violet-lt),var(--blue-lt))}
  .lm-wf-btn-b{width:60px;height:22px;border-radius:100px;border:1.5px solid var(--border)}
  .lm-wf-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
  .lm-wf-mini-card{background:white;border-radius:8px;border:1px solid var(--border);padding:8px}
  .lm-wf-mini-icon{width:20px;height:20px;border-radius:5px;background:var(--violet-pale);border:1px solid var(--border);margin-bottom:6px}
  .lm-wf-mini-line{height:4px;border-radius:2px;background:var(--border);margin-top:4px}
  .lm-wf-t-line{height:6px;border-radius:3px;background:var(--border)}
  .lm-wf-t-line-h{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--border),var(--bg2))}
  .lm-wf-about-top{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
  .lm-wf-img-block{background:var(--grad-soft);border-radius:10px;border:1px solid var(--border);height:120px;display:flex;align-items:center;justify-content:center}
  .lm-wf-text-block{display:flex;flex-direction:column;gap:6px;justify-content:center}
  .lm-wf-tags-row{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
  .lm-wf-tag-pill{height:18px;border-radius:100px;background:var(--violet-pale);border:1px solid var(--border)}
  .lm-wf-features-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .lm-wf-feat-card{background:white;border-radius:10px;border:1px solid var(--border);padding:10px}
  .lm-wf-feat-icon{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,var(--violet-pale),var(--blue-pale));margin-bottom:8px}
  .lm-wf-feat-lines{display:flex;flex-direction:column;gap:4px}

  /* PROTO */
  .lm-proto-frame{background:white;border-radius:14px;border:1px solid var(--border);overflow:hidden}
  .lm-proto-bar{background:var(--grad);height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 14px}
  .lm-proto-bar-logo{font-family:'Cormorant Garamond',serif;font-size:.8rem;font-weight:600;color:white}
  .lm-proto-bar-nav{display:flex;gap:8px}
  .lm-proto-nav-pill{width:28px;height:5px;border-radius:3px;background:rgba(255,255,255,.4)}
  .lm-proto-body{padding:14px}
  .lm-proto-hero{background:var(--grad-soft);border-radius:10px;padding:16px;text-align:center;margin-bottom:12px}
  .lm-proto-badge{display:inline-block;background:white;border-radius:100px;padding:2px 10px;font-size:.5rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--violet);margin-bottom:8px}
  .lm-proto-title{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:300;color:var(--ink);margin-bottom:6px}
  .lm-proto-p{height:5px;border-radius:3px;background:var(--border);margin:3px auto}
  .lm-proto-cta-row{display:flex;gap:7px;justify-content:center;margin-top:10px}
  .lm-proto-cta{padding:5px 14px;border-radius:100px;font-size:.5rem;font-weight:600}
  .lm-proto-cta.fill{background:var(--grad);color:white}
  .lm-proto-cta.outline{border:1px solid var(--border);color:var(--ink-soft)}
  .lm-proto-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
  .lm-proto-card{background:var(--bg);border-radius:8px;border:1px solid var(--border);padding:8px}
  .lm-proto-icon{width:20px;height:20px;border-radius:5px;background:var(--grad);opacity:.4;margin-bottom:6px}
  .lm-proto-cl{height:4px;border-radius:2px;background:var(--border);margin-top:3px}

  /* MOBILE */
  .lm-mobile-frame{background:white;width:120px;margin:0 auto;border-radius:18px;border:2px solid var(--border);padding:8px;overflow:hidden;box-shadow:0 10px 30px rgba(124,58,237,.12)}
  .lm-mobile-notch{width:40px;height:8px;background:var(--border);border-radius:100px;margin:0 auto 10px}
  .lm-mobile-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .lm-mobile-logo-sq{width:14px;height:14px;border-radius:3px;background:var(--grad)}
  .lm-mobile-burger{display:flex;flex-direction:column;gap:2px}
  .lm-mobile-burger-line{width:16px;height:2px;border-radius:1px;background:var(--border)}
  .lm-mobile-hero{background:var(--grad-soft);border-radius:8px;padding:10px;margin-bottom:7px;text-align:center}
  .lm-mobile-h{height:8px;border-radius:4px;background:linear-gradient(90deg,var(--border),var(--bg2));margin:4px auto}
  .lm-mobile-p{height:4px;border-radius:2px;background:var(--border);margin:3px auto}
  .lm-mobile-cta{height:16px;border-radius:100px;background:var(--grad);margin:8px 12px 0}
  .lm-mobile-cards{display:grid;grid-template-columns:1fr 1fr;gap:5px}
  .lm-mobile-card{background:var(--bg);border-radius:6px;border:1px solid var(--border);padding:6px}
  .lm-mobile-ci{width:14px;height:14px;border-radius:4px;background:var(--violet-pale);margin-bottom:4px}
  .lm-mobile-cl{height:3px;border-radius:2px;background:var(--border);margin-top:3px}

  /* DARK FRAME */
  .lm-dark-frame{background:#1e1730;border-radius:14px;overflow:hidden}
  .lm-dark-bar{background:rgba(255,255,255,.06);height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 12px}
  .lm-dark-logo{font-family:'Cormorant Garamond',serif;font-size:.75rem;font-weight:600;color:rgba(255,255,255,.9)}
  .lm-dark-nav{display:flex;gap:7px}
  .lm-dark-np{width:24px;height:4px;border-radius:2px;background:rgba(255,255,255,.15)}
  .lm-dark-body{padding:12px}
  .lm-dark-hero{background:linear-gradient(135deg,rgba(124,58,237,.25),rgba(37,99,235,.25));border-radius:10px;padding:14px;text-align:center;margin-bottom:10px;border:1px solid rgba(124,58,237,.2)}
  .lm-dark-badge{display:inline-block;background:rgba(124,58,237,.3);border-radius:100px;padding:2px 8px;font-size:.48rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--violet-lt);margin-bottom:7px}
  .lm-dark-h{height:8px;border-radius:4px;background:rgba(255,255,255,.2);margin:4px auto}
  .lm-dark-p{height:4px;border-radius:2px;background:rgba(255,255,255,.1);margin:3px auto}
  .lm-dark-cta-row{display:flex;gap:7px;justify-content:center;margin-top:8px}
  .lm-dark-cta{padding:5px 12px;border-radius:100px;font-size:.48rem;font-weight:600}
  .lm-dark-cta.fill{background:var(--grad);color:white}
  .lm-dark-cta.out{border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.5)}
  .lm-dark-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
  .lm-dark-card{background:rgba(255,255,255,.04);border-radius:7px;border:1px solid rgba(255,255,255,.08);padding:7px}
  .lm-dark-ci{width:18px;height:18px;border-radius:5px;background:rgba(124,58,237,.35);margin-bottom:5px}
  .lm-dark-cl{height:3px;border-radius:2px;background:rgba(255,255,255,.1);margin-top:3px}

  @media(max-width:900px){
    .lm-hero{grid-template-columns:1fr;padding:100px 24px 60px}
    .lm-hero-visual{display:none}
    .lm-nav,.lm-nav.scrolled{padding:14px 70px 14px 24px}
    .lm-stats-strip{grid-template-columns:1fr 1fr;padding:36px 24px}
    .lm-section{padding:70px 24px}
    .lm-overview-grid,.lm-two-col,.lm-aud-grid,.lm-insights-grid,.lm-identity-grid{grid-template-columns:1fr}
    .lm-process-strip{grid-template-columns:1fr}
    .lm-proc-step+.lm-proc-step{border-left:none;border-top:1px solid var(--border)}
    .lm-features-grid{grid-template-columns:1fr 1fr}
    .lm-outcome-inner{padding:44px 24px}
    .lm-footer{flex-direction:column;gap:16px;text-align:center;padding:32px 24px}
    .lm-hscroll-section,.lm-gallery-section{padding-left:24px}
    .lm-hscroll-header,.lm-hscroll-hint{padding-right:24px}
    .lm-gallery-track,.lm-hscroll-track{padding-right:24px}
    .lm-nav-links{display:none}
  }
`;

// SVG Icons
const IconExternal = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconGithub = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);
const IconBack = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const LogoIcon = ({ size = 18, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color} opacity=".9"/>
    <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity=".7"/>
  </svg>
);
const LogoIconLg = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="11" r="6" fill="white" opacity=".95"/>
    <path d="M7 28c0-4.971 4.029-9 9-9s9 4.029 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
    <circle cx="8" cy="8" r="2.5" fill="white" opacity=".4"/>
    <circle cx="24" cy="8" r="2.5" fill="white" opacity=".4"/>
  </svg>
);
const LogoIconSm = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="11" r="6" fill="white" opacity=".95"/>
    <path d="M7 28c0-4.971 4.029-9 9-9s9 4.029 9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
  </svg>
);
const LogoIconSmInv = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="gInv" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#2563eb"/></linearGradient></defs>
    <circle cx="16" cy="11" r="6" fill="url(#gInv)" opacity=".95"/>
    <path d="M7 28c0-4.971 4.029-9 9-9s9 4.029 9 9" stroke="url(#gInv)" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
  </svg>
);

// Drag scroll hook
function useDragScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, sx, sl;
    const onDown = e => { down = true; el.classList.add('grabbing'); sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; };
    const onLeave = () => { down = false; el.classList.remove('grabbing'); };
    const onUp = () => { down = false; el.classList.remove('grabbing'); };
    const onMove = e => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.5; };
    let tsx, tsl;
    const onTStart = e => { tsx = e.touches[0].pageX - el.offsetLeft; tsl = el.scrollLeft; };
    const onTMove = e => { el.scrollLeft = tsl - (e.touches[0].pageX - el.offsetLeft - tsx); };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchstart', onTStart, { passive: true });
    el.addEventListener('touchmove', onTMove, { passive: true });
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('touchstart', onTStart);
      el.removeEventListener('touchmove', onTMove);
    };
  }, []);
  return ref;
}

// Intersection observer hook
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.lm-reveal,.lm-reveal-l,.lm-reveal-r,.lm-reveal-s,.lm-stagger').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function LexiaMinds() {
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const wfTrackRef = useDragScroll();
  const galTrackRef = useDragScroll();

  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      setScrollPct(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.lm-stat-num').forEach(el => {
            const v = el.textContent, n = parseInt(v);
            if (isNaN(n)) { el.textContent = v; return; }
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
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.lm-stats-strip').forEach(el => statObs.observe(el));
    return () => statObs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="lm-root">
        {/* Progress Bar */}
        <div className="lm-prog" style={{ width: `${scrollPct}%` }} />

        {/* Back Button */}
        <a href="#" className="lm-back-btn" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack /> Back
        </a>

        {/* Nav */}
        <nav className={`lm-nav${scrolled ? ' scrolled' : ''}`}>
          <a href="#" className="lm-nav-logo">
            <div className="lm-nav-logo-icon"><LogoIcon /></div>
            <span className="lm-nav-logo-text">Lexia Minds</span>
          </a>
          <ul className="lm-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#wireframes">Process</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#outcome">Outcome</a></li>
          </ul>
        </nav>

        {/* Hero */}
        <section className="lm-hero" id="hero">
          <div className="lm-hero-blob1" />
          <div className="lm-hero-blob2" />
          <div className="lm-hero-content">
            <div className="lm-hero-tag"><span className="lm-hero-tag-dot" />Web Platform · Cognitive Development</div>
            <h1 className="lm-hero-title">Lexia<br /><span className="lm-grad-text">Minds</span></h1>
            <p className="lm-hero-desc">A digital platform designed to support cognitive development through interactive learning activities, articles, and engaging digital experiences.</p>
            <div className="lm-hero-ctas">
              <a href="#" className="lm-btn-grad"><IconExternal />Live Website</a>
              <a href="#" className="lm-btn-ghost"><IconGithub />GitHub</a>
            </div>
          </div>
          <div className="lm-hero-visual">
            <div className="lm-hero-mockup">
              {/* <div className="lm-mock-bar">
                <div className="lm-mock-dot" /><div className="lm-mock-dot" /><div className="lm-mock-dot" />
              </div> */}
              {/* <div className="lm-mock-body"> */}
                {/* <div className="lm-mock-logo-row">
                  <div className="lm-mock-logo-inner">
                    <div className="lm-mock-logo-icon"><LogoIcon size={14} /></div>
                    <span className="lm-mock-logo-word">Lexia Minds</span>
                  </div>
                  <div className="lm-mock-nav-items">
                    <div className="lm-mock-nav-pill active" style={{ width: 28 }} />
                    <div className="lm-mock-nav-pill" style={{ width: 24 }} />
                    <div className="lm-mock-nav-pill" style={{ width: 32 }} />
                  </div>
                </div> */}
               <div className="lm-mock-hero-area">
  <img 
   src={Heroimg1}  
    alt="Cognitive Platform Hero" 
    style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
  />
</div>
                {/* <div className="lm-mock-cards">
                  {[['🧠','72%','54%'],['✨','80%','58%'],['📚','65%','78%']].map(([icon, w1, w2], i) => (
                    <div key={i} className="lm-mock-card">
                      <div className="lm-mock-card-icon">{icon}</div>
                      <div className="lm-mock-card-line" style={{ width: w1 }} />
                      <div className="lm-mock-card-line" style={{ width: w2 }} />
                    </div>
                  ))}
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="lm-stats-strip lm-stagger">
          {[['5+','Core Features'],['3','Design Phases'],['100%','Responsive'],['React','Tech Stack']].map(([num, label], i) => (
            <div key={i} className="lm-stat">
              <div className="lm-stat-num">{num}</div>
              <div className="lm-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section className="lm-section lm-overview" id="overview">
          <div className="lm-overview-grid">
            <div className="lm-reveal-l">
              <div className="lm-eyebrow">About the project</div>
              <h2 className="lm-sec-title">An interactive platform for <em>cognitive growth</em></h2>
              <p>Lexia Minds was developed as an interactive digital platform that encourages users to strengthen cognitive abilities through engaging content and interactive features. The project combines educational resources with interactive experiences to create an environment that promotes learning, creativity, and mental development.</p>
              <div className="lm-tech-label">Technologies Used</div>
              <div className="lm-tech-pills lm-stagger">
                {['React','JavaScript','REST APIs','CSS3','HTML5','Node.js'].map(t => (
                  <span key={t} className="lm-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="lm-aside-card lm-reveal-r">
              {[['Project Type','Web Platform'],['Focus Area','Cognitive Development'],['Target Users','Students & Young Professionals'],['Platform','Web (Responsive)']].map(([k, v]) => (
                <div key={k} className="lm-aside-item">
                  <div className="lm-aside-key">{k}</div>
                  <div className="lm-aside-val">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Identity */}
        <section className="lm-section lm-identity-section">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Brand & Visual Identity</div>
            <h2 className="lm-sec-title">The <em>design language</em> of Lexia Minds</h2>
          </div>
          <div className="lm-identity-grid lm-stagger">
            {/* Logo */}
            <div className="lm-id-card">
              <div className="lm-id-card-label">Logo System</div>
              <div className="lm-logo-display">
                <div className="lm-logo-main">
                  <div className="lm-logo-icon-lg"><LogoIconLg /></div>
                  <div className="lm-logo-wordmark">Lexia Minds<span>Cognitive Development Platform</span></div>
                </div>
                <div className="lm-logo-icon-only">
                  <div className="lm-logo-sm"><LogoIconSm /></div>
                  <div className="lm-logo-sm-inv"><LogoIconSmInv /></div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '6px 16px', borderRadius: '100px', border: '1.5px solid var(--border)', background: 'var(--bg2)' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-.02em' }}>
                      Lexia <em style={{ fontStyle: 'italic', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Minds</em>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Palette */}
            <div className="lm-id-card">
              <div className="lm-id-card-label">Colour Palette</div>
              <div className="lm-palette">
                <div className="lm-color-row">
                  <div className="lm-swatch" style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', flex: 2 }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>Primary Gradient</span></div>
                  <div className="lm-swatch" style={{ background: '#7c3aed' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>#7C3AED</span></div>
                  <div className="lm-swatch" style={{ background: '#2563eb' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>#2563EB</span></div>
                </div>
                <div className="lm-color-row">
                  <div className="lm-swatch" style={{ background: '#c4b5fd' }}><span className="lm-swatch-label" style={{ color: 'var(--ink)' }}>Violet Lt</span></div>
                  <div className="lm-swatch" style={{ background: '#ede9fe' }}><span className="lm-swatch-label" style={{ color: 'var(--ink-soft)' }}>Violet Pale</span></div>
                  <div className="lm-swatch" style={{ background: '#bfdbfe' }}><span className="lm-swatch-label" style={{ color: 'var(--ink-soft)' }}>Blue Lt</span></div>
                  <div className="lm-swatch" style={{ background: '#1e1730' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.7)' }}>Ink</span></div>
                </div>
              </div>
            </div>
            {/* Typography */}
            <div className="lm-id-card">
              <div className="lm-id-card-label">Typography</div>
              <div className="lm-typo-samples">
                <div className="lm-typo-row">
                  <div className="lm-typo-name">Display — Cormorant Garamond</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.9rem', fontWeight: 300, lineHeight: 1, letterSpacing: '-.04em', color: 'var(--ink)' }}>
                    Lexia <em style={{ fontStyle: 'italic', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Minds</em>
                  </div>
                </div>
                <div className="lm-typo-row">
                  <div className="lm-typo-name">Body — Outfit Light</div>
                  <div style={{ fontSize: '.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--ink-soft)' }}>Clear, approachable, modern — designed for readability.</div>
                </div>
                <div className="lm-typo-row">
                  <div className="lm-typo-name">Label — Outfit Semibold</div>
                  <div style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Visual Identity · Web Platform</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem + Objectives */}
        <section className="lm-section lm-problem-section">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Why it exists</div>
            <h2 className="lm-sec-title">Problem & <em>Objectives</em></h2>
          </div>
          <div className="lm-two-col lm-stagger">
            <div className="lm-content-card">
              <div className="lm-eyebrow" style={{ marginBottom: 0 }}>The Problem</div>
              <p>Many digital platforms focus primarily on passive consumption of content rather than active cognitive engagement. As a result, users often spend time scrolling without meaningful mental stimulation. Lexia Minds aims to address this by providing interactive, thought-provoking digital experiences that encourage active thinking and learning.</p>
            </div>
            <div className="lm-content-card">
              <div className="lm-eyebrow" style={{ marginBottom: 0 }}>Objectives</div>
              <ul className="lm-obj-list">
                {['Create a platform that promotes active cognitive engagement','Provide interactive digital experiences for users','Design a clean and intuitive user interface','Combine creativity and technology meaningfully','Develop a scalable web-based platform'].map((item, i) => (
                  <li key={i}><span className="lm-obj-n">0{i+1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="lm-section lm-process-section">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Design Process</div>
            <h2 className="lm-sec-title">From idea to <em>experience</em></h2>
          </div>
          <div className="lm-process-strip lm-stagger">
            {[
              ['01','Ideation','Initial concepts were developed by exploring ways to combine learning content with interactive digital features. Multiple ideas were considered before defining the final platform structure.'],
              ['02','Wireframing','Wireframes were created to plan the layout of key sections including the homepage, learning resources, and interactive components, ensuring intuitive navigation flow.'],
              ['03','Prototyping','A digital prototype was developed to test navigation, layout structure, and user interaction before building the final version of the platform.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="lm-proc-step">
                <div className="lm-proc-n">{n}</div>
                <div className="lm-proc-title">{title}</div>
                <p className="lm-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wireframes Horizontal Scroll */}
       {/* <section className="lm-hscroll-section" id="wireframes">
  <div className="lm-hscroll-header lm-reveal">
    <div className="lm-eyebrow">Wireframes & Prototypes</div>
    <h2 className="lm-sec-title">
      Screens from <em>every stage</em>
    </h2>
  </div>

  <div className="lm-hscroll-track" ref={wfTrackRef}>
    {[
      "/images/wf-homepage.png",
      "/images/wf-about.png",
      "/images/wf-features.png",
      "/images/wf-prototype.png",
      "/images/wf-mobile.png",
      "/images/wf-darkmode.png"
    ].map((src, idx) => (
      <div key={idx} className="lm-wf-card">
        <img
          src={src}
          alt={`Wireframe ${idx + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </div>
    ))}
  </div>

  <div className="lm-hscroll-hint">
    <div className="lm-hscroll-hint-arrow">
      <span />
      <span />
      <span />
    </div>
    Drag to explore all screens
  </div>
</section> */}

        {/* Features */}
        {/* <section className="lm-section lm-features-section" id="features">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Platform Features</div>
            <h2 className="lm-sec-title">Built with <em>purpose</em></h2>
          </div>
          <div className="lm-features-grid lm-stagger">
            {[
              ['🧠','Interactive Learning','Engaging activities designed to stimulate active thinking rather than passive consumption.'],
              ['📱','Responsive Design','Fully responsive layout that works flawlessly across all screen sizes and devices.'],
              ['🗺️','Structured Navigation','Intuitive navigation system guiding users effortlessly through all platform sections.'],
              ['✨','Visual Layout','A modern interface that balances creativity with clarity and effortless ease of use.'],
              ['⚛️','Component Architecture','Modular React component structure ensuring scalability and long-term maintainability.'],
              ['🔗','API Integration','Connected to external APIs to deliver dynamic, up-to-date learning content and resources.'],
            ].map(([icon, name, desc]) => (
              <div key={name} className="lm-feat-card">
                <div className="lm-feat-icon">{icon}</div>
                <div className="lm-feat-name">{name}</div>
                <p className="lm-feat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section> */}

    <section className="project-gallery">

      {/* LO-FI */}
      <div className="gallery-block">
        <div className="gallery-text">
          <h3>Low-Fidelity Wireframes</h3>
          <p>
            These early sketches focus on the structure of the interface. 
            The goal was to quickly experiment with layout ideas, page hierarchy,
            and user flow without worrying about visuals.
          </p>
        </div>

        <div className="gallery-image">
          <img src={highimg} alt="Low Fidelity Wireframes" />
        </div>
      </div>


      {/* HI-FI */}
      <div className="gallery-block reverse">
        <div className="gallery-text">
          <h3>High-Fidelity Design</h3>
          <p>
            The high-fidelity prototype introduces typography, color systems,
            spacing, and interaction elements. It reflects the final visual
            direction of the platform.
          </p>
        </div>

        <div className="gallery-image">
          <img src={highimg} alt="High Fidelity Design" />
        </div>
      </div>


      {/* LAYOUT SYSTEM */}
      <div className="gallery-block">
        <div className="gallery-text">
          <h3>Website Layout System</h3>
          <p>
            This layout overview shows how the different sections of the
            website connect together. It highlights navigation structure,
            component placement, and content hierarchy.
          </p>
        </div>

        <div className="gallery-image">
          <img src={highimg} alt="Website Layout Structure" />
        </div>
      </div>

    </section>

        {/* Insights / Challenges */}
        {/* <section className="lm-insights-section">
          <div className="lm-reveal">
            <div className="lm-eyebrow" style={{color:'rgba(245,243,255,.4)'}}>Challenges & Reflection</div>
            <h2 className="lm-sec-title" style={{color:'rgba(245,243,255,.9)'}}>Lessons <em>learned</em></h2>
          </div>
          <div className="lm-insights-grid lm-stagger">
            <div className="lm-ins-card">
              <div className="lm-ins-label">Challenge</div>
              <h3 className="lm-ins-title">Balancing Creativity with Usability</h3>
              <p className="lm-ins-text">One challenge during development was ensuring a balance between visual creativity and usability. Iterative design adjustments were made to maintain a clean interface while still delivering engaging interactive elements that didn't overwhelm the user.</p>
            </div>
            <div className="lm-ins-card">
              <div className="lm-ins-label">Reflection</div>
              <h3 className="lm-ins-title">Growth in UX & Modern Development</h3>
              <p className="lm-ins-text">This project strengthened my understanding of user-centred design and modern web development. It highlighted the importance of balancing creativity with usability when building digital platforms — a lesson that will carry forward into every future project.</p>
            </div>
          </div>
        </section> */}

        {/* Audience */}
        {/* <section className="lm-section lm-audience-section">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Research & Audience</div>
            <h2 className="lm-sec-title">Who it's <em>built for</em></h2>
          </div>
          <div className="lm-aud-grid">
            <div className="lm-quote-card lm-reveal-l">
              <div className="lm-quote-mark">"</div>
              <p className="lm-quote-text">Research was conducted to explore how digital interfaces can encourage active learning rather than passive consumption — insights from UX principles and cognitive platforms informed every design decision.</p>
              <div className="lm-aud-tags">
                {['Students','Young Professionals','Lifelong Learners','Creatives'].map(t => (
                  <span key={t} className="lm-aud-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="lm-aud-text lm-reveal-r">
              <p>The primary audience for Lexia Minds includes students, young professionals, and individuals interested in improving their cognitive skills and engaging in meaningful digital experiences. The platform is designed to be accessible and easy to navigate for a broad range of users.</p>
              <p>Research into existing educational and cognitive development platforms helped identify a clear gap — the lack of meaningful interactivity in most digital learning tools. Lexia Minds closes that gap through intentional, structured content design.</p>
            </div>
          </div>
        </section> */}

        {/* Outcome */}
        <section className="lm-outcome-section" id="outcome">
          <div className="lm-outcome-inner lm-reveal-s">
            <div className="lm-out-eyebrow">Final Outcome</div>
            <h2 className="lm-out-title">A fully functional platform where creativity meets cognitive development</h2>
            <p className="lm-out-desc">The final result demonstrates how creativity and technology can be integrated to support cognitive development and meaningful digital learning experiences.</p>
            <div className="lm-out-ctas">
              <a href="#" className="lm-btn-white"><IconExternal />View Live Site</a>
              <a href="#" className="lm-btn-outline-white"><IconGithub />GitHub Repository</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="lm-footer">
          <div className="lm-footer-logo-row">
            <div className="lm-footer-logo-icon"><LogoIcon size={16} /></div>
            <span className="lm-footer-logo-word">Lexia Minds</span>
          </div>
          <div className="lm-footer-text">Cognitive Development Web Platform · React & JavaScript</div>
        </footer> */}
      </div>
    </>
  );
}