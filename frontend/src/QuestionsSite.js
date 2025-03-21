import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./QuestionsSite.css";

function QuestionsSite() {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    fetch(`/api/exercises/lesson/${lessonId}`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelected(null);
        setIsCorrect(false);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [lessonId]);

  const checkAnswer = (index) => {
    setSelected(index);
    if (questions[currentQuestionIndex].options[index] === questions[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelected(null);
    setIsCorrect(false);
  };

  const currentQuestionData = questions[currentQuestionIndex] || {};
  const totalQuestions = questions.length;

  return (
    <div className="questionsPage">
      {questions.length > 0 ? (
        <>
          <div className="question-counter">
            Spørgsmål {currentQuestionIndex + 1}/{totalQuestions}
          </div>
          <h1 className="questionstitle">{currentQuestionData.question}</h1>
          <h2 className="questionssubtitle">Vælg den rigtige...</h2>

          <div className="options-container">
            {currentQuestionData.options && currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selected === index
                    ? option === currentQuestionData.correctAnswer
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => checkAnswer(index)}
                disabled={isCorrect && selected === index}
              >
                {option}
              </button>
            ))}
          </div>

          {isCorrect && currentQuestionIndex + 1 < totalQuestions && (
            <button className="next-button" onClick={nextQuestion}>
              Næste →
            </button>
          )}

          {isCorrect && currentQuestionIndex + 1 === totalQuestions && (
            <div className="quiz-complete">
              Du har gennemført quizzen!
            </div>
          )}
        </>
      ) : (
        <p>Indlæser spørgsmål...</p>
      )}
    </div>
  );
}

export default QuestionsSite;