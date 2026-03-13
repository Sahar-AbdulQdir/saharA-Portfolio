import { useEffect, useRef } from "react";
import "../styles/Services.css";
import s1 from "../assets/Images/s1.jpg";
import s2 from "../assets/Images/s2.png";
import s3 from "../assets/Images/s3.png";
import s4 from "../assets/Images/s4.jpg";
import s5 from "../assets/Images/s5.jpg";
const cards = [
  {
    title: "Web Design",
    number: "(1)",
    text: "Designing modern, clean, and user-friendly interfaces that focus on clarity, usability, and engaging digital experiences across desktop and mobile devices.",
    image: s1,
    buttons: [
      "UI Layouts",
      "Wireframes",
      "Responsive Design",
      "Design Systems",
      "User Flows",
      "Prototypes",
    ],
  },
  {
    title: "Performance & Debugging",
    number: "(6)",
    text: "Improving performance, fixing issues, and refining applications to ensure reliability, accessibility, and smooth user interaction.",
    image: s2,
    buttons: [
      "Code Debugging",
      "Performance Fixes",
      "Accessibility",
      "Code Refactoring",
      "Error Handling",
      "Testing",
    ],
  },
  {
    title: "Web Applications",
    number: "(3)",
    text: "Developing full web platforms and interactive applications that combine modern frontend frameworks with structured data and scalable architecture.",
    image: s3,
    buttons: [
      "Dashboards",
      "Interactive Platforms",
      "User Authentication",
      "API Integration",
      "Data Visualization",
      "Scalable Architecture",
    ],
  },
  {
    title: "Machine Learning",
    number: "(4)",
    text: "Building intelligent systems that analyze data, recognize patterns, and provide predictive insights using modern machine learning techniques.",
    image: s5,
    buttons: [
      "Data Processing",
      "Model Training",
      "Pattern Recognition",
      "Prediction Systems",
      "Python ML Tools",
      "Model Evaluation",
    ],
  },
  {
    title: "App Development",
    number: "(5)",
    text: "Creating modern mobile and web applications that deliver smooth user experiences, scalable functionality, and intuitive interfaces.",
    image: s4,
    buttons: [
      "Mobile UI",
      "Cross Platform Apps",
      "App Interfaces",
      "API Integration",
      "User Experience",
      "Performance Optimization",
    ],
  },
];

export default function StackCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const items = el.querySelectorAll(".stack-card");

    const cardHeight = items[0].offsetHeight;
    const marginY = 70;
    const cardTop = 100;

    const handleScroll = () => {
      const top = el.getBoundingClientRect().top;

      items.forEach((card, i) => {
        const scrolling = cardTop - top - i * (cardHeight + marginY);

        if (scrolling > 0) {
          const scale = Math.max(
            0.75,
            (cardHeight - scrolling * 0.05) / cardHeight
          );

          card.style.transform = `translateY(${marginY * i}px) scale(${scale})`;
        } else {
          card.style.transform = `translateY(${marginY * i}px) scale(1)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <h1 className="section-title">Services</h1>
      
      <ul className="stack-cards" ref={containerRef}>
        {cards.map((card, index) => (
          <li className={`stack-card card-${index + 1}`} key={index}>
            <div className="card-number">{card.number}</div>

            <div className="card-left">
              <div>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.text}</p>
              </div>

              <div className="card-buttons">
                {card.buttons.map((btn, i) => (
                  <button key={i} className="btn">
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            <div className="card-image">
              <img src={card.image} alt={card.title} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}