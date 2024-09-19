import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isCurrentPage = (path) => location.pathname === path;

  return (
    <nav>
      <ul>
        {/* Show "Home" link if not on the Home page */}
        {!isCurrentPage("/") && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}

        {/* Show "Learn About Drugs" link if not on the Educational page */}
        {!isCurrentPage("/education") && (
          <li>
            <Link to="/education">Learn About Drugs</Link>
          </li>
        )}

        {/* Show "Submit Your Story" link if not on the Anonymous Submission page */}
        {!isCurrentPage("/submit-story") && (
          <li>
            <Link to="/submit-story">Submit Your Story</Link>
          </li>
        )}

        {/* Show "View Community Stories" link if not on the Community Board page */}
        {!isCurrentPage("/community-board") && (
          <li>
            <Link to="/community-board">View Community Stories</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
