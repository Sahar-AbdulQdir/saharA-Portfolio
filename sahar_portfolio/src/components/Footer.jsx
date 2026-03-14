import { useEffect, useRef, useState } from "react";
import b1 from "../assets/Images/b5.jpg";
import b2 from "../assets/Images/b6.jpg";
import emailjs from '@emailjs/browser';
import linkedinVid from "../assets/Videos/linkedin-preview.mp4";
import githubVid from "../assets/Videos/github-preview.mp4";
import resumeVid from "../assets/Videos/resume-preview.mp4";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #f0ede6;
    --yellow: #f568cb;
    --green: #0E1F4B;
    --dark-green: #78b8f8;
    --maroon: #6e9fea;
    --pink: #e393d7;
    --cyan: #59e7e7;
    --black: #1a1a1a;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
  }

  .footer-root {
    position: relative;
    padding: 4rem 3rem 3rem;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 4rem;
  }

  /* ── MOBILE ── */
  @media (max-width: 799px) {
    .footer-root {
      padding: 3rem 1.25rem 2rem;
      min-height: auto;
      margin-top: 2rem;
    }
  }

  .footer-eyebrow {
    font-family: 'Syne', sans-serif;
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .footer-root.in-view .footer-eyebrow {
    opacity: 1;
    transform: translateY(0);
  }

  /* ────────────────────────────────────────────
     PILL ARENA — desktop layout
  ──────────────────────────────────────────── */
  .pill-arena {
    position: relative;
    width: 100%;
    min-height: 520px;
    margin-top: -2rem;
  }

  .pill {
    position: absolute;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transform: translateY(-120vh) rotate(var(--rot-start));
    opacity: 0;
    transition: transform 0s, opacity 0s, box-shadow 0.3s ease, filter 0.3s ease;
    will-change: transform;
  }

  .pill.landed {
    opacity: 1;
    transform: translateY(0) rotate(var(--rot-end));
    transition:
      transform var(--fall-dur) cubic-bezier(0.22, 1.2, 0.36, 1) var(--fall-delay),
      opacity 0.01s var(--fall-delay),
      box-shadow 0.3s ease,
      filter 0.3s ease;
  }

  .pill:hover {
    filter: brightness(1.08) saturate(1.1);
    box-shadow: 0 18px 50px rgba(0,0,0,0.18);
    z-index: 10;
    transform: translateY(var(--hover-y, -6px)) rotate(var(--rot-end)) scale(1.03) !important;
    transition:
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.3s ease,
      filter 0.3s ease !important;
  }

  .pill span {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    white-space: nowrap;
    line-height: 1;
  }

  /* Desktop pill positions */
  .pill-say-hi {
    --fall-dur: 0.75s;
    --fall-delay: 0.2s;
    background: var(--yellow);
    color: var(--black);
    width: clamp(100px, 14vw, 160px);
    height: clamp(180px, 28vw, 300px);
    top: 150px;
    left: 21%;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform-origin: center;
  }
  .pill-say-hi span {
    font-size: clamp(1.2rem, 3vw, 2.4rem);
    transform: rotate(180deg);
  }

  .pill-reach-out {
    --fall-dur: 0.85s;
    --fall-delay: 0.35s;
    background: var(--green);
    color: var(--dark-green);
    width: clamp(220px, 38vw, 500px);
    height: clamp(60px, 9vw, 100px);
    top: 140px;
    left: 40%;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  }
  .pill-reach-out span { font-size: clamp(1.3rem, 3.2vw, 3rem); }

  .pill-chat {
    --fall-dur: 0.8s;
    --fall-delay: 0.5s;
    background: var(--maroon);
    color: #fff;
    width: clamp(240px, 42vw, 560px);
    height: clamp(65px, 9.5vw, 105px);
    top: 240px;
    left: 35%;
    box-shadow: 0 8px 30px rgba(122,31,46,0.25);
  }
  .pill-chat span { font-size: clamp(1.4rem, 3.5vw, 3.2rem); }

  .pill-message {
    --fall-dur: 0.9s;
    --fall-delay: 0.65s;
    background: var(--pink);
    color: #ffe5ed;
    width: clamp(260px, 55vw, 720px);
    height: clamp(70px, 10vw, 115px);
    top: 345px;
    font-size: clamp(4.4rem, 3.8vw, 3.5rem);
    left: 35%;
    box-shadow: 0 8px 30px rgba(214,63,110,0.3);
  }
  .pill-message span { font-size: clamp(1.4rem, 3.8vw, 3.5rem) !important; }

  /* ────────────────────────────────────────────
     PILL ARENA — mobile layout (< 800px)
     Switch from absolute free-layout to a
     stacked flex column so nothing overlaps.
  ──────────────────────────────────────────── */
  @media (max-width: 799px) {
    .pill-arena {
      position: static;
      min-height: auto;
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      padding-bottom: 1rem;
    }

    /* Reset absolute positioning for ALL pills & circles */
    .pill,
    .circle {
      position: static !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
    }

    /* Reset transforms so "landed" still fires the fall correctly */
    .pill {
      transform: translateY(-120vh) rotate(var(--rot-start, 0deg));
    }
    .pill.landed {
      transform: translateY(0) rotate(var(--rot-end, 0deg));
    }

    /* pill-say-hi: switch to horizontal on mobile */
    .pill-say-hi {
      writing-mode: horizontal-tb;
      text-orientation: mixed;
      width: auto !important;
      height: clamp(50px, 14vw, 70px) !important;
      padding: 0 1.6rem;
      align-self: flex-start;
    }
    .pill-say-hi span {
      transform: none !important;
      font-size: clamp(1.1rem, 5vw, 1.6rem);
    }

    .pill-reach-out {
      width: 100% !important;
      height: clamp(56px, 15vw, 72px) !important;
    }
    .pill-reach-out span { font-size: clamp(1.3rem, 6vw, 2rem) !important; }

    .pill-chat {
      width: 100% !important;
      height: clamp(56px, 15vw, 72px) !important;
    }
    .pill-chat span { font-size: clamp(1.3rem, 6vw, 2rem) !important; }

    .pill-message {
      width: 100% !important;
      height: clamp(56px, 15vw, 72px) !important;
    }
    .pill-message span { font-size: clamp(1.3rem, 6vw, 2rem) !important; }

    /* Circles: row at the bottom of pill-arena */
    .pill-arena .circle-row {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-self: flex-start;
      margin-top: 0.25rem;
    }

    .circle {
      transform: translateY(-120vh);
    }
    .circle.landed {
      transform: translateY(0) scale(1);
    }

    .circle-chat,
    .circle-email {
      width: clamp(72px, 18vw, 100px) !important;
      height: clamp(72px, 18vw, 100px) !important;
    }
  }

  /* ── CIRCLE BASE ── */
  .circle {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-120vh);
    opacity: 0;
    transition: transform 0s, opacity 0s;
    cursor: pointer;
    overflow: hidden;
    will-change: transform;
  }

  .circle.landed {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition:
      transform var(--fall-dur) cubic-bezier(0.22, 1.2, 0.36, 1) var(--fall-delay),
      opacity 0.01s var(--fall-delay),
      box-shadow 0.3s ease,
      filter 0.3s ease;
  }

  .circle:hover {
    filter: brightness(1.1);
    box-shadow: 0 16px 40px rgba(0,0,0,0.2);
    transform: translateY(-8px) scale(1.05) !important;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s, filter 0.3s !important;
  }

  .circle-chat {
    --fall-dur: 0.7s;
    --fall-delay: 0.15s;
    width: clamp(150px, 15vw, 220px);
    height: clamp(150px, 15vw, 220px);
    background: var(--black);
    top: 300px;
    left: 4%;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    z-index: 6;
  }

  .circle-chat::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%);
    border-radius: 50%;
    transform: rotate(13deg);
  }

  .circle-chat svg {
    position: relative;
    z-index: 2;
    width: 42%;
    height: 42%;
    transform: rotate(-14deg);
  }

  .circle-email {
    --fall-dur: 0.72s;
    --fall-delay: 0.55s;
    width: clamp(150px, 15vw, 220px);
    height: clamp(150px, 15vw, 220px);
    background: var(--cyan);
    top: 150px;
    right: 2%;
    box-shadow: 0 8px 30px rgba(110,216,216,0.3);
    text-decoration: none;
  }

  .circle-email svg {
    width: 48%;
    height: 48%;
    transform: rotate(10deg);
  }

  /* ── FOOTER BOTTOM ── */
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: -1rem;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-top: 1.25rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease 1.2s, transform 0.7s ease 1.2s;
  }

  .footer-root.in-view .footer-bottom {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 799px) {
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .footer-copy {
      align-self: flex-start;
    }
  }

  .footer-brand {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    font-weight: 800;
    color: var(--black);
    letter-spacing: -1px;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    flex-wrap: wrap;
  }

  @media (max-width: 799px) {
    .footer-links { gap: 1.2rem; }
  }

  .footer-links a {
    text-decoration: none;
    color: #888;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: var(--black); }

  .footer-copy {
    font-size: 0.8rem;
    color: #aaa;
  }

  /* ── LOCATION / TIME TAGS ── */
  .location-tag {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    // font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--dark-green);
    letter-spacing: 0.05em;
    opacity: 0;
    transition: opacity 0.6s ease 0.1s;
  }

  .footer-root.in-view .location-tag { opacity: 1; }

  .time-tag {
    position: absolute;
    top: 1.5rem;
    right: 3rem;
    // font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--dark-green);
    opacity: 0;
    transition: opacity 0.6s ease 0.1s;
  }

  .footer-root.in-view .time-tag { opacity: 1; }

  @media (max-width: 799px) {
    .location-tag { left: 1.25rem; font-size: 0.72rem; }
    .time-tag     { right: 1.25rem; font-size: 0.72rem; }
  }

  /* ── PARTICLES ── */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    animation: floatUp var(--dur) ease-in-out var(--delay) infinite;
  }

  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(0) scale(0.8); }
    20%  { opacity: 0.6; }
    80%  { opacity: 0.3; }
    100% { opacity: 0; transform: translateY(-80px) scale(1.1); }
  }

  /* ── WIGGLE ANIMATIONS ── */
  @keyframes wiggle {
    0%   { transform: translateY(0) rotate(var(--rot-end)); }
    20%  { transform: translateY(-10px) rotate(calc(var(--rot-end) + 3deg)); }
    40%  { transform: translateY(4px) rotate(calc(var(--rot-end) - 2deg)); }
    60%  { transform: translateY(-5px) rotate(calc(var(--rot-end) + 1deg)); }
    80%  { transform: translateY(2px) rotate(var(--rot-end)); }
    100% { transform: translateY(0) rotate(var(--rot-end)); }
  }

  .pill.bounce {
    animation: wiggle 0.5s ease forwards;
  }

  @keyframes circleWiggle {
    0%   { transform: translateY(0) scale(1); }
    25%  { transform: translateY(-10px) scale(1.04); }
    50%  { transform: translateY(4px) scale(0.97); }
    75%  { transform: translateY(-4px) scale(1.01); }
    100% { transform: translateY(0) scale(1); }
  }

  .circle.bounce {
    animation: circleWiggle 0.5s ease forwards;
  }

  /* ── MODAL OVERLAY ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .modal-overlay.open {
    pointer-events: all;
    opacity: 1;
  }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 20, 0.55);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* ── MODAL CARD ── */
  .modal-card {
    position: relative;
    z-index: 1;
    background: #0e1520;
    border: 1px solid rgba(120, 184, 248, 0.15);
    border-radius: 28px;
    padding: 2.8rem 3rem;
    width: 100%;
    max-width: 540px;
    box-shadow:
      0 40px 120px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.04) inset;
    transform: translateY(40px) scale(0.94);
    opacity: 0;
    transition:
      transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 0.35s ease;
  }

  .modal-overlay.open .modal-card {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  @media (max-width: 799px) {
    .modal-card {
      padding: 2rem 1.5rem;
      border-radius: 20px;
      max-height: 90vh;
      overflow-y: auto;
    }
  }

  .modal-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f568cb, #78b8f8, transparent);
    border-radius: 9999px;
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .modal-title {
    // font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #f0ede6;
    line-height: 1.1;
  }

  .modal-title span {
    display: block;
    background: linear-gradient(90deg, #f568cb, #78b8f8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .modal-close {
    background: rgba(255,255,255,0.07);
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #aaa;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-left: 1rem;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }

  .modal-close:hover {
    background: rgba(255,255,255,0.14);
    color: #fff;
    transform: rotate(90deg);
  }

  /* ── FORM ── */
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #ffffff'
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 799px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-field label {
    // font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #78b8f8;
  }

  .form-field input,
  .form-field select,
  .form-field textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    color: #000000;
    // font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
  }

  .form-field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378b8f8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    cursor: pointer;
  }

  .form-field select option {
    background: #0e1520;
    color: #f0ede6;
  }

  .form-field input::placeholder,
  .form-field textarea::placeholder { color: rgba(240,237,230,0.25); }

  .form-field input:focus,
  .form-field select:focus,
  .form-field textarea:focus {
    border-color: rgba(245, 104, 203, 0.6);
    background: rgba(245,104,203,0.06);
    box-shadow: 0 0 0 3px rgba(245,104,203,0.12);
  }

  .form-field textarea {
    resize: none;
    min-height: 90px;
    line-height: 1.5;
  }

  .modal-submit {
    margin-top: 0.5rem;
    background: linear-gradient(135deg, #f568cb, #6e9fea);
    border: none;
    border-radius: 9999px;
    padding: 1rem 2.4rem;
    color: #fff;
    // font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    cursor: pointer;
    width: 100%;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
    box-shadow: 0 8px 30px rgba(245,104,203,0.35);
  }

  .modal-submit:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 14px 40px rgba(245,104,203,0.5);
  }

  .modal-submit:active { transform: scale(0.97); }

  .modal-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* ── SUCCESS STATE ── */
  .modal-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 0 1rem;
    gap: 1.2rem;
    animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }

  .success-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f568cb22, #78b8f822);
    border: 2px solid #f568cb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .success-title {
    // font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #f0ede6;
  }

  .success-sub {
    font-size: 0.9rem;
    color: #88a;
    line-height: 1.5;
    max-width: 280px;
  }

  /* ── LINK PREVIEW ── */
