import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizSite.css";

import { BrowserRouter as Router,Routes, Route } from "react-router-dom"; // Use this for when navigating without reloading the page
import NavBar from "./NavBar";

function QuizSite() {
  const navigate = useNavigate();
  // Tilføj emner her lessonID skal matche det i databasen
  const topics = [
    { name: "Sår", lessonId: "lesson_1" },
    { name: "Forgiftning", lessonId: "lesson_2" },
    { name: "Brud", lessonId: "lesson_3" },
    { name: "Forstuvning", lessonId: "lesson_3" },
    { name: "Hovedet", lessonId: "lesson_4" },
    { name: "Hjertestop", lessonId: "lesson_5" },
    { name: "Forbrænding", lessonId: "lesson_6" },
    { name: "Hypotermi", lessonId: "lesson_7" },
    { name: "Hedeslag", lessonId: "lesson_8" },
    { name: "Blødninger", lessonId: "lesson_8" },
    { name: "Allergi", lessonId: "lesson_8" },
    { name: "Kvælning", lessonId: "lesson_9" },
    { name: "Epilepsi", lessonId: "lesson_10" },
    { name: "Diabetes", lessonId: "lesson_11" },
    { name: "Astma", lessonId: "lesson_12" },
    { name: "Slagtilfælde", lessonId: "lesson_12" },
    { name: "Anafylaksi", lessonId: "lesson_13" },
    { name: "Shock", lessonId: "lesson_12" },
    { name: "Allergi", lessonId: "lesson_13" }
  ];

  return (
    <div className="quizPage">
    <img 
        src="/frontend/public/ekg.jpg"  // Adjust to your actual image path
        alt="EKG graphic"
        className="headerImage"
    />
      <h1 className="quizTitle">Quiz Dig Selv</h1>
      <h2 className="quizSubtitle">Vælg dit emne</h2>

      <div className="searchBarWrapper">
        <div className="searchInputContainer">
        <span className="searchIcon">&#128270;</span>
          <input
            type="text"
            placeholder="Søg på emnet"
            className="searchInput"
          />
        </div>
      </div>

      {/* Topic Cards Grid */}
      <div className="topicGrid">
        {topics.map((topic, index) => (
          <div className="topicCard" key={index} onClick={() => navigate("/quiz-start")}>
            <div className="topicIcon" />
            <p className="topicName">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSite;
