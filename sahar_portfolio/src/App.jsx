import React from "react";
import "./App.css";

import Hero from "./components/Hero";
import AboutMe from "./components/About";
// import SkillsSection from "./components/SkillSection";
import Projects from "./components/Projects";
import AnimatedFooter from "./components/Footer";
// import RishikeshBanner from "./components/heading";
import Skills from "./components/skills2";
import StackCards from "./components/Services";
import DesignPhilosophy from "./components/desighPh";
function App() {
  return (
    <div className="app">
      <div className="content-container">
        <Hero />
        <AboutMe />
        {/* <RishikeshBanner />  */}
        <Skills />  {/* Only this, no manual SkillCard mapping */}
        <StackCards />
        <Projects />
        <DesignPhilosophy />
        <AnimatedFooter />
      </div>
    </div>
  );
}

export default App;