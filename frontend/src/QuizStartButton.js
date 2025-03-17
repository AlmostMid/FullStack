import React, { useEffect, useRef } from "react";
import "./QuizStartButton.css";

const QuizStartButton = () => {
    const canvasRef = useRef(null);

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
    }, []);

    return (
        <div className="quizStartButton">
            {/* Optional EKG line in top-right */}
            <canvas ref={canvasRef} className="headerImage" />

            {/* Title */}
            <h1 className="quizTitle">Test din viden</h1>
            
            {/* Start Button */}
            <button className="startButton">START</button>
        </div>
    );
};

export default QuizStartButton;