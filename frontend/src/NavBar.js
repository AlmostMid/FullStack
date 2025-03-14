import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  // isOpen tracks whether the sidebar is visible
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/closed
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {/* Hamburger Icon (always visible) */}
      <div className="hamburgerIcon" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar (appears only if isOpen is true) */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/quiz" onClick={toggleSidebar}>Quiz Dig Selv</Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleSidebar}>Din Profil</Link>
          </li>
          <li>
            <Link to="/chatbot" onClick={toggleSidebar}>ChatBot</Link>
          </li>
          <li>
            <Link to="/dictionary" onClick={toggleSidebar}>Opslagsværk</Link>
          </li>
          <li>
            <Link to="/doctor-list" onClick={toggleSidebar}>Find Din Læge</Link>
          </li>
          <li>
            <Link to="/sos-numbers" onClick={toggleSidebar}>SOS Numrelisten</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
