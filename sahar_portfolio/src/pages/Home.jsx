import React, { useState, useEffect } from "react";
// import "../App.css";

import Hero from "../components/Hero";
import AboutMe from "../components/About";
import Skills from "../components/skills2";
import StackCards from "../components/Services";
import Projects from "../components/Projects";
import DesignPhilosophy from "../components/desighPh";
import AnimatedFooter from "../components/Footer";
import Loader from "../components/loader"; // import loader
import Featured from "../components/featured";

function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // loader duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      {/* Main content wrapper */}
      <div className="content-container">
        <Hero />
        <AboutMe />

        {/* Skills Section */}
        <Skills />


        {/* Services / Stack Cards */}
        <StackCards />

        {/* Projects showcase */}
        <Projects />

        <Featured />

        {/* Design Philosophy Section */}
        <DesignPhilosophy />

        {/* Footer */}
        <AnimatedFooter />
      </div>
    </div>
  );
}

export default Home;