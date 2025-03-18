import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Dictionary.css'; 
import './SubCategoryDictionary.css'; 




function SubCategoryDictionary() {
    const {category} = useParams();
    const navigate = useNavigate();

    //underkategorier for hver kategori
    const subcategoriesdictionary = {
        "sår": ["Brandsår", "Overflade sår", "Tryksår", "Stiksår", "Væskende sår", "Nekrotisk sår", "Skudsår"],
        "forgiftning": ["Kemisk", "Madforgiftning", "Alkohol", "Medicinforgiftning"],
        "brud": ["Åbent brud", "Lukket brud", "Stressbrud"],
        "forstuvning": ["Mild", "Moderat", "Svær"]
    };


    return (
        <div className="dictionary-container">
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft size={24} />
                </button>
            </div>

            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <p>Typer</p>
            
            <div className="subcategory-grid">
                {subcategoriesdictionary[category]?.map((sub, index) => (
                    <div key={index} className="subcategory-box">
                        {sub}
                    </div>
                )) || <p>Ingen underkategorier tilgængelige.</p>}
            </div>
        </div>
    );

}

export default SubCategoryDictionary;