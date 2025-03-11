import React from 'react';
import { Link } from 'react-router-dom';    
import './NavBar.css';


function NavBar() {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* Add more links here when you have more pages */}
            </ul>
        </div>
    );
}

export default NavBar;

/*
// Navigation bar to swich between pages in the app
// Add pages like the link line
function NavBar() {
    return (
        <nav style={{ marginBottom: "20px" }}>
            <Link to= "/" style={{ marginRight: "10px" }}>Home</Link>

            </nav>
    );
}


export default NavBar;

*/