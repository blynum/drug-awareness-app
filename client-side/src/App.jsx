import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../components/Home"; // Home page
import EducationalPage from "../components/EducationalPage"; // Educational page about drugs
import AnonymousSubmission from "../components/AnonymousSubmission"; // Anonymous submission page
import CommunityBoard from "../components/CommunityBoard"; // Community Board (Story List)
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Educational Page */}
        <Route path="/education" element={<EducationalPage />} />

        {/* Anonymous Submission Page */}
        <Route path="/submit-story" element={<AnonymousSubmission />} />

        {/* Community Board Page */}
        <Route path="/community-board" element={<CommunityBoard />} />

        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
