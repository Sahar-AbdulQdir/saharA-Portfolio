import React from "react";
import "./App.css";

import Hero from "./components/Hero";
import AboutMe from "./components/About";
import SkillsSection from "./components/SkillSection";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import RishikeshBanner from "./components/heading";
function App() {
  return (
    <div className="app">
      <div className="content-container">
        <Hero />
        <AboutMe />
        {/* <RishikeshBanner />  */}
        <SkillsSection />  {/* Only this, no manual SkillCard mapping */}
        <Projects />
        <Footer />
      </div>
    </div>
  );
}

export default App;