.footer-links li {
  position: relative;
}

.link-preview {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) translateY(8px) scale(0.92);
  width: 220px;
  height: 140px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.45),
    0 0 0 1px rgba(255,255,255,0.08);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
  z-index: 100;
  background: #0e1520;
}

.footer-links li:hover .link-preview {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  pointer-events: none;

  border-radius: 18px;

  /* glass border */
  border: 10px solid rgba(255, 255, 255, 0.25);

  /* glass effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  background: rgba(255, 255, 255, 0.08);

  box-shadow:
    0 8px 30px rgba(0,0,0,0.25),
    inset 0 1px 1px rgba(255,255,255,0.4);
}

.link-preview::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #1a1e2e;
  // border-right: 5px solid rgb(255, 17, 172);
  // border-bottom: 5px solid hsl(307, 94%, 51%);
  rotate: 45deg;
  z-index: 2;
}

.link-preview iframe {
  width: 900px;
  height: 600px;
  border: none;
  transform: scale(0.244);
  transform-origin: top left;
  pointer-events: none;
  border-radius: 0;
}

.link-preview-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem 0.7rem;
  background: linear-gradient(to top, rgba(14,21,32,0.95), transparent);
  // font-family: 'Syne', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #78b8f8;
  text-transform: uppercase;
}

.link-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
`;

const particleColors = ['#d9e84a', '#b8d4a0', '#d63f6e', '#6ed8d8', '#7a1f2e'];

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const size = 4 + Math.random() * 8;
    return {
      id: i,
      size,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      left: `${Math.random() * 100}%`,
      bottom: `${10 + Math.random() * 60}%`,
      dur: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
    };
  });

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.left,
            bottom: p.bottom,
            '--dur': p.dur,
            '--delay': p.delay,
          }}
        />
      ))}
    </div>
  );
}

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useBounce() {
  const triggerBounce = (el) => {
    if (!el) return;
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
    setTimeout(() => el.classList.remove('bounce'), 600);
  };
  return triggerBounce;
}

const SERVICES = [
  'Web Design', 'Brand Identity', 'Motion & Animation',
  'UI/UX Design', 'Development', 'Other',
];

function ContactModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', details: '',
  });

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', company: '', service: '', details: '' });
      }, 400);
    }
  }, [open]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.details) return;
  setLoading(true);

  try {
    await emailjs.send(
      'service_incfx56',    // from EmailJS dashboard
      'template_1ap1ob8',   // from EmailJS dashboard
      {
        from_name:    form.name,
        from_email:   form.email,
        company:      form.company,
        service:      form.service,
        message:      form.details,
        to_email:     'saharkasir27@email.com',
      },
      'e5eQAbVJZnY2dQM53'
    );
    setSent(true);
  } catch (err) {
    console.error('EmailJS error:', err);
    alert('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} aria-modal="true" role="dialog">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-card">
        {!sent ? (
          <>
            <div className="modal-header">
              <div className="modal-title">
                Let's build<br />
                <span>something great.</span>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Your name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Alex Rivera" autoComplete="off" />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" autoComplete="off" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Company</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." autoComplete="off" />
                </div>
                <div className="form-field">
                  <label>Service</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Project details *</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals…"
                />
              </div>

              <button
                className="modal-submit"
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.email || !form.details}
              >
                {loading ? 'Sending…' : 'Send message →'}
              </button>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✦</div>
            <div className="modal-close" style={{ position: 'absolute', top: '1.4rem', right: '1.4rem' }} onClick={onClose}>✕</div>
            <div className="success-title">Message sent!</div>
            <p className="success-sub">Thanks {form.name.split(' ')[0]}! I'll be in touch within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnimatedFooter() {
  const footerRef = useRef(null);
  const clock = useClock();
  const triggerBounce = useBounce();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const pills = footer.querySelectorAll('.pill, .circle');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && window.scrollY > 0) {
          footer.classList.add('in-view');
          pills.forEach((el) => {
            setTimeout(() => {
              el.classList.add('landed');
              const dur = parseFloat(getComputedStyle(el).getPropertyValue('--fall-dur')) * 1000;
              const delay = parseFloat(getComputedStyle(el).getPropertyValue('--fall-delay')) * 1000;
              setTimeout(() => {
                el.classList.add('bounce');
                setTimeout(() => el.classList.remove('bounce'), 600);
              }, dur + delay + 50);
            }, 10);
          });
          observer.unobserve(footer);
        }
      });
    }, { threshold: 0.05 });

    const onFirstScroll = () => {
  window.removeEventListener('scroll', onFirstScroll);
  // Re-check in case footer is already in view after first scroll
  const rect = footer.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    footer.classList.add('in-view');
    pills.forEach((el) => {
      setTimeout(() => el.classList.add('landed'), 10);
    });
  }
};
window.addEventListener('scroll', onFirstScroll, { passive: true });

observer.observe(footer);

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handlePillClick = (e) => triggerBounce(e.currentTarget);

  const handleCtaClick = (e) => {
    triggerBounce(e.currentTarget);
    setTimeout(() => setModalOpen(true), 180);
  };

  return (
    <>
      <style>{styles}</style>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <footer className="footer-root" ref={footerRef}>
        <Particles />

        <div className="location-tag">UAE, Ajman</div>
        <div className="time-tag">{clock}</div>

        <div className="footer-eyebrow">Available for new projects</div>

        <div className="pill-arena">

          {/* Pill: Say hiii */}
          <div className="pill pill-say-hi" onClick={handlePillClick}>
            <span>Say hiii</span>
          </div>

          {/* Circles grouped in a row on mobile */}
          <div className="circle-row">
            <div
              className="circle circle-chat"
              style={{ backgroundImage: `url(${b1})` }}
              onClick={handlePillClick}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <a
              className="circle circle-email"
              href="mailto:test@email.com"
              onClick={handlePillClick}
              aria-label="Send email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>

          {/* Pill: Reach out */}
          <div className="pill pill-reach-out" onClick={handleCtaClick}>
            <span>Reach out</span>
          </div>

          {/* Pill: Let's chat */}
          <div className="pill pill-chat" onClick={handleCtaClick}>
            <span>Let's chat</span>
          </div>

          {/* Pill: Send a message */}
          <div className="pill pill-message" onClick={handleCtaClick}>
            <span>Send a message</span>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-brand">Sahar A.Qadir</div>
<ul className="footer-links">
  <li>
    <a href="https://www.linkedin.com/in/saharaqadir" target="_blank" rel="noopener noreferrer">Linked In</a>
    <div className="link-preview">
      <video src={linkedinVid} autoPlay muted loop playsInline />
      <div className="link-preview-label">linkedin.com</div>
    </div>
  </li>
  <li>
    <a href="https://github.com/Sahar-AbdulQdir" target="_blank" rel="noopener noreferrer">Github</a>
    <div className="link-preview">
      <video src={githubVid} autoPlay muted loop playsInline />
      <div className="link-preview-label">github.com</div>
    </div>
  </li>
  <li>
    <a href="https://docs.google.com/document/d/1VQs3KxX3XKj4RmVtbWsyttarVRxgVGT4X15NGPAiyRI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
    <div className="link-preview">
      <video src={resumeVid} autoPlay muted loop playsInline />
      <div className="link-preview-label">resume.pdf</div>
    </div>
  </li>
</ul>
          <div className="footer-copy">2026</div>
        </div>

      </footer>
    </>
  );
}