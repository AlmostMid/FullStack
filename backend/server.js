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
        // Fetch all exercises (questions) for the given lesson
        const questionsResult = await pool.query(`
            SELECT exercise_id, question_text, correct_answer
            FROM exercises
            WHERE lesson_id = $1
        `, [lessonId]);

        if (questionsResult.rowCount === 0) {
            return res.status(404).json({ error: `No exercises found for lesson ID: ${lessonId}` });
        }

        // Fetch answer choices from `exercise_options`
        const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
            const optionsResult = await pool.query(`
                SELECT option_text FROM exercise_options WHERE exercise_id = $1
            `, [question.exercise_id]);

            return {
                exerciseId: question.exercise_id,
                question: question.question_text,
                options: optionsResult.rows.map(row => row.option_text), // ✅ Fetching all options
                correctAnswer: question.correct_answer
            };
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
