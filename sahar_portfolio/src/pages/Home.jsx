import React from "react";
import "../App.css";

import Hero from "../components/Hero";
import AboutMe from "../components/About";
// import SkillsSection from "./components/SkillSection";
import Skills from "../components/skills2";
import StackCards from "../components/Services";
import Projects from "../components/Projects";
import DesignPhilosophy from "../components/desighPh";
import AnimatedFooter from "../components/Footer";
// import RishikeshBanner from "./components/heading";

function Home() {
  return (
    <div className="app">
      {/* Main content wrapper */}
      <div className="content-container">
        <Hero />
        <AboutMe />
        {/* Optional banner */}
        {/* <RishikeshBanner /> */}
        
        {/* Skills Section */}
        <Skills /> 

        {/* Services / Stack Cards */}
        <StackCards />

        {/* Projects showcase */}
        <Projects />

        {/* Design Philosophy Section */}
        <DesignPhilosophy />

        {/* Footer */}
        <AnimatedFooter />
      </div>
    </div>
  );
}

export default Home;