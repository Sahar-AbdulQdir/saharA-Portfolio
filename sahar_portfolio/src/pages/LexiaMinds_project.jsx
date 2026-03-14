import { useEffect, useState } from "react";
import HighF from "../assets/Images/lexHigh.png";
import LowF from "../assets/Images/lexLow.png";
import Layout from "../assets/Images/lexLay.png";
import LogoFavicon from "../assets/Images/LexIcon.png";
import LogoLex from "../assets/Images/LogoLex.png";
import diagram from "../assets/Images/lexdia.png";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  /* Base palette */
  --frosted-blue: #B8E7F3ff;
  --bubblegum-fizz: #F568CBff;
  --prussian-blue: #0E1F4Bff;
  --cornflower-blue: #6E9FEAff;
  --plum: rgb(255, 104, 232);
  --neon-ice: #59E7E7ff;

  /* Backgrounds */
  --bg: #f4fbff;
  --bg2: #e8f7fb;
  --white: #ffffff;

  /* Text */
  --ink: var(--prussian-blue);
  --ink-soft: #32406b;
  --ink-muted: #6b7a9a;

  /* Primary colors */
  --violet: var(--bubblegum-fizz);
  --violet-mid: var(--plum);
  --violet-lt: #ef80da;
  --violet-pale: #fdeefd;

  /* Secondary (blue) */
  --blue: var(--cornflower-blue);
  --blue-mid: var(--neon-ice);
  --blue-lt: var(--frosted-blue);
  --blue-pale: #eefcff;

  /* Gradients */
  --grad: linear-gradient(135deg, var(--bubblegum-fizz) 0%, var(--cornflower-blue) 100%);
  --grad-soft: linear-gradient(135deg, var(--frosted-blue) 0%, var(--neon-ice) 100%);

  /* Borders & shadow */
  --border: #d9eef6;
  --border-s: var(--cornflower-blue);
  --shadow: 0 20px 60px rgba(14,31,75,0.15);
}
  html { scroll-behavior: smooth; }
  body { 
  // font-family: 'Outfit', sans-serif; 
  background: var(--bg); color: var(--ink); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

  .lm-root {
    // font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--ink);
    overflow-x: hidden;
    position: relative;
  }
  .lm-root::after {
    content:''; position:fixed; inset:0; z-index:9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity:.6;
    pointer-events: none; 
  }

  /* PROGRESS */
  .lm-prog { position:fixed; top:0; left:0; height:3px; z-index:1000; background:var(--grad); transition:width .1s; box-shadow:0 0 14px rgba(124,58,237,.5); }

  /* BACK */
  .lm-back-btn {
    position:fixed; top:10px; left:28px; z-index:200;
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
  .lm-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:right; justify-content:right; padding:20px 60px; transition:all .4s; pointer-events:none; }
  .lm-nav.scrolled { background:rgba(245,243,255,.92); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); padding:14px 60px; pointer-events:all;  }
  .lm-nav-logo { display:flex; align-items:right; gap:10px; text-decoration:none; opacity:0; transition:opacity .3s; }
  .lm-nav.scrolled .lm-nav-logo { opacity:1; }
  .lm-nav-logo-icon { width:32px; height:32px; border-radius:8px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
  .lm-nav-logo-text { // font-family:'Cormorant Garamond',serif;
    font-size:1rem; font-weight:600; color:var(--ink); letter-spacing:-.02em; }
  .lm-nav-links { display:flex; align-items:right; gap:28px; list-style:none; }
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
  .lm-hero-title {
  //  font-family:'Cormorant Garamond',serif; 
   font-size:clamp(3.8rem,7vw,7rem); font-weight:300; line-height:.95; letter-spacing:-.04em; color:var(--ink); margin-bottom:28px; animation:lmFadeUp .8s .35s both; }
  .lm-grad-text { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-style:italic; }
  .lm-hero-desc { font-size:1rem; line-height:1.8; color:var(--ink-soft); font-weight:300; max-width:420px; margin-bottom:40px; animation:lmFadeUp .8s .5s both; }
  .lm-hero-ctas { display:flex; gap:14px; flex-wrap:wrap; animation:lmFadeUp .8s .65s both; }
  .lm-btn-grad { display:inline-flex; align-items:center; gap:9px; background:var(--grad); color:white; padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; box-shadow:0 6px 20px rgba(124,58,237,.3); }
  .lm-btn-grad:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(124,58,237,.45); }
  .lm-btn-ghost { display:inline-flex; align-items:center; gap:9px; background:white; color:var(--ink-soft); border:1.5px solid var(--border); padding:13px 26px; border-radius:100px; font-size:.83rem; font-weight:500; text-decoration:none; transition:all .3s; }
  .lm-btn-ghost:hover { border-color:var(--violet); color:var(--violet); transform:translateY(-2px); }

  /* HERO VISUAL */
  .lm-hero-visual { position:relative; z-index:1; animation:lmFadeIn 1s .8s both; display:flex; align-items:center; justify-content:center; }

  /* STATS */
  .lm-stats-strip { background:var(--ink); padding:44px 80px; display:grid; grid-template-columns:repeat(4,1fr); gap:40px; }
  .lm-stat { text-align:center; }
  .lm-stat-num { // font-family:'Cormorant Garamond',serif;
    font-size:3rem; font-weight:300; line-height:1; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:6px; letter-spacing:-.04em; }
  .lm-stat-label { font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:rgba(245,243,255,.4); }

  /* SECTIONS */
  .lm-section { padding:100px 80px; }
  .lm-eyebrow { font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:flex; align-items:center; gap:10px; margin-bottom:16px; }
  .lm-eyebrow::before { content:''; display:block; width:28px; height:2px; background:var(--grad); flex-shrink:0; }
  .lm-sec-title { 
  // font-family:'Cormorant Garamond',serif; 
  font-size:clamp(2rem,4vw,3.2rem); font-weight:300; letter-spacing:-.03em; line-height:1.1; color:var(--ink); }
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
  // .lm-logo-main { display:flex; align-items:center; gap:12px; padding:20px 28px; background:var(--grad-soft); border-radius:14px; border:1px solid var(--border); width:100%; }
  .lm-logo-icon-lg { width:48px; height:48px; border-radius:12px; background:var(--grad); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 6px 16px rgba(124,58,237,.3); }
  .lm-logo-wordmark { 
  // font-family:'Cormorant Garamond',serif;
   font-size:1.45rem; font-weight:600; color:var(--ink); letter-spacing:-.03em; line-height:1; }
  .lm-logo-wordmark span { display:block; font-size:.62rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-muted); margin-top:2px; 
  // font-family:'Outfit',sans-serif;
   }
  .lm-logo-icon-only { display:flex; gap:12px; align-items:center; }
  .lm-logo-sm { width:36px; height:36px; border-radius:9px; background:var(--grad); display:flex; align-items:center; justify-content:center; }
  .lm-logo-sm-inv { width:36px; height:36px; border-radius:9px; background:var(--ink); display:flex; align-items:center; justify-content:center; }
  .lm-palette { display:flex; flex-direction:column; gap:10px; }
  .lm-color-row { display:flex; gap:8px; }
  .lm-swatch { flex:1; height:140px; border-radius:10px; position:relative; overflow:hidden; transition:transform .2s; }
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
  .lm-obj-n { 
  // font-family:'Cormorant Garamond',serif;
   font-size:.8rem; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:600; flex-shrink:0; margin-top:2px; }

  /* PROCESS */
  .lm-process-section { background:var(--bg); }
  .lm-process-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:56px; border-radius:24px; overflow:hidden; border:2px solid var(--border); }
  .lm-proc-step { background:white; padding:48px 36px; transition:background .3s; }
  .lm-proc-step + .lm-proc-step { border-left:1px solid var(--border); }
  .lm-proc-step:hover { background:var(--grad-soft); }
  .lm-proc-n { 
  // font-family:'Cormorant Garamond',serif;
   font-size:4rem; font-weight:300; line-height:1; margin-bottom:18px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; opacity:.4; letter-spacing:-.04em; }
  .lm-proc-title {
  //  font-family:'Cormorant Garamond',serif;
    font-size:1.25rem; font-weight:400; color:var(--ink); margin-bottom:12px; letter-spacing:-.02em; }
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
  .lm-feat-name { 
  // font-family:'Cormorant Garamond',serif;
   font-size:1.05rem; font-weight:400; color:var(--ink); margin-bottom:8px; position:relative; z-index:1; }
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

