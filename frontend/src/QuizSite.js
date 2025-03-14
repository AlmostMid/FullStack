import React from "react";
import "./QuizSite.css";

function QuizSite() {
  // Just an array of topic strings to map over for demonstration
  const topics = [
    "Sår", "Forgiftning", "Brud", "Forstuvning",
    "Hovedet", "Hjertestop", "Sår", "Forgiftning",
    "Brud", "Forstuvning", "Hovedet", "Hjertestop"
  ];

  return (
    <div className="quizContainer">
      {/* Header: hamburger + title + placeholder */}
      <header className="quizHeader">
        <div className="hamburgerIcon">
          {/* A small bar to represent lines */}
          <div
            style={{ width: "18px", height: "2px", backgroundColor: "#fff" }}
          />
        </div>
        <h1 className="quizTitle">Quiz Dig Selv</h1>
        <div className="quizPlaceholder" />
      </header>

      {/* Subtitle */}
      <h2 className="quizSubtitle">Vælg dit emne</h2>

      {/* Search bar */}
      <div className="searchBarWrapper">
        <div className="searchInputContainer">
          <input
            type="text"
            placeholder="Søg på emnet"
            className="searchInput"
          />
          <span className="searchIcon">&#128270;</span>
        </div>
      </div>

      {/* Grid of topics */}
      <div className="topicGrid">
        {topics.map((topic, index) => (
          <div className="topicCard" key={index}>
            <div className="topicIcon" />
            <p style={{ margin: 0 }}>{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSite;