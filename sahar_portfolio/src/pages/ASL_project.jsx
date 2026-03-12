import { useEffect, useRef, useState } from "react";

// ── Replace these with your actual imports ──────────────────────────────────
import HighF from "../assets/Images/signHigh.png";
import LowF from "../assets/Images/signLow.png";
import PreprocessImg from "../assets/Images/aslImgs.png";
import SampleData1 from "../assets/Images/signSampleData1.png";
import SampleData2 from "../assets/Images/signSampleData2.png";
import SampleData3 from "../assets/Images/signSampleData3.png";
import Flowchart from "../assets/Images/aslDiagram.png";

// ────────────────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:     #050A30;
    --royal:    #12229D;
    --sky:      #5CB6F9;
    --ice:      #7aa4c5;
    --ghost:    #ECF1FF;
    --white:    #ffffff;

    --ink:      var(--navy);
    --ink-soft: #1a2560;
    --ink-muted:#3d4f8a;

    --grad:      linear-gradient(135deg, var(--royal) 0%, var(--sky) 100%);
    --grad-light:linear-gradient(135deg, var(--ice) 0%, var(--ghost) 100%);
    --grad-glow: linear-gradient(135deg, #1a33cc 0%, #5CB6F9 100%);

    --border:   rgba(92,182,249,0.2);
    --border-s: var(--sky);
    --shadow:   0 24px 64px rgba(18,34,157,0.18);
    --shadow-s: 0 8px 24px rgba(18,34,157,0.12);
  }

  html { scroll-behavior: smooth; }
  body { 
  // font-family: 'DM Sans', sans-serif; 
  background: var(--ghost); color: var(--ink); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--sky); border-radius: 2px; }

  .sl-root { 
  // font-family: 'DM Sans', sans-serif; 
  background: var(--ghost); color: var(--ink); overflow-x: hidden; position: relative; }

  /* grain overlay */
  .sl-root::after {
    content:''; position:fixed; inset:0; z-index:9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    opacity:.5; pointer-events:none;
  }

  /* PROGRESS */
  .sl-prog { position:fixed; top:0; left:0; height:3px; z-index:1001; background:var(--grad-glow); transition:width .1s; box-shadow:0 0 12px rgba(92,182,249,.7); }

  /* BACK */
  .sl-back {
    position:fixed; top:18px; left:28px; z-index:300;
    display:flex; align-items:center; gap:8px;
    background:rgba(5,10,48,.85); border:1px solid var(--border);
    border-radius:100px; padding:9px 18px 9px 13px;
    font-size:.75rem; font-weight:500; color:var(--ice);
    text-decoration:none; cursor:pointer; backdrop-filter:blur(12px);
    box-shadow:0 4px 16px rgba(5,10,48,.4); transition:all .3s;
  }
  .sl-back:hover { background:var(--royal); color:white; border-color:var(--sky); transform:translateX(-3px); }
  .sl-back svg { transition:transform .3s; }
  .sl-back:hover svg { transform:translateX(-3px); }

  /* NAV */
  .sl-nav {
    position:fixed; top:0; left:0; right:0; z-index:200;
    display:flex; align-items:center; justify-content:flex-end;
    padding:22px 64px; transition:all .4s; pointer-events:none;
  }
  .sl-nav.scrolled {
    background:rgba(5,10,48,.92); backdrop-filter:blur(18px);
    border-bottom:1px solid var(--border); padding:14px 64px; pointer-events:all;
  }
  .sl-nav-links { display:flex; gap:28px; list-style:none; }
  .sl-nav-links a { font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:rgb(69, 174, 255); text-decoration:none; transition:color .2s; }
  .sl-nav-links a:hover, .sl-nav.scrolled .sl-nav-links a:hover { color:var(--sky); }
  .sl-nav.scrolled .sl-nav-links a { color:rgba(202,232,255,.55); }

  /* HERO */
  .sl-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; padding:0 80px 0 100px; align-items:center; gap:60px; position:relative; overflow:hidden; }

  /* animated grid lines */
  .sl-hero::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(92,182,249,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(92,182,249,.05) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events:none;
  }
  // .sl-hero-glow1 { position:absolute; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle, rgba(18,34,157,.55) 0%, transparent 70%); top:-200px; right:-150px; pointer-events:none; animation:slPulse 9s ease-in-out infinite; }
  // .sl-hero-glow2 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle, rgba(92,182,249,.18) 0%, transparent 70%); bottom:-100px; left:-80px; pointer-events:none; animation:slPulse 11s ease-in-out infinite reverse; }
  @keyframes slPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

  .sl-hero-content { position:relative; z-index:1; }
  .sl-hero-tag {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(92,182,249,.3); border-radius:100px;
    padding:6px 16px; font-size:.7rem; font-weight:600; letter-spacing:.08em;
    text-transform:uppercase; color:var(--sky); margin-bottom:28px;
    background:rgba(92,182,249,.07);
    animation:slFadeUp .7s .2s both;
  }
  .sl-hero-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--sky); box-shadow:0 0 8px var(--sky); animation:slBlink 2s ease-in-out infinite; }
  @keyframes slBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

  .sl-hero-title {
    // font-family:'Syne', sans-serif; 
    font-size:clamp(3.5rem,6.5vw,6.5rem);
    font-weight:800; line-height:.92; letter-spacing:-.04em;
    color:#050A30; margin-bottom:28px; animation:slFadeUp .8s .35s both;
  }
  .sl-grad-text {
    background: #5CB6F9; -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; background-clip:text;
  }
  .sl-hero-desc { font-size:1rem; line-height:1.8; color: #5CB6F9; font-weight:300; max-width:440px; margin-bottom:40px; animation:slFadeUp .8s .5s both; }
  .sl-hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:slFadeUp .8s .65s both; }
  .sl-btn-grad { display:inline-flex; align-items:center; gap:9px; background:var(--grad-glow); color:white; padding:13px 28px; border-radius:100px; font-size:.82rem; font-weight:500; text-decoration:none; transition:all .3s; box-shadow:0 6px 20px rgba(18,34,157,.5); }
  .sl-btn-grad:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(92,182,249,.4); }
  .sl-btn-ghost { display:inline-flex; align-items:center; gap:9px; background:transparent; color:var(--ice); border:1.5px solid rgba(202,232,255,.2); padding:13px 28px; border-radius:100px; font-size:.82rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .sl-btn-ghost:hover { border-color:var(--sky); color:var(--sky); transform:translateY(-2px); }

  /* Hero Visual – floating badge grid */
  // .sl-hero-visual { position:relative; z-index:1; animation:slFadeIn 1s .9s both; display:flex; align-items:center; justify-content:center; }
  .sl-hand-display {
    width:100%; max-width:440px; background:rgba(255,255,255,.04);
    border:1px solid rgba(92,182,249,.2); border-radius:24px; padding:28px;
    backdrop-filter:blur(8px);
  }
  .sl-hand-row { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:10px; }
  .sl-hand-cell {
    aspect-ratio:1; border-radius:12px; background:rgba(92,182,249,.08);
    border:1px solid rgba(92,182,249,.15); display:flex; flex-direction:column;
    align-items:center; justify-content:center; 
    // font-family:'Syne',sans-serif;
    font-size:1.2rem; font-weight:700; color:var(--ice);
    transition:all .3s; cursor:default; position:relative; overflow:hidden;
  }
  .sl-hand-cell::after { content:''; position:absolute; inset:0; background:var(--grad-glow); opacity:0; transition:opacity .3s; border-radius:12px; }
  .sl-hand-cell:hover::after { opacity:.15; }
  .sl-hand-cell span.ltr { position:relative; z-index:1; font-size:1.4rem; }
  .sl-hand-cell span.sub { position:relative; z-index:1; font-size:.45rem; font-weight:400; letter-spacing:.06em; text-transform:uppercase; color:rgba(202,232,255,.4); margin-top:2px; 
  // font-family:'DM Sans',sans-serif; 
  }
  .sl-hand-cell.active { background:rgba(18,34,157,.5); border-color:var(--sky); box-shadow:0 4px 16px rgba(92,182,249,.2); }
  .sl-hand-cell.active::after { opacity:.2; }
  .sl-hand-label { font-size:.62rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; color:rgba(202,232,255,.3); text-align:center; margin-top:8px; 
  // font-family:'DM Sans',sans-serif; 
  }

  /* STATS */
  .sl-stats { background:var(--royal); padding:48px 80px; display:grid; grid-template-columns:repeat(4,1fr); gap:40px; border-top:1px solid rgba(92,182,249,.15); border-bottom:1px solid rgba(92,182,249,.15); }
  .sl-stat { text-align:center; }
  .sl-stat-num { 
  // font-family:'Syne',sans-serif;
   font-size:2.8rem; font-weight:800; line-height:1; background:var(--grad-glow); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; letter-spacing:-.04em; }
  .sl-stat-label { font-size:.7rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:rgba(202,232,255,.45); }

  /* SECTION BASE */
  .sl-section { padding:100px 80px; }
  .sl-eyebrow { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--sky); display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .sl-eyebrow::before { content:''; display:block; width:24px; height:2px; background:var(--grad-glow); flex-shrink:0; }
  .sl-sec-title { 
  // font-family:'Syne',sans-serif;
   font-size:clamp(2rem,4vw,3rem); font-weight:700; letter-spacing:-.03em; line-height:1.1; color:var(--navy); }
  .sl-sec-title em { font-style:normal; background:var(--grad-glow); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .sl-sec-title-light { color:white; }
  .sl-sec-title-light em { background:var(--grad-light); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* OVERVIEW */
  .sl-overview { background:white; }
  .sl-ov-grid { display:grid; grid-template-columns:5fr 4fr; gap:72px; align-items:start; }
  .sl-ov-text p { font-size:.97rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:20px; }
  .sl-tech-label { font-size:.65rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin:28px 0 10px; }
  .sl-tech-pills { display:flex; flex-wrap:wrap; gap:8px; }
  .sl-pill { background:var(--ghost); border:1.5px solid var(--border); border-radius:100px; padding:5px 15px; font-size:.76rem; font-weight:500; color:var(--ink-soft); transition:all .25s; cursor:default; }
  .sl-pill:hover { background:var(--royal); color:white; border-color:var(--royal); }
  .sl-aside { background:var(--ghost); border:1px solid var(--border); border-radius:20px; padding:30px; position:sticky; top:100px; }
  .sl-aside-item { padding:15px 0; border-bottom:1px solid var(--border); }
  .sl-aside-item:last-child { border-bottom:none; padding-bottom:0; }
  .sl-aside-item:first-child { padding-top:0; }
  .sl-aside-k { font-size:.62rem; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:4px; }
  .sl-aside-v { font-size:.88rem; font-weight:500; color:var(--navy); }

  /* PROBLEM */
  .sl-problem { background:var(--ghost); }
  .sl-two-col { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:52px; }
  .sl-card { background:white; border:1px solid var(--border); border-radius:20px; padding:38px; transition:all .3s; }
  .sl-card:hover { box-shadow:var(--shadow); transform:translateY(-4px); }
  .sl-card > p { font-size:.95rem; line-height:1.85; color:var(--ink-soft); font-weight:300; margin-top:16px; }
  .sl-obj-list { list-style:none; margin-top:16px; }
  .sl-obj-list li { display:flex; gap:12px; align-items:flex-start; padding:10px 0; border-bottom:1px solid rgba(92,182,249,.1); font-size:.9rem; color:var(--ink-soft); font-weight:300; line-height:1.6; }
  .sl-obj-list li:last-child { border-bottom:none; }
  .sl-obj-n {
  //  font-family:'Syne',sans-serif;
    font-size:.75rem; background:var(--grad-glow); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:700; flex-shrink:0; margin-top:3px; }


  /* DATA */
  .sl-data-section { background:white; }
  .sl-data-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:52px; }
  .sl-data-card { background:var(--ghost); border:1px solid var(--border); border-radius:18px; padding:28px 24px; transition:all .3s; position:relative; overflow:hidden; }
  .sl-data-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--grad-glow); opacity:0; transition:opacity .3s; }
  .sl-data-card:hover::before { opacity:1; }
  .sl-data-card:hover { box-shadow:var(--shadow-s); transform:translateY(-4px); }
  .sl-data-icon { width:44px; height:44px; border-radius:12px; background:var(--grad-light); border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1.2rem; margin-bottom:16px; }
  .sl-data-name {
  //  font-family:'Syne',sans-serif; 
   font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:8px; }

  .sl-data-desc { font-size:.82rem; line-height:1.7; color:var(--ink-muted); font-weight:300; }

  /* PROCESS */
  .sl-process { background:var(--navy); }
  .sl-process .sl-sec-title { color:white; }
  .sl-proc-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:52px; background:rgba(92,182,249,.1); border-radius:20px; overflow:hidden; border:1px solid rgba(92,182,249,.15); }
  .sl-proc-step { background:rgba(5,10,48,.8); padding:44px 32px; transition:background .3s; }
  .sl-proc-step:hover { background:rgba(18,34,157,.3); }
  .sl-proc-n { 
  // font-family:'Syne',sans-serif;
   font-size:4rem; font-weight:800; line-height:1; margin-bottom:16px; background:var(--grad-glow); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; opacity:.35; letter-spacing:-.04em; }
  .sl-proc-title { 
  // font-family:'Syne',sans-serif;
   font-size:1.1rem; font-weight:700; color:var(--ice); margin-bottom:10px; }
  .sl-proc-desc { font-size:.85rem; line-height:1.75; color:rgba(202,232,255,.5); font-weight:300; }

  /* MODEL */
  .sl-model-section { background:var(--ghost); }
  .sl-model-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:52px; }
  .sl-model-card { background:white; border:1px solid var(--border); border-radius:20px; padding:36px; transition:all .3s; }
  .sl-model-card:hover { box-shadow:var(--shadow-s); transform:translateY(-4px); }
  .sl-model-card h4 { 
  // font-family:'Syne',sans-serif;
   font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:14px; }
  .sl-model-card p, .sl-model-card li { font-size:.88rem; line-height:1.8; color:var(--ink-soft); font-weight:300; }
  .sl-kv-list { list-style:none; }
  .sl-kv-list li { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(92,182,249,.1); font-size:.86rem; }
  .sl-kv-list li:last-child { border-bottom:none; }
  .sl-kv-k { color:var(--ink-muted); font-weight:400; }
  .sl-kv-v { font-weight:600; color:var(--royal);
  //  font-family:'Syne',sans-serif; 
   font-size:.82rem; }
  .sl-acc-bar-wrap { margin-top:18px; }
  .sl-acc-bar-label { display:flex; justify-content:space-between; font-size:.75rem; color:var(--ink-muted); margin-bottom:6px; font-weight:500; }
  .sl-acc-bar-track { height:8px; border-radius:100px; background:var(--ghost); overflow:hidden; border:1px solid var(--border); }
  .sl-acc-bar-fill { height:100%; border-radius:100px; background:var(--grad-glow); transition:width 1.4s cubic-bezier(.16,1,.3,1); }
  .sl-improvement-list { list-style:none; }
  .sl-improvement-list li { display:flex; gap:10px; align-items:flex-start; padding:9px 0; border-bottom:1px solid rgba(92,182,249,.1); font-size:.87rem; color:var(--ink-soft); font-weight:300; line-height:1.6; }
  .sl-improvement-list li:last-child { border-bottom:none; }
  .sl-imp-dot { width:6px; height:6px; border-radius:50%; background:var(--sky); flex-shrink:0; margin-top:6px; }

  /* GALLERY */
  .sl-gallery { background:white; padding:100px 80px; }
  .sl-gallery-block { display:grid; grid-template-columns:1fr 1.2fr; gap:56px; align-items:center; margin-bottom:80px; }
  .sl-gallery-block:last-child { margin-bottom:0; }
  .sl-gallery-block.rev { grid-template-columns:1.2fr 1fr; }
  .sl-gallery-block.rev .sl-gallery-text { order:2; }
  .sl-gallery-block.rev .sl-gallery-img { order:1; }
  .sl-gallery-text h3 { 
  // font-family:'Syne',sans-serif; 
  font-size:1.7rem; font-weight:700; color:var(--navy); margin-bottom:12px; letter-spacing:-.02em; }
  .sl-gallery-text p { font-size:.93rem; line-height:1.8; color:var(--ink-soft); font-weight:300; }
  .sl-gallery-img {
    width:100%; border-radius:18px;
    overflow:hidden; border:1.5px solid var(--border);
    box-shadow:var(--shadow-s);
    background:var(--ghost);
    display:flex; align-items:center; justify-content:center;
    min-height:280px;
  }
  .sl-gallery-img img { width:100%; height:100%; object-fit:contain; display:block; }
  .sl-img-placeholder {
    width:100%; min-height:280px; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:12px;
    color:var(--ink-muted); font-size:.8rem; font-weight:500;
    letter-spacing:.06em; text-transform:uppercase;
  }
  .sl-img-placeholder-icon { width:48px; height:48px; border-radius:12px; background:var(--grad-light); display:flex; align-items:center; justify-content:center; font-size:1.4rem; }

  /* RESULTS */
  .sl-results { background:#ffffff; padding:100px 80px; }
  .sl-results .sl-sec-title { color:black; }
  .sl-results-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:52px; }
  .sl-res-card { border:1px solid rgba(92,182,249,.12); border-radius:20px; padding:38px; background:rgba(255,255,255,.03); transition:all .3s; }
  .sl-res-card:hover { background:rgba(229, 229, 229, 0.2); border-color:rgba(48, 165, 255, 0.8); }
  .sl-res-label { font-size:.65rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--sky); display:flex; align-items:center; gap:8px; margin-bottom:16px; }
  .sl-res-label::before { content:''; display:block; width:18px; height:1.5px; background:var(--sky); }
  .sl-res-title {
  //  font-family:'Syne',sans-serif; 
   font-size:1.25rem; font-weight:700; color:rgba(103, 189, 255, 0.9); margin-bottom:12px; line-height:1.2; }
  .sl-res-text { font-size:.88rem; line-height:1.8; color:rgb(76, 177, 255); font-weight:300; }
  .sl-big-stat {
  //  font-family:'Syne',sans-serif; 
   font-size:3.5rem; font-weight:800; background:var(--grad-glow); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; margin-bottom:10px; letter-spacing:-.04em; }

  /* VIDEO */
  .sl-video-section { background:var(--ghost); padding:100px 80px; }
  .sl-video-wrap { margin-top:52px; border-radius:22px; overflow:hidden; border:1.5px solid var(--border); box-shadow:var(--shadow); position:relative; aspect-ratio:16/9; background:var(--navy); }
  .sl-video-wrap iframe { position:absolute; inset:0; width:100%; height:100%; border:none; display:block; }
  .sl-video-caption { margin-top:16px; text-align:center; font-size:.78rem; color:var(--ink-muted); letter-spacing:.03em; }

  /* OUTCOME */
  .sl-outcome { background:var(--ghost); padding:100px 80px; }
  .sl-outcome-inner {
    background:var(--navy); border-radius:28px; padding:80px;
    text-align:center; position:relative; overflow:hidden;
    border:1px solid rgba(92,182,249,.15);
  }
  .sl-outcome-inner::before { content:''; position:absolute; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle,rgba(18,34,157,.6) 0%,transparent 70%); top:-250px; right:-200px; }
  .sl-outcome-inner::after { content:''; position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(92,182,249,.1) 0%,transparent 70%); bottom:-200px; left:-100px; }
  .sl-out-eyebrow { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; font-weight:600; color:rgba(202,232,255,.4); margin-bottom:16px; }
  .sl-out-title { 
  // font-family:'Syne',sans-serif;
   font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:700; line-height:1.15; letter-spacing:-.03em; color:white; max-width:620px; margin:0 auto 20px; position:relative; z-index:1; }
  .sl-out-desc { font-size:.95rem; line-height:1.75; color:rgba(202,232,255,.55); font-weight:300; max-width:520px; margin:0 auto 40px; position:relative; z-index:1; }
  .sl-out-ctas { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
  .sl-btn-ice { display:inline-flex; align-items:center; gap:9px; background:var(--ice); color:var(--navy); padding:13px 26px; border-radius:100px; font-size:.82rem; font-weight:600; text-decoration:none; transition:all .3s; }
  .sl-btn-ice:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(92,182,249,.4); background:white; }
  .sl-btn-border { display:inline-flex; align-items:center; gap:9px; background:transparent; color:rgba(202,232,255,.7); border:1.5px solid rgba(202,232,255,.2); padding:13px 26px; border-radius:100px; font-size:.82rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .sl-btn-border:hover { background:rgba(255,255,255,.07); border-color:var(--sky); color:white; transform:translateY(-2px); }

  /* FOOTER */
  .sl-footer { background:var(--navy); padding:40px 80px; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(92,182,249,.08); }
  .sl-footer-brand {
  //  font-family:'Syne',sans-serif;
    font-size:.95rem; font-weight:700; color:rgba(202,232,255,.8); }
  .sl-footer-text { font-size:.75rem; color:rgba(202,232,255,.25); font-weight:300; }

  /* ANIMATIONS */
  .sl-reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .sl-reveal.vis{opacity:1;transform:none}
  .sl-reveal-l{opacity:0;transform:translateX(-36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .sl-reveal-l.vis{opacity:1;transform:none}
  .sl-reveal-r{opacity:0;transform:translateX(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .sl-reveal-r.vis{opacity:1;transform:none}
  .sl-reveal-s{opacity:0;transform:scale(.94);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .sl-reveal-s.vis{opacity:1;transform:none}
  .sl-stagger>*{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .sl-stagger.vis>*:nth-child(1){opacity:1;transform:none;transition-delay:.04s}
  .sl-stagger.vis>*:nth-child(2){opacity:1;transform:none;transition-delay:.13s}
  .sl-stagger.vis>*:nth-child(3){opacity:1;transform:none;transition-delay:.22s}
  .sl-stagger.vis>*:nth-child(4){opacity:1;transform:none;transition-delay:.31s}
  .sl-stagger.vis>*:nth-child(5){opacity:1;transform:none;transition-delay:.40s}
  .sl-stagger.vis>*:nth-child(6){opacity:1;transform:none;transition-delay:.49s}
  @keyframes slFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  @keyframes slFadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

  /* RESPONSIVE */
  @media(max-width:900px){
    .sl-hero{grid-template-columns:1fr;padding:100px 24px 60px}
    .sl-nav,.sl-nav.scrolled{padding:14px 70px 14px 24px}
    .sl-stats{grid-template-columns:1fr 1fr;padding:36px 24px}
    .sl-section,.sl-gallery,.sl-results,.sl-video-section,.sl-outcome{padding:70px 24px}
    .sl-ov-grid,.sl-two-col,.sl-model-grid,.sl-results-grid{grid-template-columns:1fr}
    .sl-proc-steps,.sl-data-grid{grid-template-columns:1fr}
    .sl-gallery-block,.sl-gallery-block.rev{grid-template-columns:1fr}
    .sl-gallery-block.rev .sl-gallery-text,.sl-gallery-block.rev .sl-gallery-img{order:unset}
    .sl-outcome-inner{padding:48px 24px}
    .sl-footer{flex-direction:column;gap:14px;text-align:center;padding:32px 24px}
    .sl-nav-links{display:none}
  }

 /* HERO VISUAL */
  .asl-hero-visual { position:relative; z-index:1; animation:cpFadeIn 1s .8s both; display:flex; align-items:center; justify-content:center; }

  
  /* LAPTOP MOCKUP */
  .asl-laptop { position:relative; margin:auto; width:100%; max-width:560px; animation:cpFloatMock 7s ease-in-out infinite; }
  @keyframes cpFloatMock { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .asl-laptop__screen { position:relative; z-index:1; padding:1%; border-radius:1.4rem; background-image:linear-gradient(to bottom,#333,#111); box-shadow:0 0.1rem 0 #cfcfcf; border:2px solid #ccc; aspect-ratio:13/10; overflow:hidden; }
  .asl-laptop__bottom { position:relative; z-index:1; margin:0 -7%; height:.7rem; background-image:linear-gradient(to right,#d2dde9 0%,#f9fcff 15%,#e5ebf2 40%,#e5ebf2 60%,#f9fcff 85%,#d2dde9 100%); }
  .asl-laptop__bottom::before { content:''; display:block; margin:0 auto; width:20%; height:.7rem; border-radius:0 0 .2rem .2rem; background-image:linear-gradient(to right,#c3cfdb 0%,#f6f9fc 10%,#f6f9fc 90%,#c3cfdb 100%); }
  .asl-laptop__under { position:absolute; top:100%; left:25%; width:50%; height:1.5rem; background-image:linear-gradient(to bottom,#e2e8f0,#bec7d1); }
  .asl-laptop__under::before,.asl-laptop__under::after { content:''; position:absolute; top:0; bottom:0; width:50%; background:inherit; }
  .asl-laptop__under::before { right:100%; border-bottom-left-radius:100%; }
  .asl-laptop__under::after { left:100%; border-bottom-right-radius:100%; }
  .asl-laptop__shadow { position:absolute; left:-10%; right:-10%; bottom:-2.5rem; height:2rem; background:radial-gradient(ellipse closest-side,#000,transparent); opacity:.4; }

`;

// ── Icons ─────────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconGithub = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
);
const IconExternal = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Hooks ─────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.sl-reveal,.sl-reveal-l,.sl-reveal-r,.sl-reveal-s,.sl-stagger').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Placeholder image component ───────────────────────────────────────────
function Img({ src, alt, icon, label }) {
  return src ? (
    <img src={src} alt={alt} />
  ) : (
    <div className="sl-img-placeholder">
      <div className="sl-img-placeholder-icon">{icon}</div>
      <span>{label}</span>
    </div>
  );
}

// ── ASL hand display letters ──────────────────────────────────────────────
const ASL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];

export default function SignLanguagePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeLetters, setActiveLetters] = useState(new Set([0, 5, 11, 17, 23]));
  useReveal();

  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setScrollPct(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // animate active cells
  useEffect(() => {
    const id = setInterval(() => {
      const pick = new Set();
      while (pick.size < 5) pick.add(Math.floor(Math.random() * 25));
      setActiveLetters(pick);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // bar animation
  const [barsVis, setBarsVis] = useState(false);
  const barRef = useRef(null);
  useEffect(() => {
    if (!barRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBarsVis(true); }, { threshold: 0.4 });
    obs.observe(barRef.current);
    return () => obs.disconnect();
  }, []);

  // counter
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.sl-stat-num').forEach(el => {
          const raw = el.textContent, n = parseInt(raw);
          if (isNaN(n)) return;
          const suffix = raw.replace(/[0-9]/g, '');
          let t;
          const step = ts => {
            if (!t) t = ts;
            const p = Math.min((ts - t) / 1400, 1), ep = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(ep * n) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.sl-stats').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="sl-root">
        <div className="sl-prog" style={{ width: `${scrollPct}%` }} />

        {/* Back */}
        <a href="#" className="sl-back" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack /> Back
        </a>

        {/* Nav */}
        <nav className={`sl-nav${scrolled ? ' scrolled' : ''}`}>
          <ul className="sl-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#data">Data</a></li>
            <li><a href="#model">Model</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#video">Demo</a></li>
          </ul>
        </nav>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="sl-hero" id="hero">
          <div className="sl-hero-glow1" />
          <div className="sl-hero-glow2" />
          <div className="sl-hero-content">
            <div className="sl-hero-tag">
              <span className="sl-hero-tag-dot" />
              Computer Vision · ASL Recognition
            </div>
            <h1 className="sl-hero-title">
              Sign<br />
              <span className="sl-grad-text">Language</span><br />
              System
            </h1>
            <p className="sl-hero-desc">
              A real-time American Sign Language recognition and learning platform powered by MediaPipe hand landmark detection and a KNN classifier — bridging communication gaps between signers and non-signers.
            </p>
            <div className="sl-hero-ctas">
              <a href="https://github.com/Sahar-AbdulQdir/SignLanguageLearningSystem" target="_blank" rel="noopener noreferrer" className="sl-btn-grad">
                <IconGithub /> GitHub Repository
              </a>
              <a href="https://youtu.be/7ab0d4Q9aNQ" target="_blank" rel="noopener noreferrer" className="sl-btn-ghost">
                <IconExternal /> Watch Demo
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="asl-hero-visual">
                        <div className="asl-laptop">
              <div className="asl-laptop__screen">
                <video
                  src={`${process.env.PUBLIC_URL}/signV.mp4`}
                  autoPlay muted loop playsInline
                  style={{ width:'100%', height:'100%', border:'none', borderRadius:'.6rem', display:'block', objectFit:'cover' }}
                />
              </div>
              <div className="asl-laptop__bottom">
                <div className="asl-laptop__under" />
              </div>
              <div className="asl-laptop__shadow" />
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────────────── */}
        <div className="sl-stats sl-stagger">
          {[['~100%','Test Accuracy'],['16,957','Test Samples'],['KNN','Algorithm'],['21','3D Landmarks']].map(([n, l], i) => (
            <div key={i} className="sl-stat">
              <div className="sl-stat-num">{n}</div>
              <div className="sl-stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ───────────────────────────────────────────────────── */}
        <section className="sl-section sl-overview" id="overview">
          <div className="sl-ov-grid">
            <div className="sl-reveal-l">
              <div className="sl-eyebrow">About the project</div>
              <h2 className="sl-sec-title">A bridge between <em>signers & non-signers</em></h2>
              <p>The Sign Language Learning System is a real-time ASL recognition application that combines computer vision with an interactive educational interface. Motivated by curiosity about how machines perceive human gestures, this project explores hand landmark detection, real-time classification, and machine learning applied to something both meaningful and beneficial.</p>
              <p>The system offers three core modes: <strong>Learn Mode</strong> for guided sign practice, <strong>Live Translation</strong> for real-time ASL to text conversion, and <strong>Image Upload Mode</strong> for static sign recognition — all wrapped in a desktop GUI built with Tkinter and CustomTkinter.</p>
              <div className="sl-tech-label">Technologies Used</div>
              <div className="sl-tech-pills sl-stagger">
                {['Python','MediaPipe','scikit-learn','KNN','OpenCV','Tkinter','CustomTkinter','NumPy','pickle','Figma'].map(t => (
                  <span key={t} className="sl-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="sl-aside sl-reveal-r">
              {[
                ['Project Type', 'Desktop Application + ML System'],
                ['Focus Area', 'Computer Vision & ASL Recognition'],
                ['Sign Language', 'American Sign Language (ASL)'],
                ['Interface', 'Tkinter / CustomTkinter GUI'],
                ['Algorithm', 'K-Nearest Neighbours (KNN)'],
                ['Figma Design', 'Wireframes & High-Fidelity Mockups'],
              ].map(([k, v]) => (
                <div key={k} className="sl-aside-item">
                  <div className="sl-aside-k">{k}</div>
                  <div className="sl-aside-v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ────────────────────────────────────────────────────── */}
        <section className="sl-section sl-problem">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Why it exists</div>
            <h2 className="sl-sec-title">Problem & <em>Objectives</em></h2>
          </div>
          <div className="sl-two-col sl-stagger">
            <div className="sl-card">
              <div className="sl-eyebrow" style={{ marginBottom: 0 }}>The Problem</div>
              <p>Many people who rely on sign language face daily communication barriers with those who do not know it. This restricts participation in education, healthcare, and everyday life. Learning resources are also scarce and rarely interactive, making sign language feel overwhelming to new learners.</p>
            </div>
            <div className="sl-card">
              <div className="sl-eyebrow" style={{ marginBottom: 0 }}>Objectives</div>
              <ul className="sl-obj-list">
                {[
                  'Reduce communication barriers between sign language users and non-signers',
                  'Provide an interactive system for learning and practising ASL',
                  'Deliver real-time translation with confidence feedback',
                  'Simplify sign language and make it less intimidating',
                  'Promote social inclusion for people with hearing or speech disabilities',
                  'Support Learn Mode, Live Translation, and Image Upload Mode',
                ].map((item, i) => (
                  <li key={i}><span className="sl-obj-n">0{i + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── DATA & FEATURES ────────────────────────────────────────────── */}
        {/* <section className="sl-section sl-data-section" id="data">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Data & Feature Engineering</div>
            <h2 className="sl-sec-title">How the system <em>learns signs</em></h2>
          </div>
          <div className="sl-data-grid sl-stagger">
            {[
              ['📷', 'Custom Data Collection', 'Custom words ("Hello", "Mother", "Where", "Stop", "Calm Down") were captured via webcam — 50 recordings each. MediaPipe Hands detected 21 3D landmarks per frame, saved alongside images in labelled directories as compressed NumPy arrays.'],
              ['🗂️', 'Pre-existing ASL Dataset', 'An existing ASL image dataset was processed alongside custom data. Images were converted to RGB, left-hand frames were mirrored for right-hand consistency, and landmarks were normalised for scale uniformity across all samples.'],
              ['⚙️', 'Preprocessing Pipeline', 'All landmarks were normalised relative to the wrist for translation invariance, mirrored for orientation consistency, and scale-normalised using the wrist-to-index MCP distance. Rare classes were augmented with Gaussian noise.'],
              ['📐', 'Feature Engineering', 'The model uses flattened 3D landmark coordinates (x, y, z) as a one-dimensional feature vector — capturing hand pose structure without handcrafted features. The final dataset merged pre-existing and custom samples, balanced and augmented.'],
              ['🔀', 'Train/Test Split', 'The combined dataset was split 80/20 using stratified sampling to preserve class distribution. Class imbalance was mitigated through sample weighting and augmentation techniques.'],
              ['💾', 'Model Serialisation', 'The trained KNN model and metadata were serialised using Python\'s pickle module for seamless deployment into the Tkinter desktop GUI.'],
            ].map(([icon, name, desc]) => (
              <div key={name} className="sl-data-card">
                <div className="sl-data-icon">{icon}</div>
                <div className="sl-data-name">{name}</div>
                <p className="sl-data-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── PROCESS ────────────────────────────────────────────────────── */}
        <section className="sl-section sl-process">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Development Process</div>
            <h2 className="sl-sec-title sl-sec-title-light">From <em>wireframe</em> to real-time recognition</h2>
          </div>
          <div className="sl-proc-steps sl-stagger">
            {[
              ['01', 'Design & Wireframing', 'Lo-fi wireframes were built in Figma to map the GUI layout, navigation flow, and mode structures. High-fidelity mockups then defined the visual language — colour palette, typography, spacing, and component hierarchy — before a single line of code was written.'],
              ['02', 'Data Collection & Preprocessing', 'Custom ASL samples were captured via webcam using MediaPipe. Combined with a pre-existing dataset, all landmarks underwent normalisation, mirroring, and augmentation. This iterative phase solved the initial model\'s near-zero accuracy by identifying and correcting data imbalances.'],
              ['03', 'Model Training & GUI Integration', 'The KNN model was trained, evaluated, and serialised. It was then integrated into a Tkinter/CustomTkinter desktop interface with real-time hand tracking, confidence feedback, and all three interaction modes: Learn, Translate, and Image Upload.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="sl-proc-step">
                <div className="sl-proc-n">{n}</div>
                <div className="sl-proc-title">{title}</div>
                <p className="sl-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ────────────────────────────────────────────────────── */}
        <section className="sl-gallery" id="design">

          <div className="sl-gallery-block sl-reveal">
            <div className="sl-gallery-text">
              <h3>Low-Fidelity Wireframes</h3>
              <p>Built in Figma, these wireframes focused on GUI layout structure, screen navigation, and mode hierarchy — defining the core layout of Learn Mode, Live Translation, and Image Upload Mode before visual decisions were made.</p>
            </div>
            <div className="sl-gallery-img">
              <Img src={LowF} alt="Low Fidelity Wireframes" icon="✏️" label="Low-Fi Wireframes" />
            </div>
          </div>

          <div className="sl-gallery-block rev sl-reveal">
            <div className="sl-gallery-text">
              <h3>High-Fidelity Mockups</h3>
              <p>High-fidelity designs introduced the final colour scheme, consistent spacing, and polished component styles. The interface was designed to surface confidence scores and visual feedback clearly, reducing cognitive load during real-time signing practice.</p>
            </div>
            <div className="sl-gallery-img">
              <Img src={HighF} alt="High Fidelity Mockups" icon="🎨" label="High-Fi Mockups" />
            </div>
          </div>

          <div className="sl-gallery-block sl-reveal">
            <div className="sl-gallery-text">
              <h3>Image Preprocessing Steps</h3>
              <p>Raw hand images were converted to RGB, processed through MediaPipe to extract 21 3D landmarks, normalised relative to wrist position, mirrored for right-hand consistency, and scale-adjusted using the wrist-to-index MCP distance — producing rotation- and scale-invariant feature vectors.</p>
            </div>
            <div className="sl-gallery-img">
              <Img src={PreprocessImg} alt="Image Preprocessing Steps" icon="⚙️" label="Preprocessing Pipeline" />
            </div>
          </div>

          <div className="sl-gallery-block rev sl-reveal">
            <div className="sl-gallery-text">
              <h3>Sample Data</h3>
              <p>The dataset combined pre-existing ASL alphabet images with custom-captured word samples ("Hello", "Mother", "Where", "Stop", "Calm Down") — each recorded 50 times. Visualising the data distribution revealed class imbalances that were corrected through augmentation and sample weighting.</p>
            </div>
            <div className="sl-gallery-img">
              <Img src={SampleData1} alt="Sample Dataset" icon="🗂️" label="Sample Data1" />
              <Img src={SampleData2} alt="Sample Dataset" icon="🗂️" label="Sample Data2" />
              <Img src={SampleData3} alt="Sample Dataset" icon="🗂️" label="Sample Dat3" />

            </div>
          </div>

          <div className="sl-gallery-block sl-reveal">
            <div className="sl-gallery-text">
              <h3>System Flowchart</h3>
              <p>The flowchart maps the full pipeline from data collection through preprocessing, landmark extraction, model training, serialisation, and GUI deployment — showing how each stage feeds into the next to produce a live, real-time ASL recognition system.</p>
            </div>
            <div className="sl-gallery-img">
              <Img src={Flowchart} alt="System Flowchart" icon="🔀" label="Data Collection → Deployment" />
            </div>
          </div>

        </section>

        {/* ── MODEL ──────────────────────────────────────────────────────── */}
        <section className="sl-section sl-model-section" id="model">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Model Development</div>
            <h2 className="sl-sec-title">KNN — <em>simple, effective, precise</em></h2>
          </div>
          <div className="sl-model-grid sl-stagger">
            <div className="sl-model-card">
              <h4>Hyperparameters</h4>
              <ul className="sl-kv-list">
                <li><span className="sl-kv-k">Algorithm</span><span className="sl-kv-v">K-Nearest Neighbours</span></li>
                <li><span className="sl-kv-k">n_neighbors</span><span className="sl-kv-v">5</span></li>
                <li><span className="sl-kv-k">weights</span><span className="sl-kv-v">distance</span></li>
                <li><span className="sl-kv-k">metric</span><span className="sl-kv-v">euclidean</span></li>
                <li><span className="sl-kv-k">Train split</span><span className="sl-kv-v">80%</span></li>
                <li><span className="sl-kv-k">Test split</span><span className="sl-kv-v">20%</span></li>
                <li><span className="sl-kv-k">Sampling strategy</span><span className="sl-kv-v">Stratified</span></li>
              </ul>
            </div>
            <div className="sl-model-card" ref={barRef}>
              <h4>Model Performance</h4>
              {[
                ['Overall Accuracy', 100],
                ['Weighted F1-Score', 100],
                ['Macro-Average F1', 99],
              ].map(([label, pct]) => (
                <div key={label} className="sl-acc-bar-wrap">
                  <div className="sl-acc-bar-label">
                    <span>{label}</span>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: 'var(--royal)' }}>{pct}%</span>
                  </div>
                  <div className="sl-acc-bar-track">
                    <div className="sl-acc-bar-fill" style={{ width: barsVis ? `${pct}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="sl-model-card">
              <h4>Key Improvements Applied</h4>
              <ul className="sl-improvement-list">
                {[
                  'Landmark normalisation relative to wrist — reduces variation from hand position and size',
                  'Right-hand forcing — addresses camera mirroring effects on left-hand data',
                  'Gaussian noise augmentation for rare classes — improves balance and generalisation',
                  'Scale normalisation using wrist-to-index MCP distance — rotation invariance',
                ].map((item, i) => (
                  <li key={i}><span className="sl-imp-dot" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="sl-model-card">
              <h4>Before vs After</h4>
              <p style={{ marginBottom: 16 }}>The initial model achieved just 6% accuracy with a macro F1 of 0.05 — predicting almost everything as class "s". After applying preprocessing and augmentation improvements, performance reached near-perfect results across all classes.</p>
              <ul className="sl-kv-list">
                <li><span className="sl-kv-k">Initial accuracy</span><span className="sl-kv-v" style={{ color: '#e05' }}>6%</span></li>
                <li><span className="sl-kv-k">Initial macro F1</span><span className="sl-kv-v" style={{ color: '#e05' }}>0.05</span></li>
                <li><span className="sl-kv-k">Final accuracy</span><span className="sl-kv-v">~100%</span></li>
                <li><span className="sl-kv-k">Final macro F1</span><span className="sl-kv-v">0.99</span></li>
                <li><span className="sl-kv-k">Test samples</span><span className="sl-kv-v">16,957</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── RESULTS ────────────────────────────────────────────────────── */}
        <section className="sl-results" id="results">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Evaluation & Results</div>
            <h2 className="sl-sec-title sl-sec-title-light">Strong generalisation <em>across all classes</em></h2>
          </div>
          <div className="sl-results-grid sl-stagger">
            <div className="sl-res-card">
              <div className="sl-res-label">Overall Performance</div>
              <div className="sl-big-stat">~100%</div>
              <div className="sl-res-title">Test Accuracy on 16,957 Samples</div>
              <p className="sl-res-text">The weighted F1-score reached 1.00 across the full test set. The macro-average F1 of 0.99 demonstrates consistent performance even across classes with varying sample sizes.</p>
            </div>
            <div className="sl-res-card">
              <div className="sl-res-label">Confusion Matrix</div>
              <div className="sl-res-title">Near-Diagonal Predictions</div>
              <p className="sl-res-text">The normalised confusion matrix shows predictions concentrated along the diagonal. Minor errors occurred between visually similar signs: "1" vs "2", "2" vs "k"/"v", and "6" vs "w". Classes "7" and "9" showed recall values of 0.95 and 0.88 respectively — the only notable imperfections.</p>
            </div>
            <div className="sl-res-card">
              <div className="sl-res-label">Custom Words</div>
              <div className="sl-res-title">5 Custom Signs Recognised</div>
              <p className="sl-res-text">"Hello", "Mother", "Where", "Stop", and "Calm Down" were custom-collected with 50 recordings each — demonstrating the system's extensibility beyond the standard ASL alphabet to multi-sign vocabulary.</p>
            </div>
            <div className="sl-res-card">
              <div className="sl-res-label">Limitations & Future Work</div>
              <div className="sl-res-title">Static Signs Only — For Now</div>
              <p className="sl-res-text">The current system handles static hand poses. Future improvements include temporal gesture modelling for continuous signing, multi-user dataset expansion, broader vocabulary, and support for additional sign languages (Arabic, Urdu, French, Japanese).</p>
            </div>
          </div>
        </section>

        {/* ── VIDEO ──────────────────────────────────────────────────────── */}
        <section className="sl-video-section" id="video">
          <div className="sl-reveal">
            <div className="sl-eyebrow">Project Demo</div>
            <h2 className="sl-sec-title">See it <em>in action</em></h2>
          </div>
          <div className="sl-video-wrap sl-reveal-s">
            <iframe
              src="https://www.youtube.com/embed/7ab0d4Q9aNQ"
              title="Sign Language Learning System — Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="sl-video-caption">
            A full demonstration of the Sign Language Learning System — Learn Mode, Live Translation, and Image Upload.
          </p>
        </section>

        {/* ── OUTCOME ────────────────────────────────────────────────────── */}
        <section className="sl-outcome" id="outcome">
          <div className="sl-outcome-inner sl-reveal-s">
            <div className="sl-out-eyebrow">Final Outcome</div>
            <h2 className="sl-out-title">A real-time ASL system that makes sign language accessible and learnable for everyone</h2>
            <p className="sl-out-desc">From 6% to near-perfect accuracy — this project demonstrates how data preprocessing, thoughtful feature engineering, and iterative development can transform a failing model into a robust, production-ready recognition system.</p>
            <div className="sl-out-ctas">
              <a href="https://github.com/Sahar-AbdulQdir/SignLanguageLearningSystem" target="_blank" rel="noopener noreferrer" className="sl-btn-ice">
                <IconGithub /> GitHub Repository
              </a>
              <a href="https://youtu.be/7ab0d4Q9aNQ" target="_blank" rel="noopener noreferrer" className="sl-btn-border">
                <IconExternal /> Watch on YouTube
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <footer className="sl-footer">
          <div className="sl-footer-brand">Sign Language Learning System</div>
          <div className="sl-footer-text">Sahar Abdulqadir · 2026</div>
        </footer>
      </div>
    </>
  );
}