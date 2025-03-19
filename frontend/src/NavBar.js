import React from 'react';
import { Link } from 'react-router-dom';    

// Navigation bar to swich between pages in the app
// Add pages like the link line
function NavBar() {
    return (
        <nav style={{ marginBottom: "20px" }}>
            <Link to= "/" style={{ marginRight: "10px" }}>Home</Link>
            <Link
        to="/account"
        style={{
          float: "right",
          marginRight: "20px",
          background: "#007bff",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        Account
      </Link>
            </nav>
    );
}


export default NavBar;