.gallery-block{
  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap:50px;
  align-items:center;
}

.gallery-block.reverse{
  grid-template-columns: 1.2fr 1fr;
}

.gallery-block.reverse .gallery-text{
  order:2;
}

.gallery-block.reverse .gallery-image{
  order:1;
}

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

.gallery-image{
  width:100%;
  max-height:520px;
  overflow:hidden;
  border-radius:16px;
  box-shadow:0 20px 60px rgba(0,0,0,0.08);
}

.gallery-image img{
  width:100%;
  height:100%;
  object-fit:contain;
}

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

/* VIDEO */
.lm-video-section { background: white; padding: 100px 80px; }
.lm-video-wrapper {
  margin-top: 56px;
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid var(--border);
  box-shadow: 0 40px 80px rgba(124,58,237,.13), 0 8px 24px rgba(124,58,237,.07);
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--ink);
}
.lm-video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
.lm-video-caption {
  margin-top: 20px;
  text-align: center;
  font-size: .8rem;
  font-weight: 400;
  color: var(--ink-muted);
  letter-spacing: .03em;
}
@media(max-width:900px){
  .lm-video-section { padding: 70px 24px; }
}
  /* INSIGHTS */
  .lm-insights-section { background:var(--ink); padding:100px 80px; }
  .lm-insights-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:56px; }
  .lm-ins-card { border:1px solid rgba(245,243,255,.08); border-radius:20px; padding:40px; background:rgba(245,243,255,.03); transition:all .3s; }
  .lm-ins-card:hover { background:rgba(245,243,255,.06); border-color:rgba(124,58,237,.3); }
  .lm-ins-label { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:flex; align-items:center; gap:8px; margin-bottom:18px; }
  .lm-ins-label::before { content:''; display:block; width:20px; height:1.5px; background:var(--grad); }
  .lm-ins-title { 
  // font-family:'Cormorant Garamond',serif;
   font-size:1.4rem; font-weight:300; color:rgba(245,243,255,.9); margin-bottom:14px; letter-spacing:-.02em; line-height:1.2; }
  .lm-ins-text { font-size:.9rem; line-height:1.8; color:rgba(245,243,255,.5); font-weight:300; }

  /* AUDIENCE */
  .lm-audience-section { background:white; }
  .lm-aud-grid { display:grid; grid-template-columns:4fr 5fr; gap:64px; align-items:start; margin-top:56px; }
  .lm-quote-card { background:var(--grad-soft); border:1px solid var(--border); border-radius:20px; padding:40px; }
  .lm-quote-mark { 
  // font-family:'Cormorant Garamond',serif; 
  font-size:5rem; font-weight:300; line-height:.7; margin-bottom:12px; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lm-quote-text { 
  // font-family:'Cormorant Garamond',serif; 
  font-size:1.1rem; font-style:italic; line-height:1.7; color:var(--ink-soft); font-weight:300; }
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
  .lm-out-title { 
  // font-family:'Cormorant Garamond',serif;
   font-size:clamp(2rem,4vw,3.2rem); font-weight:300; line-height:1.15; letter-spacing:-.03em; color:white; max-width:620px; margin:0 auto 22px; position:relative; z-index:1; }
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
  .lm-footer-logo-word { 
  // font-family:'Cormorant Garamond',serif;
   font-size:1rem; font-weight:600; color:rgba(245,243,255,.9); letter-spacing:-.02em; }
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
  .lm-proto-bar-logo{
  // font-family:'Cormorant Garamond',serif;
  font-size:.8rem;font-weight:600;color:white}
  .lm-proto-bar-nav{display:flex;gap:8px}
  .lm-proto-nav-pill{width:28px;height:5px;border-radius:3px;background:rgba(255,255,255,.4)}
  .lm-proto-body{padding:14px}
  .lm-proto-hero{background:var(--grad-soft);border-radius:10px;padding:16px;text-align:center;margin-bottom:12px}
  .lm-proto-badge{display:inline-block;background:white;border-radius:100px;padding:2px 10px;font-size:.5rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--violet);margin-bottom:8px}
  .lm-proto-title{
  // font-family:'Cormorant Garamond',serif;
  font-size:1.1rem;font-weight:300;color:var(--ink);margin-bottom:6px}
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
  .lm-dark-logo{
  // font-family:'Cormorant Garamond',serif;
  font-size:.75rem;font-weight:600;color:rgba(255,255,255,.9)}
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
    // .lm-hero-visual{display:none}
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

  /* LAPTOP MOCKUP */
