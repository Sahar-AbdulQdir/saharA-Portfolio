import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LexProject from "./pages/LexiaMinds_project";
import CreativePulseP from "./pages/CreativePulse_project";
import SignLProject from "./pages/ASL_project";
import TermTracker from "./pages/Term_Tracker";
import Hope from "./pages/Hope"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LexiaMinds_project" element={<LexProject />} />
      <Route path="/CreativePulse_project" element={<CreativePulseP />} />
      <Route path="/ASL_project" element={<SignLProject />} />
      <Route path="/TermTracker" element={<TermTracker />} />
      <Route path="/Hope" element={<Hope />} />
    </Routes>
  );
}

export default App;