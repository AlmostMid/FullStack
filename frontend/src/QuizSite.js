import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizSite.css";

function QuizSite() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("/api/lessons") // Fetch all lessons from the backend
      .then((response) => response.json())
      .then((data) => setTopics(data)) // Store fetched lessons in state
      .catch((error) => console.error("Error fetching lessons:", error));
  }, []);

  const handleTopicClick = (lessonId) => {
    navigate(`/quiz-start/${lessonId}`); // Pass UUID instead of lesson name
  };

  useEffect(() => {
    // If all questions are answered, redirect to the LessonComplete page
    if (currentQuestionIndex === totalQuestions) {
      navigate(`/lesson-complete/${lessonId}`);
    }
  }, [currentQuestionIndex, totalQuestions, lessonId, navigate]);

  return (
    <div className="quizPage">
      <img 
        src="/frontend/public/ekg.jpg"  
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
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div className="topicCard" key={topic.lesson_id} onClick={() => handleTopicClick(topic.lesson_id)}>
              <div className="topicIcon" />
              <p className="topicName">{topic.lesson_name}</p>
            </div>
          ))
        ) : (
          <p>Indlæser emner...</p> // Display loading message if no topics are fetched
        )}
      </div>
    </div>
  );
}

export default QuizSite;