.lm-laptop {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 560px;
  animation: lmFloatMock 7s ease-in-out infinite;
}

.lm-laptop__screen {
  position: relative;
  z-index: 1;
  padding: 1%;
  border-radius: 1.4rem;
  background-image: linear-gradient(to bottom, #333, #111);
  box-shadow: 0 0.1rem 0 #cfcfcf;
  border: 2px solid #ccc;
  aspect-ratio: 13 / 10;
  overflow: hidden;
}

.lm-laptop__bottom {
  position: relative;
  z-index: 1;
  margin: 0 -7%;
  height: 0.7rem;
  background-image: linear-gradient(
    to right,
    #d2dde9 0%, #f9fcff 15%, #e5ebf2 40%,
    #e5ebf2 60%, #f9fcff 85%, #d2dde9 100%
  );
}

.lm-laptop__bottom::before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 20%;
  height: 0.7rem;
  border-radius: 0 0 0.2rem 0.2rem;
  background-image: linear-gradient(
    to right,
    #c3cfdb 0%, #f6f9fc 10%, #f6f9fc 90%, #c3cfdb 100%
  );
}

.lm-laptop__under {
  position: absolute;
  top: 100%;
  left: 25%;
  width: 50%;
  height: 1.5rem;
  background-image: linear-gradient(to bottom, #e2e8f0, #bec7d1);
}

.lm-laptop__under::before,
.lm-laptop__under::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 50%;
  background: inherit;
}

.lm-laptop__under::before {
  right: 100%;
  border-bottom-left-radius: 100%;
}

.lm-laptop__under::after {
  left: 100%;
  border-bottom-right-radius: 100%;
}

.lm-laptop__shadow {
  position: absolute;
  left: -10%; right: -10%;
  bottom: -2.5rem;
  height: 2rem;
  background: radial-gradient(ellipse closest-side, #000, transparent);
  opacity: 0.4;
}

  .lm-nav-links li:last-child a  {background:#000 !important; color:#fff !important; border-radius:6px; padding:6px 12px; }

  
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
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
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
        <a href="/Home" className="lm-back-btn" onClick={e => { e.preventDefault(); window.history.back(); }}>
          <IconBack /> Back
        </a>

        {/* Nav */}
        <nav className={`lm-nav${scrolled ? ' scrolled' : ''}`}>
          {/* <a href="#" className="lm-nav-logo"> */}
  
            {/* <span className="lm-nav-logo-text">Lexia Minds</span> */}
          {/* </a> */}
          <ul className="lm-nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#wireframes">Process</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#outcome">Outcome</a></li>
            <li><a href="#video">Video</a></li>
          </ul>
        </nav>

        {/* Hero */}
        <section className="lm-hero" id="hero">
          <div className="lm-hero-blob1" />
          <div className="lm-hero-blob2" />
          <div className="lm-hero-content">
            <div className="lm-hero-tag"><span className="lm-hero-tag-dot" />Web Platform · Dyslexia Accessibility</div>
            <h1 className="lm-hero-title">Lexia<br /><span className="lm-grad-text">Minds</span></h1>
            <p className="lm-hero-desc">An accessible digital platform designed to support individuals with dyslexia through audio-based learning, customisable reading tools, and a user-centred design that reduces reading anxiety and builds confidence.</p>
            <div className="lm-hero-ctas">
              <a href="https://lexiaminds.vercel.app/" target="_blank" rel="noopener noreferrer" className="lm-btn-grad"><IconExternal />Live Website</a>
              <a href="https://github.com/Sahar-AbdulQdir/brightminds" className="lm-btn-ghost"><IconGithub />GitHub</a>
            </div>
          </div>
          {/* Hero Visual */}
          <div className="lm-hero-visual">
            <div className="lm-laptop">
              <div className="lm-laptop__screen">
      <video
        src={`${process.env.PUBLIC_URL}/lexV.mp4`}
        title="Lexia Minds Preview"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '0.6rem',
          display: 'block',
        }}
      />
              </div>
              <div className="lm-laptop__bottom">
                <div className="lm-laptop__under" />
              </div>
              <div className="lm-laptop__shadow" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="lm-stats-strip lm-stagger">
          {[['8+','Accessibility Features'],['3','Design Phases'],['100%','Responsive'],['React','Tech Stack']].map(([num, label], i) => (
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
              <h2 className="lm-sec-title">A supportive space for <em>dyslexic readers</em></h2>
              <p>Lexia Minds is a specialised web platform built to serve individuals with dyslexia, offering an easy-to-access, supportive, and engaging online space tailored to their needs. The platform combines audio-based learning — including text-to-speech, speech-to-text, audiobooks, and podcasts — with customisable reading settings, interactive content, and personalised recommendations.</p>
              <p>Every design and development decision was informed by research into dyslexic user preferences, accessibility best practices (WCAG 2.1), and the emotional barriers dyslexic readers often face — from anxiety to low confidence. The result is a platform that doesn't just improve readability, but positively shapes how users feel about learning.</p>
              <div className="lm-tech-label">Technologies Used</div>
              <div className="lm-tech-pills lm-stagger">
                {['React.js','Node.js','Express.js','MongoDB','Tailwind CSS','Bootstrap','Axios','SpeechRecognition API','SpeechSynthesis API','ListenNotes API','Render','Vercel'].map(t => (
                  <span key={t} className="lm-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="lm-aside-card lm-reveal-r">
              {[
                ['Project Type','Accessibility Web Platform'],
                ['Focus Area','Dyslexia Support & Inclusive Design'],
                ['Target Users','Dyslexic individuals, educators & caregivers'],
                ['Platform','Web (Fully Responsive)'],
                ['Deployment','Vercel (frontend) + Render (backend)'],
              ].map(([k, v]) => (
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
           <div className="lm-logo-display">
  {/* Full logo */}
  <div className="lm-logo-main" style={{ justifyContent: 'center' }}>
    <img src={LogoLex} alt="Lexia Minds Logo" style={{ maxWidth: '160px', objectFit: 'contain' }} />
  </div>

  {/* Icon variants */}
  <div className="lm-logo-icon-only">
    <img src={LogoFavicon} alt="Lexia Minds Icon" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
    {/* Dark background version — wrap in a dark pill if needed */}
    <div style={{ background: 'var(--ink)', borderRadius: '9px', padding: '6px', display: 'flex', alignItems: 'center' }}>
      <img src={LogoFavicon} alt="Lexia Minds Icon Dark" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
    </div>
  </div>
</div>
                <div className="lm-logo-icon-only">
                  <div style={{ color: '#000000', display: 'flex', alignItems: 'center', padding: '6px 16px', borderRadius: '10px'}}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '.85rem', fontWeight: 500, color: '#000000', letterSpacing: '-.02em' }}>
                     <em style={{ fontStyle:'normal', WebkitBackgroundClip: 'text', WebkitTextFillColor: '#000000', backgroundClip: 'text', color : '#000000' }}>

 The logo was designed to be memorable and meaningful. It represents two slightly offset halves of a brain, symbolizing the different ways dyslexic minds process information.

The primary logo appears in black for clarity and consistency across the website, while the favicon uses a colored version from the brand palette to stand out at smaller sizes. The chosen typeface prioritizes readability, and the overall system is designed to remain clear, flexible, and recognizable across both digital and print media. 
</em>
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
                  <div className="lm-swatch" style={{ background: 'linear-gradient(135deg,#EDB9DCff,#C6F2FFff)', flex: 2 }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>Primary Gradient</span></div>
                  <div className="lm-swatch" style={{ background: '#D2ACE8ff' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>#D2ACE8ff</span></div>
                  <div className="lm-swatch" style={{ background: '#EDB9DCff' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.8)' }}>#EDB9DCff</span></div>
                </div>
                <div className="lm-color-row">
                  <div className="lm-swatch" style={{ background: '#B5A6E9ff' }}><span className="lm-swatch-label" style={{ color: 'var(--ink)' }}>#B5A6E9ff</span></div>
                  <div className="lm-swatch" style={{ background: '#FEFCFEff' }}><span className="lm-swatch-label" style={{ color: 'var(--ink-soft)' }}>#FEFCFEff</span></div>
                  <div className="lm-swatch" style={{ background: '#C6F2FFff' }}><span className="lm-swatch-label" style={{ color: 'var(--ink-soft)' }}>#C6F2FFff</span></div>
                  <div className="lm-swatch" style={{ background: '#E4BCE4ff' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.7)' }}>#E4BCE4ff</span></div>
                  <div className="lm-swatch" style={{ background: '#2D1F4Aff' }}><span className="lm-swatch-label" style={{ color: 'rgba(255,255,255,.7)' }}>#2D1F4Aff</span></div>

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
                  <div className="lm-typo-name">Default — Arial (dyslexia-friendly)</div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '.95rem', fontWeight: 300, lineHeight: 1.7, color: 'var(--ink-soft)' }}>Clear, non-cursive, and research-backed for readability.</div>
                </div>
                <div className="lm-typo-row">
                  <div className="lm-typo-name">Label — Outfit Semibold</div>
                  <div style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Accessibility · Inclusive Design</div>
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
              <p>Individuals with dyslexia often face reading fatigue, anxiety, and poor text readability across standard digital platforms. While some tools exist online, they are scattered across different services — forcing users to juggle multiple apps. There is a clear need for a single, unified platform that combines audio support, customisable text settings, and emotionally supportive design in one accessible place.</p>
            </div>
            <div className="lm-content-card">
              <div className="lm-eyebrow" style={{ marginBottom: 0 }}>Objectives</div>
              <ul className="lm-obj-list">
                {[
                  'Provide text-to-speech and speech-to-text tools in a single platform',
                  'Allow users to customise font, line spacing, and letter spacing',
                  'Offer audiobooks, podcasts, and personalised content recommendations',
                  'Reduce cognitive load through clear layouts and minimal animations',
                  'Support sign-up, login, and bookmarking for a personalised experience',
                  'Meet WCAG 2.1 accessibility standards throughout',
                ].map((item, i) => (
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
            <h2 className="lm-sec-title">From research to <em>experience</em></h2>
          </div>
          <div className="lm-process-strip lm-stagger">
            {[
              ['01','Research & Wireframing','Preliminary research explored dyslexia-friendly design practices, accessibility guidelines, and user needs. Low-fidelity wireframes were built in Figma to map out page structures, navigation, and layout patterns before any visual decisions were made.'],
              ['02','High-Fidelity Mockups','Pixel-accurate mockups defined the final visual language — high-contrast colour palette, Arial as the default dyslexia-friendly font, consistent layouts, and minimal animations. The logo was designed to depict two offset brain halves, representing how dyslexic minds process information differently.'],
              ['03','Build & Deployment','The full-stack application was built with React.js (Vite), Node.js, Express, and MongoDB. Features including speech-to-text, text-to-speech, saved items, and authentication were developed iteratively. The platform was privately tested on Render before final deployment to Vercel.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="lm-proc-step">
                <div className="lm-proc-n">{n}</div>
                <div className="lm-proc-title">{title}</div>
                <p className="lm-proc-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="project-gallery">

          {/* LO-FI */}
          <div className="gallery-block">
            <div className="gallery-text">
              <h3>Low-Fidelity Wireframes</h3>
              <p>
                Built in Figma, these wireframes focused on structure, navigation flow, and layout hierarchy — using large shapes, minimal text, and clear visual blocks. Key layouts include Z-shape, cards, split-screen, and masonry to accommodate different content types across the platform.
              </p>
            </div>
            <div className="gallery-image">
              <img src={LowF} alt="Low Fidelity Wireframes" />
            </div>
          </div>

          {/* HI-FI */}
          <div className="gallery-block reverse">
            <div className="gallery-text">
              <h3>High-Fidelity Mockups</h3>
              <p>
                The high-fidelity designs introduced the final colour scheme, Arial typography, consistent spacing, and dyslexia-friendly layouts. High-contrast colours were chosen to maximise visibility, while animations and visual noise were deliberately kept minimal to reduce cognitive overload.
              </p>
            </div>
            <div className="gallery-image">
              <img src={HighF} alt="High Fidelity Design" />
            </div>
          </div>

          {/* DATABASE */}
          <div className="gallery-block">
           <div className="gallery-text">
  <h3>Layout System</h3>
  <p>
    The website uses a variety of layout structures to create a visually engaging and organised experience. A featured image or video layout is used in key sections to highlight important content. The overall page flow follows a Z-shape (zig-zag) layout to guide the user’s eye naturally across the screen. Content is frequently organised using card layouts for clear grouping of articles, games, and podcasts. Asymmetrical and masonry layouts are used in some sections to add visual interest and break uniformity, while split-screen layouts help present contrasting or complementary information side by side. Block layouts are also used to structure sections clearly and maintain consistency across the site.
  </p>
</div>
            <div className="gallery-image">
              <img src={Layout} alt="Database Architecture" />
            </div>
          </div>

{/* diagram */}

            <div className="gallery-block reverse">
            <div className="gallery-text">
  <h3>Navigation System</h3>
  <p>The navigation diagram illustrates the structure of the website and how users move between different pages. It maps the relationships between the main sections and shows the possible user journeys through the interface.
  </p>
</div>

          <div className="gallery-image">
            <img src={diagram} alt="Diagram" />
          </div>
          </div>
        </section>

        {/* Project Video */}
        <section className="lm-video-section" id="video">
          <div className="lm-reveal">
            <div className="lm-eyebrow">Project Walkthrough</div>
            <h2 className="lm-sec-title">See it <em>in action</em></h2>
          </div>
          <div className="lm-video-wrapper lm-reveal-s">
            <iframe
              src="https://www.youtube.com/embed/W4DtHYvifG0?si=zv21SSgDWkiLTK_Z"
              title="Lexia Minds — Project Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="lm-video-caption">
            A full walkthrough of the Lexia Minds platform — features, accessibility tools, and live interactions.
          </p>
        </section>

        {/* Outcome */}
        <section className="lm-outcome-section" id="outcome">
          <div className="lm-outcome-inner lm-reveal-s">
            <div className="lm-out-eyebrow">Final Outcome</div>
            <h2 className="lm-out-title">A fully functional accessibility platform that makes reading less stressful and more empowering</h2>
            <p className="lm-out-desc">Lexia Minds brings together audio learning, customisable reading tools, and personalised content in a single, inclusive platform — helping dyslexic users build confidence and engage with information on their own terms.</p>
            <div className="lm-out-ctas">
              <a href="https://lexiaminds.vercel.app/" target="_blank" rel="noopener noreferrer" className="lm-btn-white"><IconExternal />View Live Site</a>
              <a href="https://github.com/Sahar-AbdulQdir/brightminds" className="lm-btn-outline-white"><IconGithub />GitHub Repository</a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}