// src/App.jsx
import "./App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Crousel from "./components/crousel/Crousel";
import EligibilitySearch from "./components/eligibility/EligibilitySearch";
import JobPage from "./components/jobpage/JobPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="carousel-section">
                <Crousel />
              </section>
              <section className="eligibility-section">
                <EligibilitySearch />
              </section>
            </>
          }
        />
        <Route path="/job/:jobId" element={<JobPage />} />
      </Routes>
    </Router>
  );
}

export default App;
