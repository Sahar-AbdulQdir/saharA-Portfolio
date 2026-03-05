import React from 'react';
import '../styles/About.css';
import Orb from './Orb';

const AboutMe = () => {
//   const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="about-section">
      {/* Left Column: Text Content */}
      <div className="about-text">
        <h1 className="about-heading">ABOUT ME</h1>
        <div className="text-card">
          <p className="about-paragraph">
            I'm a passionate creative developer with a love for building immersive digital experiences. 
            My journey began in graphic design and evolved into front-end architecture, allowing me to 
            blend aesthetics with interactivity. <span className="gradient-sentence">I believe the best designs tell a story and evoke emotion.</span> 
            When I'm not coding, you can find me sketching, playing guitar, or exploring the latest in 
            motion design. Currently based in Brooklyn, I'm available for freelance projects and 
            collaborations that push creative boundaries.
          </p>
        </div>
      </div>

      {/* Right Column: Animated Orb */}
<div className="about-orb">
  <div style={{ width: '100%', height: '600px', position: 'relative' }}>
    <Orb
      hoverIntensity={2}
      rotateOnHover={true}
      hue={0}
      forceHoverState={false}
      backgroundColor="#000000"
    />
  </div>
</div>
    </section>
  );
};

export default AboutMe;