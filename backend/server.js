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

// Fetch question by exercise ID
app.get('/api/questions/:exerciseId', async (req, res) => {
    const { exerciseId } = req.params;

    try {
        const questionResult = await pool.query(`
            SELECT question_text, correct_answer
            FROM exercises
            WHERE exercise_id = $1
        `, [exerciseId]);

        if (questionResult.rows.length === 0) {
            return res.status(404).json({ error: 'Exercise not found.' });
        }

        const optionsResult = await pool.query(`
            SELECT DISTINCT user_answer
            FROM user_exercises
            WHERE exercise_id = $1
        `, [exerciseId]);

        const options = optionsResult.rows.map(row => row.user_answer);

        res.json({
            question: questionResult.rows[0].question_text,
            options: options,
            correctAnswer: questionResult.rows[0].correct_answer
        });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Test API Route
app.get('/users', async (req, res) => {
    try {
        console.log('Received request at /api/users');
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