import { useEffect, useRef, useState } from "react";
import b1 from "../assets/Images/b5.jpg";
import b2 from "../assets/Images/b6.jpg";

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
    // background: var(--cream);
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
  }

  .footer-root {
    position: relative;
    // background: var(--cream);
    padding: 4rem 3rem 3rem;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 4rem
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
    left: 35%;
    box-shadow: 0 8px 30px rgba(214,63,110,0.3);
  }
  .pill-message span { font-size: clamp(1.4rem, 3.8vw, 3.5rem); }

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
    // background-image: ur
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
  }

  .circle-email svg {
    width: 48%;
    height: 48%;
    transform: rotate(10deg);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: -1rem;
    border-top: 1px solid rgba(0,0,0,0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease 1.2s, transform 0.7s ease 1.2s;
  }

  .footer-root.in-view .footer-bottom {
    opacity: 1;
    transform: translateY(0);
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

  .location-tag {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    font-family: 'Syne', sans-serif;
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
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--dark-green);
    opacity: 0;
    transition: opacity 0.6s ease 0.1s;
  }

  .footer-root.in-view .time-tag { opacity: 1; }

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

export default function AnimatedFooter() {
  const footerRef = useRef(null);
  const clock = useClock();
  const triggerBounce = useBounce();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const pills = footer.querySelectorAll('.pill, .circle');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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
    }, { threshold: 0.15 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handlePillClick = (e) => {
    triggerBounce(e.currentTarget);
  };

  return (
    <>
      <style>{styles}</style>
      <footer className="footer-root" ref={footerRef}>
        <Particles />

        <div className="location-tag">Demak, Central Java</div>
        <div className="time-tag">{clock}</div>

        <div className="footer-eyebrow">Available for new projects</div>

        <div className="pill-arena">

          {/* Pill: Say hiii (vertical) */}
          <div className="pill pill-say-hi" onClick={handlePillClick}>
            <span>Say hiii</span>
          </div>

          {/* Circle: chat icon with leopard texture */}
          <div className="circle circle-chat"  style={{ backgroundImage: `url(${b1})` }}  onClick={handlePillClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* Pill: Reach out */}
          <div className="pill pill-reach-out" onClick={handlePillClick}>
            <span>Reach out</span>
          </div>

          {/* Circle: email */}
          <div className="circle circle-email" onClick={handlePillClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          {/* Pill: Let's chat */}
          <div className="pill pill-chat" onClick={handlePillClick}>
            <span>Let's chat</span>
          </div>

          {/* Pill: Send a message */}
          <div className="pill pill-message" onClick={handlePillClick}>
            <span>Send a message</span>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-brand">yourname.co</div>
          <ul className="footer-links">
            <li><a href="#">Work</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Journal</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
          <div className="footer-copy">© 2026 — All rights reserved</div>
        </div>

      </footer>
    </>
  );
}