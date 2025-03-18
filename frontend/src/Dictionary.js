import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Dictionary.css';
import {FaSearch} from 'react-icons/fa';


function Dictionary() {
const navigate = useNavigate();


    const categories = [
        {id: 1, name: "Forgiftning"},
        {id: 2, name: "Sår"},
        {id: 3, name: "Brud"},
        {id: 4, name: "Forstuvning"}
    ];


    //Når en kategori er valgt, navigeres der til dens respektive side
    const handleCategoryClick = (categoryName) => {
        navigate(`/dictionary/${categoryName.toLowerCase()}`);
    };

    return (
        <div className="dictionary-container">
            <h2 className="sub-header">Velkommen til..</h2>
            <h1 className="main-title">Opslagsværket</h1>
            
            {/* ✅ Add a wrapper for the content below the title */}
            <div className="content-box">
                <p className="choose-topic">Vælg dit emne</p>

                {/* Search Bar */}
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Søg på emnet" />
                </div>

                {/* Categories */}
                <div className="category-grid">
                    {categories.map(category => (
                        <button 
                            key={category.id} 
                            className="category-box"
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Dictionary;
