import React from 'react';
import { Link } from 'react-router-dom';    

// Navigation bar to swich between pages in the app
// Add pages like the link line
function NavBar() {
    return (
        <nav style={{ marginBottom: "20px" }}>
            <Link to= "/" style={{ marginRight: "10px" }}>Home</Link>

            </nav>
    );
}