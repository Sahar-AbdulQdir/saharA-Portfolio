import React from "react";
import { Routes, Route } from "react-router-dom"; // just import Routes and Route

import Home from "./pages/Home";
import Project1 from "./pages/Project1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project1" element={<Project1 />} />
    </Routes>
  );
}

export default App;