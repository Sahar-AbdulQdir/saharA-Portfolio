import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LexProject from "./pages/LexiaMinds_project";
import CreativePulseP from "./pages/CreativePulse_project";
import SignLProject from "./pages/ASL_project";
import UniversityProject from "./pages/university_app";
import charityApp from "./pages/charity_app"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LexiaMinds_project" element={<LexProject />} />
      <Route path="/CreativePulse_project" element={<CreativePulseP />} />
      <Route path="/ASL_project" element={<SignLProject />} />
      <Route path="/university_app" element={<UniversityProject />} />
      <Route path="/charity_app" element={<charityApp />} />
    </Routes>
  );
}

export default App;