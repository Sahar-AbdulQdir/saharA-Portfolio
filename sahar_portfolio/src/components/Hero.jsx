import React from "react";
import "../styles/Hero.css";
import profilePic from "../assets/Images/p1.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">

        {/* TOP RIGHT ROLE */}
        <div className="roleWrapper">
          <div className="roleVisual">visual</div>
          <div className="roleDesigner">designer</div>
        </div>

        {/* MAIN CONTENT */}
        <div className="content">
          <h1 className="titleTop">HELLO</h1>

          <div className="middleRow">
            <h1 className="titleBottom">I’M</h1>

            <div className="imageWrapper">
              <img src={profilePic} alt="Profile" className="image" />
            </div>

            <h1 className="titleBottom">Sahar</h1>
          </div>
        </div>

        {/* BOTTOM LEFT PORTFOLIO */}
        <div className="portfolioWrapper">
          <span className="portfolioText">My <br /> portfolio</span>
          <span className="arrow">↓</span>
        </div>

      </div>
    </section>
  );
}