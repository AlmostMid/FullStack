require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.use(cors({
    origin: "*", // ✅ Allow any frontend to connect (use specific domain in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Test API Route
app.get('/users', async (req, res) => {
    try {
        console.log('Received request at /api/users'); // ✅ Debugging Log
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err.message); // ✅ Error logging
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT} (IPv4+IPv6)`);
});
