import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  // Toggle state for the sidebar
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger icon (always in top-left, or adjust if you prefer) */}
      <div className="hamburgerIcon" onClick={toggleSidebar}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      {/* Sidebar off-canvas, slides in when isOpen is true */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/quiz" onClick={toggleSidebar}>
              Quiz Dig Selv
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleSidebar}>
              Din Profil
            </Link>
          </li>
          <li>
            <Link to="/chatbot" onClick={toggleSidebar}>
              ChatBot
            </Link>
          </li>
          <li>
            <Link to="/dictionary" onClick={toggleSidebar}>
              Opslagsværk
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
