import { useEffect, useRef } from "react";
import "../styles/Services.css";

const cards = [
  {
    title: "Web Design",
    number: "(1)",
    text: "We craft visually engaging websites that combine elegant design, clear structure, and intuitive user experience to help brands communicate effectively and create memorable digital impressions.",
    image: "https://picsum.photos/500/380?1",
    buttons: [
      "Landing Pages",
      "UX Research",
      "UI Systems",
      "Wireframes",
      "Prototypes",
      "Design Audit",
    ],
  },
  {
    title: "Development",
    number: "(2)",
    text: "Modern web applications built with scalable architecture, high performance, and clean code practices to ensure your product remains reliable, fast, and ready to grow.",
    image: "https://picsum.photos/500/380?2",
    buttons: [
      "React Apps",
      "Web Platforms",
      "APIs",
      "Backend",
      "Performance",
      "Deployment",
    ],
  },
  {
    title: "Branding",
    number: "(3)",
    text: "We develop cohesive brand identities that combine visual design, strategy, and storytelling to create a strong presence and long-lasting connection with audiences.",
    image: "https://picsum.photos/500/380?3",
    buttons: [
      "Logo Design",
      "Brand Strategy",
      "Visual Identity",
      "Typography",
      "Color Systems",
      "Brand Guidelines",
    ],
  },
  {
    title: "Content",
    number: "(4)",
    text: "Strategic digital content that communicates ideas clearly, builds trust with audiences, and supports brand growth through thoughtful storytelling and visual communication.",
    image: "https://picsum.photos/500/380?4",
    buttons: [
      "Blog Writing",
      "SEO Content",
      "Social Media",
      "Scripts",
      "Copywriting",
      "Content Planning",
    ],
  },
  {
    title: "Consulting",
    number: "(5)",
    text: "Professional guidance to help businesses improve digital strategy, optimize products, and make informed decisions about technology, design, and growth opportunities.",
    image: "https://picsum.photos/500/380?5",
    buttons: [
      "Strategy",
      "Product Advice",
      "UX Review",
      "Technical Audit",
      "Growth Planning",
      "Workshops",
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