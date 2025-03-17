import { useState, useEffect } from "react";
import "./QuestionsSite.css";

function QuestionsSite() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 20;

  useEffect(() => {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestion(data.question);
        setOptions(data.options);
        setCorrectAnswer(data.correctAnswer);
        setSelected(null);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [currentQuestion]);

  const checkAnswer = (index) => {
    setSelected(index);
  };

  return (
    <div className="questionsPage">
      <div className="question-counter">Spørgsmål {currentQuestion}/{totalQuestions}</div>
      <h1 className="questionstitle">{question}</h1>
      <h2 className="questionssubtitle">Vælg den rigtige...</h2>

      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selected === index ? (option === correctAnswer ? "correct" : "wrong") : ""}`}
            onClick={() => checkAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionsSite;