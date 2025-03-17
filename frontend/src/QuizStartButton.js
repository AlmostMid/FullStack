import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizStartButton.css";

const QuizStartButton = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const { lessonId } = useParams(); // Extract lessonId from URL
    const [topicName, setTopicName] = useState("");

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 50;

        function drawECG() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, 25);
            ctx.lineTo(20, 25);
            ctx.lineTo(30, 10);
            ctx.lineTo(40, 40);
            ctx.lineTo(50, 10);
            ctx.lineTo(60, 25);
            ctx.lineTo(100, 25);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        drawECG();

        // Fetch the topic name from backend using lessonId
        fetch(`/api/lessons/${lessonId}`)
            .then(res => res.json())
            .then(data => {
                setTopicName(data.lesson_name); // assuming backend returns {"lesson_name": "Sår"}
            })
            .catch(error => console.error('Error fetching topic name:', error));
    }, [lessonId]);

    const handleStartQuiz = () => {
        navigate(`/questions/${lessonId}`);
    };

    return (
        <div className="quizStartButton">
            {/* Optional EKG line in top-right */}
            <canvas ref={canvasRef} className="headerImage" />

            {/* Title */}
            <h1 className="quizTitle">Test din viden i</h1>

            {/* Subtitle dynamically set based on backend */}
            <h2 className="quizSubtitle">{topicName || "Indlæser emne..."}</h2>

            {/* Start Button */}
            <button className="startButton" onClick={handleStartQuiz}>
                START
            </button>
        </div>
    );
};

export default QuizStartButton;