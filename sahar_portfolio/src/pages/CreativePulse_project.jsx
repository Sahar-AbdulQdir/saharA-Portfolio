import { useEffect, useState } from "react";
// Replace these with your actual image imports:
import LowFi from "../assets/Images/CpLow.png";
import HiFi from "../assets/Images/CpHigh.png";
import LoaderImg from "../assets/Images/CpLoader.gif";
import LogoCp from "../assets/Images/LogoCreative.png";
import {
  FiLoader,
  FiEye,
  FiBox,
  FiEdit3,
  FiLock,
  FiCheckCircle
} from "react-icons/fi";


const features = [
  [<FiLoader />, 'GSAP Loader', 'Three-panel clip-path animation with staggered marquee text and a timed fade-reveal into the main content.'],
  [<FiEye />, 'Scroll Reveal', 'IntersectionObserver triggers wave keyframe animations on any .fade-in element as it enters the viewport.'],
  [<FiBox />, '3D Gallery', 'CSS perspective and rotateX create a tilted 3D stage; mouse movement rotates the circular gallery in real time.'],
  [<FiEdit3 />, 'Text Marquee', 'A skewed, glass-effect marquee strip continuously scrolls the agency tagline using a pure CSS moveRtl animation.'],
  [<FiLock />, 'Auth System', 'Sign-up and login forms sync with MongoDB via POST requests, with localStorage fallback and client-side validation.'],
  [<FiCheckCircle />, 'Full Responsiveness', 'CSS Grid, Flexbox, and media queries ensure the layout adapts gracefully from wide desktop to mobile portrait.'],
];
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --amethyst-smoke: #C985C4ff;
    --fuchsia-plum: #B45DA8ff;
    --black: #000000ff;
    --white: #FFFFFFff;
    --pink-orchid: #E9B3D6ff;

    /* Derived */
    --bg: #fdf8fc;
    --bg2: #f7eef5;
    --ink: var(--black);
    --ink-soft: #2a1a28;
    --ink-muted: #7a5675;

    --violet: var(--fuchsia-plum);
    --violet-lt: var(--amethyst-smoke);
    --violet-pale: #f9eef8;

    --grad: linear-gradient(135deg, var(--amethyst-smoke) 0%, var(--fuchsia-plum) 100%);
    --grad-soft: linear-gradient(135deg, #f9eef8 0%, #fce8f6 100%);
    --grad-dark: linear-gradient(135deg, var(--fuchsia-plum) 0%, #7a2e72 100%);

    --border: #e8d4e6;
    --border-s: var(--amethyst-smoke);
    --shadow: 0 20px 60px rgba(180,93,168,0.15);
  }

  html { scroll-behavior: smooth; }
  body { 
  // font-family: 'DM Sans', sans-serif; 
  background: var(--bg); color: var(--ink); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

  .cp-root {
    // font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--ink);
    overflow-x: hidden;
    position: relative;
  }
  .cp-root::after {
    content:''; position:fixed; inset:0; z-index:9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    opacity:.5; pointer-events:none;
  }

  /* PROGRESS */
  .cp-prog { position:fixed; top:0; left:0; height:3px; z-index:1000; background:var(--grad); transition:width .1s; box-shadow:0 0 14px rgba(180,93,168,.5); }

  /* BACK */
  .cp-back-btn {
    position:fixed; top:10px; left:28px; z-index:200;
    display:flex; align-items:center; gap:8px;
    background:white; border:1.5px solid var(--border); border-radius:100px;
    padding:8px 18px 8px 12px; font-size:.78rem; font-weight:500; color:var(--ink-soft);
    text-decoration:none; cursor:pointer;
    box-shadow:0 4px 16px rgba(180,93,168,.1);
    transition:all .3s; animation:cpFadeUp .6s .1s both;
  }
  .cp-back-btn:hover { background:var(--violet); color:white; border-color:var(--violet); transform:translateX(-3px); box-shadow:0 6px 20px rgba(180,93,168,.3); }
  .cp-back-btn svg { transition:transform .3s; }
  .cp-back-btn:hover svg { transform:translateX(-3px); }

  /* NAV */
  .cp-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:flex-end; padding:20px 60px; transition:all .4s; pointer-events:none; }
  .cp-nav.scrolled { background:rgba(253,248,252,.94); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); padding:14px 60px; pointer-events:all; }
  .cp-nav-links { display:flex; align-items:center; gap:28px; list-style:none; }
  .cp-nav-links a { font-size:.75rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft); text-decoration:none; transition:color .2s; }
  .cp-nav-links a:hover { color:var(--violet); }
  .cp-nav-links li:last-child a { background:var(--black) !important; color:#fff !important; border-radius:6px; padding:6px 12px; }

  /* HERO */
  .cp-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; padding:0 80px 0 100px; align-items:center; gap:60px; position:relative; overflow:hidden; }
  .cp-hero-blob1 { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(201,133,196,.15) 0%,transparent 70%); top:-100px; right:-100px; pointer-events:none; animation:cpBlobPulse 8s ease-in-out infinite; }
  .cp-hero-blob2 { position:absolute; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(180,93,168,.1) 0%,transparent 70%); bottom:50px; left:-50px; pointer-events:none; animation:cpBlobPulse 10s ease-in-out infinite reverse; }
  @keyframes cpBlobPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  .cp-hero-content { position:relative; z-index:1; }
  .cp-hero-tag { display:inline-flex; align-items:center; gap:8px; background:white; border:1.5px solid var(--border); border-radius:100px; padding:6px 16px; font-size:.72rem; font-weight:600; letter-spacing:.07em; text-transform:uppercase; color:var(--violet); margin-bottom:28px; box-shadow:0 4px 16px rgba(180,93,168,.1); animation:cpFadeUp .7s .2s both; }
  .cp-hero-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--violet); }
  .cp-hero-title {
  //  font-family:'DM Serif Display',serif; 
   font-size:clamp(3.8rem,7vw,7rem); font-weight:400; line-height:.95; letter-spacing:-.04em; color:var(--ink); margin-bottom:28px; animation:cpFadeUp .8s .35s both; }
  .cp-grad-text { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-style:italic; }
  .cp-hero-desc { font-size:1rem; line-height:1.8; color:var(--ink-soft); font-weight:300; max-width:420px; margin-bottom:40px; animation:cpFadeUp .8s .5s both; }
  .cp-hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:cpFadeUp .8s .65s both; }
  .cp-btn-grad { display:inline-flex; align-items:center; gap:9px; background:var(--grad); color:white; padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; box-shadow:0 6px 20px rgba(180,93,168,.3); }
  .cp-btn-grad:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(180,93,168,.45); }
  .cp-btn-ghost { display:inline-flex; align-items:center; gap:9px; background:white; color:var(--ink-soft); border:1.5px solid var(--border); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .cp-btn-ghost:hover { border-color:var(--violet); color:var(--violet); transform:translateY(-2px); }

  /* HERO VISUAL */
  .cp-hero-visual { position:relative; z-index:1; animation:cpFadeIn 1s .8s both; display:flex; align-items:center; justify-content:center; }

  /* STATS */
  .cp-stats-strip { background:var(--black); padding:44px 80px; display:grid; grid-template-columns:repeat(4,1fr); gap:40px; }
  .cp-stat { text-align:center; }
  .cp-stat-num { 
  //  font-family:'DM Serif Display',serif; 
   font-size:3rem; font-weight:400; line-height:1; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; letter-spacing:-.04em; }
  .cp-stat-label { font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:rgba(255,255,255,.4); }

  /* SECTIONS */
  .cp-section { padding:100px 80px; }
  .cp-eyebrow { font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:flex; align-items:center; gap:10px; margin-bottom:16px; }
  .cp-eyebrow::before { content:''; display:block; width:28px; height:2px; background:var(--grad); flex-shrink:0; }
  .cp-sec-title { 
  //  font-family:'DM Serif Display',serif; 
   font-size:clamp(2rem,4vw,3.2rem); font-weight:400; letter-spacing:-.03em; line-height:1.1; color:var(--ink); }
  .cp-sec-title em { font-style:italic; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* OVERVIEW */
  .cp-overview { background:white; }
  .cp-overview-grid { display:grid; grid-template-columns:5fr 4fr; gap:80px; align-items:start; }
  .cp-overview-text p { font-size:1rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:24px; }
  .cp-tech-label { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-muted); margin:32px 0 12px; }
  .cp-tech-pills { display:flex; flex-wrap:wrap; gap:8px; }
  .cp-tech-pill { background:var(--bg); border:1.5px solid var(--border); border-radius:100px; padding:5px 15px; font-size:.78rem; font-weight:500; color:var(--ink-soft); transition:all .25s; cursor:default; }
  .cp-tech-pill:hover { background:var(--violet); color:white; border-color:var(--violet); }
  .cp-aside-card { background:var(--grad-soft); border:1px solid var(--border); border-radius:20px; padding:32px; position:sticky; top:100px; }
  .cp-aside-item { padding:16px 0; border-bottom:1px solid var(--border); }
  .cp-aside-item:last-child { border-bottom:none; padding-bottom:0; }
  .cp-aside-item:first-child { padding-top:0; }
  .cp-aside-key { font-size:.65rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:5px; }
  .cp-aside-val { font-size:.9rem; font-weight:500; color:var(--ink); }

  /* IDENTITY */
  .cp-identity-section { background:var(--bg); }
  .cp-identity-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:56px; }
  .cp-id-card { background:white; border:1px solid var(--border); border-radius:20px; padding:32px; transition:all .3s; }
  .cp-id-card:hover { box-shadow:var(--shadow); transform:translateY(-4px); }
  .cp-id-card-label { font-size:.65rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:20px; }
  .cp-logo-display { display:flex; flex-direction:column; align-items:center; gap:20px; }
  .cp-palette { display:flex; flex-direction:column; gap:10px; }
  .cp-color-row { display:flex; gap:8px; }
  .cp-swatch { flex:1; height:120px; border-radius:10px; position:relative; overflow:hidden; transition:transform .2s; }
  .cp-swatch:hover { transform:scale(1.04); }
  .cp-swatch-label { position:absolute; bottom:6px; left:8px; font-size:.55rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; }
  .cp-typo-samples { display:flex; flex-direction:column; gap:14px; }
  .cp-typo-row { padding:12px 0; border-bottom:1px solid var(--border); }
  .cp-typo-row:last-child { border-bottom:none; }
  .cp-typo-name { font-size:.6rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:4px; }

  /* PROBLEM */
  .cp-problem-section { background:white; }
  .cp-two-col { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:56px; }
  .cp-content-card { background:var(--bg); border:1px solid var(--border); border-radius:20px; padding:40px; transition:all .3s; }
  .cp-content-card:hover { box-shadow:var(--shadow); transform:translateY(-4px); }
  .cp-content-card > p { font-size:.95rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:18px; }
  .cp-obj-list { list-style:none; margin-top:18px; }
  .cp-obj-list li { display:flex; gap:14px; align-items:flex-start; padding:11px 0; border-bottom:1px solid var(--border); font-size:.92rem; color:var(--ink-soft); font-weight:300; line-height:1.6; }
  .cp-obj-list li:last-child { border-bottom:none; }
  .cp-obj-n {
  //  font-family:'DM Serif Display',serif;
    font-size:.8rem; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:400; flex-shrink:0; margin-top:2px; }

  /* PROCESS */
  .cp-process-section { background:var(--bg); }
  .cp-process-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:56px; border-radius:24px; overflow:hidden; border:2px solid var(--border); }
  .cp-proc-step { background:white; padding:48px 36px; transition:background .3s; }
  .cp-proc-step + .cp-proc-step { border-left:1px solid var(--border); }
  .cp-proc-step:hover { background:var(--grad-soft); }
  .cp-proc-n { 
  //  font-family:'DM Serif Display',serif;
    font-size:4rem; font-weight:400; line-height:1; margin-bottom:18px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; opacity:.4; letter-spacing:-.04em; }
  .cp-proc-title { 
  //  font-family:'DM Serif Display',serif;
    font-size:1.25rem; font-weight:400; color:var(--ink); margin-bottom:12px; letter-spacing:-.02em; }
  .cp-proc-desc { font-size:.88rem; line-height:1.75; color:var(--ink-soft); font-weight:300; }

  /* GALLERY */
  .cp-gallery { width:100%; max-width:1200px; margin:auto; padding:80px 20px; display:flex; flex-direction:column; gap:100px; }
  .cp-gallery-block { display:grid; grid-template-columns:1fr 1.2fr; gap:50px; align-items:start; }
  .cp-gallery-block.reverse { grid-template-columns:1.2fr 1fr; }
  .cp-gallery-block.reverse .cp-gallery-text { order:2; }
  .cp-gallery-block.reverse .cp-gallery-image { order:1; }
  .cp-gallery-text { padding-top:12px; }
  .cp-gallery-text h3 { 
  //  font-family:'DM Serif Display',serif;
    font-size:2rem; font-weight:400; margin-bottom:12px; color:var(--ink); letter-spacing:-.02em; }
  .cp-gallery-text p { font-size:.97rem; line-height:1.7; color:var(--ink-soft); font-weight:300; max-width:420px; }
  .cp-gallery-image { width:100%; overflow:hidden; border-radius:16px; box-shadow:0 20px 60px rgba(180,93,168,0.1); border:1.5px solid var(--border); background:var(--bg2); }
  .cp-gallery-image img { width:100%; height:auto; display:block; object-fit:contain; }
  .cp-gallery-image.loader-img { max-width:700px; margin:0 auto; }
  .cp-gallery-block.loader-block { grid-template-columns:1fr 1.6fr; align-items:center; }

  /* VIDEO */
  .cp-video-section { background:white; padding:100px 80px; }
  .cp-video-wrapper { margin-top:56px; border-radius:24px; overflow:hidden; border:1.5px solid var(--border); box-shadow:0 40px 80px rgba(180,93,168,.13),0 8px 24px rgba(180,93,168,.07); position:relative; aspect-ratio:16/9; background:var(--black); }
  .cp-video-wrapper iframe { position:absolute; inset:0; width:100%; height:100%; border:none; display:block; }
  .cp-video-caption { margin-top:20px; text-align:center; font-size:.8rem; font-weight:400; color:var(--ink-muted); letter-spacing:.03em; }

  /* FEATURES */
  .cp-features-section { background:var(--bg); }
  .cp-features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:56px; }
  .cp-feat-card { background:white; border:1px solid var(--border); border-radius:18px; padding:30px 26px; transition:all .3s; position:relative; overflow:hidden; }
  .cp-feat-card::after { content:''; position:absolute; inset:0; background:var(--grad-soft); opacity:0; transition:opacity .3s; }
  .cp-feat-card:hover::after { opacity:1; }
  .cp-feat-card:hover { border-color:var(--violet-lt); transform:translateY(-4px); box-shadow:0 12px 40px rgba(180,93,168,.1); }
  .cp-feat-icon { width:42px; height:42px; border-radius:10px; background:var(--grad-soft); border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-bottom:16px; position:relative; z-index:1; }
  .cp-feat-name {
  //  font-family:'DM Serif Display',serif;
    font-size:1.05rem; font-weight:400; color:var(--ink); margin-bottom:8px; position:relative; z-index:1; }
  .cp-feat-desc { font-size:.83rem; line-height:1.7; color:var(--ink-muted); font-weight:300; position:relative; z-index:1; }

  /* OUTCOME */
  .cp-outcome-section { background:var(--bg); padding:100px 80px; }
  .cp-outcome-inner { background:var(--grad); border-radius:28px; padding:80px; text-align:center; position:relative; overflow:hidden; }
  .cp-outcome-inner::before { content:''; position:absolute; width:600px; height:600px; border-radius:50%; background:rgba(255,255,255,.05); top:-200px; right:-200px; }
  .cp-outcome-inner::after { content:''; position:absolute; width:400px; height:400px; border-radius:50%; background:rgba(255,255,255,.05); bottom:-150px; left:-100px; }
  .cp-out-eyebrow { font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; font-weight:600; color:rgba(255,255,255,.6); margin-bottom:18px; }
  .cp-out-title { 
  // font-family:'DM Serif Display',serif; 
  font-size:clamp(2rem,4vw,3.2rem); font-weight:400; line-height:1.15; letter-spacing:-.03em; color:white; max-width:620px; margin:0 auto 22px; position:relative; z-index:1; }
  .cp-out-desc { font-size:.97rem; line-height:1.75; color:rgba(255,255,255,.8); font-weight:300; max-width:540px; margin:0 auto 44px; position:relative; z-index:1; }
  .cp-out-ctas { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
  .cp-btn-white { display:inline-flex; align-items:center; gap:9px; background:white; color:var(--violet); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .cp-btn-white:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.2); }
  .cp-btn-outline-white { display:inline-flex; align-items:center; gap:9px; background:transparent; color:white; border:1.5px solid rgba(255,255,255,.4); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .cp-btn-outline-white:hover { background:rgba(255,255,255,.1); border-color:white; transform:translateY(-2px); }

  /* FOOTER */
  .cp-footer { background:var(--black); padding:44px 80px; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,.06); }
  .cp-footer-logo-row { display:flex; align-items:center; gap:10px; }
  .cp-footer-logo-word {
  //  font-family:'DM Serif Display',serif;
    font-size:1rem; font-weight:400; color:rgba(255,255,255,.9); letter-spacing:-.02em; }
  .cp-footer-text { font-size:.78rem; color:rgba(255,255,255,.3); font-weight:300; }

  /* LAPTOP MOCKUP */
  .cp-laptop { position:relative; margin:auto; width:100%; max-width:560px; animation:cpFloatMock 7s ease-in-out infinite; }
  @keyframes cpFloatMock { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .cp-laptop__screen { position:relative; z-index:1; padding:1%; border-radius:1.4rem; background-image:linear-gradient(to bottom,#333,#111); box-shadow:0 0.1rem 0 #cfcfcf; border:2px solid #ccc; aspect-ratio:13/10; overflow:hidden; }
  .cp-laptop__bottom { position:relative; z-index:1; margin:0 -7%; height:.7rem; background-image:linear-gradient(to right,#d2dde9 0%,#f9fcff 15%,#e5ebf2 40%,#e5ebf2 60%,#f9fcff 85%,#d2dde9 100%); }
  .cp-laptop__bottom::before { content:''; display:block; margin:0 auto; width:20%; height:.7rem; border-radius:0 0 .2rem .2rem; background-image:linear-gradient(to right,#c3cfdb 0%,#f6f9fc 10%,#f6f9fc 90%,#c3cfdb 100%); }
  .cp-laptop__under { position:absolute; top:100%; left:25%; width:50%; height:1.5rem; background-image:linear-gradient(to bottom,#e2e8f0,#bec7d1); }
  .cp-laptop__under::before,.cp-laptop__under::after { content:''; position:absolute; top:0; bottom:0; width:50%; background:inherit; }
  .cp-laptop__under::before { right:100%; border-bottom-left-radius:100%; }
  .cp-laptop__under::after { left:100%; border-bottom-right-radius:100%; }
  .cp-laptop__shadow { position:absolute; left:-10%; right:-10%; bottom:-2.5rem; height:2rem; background:radial-gradient(ellipse closest-side,#000,transparent); opacity:.4; }

  /* ANIMATIONS */
  .cp-reveal{opacity:0;transform:translateY(40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .cp-reveal.visible{opacity:1;transform:none}
  .cp-reveal-l{opacity:0;transform:translateX(-40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .cp-reveal-l.visible{opacity:1;transform:none}
  .cp-reveal-r{opacity:0;transform:translateX(40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .cp-reveal-r.visible{opacity:1;transform:none}
  .cp-reveal-s{opacity:0;transform:scale(.93);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .cp-reveal-s.visible{opacity:1;transform:none}
  .cp-stagger>*{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .cp-stagger.visible>*:nth-child(1){opacity:1;transform:none;transition-delay:.05s}
  .cp-stagger.visible>*:nth-child(2){opacity:1;transform:none;transition-delay:.15s}
  .cp-stagger.visible>*:nth-child(3){opacity:1;transform:none;transition-delay:.25s}
  .cp-stagger.visible>*:nth-child(4){opacity:1;transform:none;transition-delay:.35s}
  .cp-stagger.visible>*:nth-child(5){opacity:1;transform:none;transition-delay:.45s}
  .cp-stagger.visible>*:nth-child(6){opacity:1;transform:none;transition-delay:.55s}
  @keyframes cpFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  @keyframes cpFadeIn{from{opacity:0}to{opacity:1}}

  @media(max-width:900px){
    .cp-hero{grid-template-columns:1fr;padding:100px 24px 60px}
    .cp-nav,.cp-nav.scrolled{padding:14px 70px 14px 24px}
    .cp-stats-strip{grid-template-columns:1fr 1fr;padding:36px 24px}
    .cp-section{padding:70px 24px}
    .cp-overview-grid,.cp-two-col,.cp-identity-grid{grid-template-columns:1fr}
    .cp-process-strip{grid-template-columns:1fr}
    .cp-proc-step+.cp-proc-step{border-left:none;border-top:1px solid var(--border)}
    .cp-features-grid{grid-template-columns:1fr 1fr}
    .cp-outcome-inner{padding:44px 24px}
    .cp-footer{flex-direction:column;gap:16px;text-align:center;padding:32px 24px}
    .cp-gallery-block,.cp-gallery-block.reverse,.cp-gallery-block.loader-block{grid-template-columns:1fr}
    .cp-gallery-block.reverse .cp-gallery-text,.cp-gallery-block.reverse .cp-gallery-image{order:unset}
    .cp-gallery-image.loader-img{max-width:100%}
    .cp-video-section{padding:70px 24px}
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

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.cp-reveal,.cp-reveal-l,.cp-reveal-r,.cp-reveal-s,.cp-stagger').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function CreativePulse() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.cp-stat-num').forEach(el => {
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
    document.querySelectorAll('.cp-stats-strip').forEach(el => statObs.observe(el));
    return () => statObs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        {/* Progress Bar */}
        <div className="cp-prog" style={{ width: `${scrollPct}%` }} />

        {/* Back Button */}
        <a href="/Home" className="cp-back-btn" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack /> Back
        </a>

        {/* Nav */}
        <nav className={`cp-nav${scrolled ? ' scrolled' : ''}`}>
          <ul className="cp-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#outcome">Outcome</a></li>
            <li><a href="#video">Video</a></li>
          </ul>
        </nav>

        {/* Hero */}
        <section className="cp-hero" id="hero">
          <div className="cp-hero-blob1" />
          <div className="cp-hero-blob2" />
          <div className="cp-hero-content">
            <div className="cp-hero-tag"><span className="cp-hero-tag-dot" />Multi-Device App · Digital Agency</div>
            <h1 className="cp-hero-title">Creative<br /><span className="cp-grad-text">Pulse</span></h1>
            <p className="cp-hero-desc">A responsive digital agency platform showcasing services, projects, and team members — built with a custom loader animation, 3D gallery, and full-stack backend for seamless user authentication and data storage.</p>
            <div className="cp-hero-ctas">
              <a href="https://youtu.be/E_vFwR923Eg" target="_blank" rel="noopener noreferrer" className="cp-btn-grad"><IconExternal />Watch Demo</a>
              <a href="https://github.com/Sahar-AbdulQdir/SA2-Multi-Device-App-Agency" target="_blank" rel="noopener noreferrer" className="cp-btn-ghost"><IconGithub />GitHub</a>
            </div>
          </div>
          {/* Hero Visual — Laptop Mockup */}
          <div className="cp-hero-visual">
            <div className="cp-laptop">
              <div className="cp-laptop__screen">
                <video
                  src={`${process.env.PUBLIC_URL}/creatV.mp4`}
                  autoPlay muted loop playsInline
                  style={{ width:'100%', height:'100%', border:'none', borderRadius:'.6rem', display:'block', objectFit:'cover' }}
                />
              </div>
              <div className="cp-laptop__bottom">
                <div className="cp-laptop__under" />
              </div>
              <div className="cp-laptop__shadow" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="cp-stats-strip cp-stagger">
          {[['5+','Key Features'],['3','Dev Phases'],['100%','Responsive'],['Node.js','Backend']].map(([num, label], i) => (
            <div key={i} className="cp-stat">
              <div className="cp-stat-num">{num}</div>
              <div className="cp-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section className="cp-section cp-overview" id="overview">
          <div className="cp-overview-grid">
            <div className="cp-reveal-l">
              <div className="cp-eyebrow">About the project</div>
              <h2 className="cp-sec-title">A digital agency platform built for <em>every device</em></h2>
              <p>CreativePulse is a fully responsive digital agency website built for the Multi-Device Application assessment. It allows users to explore the agency's services, browse featured projects, meet the team, and get in touch through a contact form — all within a polished, animated interface.</p>
              <p>The platform features a custom GSAP-powered loader animation, a 3D circular project gallery with mouse-driven rotation, a scrolling text marquee, and wave-based scroll reveal animations. The back-end is built with Node.js and MongoDB, handling user sign-up, login, and secure data storage.</p>
              <div className="cp-tech-label">Technologies Used</div>
              <div className="cp-tech-pills cp-stagger">
                {['HTML5','CSS3 / SCSS','JavaScript','GSAP','Node.js','Express.js','MongoDB','IntersectionObserver API','localStorage','Vercel'].map(t => (
                  <span key={t} className="cp-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="cp-aside-card cp-reveal-r">
              {[
                ['Project Type','Multi-Device Web Application'],
                ['Focus Area','Responsive Design & Animation'],
                ['Target Users','Agency clients, potential collaborators'],
                ['Platform','Web (Desktop, Tablet, Mobile)'],
                ['Backend','Node.js + MongoDB'],
              ].map(([k, v]) => (
                <div key={k} className="cp-aside-item">
                  <div className="cp-aside-key">{k}</div>
                  <div className="cp-aside-val">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Identity */}
        <section className="cp-section cp-identity-section">
          <div className="cp-reveal">
            <div className="cp-eyebrow">Brand & Visual Identity</div>
            <h2 className="cp-sec-title">The <em>design language</em> of CreativePulse</h2>
          </div>
          <div className="cp-identity-grid cp-stagger">
            {/* Logo */}
            <div className="cp-id-card">
              <div className="cp-id-card-label">Logo System</div>
              <div className="cp-logo-display">
                <img
                  src={LogoCp}
                  alt="CreativePulse Logo"
                  style={{ maxWidth: '180px', objectFit: 'contain' }}
                />
                <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300, textAlign: 'center', maxWidth: '240px' }}>
                  A bold wordmark paired with a dynamic pulse motif — reflecting energy, creativity, and forward momentum across all brand touchpoints.
                </p>
              </div>
            </div>

            {/* Palette */}
            <div className="cp-id-card">
              <div className="cp-id-card-label">Colour Palette</div>
              <div className="cp-palette">
                <div className="cp-color-row">
                  <div className="cp-swatch" style={{ background: 'linear-gradient(135deg, #C985C4, #B45DA8)', flex: 2 }}>
                    <span className="cp-swatch-label" style={{ color: 'rgba(255,255,255,.85)' }}>Primary Gradient</span>
                  </div>
                  <div className="cp-swatch" style={{ background: '#E9B3D6' }}>
                    <span className="cp-swatch-label" style={{ color: 'var(--ink-soft)' }}>#E9B3D6</span>
                  </div>
                </div>
                <div className="cp-color-row">
                  <div className="cp-swatch" style={{ background: '#C985C4' }}>
                    <span className="cp-swatch-label" style={{ color: 'rgba(255,255,255,.85)' }}>#C985C4</span>
                  </div>
                  <div className="cp-swatch" style={{ background: '#B45DA8' }}>
                    <span className="cp-swatch-label" style={{ color: 'rgba(255,255,255,.85)' }}>#B45DA8</span>
                  </div>
                  <div className="cp-swatch" style={{ background: '#000000' }}>
                    <span className="cp-swatch-label" style={{ color: 'rgba(255,255,255,.6)' }}>#000000</span>
                  </div>
                  <div className="cp-swatch" style={{ background: '#FFFFFF', border: '1px solid var(--border)' }}>
                    <span className="cp-swatch-label" style={{ color: 'var(--ink-muted)' }}>#FFFFFF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="cp-id-card">
              <div className="cp-id-card-label">Typography</div>
              <div className="cp-typo-samples">
                <div className="cp-typo-row">
                  <div className="cp-typo-name">Display — DM Serif Display</div>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.9rem', fontWeight: 400, lineHeight: 1, letterSpacing: '-.04em', color: 'var(--ink)' }}>
                    Creative <em style={{ fontStyle: 'italic', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pulse</em>
                  </div>
                </div>
                <div className="cp-typo-row">
                  <div className="cp-typo-name">Body — DM Sans Light</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--ink-soft)' }}>Clean, modern, and highly readable across all screen sizes.</div>
                </div>
                <div className="cp-typo-row">
                  <div className="cp-typo-name">Label — DM Sans Semibold</div>
                  <div style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Responsive · Full-Stack · Animated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem + Objectives */}
        <section className="cp-section cp-problem-section">
          <div className="cp-reveal">
            <div className="cp-eyebrow">Why it exists</div>
            <h2 className="cp-sec-title">Brief & <em>Objectives</em></h2>
          </div>
          <div className="cp-two-col cp-stagger">
            <div className="cp-content-card">
              <div className="cp-eyebrow" style={{ marginBottom: 0 }}>The Brief</div>
              <p>For the second web development assessment, the task was to build a responsive Multi-Device Application. The result is CreativePulse — a digital agency platform that showcases the agency's work and lets users reach out through a contact form. The challenge was to design a visually engaging experience that works seamlessly across desktops, tablets, and mobile devices, while integrating a full-stack backend for data persistence.</p>
            </div>
            <div className="cp-content-card">
              <div className="cp-eyebrow" style={{ marginBottom: 0 }}>Key Features</div>
              <ul className="cp-obj-list">
                {[
                  'Custom GSAP loader animation with marquee and clip-path transitions',
                  'Wave-based scroll reveal using IntersectionObserver API',
                  '3D circular project gallery with live mouse-tracking rotation',
                  'Scrolling text marquee with glass-effect styling',
                  'Sign-up and login forms with localStorage and MongoDB integration',
                  'Fully responsive layout using CSS Grid, Flexbox, and media queries',
                ].map((item, i) => (
                  <li key={i}><span className="cp-obj-n">0{i+1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="cp-section cp-process-section" id="process">
          <div className="cp-reveal">
            <div className="cp-eyebrow">Development Process</div>
            <h2 className="cp-sec-title">From wireframe to <em>deployment</em></h2>
          </div>
          <div className="cp-process-strip cp-stagger">
            {[
              ['01', 'Layout & Wireframing', 'Early iterations focused on page structure, navigation flow, and responsive layout planning. Initial screens revealed layout issues on smaller viewports, prompting a complete redesign of key sections — particularly the Projects area — using CSS Grid and Flexbox with targeted media queries.'],
              ['02', 'Animations & Interactions', 'The GSAP timeline drives the loader sequence, controlling marquee clip-path animations and fade transitions. Scroll-based reveal animations use IntersectionObserver to trigger wave effects. The 3D gallery uses perspective transforms and mouse-position data to rotate items in circular formation.'],
              ['03', 'Backend & Deployment', 'Node.js and Express handle routing and API endpoints, while MongoDB stores user data securely. The sign-up and login flows validate inputs, manage localStorage state, and communicate with the backend via POST requests. The site was tested iteratively across device widths before final deployment.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="cp-proc-step">
                <div className="cp-proc-n">{n}</div>
                <div className="cp-proc-title">{title}</div>
                <p className="cp-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery — Wireframes & Loader */}
        <section className="cp-gallery">
          {/* Low-Fi Wireframes */}
          <div className="cp-gallery-block">
            <div className="cp-gallery-text">
              <h3>Low-Fidelity Wireframes</h3>
              <p>Early wireframes mapped out page structure, content hierarchy, and navigation flow before any visual decisions were made. These sketches revealed responsiveness gaps — particularly in the projects section — that drove a full layout rethink for smaller screens.</p>
            </div>
            <div className="cp-gallery-image">
              <img src={LowFi} alt="Low Fidelity Wireframes" />
            </div>
          </div>

          {/* High-Fi Mockups */}
          <div className="cp-gallery-block reverse">
            <div className="cp-gallery-text">
              <h3>High-Fidelity Mockups</h3>
              <p>The high-fidelity designs introduced the final colour palette, typography, and component styling. Dark backgrounds with gradient accents create a premium agency feel, while generous whitespace and card-based layouts keep content scannable across all device sizes.</p>
            </div>
            <div className="cp-gallery-image">
              <img src={HiFi} alt="High Fidelity Mockups" />
            </div>
          </div>

          {/* Loader Animation */}
          <div className="cp-gallery-block loader-block">
            <div className="cp-gallery-text">
              <h3>Loader Animation</h3>
              <p>The custom GSAP loader is split into three panels — top, center, and bottom — each animated using clip-path transitions and a horizontal marquee. The sequence fades the loader out and reveals the main page content through a carefully timed GSAP timeline, creating a cinematic brand entrance.</p>
            </div>
            <div className="cp-gallery-image loader-img">
              <img src={LoaderImg} alt="GSAP Loader Animation" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="cp-section cp-features-section" id="features">
  <div className="cp-reveal">
    <div className="cp-eyebrow">Technical Highlights</div>
    <h2 className="cp-sec-title">Built with <em>care & craft</em></h2>
  </div>

  <div className="cp-features-grid cp-stagger">
    {features.map(([icon, name, desc]) => (
      <div key={name} className="cp-feat-card">
        <div className="cp-feat-icon">{icon}</div>
        <div className="cp-feat-name">{name}</div>
        <p className="cp-feat-desc">{desc}</p>
      </div>
    ))}
  </div>
</section>

        {/* Video */}
        <section className="cp-video-section" id="video">
          <div className="cp-reveal">
            <div className="cp-eyebrow">Project Walkthrough</div>
            <h2 className="cp-sec-title">See it <em>in action</em></h2>
          </div>
          <div className="cp-video-wrapper cp-reveal-s">
            <iframe
              src="https://www.youtube.com/embed/E_vFwR923Eg"
              title="CreativePulse — Project Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="cp-video-caption">
            A full walkthrough of CreativePulse — animations, 3D gallery, auth flow, and responsive layouts across all devices.
          </p>
        </section>

        {/* Outcome */}
        <section className="cp-outcome-section" id="outcome">
          <div className="cp-outcome-inner cp-reveal-s">
            <div className="cp-out-eyebrow">Final Outcome</div>
            <h2 className="cp-out-title">A polished, fully responsive agency platform with cinematic animation and full-stack functionality</h2>
            <p className="cp-out-desc">CreativePulse delivers a memorable brand experience across every device — combining custom GSAP animations, interactive 3D visuals, and a secure Node.js backend into a cohesive, production-ready web application.</p>
            <div className="cp-out-ctas">
              <a href="https://youtu.be/E_vFwR923Eg" target="_blank" rel="noopener noreferrer" className="cp-btn-white"><IconExternal />Watch Walkthrough</a>
              <a href="https://github.com/Sahar-AbdulQdir/SA2-Multi-Device-App-Agency" target="_blank" rel="noopener noreferrer" className="cp-btn-outline-white"><IconGithub />GitHub Repository</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="cp-footer">
          <div className="cp-footer-logo-row">
            <span className="cp-footer-logo-word">CreativePulse</span>
          </div>
          <p className="cp-footer-text">Multi-Device Web Application — Assessment 2</p>
        </footer>

      </div>
    </>
  );
}