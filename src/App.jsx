import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing_page";
import "./styles/App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}
