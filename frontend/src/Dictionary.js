import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Dictionary.css';


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
                    <h1>Velkommen til Opslagsværket</h1>
                    <p>Vælg dit emne</p>
                    
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
    );


}

export default Dictionary;
