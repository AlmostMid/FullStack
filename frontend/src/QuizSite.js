// QuizSite.js
import React from "react";
import "./QuizSite.css";

function QuizSite() {
  const topics = [
    "Sår", "Forgiftning", "Brud", "Forstuvning",
    "Hovedet", "Hjertestop", "Sår", "Forgiftning",
    "Brud", "Forstuvning", "Hovedet", "Hjertestop",
  ];

  return (
    <div className="quizContainer">
      {/* Header: Just the page title */}
      <header className="quizHeader">
        <h1 className="quizTitle">Quiz Dig Selv</h1>
      </header>

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

      {/* Topic grid */}
      <div className="topicGrid">
        {topics.map((topic, idx) => (
          <div className="topicCard" key={idx}>
            <div className="topicIcon" />
            <p style={{ margin: 0 }}>{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSite;