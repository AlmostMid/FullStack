require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Fetch question by lesson ID
app.get('/api/questions/lesson/:lessonId', async (req, res) => {
    const { lessonId } = req.params;

    try {
        const questionsResult = await pool.query(`
            SELECT exercise_id, question_text, correct_answer
            FROM exercises
            WHERE lesson_id = $1
        `, [lessonId]);

        if (questionsResult.rows.length === 0) {
            return res.status(404).json({ error: 'Lesson or exercises not found.' });
        }

        const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
            const optionsResult = await pool.query(`
                SELECT DISTINCT user_answer
                FROM user_exercises
                WHERE exercise_id = $1
            `, [question.exercise_id]);

            return {
                exerciseId: question.exercise_id,
                question: question.question_text,
                options: optionsResult.rows.map(row => row.user_answer),
                correctAnswer: question.correct_answer
            };
        }));

        res.json(questionsWithOptions);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Fetch lesson name by lessonId
app.get('/api/lessons/:lessonId', async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lessonResult = await pool.query(`
            SELECT lesson_name
            FROM lessons
            WHERE lesson_id = $1
        `, [lessonId]);

        if (lessonResult.rows.length === 0) {
            return res.status(404).json({ error: 'Lesson not found.' });
        }

        res.json({ lesson_name: lessonResult.rows[0].lesson_name });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Test API Route
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});