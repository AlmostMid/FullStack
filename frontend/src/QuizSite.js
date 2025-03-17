import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizSite.css";

function QuizSite() {
  const navigate = useNavigate();
  // Just an array of topic strings to map over for demonstration
  const topics = [
    "Sår", "Forgiftning", "Brud", "Forstuvning",
    "Hovedet", "Hjertestop", "Sår", "Forgiftning",
    "Brud", "Forstuvning", "Hovedet", "Hjertestop",
  ];

  return (
    <div className="quizPage">
    <img 
        src="/frontend/public/ekg.jpg"  // Adjust to your actual image path
        alt="EKG graphic"
        className="headerImage"
    />

      {/* Title + Subtitle */}
      <h1 className="quizTitle">Quiz Dig Selv</h1>
      <h2 className="quizSubtitle">Vælg dit emne</h2>

      {/* Search Bar */}
      <div className="searchBarWrapper">
        <div className="searchInputContainer">
        <span className="searchIcon">&#128270;</span>
          <input
            type="text"
            placeholder="Søg på emnet"
            className="searchInput"
          />
          {/* Example “magnifying glass” icon; you can replace with an SVG */}
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
