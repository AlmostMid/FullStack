import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dictionary.css'; // Ensure this CSS file exists




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
            <button className="back-button" onClick={() => navigate(-1)}>⬅ Tilbage</button>
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