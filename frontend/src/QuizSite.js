import React from "react";
import "./QuizSite.css";

function QuizSite() {
  // Just an array of topic strings to map over for demonstration
  const topics = [
    "Sår", "Forgiftning", "Brud", "Forstuvning",
    "Hovedet", "Hjertestop", "Sår", "Forgiftning",
    "Brud", "Forstuvning", "Hovedet", "Hjertestop",
  ];

  return (
    <div className="quizPage">
      {/* Optional EKG line in top-right (purely for visuals) */}
      <div className="ekgLine"></div>

      {/* Title + Subtitle */}
      <h1 className="quizTitle">Quiz Dig Selv</h1>
      <h2 className="quizSubtitle">Vælg dit emne</h2>

      {/* Search Bar */}
      <div className="searchBarWrapper">
        <div className="searchInputContainer">
          <input
            type="text"
            placeholder="Søg på emnet"
            className="searchInput"
          />
          {/* Example “magnifying glass” icon; you can replace with an SVG */}
          <span className="searchIcon">&#128270;</span>
        </div>
      </div>

      {/* Topic Cards Grid */}
      <div className="topicGrid">
        {topics.map((topic, index) => (
          <div className="topicCard" key={index}>
            <div className="topicIcon" />
            <p className="topicName">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSite;
