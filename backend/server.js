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

app.get('/exercises/lesson/:lessonId', async (req, res) => {
    const { lessonId } = req.params;

    try {
        // Fetch exercises including the ARRAY column
        const questionsResult = await pool.query(`
            SELECT exercise_id, question_text, correct_answer, options
            FROM exercises
            WHERE lesson_id = $1
        `, [lessonId]);

        if (questionsResult.rowCount === 0) {
            return res.status(404).json({ error: `No exercises found for lesson ID: ${lessonId}` });
        }

        // Convert options from ARRAY format to a proper JavaScript array
        const questionsWithOptions = questionsResult.rows.map((question) => ({
            exerciseId: question.exercise_id,
            question: question.question_text,
            options: Array.isArray(question.options) ? question.options : [], // Ensure it's an array
            correctAnswer: question.correct_answer
        }));

        res.json(questionsWithOptions);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: `Database error: ${err.message}` });
    }
});


// ✅ Fetch a single lesson name by lessonId
app.get('/lessons/:lessonId', async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lessonResult = await pool.query(`
            SELECT lesson_name
            FROM lessons
            WHERE lesson_id = $1
        `, [lessonId]);

        if (lessonResult.rowCount === 0) {
            return res.status(404).json({ error: `Lesson not found for ID: ${lessonId}` });
        }

        res.json({ lesson_name: lessonResult.rows[0].lesson_name });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: `Database error: ${err.message}` });
    }
});

// ✅ Fetch all lessons for frontend
app.get('/lessons', async (req, res) => {
    try {
        const lessonsResult = await pool.query(`
            SELECT lesson_id, lesson_name FROM lessons
        `);
        res.json(lessonsResult.rows);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: `Database error: ${err.message}` });
    }
});

// ✅ Fetch all users (for testing)
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: `Database error: ${err.message}` });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
